<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Childquizallocation extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'childquizallocations';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['child_id', 'quiz_id', 'status', 'enable', 'pass_percentage',
        'max_number_of_attempts', 'custom_message', 'notify', 'sponsor_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function quiz()
    {
        return $this->belongsTo('App\Quiz');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function child() {
        return $this->belongsTo('App\User', 'child_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function sponsor() {
        return $this->belongsTo('App\User', 'sponsor_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function attempts()
    {
        return $this->hasMany('App\Attempt', 'allocation_id');
    }
}
