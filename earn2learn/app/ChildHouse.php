<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChildHouse extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'childhouses';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['house_id', 'child_id', 'enable'];

}
