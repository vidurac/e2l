<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateQuizzesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('quizzes', function(Blueprint $table) {
                $table->increments('id');
                $table->string('description');
                $table->integer('house_id');
                $table->integer('video_id');
                $table->integer('value');
                $table->integer('score');
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
        Schema::drop('quizzes');
    }
}
