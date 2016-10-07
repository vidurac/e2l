<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HomeGiftCard extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'homegiftcards';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['card_id', 'child_id', 'house_id', 'points', 'enable', 'sponsor_id', 'bundle_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function bundle()
    {
        return $this->belongsTo('App\Bundle');
    }

}
