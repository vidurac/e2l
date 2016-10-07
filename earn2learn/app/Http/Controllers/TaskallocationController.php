<?php

namespace App\Http\Controllers;

use App\Traits\NotificationTrait;
use Auth;
use Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Task;
use App\Taskallocation;
use App\House;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;
use Log;
use App\Events\NotifyChild;

class TaskallocationController extends Controller
{
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
        return Response::json([
        	'error' => 'access_denied'
        ], 401);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function get_by_id($id=null)
    {   
        if($id==null)
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 405);
        }
        $task = Taskallocation::select('taskallocations.*', 'tasks.task', 'tasks.description')
                                ->join('tasks', 'tasks.id', '=', 'taskallocations.task_id')
                                ->where('tasks.enable', 1)
                                ->where('taskallocations.id', $id)
                                ->where('taskallocations.enable', 1)->first();
        // ****** bind the task data
        
        if(!$task)
        {
			return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);	
		}

        // Check start date
        $now = time();
        $start_date =  strtotime($task->start_date);

        $isFutureStartDate = false;
        if($start_date > $now) {
            $isFutureStartDate = true;
        }
        $task->hasFutureStartDate = $isFutureStartDate;
        $task->can_start_on = date('Y-m-d', strtotime($task->start_date));

        return Response::json([
            'query_status' => 'success',
            'data' => $task
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function get_by_task_id($id=null)
    {
        if($id==null)
        {
            return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'missing argument'
		    ], 405);
        }
        
        $house_id = House::latest()->where('user_id', Auth::user()->id)->where('enable', 1)->first()->id;

        $tasks = Taskallocation::select('taskallocations.*', 'tasks.task', 'tasks.description')
                                ->join('tasks', 'tasks.id', '=', 'taskallocations.task_id')
                                ->where('tasks.enable', 1)
                                ->where('taskallocations.task_id', $id)
                                ->where('taskallocations.house_id', $house_id)
                                ->where('taskallocations.enable', 1)
                                ->get();

        foreach ($tasks as $taskrow){
            $taskrow['start_date']=strtotime($taskrow['start_date']) * 1000;
        }

        if(!$tasks->count())
        {
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
        
        return Response::json([
	    	'query_status' => 'success',
	        'data' => $tasks
	    ], 200);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function get_by_child_id($id=null)
    {   
        if($id==null)
        {
            return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'missing argument'
		    ], 405);
        }
        $tasks = Taskallocation::select('taskallocations.*', 'tasks.task', 'tasks.description', 'tasks.by_admin')
                                ->join('tasks', 'tasks.id', '=', 'taskallocations.task_id')
                                ->where('tasks.enable', 1)
                                ->where('taskallocations.child_id', $id)
                                ->where('taskallocations.enable', 1)->get();
    
        if(!$tasks->count())
        {
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
        
        return Response::json([
	    	'query_status' => 'success',
	        'data' => $tasks
	    ], 200);
    }
    
    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function get_my_assigned_tasks()
    {
        $child_id = Auth::user()->id;
        $tasks = Task::select('tasks.*', 'taskallocations.start_date', 'taskallocations.id as allocation_id', 'taskallocations.occurrence', 'taskallocations.duration','taskallocations.attempts', 'taskallocations.value', 'taskallocations.status as allocation_status')
                    ->join('taskallocations', 'taskallocations.task_id', '=', 'tasks.id')
                    ->where('taskallocations.child_id', $child_id)
                    ->whereDate('taskallocations.start_date', '<=', date('Y-m-d').' 00:00:00')
                    ->where('taskallocations.enable', 1)
                    ->where('tasks.enable', 1)
                    ->groupBy('tasks.id')
                    ->get();
            
        if(!$tasks->count())
        {
			return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);	
		}
        
        return Response::json([
                'query_status' => 'success',
                'data' => $tasks
            ], 200);
    }
    
    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function get_by_house_id($id=null)
    {   
        if($id==null)
        {
            return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'missing argument'
		    ], 405);
        }
        $tasks = Taskallocation::select('taskallocations.*', 'tasks.task', 'tasks.description', 'tasks.by_admin', 'user.f_name', 'user.l_name', 'user.profile_image')
                                ->join('tasks', 'tasks.id', '=', 'taskallocations.task_id')
                                ->join('user', 'user.id', '=', 'taskallocations.child_id')
                                ->where('tasks.enable', 1)
                                ->where('taskallocations.house_id', $id)
                                ->where('taskallocations.enable', 1)
                                ->get();
            
        if(!$tasks->count())
        {
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
        
        return Response::json([
	    	'query_status' => 'success',
	        'data' => $tasks
	    ], 200);
    }

    /**
     * Store a newly created resource in storage.
     * @return Response
     */
    /*public function store(Request $request)
    {
            
        $request = $request->all();
        if( !$request['child_ids'] or 
            !$request['task_id']   or 
            !$request['house_id']  or 
            !$request['start_date']or 
            !$request['occurrence']or 
            !$request['duration']  or
            !$request['value'] )
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'please provide all required fields 1'
            ], 422); 
        } 
        // dd(json_decode($request['child_ids']));
            
        $request['attempts'] = ( empty($request['attempts']) and ( $request['occurrence']==1 or $request['occurrence']==0 ) ) ? 1 : $request['attempts'];
        
        // set as enable
        $request['status']  = 0; // 0: not started, 1: started, 2: skipped, 3: finished
        $request['enable']  = 1; // 1;enable, 0:disable
        // var_dump(json_decode($request['child_ids']), true); exit;
        
        if( is_array(json_decode($request['child_ids'])) or is_object(json_decode($request['child_ids'])))
        {
            // echo json_decode($request['child_ids']); exit;
            foreach( json_decode($request['child_ids']) as $child )
            {
                // var_dump($child);
                $request['child_id'] = $child;
                $task = Taskallocation::create($request);
            }
            return Response::json([
                    'query_status' => 'success',
                    'message' => 'task allocation created successfully', 
                    // 'data' => $task 
                ], 201);
        }
        
        // exit;
        return Response::json([
                'query_status' => 'success',
                'message' => 'task allocation created successfully', 
                // 'data' => $task 
        ], 201);
    }*/
    public function store(Request $request)
    {
//        print_r('hit......'); die;
        $request = $request->all();
        \Log::info('==== store task allocations!' . print_r($request, true));

        if ($request['is_create']) {
            if( !$request['child_ids'] or 
                !$request['task_id']   or 
                !$request['house_id']  or 
                !$request['start_date']or 
                !$request['occurrence']
                //!$request['duration']  or
                //!$request['value'] 
                )
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'please provide all required fields 1'
                ], 422); 
            } 
            // dd(json_decode($request['child_ids']));
                
            //$request['attempts'] = ( empty($request['attempts']) and ( $request['occurrence']==1 or $request['occurrence']==0 ) ) ? 1 : $request['attempts'];
            
            // set as enable
            $request['status']  = 0; // 0: not started, 1: started, 2: skipped, 3: finished
            $request['enable']  = 1; // 1;enable, 0:disable
            
            if( is_array(json_decode($request['child_ids'])) or is_object(json_decode($request['child_ids'])))
            {
                foreach( json_decode($request['child_ids']) as $child )
                {

                    \Log::info('==== create  task allocation');

                    \Log::info('==== ' . print_r($request, true));

                    $request['child_id'] = $child;
                    $task = Taskallocation::create($request);

                    $taskData = Task::find($request['task_id']);

                    $this->notifyNewChoreAssignToChild($taskData->task, $task->id, $child);

                }
                return Response::json([
                        'query_status' => 'success',
                        'message' => 'task allocation created successfully', 
                    ], 201);
            }
            
            return Response::json([
                    'query_status' => 'success',
                    'message' => 'task allocation created successfully', 
            ], 201);
        }else{
            if( !$request['child_ids'] or 
                !$request['old_child_ids']or 
                !$request['new_child_ids']or 
                !$request['task_id']   or 
                !$request['house_id']  or 
                !$request['start_date']or 
                !$request['occurrence']
                //!$request['duration']  or
                //!$request['value'] 
                )
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'please provide all required fields 1'
                ], 422); 
            } 
            
            //dd($request['old_child_ids']);
            Taskallocation::where('house_id', $request['house_id'])
                            ->where('task_id', $request['task_id'])->update(['enable' => 0]);
                            
            if( is_array(json_decode($request['new_child_ids'])) or is_object(json_decode($request['new_child_ids'])))
            {
                foreach( json_decode($request['new_child_ids']) as $child )
                {
                    \Log::info('==== update task allocation');

                    $request['child_id'] = $child;
                    $allcation = Taskallocation::where('house_id', $request['house_id'])
                                                ->where('task_id', $request['task_id'])
                                                ->where('child_id', $child)
                                                ->get();

                    if (!$allcation->count()) {
                        $task = Taskallocation::create($request);

                        $taskData = Task::find($request['task_id']);

                        $this->notifyNewChoreAssignToChild($taskData->task, $task->id, $child);

                    }
                }
            }
            
            $request['attempts'] = ( empty($request['attempts']) and ( $request['occurrence']==1 or $request['occurrence']==0 ) ) ? 1 : $request['attempts'];
            
            $enableDataList = array(
                'enable'        => 1,
                'start_date'    => $request['start_date'],
                'occurrence'    => $request['occurrence'],
                //'duration'      => $request['duration'],
                //'attempts'      => $request['attempts'],
                'value'         => $request['value']
                );
                
            Taskallocation::where('house_id', $request['house_id'])
                            ->where('task_id', $request['task_id'])
                            ->whereIn('child_id', json_decode($request['child_ids']))
                            ->update($enableDataList);
                            
            return Response::json([
                    'query_status' => 'success',
                    'message' => 'task allocation updated successfully', 
            ], 201);
        }
    }
    
    /**
     * Update the specified resource in storage.
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
		$task = Taskallocation::find($id);
		$request = $request->all();
		
		if( ! $request['child_id'] or 
            ! $request['task_id'] or 
            ! $request['house_id'] or 
            ! $request['start_date'] or 
            // ! $request['due_data'] or 
            ! $request['value'] )
        {
			return Response::json([
				'query_status' => 'error',
				'message' => 'please provide all required fields'
			], 422); 
		}
		
		$request['user_id'] = Auth::user()->id;
		$task->update($request);
			
		return Response::json([
			'query_status' => 'success',
			'message' => 'task allocation updated successfully', 
			'data' => $task 
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
			Taskallocation::destroy($id);
			return Response::json([
                'query_status' => 'success',
                'message' => 'record successfully deleted!'
            ], 200);
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
    }

}
