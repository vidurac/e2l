<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Response;
use App\House;
use App\User;
use DB;
use Illuminate\Http\Request;
use Carbon\Carbon;

class HouseController extends Controller
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
		$houses = House::latest()->get();
		
		if(!$houses->count())
		{
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}

	    return Response::json([
	    	'query_status' => 'success',
	        'data' => $houses
	    ], 200);
	}

	/**
	 * For return house by a id.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function get_house_by_id($house_id)
	{
		// $house = House::find($house_id);
		$house = House::latest()->select('house.*', 'user.f_name', 'user.l_name', 'user.profile_image')
								->join('user', 'user.id', '=', 'house.user_id')
								->where('house.id', '=', $house_id)
								->first();

		if(empty($house))
		{
			return Response::json([
			    'query_status' => 'error',
		    	'message' => 'House does not exist'
            ], 404);
        }
        
        $house->members = DB::table('user')->select('user.f_name', 'user.l_name', 'user.id', 'user.profile_image')
								->join('childhouses', 'user.id', '=', 'childhouses.child_id')
								->where('childhouses.house_id', '=', $house->id)
								->where('user.role_id', '=', 3)   // role_id = 3 --->> child
								->orderBy('user.created_at', 'desc')
								->get();
        
        return Response::json([
    		'query_status' => 'success',
            'data' => $house
        ], 200);
        
	}

	/**
	 * For return house by a by perant.
	 *
	 * @param  int  $perant_id
	 * @return Response
	 */
	public function get_house_by_user_id($user_id) // by perant
	{
		// $houses = House::latest()->get(); // temp
		$houses = House::latest()->where('user_id', '=', $user_id)->get();
		
		if(!$houses->count())
		{
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
		
	    return Response::json([
	    	'query_status' => 'success',
	        'data' => $houses
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
			
			//$this->validate($request, ['name' => 'required']); // Uncomment and modify if you need to validate any input.
			$request = $request->all();
			
			if(	! $request['name']	 		// or 
				// ! $request['user_id']
				// ! $request['description']   or 
				){
					
	            return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422); 
	        } 
	        
			$request['user_id'] = Auth::user()->id;
			
	        // $user = House::create($request->all());
	        $house = House::create($request);
	 		
	        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'House Created Successfully', 
	                'data' => $house 
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
			$house = House::find($id);
			if(empty($house) or !$house)
			{
				return Response::json([
		        		'query_status' => 'error',
		                'message' => 'house not found', 
		        ], 404);
			}
			
			$request = $request->all();
			
			if(	! $request['name'])
			{
				
	            return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422); 
			} 
	
	        $house->update($request);
	
	        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'House Updated Successfully', 
	                'data' => $house 
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
			
			House::destroy($id);
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
	
	
	/**
	 * For get all Houses and their Owners and Childs
	 *
	 * @return Response
	 */
	public function get_houses_full_data()
	{
		if($this->is_admin())
		{
			$houses = House::latest()->select('house.*', 'user.f_name', 'user.l_name', 'user.profile_image')
								->join('user', 'user.id', '=', 'house.user_id')
								->get();
			
			if(!count($houses))
			{
				return Response::json([
			    	'query_status' => 'error',
			    	'message' => 'data not found'
			    ], 404);	
			}
			
			foreach ($houses as $key => $house)
			{
				$childs = DB::table('user')->select('user.f_name', 'user.l_name', 'user.profile_image', 'user.id')
								->join('childhouses', 'user.id', '=', 'childhouses.child_id')
								->where('childhouses.house_id', '=', $house->id)
								->where('user.role_id', '=', 3) // role_id = 3 --->> child
								->orderBy('user.created_at', 'desc')
								->get();
				
				$house->members = $childs;
			}
			
			return Response::json([
	        		'query_status' => 'success',
	                'message' => 'House Updated Successfully', 
	                'data' => $houses 
	        ], 200);
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);

	}

	public function getChildrenByHouseId($id)
	{
		$children = User::latest()
			->select('user.*')
			->join('childhouses', 'user.id', '=', 'childhouses.child_id')
			->where('childhouses.house_id', '=', $id)
			->where('user.enable', '=', 1)
			->get();
		if (!$children->count()) {
			return Response::json([
				'query_status' => 'error',
				'message' => 'data not found'
			], 404);
		}

		return Response::json([
			'query_status' => 'success',
			'data' => $children
		], 200);
	}

	/**
	 * get house created user
	 *
	 * @param $id
	 * @return mixed
	 */
	public function getUserByHouseId($id)
	{
		$user = User::first()
			->select('user.*')
			->join('house', 'house.user_id', '=', 'user.id')
			->where('house.id', '=', $id)
			->where('user.enable', '=', 1)
			->get();
		
		if (!$user->count()) {
			return Response::json([
				'query_status' => 'error',
				'message' => 'data not found'
			], 404);
		}

		return Response::json([
			'query_status' => 'success',
			'data' => $user
		], 200);
	}
}
