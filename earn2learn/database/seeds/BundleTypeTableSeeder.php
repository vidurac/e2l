<?php

use Illuminate\Database\Seeder;
use App\BundleType;

class BundleTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BundleType::create([
            'name' => 'System Badges'
        ]);

        BundleType::create([
            'name' => 'Custom Badges'
        ]);
    }
}
