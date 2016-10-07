<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MailSubscription extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'mailsubscriptions';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'payment', 'giftcard', 'lesson', 'task', 'newsletter','certificate', 'enable'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(){
        return $this->belongsTo('App\User');
    }
}
