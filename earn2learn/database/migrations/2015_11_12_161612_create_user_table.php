<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('user', function(Blueprint $table) 
            {
                $table->increments('id'); 
                $table->string('f_name'); 
                $table->string('l_name');
                $table->string('email')->index()->unique();
                $table->string('telephone');
                $table->integer('mobile')->nullable();
                $table->text('address');
                $table->string('city');
                $table->string('state');
                $table->string('country');
                $table->dateTime('date_of_birth');
                $table->string('gender');
                $table->string('profession');
                $table->string('profile_image')->default('uploads/profile/default.jpg');
                
                // $table->integer('role_id')->unsigned();
                $table->integer('role_id')
                      ->unsigned()
                      ->index()
                      ->references('id')
                      ->on('userrole')
                      ->onDelete('cascade');
                
                $table->string('username')->unique();
                $table->string('password');
                $table->string('verify_token');
                
                $table->string('fb_password')->nullable();
                $table->boolean('_fb')->default(0);
                
                // $table->string('stripe_id')->nullable();
                // $table->string('card_brand')->nullable();
                // $table->string('card_last_four')->nullable()
                
                $table->boolean('enable')->default(0);
                
                $table->timestamps();
                
            });
            
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user');
    }
}

