<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lessonsratings extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'lessons_ratings';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['parent_id', 'video_id', 'rating_value'];

}
