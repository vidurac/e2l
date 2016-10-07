<?php

use Illuminate\Database\Seeder;
use App\Category;
class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
            
        Category::create ([
                'name'        => 'Physics',
                'category_id' => 0,
                'user_id'     => 1,
                'enable'      => 1,
            ]);
        Category::create ([
                'name'        => 'Chemistry',
                'category_id' => 0,
                'user_id'     => 1,
                'enable'      => 1,
            ]);
        Category::create ([
                'name'        => 'Maths',
                'category_id' => 0,
                'user_id'     => 2,
                'enable'      => 1,
            ]);
        Category::create ([
                'name'        => 'Vector',
                'category_id' => 3,
                'user_id'     => 2,
                'enable'      => 1,
            ]);
        Category::create ([
                'name'        => 'Pure Maths',
                'category_id' => 3,
                'user_id'     => 1,
                'enable'      => 1,
            ]);
    }
}
