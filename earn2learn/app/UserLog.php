<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserLog extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'userlogs';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'start', 'end', 'token'];

}
