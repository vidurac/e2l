<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateChildquizallocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('childquizallocations', function(Blueprint $table) {
                $table->increments('id');
                $table->integer('child_id');
                $table->integer('quiz_id');
                $table->integer('value')->comment = "#of points";
                $table->integer('score')->comment = "pass rate";
                $table->integer('status')->default(0)->comment = "0: not started, 1: started, 2: skipped, 3: finished";
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
        Schema::drop('childquizallocations');
    }

}
