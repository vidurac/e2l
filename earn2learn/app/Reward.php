<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'rewards';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['attempt_id', 'child_id', 'value', 'type', 'enable'];

}
