<?php

namespace App\Http\Controllers;

use Auth;
use Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\User;
use App\PasswordReset;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;
use Log;

class PasswordController extends Controller
{   

    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['tok_verify', 'psw_reset']]);
    }

    public function index()
    {
        //dd('WERTYUIODFGHJKXCVBNM');
    }  

    public function psw_reset(Request $request)
    {
        $request = $request->all();

//        print_r($request);
//        die;

        if(	! $request['reset_token'] or ! $request['password'])
		{ 
            return Response::json([
            	'query_status' => 'error',
            	'message' => 'please provide all required fields'
            ], 422); 
        } 
        
		$validate = PasswordReset::where('token', $request['reset_token'])->where('enable', 1)->where('expiry', '>', date('Y-m-d H:i:s'))->first();
		
		if ( $validate ) 
		{ 
            $email = $validate->email; 
			// encript passwords 
			$password = bcrypt($request['password']); 
			// filter user by email 
			$user = User::where('email', $validate->email)->first();
            $token = $request['reset_token'];
			
			if($user->update([ 'password' => $password, 'enable' => 1 ]) )
			{ 
                PasswordReset::where('token', $token)->update(['enable'=>0]);
                
                $subject = "Eran to Learn account password changed";
                $message = "Message";
                $receiver = $email;
                $template = 'pswchanged';
                $user = User::latest()->where('email', $receiver)->first();

                $email = $this->send_email($receiver, $message, $subject, $template, $token=null);
                // check mail send
                // if($email){}

				return Response::json([ 
						'query_status' => 'success', 
						'message' => 'password changed successfully' 
					], 200); 
			} 
		} 
		
		return Response::json([
				'query_status' => 'error',
				'message' => 'token expired or missed match'
			], 406);
    }
    
    public function tok_verify($token=null)
    {
        // dd($request);
        if($token==null)
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'missing argument'
                ], 405);
        }
        
        $result = PasswordReset::latest()->where('token', $token)->first();
        
        if(empty($result))
        {
			return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);	
		}
		
        if($result->enable == 0 or $result->expiry > date('Y:m:d H:i:s'))
        {
			return Response::json([
                    'query_status' => 'error',
                    'message' => 'token expiry or missed match'
                ], 401);	
		}
		
        // PasswordReset::where('token', $token)->update(['enable'=>0]);
        return Response::json([
                'query_status' => 'success',
                'message' => 'token verified'
            ], 200);
    }    
 
}
