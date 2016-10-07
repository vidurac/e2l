<?php

namespace App\Http\Controllers;

use App\Events\NotifyParent;
use App\HouseSponsor;
use App\Http\Requests;
use App\Http\Controllers\Controller;


use App\SponsorInvitation;
use Auth;
use Illuminate\Support\Facades\DB;
use Response;
use App\User;
use App\House;
use App\ChildHouse;
use App\Notification;
use App\UserLog;
use App\PasswordReset;
use App\MailSubscription;
use Illuminate\Http\Request;
use Mail;
use Carbon\Carbon;
use Log;

class UserController extends PaymentController
{	
	public function __construct()
	{
        $this->middleware('jwt.auth', ['except' => ['register', 'forgot_password', 'confirm_email', 'validate_sponsor_token']]);
    }

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$current_user = Auth::user();
		
		if(!$current_user->count())
		{
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'user not found'
		    ], 404);
		}
		if(!$current_user->enable==1)
		{
			return Response::json([
				'error' => 'access_denied',
				'message' => 'unauthorized access blocked'
			], 401);	
		}

		// get house data of the uesr
		if($current_user->role_id==2) // parent
		{
			$house = House::latest()
						->select('house.created_at', 'house.id', 'house.user_id', 'house.name', 'house.image as house_image')
						->where('user_id', '=',$current_user->id)
						->where('enable', '=', 1)
						->first();
			// $house = House::latest()->where('user_id', '=',$current_user->id)->first();
			// check user has a house
			if(!$house)
			{
				return Response::json([
			    	'query_status' => 'error',
			    	'message' => 'house has been disabled'
			    ], 404);	
			}
			// set init para:
			$current_user['is_expired'] = false;
			$current_user['on_trial'] = false;
			$current_user['fb_connect'] = false;
			
			// check user has been passed trial ends date 
			if( !empty($current_user->trial_ends_at) and $current_user->trial_ends_at > date('Y-m-d H:i:s') )
				$current_user['on_trial'] = true;

			// check user has been passed trial ends date and not subscibtion
			if( is_null($current_user->subscription_ends_at) and $current_user->trial_ends_at < date('Y-m-d H:i:s') )
				$current_user['is_expired'] = true;
				
			// check user has been connected with facebook 
			if( !empty($current_user->fb_password) and !empty($current_user->_fb) )
				$current_user['fb_connect'] = true;

			//check subscription payment success

			// check user has been passed subscription ends date
			if( !empty($current_user->subscription_ends_at) and $current_user->subscription_ends_at < date('Y-m-d H:i:s') )
			{
				if(Auth::user()->subscribed('customer')){
					if(!$this->isActiveSubscription($current_user->stripe_subscription)){
						if(!$this->isExpiredSubscription($current_user->stripe_id) && $current_user->payment_status ){
							$current_user['is_expired'] = true;
						}
					}else{
						$this->notifySubscriptionFail([
							'userId' => Auth::user()->id
						]);
						$current_user['is_expired'] = true;
					}
				}else{
					$current_user['is_expired'] = true;
				}
			}

			if(!empty($current_user->trial_ends_at) and $current_user->trial_ends_at < date('Y-m-d H:i:s') && $this->isSponsor($current_user)){
				if($this->hasChild($current_user)){
					$current_user['is_expired'] = true;
				}
			}



		}
		elseif($current_user->role_id==3) // child
		{
			// get child's house
			$house = House::latest()
					->select('house.created_at', 'house.id', 'house.user_id', 'house.name', 'house.image as house_image')
					->where('child_id', '=',$current_user->id)
					->join('childhouses', 'childhouses.house_id', '=', 'house.id')
					->where('house.enable', 1)
					->where('childhouses.enable', 1)
					->first();
			
			// check user has a house
			if(!$house)
			{
				return Response::json([
			    	'query_status' => 'error',
			    	'message' => 'house has been disabled'
			    ], 404);	
			}
			// get child's parent data
			$parent = User::latest()->where('id', $house->user_id)->where('enable', 1)->first();
			// set init para:
			$current_user['is_expired'] = false;
			$current_user['on_trial'] = false;
			
			// check user has been passed trial ends date  (applicable for parent)
			if(!empty($parent->trial_ends_at) and $parent->trial_ends_at > date('Y-m-d H:i:s') )
				$current_user['on_trial'] = true;
				
			// check user has been passed subscription ends date (applicable for parent)
			if(!empty($parent->subscription_ends_at) and $parent->subscription_ends_at < date('Y-m-d H:i:s') )
				$current_user['is_expired'] = true;
				
		}
		
		// check and set house data to user response data
        if(isset($house) and count($house))
        {	
        	// bind house data to user data
            $current_user['house_id'] = $house->id;
            $current_user['house_name'] = $house->name;
            $current_user['house_image'] = $house->house_image;
        }
		// return data
		return Response::json([
		    	'query_status' => 'success',
		        'data' => $current_user
		    ], 200);
		
	}

    /**
     * Display children by parent id.
     *
     * @return Response
     */
    public function get_user_by_parent_id($parent_id=null)
    {
       // get children for parent
        $child = House::select('user.f_name', 'user.l_name','user.id','user.profile_image','user.enable')
                ->join('childhouses', 'house.id', '=', 'childhouses.house_id')
                ->join('user', 'user.id', '=', 'childhouses.child_id')
                ->where('house.user_id', $parent_id)
                ->get();
        //print_r($child);

        /*if(empty($child))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'User does not exist'
            ], 404);
        }*/

        return Response::json([
            'query_status' => 'success',
            'data' => $child
        ], 200);

    }

	/**
	 * Display a listing of the resource by id.
	 *
	 * @return Response
	 */
	public function get_user_by_id($id=null)
	{	
		// check request argument
		if($id==null)
			return Response::json([
	            	'query_status' => 'error',
			    	'message' => 'missing argument'
	            ], 405);
		// get data of the uesr
		$user = User::select('user.id', 'user.f_name', 'user.l_name', 'user.email', 'user.telephone', 'user.mobile', 'user.address', 'user.city', 'user.country', 'user.state', 'user.date_of_birth', 'user.gender', 'user.profession', 'user.profile_image', 'user.role_id', 'user.username', 'user.enable', 'user.created_at', 'user.updated_at')
					->where('id', $id)->first();
		
		if($user->role_id==2) // parent
		{
			// get house data of the uesr
			$house = House::where('user_id', '=', $id)->where('enable', '=',1)->first();
		}
		elseif($user->role_id==3) // child
		{
			// get house data of the uesr
			$house = ChildHouse::select('house.id', 'house.name')
	                ->join('house', 'house.id', '=', 'childhouses.house_id') 
					->where('house.enable', 1)
					->where('childhouses.child_id', $id)
					->where('childhouses.enable', 1)
					->first();
		}
		
		if(empty($user))
		{
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'User does not exist'
            ], 404);
        }
        // check and set house data to user response data
        if(isset($house) and count($house))
        {	// bind house data to user data
            $user['house_id'] = $house->id;
            $user['house_name'] = $house->name;
        }
			
        return Response::json([
			'query_status' => 'success',
            'data' => $user
        ], 200);
		
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function get_all_users()
	{
		// get all users
		$users = User::latest()->get();
		// check $users not empty 
		if(!$users->count())
		{
			return Response::json([
			    	'query_status' => 'error',
			    	'message' => 'data not found'
			    ], 404);	
		}
		return Response::json([
		    	'query_status' => 'success',
		        'data' => $users
		    ], 200);
		
	}

    /**
     * Returns recently added parents with
     * child count.
     * @param int $limit
     * @return
     */
	public function get_all_parents_with_child_count($limit = 5) {

        if($this->is_admin() or $this->is_parent())
        {
            $users = User::latest()->select('user.*', DB::raw('count(childhouses.id) as no_of_children'))->join('house', 'house.user_id', '=', 'user.id')
                ->leftJoin('childhouses', 'childhouses.house_id', '=', 'house.id')
                ->where('user.role_id', 2) // parent role id
                ->groupBy('user.id')
                ->get()->take($limit);

            if(!$users->count())
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
            }
            return Response::json([
                'query_status' => 'success',
                'data' => $users
            ], 200);
        }

        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }

    /**
     * Display a listing of the activities by user id.
     *
     * @return Response
     */
    public function load_recent_activities($user_id=null)
    {
        // check request argument
        if($user_id==null)
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing user id'
            ], 405);

        // get users recent activities
        $activities = Notification::select('notification.user_id', 'notification.message', 'notification.type', 'notification.created_at')
            ->where('notification.user_id', '=', $user_id)
            ->where('notification.type', '!=', 'message')
            ->orderBy('notification.created_at', 'desc')
            ->limit(6)
            ->get();

        if(!count($activities))
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);

        return Response::json([
            'query_status' => 'success',
            'data' => $activities
        ], 200);

    }



	/**
	 * Display a listing of the resource by id.
	 *
	 * @return Response
	 */
	public function get_all_users_by_house($house_id=null)
	{
		// check request argument
		if($house_id==null)
			return Response::json([
	            	'query_status' => 'error',
			    	'message' => 'missing argument'
	            ], 405);
		// get users and filter by house id
		$users = User::select('user.id', 'user.f_name', 'user.l_name', 'user.email', 'user.telephone', 'user.mobile', 'user.address', 'user.city', 'user.country', 'user.date_of_birth', 'user.gender', 'user.profession', 'user.profile_image', 'user.role_id', 'user.username', 'user.enable', 'user.created_at', 'user.updated_at', 'childhouses.house_id')
					->join('childhouses', 'user.id', '=', 'childhouses.child_id')
					->where('childhouses.house_id', '=', $house_id)
					->where('childhouses.enable', '=', 1)
					->where('user.enable', '=', 1)
					->orderBy('user.created_at', 'desc')
					->get();
		// check $users not empty
		if(!count($users))
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		
	    return Response::json([
	    	'query_status' => 'success',
	        'data' => $users
	    ], 200);
		
	}/**
	 * Display a listing of the resource by id.
	 *
	 * @return Response
	 */
	public function get_all_user_messages_by_house($house_id=null,$user_id=null)
	{
		// check request argument
		if($house_id==null)
			return Response::json([
	            	'query_status' => 'error',
			    	'message' => 'missing argument'
	            ], 405);
		// get users and message count by house id and user id


        $users=DB::table('user')->select('user.id', 'user.f_name', 'user.l_name', 'user.email', 'user.telephone', 'user.mobile', 'user.address', 'user.city', 'user.country', 'user.date_of_birth', 'user.gender', 'user.profession', 'user.profile_image', 'user.role_id', 'user.username', 'user.enable', 'user.created_at', 'user.updated_at', 'childhouses.house_id','cn.counts')
            ->join('childhouses','user.id','=','childhouses.child_id')
            ->leftjoin(DB::raw('(SELECT COUNT(*) counts, inbox_message.user_id FROM inbox_message WHERE inbox_message.receiver_id ='.$user_id.' AND inbox_message.status = 0 GROUP BY user_id) cn'),function($join)
            {
                $join->on('user.id', '=', 'cn.user_id');
            })
            ->where('childhouses.enable','=',1)
            ->where('user.enable','=',1)
            ->where('childhouses.house_id','=',$house_id)
            ->orderBy('childhouses.created_at', 'DESC')
            ->get();

        // check $users not empty
		if(!count($users))
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);

	    return Response::json([
	    	'query_status' => 'success',
	        'data' => $users
	    ], 200);

	}

	/**
	 * Display a listing of the resource by id.
	 *
	 * @return Response
	 */
	public function get_all_users_by_userrole($userrole_id=null)
	{
		// check request argument
		if($userrole_id==null)
			return Response::json([
	            	'query_status' => 'error',
			    	'message' => 'missing argument'
	            ], 405);
		// get data 
		$users = User::latest()
            ->select('user.*', DB::raw('CONCAT(f_name, " ", l_name) AS full_name'))
            ->where('role_id', '=', $userrole_id)
            ->where('enable', '=',1)->get();
		// check data not empty
		if(!$users->count()){
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
	    return Response::json([
	    	'query_status' => 'success',
	        'data' => $users
	    ], 200);
		
	}

	/**
	 * Display a listing of the resource by first name, last name or username.
	 *
	 * @return Response
	 */
	public function get_user_by_name($name=null)
	{
		// check request argument
		if($name==null)
			return Response::json([
	            	'query_status' => 'error',
			    	'message' => 'missing argument'
	            ], 405);
	    // filter data by f_name, l_name, username
		$user = User::orderBy('id','asc')
			->where('enable', '=',1)
		  	->where('f_name', 'LIKE', "%{$name}%")
		  	->orWhere('l_name', 'LIKE', "%{$name}%")
		  	->orWhere('username', 'LIKE', "%{$name}%")
		  	->get();
		// check data set not empty
		if($user->isEmpty()){
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'User does not exist'
            ], 404);
        }
        return Response::json([
    		'query_status' => 'success',
            'data' => $user
        ], 200);
		
	}

	/**
	 * Store a newly created resource in storage.
	 * 
	 * For add a child
	 * 
	 * @return Response
	 */
	public function store(Request $request)
	{

		if($this->is_admin() or $this->is_parent())
		{
			$request = $request->all();
            $pw = $request['password'];
			$request['password'] = bcrypt($request['password']);
			
			// check user role, for catch child
			if(isset($request['role_id']) && $request['role_id']==3) // (role_id = 3) >>>> child
			{	// for child, do not necessary a email
				$request['email'] = (!empty($request['email']))? $request['email']: '';
			}
			// check request para: >>>> ***frond end has validated data highly!***
			if(	! $request['f_name']	 	or 
				! $request['l_name']    	or 
				// ! $request['email']	 		or 
				! $request['password']  	or 
				! $request['username']	
				/*! $request['telephone'] 	or 
				! $request['mobile']	 	or 
				! $request['address']   	or 
				! $request['city']	 		or 
				! $request['country']   	or 
				! $request['date_of_birth']	or 
				! $request['gender']    	or 
				! $request['role_id']*/ 			)
			{
			    return Response::json([
			    	'query_status' => 'error',
			    	'message' => 'Please provide all required fields'
			    ], 422); 
			}
				
			if ( $this->check_username($request['username']) )
				return Response::json([
						'query_status' => 'error',
						'message' => 'Username already exist, Please enter a new username to continue.'
					], 200);

            // set enable true.
	        $request['enable']= 1;

            if (isset($request['email']) && !empty($request['email'])) {
                if ( $this->check_email($request['email']) ) {
                    return Response::json([
                        'query_status' => 'error',
                        'message' => 'Email already exist'
                    ], 200);
                }
            }
            // set parent trial ends date
            if( $request['role_id'] == 2 ) {
                $request['trial_ends_at'] = date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . "+14 days")); // days
                $request['enable']= 0;
            }
	        // cretae user
	        $user = User::create($request);
	        
	        // check user if a child
	        if($user->role_id == 3)
	        {
				if(Auth::user()->subscribed('customer')){
					Auth::user()->subscription('customer')->increment(1);
				}

	        	// map child and the house
	        	$req_child_house = array('house_id'=>$request['house_id'], 'child_id'=>$user->id, 'enable'=>1);
	        	$child_house = ChildHouse::create($req_child_house);
	        }
	        
	        // check user if a parent; need to create a houce for parent
	        if($user->role_id == 2)
	        {
	        	$req_house = array('name' => $request['f_name'].' house', 'user_id' => $user->id, 'enable' => 1 );
				$house = House::create($req_house);
                MailSubscription::create(['user_id'=>$user->id]);
				// set house data to return data
				$user['house_id'] = $house->id; 
				$user['house_name'] = $house->name;

                // check created user and house, for send email verification
                if($user)
                {
                    //$receiver = "vidura@wsolus.com";
                    $receiver = $request['email'];
                    $subject = "Welcome to earn2learn";
                    $message = "Message";
                    $template = 'welcome';
                    $token = $this->generate_token(100);
                    // pass data to email send
                    if (isset($receiver) && !empty($receiver)) {
                        \Log::info("==== sending email to " . $receiver);
                        $email = $this->send_email($receiver, $message, $subject, $template, $token,'',$pw);
                    }else {
                        \Log::info("==== email receiver is empty");
                    }
                    // check email send
                    if($email)
                    {
                        // add email verication token
                        User::where('id', $user->id)->update([ 'verify_token' => $token ]);
                    }
                }
	        }

	        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'User Created Successfully', 
	                'data' => $user 
	        ], 201);
		
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
		
	}

	public function saveSponsorLink(Request $request) {

	    if ($this->is_parent()) {

            $request = $request->all();

            if(	! $request['f_name']	 	or
                ! $request['l_name']    	or
                ! $request['email']
                                            )
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'Please provide all required fields'
                ], 422);
            }

            // set enable true.
            $request['enable']= 0;
            $request['role_id'] = 2; // parent rold
            $token = $this->generate_token(100);
            $userId = Auth::user()->id;
            $house = House::whereUserId($userId)->first();
            $request['house_id'] = $house->id;
            $request['token'] = $token;

            if ( $this->check_email_for_sponsor_invitation($request['email'], $house->id) ) {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'Invitation already exist'
                ], 406);
            }


            // create user
            $user = SponsorInvitation::create($request);

            // Find house by parent id
