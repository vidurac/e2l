<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Badgecompleted extends Model
{
    protected $table='badges_completed';

    protected $fillable = ['badge_name','badge_id','user_id','badge_image'];

    public function badge()
    {
        return $this->belongsTo('App\Badge');
    }

}
