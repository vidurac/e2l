<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Taskallocation extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'taskallocations';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['child_id', 'task_id', 'house_id', 'start_date', 'due_date', 'parent_accept', 'duration', 'occurrence', 'attempts', 'value', 'status', 'enable'];

}
