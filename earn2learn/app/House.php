<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class House extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'house';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'image', 'user_id', 'enable'];

}
