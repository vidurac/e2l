<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChildGiftCard extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'childgiftcards';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['housecard_id', 'house_id', 'child_id', 'is_approved', 'enable', 'sponsor_id', 'parent_approved', 'requested_type', 'bundle_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function bundle()
    {
        return $this->belongsTo('App\Bundle');
    }

    public function house_gift_card()
    {
        return $this->belongsTo('App\HomeGiftCard', 'housecard_id');
    }
}
