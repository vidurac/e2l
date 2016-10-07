<?php

use Illuminate\Database\Seeder;
use App\User;
class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        User::create ([
                'f_name'        => 'Pradeep',
                'l_name'        => 'Rajapaksha',
                'email'         => 'pradeepr92@hotmail.com',
                'username'      => 'pradeep',
                'password'      => bcrypt('abc@123'),
                'telephone'     => '0112569845',
                'mobile'        => '0712929212',
                'address'       => 'Highlevel Rd, Colombo 06',
                'city'          => 'Colombo',
                'country'       => 'Srilanka',
                'date_of_birth' => '',
                'gender'        => 'Male',
                'profession'    => 'Software Developer',
                'profile_image' => '',
                'role_id'          => 1,
                'enable'        => 1,
            ]);
        User::create ([
                'f_name'        => 'Ishantha',
                'l_name'        => 'Lakmal',
                'email'         => 'pgishantha.fit@gmail.com',
                'username'      => 'ishantha',
                'password'      => bcrypt('abc@123'),
                'telephone'     => '0112654987',
                'mobile'        => '0715515577',
                'address'       => 'Galle Rd, Galle',
                'city'          => 'Galle',
                'country'       => 'Srilanka',
                'date_of_birth' => '',
                'gender'        => 'Male',
                'profession'    => 'Software Developer',
                'profile_image' => '',
                'role_id'          => 1,
                'enable'        => 1,
            ]);
    }
}
