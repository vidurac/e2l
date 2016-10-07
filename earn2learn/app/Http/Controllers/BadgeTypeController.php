<?php

namespace App\Http\Controllers;

use App\BadgeType;
use App\Http\Requests;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Response;
use Session;

class BadgeTypeController extends Controller
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
    public function index($id=NULL)
    {
        return Response::json([
            'error' => 'access_denied',
            'message' => 'unauthorized access blocked'
        ], 401);
    }

    /**
     * @return mixed
     */
    public function getAllBadgeType()
    {
        $badgeType = BadgeType::latest()
            ->select('badge_types.*')
            ->get();

        if (!$badgeType->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $badgeType
        ], 200);
    }

}
