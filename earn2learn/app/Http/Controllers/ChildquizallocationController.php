<?php

namespace App\Http\Controllers;

use App\ChildHouse;
use App\Events\NotifyChild;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Quiz;
use App\Traits\NotificationTrait;
use App\User;
use App\Badge;
use App\Video;
use Auth;
use Response;
use App\Childquizallocation;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;
use Log;

class ChildquizallocationController extends Controller
{
    use NotificationTrait;

    public function __construct(){
        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        // $Childquizallocations = Childquizallocation::paginate(15);
        // return view('childquizallocation.index', compact('childquizallocations'));
    }

    /**
     * Get recored by a child id.
     *
     * @return Response
     */
    public function get_allocation_by_child_id($child_id)
    {
       $data = Childquizallocation::select('childquizallocations.*', 'quizzes.id as quiz_id', 'videos.category_id', 'videos.title', 'videos.description', 'videos.video_id as video_url_id', 'videos.video_ref')
                                    ->join('quizzes', 'quizzes.id', '=', 'childquizallocations.quiz_id')
                                    ->join('videos', 'videos.id', '=', 'quizzes.video_id')
                                    ->where('child_id', '=', $child_id)
                                    ->where('enable', '=', 1)
                                    ->get();
        
        if(!$data->count())
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
     * Get recored by a quiz id.
     *
     * @return Response
     */
    public function get_allocation_by_user_quiz_id($quiz_id)
    {
        //Some isssue is here
        //$quiz_id=30;
        $data = Childquizallocation::latest()
        ->where('quiz_id', '=', $quiz_id)
        ->where('child_id', '=', Auth::user()->id)
        ->where('enable', '=', 1)->get();
        
        if(!$data->count())
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
     * Get recored by a quiz id.
     *
     * @return Response
     */
    public function get_allocation_by_quiz_id($quiz_id)
    {
       $data = Childquizallocation::latest()->with('sponsor')->where('quiz_id', '=', $quiz_id)->where('enable', '=', 1)->get();

        if(!$data->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        foreach ($data as $row)
        {
            $sponsor_name = '';
            $sponsor_id = '';
            if (isset($row->sponsor)) {
                $sponsor_name = $row->sponsor->f_name . ' ' . $row->sponsor->l_name;
                $sponsor_id = $row->sponsor->id;
            }
            unset($row['sponsor']);
            $row['sponsor_name'] = $sponsor_name;
            $row['sponsor_id'] = $sponsor_id;
        }

        Log::info('Quiz allocation data is :'.$data);

        return Response::json([
            'query_status' => 'success',
            'data' => $data
        ], 200);
    }

    /**
     * Get recored by a quiz id.
     *
     * @return Response
     */
    public function get_allocation_by_house_id($house_id)
    {
       $data = Childquizallocation::latest()->select('childquizallocations.*', 'childhouses.house_id')
                                            ->where('childhouses.house_id', '=', $house_id)
                                            ->where('childquizallocations.enable', '=', 1)
                                            ->join('childhouses', 'childhouses.child_id', '=', 'childquizallocations.child_id')
                                            ->get();
        
        if(!$data->count())
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
     * Get recored by a quiz id.
     *
     * @return Response
     */
    public function get_childs_by_quiz_id($quiz_id)
    {
       $data = Childquizallocation::latest()//->select('child_id')
                                            ->where('quiz_id', '=', $quiz_id)
                                            ->where('enable', '=', 1)
                                            ->get();
        
        if(!$data->count())
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
     * Get recored by a allocation id.
     *
     * @return Response
     */
    public function get_allocation_by_id($id)
    {
       $data = Childquizallocation::find($id);

        if(empty($data))
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
     *
     * @return Response
     */
    public function store(Request $request)
    {
        if($this->is_admin() or $this->is_parent())
        {
            $request = $request->all();
            \Log::debug('==== create params ' . print_r($request, true));

            if( !$request['child_id']  or !$request['quiz_id'])
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'Please provide all required fields'
                ], 422);
            }
            
            $exist = Childquizallocation::latest()->where('quiz_id', '=', $request['quiz_id'])->where('child_id', '=', $request['child_id'])->first();

            $quiz = Quiz::find( $request['quiz_id']);

            // check max number of attempts provided, if not set the default attempt
            if (!isset($request['max_number_of_attempts'])) {
                $request['max_number_of_attempts'] =  env('MAX_NUMBER_OF_ATTEMPTS', 3);
            }else if (isset($request['max_number_of_attempts']) && $request['max_number_of_attempts'] == 0) {
                $request['max_number_of_attempts'] =  env('MAX_NUMBER_OF_ATTEMPTS', 3);
            }

            // if pass percentage not submit then use pass rate on % of the quizz
            if (!isset($request['pass_percentage'])) {
                $request['pass_percentage'] =  $quiz->score;
            }else if (isset($request['pass_percentage']) && $request['pass_percentage'] == 0){
                $request['pass_percentage'] =  $quiz->score;
            }

            $quiz = Quiz::find($request['quiz_id']);
            $lesson = Video::select('title')->where('id', $quiz->video_id)->first();

            if($exist)
            {
                Log::debug('==== update child quiz allocation ' . print_r($request, true));

                // dd($exist->id);

                $updateData = [
                    'enable' => 1,
                    'max_number_of_attempts' => $request['max_number_of_attempts'],
                    'pass_percentage' => $request['pass_percentage'],
                    'custom_message' => isset($request['custom_message'])? $request['custom_message'] : '',
                    'notify' => isset($request['notify'])? $request['notify'] : false
                ];

                if (isset($request['sponsor_id']) && $request['sponsor_id'] != '') {

                    \Log::info('======= notifyChildSponsoringToParent!');
                    $updateData['sponsor_id'] = $request['sponsor_id'];
                    $child = User::select('user.f_name', 'user.l_name')->where('id', $request['child_id'])->first();
                    $sponsor = User::select('user.f_name', 'user.l_name')->where('id', $request['sponsor_id'])->first();
                    $parentId = ChildHouse::select('user.id')
                        ->join('house', 'house.id', '=', 'childhouses.house_id')
                        ->join('user', 'user.id', '=', 'house.user_id')
                        ->where('childhouses.child_id', $request['child_id'])
                        ->first()->id;

                    $this->notifyChildSponsoringToParent($child->f_name, $child->l_name,
                        $sponsor->f_name . ' ' . $sponsor->l_name, $parentId);

                }

                if ($exist->enable === 1) {
                    $isUpdatingChanges = true;
                }else {
                    $isUpdatingChanges = false;
                }

                $exist->update($updateData);

                Log::debug('==== new lesson assigned! ' . $exist->enable);

                if ($isUpdatingChanges) {
                    Log::debug('==== only update changes!');
                }else {
                    Log::debug('==== new assign changes!');
                }

//                $parent_id = ChildHouse::select('user.id')
//                    ->join('house', 'house.id', '=', 'childhouses.house_id')
//                    ->join('user', 'user.id', '=', 'house.user_id')
//                    ->where('childhouses.child_id', $request['child_id'])
//                    ->first()->id;

                if (!$isUpdatingChanges) {
                    $this->notifyWhenNewLessonAssignedToChild($lesson->title, $request['quiz_id'], $request['child_id']);
                }

                return Response::json([
                        'query_status' => 'success',
                        'message' => 'child successfully allocated', 
                        'data' => $exist 
                ], 201);
            }
            
            // $request['user_id'] = Auth::user()->id;
            $request['enable']  = 1; // 1;enable, 0:disable

            // $data = Childquizallocation::create($request->all());
            $data = Childquizallocation::create($request);

            if (isset($data->id)) {
                //todo
                if (isset($request['sponsor_id']) && $request['sponsor_id'] != '') {

                    \Log::info('======= notifyChildSponsoringToParent!');
                    $updateData['sponsor_id'] = $request['sponsor_id'];
                    $child = User::select('user.f_name', 'user.l_name')->where('id', $request['child_id'])->first();
                    $sponsor = User::select('user.f_name', 'user.l_name')->where('id', $request['sponsor_id'])->first();
                    $parentId = ChildHouse::select('user.id')
                        ->join('house', 'house.id', '=', 'childhouses.house_id')
                        ->join('user', 'user.id', '=', 'house.user_id')
                        ->where('childhouses.child_id', $request['child_id'])
                        ->first()->id;

                    $this->notifyChildSponsoringToParent($child->f_name, $child->l_name,
                        $sponsor->f_name . ' ' . $sponsor->l_name, $parentId);

                }
                $this->notifyWhenNewLessonAssignedToChild($lesson->title, $request['quiz_id'], $request['child_id']);
            }

            return Response::json([
                    'query_status' => 'success',
                    'message' => 'Child quiz allocation Created Successfully', 
                    'data' => $data 
            ], 201);
        }
        
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        if($this->is_admin() or $this->is_parent())
        {
            \Log::debug('==== Child quiz allocation update!');
            $record = Childquizallocation::find($id);
            if(!$record)
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'no tada found'
                ], 404); 
            }

            $request = $request->all();

            // find quiz by child quiz allocations' quizz id
            $quiz = Quiz::find($record->quiz_id);


            // check max number of attempts provided, if not set the default attempt
            if (!isset($request['max_number_of_attempts'])) {
                $request['max_number_of_attempts'] =  env('MAX_NUMBER_OF_ATTEMPTS', 3);
            }else if (isset($request['max_number_of_attempts']) && $request['max_number_of_attempts'] == 0) {
                $request['max_number_of_attempts'] =  env('MAX_NUMBER_OF_ATTEMPTS', 3);
            }

            // if pass percentage not submit then use pass rate on % of the quizz
            if (!isset($request['pass_percentage'])) {
                $request['pass_percentage'] =  $quiz->score;
            }else if (isset($request['pass_percentage']) && $request['pass_percentage'] == 0){
                $request['pass_percentage'] =  $quiz->score;
            }

            if (!isset($request['custom_message'])) {
                $request['custom_message'] = '';
            }

            if (!isset($request['notify'])) {
                $request['notify'] = false;
            }


            \Log::debug('==== update params ' . print_r($request, true));
            
            // if( !$request['child_id'] or !$request['quiz_id'])
            if(is_null($request['enable']))
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'Please provide all required fields'
                ], 422); 
            }
            
            if ($request['enable'] == 0) {
                $request['status'] = 0;     // Update status to not started.
            }
            
            $request['user_id'] = Auth::user()->id;
            $record->update($request);

            return Response::json([
                    'query_status' => 'success',
                    'message' => 'Record Updated Successfully', 
                    'data' => $record 
            ], 200);
        }
        
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @param  Request  $request['status'] => 0: not started, 1: started, 2: skipped, 2: finished
     * @return Response
     */
    public function status($id, Request $request)
    { 
        // if($this->is_admin() or $this->is_parent())
        // {
            // dd($id);
            if( !$request['status'] )
            {
                return Response::json([ 
                    'query_status' => 'error', 
                    'message' => 'Please provide all required fields' 
                ], 422); 
            }
            
            $data = Childquizallocation::find($id);
            // dd($attempt);
            if(empty($data))
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
            }
            
            if ($request['enable'] == 0) {
                $request['status'] = 0;     // Update status to not started.
            }
            
            $request = $request->all();
            
            $request['user_id'] = Auth::user()->id;
            $data->update($request);
            
            return Response::json([
                    'query_status' => 'success', 
                    'message' => 'Record Updated Successfully', 
                    'data' => $data 
            ], 200);
        
        // }
        
        // return Response::json([
        //     'error' => 'access_denied'
        // ], 401);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        if($this->is_admin())
        {
            Childquizallocation::destroy($id);
            return Response::json([
                'query_status' => 'success',
                'message' => 'Record successfully deleted!'
            ], 200);
        }
        
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }


    //Child handle
    /**
     * Display badge points for the child.
     *
     * @return Response
     */
    public function get_system_badge_points()
    {
        $data=Badge::orderBy('points','asc')->get();

        return Response::json([
            'query_status' => 'success',
            'data' => $data
        ],200);
    }


    /**
     * Checks whether child can request a gift card from sponsor
     * - child can only request gift card from sponsor after completing some lessons
     * @param $sid
     * @return mixed
     */
    public function canChildRequestSponsorGiftCards($sid, $points) {
        // select * from childquizallocations inner join attempts on childquizallocations.id = attempts.allocation_id inner join rewards on attempts.id = rewards.attempt_id where sponsor_id = 41 and childquizallocations.child_id = 28\G

        //todo later check score value is greater than gift card value
        $c = Childquizallocation::join('attempts', 'childquizallocations.id', '=', 'attempts.allocation_id')
            ->where('sponsor_id', $sid)->where('child_id', Auth::user()->id)->get();

        $c = Childquizallocation::select(\DB::raw('sum(rewards.value) as total_points'))
            ->join('attempts', 'childquizallocations.id', '=', 'attempts.allocation_id')
            ->join('rewards', 'attempts.id', '=', 'rewards.attempt_id')
            ->where('sponsor_id', $sid)
            ->where('childquizallocations.child_id', Auth::user()->id)
            ->where('is_passed', 1)
            ->get()->first();

        if (isset($c->total_points)) {
            if ($c->total_points >= $points) {
                return Response::json([
                    'query_status' => 'success',
                    'data' => ['canRequest' => true]
                ],200);
            }
        }

        return Response::json([
            'query_status' => 'success',
            'data' => ['canRequest' => false]
        ],200);
    }
}
