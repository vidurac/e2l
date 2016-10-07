<?php

use Illuminate\Database\Seeder;
use App\Badge;

class BadgeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Badge::create([
            'name' => 'Badges 1',
            'description' => 'Badges description',
            'badge_types_id' => 1,
            'user_id' => 22,
            'badge_image' => '',
            'points' => 20,
            'enable' => 1
        ]);

        Badge::create([
            'name' => 'Custom Badges',
            'description' => 'Badges description',
            'badge_types_id' => 1,
            'user_id' => 22,
            'badge_image' => '',
            'points' => 20,
            'enable' => 1
        ]);
    }
}
