<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Traits\BadgeTrait;
use Auth;
use Response;
use App\Task;
use App\Taskallocation;
use App\Taskattempt;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;
use Log;

class TaskController extends Controller
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
        // if admin
        if ($this->is_admin()) {
            $tasks = Task::select('tasks.*', 'user.f_name', 'user.l_name')
                ->join('user', 'user.id', '=', 'tasks.user_id')
                ->where('user.enable', 1)
                ->where('tasks.enable', 1)
                ->get();

        } // if parent
        else if ($this->is_parent()) {
            // filtern for parent own and admin tasks
            $tasks = Task::select('tasks.*', 'user.f_name', 'user.l_name')
                ->join('user', 'user.id', '=', 'tasks.user_id')
                ->where('tasks.user_id', Auth::user()->id)
                ->orWhere('tasks.by_admin', 1)
                ->where('user.enable', 1)
                ->where('tasks.enable', 1)
                ->get();
        }

        // dd($tasks);
        if (!$tasks->count()) {
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
     * Get a resource by id.
     * @param  int $id
     * @return Response
     */
    public function by_id($id)
    {
        $task = Task::where('id', '=', $id)->where('enable', '=', 1)->first();

        if (empty($task)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $task
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function by_house($id = null)
    {
        if ($id == null) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 405);
        }
        $tasks = Task::select('tasks.*')
            ->join('taskallocations', 'taskallocations.task_id', '=', 'tasks.id')
            ->where('taskallocations.house_id', $id)
            ->where('taskallocations.enable', 1)
            ->where('tasks.enable', 1)
            ->groupBy('tasks.id')
            ->get();

        if (!$tasks->count()) {
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
    public function store(Request $request)
    {

        if ($this->is_admin() or $this->is_parent()) {
            $request = $request->all();
            
            if (!$request['task']) {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'please provide all required fields'
                ], 422);
            }

            $request['user_id'] = Auth::user()->id;
            // set as admin created task
            $request['by_admin'] = ($this->is_admin()) ? 1 : 0;
            $request['enable'] = 1; // 1;enable, 0:disable
            $request['category'] = 0; //


            $task_check = \Validator::make($request, [
                'task' => 'unique:tasks,task,id'
            ]);

            $task_status = $task_check->passes();
            Log::info('Task status is '.$task_status);

            if ($task_status == true) {
                $task = Task::create($request);
                Log::info('Task is true');

                return Response::json([
                    'query_status' => 'success',
                    'message' => 'task created successfully',
                    'data' => $task
                ], 201);
            } else {
                Log::info('Task is false');

                $task = 'Duplicate task';
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'A Duplicate task',
                    'data' => $task
                ], 201);

            }

            // $attempt = Attempt::create($request->all());

        }

        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }

    /**
     * Update the specified resource in storage.
     * @param  int $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        if ($this->is_admin() or $this->is_parent()) {
            $task = Task::find($id);
            if (empty($task)) {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
            }
            $request = $request->all();
            if (!$request['task']) {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'please provide all required fields'
                ], 422);
            }

            $task_check = \Validator::make($request, [
                'task' => 'unique:tasks,task,' . $id
            ]);
            
            $task_status = $task_check->passes();

            if ($task_status == 1 && $request['enable'] == 1) {
                $request['user_id'] = Auth::user()->id;
                $task->update($request);

                return Response::json([
                    'query_status' => 'success',
                    'message' => 'record updated successfully',
                    'data' => $task
                ], 200);
            }
            if ($task_status == 0 && $request['enable'] == 0) {
                $task_allocation_status = Taskallocation::where('task_id', $id)->first();
                if ($task_allocation_status != null) {
                    $request['user_id'] = Auth::user()->id;
                    $task->update($request);
                    return Response::json([
                        'query_status' => 'success',
                        'message' => 'record deleted successfully',
                        'data' => $task
                    ], 201);
                } else {
                    return Response::json([
                        'query_status' => 'error',
                        'message' => 'Can not delete the record.It has assigned to the children',
                        'data' => $task
                    ], 201);
                }
            }
        }

        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }


    /**
     * Remove the specified resource from storage.
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        if ($this->is_admin()) {
            Log::info('Task user destroy id is :' . $id);
            Task::destroy($id);
            return Response::json([
                'query_status' => 'success',
                'message' => 'record successfully deleted!'
            ], 200);
        }

        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }

    public function get_tasks()
    {
        if ($this->is_child() /*or $this->is_parent()*/) {

            $id = Auth::user()->id;
            $tasks = Task::select(
                'tasks.id',
                'tasks.task',
                'tasks.description',
                'taskcategories.category',
                'taskallocations.id as allocation_id',
                'taskallocations.duration',
                'taskallocations.occurrence',
                'taskallocations.attempts',
                'taskallocations.value',
                'taskallocations.status'
            )
                ->join('taskcategories', 'taskcategories.id', '=', 'tasks.category')
                ->join('taskallocations', 'taskallocations.task_id', '=', 'tasks.id')
                ->where('tasks.enable', 1)// enable tasks
                ->where('taskallocations.child_id', $id)
                ->get();

            foreach ($tasks as $key => $task) {
                if ($task->occurrence > 0) {

                    $attempts = Taskattempt::where('enable', 1)// enable tasks
                    // ->where('status', 0) // get pendings
                    ->where('allocation_id', $task->allocation_id)
                        ->get();

                    if ($attempts->count() < $task->attempts) {
                        // echo $task->attempts .' < '. $attempts->count() ;
                        // echo $key ;
                        foreach ($attempts as $attempt) {
                            if ($attempt->status == 0) {
                                $task->attempt_id = $attempt->id;
                                $task->attempt_status = $attempt->status;
                            }
                        }
                    } else {
                        // echo $task->attempts .' !< '. $attempts->count() ;
                        // echo $key ;
                        unset($tasks[$key]);
                    }
                }
            }

            if (!$tasks->count()) {
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

    }


    public function deleteTask($id ,Request $request){
        if ($this->is_admin()) {
            $task = Task::find($id);

            $request = $request->all();
            if ($task != null && count($task) > 0) {
                    $request['enable'] = 0;
                    $task->update($request);
                    return Response::json([
                        'query_status' => 'success',
                        'message' => 'record deleted successfully',
                        'data' => $task
                    ], 201);
            }
        }else if ($this->is_parent()){
            $task = Task::find($id);

            $request = $request->all();
            if ($task != null && count($task) > 0) {
                $task_allocation_status = Taskallocation::where('task_id', $id)
                    ->where('enable',1)
                    ->count();
                if ($task_allocation_status == 0) {
                    $request['user_id'] = Auth::user()->id;
                    $request['enable'] = 0;
                    $task->update($request);
                    return Response::json([
                        'query_status' => 'success',
                        'message' => 'record deleted successfully',
                        'data' => $task
                    ], 201);
                } else {
                    return Response::json([
                        'query_status' => 'error',
                        'message' => 'Chores is already in used.If you want to delete, please unassigned chores from the children',
                        'data' => $task
                    ], 201);
                }
            }
        }

        return Response::json([
            'error' => 'access_denied'
        ], 401);

    }

    /**
     * Check task allocation usage when delete
     * @param $id
     * @return mixed
     */
    public function checkTaskAllocationUsage($id) {

        $task = Task::find($id);
        if ($task != null && count($task) > 0) {
            $task_allocation_status = Taskallocation::where('task_id', $id)
                ->where('enable',1)
                ->count();
            return Response::json([
                'query_status' => 'success',
                'data' => ['count' => $task_allocation_status]
            ], 200);
        }
    }
}
