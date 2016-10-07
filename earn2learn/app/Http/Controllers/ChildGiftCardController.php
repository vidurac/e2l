<?php

namespace App\Http\Controllers;

use App\ChildHouse;
use App\House;
use App\HouseSponsor;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\ChildGiftCard;
use App\HomeGiftCard;
use App\MailSubscription;
use App\Reward;
use App\Traits\NotificationTrait;
use App\User;
use Illuminate\Support\Facades\Auth;
use Response;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;
use Log;

class ChildGiftCardController extends GiftCardController
{
    use NotificationTrait;

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
        $childgiftcard = ChildGiftCard::paginate(15);

        return view('childgiftcard.index', compact('childgiftcard'));
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function by_id($id = null)
    {
        if ($id == null) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 405);
        }

        $childgiftcard = ChildGiftCard::select('card_id', 'house_id', 'child_id', 'enable')
            ->where('id', $id)
            ->where('enable', 1)
            ->first();

        if (empty($childgiftcard)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $cards = array();
        foreach ($childgiftcard as $card) {
            $respond = $this->card_by_id($card->card_id);
            if ($respond) {
                array_push($cards, $respond);
            }
        }

        if (empty($cards)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $cards
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function by_child($id = null)
    {
        if ($id == null) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 405);
        }

        $childgiftcard = ChildGiftCard::select('homegiftcards.card_id', 'homegiftcards.points as card_points', 'childgiftcards.house_id', 'childgiftcards.child_id', 'childgiftcards.is_approved', 'childgiftcards.enable')
            ->join('homegiftcards', 'homegiftcards.id', '=', 'childgiftcards.housecard_id')
            ->where('childgiftcards.child_id', $id)
            ->where('homegiftcards.enable', 1)
            ->get();

        foreach ($childgiftcard as $card) {
            $respond = $this->card_by_id($card->card_id);
            if ($respond) {
                $card->card = json_decode($respond);
            }
        }
        // exit;
        if (empty($childgiftcard)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }


        return Response::json([
            'query_status' => 'success',
            'data' => $childgiftcard
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function by_house($id = null)
    {
        if ($id == null) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 405);
        }

        $childgiftcard = ChildGiftCard::select('homegiftcards.points', 'homegiftcards.card_id', 'user.f_name', 'user.l_name' ,'user.profile_image as user_image', 'childgiftcards.id', 'childgiftcards.house_id', 'childgiftcards.housecard_id', 'childgiftcards.child_id', 'childgiftcards.enable','childgiftcards.id as child_giftcard_id', 'childgiftcards.sponsor_id', 'childgiftcards.bundle_id', 'bundle.name as bundle_name')
            ->join('homegiftcards', 'homegiftcards.id', '=', 'childgiftcards.housecard_id')
            ->join('user', 'user.id', '=', 'childgiftcards.child_id')
            ->leftJoin('bundle', 'bundle.id', '=', 'childgiftcards.bundle_id')
            ->where('childgiftcards.house_id', $id)
            ->where('childgiftcards.enable', 1)
            ->where('homegiftcards.enable', 1)
            ->get();

        if (!$childgiftcard->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $cards = array();
        foreach ($childgiftcard as $card) {
            $respond = $this->card_by_id($card->card_id);
            $sponsor_id = '';
            $sponsor_name = '';
            $bundle_id = '';
            $bundle_name = '';
            if ($respond) {
                $respond = json_decode($respond);
                $respond->card_id = $card->card_id;
                $respond->child_id = $card->child_id;
                $respond->child_f_name = $card->f_name;
                $respond->child_l_name = $card->l_name;
                $respond->child_card_id = $card->id;
                $respond->card_points = $card->points;
                $respond->card_enable = $card->enable;
                $respond->card_house_id = $card->house_id;
                $respond->housecard_id = $card->housecard_id;
                $respond->user_image = $card->user_image;
                $respond->child_giftcard_id = $card->child_giftcard_id;

                \Log::info("========= spondor id " . $card->sponsor_id);

                if (isset($card->sponsor_id)) {
                    \Log::info("========= spondor id " . $card->sponsor_id);
                }else {
                    \Log::info("========= spondor id not set");
                }

                // if gift card related to sponsor then get sponsor details
                if (isset($card->sponsor_id)) {
                    $sponsor = User::select('user.f_name', 'user.l_name')->where('id', $card->sponsor_id)->first();
                    $sponsor_id = $card->sponsor_id;
                    $sponsor_name = $sponsor->f_name . ' ' . $sponsor->l_name;
                }

                $respond->sponsor_id = $sponsor_id;
                $respond->sponsor_name = $sponsor_name;

                if (isset($card->bundle_name)) {
                    $bundle_id =  $card->bundle_id;
                    $bundle_name =  $card->bundle_name;
                }
                $respond->bundle_id = $bundle_id;
                $respond->bundle_name = $bundle_name;

                $respond->child_points = intval(Reward::select('value')
                    ->where('child_id', $card->child_id)
                    ->sum('value'));
                // dd($respond);
                array_push($cards, $respond);
            }
        }

        if (empty($cards)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $cards
        ], 200);
    }

    /**
     * Returns all requested gift card from children
     * which were assigned by sponsor
     * @return mixed
     */
    public function getChildRequestedGiftCardFromSponsor() {

        // Get authenticated user
        $userId = Auth::user()->id;

        $ids = HouseSponsor::all()->where('user_id', $userId)->where('enable', 1)->pluck('house_id')->toArray();

        if (empty($ids)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Data not found'
            ], 404);
        }


        $childgiftcard = ChildGiftCard::select('homegiftcards.points', 'homegiftcards.card_id', 'user.f_name', 'user.l_name' ,'user.profile_image as user_image', 'childgiftcards.id', 'childgiftcards.house_id', 'childgiftcards.housecard_id', 'childgiftcards.child_id', 'childgiftcards.enable','childgiftcards.id as child_giftcard_id', 'childgiftcards.sponsor_id', 'childgiftcards.bundle_id', 'bundle.name as bundle_name')
            ->join('homegiftcards', 'homegiftcards.id', '=', 'childgiftcards.housecard_id')
            ->join('user', 'user.id', '=', 'childgiftcards.child_id')
            ->leftJoin('bundle', 'bundle.id', '=', 'childgiftcards.bundle_id')
            ->whereIn('childgiftcards.house_id', $ids)
            ->where('childgiftcards.enable', 1)
            ->where('homegiftcards.enable', 1)
            ->where('childgiftcards.sponsor_id', $userId)
            ->where('homegiftcards.sponsor_id', $userId)
            ->get();

        \Log::info('===== after query ' . $childgiftcard->count());


        if (!$childgiftcard->count()) {
            \Log::info('=== returns 404');
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        \Log::info('===== after count ' . $childgiftcard->count());

        $cards = array();
        foreach ($childgiftcard as $card) {
            $respond = $this->card_by_id($card->card_id);
            $sponsor_id = '';
            $sponsor_name = '';
            $bundle_id = '';
            $bundle_name = '';
            if ($respond) {
                $respond = json_decode($respond);
                $respond->card_id = $card->card_id;
                $respond->child_id = $card->child_id;
                $respond->child_f_name = $card->f_name;
                $respond->child_l_name = $card->l_name;
                $respond->child_card_id = $card->id;
                $respond->card_points = $card->points;
                $respond->card_enable = $card->enable;
                $respond->card_house_id = $card->house_id;
                $respond->housecard_id = $card->housecard_id;
                $respond->user_image = $card->user_image;
                $respond->child_giftcard_id = $card->child_giftcard_id;

                // if gift card related to sponsor then get sponsor details
                if (isset($card->sponsor_id)) {
                    $sponsor = User::select('user.f_name', 'user.l_name')->where('id', $card->sponsor_id)->first();
                    $sponsor_id = $card->sponsor_id;
                    $sponsor_name = $sponsor->f_name . ' ' . $sponsor->l_name;
                }

                $parent = House::select('house.name as house_name', 'user.id', 'user.f_name', 'user.l_name', 'user.email')->join('user', 'user.id', '=', 'house.user_id')->where('house.id', $card->house_id)->first();

                $respond->sponsor_id = $sponsor_id;
                $respond->sponsor_name = $sponsor_name;
                $respond->parent_name = $parent->f_name . ' ' . $parent->l_name;
                $respond->parent_id = $parent->id;
                $respond->parent_email = $parent->email;
                $respond->house_name = $parent->house_name;

                if (isset($card->bundle_name)) {
                    $bundle_id =  $card->bundle_id;
                    $bundle_name =  $card->bundle_name;
                }
                $respond->bundle_id = $bundle_id;
                $respond->bundle_name = $bundle_name;


                $respond->child_points = intval(Reward::select('value')
                    ->where('child_id', $card->child_id)
                    ->sum('value'));
                // dd($respond);
                array_push($cards, $respond);
            }
        }

        if (empty($cards)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found xxxx'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $cards
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     * @return Response
     */
    public function store(Request $request)
    {
        $request = $request->all();
        if (!$request['housecard_id'] or !$request['house_id'] or !$request['child_id']) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'please provide all required fields'
            ], 422);
        }

        $request['enable'] = 1; // 1:enable, 0:disable
        ChildGiftCard::create($request);

        $user = ChildGiftCard::select('user.email', 'user.id')
            ->join('house', 'house.id', '=', 'childgiftcards.house_id')
            ->join('user', 'user.id', '=', 'house.user_id')
            // ->where('childgiftcards.child_id', Auth::user()->id)
            ->where('childgiftcards.child_id', $request['child_id'])
            ->first();
        //   dd($email); 
        $child = User::select('user.f_name', 'user.l_name')->where('id', $request['child_id'])->first();
        $gift_card = HomeGiftCard::select('card_id', 'points as amount')->where('id', $request['housecard_id'])->first();
        $meta = array(
            'child_f_name' => $child->f_name,
            'child_l_name' => $child->l_name,
            'gift_card_name' => $gift_card->card_id,
            'gift_card_amount' => $gift_card->amount
        );
        // dd($mata);
        $receiver = $user->email;
        $subject = $child->f_name . " " . $child->l_name . "  requested a gift card";
        $message = "Message";
        $template = 'giftcardrequest';
        $token = null;

        $mailSetting = MailSubscription::where('user_id', $user->id)->first();

        if (isset($mailSetting) && $mailSetting->giftcard) {
            // Only send email if gift email notification is enabled
            $this->send_email($receiver, $message, $subject, $template, $token, $meta); // $child send as $meta
        }

        // todo Supun Perera just requested $5 amazon.com gift card

        $parentData = ChildHouse::select('user.id')
            ->join('house', 'house.id', '=', 'childhouses.house_id')
            ->join('user', 'user.id', '=', 'house.user_id')
            ->where('childhouses.child_id', $request['child_id'])
            ->first();
        if (isset($request['sponsor_id']) && $request['sponsor_id'] != '') {
            $sponsorDetails = User::find($request['sponsor_id']);
            \Log::info("==== send sponsor id mail!");
            if (isset($sponsorDetails)) {
                $sponsorEmailTemplate = 'sponsor_gift_card_request';
                $this->send_email($sponsorDetails->email, $message, $subject, $sponsorEmailTemplate, $token, $meta); // $child send as $meta
            }

            $sponsor_name = $sponsorDetails->f_name . ' ' . $sponsorDetails->l_name;

            $this->notifyWhenChildRequestAGiftCardFromSponsor([
                'childFirstName' => $child->f_name,
                'childLastName' => $child->l_name,
                'amount' =>  $gift_card->amount,
                'sponsorName' => $sponsor_name,
                'giftCardName' => $gift_card->card_id,
                'userId' => $parentData->id,
                'currency' => '$'
            ]);

        }else {
            $this->notifyWhenChildRequestAGiftCardFromParent([
                'childFirstName' => $child->f_name,
                'childLastName' => $child->l_name,
                'amount' =>  $gift_card->amount,
                'giftCardName' => $gift_card->card_id,
                'userId' => $parentData->id,
                'currency' => '$'
            ]);
        }

        // check mail send
        // if($email){}
        return Response::json([
            'query_status' => 'success',
            'message' => 'card selected successfully'
            // 'data' => $gift_card
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     * @param  int $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        $gift_card = ChildGiftCard::find($id);
        if (empty($gift_card)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $request = $request->all();
        if (!$request['housecard_id'] or !$request['house_id'] or !$request['child_id']) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'please provide all required fields'
            ], 422);
        }

        if ((isset($request['is_approved']) and $request['is_approved']) and !$this->is_parent()) {
            return Response::json([
                'error' => 'access_denied'
            ], 401);
        }

