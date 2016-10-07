<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('userlogs', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->timestamp('start');
            $table->timestamp('end');
            $table->string('token')->index();
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('userlogs');
    }

}
