<?php

use Illuminate\Database\Seeder;
use App\Userrole;
class UserroleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Userrole::create ([
                'role_name' => 'Administrator', 
                'enable' => '1',
            ]);
        Userrole::create ([
                'role_name' => 'Educator', 
                'enable' => '1',
            ]);
        Userrole::create ([
                'role_name' => 'Child', 
                'enable' => '1',
            ]);
        
    }
}
