<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAttemptsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('attempts', function(Blueprint $table) {
                $table->increments('id');
                $table->integer('house_id');
                $table->integer('quiz_id');
                $table->integer('allocation_id');
                $table->integer('total_qus');
                $table->integer('correct_ans');
                $table->integer('score_percentage');
                $table->integer('status');
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
        Schema::drop('attempts');
    }

}
