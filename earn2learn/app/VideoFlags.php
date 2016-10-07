<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VideoFlags extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'video_flags';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['video_id', 'user_id', 'message'];
}
