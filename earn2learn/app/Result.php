<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'results';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['attempt_id', 'question_id', 'answer_id', 'is_correct', 'enable'];

}
