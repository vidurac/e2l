<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use Auth;
use Response;
use Mail;
use App\User;
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct(){
        // get house data of the uesr
		if(Auth::user()->role_id==2) // parent
		{
			$house = House::latest()->where('user_id', '=', Auth::user()->id)->first()->id;
		    Auth::user()->house_id = $house;
		}
		elseif(Auth::user()->role_id==3) // child
		{
			$house = House::latest()->select('house.created_at', 'house.id', 'house.name')->where('child_id', '=',Auth::user()->id)->join('childhouses', 'childhouses.house_id', '=', 'house.id')->first()->id;
		    Auth::user()->house_id = $house;
		}
    }
    
    public function is_admin()
    {
        if(isset(Auth::user()->role_id) and Auth::user()->role_id == 1)
        {
            return true;
        }
        return false;
    }
    
    public function is_parent()
    {
        if(isset(Auth::user()->role_id) and Auth::user()->role_id == 2)
        {
            return true;
        }
        return false;
    }
    
    public function is_child()
    {
        if(isset(Auth::user()->role_id) and Auth::user()->role_id == 3)
        {
            return true;
        }
        return false;
    }
    
    public function is_moderator()
    {
        if(isset(Auth::user()->role_id) and Auth::user()->role_id == 4)
        {
            return true;
        }
        return false;
    }
    
    public function set_enable()
    {
        if(isset(Auth::user()->role_id) and Auth::user()->role_id == 4)
        {
            return true;
        }
        return false;
    }

    public function is_sponsor()
    {
        if(isset(Auth::user()->role_id) and Auth::user()->role_id == 5)
        {
            return true;
        }
        return false;
    }

    /**
     * check an e-mail.
     * @param  int  $email
     * @return Response
     */
    public function check_email($email)
    {
        if(User::where('email', $email)->first())
        {   
            // dd(User::where('email', $email)->first()->email);
            // return true
            return true;
        }
        // return false
        return false;
    } 
    
    /**
     * check an username.
     * @param  int  $username
     * @return Response
     */
    public function check_username($username)
    {
        if(User::where('username', $username)->first())
        {   
            // return true
            return true;
        }
        // return false
        return false;
    } 
    
    /**
     * Send an e-mail reminder .
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function email_reminder(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        Mail::send('emails.reminder', ['user' => $user], function ($message) use ($user) 
        {
            // set sender
            $message->from('hello@app.com', 'Your Application');
            // set reciver
            $message->to($user->email, $user->name)->subject('Your Reminder!');
        });
        
    }
    
    /**
     * Send an e-mail reminder .
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function send_email($receiver, $message, $subject, $template, $token=null, $meta=null,$pw=null)
    {
        // $user = User::where->('email', $email)->where('enable', 1)->first();
        $user = User::latest()->where('email', $receiver)->first();
        // dd($meta);
        // check user
        if(!empty($user))
        {
            // Mail::send('emails.reminder', ['token' => $token], function ($message) use ($user) 
            Mail::send(['html' => 'emails.'.$template], ['meta' => $meta, 'parent' => $user->f_name , 'username' => $user->username, 'pw' => $pw, 'token' => $token, 'email' => $user->email], function ($message) use ($user, $subject, $meta)
			{
				// set sender
				//$message->from('info@e2l.com', 'Earn to Learn');
				// set reciver
				$message->to($user->email, $user->f_name)->subject($subject);
				// $message->to('pradeepprasanna.rajapaksha4@gmail.com', $user->f_name)->subject($subject);
			});
			
			return true;
        }
        
        return false;
    }
    
    /**
     * Genarate token.
     *
     * @param  string  $email
     * @return string
     */
    public function generate_token($length=null)
    {
        // ceck parameter
        if(	is_null($length))
		{   // set default length
            $length = 64; 
        }
        
        // return token
        return substr(str_shuffle("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"), 0, $length);
        
    }    

}
