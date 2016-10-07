<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateHouseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('house', function(Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->string('description');
                $table->integer('user_id');
                $table->string('image')->default('default-house.jpg');
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
        Schema::drop('house');
    }
}
