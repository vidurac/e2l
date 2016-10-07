<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'videos';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'description', 'url', 'video_id', 'i_frame', 'video_ref', 'category_id', 'user_id', 'enable','min_age','max_age','visibility'];


    /**
     * Many to Many relationship with Bundle
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function bundles()
    {
        return $this->belongsToMany('App\Bundle', 'lesson_bundle');
    }

    /**
     * badge lessons
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function badges()
    {
        return $this->belongsToMany('App\Badge', 'badge_lessons');
    }

    /**
     * flags
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function video_flags()
    {
        return $this->belongsToMany('App\User', 'video_flags')
            ->withPivot('message')
            ->withTimestamps();
    }

}