//        if ($request['is_approved'] == 2)
        $request['enable'] = 0;

        $result = $gift_card->update($request);
        if ($result) {
            return Response::json([
                'query_status' => 'success',
                'message' => 'record updated successfully'
            ], 200);
        }

        return Response::json([
            'query_status' => 'error',
            'message' => 'process failed',
        ], 501);

    }

    public function reject($id, Request $request)
    {
        $gift_card = ChildGiftCard::find($id);
        if (empty($gift_card)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $request = $request->all();
        if (!$request['housecard_id'] or !$request['house_id'] or !$request['child_id']) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'please provide all required fields'
            ], 422);
        }

        if ((isset($request['is_approved']) and $request['is_approved']) and !$this->is_parent()) {
            return Response::json([
                'error' => 'access_denied'
            ], 401);
        }

//        if ($request['is_approved'] == 2)
        $request['enable'] = 0;


//        \Log::info("request params " . print_r($request, true));
//        \Log::info("card name " . $gift_card->house_gift_card->card_id);
        $child = User::select('user.f_name', 'user.l_name')->where('id', $gift_card->child_id)->first();
        $amount = $gift_card->house_gift_card->points;
        $giftCardName = ucfirst($gift_card->house_gift_card->card_id);


        $result = $gift_card->update($request);

        if ($result) {

            $childNotifyMeta = array(
                'amount' => '$' . $amount,
                'giftCardName' => $giftCardName,
                'userId' => $gift_card->child_id
            );

            $this->notifyChildWhenGiftRejectByParent($childNotifyMeta);

            if (isset($gift_card->sponsor_id) && $gift_card->sponsor_id != '') {
                \Log::info("=== sponsor id exists");
                $parent = ChildHouse::select('user.f_name', 'user.l_name')
                    ->join('house', 'house.id', '=', 'childhouses.house_id')
                    ->join('user', 'user.id', '=', 'house.user_id')
                    ->where('childhouses.child_id', $gift_card->child_id)
                    ->first();
                $childName = $child->f_name . ' ' . $child->l_name;
                $parentName = $parent->f_name . ' ' . $parent->l_name;
                $sponsorNotifyMeta = array(
                    'amount' => '$' . $amount,
                    'giftCardName' => $giftCardName,
                    'userId' => $gift_card->sponsor_id,
                    'child' => $childName,
                    'parent' => $parentName
                );
                $this->notifySponsorWhenGiftRejectByParent($sponsorNotifyMeta);
            }

            return Response::json([
                'query_status' => 'success',
                'message' => 'record updated successfully'
            ], 200);
        }

        return Response::json([
            'query_status' => 'error',
            'message' => 'process failed',
        ], 501);

    }

    /**
     * Remove the specified resource from storage.
     * @param  int $id
     * @return Response
     */
    public function destroy($id = null)
    {
        if ($id == null) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 405);
        }

        if ($this->is_admin()) {
            ChildGiftCard::destroy($id);
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
