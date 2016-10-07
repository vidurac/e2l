<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('questions', function(Blueprint $table) {
            $table->increments('id');
            $table->string('question');
            $table->integer('video_id');
            $table->string('question_type');
            $table->string('control_type');
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
        Schema::drop('questions');
    }
}
