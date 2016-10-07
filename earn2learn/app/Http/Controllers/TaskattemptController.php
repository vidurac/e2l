<?php

namespace App\Http\Controllers;

use App\Events\NotifyParent;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\MailSubscription;
use App\Traits\ChildgiftcardTrait;
use App\Traits\NotificationTrait;
use Auth;
use Response;
use App\Traits\BadgeTrait;
use App\Taskattempt;
use App\Taskallocation;
use App\Task;
use App\User;
use App\Reward;
use App\ChildHouse;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;
use Log;

class TaskattemptController extends Controller
{
    use BadgeTrait;
    use ChildgiftcardTrait;
    use NotificationTrait;

    public function __construct(){
        $this->middleware('jwt.auth');
    }
    
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        // $taskattempt = Taskattempt::paginate(15);
        // return view('taskattempt.index', compact('taskattempt'));
    }
    
    /**
     * Get task attempt by id
     * @param  int  $id
     * @return Response
     */
    public function by_id($id)
    {
        $taskattempt = Taskattempt::where('id', '=', $id)->where('enable', '=', 1)->first();
        
        if(empty($taskattempt))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $taskattempt
        ], 200);
    }
    
    /**
     * Get attempt by house id
     * @param  int  $house_id
     * @return Response
     */
    public function by_house_id($id)
    {
        $taskattempts = Taskattempt::select('taskattempts.*', 'tasks.task', 'tasks.description', 'user.f_name', 'user.l_name', 'user.profile_image')
                ->join('tasks', 'tasks.id', '=', 'taskattempts.task_id')
                ->join('user', 'user.id', '=', 'taskattempts.child_id')
                ->where('taskattempts.house_id', $id)
                ->where('taskattempts.status', 2)
                //->where('taskattempts.is_approved', 0)
                ->where('taskattempts.enable', 1)
                ->get();
        
        if(!$taskattempts->count())    
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $taskattempts
        ], 200);
    }
    
    /**
     * Get attempt by child id
     * @param  int  $child_id
     * @return Response
     */
    public function by_child_id($id)
    {
        $taskattempts = Taskattempt::latest()
                                ->select('taskattempts.*')
                                ->where('taskallocations.child_id', '=', $id)
                                ->where('taskattempts.enable', '=', 1)
                                ->where('taskallocations.enable', '=', 1)
                                ->join('taskallocations', 'taskallocations.id', '=', 'taskattempts.allocation_id')    
                                ->get();
        
        if(!$taskattempts->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $taskattempts
        ], 200);
    }
    
    /**
     * Get attempt by task allocation id
     * @param  int  $taskallocation_id
     * @return Response
     */
    public function by_taskallocation_id($id)
    {
        $taskattempts = Taskattempt::latest()->where('allocation_id', '=', $id)->where('enable', '=', 1)->first();
        
        // if(!$taskattempts->count()) 
        if(empty($taskattempts)) 
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        $taskattempts['current_server_time'] = date('Y-m-d H:i:s');
        
        return Response::json([
            'query_status' => 'success',
            'data' => $taskattempts
        ], 200);
    }
    
    /**
     * Get attempt by task id
     * @param  int  $task_id
     * @return Response
     */
    public function by_task_id($id)
    {   
        if($this->is_child())
        {
            // filter attempts by also child
            $taskattempt = Taskattempt::select('taskattempts.*')
                                ->join('taskallocations', 'taskallocations.id', '=', 'taskattempts.allocation_id')
                                ->where('taskallocations.child_id', '=', Auth::user()->id)
                                ->where('taskattempts.task_id', '=', $id)
                                ->where('taskattempts.enable', '=', 1)
                                ->get();
        }
        else
        {
            // $this->is_parent();
            $taskattempt = Taskattempt::latest()->where('task_id', '=', $id)->where('enable', '=', 1)->get();
        }
        
        if(!$taskattempt->count()) 
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $taskattempt
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     * @return Response
     */
    public function store(Request $request)
    {
        $request = $request->all();
        if( ! $request['child_id'] or ! $request['task_id'] or ! $request['allocation_id'] or ! $request['house_id'])
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'please provide all required fields'
            ], 422); 
        } 
        
        $request['child_id'] = ($this->is_child()) ? Auth::user()->id: $request['child_id']; 
        $request['status']  = 0; // 0: pending, 1: attempted, 2: skipped, 3: finished
        $request['finished_at'] = date('0000-00-00 00:00:00');
        $request['enable']  = 1; // 1:enable, 0:disable
        
        $taskattempt = Taskattempt::create($request);
        Taskallocation::where('id', $request['allocation_id'])->update(['status' => 1]);
        return Response::json([
                'query_status' => 'success',
                'message' => 'task attempt created successfully', 
                'data' => $taskattempt 
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        $taskattempt = Taskattempt::find($id);
        if(empty($taskattempt))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        $request = $request->all();
        if( ! $request['allocation_id'] or ! $request['status'])
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'please provide all required fields'
            ], 422); 
        }
        $request['finished_at'] = ($request['status']==2) ? date('Y-m-d H:i:s') : date('0000-00-00 00:00:00');
        
        // $request['user_id'] = Auth::user()->id;
        $taskattempt->update($request);
        Taskallocation::where('id', $request['allocation_id'])->update(['status' => 3]);
        
        $value = Taskallocation::select('value', 'task_id')->where('id', $request['allocation_id'])->first();
        $task = Task::select('task')->where('id', $value->task_id)->first();
        // Reward::create( ['attempt_id'=>$id, 'child_id'=>Auth::user()->id, 'value'=>$value, 'type'=>2, 'enable'=>1] ); 
        $child = User::select('user.f_name', 'user.l_name')->where('id', $request['child_id'])->first();
        $meta = array(
                'child_f_name' => $child->f_name,
                'child_l_name' => $child->l_name,
                'task_name' => $task->task,
                'task_points' => $value->value,
            );

        $userData = ChildHouse::select('user.id', 'user.email')
            ->join('house', 'house.id', '=', 'childhouses.house_id')
            ->join('user', 'user.id', '=', 'house.user_id')
            ->where('childhouses.child_id', Auth::user()->id)
            ->first();

        $email = $userData->email;
                    
        $receiver = $email;
		$subject  = $child->f_name." ".$child->l_name." completed a chore on Earn2Learn";
		$message  = "Message";
		$template = 'taskfinished';
        $token    = '';

        $mailSetting = MailSubscription::where('user_id', $userData->id)->first();

        if ($request['status']==2 && isset($mailSetting) && $mailSetting->task) {
            $email = $this->send_email($receiver, $message, $subject, $template, $token, $meta);
        }

		// check mail send
		// if($email){}

        if ($request['status']==2) {
            // Send notification to the parent
            // notify data
            $notifyData = [
                'message' => trans('messages.notify_chore_completed_to_parent', [
                    'first_name' => $child->f_name,
                    'last_name' => $child->l_name,
                    'task' => $task->task,
                    'points_amount' => $value->value
                ]),
                'type' => 'chore',
//            'link' => '#/parent/task/' . $value->task_id,
                'link' => '#/parent/finishedTasks',
                'user_id' => $userData->id
            ];

            // Fire notify event
            event(new NotifyParent($notifyData));
        }
        
        return Response::json([
                'query_status' => 'success',
                'message' => 'record updated successfully', 
                'data' => $taskattempt 
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
			Taskattempt::destroy($id);
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
     * Update the specified resource in storage.
     * @param  int  $id
     * @return Response
     */
    public function review($id, Request $request)
    {
        $taskattempt = Taskattempt::find($id);
        if(empty($taskattempt))
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
                
        $request = $request->all();
        if( (!isset($request['status']) or empty($request['status'])) )
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'please provide all required fields'
                ], 422); 
        $request['status'] = ($request['status']==1)? 1 : 0;
        $values=array('is_approved'=> 1,'is_satisfy'=>$request['status']);
        if($taskattempt->update($values))
        {
            if($request['status']==1)
            {
                $value = Taskallocation::select('value')->where('id', $taskattempt->allocation_id)->first()->value;
                Reward::create( ['attempt_id'=>$id, 'child_id'=>$taskattempt->child_id, 'value'=>$value, 'type'=>2, 'enable'=>1] );

                $child = User::select('user.f_name', 'user.l_name')->where('id', Auth::user()->id)->first();

                $child_id=$taskattempt->child_id;
                $reward_data=$this->reward_by_child($child_id);

                Log::info('Reward value is#######:'.$reward_data["total_points"]);

                $total_points=$reward_data["total_points"];

                if ($this->canChildRequestGiftCard($child_id)) {
                    //send a notification
                    \Log::info("===== can send a notification saying eligible for gift card");
                    $this->notifyChildWhenGiftCanRequest(['userId' => $child_id]);
                }




            }
            return Response::json([
                    'query_status' => 'success',
                    'message' => 'task updated successfully'
                ], 201); 
        };
        
    }
    
}
