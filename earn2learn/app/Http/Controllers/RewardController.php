<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Traits\BadgeTrait;

use App\Reward;
use App\Attempt;
use App\Badgecompleted;
use Response;
use DB;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;
use Auth;
use Log;

class RewardController extends Controller
{
    use BadgeTrait;

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $rewards = Reward::paginate(15);

        return $rewards;
    }

    /**
     * Get attempt by child id
     * @param  int  $child_id
     * @return Response
     */
    public function behavior_analysis($id=null)
    {
        if($id==null)
            return Response::json([
    		    	'query_status' => 'error',
    		    	'message' => 'missing argument'
    		    ], 405);
        
        $td_behaviors = Reward::select('rewards.value')
                        ->where('rewards.child_id', $id)
                        ->where('rewards.type', 3)
                        ->where('rewards.created_at', '>', date('Y-m-d 00:00:00'))    
                        ->get()->pluck('value');
                        
        $tw_behaviors = Reward::select('rewards.value')
                        ->where('rewards.child_id', $id)
                        ->where('rewards.type', 3)   
                        ->where('created_at', '>', date('Y-m-d H:i:s', strtotime("next monday - 1 week")) ) 
                        ->where('created_at', '<', date('Y-m-d H:i:s', strtotime("next monday - 1 second")) ) 
                        ->get()->pluck('value');
                        
        $tm_behaviors = Reward::select('rewards.value')
                        ->where('rewards.child_id', $id)
                        ->where('rewards.type', 3)   
                        ->where('created_at', '>', date('Y-m-d 00:00:00', strtotime("first day of this month")) ) 
                        ->where('created_at', '<', date('Y-m-d 23:59:59', strtotime("last day of this month")) ) 
                        ->get()->pluck('value');
                        
        $ty_behaviors = Reward::select('rewards.value')
                        ->where('rewards.child_id', $id)
                        ->where('rewards.type', 3)   
                        ->where('created_at', '>', date('Y-m-d 00:00:00', strtotime("first day of january")) ) 
                        ->where('created_at', '<', date('Y-m-d 23:59:59', strtotime("last day of december")) ) 
                        ->get()->pluck('value');
                        
        // dd($td_behaviors);                
        // dd($tw_behaviors);                
        // dd($tm_behaviors);                
        // dd($ty_behaviors);                

        $data = array(
                'this_day' => array(
                        'good' => $td_behaviors->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                        'bad' => $td_behaviors->map(function ($item, $key) { return ($item < 0)? $item: 0; })->sum(),
                    ),
                'this_week' => array(
                        'good' => $tw_behaviors->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                        'bad' => $tw_behaviors->map(function ($item, $key) { return ($item < 0)? $item: 0; })->sum(),
                    ),
                'this_month' => array(
                        'good' => $tm_behaviors->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                        'bad' => $tm_behaviors->map(function ($item, $key) { return ($item < 0)? $item: 0; })->sum(),
                    ),
                'this_year' => array(
                        'good' => $ty_behaviors->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                        'bad' => $ty_behaviors->map(function ($item, $key) { return ($item < 0)? $item: 0; })->sum(),
                    ),
                
            );
        
        // if(!$rewards->count())
        // {
        //     return Response::json([
        //         'query_status' => 'error',
        //         'message' => 'data not found'
        //     ], 404);
        // }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $data
        ], 200);
    }

    /**
     * Get attempt by child id
     * @param  int  $child_id
     * @return Response
     */
    public function chore_analysis($id=null)
    {
        if($id==null)
            return Response::json([
    		    	'query_status' => 'error',
    		    	'message' => 'missing argument'
    		    ], 405);
            
        $td_chores = Reward::select('rewards.value')
                        ->where('rewards.child_id', $id)
                        ->where('rewards.type', 2)
                        ->where('rewards.enable', 1)
                        ->where('rewards.created_at', '>', date('Y-m-d 00:00:00'))    
                        ->get()->pluck('value');
                        
        $tw_chores = Reward::select('rewards.value')
                        ->where('rewards.child_id', $id)
                        ->where('rewards.type', 2)   
                        ->where('rewards.enable', 1)   
                        ->where('created_at', '>', date('Y-m-d H:i:s', strtotime("next monday - 1 week")) ) 
                        ->where('created_at', '<', date('Y-m-d H:i:s', strtotime("next monday - 1 second")) ) 
                        ->get()->pluck('value');
                        
        $tm_chores = Reward::select('rewards.value')
                        ->where('rewards.child_id', $id)
                        ->where('rewards.type', 2)   
                        ->where('rewards.enable', 1)   
                        ->where('created_at', '>', date('Y-m-d 00:00:00', strtotime("first day of this month")) ) 
                        ->where('created_at', '<', date('Y-m-d 23:59:59', strtotime("last day of this month")) ) 
                        ->get()->pluck('value');
                        
        $ty_chores = Reward::select('rewards.value')
                        ->where('rewards.child_id', $id)
                        ->where('rewards.type', 2)   
                        ->where('rewards.enable', 1)   
                        ->where('created_at', '>', date('Y-m-d 00:00:00', strtotime("first day of january")) ) 
                        ->where('created_at', '<', date('Y-m-d 23:59:59', strtotime("last day of december")) ) 
                        ->get()->pluck('value');
                        
        // dd($td_chores);                
        // dd($tw_chores);                
        // dd($tm_chores); 
        // dd($ty_chores);                

        $data = array(
                'this_day' => $td_chores->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                'this_week' => $tw_chores->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                'this_month' => $tm_chores->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                'this_year' => $ty_chores->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                
            );
        
        // if(!$rewards->count())
        // {
        //     return Response::json([
        //         'query_status' => 'error',
        //         'message' => 'data not found'
        //     ], 404);
        // }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $data
        ], 200);
    }

    /**
     * Get points history
     * @param  int  $child_id
     * @return Response
     */
    public function lesson_analysis($id=null)
    {
        if($id==null)
            return Response::json([
    		    	'query_status' => 'error',
    		    	'message' => 'missing argument'
    		    ], 405);
            
        $td_lesson = Reward::select('rewards.value')
                        ->where('rewards.child_id', $id)
                        ->where('rewards.type', 1)
                        ->where('rewards.enable', 1)
                        ->where('rewards.created_at', '>', date('Y-m-d 00:00:00'))    
                        ->get()->pluck('value');
                        
        $tw_lesson = Reward::select('rewards.value')
                        ->where('rewards.child_id', $id)
                        ->where('rewards.type', 1)   
                        ->where('rewards.enable', 1)   
                        ->where('created_at', '>', date('Y-m-d H:i:s', strtotime("next monday - 1 week")) ) 
                        ->where('created_at', '<', date('Y-m-d H:i:s', strtotime("next monday - 1 second")) ) 
                        ->get()->pluck('value');
                        
        $tm_lesson = Reward::select('rewards.value')
                        ->where('rewards.child_id', $id)
                        ->where('rewards.type', 1)   
                        ->where('rewards.enable', 1)   
                        ->where('created_at', '>', date('Y-m-d 00:00:00', strtotime("first day of this month")) ) 
                        ->where('created_at', '<', date('Y-m-d 23:59:59', strtotime("last day of this month")) ) 
                        ->get()->pluck('value');
                        
        $ty_lesson = Reward::select('rewards.value')
                        ->where('rewards.child_id', $id)
                        ->where('rewards.type', 1)   
                        ->where('rewards.enable', 1)   
                        ->where('created_at', '>', date('Y-m-d 00:00:00', strtotime("first day of january")) ) 
                        ->where('created_at', '<', date('Y-m-d 23:59:59', strtotime("last day of december")) ) 
                        ->get()->pluck('value');
                        
        // dd($td_lesson);                
        // dd($tw_lesson);                
        // dd($tm_lesson); 
        // dd($ty_lesson);                

        $data = array(
                'this_day' => $td_lesson->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                'this_week' => $tw_lesson->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                'this_month' => $tm_lesson->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                'this_year' => $ty_lesson->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum(),
                
            );
        
        // if(!$rewards->count())
        // {
        //     return Response::json([
        //         'query_status' => 'error',
        //         'message' => 'data not found'
        //     ], 404);
        // }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $data
        ], 200);
    }

    /**
     * Get attempt by child id
     * @param  int  $child_id
     * @return Response
     */
    public function by_child($id=null)
    {
        if($id==null)
        {
            return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'missing argument'
		    ], 405);
        }
        
        $rewards = Reward::select('rewards.*')
                        ->where('rewards.child_id', '=', $id)    
                        ->get();
                        
        $data["total_points"] = 0;
        $data["rewards"] = $rewards;
        $data["today_good_points"] = 0;
        $data["today_bad_points"] = 0;
        $data["user_id"] = Auth::user()->id;

        foreach ($rewards as $reward){
            $data["total_points"] += $reward->value;
            if ($reward->type == 3 and $reward->created_at > date('Y-m-d 00:00:00')) {
                if ($reward->value > 0) {
                    $data["today_good_points"] += $reward->value;
                }else{
                    $data["today_bad_points"] += $reward->value;
                }
            }
        }
        

        if(!$rewards->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $data
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     * @return Response
     */
    public function store(Request $request)
    {
        $request = $request->all();
        if( ! $request['value'] or ! $request['child_id'] or ! $request['type'] )
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'please provide all required fields'
            ], 422); 
        } 
        if( $request['type']==1 or $request['type']==2 )
        {
            if( ! $request['attempt_id'] )
                return Response::json([
                        'query_status' => 'error',
                        'message' => 'please provide all required fields'
                    ], 422); 
        }
        
        $request['enable']  = 1; // 1:enable, 0:disable
        
        $reward = Reward::create($request);
        
        return Response::json([
                'query_status' => 'success',
                'message' => 'reward created successfully'
                // 'data' => $reward 
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        $reward = Reward::find($id);
        if(empty($reward))
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
        }
        
        $request = $request->all();
        if( ! $request['value'] or ! $request['child_id'] or ! $request['type'] )
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'please provide all required fields'
                ], 422); 
        }
        if( $request['type']==1 or $request['type']==2 )
        {
            if( ! $request['attempt_id'] )
                return Response::json([
                        'query_status' => 'error',
                        'message' => 'please provide all required fields'
                    ], 422); 
        }
        
        $reward->update($request);
        return Response::json([
                    'query_status' => 'success',
                    'message' => 'record updated successfully' // , 
                    // 'data' => $reward 
            ], 200);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        if($this->is_admin())
        {
            Reward::destroy($id);
            return Response::json([
                'query_status' => 'success',
                'message' => 'record successfully deleted!'
            ], 200);
        }
        
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }

    /**
     * Get reward data by child
     * @param  int  $child_id
     * @return Response
     */
    public function child_data($id=null)
    {
        if($id==null)
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'missing argument'
                ], 422);
            
        $lesson = Reward::select('value')
                    ->where('child_id', $id)
                    ->where('enable', 1)
                    ->where('type', 1)
                    ->get()
                    ->pluck('value')->sum();

        $attempts = Attempt::select('attempts.is_passed')
                    ->join('childquizallocations', 'childquizallocations.id', '=', 'attempts.allocation_id')
                    ->where('childquizallocations.child_id', $id)
                    ->where('attempts.enable', 1)
                    ->get()/*->pluck('is_passed')*/;

        $p_attempts = $attempts->where('is_passed', 1)->count();
        $f_attempts = $attempts->where('is_passed', 0)->count();
        // dd($f_attempts);
        
        $behavior = Reward::select('value')
                    ->where('child_id', $id)
                    ->where('enable', 1)
                    ->where('type', 3)
                    ->get()->pluck('value');
        $behavior_plus = $behavior->map(function ($item, $key) { return ($item > 0)? $item: 0; })->sum();
        $behavior_minus = $behavior->map(function ($item, $key) { return ($item < 0)? $item: 0; })->sum();
        

        $gift_card = Reward::select( DB::raw('SUM(ABS(value))'))
                    ->where('child_id', $id)
                    //->where('enable', 1)
                    ->where('type', 0)
                    ->sum('value');

        $tasks = Reward::select('value')
                    ->where('child_id', $id)
                    ->where('enable', 1)
                    ->where('type', 2)
                    ->sum('value');

        $data = [
                'lesson' => array('points' => $lesson, 'passed' => $p_attempts, 'failed' => $f_attempts ),
                'behavior_plus' => $behavior_plus,
                'behavior_minus' => $behavior_minus,
                'tasks' => $tasks,
                'gift_card' => $gift_card
            ];
            
        return Response::json([
				'query_status' => 'success',
				'data' => $data
			], 200);
    }


}
