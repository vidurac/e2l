<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Response;
use App\User;
use App\Payment;
use Session;

class StripWebhookController extends Controller
{
    public function __construct()
    {

        $strip_key = env('STRIPE_SECRET');
        \Stripe\Stripe::setApiKey($strip_key);

        $input = @file_get_contents("php://input");
        //$event_json = json_decode($input);
        $event_json = json_decode($input);

        foreach ($event_json->data as $event){

            $user = User::select('user.id')
                ->where('user.stripe_active', '=', 1)
                ->where('user.stripe_id', '=',$event->customer)
                ->first();

            foreach ($event->lines->data as $line){
                $amount=($line->amount* $event->quantity);
                //foreach ($line as $paymentData){
                     Payment::create(array(
                    'user_id'	=>	$user->id,
                    'amount'	=>	$amount,
                    'currency'	=>	$line->currency,
                    'charge_id'	=>	$event->charge,
                    'refund_id'	=>	$event->id,
                    'source'	=>	$input,
                    'status'	=>	$event->paid ? "Succeeded":"Failed",
                    'type'		=>	2,
                    'ref_id'	=>	0,
                    'enable'	=>	1
                ));
            }
            if($event->paid){
                $subsEndDate = $this->convertDate($event->period_end);
                $update = User::where('id', $user->id)
                    ->update(['payment_status' => 1 ,'subscription_ends_at'=>$subsEndDate]);
            }

            if($event->paid){
                $meta = array(
                    'parent_f_name'         => $event->customer->f_name,
                    'parent_l_name'         => $event->customer->l_name,
                );

                $receiver = $event->customer->email;
                $subject  = "Earn to Learn subscription payment failed.";
                $message  = "Message";
                $template = 'payment_failed';
                $token    = '';

                $email = $this->send_email($receiver, $message, $subject, $template, $token, $meta);
            }
        }



    }

    protected function convertDate($strtotime){
        return date( 'Y-m-d H:i:s', $strtotime );
    }
}
