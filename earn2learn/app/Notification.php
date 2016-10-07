<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Notification Model
 * Saves notification which are sent
 */

class Notification extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'notification';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id','message', 'type', 'link', 'seen'];
}
