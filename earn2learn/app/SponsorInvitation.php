<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SponsorInvitation extends Model
{
    // Table name
    protected $table='sponsor_invitations';

    // Mass assign fields
    protected $fillable = ['f_name','l_name', 'email', 'token', 'house_id', 'enable'];


}
