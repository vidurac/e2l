<?php

namespace App\Events;

use App\Events\Event;
use App\Notification;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Log;

class NotifyParent extends Event implements ShouldBroadcast
{
    use SerializesModels;
    public $message;
    protected $userId;
    public $type;
    public $link;
    public $seen;
    public $id;
    public $createdAt;

    /**
     * Create a new event instance.
     *
     * @param $data
     */
    public function __construct($data)
    {
        $this->message = $data['message'];
        $this->userId = $data['user_id'];

        Log::info('message: ' . $this->message);
        Log::info('userId: ' . $this->userId);

        $this->saveNotification($data);
    }

    /**
     * Persist notification data
     * @param $data
     */
    private function saveNotification($data) {

        $notificationBody = [
            'message' => $data['message'],
            'type' => isset($data['type'])? $data['type'] : '',
            'link' => isset($data['link'])? $data['link'] : '',
            'user_id' => $data['user_id'],
            'seen' => false
        ];

        $notification = Notification::create($notificationBody);
        $this->message = $notification->message;
        $this->type = $notification->type;
        $this->link = $notification->link;
        $this->seen = $notification->seen;
        $this->id = $notification->id;
        $this->createdAt = $notification->created_at;

        Log::info('==== notification : ' . print_r($notification->toArray(), true));
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['user-channel-' . $this->userId];
    }
}
