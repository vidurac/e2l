<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Response;
use App\Attempt;
use App\Childquizallocation;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;
use Log;

class AttemptController extends Controller
{
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
        // $attempts = Attempt::paginate(15);
        // return view('attempt.index', compact('attempts'));
    }

    /**
     * Get attempt by house id
     *
     * @param  int  $house_id
     * @return Response
     */
    public function get_attempt_by_house_id($house_id)
    {
        $attempts = Attempt::latest()->where('house_id', '=', $house_id)->where('enable', '=', 1)->get();
        
        if(!$attempts->count())    
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $attempts
        ], 200);
    }

    /**
     * Get attempt by house id
     *
     * @param  int  $child_id
     * @return Response
     */
    public function get_attempt_by_child_id($child_id)
    {
        $attempts = Attempt::latest()
                                ->select('attempts.*', 'childquizallocations.child_id')
                                ->where('childquizallocations.child_id', '=', $child_id)
                                ->where('attempts.enable', '=', 1)
                                ->where('childquizallocations.enable', '=', 1)
                                ->join('childquizallocations', 'childquizallocations.id', '=', 'attempts.allocation_id')    
                                ->get();
        
        if(!$attempts->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $attempts
        ], 200);
    }

    /**
     * Get attempt by house id
     *
     * @param  int  $child_id
     * @return Response
     */
    public function get_attempt_by_allocation_id($allocation_id)
    {
        $attempts = Attempt::latest()->where('allocation_id', '=', $allocation_id)->where('enable', '=', 1)->get();

        if(!$attempts->count())    
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $attempts
        ], 200);
    }

    /**
     * Get attempt by house id
     *
     * @param  int  $quiz_id
     * @return Response
     */
    public function get_attempt_by_quiz_id($quiz_id)
    {
        if($this->is_child())
        {
            // filter attempts by also child
            $attempts = Attempt::select('attempts.*')
                                ->join('childquizallocations', 'childquizallocations.id', '=', 'attempts.allocation_id')
                                ->where('childquizallocations.child_id', '=', Auth::user()->id)
                                ->where('attempts.quiz_id', '=', $quiz_id)
                                ->where('attempts.enable', '=', 1)
                                ->get();
            

        }
        else
        {
            $attempts = Attempt::latest()->where('quiz_id', '=', $quiz_id)->where('enable', '=', 1)->get();
        }

        if(!$attempts->count()) 
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $attempts
        ], 200);
    }

    /**
     * Get attempt by id
     *
     * @param  int  $id
     * @return Response
     */
    public function get_attempt_by_id($id)
    {
        $attempt = Attempt::where('id', '=', $id)->where('enable', '=', 1)->first();
        
        if(empty($attempt))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $attempt
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
            $request = $request->all();
            
            if(!$request['quiz_id'] or
                !$request['allocation_id'] or 
                !$request['house_id'])
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'Please provide all required fields'
                ], 422); 
            } 
            
            $request['user_id'] = Auth::user()->id;
            $request['status']  = 0; // 0:started, 1:skipped, 2:finished 4:watched
            $request['enable']  = 1; // 1;enable, 0:disable

            $attempt = Attempt::create($request);

            // Change quiz allacation status to 1 (1)
            Childquizallocation::find($request['allocation_id'])->update(['status' => 1]);
            return Response::json([
                    'query_status' => 'success',
                    'message' => 'Attempt Created Successfully', 
                    'data' => $attempt 
            ], 201);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        // if($this->is_admin() or $this->is_parent())
        // {
            $attempt = Attempt::find($id);
            if(empty($attempt))
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
            }
            
            $request = $request->all();
            if( // !$request['child_id'] or
                !$request['quiz_id'] or 
                !$request['allocation_id'] or 
                !$request['house_id'])
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'Please provide all required fields'
                ], 422); 
            }
            
            $request['user_id'] = Auth::user()->id;
            $request['status']  = 0; // 0:started, 1:skipped, 2:finished 4:watched
            $attempt->update($request);
            // update allocation to started
            //Childquizallocation::find($request['allocation_id'])->update(['status' => 1]);
            
            return Response::json([
                    'query_status' => 'success',
                    'message' => 'Record Updated Successfully', 
                    'data' => $attempt 
            ], 200);
            
        // }
        
        // return Response::json([
        //     'error' => 'access_denied'
        // ], 401);
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
        \Log::info('==== update attempt status ' . __CLASS__ . ':' .__FUNCTION__);
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
            
            $attempt = Attempt::find($id);
            // dd($attempt);
            if(empty($attempt))
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
            }
            
            $request = $request->all();
            
            $request['user_id'] = Auth::user()->id;
            $attempt->update($request);
            
            if($request['status']==1) // skipped
            {
                // update allocation to skipped
                Childquizallocation::find($attempt->allocation_id)->update(['status' => 2]);
            }
            if($request['status']==2) // finished
            {
                // update allocation to finished
                Childquizallocation::find($attempt->allocation_id)->update(['status' => 3]);
            }
            
            return Response::json([
                    'query_status' => 'success', 
                    'message' => 'Record Updated Successfully', 
                    'data' => $attempt 
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
            Attempt::destroy($id);
            return Response::json([
                'query_status' => 'success',
                'message' => 'Record successfully deleted!'
            ], 200);
        }
        
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }

    public function get_last_attempt_by_quiz_id($quiz_id)
    {
        
        if($this->is_child())
        {
            // filter attempts by also child
            $attempts = Attempt::select('attempts.*')
                ->join('childquizallocations', 'childquizallocations.id', '=', 'attempts.allocation_id')
                ->where('childquizallocations.child_id', '=', Auth::user()->id)
                ->where('attempts.quiz_id', '=', $quiz_id)
                ->where('attempts.enable', '=', 1)
                ->orderBy('attempts.id', 'desc')
                ->first();
        }
        else
        {
            // $this->is_parent();
            $attempts = Attempt::latest()->where('quiz_id', '=', $quiz_id)->where('enable', '=', 1)->get();
        }

        if(!$attempts->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $attempts
        ], 200);
    }


    public function updateStatus($id, Request $request)
    {
        $attempt = Attempt::find($id);
        if(empty($attempt))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $request = $request->all();
        if(!$request['status'])
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }

        $request['user_id'] = Auth::user()->id;
        $request['status']  = $request['status']; // 0:started, 1:skipped, 2:finished 3:watched
        $attempt->update($request);

        \Log::info("=== update attempt table with the status as " . print_r($request, true));
        
        return Response::json([
            'query_status' => 'success',
            'message' => 'Record Updated Successfully',
            'data' => $attempt
        ], 200);
    }

    public function getPassedAttempt($allocation_id)
    {
        $attempts = Attempt::latest()
            ->where('allocation_id', '=', $allocation_id)
            ->where('enable', '=', 1)
//            ->where('is_passed', '=', 1)
            ->first();

        if(!$attempts->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $attempts
        ], 200);
    }



}
