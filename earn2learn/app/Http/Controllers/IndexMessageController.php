<?php

namespace App\Http\Controllers;

use App\ChildHouse;
use App\Events\NotifyChild;
use App\Events\NotifyParent;
use App\InboxMessage;
use App\User;
use App\Http\Requests;
use Auth;
use Illuminate\Http\Request;
use Response;
use Session;
use Guzzle\Common\Collection;


class IndexMessageController extends Controller
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
     * @return mixed
     */
    public function getAllUnreadMessage()
    {
        $inboxMessage = InboxMessage::latest()
            ->select('inbox_message.*')
            ->where('inbox_message.status', '=', 0)
            ->get();

        if (!$inboxMessage->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $inboxMessage
        ], 200);
    }

    /**
     * get all read messages
     *
     * @return mixed
     *
     */
    public function getAllReadMessage()
    {
        $inboxMessage = InboxMessage::latest()
            ->select('inbox_message.*')
            ->where('inbox_message.status', '=', 1)
            ->get();

        if (!$inboxMessage->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $inboxMessage
        ], 200);
    }

    /**
     *
     * get all unread messages
     *
     * @return mixed
     */

    public function getMessageById($id = null)
    {
        $inboxMessage = InboxMessage::latest()
            ->select('inbox_message.*')
            ->where('inbox_message.id', '=', $id)
            ->get();

        if (!$inboxMessage->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $inboxMessage
        ], 200);
    }


    /**
     *
     * @param $child_id
     * @return mixed
     *
     */
    public function getAllReceivedMessageByChild($child_id)
    {
        $inboxMessage = InboxMessage::latest()
            ->select('inbox_message.*')
            ->where('inbox_message.user_id', '=', $child_id)
            ->get();

        if (!$inboxMessage->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $inboxMessage
        ], 200);
    }


    public function getAllSentMessageByChild($child_id)
    {
        $inboxMessage = InboxMessage::latest()
            ->select('inbox_message.*')
            ->where('inbox_message.receiver_id', '=', $child_id)
            ->where('inbox_message.user_id', '=', Auth::user()->id)
            ->get();

        $inboxMessage->reverse();

        if (!$inboxMessage->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $inboxMessage
        ], 200);
    }


    //get all child receiver message
    public function getReceivedMessage($receiver_id)
    {
        $inboxMessage = InboxMessage::
            select('inbox_message.*','user.f_name')
            ->where('inbox_message.receiver_id', '=', $receiver_id)
            ->join('user', 'user.id', '=', 'inbox_message.user_id')
            ->orderBy('inbox_message.created_at' ,'DESC')
            ->get();

        $inboxMessage->reverse();

        if (!$inboxMessage->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $inboxMessage
        ], 200);
    }

    // get child sent messages
    public function getSentMessage($send_id)
    {
        $inboxMessage = InboxMessage::
            select('inbox_message.*','user.f_name')
            ->where('inbox_message.user_id', '=', $send_id)
            ->join('user', 'user.id', '=', 'inbox_message.user_id')
            ->orderBy('created_at' ,'DESC')
            ->get();

        $inboxMessage->reverse();

        if (!$inboxMessage->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $inboxMessage
        ], 200);
    }



    public function getAllReceivedMessage()
    {
        $inboxMessage = InboxMessage::latest()
            ->select('inbox_message.*')
            ->where('inbox_message.receiver_id', '=', Auth::user()->id)
            ->get();

        if (!$inboxMessage->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $inboxMessage
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $request = $request->all();
        if (
            !$request['message']
        ) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }

        $request['user_id'] = Auth::user()->id;
        $request['status'] = 0;

        $inboxMessage = InboxMessage::create($request);

        if($this->is_child()){

            $child = User::select('user.f_name', 'user.l_name')->where('id', $request['user_id'])->first();

            // todo following $userData query can be removed if we know the parent id
            $userData = ChildHouse::select('user.*')
                ->join('house', 'house.id', '=', 'childhouses.house_id')
                ->join('user', 'user.id', '=', 'house.user_id')
                ->where('childhouses.child_id', $request['user_id'])
                ->first();

            // notify data
            $notifyData = [
                'message' => trans('messages.notify_new_message_to_parent', [
                    'first_name' => $child->f_name,
                    'last_name' => $child->l_name,
                ]),
                'type' => 'message',
                'link' => '',
                'user_id' => $userData->id
            ];

            // Fire notify event
            event(new NotifyParent($notifyData));
        }else if ($this->is_parent()) {

            $notifyData = [
                'message' => trans('messages.notify_new_message_to_child'),
                'type' => 'message',
                'link' => '#/child/messages',
                'user_id' => $request['receiver_id']
            ];

            // Fire notify event
            event(new NotifyChild($notifyData));

        }

        if (empty($inboxMessage)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'message' => ' Message Successfully Created ',
            'data' => $inboxMessage
        ], 201);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        $inboxMessage = InboxMessage::find($id);
        if (empty($inboxMessage)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $request = $request->all();
        $request['status'] = 1;
        $updates=$inboxMessage->update($request);

        if($updates){
            return Response::json([
                'query_status' => 'success',
                'message' => 'Recordss Updated Successfully',
                'data' => $inboxMessage
            ], 200);
        }



    }

    /**
     * @param $id
     * @param Request $request
     * @return mixed
     */
    public function updateMessageStatus($chils_id,Request $request)
    {
        $request = $request->all();

        $inboxMessage = null;
        if($request['type'] == 0){
            $inboxMessage = InboxMessage::
                where('inbox_message.receiver_id', '=', $chils_id)
                ->update(['status' => 1]);
        }

        if($request['type'] == 1){
            $inboxMessage = InboxMessage::where('inbox_message.user_id', '=', $chils_id)
                ->update(['status' => 1]);
        }

        if (empty($inboxMessage)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'message' => 'Record Updated Successfully',
            'data' => $inboxMessage
        ], 200);

    }/**
     * @param $user
     * @param Request $request
     * @return mixed
     */
    public function updateMessageVisibility($user,Request $request)
    {
        $request = $request->all();

        $inboxMessage = null;
        if(empty($request['child'])){
            $inboxMessage = InboxMessage::
            where('inbox_message.receiver_id', '=', $user)
                ->update(['status' => 1]);



            if (empty($inboxMessage)) {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
            }

            return Response::json([
                'query_status' => 'success',
                'message' => 'Record Updated Successfully',
                'data' => $inboxMessage
            ], 200);

        }else{

            $inboxMessage = InboxMessage::
            where('inbox_message.receiver_id', '=', $user)
                ->update(['status' => 1]);

            if (empty($inboxMessage)) {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
            }

            return Response::json([
                'query_status' => 'success',
                'message' => 'Record Updated Successfully',
                'data' => $inboxMessage
            ], 200);
        }


    }

    public function destroy($id)
    {
        InboxMessage::destroy($id);
            return Response::json([
                'query_status' => 'success',
                'message' => 'record successfully deleted!'
            ], 200);

        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }

    /**
     * Returns unseen messages count for a particular user
     * @param $id
     */
    public function getUnseenMessagesCount($id) {

        $count = InboxMessage::where('receiver_id', $id)
            ->where('status','=','0')
            ->count();

        return Response::json([
            'query_status' => 'success',
            'message' => 'Record Updated Successfully',
            'data' => ['count' => $count]
        ], 200);
    }


    /**
     * @param $id
     * @return mixed
     */
    public function getUnseenMessagesCountByChild($id) {

        $count = InboxMessage::where('user_id', $id)
            ->where('status','=','0')
            ->count();

        return Response::json([
            'query_status' => 'success',
            'message' => 'Record Updated Successfully',
            'data' => ['count' => $count]
        ], 200);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getMessageByChildId($id) {

        $createdMessage = InboxMessage::select('inbox_message.*','user.f_name')
            ->join('user', 'user.id', '=', 'inbox_message.receiver_id')
            ->where('inbox_message.user_id', $id)
            ->get();

        $receivedMessage = InboxMessage::select('inbox_message.*','user.f_name')
            ->join('user', 'user.id', '=', 'inbox_message.user_id')
            ->where('inbox_message.receiver_id',$id)
            ->get();

      $allMessages = $this->sortMesagesByDate($createdMessage , $receivedMessage);

        return Response::json([
            'query_status' => 'success',
            'message' => 'Successfully',
            'data' => $allMessages
        ], 200);
    }


    public function getParentMessageByChildId($id) {

        $createdMessage = InboxMessage::select('inbox_message.*','user.f_name')
            ->join('user', 'user.id', '=', 'inbox_message.user_id')
            ->where('inbox_message.user_id', $id)
            ->get();

        $receivedMessage = InboxMessage::select('inbox_message.*','user.f_name')
            ->join('user', 'user.id', '=', 'inbox_message.receiver_id')
            ->where('inbox_message.receiver_id',$id)
            ->get();

      $allMessages = $this->sortMesagesByDate($createdMessage , $receivedMessage);

        return Response::json([
            'query_status' => 'success',
            'message' => 'Successfully',
            'data' => $allMessages
        ], 200);
    }


    protected function sortMesagesByDate($createdMessages , $receivedMessages){
        $returnData =  collect([]);

        if(count($createdMessages) != 0){
            foreach ($createdMessages as $sendMessage){
                $sendMessage->type=0;
                $returnData->push($sendMessage);
            }
        }
        if(count($receivedMessages) != 0) {
            foreach ($receivedMessages as $receiveMessage) {
                $receiveMessage->type = 1;
                $returnData->push($receiveMessage);
            }
        }
        $sorted = $returnData->sortByDesc('created_at');
        return $sorted->reverse();

    }


}
