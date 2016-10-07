<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HouseSponsor extends Model
{

    // Table name
    protected $table='house_sponsors';

    // Mass assign fields
    protected $fillable = ['user_id','house_id', 'enable'];

    /**
     * Belongs to user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Belongs to house
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function house()
    {
        return $this->belongsTo('App\House');
    }

}
