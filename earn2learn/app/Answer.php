<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'answers';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['answer', 'question_id', 'is_correct', 'enable'];

}
