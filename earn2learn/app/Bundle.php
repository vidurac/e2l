<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bundle extends Model
{

    /**
     * @var string
     */
    protected $table = 'bundle';

    /**
     * @var array
     */
    protected $fillable = ['name', 'points', 'average_marks', 'homegiftcards_id', 'dollar_amount', 'bundle_types_id', 'user_id','gift_card_id','amount','gift_card_image','enable'];


    /**
     * Many to Many relationship with User (Child)
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {

        return $this->belongsToMany('App\User', 'bundle_assignees')->withPivot('sponsor_id', 'status');
    }

    /**
     * Many to Many relationship with Video(Lesson)
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function videos()
    {
        return $this->belongsToMany('App\Video', 'lesson_bundle');
    }

    /**
     * Many to Many relationship with Quiz(Lesson)
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function quizzes()
    {
        return $this->belongsToMany('App\Quiz', 'bundle_quizzes');
    }

    /**
     * Many to Many relationship with ChildQuizAllocation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function child_quiz_allocations()
    {
        return $this->belongsToMany('App\Childquizallocation', 'bundle_childquizallocations');
    }

}
