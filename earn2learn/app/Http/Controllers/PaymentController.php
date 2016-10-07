<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Response;
use App\User;
use App\Payment;
use App\ChildGiftCard;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;
use Laravel\Cashier\Billable;

class PaymentController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $payments = Payment::select('payments.*', 'user.f_name', 'user.l_name', 'user.profile_image')
                            ->join('user', 'user.id', '=', 'payments.user_id')
                            ->get();
                            
        if(!$payments->count())
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);    
                
        return Response::json([
                'query_status' => 'success',
                'data' => $payments
            ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function by_user($id=null)
    {
        if($id==null)
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'missing argument'
                ], 401);    
                
        $payments = Payment::select('payments.*', 'user.f_name', 'user.l_name', 'user.profile_image')->join('user', 'user.id', '=', 'payments.user_id')->where('payments.user_id', $id)->get();
        foreach ($payments as $payment)
        {
            // dd($payment->ref_id);
            $giftcard = ChildGiftCard::select('homegiftcards.card_id as giftcard', 'user.f_name', 'user.l_name')
                    ->join('homegiftcards', 'homegiftcards.id', '=', 'childgiftcards.housecard_id') 
                    ->join('user', 'user.id', '=', 'childgiftcards.child_id') 
                    ->where('childgiftcards.id', $payment->ref_id) 
                    ->first();
                        
            $payment->giftcard   = (isset($giftcard->giftcard))? $giftcard->giftcard : 'none'; 
            $payment->child_name = (isset($giftcard->f_name) and isset($giftcard->l_name))? $giftcard->f_name.' '.$giftcard->l_name : 'none'; 
            
        }
        // dd($payments);
        
        if(!$payments->count())
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);    
                
        return Response::json([
                'query_status' => 'success',
                'data' => $payments
            ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        
        // Payment::create($request->all());

        // Session::flash('flash_message', 'Payment added!');

        // return redirect('payment');
    }

    /**
     * Charge paymebts.
     * @return \Illuminate\Http\Response
     */
    public function charge(Request $request)
    {
        $amount		= env('PER_CHILD')*100; 
        
        if( $response = Auth::user()->charge($amount, ['customer' => Auth::user()->stripe_id, 'receipt_email' => Auth::user()->email ]) )
        {
			return true;
        }
        
        return false;
    }

    /**
     * Display the specified resource.
     * @param  int  $id
     * @return Response
     */
    public function do_payment($token, $type, $amount, $ref_id=0)
    {
        // init customer
        $customer = Auth::user();
        if (Auth::user()->subscribed('customer'))
        {   
            // $ref_id = 0;
            // payment
            $response = $customer->charge( $amount, ['customer' => $customer->stripe_id, 'receipt_email' => $customer->email] );
            // check payment
            if( $response )
            {
                $type = 3;
                Payment::create(array(
    					'user_id'	=>	Auth::user()->id,
    					'amount'	=>	$amount,
    					'currency'	=>	$response->currency,
    					'charge_id'	=>	$response->id,
    					'refund_id'	=>	$response->balance_transaction,
    					'source'	=>	$response->source,
    					'status'	=>	$response->status,
    					'type'		=>	$type,
    					'ref_id'	=>	$ref_id,
    					'payment_status'	=>	1,
    					'enable'	=>	1
    				));
                
                // return true;
                return $response;
            }
            return false;
        }
        return false;
    }

    /**
     * Refund of tne payments
     * @param  Request $request
     * @return Response
     */
    public function refund($payment_id)
    {
        if( !Auth::check() )
            return Response::json([
                'query_status' => 'access_denied',
                'message' => 'access denied or invald login'
            ], 401);
        return true;
    }

    /**
     * Payment subscription 
     * @param  Request $request 
     * @return Response 
     */
    public function subscription(Request $request)
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
        
        if (Auth::user()->subscribed('gold'))
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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        Payment::destroy($id);

        Session::flash('flash_message', 'Payment deleted!');

        return redirect('payment');
    }
}
