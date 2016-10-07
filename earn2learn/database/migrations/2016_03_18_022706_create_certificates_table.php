<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCertificatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::create('certificates', function(Blueprint $table) {
                $table->increments('id');
                $table->string('certificate_id');
                $table->integer('child_id');
                $table->integer('house_id');
                $table->integer('category_id');
                $table->datetime('issue_date');
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
        Schema::drop('certificates');
    }

}
