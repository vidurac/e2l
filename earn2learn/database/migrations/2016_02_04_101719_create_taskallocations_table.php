<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTaskallocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            
            Schema::create('taskallocations', function(Blueprint $table) {
                $table->increments('id');
                $table->integer('child_id');
                $table->integer('task_id');
                $table->integer('house_id');
                $table->dateTime('start_date');
                $table->dateTime('due_data')->default('0000-00-00 00:00:00'); // ->nullable();
                $table->integer('parent_accept');
                // $table->integer('repeatable');
                $table->integer('occurrence')->comment("1:one time, 2: daily, 3: weekly, 4: monthly, 5: yearly");
                $table->integer('duration');
                $table->integer('attempts');
                $table->string('value');
                $table->integer('status')->comment="0: not started, 1: started, 2: skipped, 3: finished";
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
        Schema::drop('taskallocations');
    }

}
