<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InboxMessage extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'inbox_message';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['subject','message','status','user_id','receiver_id','type'];


    /**
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function senders(){

        return $this->belongsTo('App\User','foreign_key', 'user_id');
    }


    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function receivers(){

        return $this->belongsTo('App\User','foreign_key', 'receiver_id');
    }

}
