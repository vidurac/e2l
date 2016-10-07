<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Response;
use App\User;
use App\Quiz;
use App\House;
use App\ChildHouse;
use App\Attempt;
use App\Result;
use App\Video;
use App\Reward;
use App\UserLog;
use App\Payment;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class ReportController extends Controller
{
    public function __construct()
	{
        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Http\Response
     */
    public function households()
    {
        if($this->is_admin() or $this->is_parent())
		{
            $data = array();
            $households_0 = House::select('house.*')
                            ->join('user', 'user.id', '=', 'house.user_id')
                            ->where('user.role_id', 2) // filter parents
                            ->where('user.enable', 0)
                            ->get();
            // 
            $households_1 = House::select('house.*')
                            ->join('user', 'user.id', '=', 'house.user_id')
                            ->where('user.role_id', 2) // filter parents
                            ->where('user.enable', 1)
                            ->get();
            // 
            $data['h_disabled'] = $households_0->count();
            $data['h_enable'] = $households_1->count();
            // 
            return Response::json([ 
                    'query_status' => 'success', 
                    // 'data' => $data 
                    // 'data' => $households_0->count()
                    'count' => $households_1->count(),
                    'count_disable' => $households_0->count()
                ], 201); 
		}
    }

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Http\Response
     */
    public function childrens()
    {
        if($this->is_admin() or $this->is_parent())
		{
            $data = array();
            $childrens_0 = ChildHouse::select('childhouses.*')
                            ->join('user', 'user.id', '=', 'childhouses.child_id')
                            ->where('user.role_id', 3) // filter child
                            ->where('user.enable', 0)
                            ->get();
            // 
            $childrens_1 = ChildHouse::select('childhouses.*')
                            ->join('user', 'user.id', '=', 'childhouses.child_id')
                            ->where('user.role_id', 3) // filter child
                            ->where('user.enable', 1)
                            ->get();
            // 
            $data['c_disabled'] = $childrens_0->count();
            $data['c_enable'] = $childrens_1->count();
            // 
            return Response::json([ 
                    'query_status' => 'success', 
                    // 'data' => $data 
                    // 'data' => $childrens_0->count()
                    'count' => $childrens_1->count(),
                    'count_disable' => $childrens_0->count()
                ], 201); 
		}
    }

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Http\Response
     */
    public function giftcards_analysis()
    {
        $childrens = ChildHouse::select('childhouses.*')
                ->join('user', 'user.id', '=', 'childhouses.child_id')
                ->where('user.role_id', 3) // filter child
                ->where('user.enable', 1)
                ->get();
                
        $giftcards = ChildHouse::select('childgiftcards.*')
                ->join('user', 'user.id', '=', 'childhouses.child_id')
                ->join('childgiftcards', 'childgiftcards.child_id', '=', 'user.id')
                ->where('user.role_id', 3) // filter child
                ->where('user.enable', 1)
                ->groupBy('childgiftcards.child_id')
                ->get();
                            
        // echo $childrens->count();
        // echo $giftcards->count();
        $percentage = ( $giftcards->count()!=0 and $childrens->count()!=0 ) ? number_format($giftcards->count()/$childrens->count() *100, 0) : 0;
        
        return Response::json([ 
                    'query_status' => 'success', 
                    // 'data' => $data_c
                    'percentage' => $percentage
                ], 201);
    }

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Http\Response
     */
    public function lessons_analysis()
    {
        $data_t = Attempt::select('attempts.*')
                    ->where('attempts.enable', 1)
                    ->get();
                    
        $data_c = Attempt::select('attempts.*')
                    ->join('results', 'results.attempt_id', '=', 'attempts.id')
                    ->where('attempts.enable', 1)
                    ->where('results.enable', 1)
                    ->groupBy('results.attempt_id')
                    ->get();
                    
                    // echo $data_t->count().'/'.$data_c->count();
        $percentage = ( $data_t->count()!=0 and $data_c->count()!=0 ) ? number_format($data_c->count()/$data_t->count() *100, 0) : 0;
                    
        return Response::json([ 
                    'query_status' => 'success', 
                    // 'data' => $data_c
                    'percentage' => $percentage
                ], 201); 
        
    }

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Http\Response
     */
    public function popular_lessons()
    {
        $lessons = Video::groupBy('quizzes.video_id')
                    ->join('quizzes', 'quizzes.video_id', '=', 'videos.id')
                    ->where('videos.enable', 1)
                    ->orderBy('quizzes.video_id', 'desc')
                    // ->get(['quizzes.video_id', DB::raw('count(quizzes.video_id) as count')]);
                    ->get([DB::raw('count(quizzes.video_id) as count'), 'videos.*'])->max();
                    
        return Response::json([ 
                    'query_status' => 'success', 
                    'data' => $lessons
                ], 201); 
        
    }

    /**
     * Average number of points awarded weekly.
     * @return 
     */
    public function points_average() // Average number of points awarded weekly
    {
        // $points = DB::select( DB::raw("SELECT  SUM(`value`) AS total, CONCAT(`created_at`, ' - ', `created_at` + INTERVAL 6 DAY) AS week FROM `rewards` WHERE `rewards`.`enable` = 1 GROUP BY WEEK(`created_at`) ORDER BY WEEK(`created_at`) ASC") );
        $data = DB::select( DB::raw("SELECT  SUM(`value`) AS points, CONCAT(`created_at`, ' - ', `created_at` + INTERVAL 6 DAY) AS week FROM `rewards` WHERE `rewards`.`enable` = 1 GROUP BY WEEK(`created_at`) ORDER BY WEEK(`created_at`) ASC") );
            
        // SELECT  SUM(`value`) AS total, CONCAT(`created_at`, ' - ', `created_at` + INTERVAL 6 DAY) AS week FROM `rewards` WHERE `rewards`.`enable` = 1 GROUP BY week ORDER BY WEEK(`created_at`) ASC
        // SELECT  SUM(`value`) AS total, CONCAT(`created_at`, ' - ', `created_at` + INTERVAL 6 DAY) AS week FROM `rewards` WHERE `rewards`.`enable` = 1 GROUP BY WEEK(`created_at`) ORDER BY WEEK(`created_at`) ASC
        
        // dd(json_decode(json_encode($points)));
        $points = array();
        foreach ($data as $value)
        {
            array_push($points, $value->points);
            // array_push($points, array('points'=>$value->points, 'week'=>$value->week));
        }
        // var_dump($points);
        // exit;
        
        if(empty($points))
            return Response::json([ 
                    'query_status' => 'error', 
                    'message' => 'data not found' 
                ], 404); 
        
        return Response::json([ 
                'query_status' => 'success', 
                'data' => $points
            ], 201); 
        
    }

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Http\Response
     */
    public function parent_analysis()
    {
        // $logs_time = UserLog::groupBy('userlogs.user_id')
        $logs_time = UserLog::where('user.role_id', 2) // filter parents
                    ->join('user', 'user.id', '=', 'userlogs.user_id')
                    ->orderBy('userlogs.user_id', 'desc')
                    // ->get(['user.id', DB::raw('TIME_TO_SEC(TIMEDIFF(userlogs.end, userlogs.start)) time')]);
                    ->get([DB::raw('TIME_TO_SEC(TIMEDIFF(userlogs.end, userlogs.start)) time')])->sum('time');
            // dd($logs_time);
        $user_count = User::where('user.role_id', 2)->get()->count();
        
        $avg_time = ($logs_time!=0 and $user_count!=0) ? round(($logs_time)/$user_count) : 0;
        
        return Response::json([ 
                'query_status' => 'success', 
                'data' => [
                        'time' => round($logs_time), 
                        'user_count' => $user_count, 
                        'avg_time' => $avg_time, 
                    ]
            ], 200); 
        
    }

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Http\Response
     */
    public function children_analysis()
    {
        // $logs_time = UserLog::groupBy('userlogs.user_id')
        $logs_time = UserLog::where('user.role_id', 3) // filter children
                    ->join('user', 'user.id', '=', 'userlogs.user_id')
                    ->orderBy('userlogs.user_id', 'desc')
                    // ->get(['user.id', DB::raw('TIME_TO_SEC(TIMEDIFF(userlogs.end, userlogs.start)) time')]);
                    ->get([DB::raw('TIME_TO_SEC(TIMEDIFF(userlogs.end, userlogs.start)) time')])->sum('time');
            // dd($logs_time);
        $child_count = User::where('user.role_id', 3)->get()->count();
        
        $avg_time = ($logs_time!=0 and $child_count!=0) ? round(($logs_time)/$child_count) : 0;
        
        return Response::json([ 
                'query_status' => 'success', 
                'data' => [
                        'time' => round($logs_time), 
                        'user_count' => $child_count, 
                        'avg_time' => round(($logs_time)/$child_count), 
                    ]
            ], 200); 
    }
    
    /**
     * Get attempt by child id
     * @param  int  $child_id
     * @return Response
     */
    public function transaction_analysis()
    {
        $td_payments = Payment::select('amount')
                        ->where('enable', 1)
                        ->where('created_at', '>', date('Y-m-d 00:00:00'))    
                        ->get()->pluck('amount');
                        
        $tw_payments = Payment::select('amount')
                        ->where('enable', 1)   
                        ->where('created_at', '>', date('Y-m-d H:i:s', strtotime("next monday - 1 week")) ) 
                        ->where('created_at', '<', date('Y-m-d H:i:s', strtotime("next monday - 1 second")) ) 
                        ->get()->pluck('amount');
                        
        $tm_payments = Payment::select('amount')
                        ->where('enable', 1)   
                        ->where('created_at', '>', date('Y-m-d 00:00:00', strtotime("first day of this month")) ) 
                        ->where('created_at', '<', date('Y-m-d 23:59:59', strtotime("last day of this month")) ) 
                        ->get()->pluck('amount');
                        
        $ty_payments = Payment::select('amount')
                        ->where('enable', 1)   
                        ->where('created_at', '>', date('Y-m-d 00:00:00', strtotime("first day of january")) ) 
                        ->where('created_at', '<', date('Y-m-d 23:59:59', strtotime("last day of december")) ) 
                        ->get()->pluck('amount');
                        
        // dd($td_payments);                
        // dd($tw_payments);                
        // dd($tm_payments); 
        // dd($ty_payments);                
    
        $data = array(
                'this_day' => $td_payments->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                'this_week' => $tw_payments->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                'this_month' => $tm_payments->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                'this_year' => $ty_payments->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                
            );
    
        return Response::json([
            'query_status' => 'success',
            'data' => $data
        ], 200);
    }
    
}
