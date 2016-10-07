<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'quizzes';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['description', 'value', 'score', 'house_id', 'user_id', 'video_id', 'enable', 'sponsor_id'];

    /**
     * Many to Many relationship with Bundle
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function bundles()
    {
        return $this->belongsToMany('App\Bundle', 'bundle_quizzes');
    }

    /**
     * Quiz belongs to Video
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function video()
    {
        return $this->belongsTo('App\Video');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function child_quiz_allocations()
    {
        return $this->hasMany('App\Childquizallocation');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function sponsor() {
        return $this->belongsTo('App\User');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user() {
        return $this->belongsTo('App\User');
    }

}
