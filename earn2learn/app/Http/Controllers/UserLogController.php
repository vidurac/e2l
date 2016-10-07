<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use App\UserLog;
use Response;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;

class UserLogController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request)
    {
        $userlog = UserLog::create( ['start'=> date('Y-m-d H:i:s'), 'end'=> date('Y-m-d H:i:s'), 'user_id'=> Auth::user()->id, 'token'=> $request['token'] ] );
        
        return Response::json([
				'query_status' => 'success',
				'data' => ['log_id'=>$userlog->id]
			], 200);
			
    }

    /**
     * Store a newly created resource in storage.
     * @return Response
     */
    public function store(Request $request)
    {
        return Response::json([
                'error' => 'access_denied'
            ], 401);
        /*$request = $request->all();
        
        if( !$request['start'] or !$request['token'] )
        {
			return Response::json([
					'query_status' => 'error',
					'message' => 'missing argument'
				], 422); 
        }
        
		$userlog = UserLog::create( ['start'=> date('Y-m-d H:i:s'), 'end'=> date('Y-m-d H:i:s'), 'user_id'=> Auth::user()->id, 'token'=> $request['token'] ] );
        
        return Response::json([
				'query_status' => 'success',
				'data' => ['log_id'=>$userlog->id]
			], 200);*/
    }

    /**
     * Update a resource in storage.
     * @return Response
     */
    public function update($id, Request $request)
    {
        $recorde = UserLog::find($id);
        if(empty($recorde))
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'recorde not found'
                ], 404);
        }
        
        /*$request = $request->all();
        if( !$request['end'] )
        {
			return Response::json([
					'query_status' => 'error',
					'message' => 'missing argument'
				], 422); 
        }*/
        
        $recorde->update(['end'=> date('Y-m-d H:i:s')]);
        return Response::json([
				'query_status' => 'success',
				'message' => 'user log updated'
			], 200);
    }

}
