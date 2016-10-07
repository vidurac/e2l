<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateHomegiftcardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('homegiftcards', function(Blueprint $table) {
                $table->increments('id');
                $table->string('card_id');
                $table->integer('house_id');
                $table->integer('points');
                $table->boolean('enable')->default(1);

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
        Schema::drop('homegiftcards');
    }

}
