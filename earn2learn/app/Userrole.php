<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class Userrole extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'userrole';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['role_name', 'enable'];

    /**
    * A user role may have many users
    *
    * @return \Illuminate\Datebase\Eloquent\Relations\HasMany
    */
    public function users()
    {
        return $this->hasMany('App\User');
    }

}
