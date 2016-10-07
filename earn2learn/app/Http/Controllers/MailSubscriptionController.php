<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\MailSubscription;
use Response;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;

class MailSubscriptionController extends Controller
{

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
        $mailsubscriptions = MailSubscription::select('mailsubscriptions.*', 'user.email')
                        ->join('user', 'user.id', '=', 'mailsubscriptions.user_id')    
                        ->where('mailsubscriptions.enable', 1)
                        ->where('user.enable', 1)
                        ->get();
        if(!$mailsubscriptions->count())    
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
        }
        return Response::json([
                'query_status' => 'success',
                'data' => $mailsubscriptions
            ], 200);
    }
    
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function by_user($id=null)
    {
        if($id==null)
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'missing argument'
                ], 405);
        }
        // $mailsubscription = MailSubscription::latest()->where('user_id', $id)->first();
        $mailsubscription = MailSubscription::select('mailsubscriptions.*', 'user.email')
                        ->join('user', 'user.id', '=', 'mailsubscriptions.user_id')    
                        ->where('mailsubscriptions.user_id', $id)
                        ->where('mailsubscriptions.enable', 1)
                        ->where('user.enable', 1)
                        ->first();
        if(empty($mailsubscription))    
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
        }
        
        return Response::json([
                'query_status' => 'success',
                'data' => $mailsubscription 
            ], 200);
    }
    
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function by_id($id=null)
    {
        if($id==null)
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'missing argument'
                ], 405);
        }
        
        $mailsubscription = MailSubscription::select('mailsubscriptions.*', 'user.email')
                        ->join('user', 'user.id', '=', 'mailsubscriptions.user_id')    
                        ->where('mailsubscriptions.id', $id)
                        ->where('mailsubscriptions.enable', 1)
                        ->where('user.enable', 1)
                        ->first();
        if(empty($mailsubscription))    
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
        }
        
        return Response::json([
                'query_status' => 'success',
                'data' => $mailsubscription 
            ], 200);
    }
    
    /**
     * Store a newly created resource in storage.
     * @return Response
     */
    public function store(Request $request)
    {
        $request = $request->all();
        if( !$request['user_id'] )
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'please provide all required fields'
            ], 422); 
        }
        
        $request['enable']  = 1; // 1:enable, 0:disable
        $mailsubscription = MailSubscription::create($request);
        
        return Response::json([
                'query_status' => 'success',
                'message' => 'user subscribed successfully'
                // 'data' => $mailsubscription 
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        $mailsubscription = MailSubscription::find($id);
        if(empty($mailsubscription))
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
        }
        
        $request = $request->all();
        if( !$request['user_id'] )
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'please provide all required fields'
                ], 422); 
        }
        
        $request['payment']     = ( $request['payment'] == 'true' ) ? 1 : 0;
        $request['giftcard']    = ( $request['giftcard'] == 'true' ) ? 1 : 0;
        $request['lesson']      = ( $request['lesson'] == 'true' ) ? 1 : 0;
        $request['task']        = ( $request['task'] == 'true' ) ? 1 : 0;
        $request['newsletter']  = ( $request['newsletter'] == 'true' ) ? 1 : 0;
        $request['certificate'] = ( $request['certificate'] == 'true' ) ? 1 : 0;

        $result = $mailsubscription->update($request);
        if($result)
        {
            return Response::json([
                        'query_status' => 'success',
                        'message' => 'subscription updated successfully',
                        'cer'=>$request['certificate']
                ], 200);
        }
        
        return Response::json([
                    'query_status' => 'error',
                    'message' => 'process failed' ,
            ], 501);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        if($id==null)
        {
            return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'missing argument'
		    ], 405);
        }
        
        if($this->is_admin())
        {
            MailSubscription::destroy($id);
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
