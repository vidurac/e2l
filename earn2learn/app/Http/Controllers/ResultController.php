<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Response;
use App\Result;
use App\Answer;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;
use Log;

class ResultController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        // $results = Result::paginate(15);
        // return view('result.index', compact('results'));
    }

    /**
     * Get by attempt id
     *
     * @param  int  $attempt_id
     * @return Response
     */
    public function get_result_by_attempt_id($attempt_id)
    {
        $results = Result::latest()->where('attempt_id', '=', $attempt_id)->get();
        
        if(!$results->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $results
        ], 200);
    }

    /**
     * Get by attempt id
     *
     * @param  int  $question_id
     * @return Response
     */
    public function get_result_by_question_id($question_id)
    {
        $results = Result::latest()->where('question_id', '=', $question_id)->get();
        
        if(!$results->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $results
        ], 200);
    }

    /**
     * Get recored by a result id.
     *
     * @param  int  $id
     * @return Response
     */
    public function get_result_by_id($id)
    {
       $result = Result::find($id);
        
        if(empty($result))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
            'query_status' => 'success',
            'data' => $result
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        // if($this->is_admin() or $this->is_parent() or $this->is_child())
        // {
            $request = $request->all();
            
            if( !$request['attempt_id'] or 
                !$request['question_id']or 
                !$request['answer_id']  )
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'Please provide all required fields'
                ], 422); 
            }
            
            // $is_correct = (!$request['is_correct']) ? $request['is_correct'] : 0 ;
            $request['is_correct'] = Answer::select('is_correct')->where('id',$request['answer_id'])->where('question_id',$request['question_id'])->first()->is_correct;
            $log_variable=$request['is_correct'];
            Log::info('Answer database result is : '.print_r($log_variable,true));
            // dd($is_correct);
            // $request['user_id'] = Auth::user()->id;
            $request['enable']  = 1; // 1;enable, 0:disable
            
            // $data = Result::create($request->all());
            $data = Result::create($request);
            
            return Response::json([
                    'query_status' => 'success',
                    'message' => 'Result Created Successfully', 
                    'data' => $data 
            ], 201);
        
        // }
        
        // return Response::json([
        //     'error' => 'access_denied'
        // ], 401);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        // if($this->is_admin() or $this->is_parent() or $this->is_child())
        // {
            $record = Result::findOrFail($id);
            $request = $request->all();
            
            if( !$request['attempt_id'] or 
                !$request['question_id']or 
                !$request['answer_id']  )
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'Please provide all required fields'
                ], 422); 
            }
            
            // $is_correct = (!$request['is_correct']) ? $request['is_correct'] : 0 ;
            $request['is_correct'] = Answer::select('is_correct')->where('id',$request['answer_id'])->where('question_id',$request['question_id'])->first()->is_correct;
            // $request['user_id'] = Auth::user()->id;
            
            $record->update($request);
            return Response::json([
                    'query_status' => 'success',
                    'message' => 'Record Updated Successfully', 
                    'data' => $record 
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
            Result::destroy($id);
            return Response::json([
                'query_status' => 'success',
                'message' => 'Record successfully deleted!'
            ], 200);
        }
        
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }

}
