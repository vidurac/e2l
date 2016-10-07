<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRewardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('rewards', function(Blueprint $table) {
                $table->increments('id');
                $table->integer('attempt_id')->nullable();
                $table->integer('child_id');
                $table->integer('value')->comment = "allocated points for the quiz";
                $table->integer('type')->comment = "1: quizzes, 2: tasks, 3: behavior";
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
        Schema::drop('rewards');
    }

}
