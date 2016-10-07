<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\House;
use App\UserLog;
use App\MailSubscription;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Log;

class AuthenticateController extends Controller
{

    public function __construct()
    {
       $this->middleware('jwt.auth', ['except' => ['authenticate', 'fb_authenticate']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return "Auth index";
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('username', 'password');

        // check user is enable(still active) in the system.
        $credentials['enable'] = 1;
            
        /*$user = User::select('house.id as house_id')->where('username', '=', $credentials['username'])->join('house', 'house.user_id', '=', 'user.id')->first();
        $customClaims = ['house_id' => $user->house_id];
        JWTAuth::attempt($credentials, $customClaims);*/
        
        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        
        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
            
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            
            return response()->json(['token_expired'], $e->getStatusCode());
            
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            
            return response()->json(['token_invalid'], $e->getStatusCode());
            
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            
            return response()->json(['token_absent'], $e->getStatusCode());
            
        }
            
        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }
    
    public function fb_authenticate(Request $request)
    {   
        $request = $request->all();
        // dd($request['data']);
        $request = json_decode($request['data']); 
        // dd(bcrypt($request->id));
        // dd($request->email);
        $request->email = $request->email;
        $request->f_name = $request->first_name;
        $request->l_name = $request->last_name;
        $request->username = explode("@", $request->email)[0];
        $request->password = bcrypt($request->id);
        $request->profile_image = "http://graph.facebook.com/" . $request->id ."/picture?type=large";
        // $strrev = strrev($request->id);
        // $request->password = bcrypt($strrev);
        
        $ex_user = User::latest()->where('username', $request->username)->orWhere('email', $request->email)->first(); 
        if( empty($ex_user) ) 
        { 
            $user = User::create([
                    'f_name'        => $request->f_name,
                    'l_name'        => $request->l_name,
                    'email'         => $request->email,
                    'role_id'       => 2,
                    'username'      => $request->username,
                    'password'      => $request->password,
                    'trial_ends_at' => date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . "+14 days")), // months
                    'fb_password'   => bcrypt($request->id),
                    '_fb'           => 1,
                    'enable'        => 1,
                    'profile_image' => $request->profile_image
                ]);
            // create request to create hocuse
            // $req_house = array('name' => $request->username.' house', 'user_id' => $user->id, 'enable' => 1 );
			$house = House::create(['name' => $request->username.'\'s house', 'user_id' => $user->id, 'enable' => 1]); 
            MailSubscription::create(['user_id'=>$user->id]);
        }
        // ========================================================================================
        // $credentials = $request->only('username', 'password'); 
        // $credentials['username'] = $request->username; 
        $credentials['email'] = $request->email; 
        // $credentials['fb_password'] = $request->id; 
        $credentials['password'] = $request->id;
        
        // check user is enable(still active) in the system.
        $credentials['_fb'] = 1; 
        $credentials['enable'] = 1; 
        
        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        
        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }
    
    
}