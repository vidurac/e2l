<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'certificates';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['certificate_id', 'child_id', 'house_id', 'category_id', 'issue_date', 'enable'];

}
