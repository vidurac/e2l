<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BundleType extends Model
{

    /**
     * @var string
     */
    protected $table = 'bundle_types';

    /**
     * @var array
     */
    protected $fillable = ['name'];


    /**
     * One to Many relationship with Bundle
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function bundles()
    {
        return $this->hasMany('App\Bundle');
    }


}
