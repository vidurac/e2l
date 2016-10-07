<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateChildgiftcardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('childgiftcards', function(Blueprint $table) {
                $table->increments('id'); 
                $table->string('giftcard'); 
                $table->integer('housecard_id')->default(0); 
                $table->integer('house_id'); 
                $table->integer('child_id'); 
                $table->boolean('is_approved')->default(0)->comment = '0: pending, 1: approved, 2: rejected';
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
        Schema::drop('childgiftcards');
    }

}
