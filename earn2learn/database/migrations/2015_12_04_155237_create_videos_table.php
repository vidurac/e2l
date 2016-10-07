<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('videos', function(Blueprint $table) {
                $table->increments('id');
                $table->string('title');
                $table->string('description');
                $table->string('url');
                $table->string('video_id');
                $table->string('i_frame');
                $table->string('video_ref');
                $table->integer('category_id');
                $table->integer('user_id');
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
        Schema::drop('videos');
    }

}
