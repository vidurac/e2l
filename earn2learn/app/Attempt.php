<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attempt extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'attempts';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['house_id', 'quiz_id', 'child_id', 'allocation_id', 'total_qus', 'correct_ans', 'score_percentage', 'is_passed', 'status', 'enable'];

    public function allocation()
    {
        return $this->belongsTo('App\Childquizallocation', 'allocation_id');
    }
}
