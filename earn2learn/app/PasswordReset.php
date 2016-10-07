<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'password_resets';

    // public $timestamps = false;
    
    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['email', 'token', 'enable', 'expiry'];
}
