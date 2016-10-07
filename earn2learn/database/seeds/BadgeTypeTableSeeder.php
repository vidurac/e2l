<?php

use Illuminate\Database\Seeder;
use App\BadgeType;

class BadgeTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BadgeType::create([
            'name' => 'System Badges'
        ]);

        BadgeType::create([
            'name' => 'Custom Badges'
        ]);
    }
}
