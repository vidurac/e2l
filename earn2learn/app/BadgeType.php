<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BadgeType extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'badge_types';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

}
