<?php

namespace App\Http\Controllers;

use App\Payment;
use App\Traits\NotificationTrait;
use Illuminate\Http\Request;

use Auth;
use Response;
use App\HomeGiftCard;
use App\ChildGiftCard;
use App\Reward;
use App\User;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class GiftCardController extends PaymentController
{

    use NotificationTrait;

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function card_by_id($id=null)
    {
        if($id==null)
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 405);
        }
        // $id = 'amazoncom';
        $headers = array(
            "Authorization: ApiKey " . env('GIFTANGO_KEY'), // env('GIFTANGO_KEY')
            "ClientId: cardfreetest",
            "Content-Type: application/x-www-form-urlencoded"
        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_URL, "https://api.giftango.com/enterpriseapi/v1/Brands/" . $id . "?getLatestBalance=true");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response = curl_exec($ch);
        curl_close($ch);

        $response = json_decode($response);
        // dd($response->Code);
        if (isset($response->Code)) {
            return false;
            // return $response->Code;
        }
        if (isset($response->Id)) {
            $card = array(
                'Id' => $response->Id,
                'Name' => $response->Name,
                'Description' => $response->Description,
                'VariableAmountDenominationMinimumValue' => $response->VariableAmountDenominationMinimumValue,
                'VariableAmountDenominationMaximumValue' => $response->VariableAmountDenominationMaximumValue,
                'CardImages' => json_encode(end($response->CardImages)),
                // 'CardImages' => $response->CardImages
            );
            return json_encode($card);
        }
        return false;
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function get()
    {
        $cards = array();
        $response = $this->getApiData("Brands", null);

        foreach (json_decode($response) as $data) {
            $card = array(
                'Id' => $data->Id,
                'Name' => $data->Name,
                'Description' => $data->Description,
                'VariableAmountDenominationMinimumValue' => $data->VariableAmountDenominationMinimumValue,
                'VariableAmountDenominationMaximumValue' => $data->VariableAmountDenominationMaximumValue,
                'CardImages' => json_encode(end($data->CardImages)),
                'Categories' => $data->Categories
            );
            array_push($cards, $card);
        }
        return json_encode($cards);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function purchase($giftcard)
    {   //'.$giftcard['purchaser_state'].'
        $fields_string = '{
                          "Description": "Earn to Learn",
                          "PurchaseOrderNumber": "'.$giftcard["purchased_id"].'",
                          "Payment": {
                            "Amount": '.$giftcard["amount"].',
                            "City": "'.$giftcard['purchaser_city'].'",
                            "Country": "'.$giftcard['purchaser_country'].'",
                            "CreditCardExpirationMonth":'.$giftcard["ccExpairMonth"].',
                            "CreditCardExpirationYear": '.$giftcard["ccExpairYear"].',
                            "CreditCardNumber": "'.$giftcard["ccNumber"].'",
                            "CreditCardVerificationCode": "'.$giftcard["ccCvs"].'",
                            "FirstName": "'.$giftcard["purchaser_fname"].'",
                            "LastName": "'.$giftcard["purchaser_lname"].'",
                            "StateProvince": "'.$giftcard['purchaser_state'].'",
                            "StreetAddress1": "'.$giftcard["purchaser_address"].'",
                            "StreetAddress2": "",
                            "ZipPostalCode": "'.$giftcard['purchaser_zipcode'].'",
                            "CreditCardType": "'.$giftcard['cardType'].'",
                            "OrderPaymentMethod": "CreditCard"
                          },
                          "Purchaser": {
                            "City": "'.$giftcard["purchaser_city"].'",
                            "CompanyName": "",
                            "Country": "'.$giftcard['purchaser_country'].'",
                            "EmailAddress": "'.$giftcard["purchaser_email"].'",
                            "FirstName": "'.$giftcard["purchaser_fname"].'",
                            "LastName": "'.$giftcard["purchaser_lname"].'",
                            "MobilePhoneNumber": "'.$giftcard["purchaser_phone"].'",
                            "PhoneNumber": "'.$giftcard['purchaser_zipcode'].'",
                            "SendDeliveryEmailAlert": true,
                            "SendDeliveryTextAlert": false,
                            "SendViewEmailAlert": false,
                            "SendViewTextAlert": false,
                            "StateProvince": "'.$giftcard['purchaser_state'].'",
                            "StreetAddress1": "'.$giftcard["purchaser_address"].'",
                            "StreetAddress2": "",
                            "ZipPostalCode": "'.$giftcard['purchaser_zipcode'].'"
                          },
                          "Recipients": [
                            {
                              "EmailAddress": "'.$giftcard["deliver_email"].'",
                              "FirstName": "'.$giftcard["deliver_fname"].'",
                              "LastName": "'.$giftcard["deliver_lname"].'",
                              "ShippingMethod": "Email",
                              "Items": [
                                {
                                  "Amount": '.$giftcard["amount"].',
                                  "HideAmount": false,
                                  "BrandId": "'.$giftcard["brand_id"].'",
                                  "Quantity": 1
                                }
                              ]
                            }
                          ]
                        }';

        $response = $this->orderGiftCard($fields_string);
        $response = json_decode($response);

        if (isset($response->Result) and $response->Result == "Success") {
            return $response;
        }
        return $response;

    }

    /**
     * submit purchase order to giftcard API
     *
     * @param $fields_string
     * @return mixed]
     *
     */
    protected function orderGiftCard($fields_string)
    {
        $headers = array(
            "Authorization: ApiKey " . env('GIFTANGO_KEY'), // env('GIFTANGO_KEY')
            "ClientId:" . env('GIFT_CLIENT_ID'),
            "Content-Type: application/json"
        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_URL, "https://api.giftango.com/enterpriseapi/v1/Orders");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt( $ch, CURLOPT_CUSTOMREQUEST, "POST" );
        curl_setopt($ch,CURLOPT_POST, 100);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);

        if (!$response = curl_exec($ch)) {
            trigger_error(curl_error($ch));
        }
        curl_close($ch);
        \Log::info("==== payment response");
        \Log::info(print_r(json_decode($response, true), true));
        return $response;

    }

    /**
     *
     * common methods for get api data
     *
     * @param $method
     * @param $param
     * @return mixed
     */
    protected function getApiData($method, $param)
    {
        $headers = array(
            "Authorization: ApiKey " . env('GIFTANGO_KEY'), // env('GIFTANGO_KEY')
            "ClientId:" . env('GIFT_CLIENT_ID'),
            "Content-Type: application/x-www-form-urlencoded"
        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_URL, "https://api.giftango.com/enterpriseapi/v1/" . $method . "/" . $param);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

        if (!$response = curl_exec($ch)) {
            trigger_error(curl_error($ch));
        }
        curl_close($ch);

        return $response;
    }


    /**
     *
     * @param null $id
     * @return mixed
     */
    public function getChaildGiftCardByChildGiftCard($id=null)
    {
        $childgiftcard = ChildGiftCard::first()->select('homegiftcards.points', 'homegiftcards.card_id', 'user.f_name as recipientFName', 'user.email as recipientEmail' ,'user.l_name as recipientLName', 'childgiftcards.house_id', 'childgiftcards.child_id', 'childgiftcards.enable','childgiftcards.id as child_giftcard_id', 'childgiftcards.bundle_id', 'bundle.name as bundle_name', 'childgiftcards.sponsor_id')
            ->join('homegiftcards', 'homegiftcards.id', '=', 'childgiftcards.housecard_id')
            ->join('house', 'house.id', '=', 'homegiftcards.house_id')
            ->join('user', 'user.id', '=', 'house.user_id')
            ->leftJoin('bundle', 'bundle.id', '=', 'childgiftcards.bundle_id')
            ->where('childgiftcards.id', $id)
            ->where('childgiftcards.enable', 1)
            ->where('homegiftcards.enable', 1)
            ->get()->first();

        if (empty($childgiftcard)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        $sponsor_id = '';
        $sponsor_first_name = '';
        $sponsor_last_name = '';
        $sponsor_email = '';

        if (isset($childgiftcard->sponsor_id)) {
            $sponsor = User::select('user.f_name', 'user.l_name', 'user.email')->where('id', $childgiftcard->sponsor_id)->first();
            $sponsor_id = $childgiftcard->sponsor_id;
            $sponsor_first_name = $sponsor->f_name;
            $sponsor_last_name = $sponsor->l_name;
            $sponsor_email = $sponsor->email;
        }

        $childgiftcard->sponsor_id = $sponsor_id;
        $childgiftcard['sponsor_first_name'] = $sponsor_first_name;
        $childgiftcard['sponsor_last_name'] = $sponsor_last_name;
        $childgiftcard['sponsor_email'] = $sponsor_email;

        return Response::json([
            'query_status' => 'success',
            'data' => $childgiftcard
        ], 200);
    }

    public function purchaseGiftCard($card_id ,Request $request){

        $request = $request->all();
        $childgiftcard = ChildGiftCard::find($card_id);
        $housegiftcard = null;

        if(!empty($childgiftcard)){
            $housegiftcard = HomeGiftCard::find($childgiftcard->housecard_id);
        }

        $childGiftcard = ChildGiftCard::select('homegiftcards.card_id', 'homegiftcards.points', 'childgiftcards.child_id', 'childgiftcards.is_approved', 'childgiftcards.bundle_id', 'bundle.name as bundle_name', 'childgiftcards.sponsor_id', 'user.id as parent_id')
            ->join('homegiftcards', 'homegiftcards.id', '=', 'childgiftcards.housecard_id')
            ->join('house', 'house.id', '=', 'homegiftcards.house_id')
            ->join('user', 'user.id', '=', 'house.user_id')
            ->leftJoin('bundle', 'bundle.id', '=', 'childgiftcards.bundle_id')
            ->where('childgiftcards.id', $card_id)
            ->where('childgiftcards.enable', 1)
            ->where('homegiftcards.enable', 1)
            ->first();

        if (empty($childGiftcard)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'gift card not found'
            ], 404);
        }

        $child_points = Reward::select('value')
            ->where('child_id', $childGiftcard->child_id)
            ->sum('value');

        // Validate child points only
        if (!isset($childGiftcard->bundle_id)) {
            if (!empty($child_points) and $child_points < $childGiftcard->points) {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'child dose not have enough points'
                ], 406);
            }
        }

        if(!$request['deliver_email'] or
            !$request['ccNumber'] or
            !$request['ccExpairMonth'] or
            !$request['ccExpairYear']
        ){
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }

        $giftcard['amount'] = $housegiftcard['points'];
        $giftcard['brand_id'] = $housegiftcard['card_id'];
        $giftcard['purchaser_email'] = $request['purchaser_email'];
        $giftcard['purchaser_fname'] = $request['purchaser_fname'];
        $giftcard['purchaser_lname'] = $request['purchaser_lname'];
        $giftcard['purchaser_city'] = $request['purchaser_city'];
        $giftcard['purchaser_address'] = $request['purchaser_address'];
        $giftcard['purchaser_phone'] = $request['purchaser_phone'];
        $giftcard['purchaser_zipcode'] = $request['purchaser_zipcode'];
        $giftcard['purchaser_state'] = $request['purchaser_state'];
        $giftcard['purchaser_country'] = $request['purchaser_country'];

        $giftcard['deliver_email'] = $request['deliver_email'];
        $giftcard['deliver_fname'] = $request['deliver_fname'];
        $giftcard['deliver_lname'] = $request['deliver_lname'];

        $giftcard['ccNumber'] = $request['ccNumber'];
        $giftcard['ccExpairMonth'] = $request['ccExpairMonth'];
        $giftcard['ccExpairYear'] = $request['ccExpairYear'];
        $giftcard['ccCvs'] = $request['ccCvs'];
        $giftcard['cardType'] = $request['cardType'];

        $giftcard['user_id'] = Auth::user()->id;
        $giftcard['payment_status'] = 0; //payment status 0-processing 1-successful 2-error

        $giftcard['purchased_id'] = uniqid();

        $giftCardPaymentController = new GiftCardPaymentController;
        $saveData = $giftCardPaymentController->savePayment($giftcard);

        //print_r($saveData);
        $giftCardPurcashedId = $saveData->id;


       $responseData = $this->purchase($giftcard);

        if(!isset($responseData->Code)){
            if($responseData->Result == "Success" ){
                $giftCardSuccessData = $responseData->SubmittedOrderItemGiftCards[0];
                $updatePayment['giftcard_unique_id'] = $responseData->Id;
                $updatePayment['giftcard_id'] = $giftCardSuccessData->GiftCardId;
                $updatePayment['giftcard_status'] = $giftCardSuccessData->GiftCardStatus;
                $updatePayment['giftcard_url'] = $giftCardSuccessData->GiftCardUrl;
                $updatePayment['giftcard_number'] = $giftCardSuccessData->GiftCardNumber;
                $updatePayment['brand_id'] = $giftCardSuccessData->BrandId;
                $updatePayment['brand_name'] = $giftCardSuccessData->BrandName;
                $updatePayment['pin'] = $giftCardSuccessData->Pin;
                $updatePayment['ipg_transaction_id'] = $responseData->Payment->PaymentGatewayBankTransactionId;
                $updatePayment['credit_card_four_digits'] = $responseData->Payment->LastFourDigitsOfCreditCardNumber;
                $updatePayment['purchased_date'] = $responseData->Payment->TimeStamp;
                $updatePayment['purchased_id'] = $responseData->PurchaseOrderNumber;
                $updatePayment['payment_status'] = 1;

                $giftCardPaymentController->updatePayment($giftCardPurcashedId,$updatePayment);
                $this->updateTransaction($updatePayment,Auth::user()->id,$giftcard['amount'],$card_id);

                $sponsor_id = '';
                $sponsor_name = '';

                if (isset($childGiftcard->sponsor_id) && Auth::user()->id == $childGiftcard->sponsor_id) {
                    $sponsor = User::select('user.f_name', 'user.l_name', 'user.email')->where('id', $childGiftcard->sponsor_id)->first();
                    $sponsor_id = $childGiftcard->sponsor_id;
                    $sponsor_name = $sponsor->f_name . ' ' . $sponsor->l_name;
                    $child = User::select('user.f_name', 'user.l_name')->where('id', $childGiftcard->child_id)->first();
                    // send a notification to parent saying sponsor purchase a gift card to child
                    $this->notifyWhenSponsorPurchasedAGiftCardToChild([
                        'childFirstName' => $child->f_name,
                        'childLastName' => $child->l_name,
                        'amount' =>  '$' . $housegiftcard['points'],
                        'sponsorName' => $sponsor_name,
                        'giftCardName' => $childGiftcard->card_id,
                        'userId' => $childGiftcard->parent_id,
                    ]);
                }

                if (!isset($childGiftcard->bundle_id)) {
                    $this->updateReward($card_id, $giftcard['purchaser_email']);
                }

                // mark this gift card as approved payment
                ChildGiftCard::where('id', $card_id)->update(['is_approved' => 1, 'enable' => 0]);

                return Response::json([
                    'query_status' => 'success',
                    'message' => 'Record Updated Successfully',
                    'data' => $updatePayment
                ], 200);

            }else{
                $giftcard['payment_status'] = 2;
                $giftCardPaymentController->updatePayment($giftCardPurcashedId,$this->purchase($giftcard));
            }
        }else{
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);

        }

    }


    private function updateReward($card_id,$email){

        $giftcard = ChildGiftCard::select('homegiftcards.card_id', 'homegiftcards.points', 'childgiftcards.child_id', 'childgiftcards.is_approved')
            ->join('homegiftcards', 'homegiftcards.id', '=', 'childgiftcards.housecard_id')
            ->where('childgiftcards.id', $card_id)
            ->where('childgiftcards.enable', 1)
            ->where('homegiftcards.enable', 1)
            ->first();


        $this->purchase($giftcard->points * 1, $giftcard->card_id, null);

        Reward::create(['child_id' => $giftcard->child_id, 'value' => (-1 * $giftcard->points), 'type' => 0, 'enable' => 0]);

        $child = User::select('user.f_name', 'user.l_name')->where('id', $giftcard->child_id)->first();

        $meta = array(
            'child_f_name' => $child->f_name,
            'child_l_name' => $child->l_name,
            'giftcard' => $giftcard->card_id,
            'giftcard_amount' => $giftcard->points,
        );

        $receiver = $email;
        $subject = "Receipt for your purchase";
        $message = "Message";
        $template = 'paymentconfirmation';
        $token = '';

        $email = $this->send_email($receiver, $message, $subject, $template, $token, $meta);

    }

    /**
     *
     * check child can request giftcard
     *
     * @param $childId
     * @param $points
     * @return mixed
     */
    public function isAvailablePonintForRequest($childId , $points){
        $canRequest =false;
        $childGiftcard = ChildGiftCard::select('homegiftcards.card_id', 'homegiftcards.points', 'childgiftcards.child_id')
            ->join('homegiftcards', 'homegiftcards.id', '=', 'childgiftcards.housecard_id')
            ->where('childgiftcards.child_id', $childId)
            ->where('childgiftcards.enable', 1)
            ->where('childgiftcards.is_approved', 0)
            ->where('homegiftcards.enable', 1)
            ->get();

        $totalPoints = 0;
        if($childGiftcard != null){
            foreach ( $childGiftcard as $giftCard){
                $totalPoints += $giftCard->points;
            }
        }

        $child_points = Reward::select('value')
            ->where('child_id', $childId)
            ->sum('value');

        if($totalPoints < $child_points){
            if($points > ($child_points - $totalPoints)){
                $canRequest = false;
            }else{
                $canRequest = true;
            }
        }
        if($totalPoints == $child_points){
            $canRequest = false;
        }
        return Response::json([
            'query_status' => 'success',
            'message' => 'Successfully Checked ',
            'data' => ['canRequest' => $canRequest]
        ], 200);
    }

    public function updateTransaction($transaction,$userId,$amount,$giftcardId){
        $paymentData['user_id'] = $userId;
        $paymentData['amount'] = ($amount*100);
        $paymentData['currency'] = "USD";
        $paymentData['charge_id'] = $transaction['ipg_transaction_id'];
        $paymentData['refund_id'] = $transaction['ipg_transaction_id'];
        $paymentData['ref_id'] = $giftcardId;
        $paymentData['status'] = "succeeded";
        $paymentData['enable'] = 1;
        $paymentData['type'] = 1;

        $payment = Payment::create($paymentData);
    }

}