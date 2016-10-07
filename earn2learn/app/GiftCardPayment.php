<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GiftCardPayment extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'purchased_giftcard';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id','giftcard_id','giftcard_name',
        'brand_id','brand_name','giftcard_number',
        'giftcard_unique_id','purchased_id','giftcard_url',
        'giftcard_status','giftcard_number','pin' ,'purchased_date',
        'payment_status','amount','ipg_transaction_id','credit_card_four_digits',
        'deliver_email','deliver_fname','deliver_lname',
    ];


}
