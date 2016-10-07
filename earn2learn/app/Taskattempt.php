<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Taskattempt extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'taskattempts';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['task_id', 'child_id', 'house_id', 'allocation_id', 'finished_at', 'status', 'is_approved','is_satisfy', 'enable'];

}
