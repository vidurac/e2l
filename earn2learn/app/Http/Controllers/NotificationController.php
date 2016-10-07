<?php

namespace App\Http\Controllers;

use App\Notification;
use Illuminate\Http\Request;

use Auth;
use Carbon\Carbon;
use Response;
use Session;

class NotificationController extends Controller
{

    public function __construct(){
//        $this->middleware('jwt.auth');
    }

    /**
     * get all unread notification for particular user
     *
     * @param $userId
     * @return mixed
     */
    public function getUnreadNotifications($userId) {

        // Get top 10 latest notifications
//        $notifications = Notification::latest()->where('user_id', $userId)->where('seen', 0)->limit(10)->get();
        $notifications = Notification::latest()->where('user_id', $userId)->limit(10)->get();

        if(isset($notifications) && !$notifications->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ]);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $notifications
        ], 200);
    }

    public function updateAsRead(Request $request) {


        if( !$request['user_id'])
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }


        Notification::whereIn('user_id',[$request['user_id']])->update(['seen' => 1]);

        return Response::json([
            'query_status' => 'success',
            'message' => 'Record Updated Successfully',
            'data' => []
        ], 200);
    }

    /**
     * Returns unseen messages count for a particular user
     * @param $userId
     * @return
     * @internal param $id
     */
    public function getUnreadNotificationCount($userId) {

        $count = Notification::latest()->where('user_id', $userId)
            ->where('seen','=','0')
            ->count();

        return Response::json([
            'query_status' => 'success',
            'data' => ['count' => $count]
        ], 200);
    }
}
