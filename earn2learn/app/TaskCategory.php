<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskCategory extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'taskcategories';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['category', 'user_id', 'enable'];

}
