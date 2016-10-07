<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use App\TaskCategory;
use Response;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;

class TaskCategoryController extends Controller
{

	public function __construct(){
        $this->middleware('jwt.auth');
    }
    
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $taskcategories = TaskCategory::latest()->where('enable', 1)->get();
        if(!$taskcategories->count())
        {
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
        
        return Response::json([
	    	'query_status' => 'success',
	        'data' => $taskcategories
	    ], 200);
        
        
    }
    
    /**
     * Store a newly created resource in storage.
     * @return Response
     */
    public function store(Request $request)
    {
        if($this->is_admin())
		{
		    $request = $request->all();
		    
		    $request['user_id'] = Auth::user()->id;
		    $request['enable'] = 1; // 1;enable, 0:disable
		    
		    if(	! $request['category'] )
			{
	            return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'please provide all required fields'
	            ], 422);
	        }
		}
		
		$taskcategory = TaskCategory::create($request);
        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'task category created successfully',
	                'data' => $taskcategory
	        ], 201);
    }

    /**
     * Display the specified resource.
     * @param  int  $id
     * @return Response
     */
    public function by_id($id)
    {
        $taskcategory = TaskCategory::latest()->where('id', $id)->where('enable', 1)->first();
        
        if(!$taskcategory)
        {
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
        
        return Response::json([
	    	'query_status' => 'success',
	        'data' => $taskcategory
	    ], 200);
    }

    /**
     * Update the specified resource in storage.
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        if($this->is_admin())
		{
			$taskcategory = TaskCategory::find($id);
			$request = $request->all();
			
			if(	! $request['category'] )
			{
				return Response::json([
					'query_status' => 'error',
					'message' => 'please provide all required fields'
				], 422); 
			}
			
			$request['user_id'] = Auth::user()->id;
			$taskcategory->update($request);
				
			return Response::json([
				'query_status' => 'success',
				'message' => 'task category updated successfully', 
				'data' => $taskcategory 
			], 200);
			
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
      	
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
			TaskCategory::destroy($id);
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
