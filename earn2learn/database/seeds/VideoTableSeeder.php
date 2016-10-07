<?php

use Illuminate\Database\Seeder;
use App\Video;
class VideoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        Video::create ([
                'title'         => 'Our Story in 1 Minute',
                'description'   => 'Our Story in 1 Minute',
                'url'           => 'https://www.youtube.com/watch?v=ZSt9tm3RoUU',
                'video_id'      => 'ZSt9tm3RoUU',
                'i_frame'       => '<iframe width="854" height="480" src="https://www.youtube.com/embed/ZSt9tm3RoUU" frameborder="0" allowfullscreen></iframe>',
                'video_ref'     => 'youtube',
                'category_id'   => 1,
                'user_id'       => 1,
                'enable'        => 1,
            ]);
            
        Video::create ([
                'title'         => 'How new technology helps blind people explore the world',
                'description'   => 'How new technology helps blind people explore the world',
                'url'           => 'http://www.ted.com/talks/chieko_asakawa_how_new_technology_helps_blind_people_explore_the_world',
                'video_id'      => 'chieko_asakawa_how_new_technology_helps_blind_people_explore_the_world',
                'i_frame'       => '<iframe src="https://embed-ssl.ted.com/talks/chieko_asakawa_how_new_technology_helps_blind_people_explore_the_world.html" width="640" height="360" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>',
                'video_ref'     => 'ted',
                'category_id'   => 1,
                'user_id'       => 1,
                'enable'        => 1,
            ]);
    }
}
