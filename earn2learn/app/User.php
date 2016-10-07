<?php
namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

use Laravel\Cashier\Billable;
use Laravel\Cashier\Contracts\Billable as BillableContract;

class User extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract, BillableContract
{
    use Authenticatable, Authorizable, CanResetPassword, Billable;
    
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'user';
    
    // protected $dates = ['trial_ends_at', 'subscription_ends_at'];
    protected $dates = ['trial_ends_at', 'subscription_ends_at'];
    
    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['f_name', 'l_name', 'email', 'password', 'username', 'telephone', 'mobile', 'address', 'city', 'country', 'state', 'date_of_birth', 'gender', 'profession', 'profile_image', 'role_id', 'trial_ends_at', 'enable', 'show_guide', '_fb' ,'payment_status'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'verify_token', 'fb_password'];

    /**
    * A user is beloangs to a userrole
    *
    * @return \Illuminate\Datebase\Eloquent\Relations\BelongsTo
    */
    public function userrole()
    {
        return $this->belongsTo('App\Userrole');
    }


    /**
     * Get badges associated with the given user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function badges(){
        return $this->belongsToMany('App\Badge' ,'badge_assignee')->withPivot('status');
    }


    public function completedBadges(){
        return $this->belongsToMany('App\Badge' ,'badges_completed');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function bundles(){

        return $this->belongsToMany('App\Bundle','bundle_assignees')
            ->withPivot('sponsor_id', 'status')
            ->withTimestamps();
//        return $this->hasMany('App\Bundle', 'child_id', 'id');
    }

    public function messages(){

        return $this->hasMany('App\InboxMessage','inbox_message');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function childquizallocations()
    {
        return $this->hasMany('App\Childquizallocation');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function mail_subscription(){
        return $this->hasOne('App\MailSubscription');
    }
}
