<?php

namespace App\Http\Controllers;

use App\Badge;
use App\User;
use App\Http\Requests;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Response;
use Session;

class BadgeAssignController extends Controller
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
    public function store(Request $request)
    {

        $request = $request->all();
        if (!$request['childId'] or
            !$request['badgeId']
        ) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        } else {
            $user = User::find($request['childId']);
            $badge = Badge::find($request['badgeId']);
            $returnData = $user->badges()->save($badge);

            return Response::json([
                'query_status' => 'success',
                'message' => 'Record Updated Successfully',
                'data' => $returnData
            ], 200);
        }

    }

    /**
     *
     * remove assign badges from child
     *
     * @param $id
     * @param Request $request
     * @return mixed
     *
     */
    public function update($id, Request $request)
    {
        $request = $request->all();
        \Log::info($request);
        $badges = Badge::find($id)->users()->wherePivot('user_id',$request['childId'])->detach();

        if (empty($badgeUser)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        if (!$request['badgeId']
        ) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }
        return Response::json([
            'query_status' => 'success',
            'message' => 'Record Updated Successfully',
            'data' => $badges
        ], 200);

    }


    /**
     *
     * get children by badge id
     *
     * @param $badge_id
     * @return mixed
     */

    public function getChildrenByBadgeId($badge_id)
    {

        $badge = Badge::find($badge_id);
        $children = $badge->users;

        if (!$children->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $children
        ], 200);
    }


    /**
     *
     * get assign badges by child id
     *
     * @param $childId
     * @return mixed
     */
    public function getChildAssignBadges($childId)
    {

        $user = User::find($childId);
        $badges = $user->badges;

        if (!$badges->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $badges
        ], 200);
    }

}
