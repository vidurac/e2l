<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMailsubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('mailsubscriptions', function(Blueprint $table) {
                $table->increments('id');
                $table->integer('user_id');
                $table->boolean('payment')->default(1);
                $table->boolean('giftcard')->default(1);
                $table->boolean('lesson')->default(1);
                $table->boolean('task')->default(1);
                $table->boolean('newsletter')->default(1);
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
        Schema::drop('mailsubscriptions');
    }

}
