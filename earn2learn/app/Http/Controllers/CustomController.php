<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Response;
use App\User;
use App\Quiz;
use App\House;
use App\ChildHouse;
use App\Attempt;
use App\Result;
use App\Video;
use App\Reward;
use App\UserLog;
use Mail;
use App\MailSubscription;
use DB;
use View;
use Image;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class CustomController  extends Controller
{
    public function __construct()
	{
        $this->middleware('jwt.auth', ['except' => ['index', 'test_mail', 'html2image', 'testImageResize']]);
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $text = "Hello there! This is Earn to Learn custom functionality area. 
        <br>
        <a href='https://laravel-pradeepc9.c9users.io/e2l.api/public/api/v1/custom/mailsubscription?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU4LCJpc3MiOiJodHRwOlwvXC9sYXJhdmVsLXByYWRlZXBjOS5jOXVzZXJzLmlvXC9lMmwuYXBpXC9wdWJsaWNcL2FwaVwvdjFcL2F1dGhlbnRpY2F0ZSIsImlhdCI6MTQ1NjU1MTAzNCwiZXhwIjoxNjE0MjMxMDM0LCJuYmYiOjE0NTY1NTEwMzQsImp0aSI6IjZmMDYzMDk2N2MwMWNjYTJjMDViMjE0ZWNjZTkxZGVkIn0.EE6O6yLSoyJEPGCX_NgKtmIu3cVk-1kj0Tr9I8UJCbo'>
            email subscription migration
        <a/>
        ";
        return $text; 
    }
    
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function test_mail()
    {
        $receiver = 'gomes.chaminda@gmail.com';
        $subject = "Hello There! Its Earn to Learn.";
        $message = "Test Email Message";
        $template = 'dailyemail';
        $token = '';
        
        // pass data to email send 
        $email = Mail::send(['html' => 'emails.'.$template], ['token' => $token, 'email' => $receiver], function ($message) use ($subject) 
        {
            //$message->from('info@e2l.com', 'Earn to Learn');
            $message->to('gomes.chaminda@gmail.com', 'Test User')->subject($subject);
        }); 
    }

    /**
     * 
     * 
     */
    public function mailsubscription()
    {
        $users = User::select('id', 'email')->get();
        foreach ($users as $user) 
        {
            $exist = MailSubscription::where('user_id', $user->id)->first();
            if(empty($exist))
            {
                $mailsubscription = MailSubscription::create(['user_id'=>$user->id]);
                // echo '>>>>> empty';
                echo '>>>>> user mail : '. $user->email;
                echo '<br>';
            }
            else
            {
                echo '>>>>> no data to migrate!';
                echo '<br>';
            }
        }
    }
    
    /*
     *
     *
     */
    public function html2image()
    {
        // return View::make('certificate/index')->render();
        
        $conv = new \Anam\PhantomMagick\Converter();
        
        // dd( date('F d Y', strtotime('2016-03-19 10:58:17')) );
        
        $options = [
            'width' => 800,
            'quality' => 90
        ];
        
        $data = array(
                'name' => 'Pradeep '.' '.'Rajapaksha',  
                'category' => 'Maths',  
                'date' => date('F d Y', strtotime('2016-03-19 10:58:17')),  
            );
        // return View::make('certificate/index', $data)->render();
        $view = View::make('certificate/index', $data)->render();
        
        $file = 'E2L-CRT-H82C183CT78-1458748610'.'.png';
        // $conv->source($view)
        // $conv->setImageOptions($options);
        $conv->addPage($view)
            ->width(800)
            ->height(600)
            ->quality(50)
            ->toPng()
            ->save('./uploads/certificate/'.$file);
            
    }

    /**
     * 
     * 
     * 
     */
    public function testImageResize()
    {
		$destinationPath = 'uploads/profile/profile_179.jpg'; 
        // create instance
        $img = Image::make($destinationPath);
        // resize image
        $img->fit(300, 300);
        // save image
        $img->save('uploads/test/bar.jpg');
        
		return Response::json([ 
				'query_status' => 'success', 
				'img' => $destinationPath 
			], 201); 
    }
}
