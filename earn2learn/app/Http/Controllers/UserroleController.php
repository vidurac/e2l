<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Response;
use App\Userrole;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserroleController extends Controller
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
		
		$userroles = Userrole::latest()->get();
		
		if(!$userroles->count()){
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
		
	    return Response::json([
	    	'query_status' => 'success',
	        'data' => $userroles
	    ], 200);
		
	}
	
	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function get_userrole_by_id($userrole_id)
	{
		$userrole = Userrole::find($userrole_id);
		
		if(!$userrole){
            return Response::json([
                'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }
 
        return Response::json([
        	'query_status' => 'success',
            'data' => $userrole
        ], 200);
	}
	
	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return view('userrole.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{

		if(! $request->role_name or ! $request->enable){
            return Response::json([
                'error' => [
                    'message' => 'Please Provide Both role_name and enable'
                ]
            ], 422);
        }
        
        $userrole = Userrole::create($request->all());
 		
        return Response::json([
                'message' => 'Userrole Created Succesfully',
                'data' => $userrole
        ]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$userrole = Userrole::findOrFail($id);
		return view('userrole.show', compact('userrole'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$userrole = Userrole::findOrFail($id);
		return view('userrole.edit', compact('userrole'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request)
	{
		//$this->validate($request, ['name' => 'required']); // Uncomment and modify if you need to validate any input.
		$userrole = Userrole::findOrFail($id);
		$userrole->update($request->all());
		return redirect('userrole');
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
			Userrole::destroy($id);
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
