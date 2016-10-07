<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class BadgesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('badges', function(Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->string('description');
                $table->integer('badge_types_id');
                $table->integer('category_id');
                $table->integer('user_id');
                $table->integer('points');
                $table->string('badge_image');
                $table->boolean('enable');
                
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
        Schema::drop('badges');
    }

}
