<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'category';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'parent_cat_id', 'user_id', 'enable'];

}