//            HouseSponsor::create(['user_id' => $user->id, 'house_id' => $house->id]);

            $parent = User::select('user.f_name', 'user.l_name')->where('id', $userId)->first();

            $receiver = $request['email'];
            $subject = "Earn2Learn Sponsor Invitation";
            $message = "Message";
            $template = 'sponsor-invite';

            $meta = [
                'parent' => $parent->f_name . ' ' . $parent->l_name
            ];

            // pass data to email send
            $email = $this->send_sponsor_email($receiver, $message, $subject, $template, $token, $meta);

            return Response::json([
                'query_status' => 'success',
                'message' => 'User Created Successfully',
                'data' => $user
            ], 201);

        }

        return Response::json([
            'error' => 'access_denied'
        ], 401);

    }

    public function check_email_for_sponsor_invitation($email, $houseId) {
        if(SponsorInvitation::where('email', $email)->where('house_id', $houseId)->first())
        {
            // dd(User::where('email', $email)->first()->email);
            // return true
            return true;
        }
        // return false
        return false;
    }

    public function send_sponsor_email($receiver, $message, $subject, $template, $token=null, $meta=null)
    {
        // $user = User::where->('email', $email)->where('enable', 1)->first();
        $user = SponsorInvitation::latest()->where('email', $receiver)->first();
        // dd($meta);
        // check user
        if(!empty($user))
        {
            // Mail::send('emails.reminder', ['token' => $token], function ($message) use ($user)
            Mail::send(['html' => 'emails.'.$template], ['meta' => $meta, 'parent' => $user->f_name, 'token' => $token, 'email' => $user->email], function ($message) use ($user, $subject, $meta)
            {
                // set sender
                $message->from('info@wsolus.com', 'Earn to Learn');
                // set reciver
                $message->to($user->email, $user->f_name)->subject($subject);
                // $message->to('pradeepprasanna.rajapaksha4@gmail.com', $user->f_name)->subject($subject);
            });

            return true;
        }

        return false;
    }

	/**
	 * Store a newly registered users in storage.
	 * 
	 * Only for perant's registration
	 * 
	 * @return Response
	 */
	public function register(Request $request)
	{	
		// check request and exist users
		if($request->isMethod('post') and !$this->is_admin() and !$this->is_parent() and !$this->is_child() and !$this->is_moderator()) 
		{
			// get request object to array. 
			$request = $request->all();
			// check request para: >>>> ***frond end has validated data highly!***
			if(	! $request['f_name']	 	or 
				! $request['l_name']    	or 
				! $request['email']	 		or 
				! $request['password']  	or 
				! $request['username']		or
				! $request['confirm_password']	)
			{
				return Response::json([
						'query_status' => 'error',
						'message' => 'Please provide all required fields'
					], 422); 
			} 
			// check users alraedy exist.
			if ( $this->check_email($request['email']) ) 
				return Response::json([
						'query_status' => 'error',
						'message' => 'Email already exist'
					], 406); 
			if ( $this->check_username($request['username']) ) 
				return Response::json([
						'query_status' => 'error',
						'message' => 'username already taken'
					], 406); 
			// check passwords matched,
			if ($request['password'] != $request['confirm_password']) 
				return Response::json([
						'query_status' => 'error',
						'message' => 'Password does not match the confirm password'
					], 422); 
			// set parent trial ends date 
			if( $request['role_id'] == 2 )
				$request['trial_ends_at'] = date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . "+14 days")); // days
			// set enable true
			$request['enable']= 0;
			
			// Encript password using bcrypt()
			$request['password'] = bcrypt($request['password']);
			// Set user role to perant's role_id => 2
			$request['role_id'] = 2;
			
			// create user
			$user = User::create($request);
			// create email subcription for the user
			MailSubscription::create(['user_id'=>$user->id]);
			// create request to create hocuse
			$req_house = array('name' => $request['house_name'], 'user_id' => $user->id, 'enable' => 1 );
			$house = House::create($req_house);
			// set house data to return data
			$user['house_id'] = $house->id; 
			$user['house_name'] = $house->name; 
			
			// check created user and house, for send email verification
			if($user and $house)
			{
				$receiver = $request['email'];
				$subject = "Please confirm your email address";
				$message = "Message";
				$template = 'verifyemail';
				$token = $this->generate_token(100);
				// pass data to email send
				$email = $this->send_email($receiver, $message, $subject, $template, $token);
				// check email send
				if($email)
				{	
					// add email verication token
					User::where('id', $user->id)->update([ 'verify_token' => $token ]);
				}
	        }
	        // return success
	        return Response::json([ 
	        		'query_status' => 'success', 
	                'message' => 'Registered Successfully', 
	                'data' => $user 
	        ], 201); 
		
		}
		// return error
		return Response::json([
        	'error' => 'access_denied',
        	'message' => 'Request is Unsecure or Invalid', 
        ], 401);
	         
	} 

	/**
	 * Cconfirm user email and verification.
	 * 
	 * Only for perant's registration
	 * 
	 * @return Response
	 */
	 public	function confirm_email($token=null)
	 {
	 	// check request argument
		if($token==null)
		{
            return Response::json([
					'query_status' => 'error',
					'message' => 'missing argument'
				], 422); 
        } 
        // get user by email verification token
        $user = User::where('verify_token', $token)->first();
        // check user data exist
        if(empty($user))
        {
			return Response::json([
					'query_status' => 'error',
					'message' => 'token or user not found'
				], 404); 
        }
        // check is user already verified email
        if($user->enable==1)
        {
			return Response::json([
					'query_status' => 'error',
					'message' => 'user already confirmed'
				], 406); 
        }
        // verify user
        $user->update([ 'enable' => 1 ]);
			return Response::json([
					'query_status' => 'success',
					'message' => 'email confirmed'
				], 200); 
			
	 }

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * 
	 * @return Response
	 */
	public function update($id=null, Request $request)
	{
		// check request argument
		if($id==null)
            return Response::json([
					'query_status' => 'error',
					'message' => 'missing argument'
				], 422); 
		// check  user; only admin or parent can edit user data
		if($this->is_admin() or $this->is_parent())
		{
			// get user by id
			$user = User::find($id);
			// turn request data obj to array
			$request = $request->all();

            \Log::info("==== email validation check");
            // admin email check
            if(isset($request['email']) && $request['role_id']==1) {
                // validate email unique
                $emailValidation = \Validator::make($request,[
                    'email' =>'unique:user,email,'. $id
                ]);

                $isEmailValid = $emailValidation->passes();

                if (!$isEmailValid) {
                    return Response::json([
                        'query_status' => 'email_exists',
                        'message' => 'Email already exist'
                    ], 201);
                }
            }

			// check cihld do not have a email.
			if(! $request['email'] && $request['role_id']==3)
			{	// if email not set, set email as empty
				$request['email'] = (!empty($request['email']))? $request['email']: ' ';
			}
			// simple validations for user update
			if(	! $request['f_name']		or 
				! $request['l_name']    	or 
				! $request['email']	 		/*or 
				! $request['telephone'] 	or 
				! $request['mobile']		or 
				! $request['address']   	or 
				! $request['city']	 		or 
				! $request['country']   	or 
				! $request['date_of_birth']	or 
				! $request['gender']    	or 
				! $request['role_id'] */		)
			{
	            return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422); 
			} 
			// update user
			$user->update($request);
			
			return Response::json([
					'query_status' => 'success',
					'message' => 'User Updated Successfully', 
					'data' => $user 
		        ], 200);
		}
		// access denied error
		return Response::json([
	        	'error' => 'access_denied'
	        ], 401);
	}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     *
     * @return Response
     */
    public function deleteUser($id=null)
    {
        //print_r($id); die;
        // only admin can delete a recorde
        if($this->is_admin())
        {
            $user = User::find($id);
            // check user exist
            if (empty($user))
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'user not found'
                ], 404);

            //print_r($user->bundles()->count()); die;

            if($user->bundles()->count() == 0)
            {
                // delete racord
                User::destroy($id);
                return Response::json([
                    'query_status' => 'success',
                    'message' => 'Record successfully deleted!'
                ], 200);
            }
            else
            {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'user already assigned for a bundle or lesson'
                ], 404);
            }

        }
        // access denied error
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * 
	 * @return Response
	 */
	public function destroy($id=null)
	{
		// only admin can delete a recorde
		if($this->is_admin())
		{	
			// check user exist
            $user = User::find($id);
			if (empty($user))
				return Response::json([
						'query_status' => 'error',
						'message' => 'user not found'
					], 404);

            if (!empty($user)) {

                if(!empty($user->email))
                {
                    //email to deleted user
                    $subject = "Your account has been removed from earn2learn";
                    $message = "Your account has been removed from earn2learn";
                    $receiver = $user->email;
                    $template = 'userdelete';
                    // send email data to deleted user
                    $email = $this->send_email($receiver, $message, $subject, $template);
                }

                // delete record
                $update = User::where('id', $id)
                        ->update(['enable' => 0]);

                if($update)
                {
                    return Response::json([
                        'query_status' => 'success',
                        'message' => 'Record successfully deleted!'
                    ], 200);
                }
                else{
                    return Response::json([
                        'query_status' => 'error',
                        'message' => 'user not found'
                    ], 200);
                }


                /*User::destroy($id);
                return Response::json([
                        'query_status' => 'success',
                        'message' => 'Record successfully deleted!'
                    ], 200);*/

            }

		}
		// access denied error
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
	}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     *
     * @return Response
     */
    public function soft_delete($id=null)
    {
        // only admin can delete a recorde
        if($this->is_admin())
        {
            // check user exist
            $user = User::find($id);
            if (empty($user))
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'user not found'
                ], 404);

            if (!empty($user)) {

                // Start DB transaction
                DB::beginTransaction();
                try {
                    // delete record
                    $update = User::where('id', $id)
                        ->update(['enable' => 0]);
                    if($update)
                    {

						//unsbscribe
						if($this->is_admin() && $user->role_id == 3 ){
							$parent = User::select('user.*')
								->join('house', 'house.user_id', '=', 'user.id')
								->join('childhouses', 'childhouses.house_id', '=', 'house.id')
								->where('house.enable', 1)
								->where('childhouses.child_id', $user->id)
								->first();

							if($parent->subscribed('customer')){
								$parent->subscription('customer')->decrement();
							}
						}
						if($this->is_admin() && $user->role_id == 2){
							if($user->subscribed('customer')){
								$user->subscription('customer')->cancel();
							}
						}


						
                        $childUpdate=DB::statement("UPDATE `user` SET `user`.`enable` = '0' WHERE `user`.id IN (SELECT childhouses.child_id FROM house INNER JOIN childhouses ON childhouses.house_id = house.id WHERE house.user_id = $id)");
                        if ($childUpdate){
                            DB::commit();

                            if (!empty($user)) {

                                if(!empty($user->email))
                                {
                                    //email to deleted user
                                    $subject = "Your account has been removed from earn2learn";
                                    $message = "Your account has been removed from earn2learn";
                                    $receiver = $user->email;
                                    $template = 'userdelete';
                                    // send email data to deleted user
                                    $email = $this->send_email($receiver, $message, $subject, $template);
                                }
                            }
                            return Response::json([
                                'query_status' => 'success',
                                'message' => 'Record successfully deleted!'
                            ], 200);
                        }else{
                            DB::rollback();
                            return Response::json([
                                'query_status' => 'error',
                                'message' => 'user not found'
                            ], 200);
                        }


                    }
                    else{
                        DB::rollback();
                        return Response::json([
                            'query_status' => 'error',
                            'message' => 'user not found'
                        ], 200);
                    }
                } catch(Exception $ex){
                    // Someting went wrong
                    DB::rollback();

                }





                /*User::destroy($id);
                return Response::json([
                        'query_status' => 'success',
                        'message' => 'Record successfully deleted!'
                    ], 200);*/

            }

        }
        // access denied error
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }
    public function child_delete($id=null){
        // check user exist
        $user = User::find($id);
        if (empty($user))
            return Response::json([
                'query_status' => 'error',
                'message' => 'user not found'
            ], 404);

        if (!empty($user)) {

            // Start DB transaction
            DB::beginTransaction();
            try {
                // delete record
                $update = User::where('id', $id)
                    ->update(['enable' => 0]);
                if($update)
                {
					if($this->is_parent()){
						if(Auth::user()->subscribed('customer')){
							Auth::user()->subscription('customer')->decrement();
						}
					}
					if($this->is_admin()){
						$parent = User::select('user.*')
							->join('house', 'house.user_id', '=', 'user.id')
							->join('childhouses', 'childhouses.house_id', '=', 'house.id')
							->where('house.enable', 1)
							->where('childhouses.child_id', $id)
							->first();

						if($parent->subscribed('customer')){
							\Log::info("==== admin delte child");
							$parent->subscription('customer')->decrement();
						}
					}

                    DB::commit();

                    if (!empty($user)) {

                        if(!empty($user->email))
                        {
                            //email to deleted user
                            $subject = "Your account has been removed from earn2learn";
                            $message = "Your account has been removed from earn2learn";
                            $receiver = $user->email;
                            $template = 'userdelete';
                            // send email data to deleted user
                            $email = $this->send_email($receiver, $message, $subject, $template);
                        }
                    }
                    return Response::json([
                        'query_status' => 'success',
                        'message' => 'Record successfully deleted!'
                    ], 200);
                }
                else{
                    DB::rollback();
                    return Response::json([
                        'query_status' => 'error',
                        'message' => 'user not found'
                    ], 200);
                }
            } catch(Exception $ex){
                // Someting went wrong
                DB::rollback();

            }


        }
    }
    /**
     * Check the user subscription period is expired.
     *
     * @param  int  $id
     *
     * @return Response
     */
    public function user_subscription($id=null)
    {
        // only admin can delete a recorde
        if($this->is_admin())
        {
            // check user exist
            $user = User::find($id);
            if (empty($user))
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'user not found'
                ], 404);

            if (!empty($user)) {
                $isChild=$this->isChild($user->id);

                if($isChild){

                    $parent = ChildHouse::select('user.subscription_ends_at')
                        ->join('house', 'house.id', '=', 'childhouses.house_id')
                        ->join('user', 'user.id', '=', 'house.user_id')
                        ->where('childhouses.child_id', $user->id)
                        ->first();

                    return $this->checkSubscription($parent);
                }
                return $this->checkSubscription($user);
            }

        }
        // access denied error
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }


    //if a user is child or not
    protected  function isChild($userId){
        $child=ChildHouse::where('childhouses.child_id',$userId)->get();
        return (count($child)!=0)?true:false;

    }


    protected function checkSubscription($userData){

        if( !empty($userData->subscription_ends_at) and $userData->subscription_ends_at > date('Y-m-d H:i:s') ){
            return Response::json([
                'query_status' => 'error',
                'message' => 'Parent Subscription is valid.',
            ], 200);
        }else{
            return Response::json([
                'query_status' => 'success',
                'message' => 'Parent Subscription is expired.',
            ], 200);
        }
    }



    /**
	 * Forgot password.
	 *
	 * @param  Request $request
	 * 
	 * @return Response
	 */
	public function	forgot_password(Request $request)
	{
		// get request data to aaray
		$request = $request->all();
		// check rquired field
		if(	! $request['email'])
		{
            return Response::json([
					'query_status' => 'error',
					'message' => 'email is a required field'
				], 422); 
        } 
        // get data of the uesr
		$user = User::where('email', $request['email'])->where('enable', 1)->first();
		
		// check user not exist
		if(empty($user))
		{
			//			return Response::json([
			//					'query_status' => 'error',
			//					'message' => 'incorrect email or invalid access'
			//				], 404);

			return Response::json([
					'query_status' => 'error',
					'message' => 'Entered email address is not exist'
				], 404);
		}
		// get token
		$token = $this->generate_token(64);
		// set data to store
		$request['token'] = $token;
		$request['enable'] = 1;
		$request['created_at'] = date("Y-m-d H:i:s");
		$request['expiry'] = date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . "+7 days"));
		// dd($request);
		// create reset password record
		$psw_reset = PasswordReset::create($request);
		// check query success
		if($psw_reset)
		{
			// dd($psw_reset);
			// setup email
			$subject = "Forgot Password";
			$message = "Message";
			$receiver = $request['email'];
			$template = 'pswreset';
			$user = User::latest()->where('email', $receiver)->first();
			// send email data to email sendr
			$email = $this->send_email($receiver, $message, $subject, $template, $token);
			// check mail send
			if(!$email)
			{
				return Response::json([
		            	'query_status' => 'error',
		            	'message' => 'email send failed'
		            ], 501); 
			}
			
			return Response::json([
					'query_status' => 'success',
					'message' => 'forgot password request successfully sent'
				], 200);
		}
		
	}

	/**
	 * Password reset.
	 *
	 * @param  Request $request
	 * 
	 * @return Response
	 */
	public function	password_reset(Request $request)
	{
		// get request data to aaray
		$request = $request->all();
		Log::info('Password reset function fired....');

		// When parent change child's password,
			// ckeck parent and request para:
		if( $this->is_parent() and isset($request['child_id']) and isset($request['n_password']) )
		{
			Log::info('Child id is: '.$request['child_id']);
			if( empty($request['child_id']) or empty($request['n_password']) )
			{
				return Response::json([
						'query_status' => 'error',
						'message' => 'please provide all required fields'
					], 422);

			}
			// find the child
			$user = User::where('id', $request['child_id'])->where('role_id', 3)->first();

			// check user exist 
			if ( $user ) 
			{
				// encript passwords
				$request['n_password'] = bcrypt($request['n_password']);
				// change password
				if($user->update(['password'=>$request['n_password']]))
				{	
					return Response::json([
							'query_status' => 'success',
							'message' => 'password changed successfully'
						], 200);
				}
			}

			return Response::json([
					'query_status' => 'error',
					'message' => 'child not exist'
				], 404);
		}
		
		// When admin change parent's password
		if( $this->is_admin() and isset($request['email']) and isset($request['n_password']) )
		{
			// ckeck parent and request para:
			if( empty($request['email']) or empty($request['n_password']) )
			{
				return Response::json([
						'query_status' => 'error',
						'message' => 'please provide all required fields'
					], 422);
			}
			// find the parent
			$user = User::where('email', $request['email'])->first();
			// check user exist 
			if ( $user ) 
			{	
				// encript passwords
				$request['n_password'] = bcrypt($request['n_password']); 
				// change password
				if($user->update(['password'=>$request['n_password']]))
				{	
					return Response::json([
							'query_status' => 'success',
							'message' => 'password changed successfully'
						], 200);
				}
			}
		}
		
        // When user change own password,
        	// ckeck parent and request para:
        if(	! $request['c_password'] or ! $request['n_password'])
		{
            return Response::json([
            	'query_status' => 'error',
            	'message' => 'please provide all required fields'
            ], 422); 
        }
        // admin password can not be change even admin;
        /*if(	$this->is_admin() and isset($request['c_password']) and isset($request['n_password']) )
            return Response::json([
					'error' => 'access_denied'
				], 401);*/

        // validate user
		$validate = Auth::validate(array('id' => Auth::user()->id, 'password' => $request['c_password'] ));
		if ( $validate ) 
		{
			$user = User::where('id', Auth::user()->id)->first();

			// change password
			$crypt_result=(crypt($request['n_password'], $user->password)==$user->password);
			if ($crypt_result) {

				return Response::json([
					'query_status' => 'duplicate_pwd',
					'message' => 'You are updating the same password as before, Please enter a new password'
				], 200);

			}else {

				if($user->update(['password'=>bcrypt($request['n_password'])]))
				{
					return Response::json([
						'query_status' => 'success',
						'message' => 'password changed successfully'
					], 200);
				}
			}


		}
		return Response::json([
				'query_status' => 'error',
				'message' => 'incorrect current password or access denied'
			], 404);
		
		// set defauld error access denied
		return Response::json([
				'error' => 'access_denied',
			], 401);
		
	}

	public function	child_password_reset(Request $request)
	{
		// get request data to aaray
		$request = $request->all();
		Log::info('Child Password reset function fired....');

		// When user change own password,
		// ckeck parent and request para:
		if(	! $request['c_password'] or ! $request['n_password'])
		{
			return Response::json([
				'query_status' => 'error',
				'message' => 'please provide all required fields'
			], 422);
		}

		$user = User::where('id', $request['childid'])->first();

			// change password
			$crypt_result=(crypt($request['n_password'], $user->password)==$user->password);

			if ($crypt_result) {

				return Response::json([
					'query_status' => 'duplicate_pwd',
					'message' => 'You are going to update the same password as before for child, Please enter a new password'
				], 200);

			}else {

				if($user->update(['password'=>bcrypt($request['n_password'])]))
				{
					return Response::json([
						'query_status' => 'success',
						'message' => 'password changed successfully'
					], 200);
				}
			}

		return Response::json([
			'query_status' => 'error',
			'message' => 'incorrect current password or access denied'
		], 404);

		// set defauld error access denied
		return Response::json([
			'error' => 'access_denied',
		], 401);

	}


	/**
     * User (parent) subcription with stripe.
     *
     * @return Response
    /*public function subscription(Request $request)
    {
    	if( !isset($request->token) or !isset($request->plan) )
    		return Response::json([
			    	'query_status' => 'error',
			    	'message' => 'please provide all required fields'
			    ], 422); 
			    
        // set stripe token
        $token = $request->token;
        // set stripe subscription plan
        $plan = $request->plan;
        
        if (Auth::user()->subscribed('customer'))
        {
            $response = Auth::user()->charge(1000, [
                    'source' => $token,
                    'receipt_email' => Auth::user()->email,
                ]);
                
            if(!$response)
			{
				// return success;
				return Response::json([
						'query_status' => 'success',
						'message' => 'payment successful',
						'data' => $response
					], 200);
				// return ('you are subscribed now');
			}
        }
		
        // create new subscription
        $response = Auth::user()->subscription($request->plan)->create($token);
        
		if(!$response)
		{
			// return success;
			return Response::json([
					'query_status' => 'success',
					'message' => 'payment successful',
					'data' => $response
				], 200);
			// return ('you are subscribed now');
		}
		
        return Response::json([
				'query_status' => 'success',
				'message' => 'payment failed'
			], 501);
    }*/
    public function subscription(Request $request)
    {	// check request pata:

		if( !isset($request->token) )
			return Response::json([
					'query_status' => 'error',
					'message' => 'please provide all required fields'
				], 422); 
			
        // set stripe token
        $token = $request->token;
        // set stripe subscription plan
		$plan = env('SUBSCRIPTION_PLAN');

        // check user has subscribed
        if (!Auth::user()->subscribed($plan))
        {
			// create new subscription
			$response = Auth::user()->subscription($plan)->create($token);
			if($response)
			{
				// return success;
				return Response::json([
						'query_status' => 'success',
						'message' => 'user subscribed successfully',
						// 'data' => $response
					], 201);
				// return ('you are subscribed now');
			}
			 return Response::json([
					'query_status' => 'success',
					'message' => 'subscription failed'
				], 501);
        }
		
        return Response::json([
				'query_status' => 'success',
				'message' => 'user already subscribed'
			], 406);
    }

	/**
     * User (parent) stripe subscription cancellation.
     *
     * @return Response
     */
    public function subscription_close()
    { 
        // set stripe subscription plan
		$plan = env('SUBSCRIPTION_PLAN');

        // check user has subscribed
        if ( Auth::user()->subscribed($plan) )
        {
			// cancel subscription
			$res =  Auth::user()->subscription($plan)->cancel();

			//un-subscription successful send email
			$meta = array(
				'parent_fname'  => Auth::user()->f_name,
				'parent_lname'  => Auth::user()->l_name,
				'subscription_end'  => date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . "+1 month")),
			);

			$this->sendUnSubscriptionMail(Auth::user()->email,$meta);

			//un-subscription successful send notification
			$this->notifyUnSubscriptionSuccess([
				'subscription_end' => date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . "+1 month")),
				'userId' => Auth::user()->id
			]);


			if(true)
				return Response::json([
						'query_status' => 'success',
						'message' => 'subscription cancellation successful',
						// 'data' => $response
					], 200);
        }
		
        return Response::json([
				'query_status' => 'error',
				'message' => 'user does not subscribed'
			], 406);
    }
		
	/**
     * User (parent) stripe subscription resuming.
     *
     * @return Response
     */
    public function subscription_resume()
    {

        // set stripe subscription plan
        $plan = env('SUBSCRIPTION_PLAN'); //'customer';

        if ( Auth::user()->stripe_active == 0 )
        {
			// resume subscription
			$subscription_ends_at 	= Auth::user()->subscription_ends_at;
			$trial_ends_at 			= Auth::user()->trial_ends_at;
			$res = Auth::user()->subscription($plan)->resume();


			User::where('id', Auth::user()->id)->update(['subscription_ends_at' => $subscription_ends_at, 'trial_ends_at'=> $trial_ends_at ,'payment_status' => 1]);


			//re-subscription successful send email
			$meta = array(
				'parent_fname'  => Auth::user()->f_name,
				'parent_lname'  => Auth::user()->l_name,
				'subscription_end'  => date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . "+1 month")),
			);

			$this->sendSubscriptionMail(Auth::user()->email,$meta);

			//re-subscription successful send notification
			$this->notifySubscriptionSuccess([
				'subscription_end' => date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . "+1 month")),
				'userId' => Auth::user()->id
			]);

			if(true)
				return Response::json([
						'query_status' => 'success',
						'message' => 'subscription resuming successful',
						// 'data' => $response
					], 200);
        }
		
        return Response::json([
				'query_status' => 'success',
				'message' => 'user dose not subscribed asfafasfasf '
			], 406);
    }
    
	/**
     * User (parent) stripe subscription resuming.
     *
     * @return Response
     */
    public function update_card(Request $request)
    {	// check request pata:
		if( !isset($request->stripe_token) )
			return Response::json([
					'query_status' => 'error',
					'message' => 'please provide all required fields'
				], 422); 
			
        // set stripe token
        $token = $request->stripe_token;
		// update card
		$response = Auth::user()->updateCard($token);

		if(!Auth::user()->payment_status && !empty(Auth::user()->subscription_ends_at) and Auth::user()->subscription_ends_at < date('Y-m-d H:i:s')){

			$childs = ChildHouse::select('childhouses.child_id')
				->join('house', 'house.id', '=', 'childhouses.house_id')
				->where('house.user_id', Auth::user()->id)
				->where('house.enable', 1)
				->count();

			if($childs==0 && ( Auth::user()->trial_ends_at >= date('Y-m-d H:i:s'))) {
				return Response::json([
					'query_status' => 'error',
					'message' => 'No child is added to the Earn2Learn system, Please add child to continue.'
				], 417);
			}else if($childs==0 && ( Auth::user()->trial_ends_at < date('Y-m-d H:i:s'))){
				$childs = 1;
			}

			//$response
			$token  = '';
			$amount	= env('PER_CHILD')*100;
			$type  	= 2;
			$this->do_payment($token, $type, $amount);

			//User::where('id', Auth::user()->id)->update(['payment_status' => 1]);

		}

		// dd($response);
		if(true)
			return Response::json([		// return success;
					'query_status' => 'success',
					'message' => 'card updated successfully',
					// 'data' => $response
				], 201);
			// return ('you are updated now');
			
		return Response::json([
				'query_status' => 'error',
				'message' => 'card updation failed'
			], 501);
    }
    
	/**
     * User (parent) payment charge with stripe.
     *
     * @return Response
     */
    public function charge(Request $request)
    {
        if(!$this->is_parent())
			return Response::json([
					'error' => 'access_denied'
				], 401);

        $request = $request->all();

		$childs = ChildHouse::select('childhouses.child_id')
			->join('house', 'house.id', '=', 'childhouses.house_id')
			->where('house.user_id', Auth::user()->id)
			->where('house.enable', 1)
			->count();

		if($childs==0 && ( Auth::user()->trial_ends_at >= date('Y-m-d H:i:s'))) {
			return Response::json([
				'query_status' => 'error',
				'message' => 'No child is added to the Earn2Learn system, Please add child to continue.'
			], 417);
		}else if($childs==0 && ( Auth::user()->trial_ends_at < date('Y-m-d H:i:s'))){
			$childs = 1;
		}


        if (!Auth::user()->subscribed('customer'))
        {	
			// check sripe transaction token 
			if( ! $request['stripe_token'] )
				return Response::json([
						'query_status' => 'error',
						'message' => 'missing argument'
					], 422); 
				
			// create new subscription
			$response = Auth::user()->subscription('customer')->create($request['stripe_token']);
			
        }

        // check sripe payment type; for what? >>>> // monthly payment or // gift card payment
        if( !$request['type'] )
			return Response::json([
					'query_status' => 'error',
					'message' => 'missing argument'
				], 422);

		//$response
		$token  = '';
        $amount	= env('PER_CHILD')*100;
        $type  	= $request['type'];

		// check payment type
        if( $type == 2 )
        {

			// calc & set amount, parent need to pay. 
			$amount = ($amount*$childs)*1;


			// send payment data to do payment
			if( $this->do_payment($token, $type, $amount) )
			{
				//update subscription child count
				Auth::user()->subscription('customer')->updateQuantity($childs);

				//update user payment status
				$update = User::where('id', Auth::user()->id)
					->update(['payment_status' => 0]);
				//subscription successful send email
				$meta = array(
					'parent_fname'  => Auth::user()->f_name,
					'parent_lname'  => Auth::user()->l_name,
					'subscription_end'  => date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . "+1 month")),
				);

                $mailSetting = MailSubscription::where('user_id', Auth::user()->id)->first();

                if (isset($mailSetting) && $mailSetting->payment) {
                    \Log::info("sending payment confirm email");
                    $this->sendSubscriptionMail(Auth::user()->email,$meta);
                }

				//subscription successful send notification
				$this->notifySubscriptionSuccess([
					'subscription_end' => date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . "+1 month")),
					'userId' => Auth::user()->id
				]);

				// update subcription ends date
				User::where('id', Auth::user()->id)
					->update([ 'subscription_ends_at'=> date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . "+1 month")) ]);
				
				return Response::json([
						'query_status' => 'success',
						'message' => 'transaction successful'
					], 200);
			}
			else
			{
				return Response::json([
						'query_status' => 'error',
						'message' => 'transaction failed'
					], 501); 
			}
        }
        elseif( $type == 1 ) // gift card payment
        {	// gift card payment not execute here
			return Response::json([
					'query_status' => 'error',
					'message' => 'payment forbidden'
				], 403); 
        }
		
    }

	/**
	 * Display and calc payment date and amount.
	 *
	 * @return Response
	 */
	public function payment_data()
	{
		// get childs data
		$childs = ChildHouse::select('childhouses.child_id')
					->join('house', 'house.id', '=', 'childhouses.house_id')
					->where('house.user_id', Auth::user()->id)
					// ->where('childhouses.enable', 1)
					->where('house.enable', 1);
		// count childs
		$childs_count = $childs->count();
		// calc payment
		$payment = $childs_count*env('PER_CHILD');
		// set data to return
		// $data = json_encode(array( "count" => $childs_count, "payment" => $payment ));
		$data = array( "count" => $childs_count, "payment" => $payment );
		return Response::json([
				'query_status' => 'success',
				'data' => $data
			], 200);
		
	}

	/**
	 * @param Request $request
	 * @return mixed
	 */
	public function fb_connect(Request $request)
	{
		if (! $request->email or ! $request->f_name or ! $request->l_name or ! $request->id)
			return Response::json([
					'query_status' => 'error',
					'message' => 'provide all required fields'
				], 401);
				
		if( !User::where('email', $request->email)->where('id', Auth::user()->id )->first() )
			return Response::json([
					'query_status' => 'error',
					'message' => 'emails not matched'
				], 406);
			
		// $request->email  = $request->email;
		// $request->f_name = $request->f_name;
		// $request->l_name = $request->l_name;
        // $request->fb_password = bcrypt($request->id);
		
		if(User::where('id', Auth::user()->id)->where('email', $request->email)->update([ 'password'=>bcrypt($request->id) , '_fb'=>1 ]))
			return Response::json([
					'query_status' => 'success',
					'message' => 'fb connected successfully'
				], 200);
				
	}
	
	/**
	 * 
	 * 
	 */
	public function fb_disconnect()
	{
		// $request->email  = $request->email;
		// $request->f_name = $request->first_name;
		// $request->l_name = $request->last_name;
		// $request->fb_password = bcrypt($request->id);
			
		$user = User::select('password' ,'fb_password')->where('id', Auth::user()->id)->first();
			
		if(User::where('id', Auth::user()->id)->update([ 'password'=>$user->fb_password, 'fb_password'=>$user->password , '_fb'=>0 ]))
			return Response::json([
					'query_status' => 'success',
					'message' => 'fb disconnected'
				], 200);
			
	}

	//Parent handle
	/**
	 * Display show guide status.
	 *
	 * @return Response
	 */
	public function get_showguide_status()
	{
		$current_user = Auth::user();

		$userdata=$current_user->show_guide;

		if($userdata!=0)
		{
			// return status
			return Response::json([
				'query_status' => 'enabled'
			], 200);
		}
		else
		{
			// return status
			return Response::json([
				'query_status' => 'disabled'
			], 200);
		}
	}

	/**
	 * Display a listing of the current user resource.
	 *
	 * @return Response
	 */
	public function update_showguide_status()
	{
		$current_user = Auth::user();

		User::where('id', $current_user->id)
			->update(['show_guide' => 1]);

		$userdata=User::find($current_user->id);

		if($userdata->show_guide!=0)
		{
			// return status
			return Response::json([
				'query_status' => 'success'
			], 200);
		}
	}

    /**
     * Return active sponsors list for logged in parent
     * @return mixed
     */
    public function getAllActiveSponsorsForParent()
    {

        $userId = Auth::user()->id;
        $house = House::whereUserId($userId)->first();

        // get users and filter by house id
        $users = User::select('user.id', 'user.f_name', 'user.l_name', 'user.email', 'user.telephone', 'user.mobile', 'user.address', 'user.city', 'user.country', 'user.date_of_birth', 'user.gender', 'user.profession', 'user.profile_image', 'user.role_id', 'user.username', 'user.enable', 'user.created_at', 'user.updated_at', 'house_sponsors.enable as dashboard_enabled')
            ->join('house_sponsors', 'user.id', '=', 'house_sponsors.user_id')
            ->where('house_sponsors.house_id', '=', $house->id)
            ->where('user.enable', '=', 1)
            ->orderBy('user.created_at', 'desc')
            ->get();

        // check $users not empty
        if(!count($users))
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);

        return Response::json([
            'query_status' => 'success',
            'data' => $users
        ], 200);

    }

    /**
     * Return active sponsors list for logged in parent
     * @return mixed
     */
    public function getAllInActiveSponsorsForParent()
    {

        $userId = Auth::user()->id;
        $house = House::whereUserId($userId)->first();
//
//        // get users and filter by house id
//        $users = User::select('user.id', 'user.f_name', 'user.l_name', 'user.email', 'user.telephone', 'user.mobile', 'user.address', 'user.city', 'user.country', 'user.date_of_birth', 'user.gender', 'user.profession', 'user.profile_image', 'user.role_id', 'user.username', 'user.enable', 'user.created_at', 'user.updated_at')
//            ->join('house_sponsors', 'user.id', '=', 'house_sponsors.user_id')
//            ->where('house_sponsors.house_id', '=', $house->id)
//            ->where('house_sponsors.enable', '=', 0)
//            ->where('user.enable', '=', 0)
//            ->orderBy('user.created_at', 'desc')
//            ->get();

        $users = SponsorInvitation::where('enable', 0)->where('house_id', $house->id)->get();
        // check $users not empty
        if(!count($users))
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);

        return Response::json([
            'query_status' => 'success',
            'data' => $users
        ], 200);

    }

    /**
     * Resend sponsor invitation by email
     * @return mixed
     */
    public function resendSponsorInvitation(Request $request) {

        $request = $request->all();
        // check request argument
        if(	! $request['id'])
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 405);
        }

        // find sponsor by id
        $user = SponsorInvitation::find($request['id']);


        \Log::info("==== resend invitation");
        \Log::info($user->email);
        \Log::info("==== resend invitation");


        // get authenticated user id (parent id)
        $userId = Auth::user()->id;

        $parent = User::select('user.f_name', 'user.l_name')->where('id', $userId)->first();
        \Log::info("==== resend invitation");
        \Log::info('==== parent: ' . print_r($parent->toArray(), true));
        $receiver = $user->email;
        $subject = "Earn2Learn Sponsor Invitation";
        $message = "Message";
        $template = 'sponsor-invite';
        $meta = [
            'parent' => $parent->f_name . ' ' . $parent->l_name
        ];
        $token = $this->generate_token(100);

        // pass data to email send
        $email = $this->send_sponsor_email($receiver, $message, $subject, $template, $token, $meta);

        if($email)
        {
            // add email verication token
            SponsorInvitation::where('id', $user->id)->update([ 'token' => $token ]);
        }

        return Response::json([
            'query_status' => 'success',
            'message' => 'Invitation has been successfully sent',
            'data' => []
        ], 201);
    }

    /**
     * Validate sponsor token
     * @param $token
     * @return mixed
     */
    public function validate_sponsor_token($token) {
        // check request argument
        if($token==null)
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 422);
        }

        // get user by email verification token
        $user = SponsorInvitation::where('token', $token)->first();
        // check user data exist
        if(empty($user))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'token or user not found'
            ], 404);
        }

        // check is user already verified email
        if($user->enable==1)
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'user already confirmed'
            ], 406);
        }

        $parent = User::select('user.f_name', 'user.l_name')->join('house', 'house.user_id', '=', 'user.id')->where('house.id', $user->house_id)->first();


        return Response::json([
            'query_status' => 'success',
            'message' => 'Token validated',
            'data' => [
                'f_name' => $user->f_name,
                'l_name' => $user->l_name,
                'parent_name' => $parent->f_name . ' ' . $parent->l_name
            ]
        ], 200);

    }


    public function validate_sponsor_token_after($token) {
        // check request argument
        if($token==null)
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 422);
        }

        // get user by email verification token
        $user = SponsorInvitation::where('token', $token)->first();
        // check user data exist
        if(empty($user))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'token or user not found'
            ], 404);
        }

        // check is user already verified email
        if($user->enable==1)
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'user already confirmed'
            ], 406);
        }

        $parent = User::select('user.f_name', 'user.l_name')->join('house', 'house.user_id', '=', 'user.id')->where('house.id', $user->house_id)->first();


        //todo check $user->house_id and house user if it equals do not validate

        $parentHouse = House::find($user->house_id);
        \Log::info("===== logged in user check");
        if (isset(Auth::user()->id)) {

            \Log::info("===== logged in user");
            if (isset($parentHouse)) {

                if ($parentHouse->user_id == Auth::user()->id) {

                    return Response::json([
                        'query_status' => 'error',
                        'message' => 'invalid house'
                    ], 406);

                }else {
                    return Response::json([
                        'query_status' => 'success',
                        'message' => 'Token validated',
                        'data' => [
                            'f_name' => $user->f_name,
                            'l_name' => $user->l_name,
                            'parent_name' => $parent->f_name . ' ' . $parent->l_name
                        ]
                    ], 200);
                }

            }else {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'invalid house'
                ], 406);
            }
        }else {
            return Response::json([
                'query_status' => 'success',
                'message' => 'Token validated',
                'data' => [
                    'f_name' => $user->f_name,
                    'l_name' => $user->l_name,
                    'parent_name' => $parent->f_name . ' ' . $parent->l_name
                ]
            ], 200);
        }
    }

    /**
     * Complete sponsor account
     * @param Request $request
     */
    public function complete_sponsor_account(Request $request) {


        // check request argument
        if(	! isset($request['token'])      or
            ! isset($request['is_accept']))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 405);
        }

        // get user by email verification token
        $sponsorInvitation = SponsorInvitation::where('token', $request['token'])->first();

        // check user data exist
        if(empty($sponsorInvitation))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Token or user not found'
            ], 404);
        }

        // check is user already verified email
        if($sponsorInvitation->enable==1)
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'User already confirmed'
            ], 406);
        }

        if ($request['is_accept'] === true) {
            \Log::info("=== house id is " . $sponsorInvitation->house_id);
            \Log::info("=== house id is " . Auth::user()->id);

            $houseSponsor = HouseSponsor::create(['user_id' => Auth::user()->id, 'house_id' => $sponsorInvitation->house_id, 'enable' => 1]);

            $si = SponsorInvitation::where('id', $sponsorInvitation->id)->first();
            $si->update([ 'enable' => 1 ]);

            $parent = User::select('user.f_name', 'user.l_name', 'user.email', 'user.id')->join('house', 'house.user_id', '=', 'user.id')->where('house.id', $sponsorInvitation->house_id)->first();

            $receiver = $parent->email;
            $subject = "Sponsor invitation approved";
            $message = "Message";
            $template = 'sponsor_invitation_accepted';

            // pass data to send email
            $email = $this->send_email($receiver, $message, $subject, $template, null, [
                'sponsor_f_name' => $sponsorInvitation->f_name,
                'sponsor_l_name' => $sponsorInvitation->l_name,
            ]);

            // notify data
            $notifyData = [
                'message' => trans('messages.sponsor_accepted_invitation', [
                    'first_name'  =>  $sponsorInvitation->f_name,
                    'last_name'  => $sponsorInvitation->l_name,
                ]),
                'type' => 'sponsor',
                'link' => '#/parent/sponsors',
                'user_id' => $parent->id
            ];

            // Fire notify event
            event(new NotifyParent($notifyData));

            return Response::json([
                'query_status' => 'success',
                'message' => 'Token validated',
                'data' => $houseSponsor
            ], 200);

        }else {
            // todo send notification to parent when
            $parent = User::select('user.f_name', 'user.l_name', 'user.email', 'user.id')->join('house', 'house.user_id', '=', 'user.id')->where('house.id', $sponsorInvitation->house_id)->first();

            // notify data
            $notifyData = [
                'message' => trans('messages.sponsor_not_accepted_invitation', [
                    'first_name'  =>  $sponsorInvitation->f_name,
                    'last_name'  => $sponsorInvitation->l_name,
                ]),
                'type' => 'sponsor',
                'link' => '#/parent/sponsors',
                'user_id' => $parent->id
            ];

            event(new NotifyParent($notifyData));

            // nothing happens for now
            return Response::json([
                'query_status' => 'notAccepted',
                'message' => 'Token validated',
                'data' => [

                ]
            ], 406);
        }
    }

    /**
     * Revoke sponsor dashboard permission
     * @param Request $request
     * @return mixed
     */
    public function revokeSponsorAccess(Request $request) {

        $request = $request->all();

        // check request argument
        if(	! $request['id'])
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 405);
        }

        // find sponsor by id
        $user = User::find($request['id']);

        if(empty($user))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Token or user not found'
            ], 404);
        }

        // get authenticated user id (parent id)
        $userId = Auth::user()->id;

        $houseSponsor = HouseSponsor::where('user_id', $user->id)->first();
        $houseSponsor->update([ 'enable' => 0 ]);

        return Response::json([
            'query_status' => 'success',
            'message' => 'Token validated',
            'data' => $houseSponsor
        ], 200);

    }

    /**
     * Grant sponsor dashboard permission
     * @param Request $request
     * @return mixed
     */
    public function grantSponsorAccess(Request $request) {

        $request = $request->all();

        // check request argument
        if(	! $request['id'])
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 405);
        }

        // find sponsor by id
        $user = User::find($request['id']);

        if(empty($user))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Token or user not found'
            ], 404);
        }

        // get authenticated user id (parent id)
        $userId = Auth::user()->id;

        $houseSponsor = HouseSponsor::where('user_id', $user->id)->first();
        $houseSponsor->update([ 'enable' => 1 ]);

        return Response::json([
            'query_status' => 'success',
            'message' => 'Token validated',
            'data' => $houseSponsor
        ], 200);

    }

    /**
     * Returns permission access details
     * @return mixed
     */
    public function checkSponsorPermission() {

        // Get authenticated user
        $userId = Auth::user()->id;

        // Get house sponsor details
        $houseSponsor = HouseSponsor::where('user_id', $userId)->first();

        // If houseSponsor details not found then return 404 header response
        if(empty($houseSponsor))
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'message' => 'Token validated',
            'data' => $houseSponsor
        ], 200);
    }

    /**
     * returns all sponsored children
     */
    public function getAllSponsoredChildren() {

        // Get authenticated user
        $userId = Auth::user()->id;

        // All house ids that sponsor has been accepted
        $ids = HouseSponsor::all()->where('user_id', $userId)->where('enable', 1)->pluck('house_id')->toArray();

        if (empty($ids)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Data not found'
            ], 404);
        }

        // get users and filter by house id
        $users = User::select('user.id', 'user.f_name', 'user.l_name', 'user.email', 'user.telephone', 'user.mobile', 'user.address', 'user.city', 'user.country', 'user.date_of_birth', 'user.gender', 'user.profession', 'user.profile_image', 'user.role_id', 'user.username', 'user.enable', 'user.created_at', 'user.updated_at', 'childhouses.house_id')
            ->join('childhouses', 'user.id', '=', 'childhouses.child_id')
            ->whereIn('childhouses.house_id', $ids)
            ->where('childhouses.enable', '=', 1)
            ->where('user.enable', 1)
            ->orderBy('user.created_at', 'desc')
            ->get();

        if(!count($users))
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);

        return Response::json([
            'query_status' => 'success',
            'data' => $users
        ], 200);

    }

    /**
     * Check authenticated user is sponsor or not
     */
    public function checkSponsor() {

        // Get authenticated user
        $userId = Auth::user()->id;

        // All house ids that sponsor has been accepted
        $sponsor = HouseSponsor::where('user_id', $userId)->where('enable', 1)->first();

        if (isset($sponsor)) {
            return Response::json([
                'query_status' => 'success',
                'data' => ['is_sponsor' => true, 'sponsor_id' => $userId]
            ], 200);
        }

        return Response::json([
            'query_status' => 'error',
            'message' => 'data not found'
        ], 404);

    }

    public function getSponsorAccessibleHouseDetails() {

        // Get authenticated user
        $userId = Auth::user()->id;

        // All house ids that sponsor has been accepted
        $ids = HouseSponsor::all()->where('user_id', $userId)->where('enable', 1)->pluck('house_id')->toArray();

        $parents = House::select(\DB::raw("CONCAT(house.name, ' by ', user.f_name, ' ', user.l_name) AS name"), 'house.id as house_id', 'house.name as house_name', 'user.id', 'user.f_name', 'user.l_name', 'user.email')->join('user', 'user.id', '=', 'house.user_id')->whereIn('house.id', $ids)->get();

        if (isset($parents) && $parents->count()) {
            return Response::json([
                'query_status' => 'success',
                'data' => $parents
            ], 200);
        }

        return Response::json([
            'query_status' => 'error',
            'message' => 'data not found'
        ], 404);
    }

	/**
	 *
	 * get subscription details from strip payment
	 *
	 * @param $userStripId
	 * @return \Stripe\Customer
	 */
	protected function getSubscriptionStatus($userStripId){

		//set api key
		$strip_key = env('STRIPE_SECRET');
		\Stripe\Stripe::setApiKey($strip_key);
		//"cus_8wAxocEm6hW9zX"
		$cus = \Stripe\Customer::retrieve($userStripId);

		return $cus;

	}


	protected function getSubscriptionData($userSubscrip){

		//set api key
		$strip_key = env('STRIPE_SECRET');
		\Stripe\Stripe::setApiKey($strip_key);

		$subs = \Stripe\Subscription::retrieve($userSubscrip);
		return $subs;

	}


	protected function sendSubscriptionMail($email,$meta){

		$receiver = $email;
		$subject  = "Subscription ";
		$message  = "Message";
		$template = 'subscription';
		$token    = '';

		$email = $this->send_email($receiver, $message, $subject, $template, $token, $meta);

	}

	protected function notifySubscriptionSuccess(array $meta) {

		// notify data
		$notifyData = [
			'message' => trans('messages.subscription_message', [
				'subscription_end' => $meta['subscription_end'],
			]),
			'type' => 'Subscription',
			'link' => '#/parent/transactions',
			'user_id' => $meta['userId']
		];

		// Fire notify event
		event(new NotifyParent($notifyData));

	}


	protected function notifySubscriptionFail(array $meta) {

		// notify data
		$notifyData = [
			'message' => trans('messages.subscription_failed_message', [
			]),
			'type' => 'Subscription Failed',
			'link' => '#/parent/dashboard',
			'user_id' => $meta['userId']
		];

		// Fire notify event
		event(new NotifyParent($notifyData));

	}

	protected function sendUnSubscriptionMail($email,$meta){

		$receiver = $email;
		$subject  = "Unsubscription ";
		$message  = "Message";
		$template = 'unsubscription';
		$token    = '';

		$email = $this->send_email($receiver, $message, $subject, $template, $token, $meta);

	}

	protected function notifyUnSubscriptionSuccess(array $meta) {

		// notify data
		$notifyData = [
				'message' => trans('messages.unsubscription_message', [
				'subscription_end' => $meta['subscription_end'],
			]),
			'type' => 'Unsubscription',
			'link' => '#/parent/transactions',
			'user_id' => $meta['userId']
		];

		// Fire notify event
		event(new NotifyParent($notifyData));

	}

	protected function isExpiredSubscription($userStripId){

		$stripResponse = $this->getSubscriptionStatus($userStripId);
		if($this->convertDate($stripResponse->subscriptions->data[0]['current_period_end']) > date( 'Y-m-d H:i:s')){
			return true;
		}
		return false;
	}

	protected function isActiveSubscription($userSubscrip){

		$stripResponse = $this->getSubscriptionData($userSubscrip);
		if(!strcmp($stripResponse->status ,"past_due")){
			return true;
		}
		return false;
	}


	protected function convertDate($strtotime){
		return date( 'Y-m-d H:i:s', $strtotime );
	}


	protected function isSponsor($user){
		$sponsor = HouseSponsor::where('user_id', $user->id)->where('enable', 1)->get();
		if(count($sponsor) == 0){
			return false;
		}
		return true;

	}

	protected function hasChild($user){
		$child = House::select('user.f_name', 'user.l_name','user.id','user.profile_image')
			->join('childhouses', 'house.id', '=', 'childhouses.house_id')
			->join('user', 'user.id', '=', 'childhouses.child_id')
			->where('house.enable', 1)
			->where('house.user_id', $user->id)
			->get();
		if(count($child) == 0){
			return false;
		}
		return true;
	}


}
