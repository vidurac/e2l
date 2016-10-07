<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTaskattemptsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('taskattempts', function(Blueprint $table) {
                $table->increments('id');
                $table->integer('task_id');
                $table->integer('child_id');
                $table->integer('house_id');
                $table->integer('allocation_id');
                $table->integer('status')->comment = "0: started, 1: skipped, 2: finished";
                $table->boolean('is_approved')->comment = "1:satisfied, 0:not unsatisfied";
                $table->boolean('enable')->comment = "1:enable, 0:disable";

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
        Schema::drop('taskattempts');
    }

}
