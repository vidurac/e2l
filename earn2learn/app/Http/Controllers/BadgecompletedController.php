<?php

namespace App\Http\Controllers;

use App\Badge;
use App\ChildHouse;
use App\Events\NotifyParent;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Badgecompleted;
use Response;
use Auth;
use Input;
use Log;

class BadgecompletedController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    public function index()
    {

    }
    
    public function add_a_badge(Request $request)
    {
        $current_user=Auth::user();
        $current_user_id=$current_user->id;

        $badgeobj=new Badgecompleted();
        $badgeobj->badge_name = $request->input('badgeName');
        $badgeobj->badge_id = $request->input('badgeId');
        $badgeobj->user_id = $current_user_id;
        $badgeobj->badge_image = $request->input('badgeImage');
        $badgeobj->save();

        $child = User::select('user.f_name', 'user.l_name')->where('id', $current_user_id)->first();
        Log::info('==== user ' . $child->f_name);
        $badge = Badge::find($request->input('badgeId'));
        $parentId = ChildHouse::select('user.id')
            ->join('house', 'house.id', '=', 'childhouses.house_id')
            ->join('user', 'user.id', '=', 'house.user_id')
            ->where('childhouses.child_id', $current_user_id)
            ->first()->id;

        //send a notification to parent
        if (isset($badge)) {

            // notify data
            $notifyData = [
                'message' => trans('messages.notify_badge_achieved_to_parent', [
                    'first_name'  => $child->f_name,
                    'last_name'  => $child->l_name,
                    'name' => $badge->name
                ]),
                'type' => 'badge',
                'link' => '#/parent/badges',
                'user_id' => $parentId
            ];

            // Fire notify event
            event(new NotifyParent($notifyData));

        }

        return Response::json([
            'query_status' => 'success'
        ],200);
    }

    public function get_past_badges()
    {
        $current_user=Auth::user();
        $current_user_id=$current_user->id;

        $data = Badgecompleted::select('*')
            ->join('badges', 'badges.id', '=', 'badges_completed.badge_id')
            ->where('badges_completed.user_id', '=', $current_user_id)
            ->orderBy('badges_completed.id', 'desc')
            ->take(6)
            ->get();

        return Response::json([
            'query_status' => 'success',
            'data' =>$data
        ],200);
    }

}
