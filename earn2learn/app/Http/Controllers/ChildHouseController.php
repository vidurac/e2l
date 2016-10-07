<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Response;
use App\ChildHouse;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Session;

class ChildHouseController extends Controller
{
    
    public function __construct(){
        $this->middleware('jwt.auth');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }

}
