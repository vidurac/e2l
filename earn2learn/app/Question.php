<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'questions';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['question', 'video_id', 'question_type', 'control_type', 'enable'];

}
