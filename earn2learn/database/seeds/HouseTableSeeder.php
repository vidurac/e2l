<?php

use Illuminate\Database\Seeder;
use App\House;
class HouseTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        Userrole::create ([
                'name' => 'House Name', 
                'description' => 'House Description', 
                'user_id' => '1', 
                'enable' => '1',
            ]);
    }
}
