<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Response;
use App\Answer;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AnswerController extends Controller
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
		// $answers = Answer::latest()->get();
		// return view('answer.index', compact('answers'));
	}

	/**
	 * Get the answers by question id.
	 *
	 * @return Response
	 */
	public function get_answers_by_question_id($question_id)
	{
		$answers = Answer::latest()->where('question_id',$question_id)->get();

		if(!$answers->count())
		{
            return Response::json([
                'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }
 
        return Response::json([
        	'query_status' => 'success',
            'data' => $answers
        ], 200);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		//$this->validate($request, ['name' => 'required']); // Uncomment and modify if you need to validate any input.
		if($this->is_admin())
		{
			$request = $request->all();
			
			if(	! $request['answer'] 		or 
				! $request['question_id'])
			{
	            return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422);
	        }
	        
			$request['user_id'] = Auth::user()->id;
			$request['enable'] = 1; // 1;enable, 0:disable
	        // $category = Answer::create($request->all());
	        $category = Answer::create($request);
	 		
	        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'Answer Created Successfully',
	                'data' => $category
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
		if($this->is_admin())
		{
			//$this->validate($request, ['name' => 'required']); // Uncomment and modify if you need to validate any input.
			$question = Answer::findOrFail($id);
			$request = $request->all();
			
			if(	! $request['answer'] 		or 
				! $request['question_id'])
			{
				return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422); 
			}
			
			$request['user_id'] = Auth::user()->id;
	        $question->update($request);
	
	        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'Answer Updated Successfully', 
	                'data' => $question 
	        ], 200);
        
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
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
			Answer::destroy($id);
			// return redirect('category');
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
