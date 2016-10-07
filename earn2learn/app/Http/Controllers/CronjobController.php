<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use Response;
use App\User;
use App\House;
use App\ChildHouse;
use App\MailSubscription;
use App\Video;
use App\Category;
use Youtube;
use Mail;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class CronjobController extends Controller
{
    public function __construct()
    {
       $this->middleware('jwt.auth', ['except' => ['daily_email', 'check_videos']]);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function daily_email()
    {
        $users = User::latest()->with('mail_subscription')->where('user.role_id', 2)->where('user.enable', 1)->get();
        if(!$users->count())
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found' 
                ]);
        
        foreach ($users as $user)
        {
//            if($user->id==66  && (isset($user->mail_subscription) && $user->mail_subscription->newsletter === 1))
            if($user->id && (isset($user->mail_subscription) && $user->mail_subscription->newsletter === 1))
            {
                $receiver = $user->email;
                $subject = "Daily Reminder";
                $message = "Message";
                $template = 'dailyemail';
                $token = '';

                // pass data to email send
                $email = Mail::send(['html' => 'emails.'.$template], ['user' => $user, 'token' => $token, 'email' => $receiver], function ($message) use ($user, $subject)
                {
                   // $message->from('info@wsolus.com', 'Earn to Learn');
                    $message->to($user->email, $user->f_name)->subject($subject);
                });
            }
        }
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	public function check_videos() 
	{	
		$videos = Video::select('id', 'url', 'title', 'video_id', 'video_ref', 'category_id')->where('enable', 1)->get(); 
		$data = array(); 
		foreach ($videos as $video) 
		{	
			if($video->video_ref=='youtube') 
			{ 
				// $video = Youtube::getVideoInfo($video->video_id); 
				// dd($video); 
				// echo 'This video => '.$video->video_id; 
				$category = Category::select('name')->where('id', $video->category_id)->first(); 
				if(!Youtube::getVideoInfo($video->video_id)) 
				{	
					// dd($c); 
					// echo $category->name; 
					$v_data = array( 'category' => $category->name, 'video_title' => $video->title, 'video_id' => $video->video_id ); 
					// echo ' removed'; 
					// Video::where('id', $video->id)->update(['enable'=>0]); 
					// array_push($data, $video->video_id); 
					array_push($data, $v_data); 
				} 
			} 
		} 
		
		// dd($data); 
		$receiver = env('ADMIN_EMAIL'); 
		$subject = "Lesson video has been corrupted"; 
		$message = "Lesson video has been corrupted"; 
		$template = 'videonotification'; 
		$token = ''; 
		$meta = json_encode($data); 
		
		/*$vs = json_decode($token); $refs = ''; 
        foreach ($vs as $v) 
        { 
            $refs .= 'In '.ucfirst($v->category).' Category, https://www.youtube.com/watch?v='.$v->video_id.' <br>'; 
        } 
        return $refs;*/ 
        
		$result = $this->send_email($receiver, $message, $subject, $template, $token, $meta); 
		// return $result; 
		var_dump($result);
		
	}
	
	
	
}
