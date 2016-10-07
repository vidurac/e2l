<?php

namespace App\Http\Controllers;

use App\GiftCardPayment;
use App\Http\Requests;
use Auth;
use Illuminate\Http\Request;
use Response;
use Session;



class GiftCardPaymentController extends Controller
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
    public function index($id = NULL)
    {
        return Response::json([
            'error' => 'access_denied',
            'message' => 'unauthorized access blocked'
        ], 401);
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function savePayment($request)
    {
        $giftCardPayment = GiftCardPayment::create($request);

        return $giftCardPayment;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function updatePayment($id, $request)
    {
        $giftCardPayment = GiftCardPayment::find($id);
        if (empty($giftCardPayment)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $giftCardPayment->update($request);

        return Response::json([
            'query_status' => 'success',
            'message' => 'Record Updated Successfully',
            'data' => $giftCardPayment
        ], 200);

    }

    
}
