<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Response;
use App\Question;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Log;

class QuestionController extends Controller
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
		/*$questions = Question::latest()->get();
		
		if(!$questions->count())
		{
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
    		'query_status' => 'success',
            'data' => $questions
        ], 200);*/
	}

	/**
	 * Get the questions by quiz id
	 *
	 * @return Response
	 */
	public function get_questions_by_quiz_id($quiz_id)
	{
		Log::info('Quiz id is: '. $quiz_id);
		$questions = Question::latest()->where('quiz_id',$quiz_id)->get();

		if(!$questions->count())
		{
            return Response::json([
                'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }
 
        return Response::json([
        	'query_status' => 'success',
            'data' => $questions
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
		if($this->is_admin() or $this->is_parent())
		{
			$request = $request->all();
			$request['user_id'] = Auth::user()->id;
			$request['enable'] = 1; // 1;enable, 0:disable
			
			if(	! $request['question'] 		or	
				! $request['video_id'] 		or
				! $request['question_type'] or 
				! $request['control_type']  )
			{
	            return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422);
	        }
	        
	        // $question = Question::create($request->all());
	        $question = Question::create($request);
	 		
	        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'Question Created Successfully',
	                'data' => $question
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
		//print_r('expression'); die;
		if($this->is_admin() )
		{
			//$this->validate($request, ['name' => 'required']); // Uncomment and modify if you need to validate any input.
			$question = Question::findOrFail($id);
			$request = $request->all();
			
			if(	!$request['question'] 		or	
				!$request['video_id'] 		or 
				!$request['question_type'] or 
				!$request['control_type']  )
			{
				// dd($question);
				return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422); 
			}
			
			$request['user_id'] = Auth::user()->id;
	        $question->update($request);
	
	        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'Question Updated Successfully', 
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
		Log::info('########################');
		Log::info('Delete user id is :'.$id);

		if($this->is_admin() or $this->is_parent())
		{
			Question::destroy($id);
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
