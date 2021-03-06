<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(UserTableSeeder::class);
        $this->call(UserroleTableSeeder::class);
        $this->call(CategoryTableSeeder::class);
        $this->call(VideoTableSeeder::class);
        $this->call(HouseTableSeeder::class);

        Model::reguard();
    }
}
