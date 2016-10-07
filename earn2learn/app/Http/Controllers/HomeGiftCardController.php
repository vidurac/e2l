<?php

namespace App\Http\Controllers;

use App\ChildHouse;
use App\House;
use App\Http\Requests;

use App\User;
use Auth;
use App\HomeGiftCard;
use Response;
use Illuminate\Http\Request;
use Session;

class HomeGiftCardController extends GiftCardController
{

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
        if (!$this->is_parent()) {
            return Response::json([
                'error' => 'access_denied'
            ], 401);
        }

        //get gift card
        $giftcards = $this->get();

        if (empty($giftcards)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $giftcards
        ], 200);
    }

    public function getAllGiftCards()
    {

        if (!$this->is_admin()) {
            return Response::json([
                'error' => 'access_denied'
            ], 401);
        }
        // get gift cards
        $giftcards = $this->get();

        if (empty($giftcards)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $giftcards
        ], 200);
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

        $homegiftcard = HomeGiftCard::select('card_id', 'child_id', 'house_id', 'points', 'enable')
            ->where('id', $id)
            ->where('enable', 1)
            ->first();

        if (empty($homegiftcard)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $cards = array();
        foreach ($homegiftcard as $card) {
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
    public function getHouseGiftCardByChild($id)
    {
        if ($id == null)
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 405);

        $homegiftcard = HomeGiftCard::select('id', 'card_id', 'child_id', 'house_id', 'points', 'enable', 'sponsor_id')
            ->where('child_id', $id)
            ->where('enable', 1)
            ->where('bundle_id', null)
            ->get();
        
        $cards = array();
        foreach ($homegiftcard as $card) {
            $respond = $this->card_by_id($card->card_id);
            if ($respond) {
                $respond = json_decode($respond);
                $respond->card_id = $card->id;
                $respond->child_id = $card->child_id;
                $respond->card_points = $card->points;
                $respond->card_enable = $card->enable;
                $respond->card_house_id = $card->house_id;
                $respond->sponsor_id = $card->sponsor_id;
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
    public function by_house($id = null)
    {
        if ($id == null) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 405);
        }

        $homegiftcard = HomeGiftCard::select('homegiftcards.id', 'homegiftcards.card_id', 'homegiftcards.child_id', 'homegiftcards.house_id', 'homegiftcards.points', 'homegiftcards.enable', 'user.f_name', 'user.l_name', 'user.profile_image', 'homegiftcards.sponsor_id')
            ->join('user', 'user.id', '=', 'homegiftcards.child_id')
            ->where('homegiftcards.house_id', $id)
            ->where('homegiftcards.enable', 1)
            ->where('user.enable', 1)
            ->where('bundle_id', null)
            ->get();

        $cards = array();
        foreach ($homegiftcard as $card) {

            $sponsor_name='';
            $sponsor_id = '';
            if (isset($card->sponsor_id)) {
                $sponsor = User::select('user.f_name', 'user.l_name')->where('id', $card->sponsor_id)->first();
                $sponsor_id = $card->sponsor_id;
                $sponsor_name = $sponsor->f_name . ' ' . $sponsor->l_name;
            }

            $respond = $this->card_by_id($card->card_id);
            if ($respond) {
                $respond = json_decode($respond);
                $respond->card_id = $card->id;
                $respond->child_id = $card->child_id;
                $respond->child_f_name = $card->f_name;
                $respond->child_l_name = $card->l_name;
                $respond->child_profile_image = $card->profile_image;
                $respond->card_points = $card->points;
                $respond->card_enable = $card->enable;
                $respond->card_house_id = $card->house_id;
                $respond->sponsor_name = $sponsor_name;
                $respond->sponsor_id = $sponsor_id;
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
     * Store a newly created resource in storage.
     * @return Response
     */
    public function store(Request $request)
    {
        $request = $request->all();
        if (!$request['card_id'] or !$request['child_id'] or !$request['house_id'] or !$request['points']) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'please provide all required fields'
            ], 422);
        }
        $childs = json_decode($request['child_id']);
        foreach ($childs as $child) {
            $request['child_id'] = $child;
            $request['enable'] = 1; // 1:enable, 0:disable

            // find house id by child id
            $childHouse = ChildHouse::select('house_id')->where('child_id', $child)->first();
            $request['house_id'] = $childHouse->house_id;
            $gift_card = HomeGiftCard::create($request);
        }

        return Response::json([
            'query_status' => 'success',
            'message' => 'card added to house successfully'
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     * @param  int $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        $gift_card = HomeGiftCard::find($id);
        if (empty($gift_card))
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);

        $request = $request->all();
        if (!$request['card_id'] or !$request['child_id'] or !$request['house_id'] or !$request['points'])
            return Response::json([
                'query_status' => 'error',
                'message' => 'please provide all required fields'
            ], 422);

        $gift_card->update($request);
        return Response::json([
            'query_status' => 'success',
            'message' => 'record updated successfully' // ,
            // 'data' => $gift_card
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        if ($this->is_admin()) {
            HomeGiftCard::destroy($id);
            return Response::json([
                'query_status' => 'success',
                'message' => 'record successfully deleted!'
            ], 200);
        }

        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }


    public function getGiftCardByHouse($id = null)
    {
        if ($id == null) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 405);
        }

        $homegiftcard = HomeGiftCard::select('homegiftcards.id', 'homegiftcards.card_id', 'homegiftcards.child_id', 'homegiftcards.house_id', 'homegiftcards.points', 'homegiftcards.enable', 'user.f_name', 'user.l_name', 'user.profile_image')
            ->join('user', 'user.id', '=', 'homegiftcards.child_id')
            ->where('homegiftcards.house_id', $id)
            ->where('homegiftcards.enable', 1)
            ->where('user.enable', 1)
            ->get();

        if (empty($homegiftcard)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $homegiftcard
        ], 200);
    }

}
