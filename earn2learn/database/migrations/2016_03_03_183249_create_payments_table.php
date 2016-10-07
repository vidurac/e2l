<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('payments', function(Blueprint $table) 
        {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('amount')->comment="by cents";
            $table->string('currency')->default('usd');
            $table->string('charge_id')->unique()->comment="stripe charge id";
            $table->string('refund_id')->unique()->comment="stripe refund id";
            $table->mediumtext('source')->comment="stripe payment source summary";
            $table->string('type')->comment="gift card payment / monthly payment";
            $table->string('status')->comment="payment status: succeeded, pending, or failed";
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
        Schema::drop('payments');
    }

}
