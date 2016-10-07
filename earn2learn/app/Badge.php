<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'badges';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['name','description','category_id','badge_types_id','user_id','badge_image','points','enable'];


    /**
     * Get users associated with the given badge
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users(){

        return $this->belongsToMany('App\User','badge_assignee')->withPivot('status');
    }


    /**
     * children completed badges
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     *
     */
    public function children()
    {
        return $this->belongsToMany('App\User','badges_completed');
    }

    /**
     * Custom delete method
     * with related models
     */
    public function delete()
    {
        // delete all related badge completed items
        $this->badgeCompletedItems()->delete();
        // it's an uglier alternative, but faster
        // Photo::where("user_id", $this->id)->delete()

        // delete the user
        return parent::delete();
    }


    /**
     *
     * badge lessons store in this table
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function lessons(){

        return $this->belongsToMany('App\Video','badge_lessons');
    }
}
