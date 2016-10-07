<?php

namespace App\Http\Controllers;

use App\Attempt;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Response;
use Youtube;
use App\Video;
use App\Childquizallocation;
use App\Quiz;
use App\Category;
use DB;
use Illuminate\Http\Request;
use Carbon\Carbon;

class VideoController extends Controller
{
	public function __construct()
	{
        $this->middleware('jwt.auth', [ 'except' => ['cron_check_videos'] ]);
    }

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//$videos = Video::latest()->where('enable', '=',1)->get();
		$videos = Video::join('user', 'user.id', '=', 'videos.user_id')
					//->leftJoin('video_flags', 'video_flags.video_id', '=', 'videos.video_id')
					->leftJoin('video_flags', function($join)
                         {
                             $join->on('video_flags.video_id', '=', 'videos.id');
                             //$join->on('video_flags.user_id', '=', Auth::user()->id);
                             $join->where('video_flags.user_id','=', Auth::user()->id);
                         })
                    ->leftJoin('lessons_ratings', 'lessons_ratings.video_id', '=', 'videos.id')
					->select('user.role_id', 'videos.*','video_flags.id as video_flag_id', 'videos.user_id as owner_id', \DB::raw( 'ROUND(AVG( rating_value ), 1) as rating_value' ) )
					->where('videos.enable', '=',1)
                    ->groupBy('videos.id')
					->get();

		if(count($videos) > 0){
			$i=0;
			foreach ($videos as $video){
				if($video->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($video->video_id);
					$video['thumb'] =$video_thumb;
				}
			}

		}
		if(!$videos->count()){
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
		
	    return Response::json([
	    	'query_status' => 'success',
	        'data' => $videos
	    ], 200);
	}

	/**
	 * Display a listing of the resource by a id.
	 *
	 * @return Response
	 */
	public function get_video_by_id($video_id)
	{
		$video = Video::find($video_id);

		if(empty($video)){
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'Video does not exist'
            ], 404);
        }
 
        return Response::json([
    		'query_status' => 'success',
            'data' => $video
        ], 200);
	}

	/**
	 * Display a listing of the resource by a id.
	 *
	 * @return Response
	 */
	public function get_video_by_category_id($category_id)
	{
		// $video = Video::find($category_id);
		$videos = Video::latest()->where('category_id', '=', $category_id)->get();

		if(!$videos->count()){
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'Video does not exist'
            ], 404);
        }

		if(count($videos) > 0){
			$i=0;
			foreach ($videos as $video){
				if($video->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($video->video_id);
					$video['thumb'] =$video_thumb;
				}
			}
		}
 
        return Response::json([
    		'query_status' => 'success',
            'data' => $videos
        ], 200);
	}


	public function getVideosByCategoryId($category_id)
	{
		// $video = Video::find($category_id);
		$videos = Video::latest()
			->where('category_id', '=', $category_id)
			->where('enable', '=', 1)
			->get();

		if(!$videos->count()){
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'Video does not exist'
            ], 404);
        }

		if(count($videos) > 0){
			$i=0;
			foreach ($videos as $video){
				if($video->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($video->video_id);
					$video['thumb'] =$video_thumb;
				}
			}
		}

        return Response::json([
    		'query_status' => 'success',
            'data' => $videos
        ], 200);
	}

	/**
	 * Display a listing of the resource by video title.
	 *
	 * @return Response
	 */
	public function get_videos_by_title($title)
	{
		// $video = Video::find($category_id);
		$videos = Video::orderBy('id','asc')
			->where('enable', '=',1)
		  	->where('title', 'LIKE', "%{$title}%")
		  	->get();

		if(!$videos->count()){
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'Video does not exist'
            ], 404);
        }

		if(count($videos) > 0){
			$i=0;
			foreach ($videos as $video){
				if($video->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($video->video_id);
					$video['thumb'] =$video_thumb;
				}
			}
		}
 
        return Response::json([
    		'query_status' => 'success',
            'data' => $videos
        ], 200);
	}

	/**
	 * Display a listing of the resource by video title.
	 *
	 * @return Response
	 */
	public function get_video_by_quiz_id($quiz_id)
	{
		// $video = Video::find($category_id);
		// $video = Video::orderBy('videos.id','asc')
		// 	->select('videos.*', 'quizzes.score as quiz_score', 'quizzes.value as quiz_value')
		//   	->join('quizzes', 'videos.id', '=', 'quizzes.video_id')
		//   	->where('quizzes.id', '=', $quiz_id)
		//   	->where('videos.enable', '=', 1)
		//   	->where('quizzes.enable', '=', 1)
		//   	->get();
		
		// SELECT `videos`.*, `quizzes`.`score` AS `quiz_score`, `quizzes`.`value` AS `quiz_value`, `category`.`name` AS `category`, `category`.`parent_cat_id` AS parent_cat, (SELECT `category`.`name` FROM `category` WHERE `category`.`id`=`parent_cat` ) AS parent_category FROM `videos` INNER JOIN `quizzes` ON `videos`.`id` = `quizzes`.`video_id` INNER JOIN `category` ON `category`.`id` = `videos`.`category_id` WHERE `quizzes`.`id` = 41 AND `videos`.`enable` = 1 AND `quizzes`.`enable` = 1 ORDER BY `videos`.`id` ASC

        if ($this->is_child()) {
            $video = DB::select( DB::raw("SELECT `videos`.*, `quizzes`.`value` as `quiz_value`, `quizzes`.`score` AS `quiz_score`, `quizzes`.`value` AS `quiz_value`, `category`.`name` AS `category`, `category`.`parent_cat_id` AS parent_cat, (SELECT `category`.`name` FROM `category` WHERE `category`.`id`=`parent_cat` ) AS parent_category, `childquizallocations`.pass_percentage, `childquizallocations`.id as childquizallocation_id, `childquizallocations`.max_number_of_attempts FROM `videos` INNER JOIN `quizzes` ON `videos`.`id` = `quizzes`.`video_id` INNER JOIN `category` ON `category`.`id` = `videos`.`category_id` INNER JOIN `childquizallocations` ON `quiz_id` = `quizzes`.`id` WHERE `quizzes`.`id` =".$quiz_id." AND `videos`.`enable` = 1 AND `quizzes`.`enable` = 1 AND childquizallocations.child_id = " . Auth::user()->id. " ORDER BY `videos`.`id` ASC") )[0];
        }else {
            $video = DB::select( DB::raw("SELECT `videos`.*, `quizzes`.`value` as `quiz_value`, `quizzes`.`score` AS `quiz_score`, `quizzes`.`value` AS `quiz_value`, `category`.`name` AS `category`, `category`.`parent_cat_id` AS parent_cat, (SELECT `category`.`name` FROM `category` WHERE `category`.`id`=`parent_cat` ) AS parent_category, `childquizallocations`.pass_percentage, `childquizallocations`.id as childquizallocation_id, `childquizallocations`.max_number_of_attempts FROM `videos` INNER JOIN `quizzes` ON `videos`.`id` = `quizzes`.`video_id` INNER JOIN `category` ON `category`.`id` = `videos`.`category_id` INNER JOIN `childquizallocations` ON `quiz_id` = `quizzes`.`id` WHERE `quizzes`.`id` =".$quiz_id." AND `videos`.`enable` = 1 AND `quizzes`.`enable` = 1 ORDER BY `videos`.`id` ASC") )[0];
        }

		// dd($video);
		if(empty($video))
            return Response::json([
            	'query_status' => 'error',
				'message' => 'Video does not exist'
            ], 404);

		if(count($video) > 0){
			$video_thumb = $this->getTedVideoThumb($video->video_id);
			$video['thumb'] =$video_thumb;
		}
 
        return Response::json([
    		'query_status' => 'success',
            'data' => $video
        ], 200);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		if($this->is_admin())
		{
			//$this->validate($request, ['name' => 'required']); // Uncomment and modify if you need to validate any input.
			$request = $request->all();
			// Video::create($request->all());

			//print_r('hit///'); die;
			
			if(	! $request['title']	 		or 
				! $request['url']	 		or 
				! $request['video_id']  	or 
				! $request['video_ref']  	or 
				! $request['category_id']  	// or 
				// ! $request['i_frame']		or	
				// ! $request['description']   or 
				// ! $request['user_id']
				
				){
					
	            return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422); 
	        } 
	         
		    // $user = Video::where('video_id', 'LIKE', "%{$request['video_id']}%")->get();
			if(!Video::where('video_id', 'LIKE', "%{$request['video_id']}%")->get()->isEmpty()){
				
				return Response::json([
		        		'query_status' => 'error',
		                'message' => 'Video may already exist!'
		        ], 409); // 409 for Conflict status
			}
			
			$request['user_id'] = Auth::user()->id;
			
	        // $user = Video::create($request->all());
	        $video = Video::create($request);
	 		
	        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'Video Created Successfully', 
	                'data' => $video 
	        ], 201);
		
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request)
	{
		\DB::beginTransaction();

		if($this->is_admin() or $this->is_parent() )
		{
			
			//$this->validate($request, ['name' => 'required']); // Uncomment and modify if you need to validate any input.
			
			$video = Video::findOrFail($id);
			
			$request = $request->all();
			//print_r($request); die;
			
			if(	! $request['title']	 		or 
				! $request['url']	 		or 
				! $request['video_id']  	or 
				! $request['video_ref']  	or 
				! $request['category_id']  	// or 
				// ! $request['i_frame']		or	
				// ! $request['description']   or 
				// ! $request['user_id']

				){
				
	            return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422); 
			} 
			
			if($request['enable'] != 0)
			{
				/*if(!Video::where('video_id', 'LIKE', "%{$request['video_id']}%")->get()->isEmpty()){
					
					return Response::json([
			        		'query_status' => 'error',
			                'message' => 'Video may already exist!'
			        ], 201); // 409 for Conflict status
				}*/

				$video_check= \Validator::make($request,[
                'video_id' =>'unique:videos,video_id,' . $id
                ]);

        		$video_status = $video_check->passes();

        		if($video_status == false)
        		{
        			return Response::json([
			        		'query_status' => 'error',
			                'message' => 'Video may already exist!'
			        ], 201); // 409 for Conflict status
        		}
			}
			
			
			$request['user_id'] = Auth::user()->id;

			try
			{
				$video->update($request);
	        
		        if($request['enable'] == 0)
		        {
		        	$quizz_ids = Quiz::select('id')
		        			->where('video_id','=',$id)
		        			->get()
		        			->pluck('id')
		        			->toArray(); 

		        	if(count($quizz_ids) > 0)
		        	{
		        		//update child quizz allocation
		        		/*$update_allocation = Childquizallocation::where('quiz_id','IN',$quizz_ids)
		        			->update(['enable' => 0]);*/
                        \Log::info('quizzes list ' . print_r($quizz_ids, true));
		        		$up_quizzes = Quiz::whereIn('id',$quizz_ids)
		        						->update(['enable' => 0]);

		        		$childquizallocation_ids = Quiz::select('childquizallocations.id')
		        			->join('childquizallocations','childquizallocations.quiz_id','=','quizzes.id')
		        			->where('quizzes.video_id', '=', $id)
		        			->get()
		        			->pluck('id')
		        			->toArray(); 

		        		//delete from bundle_childquizallocations
		        		if(count($childquizallocation_ids) > 0)
		        		{
		        			$delete = \DB::table('bundle_childquizallocations')	        		
		        				  ->whereIn('childquizallocation_id', $childquizallocation_ids)
		        				  ->delete();
		        		}


		        		/*$quiz_ids2 = Quiz::select('childquizallocations.quiz_id')
		        			->join('childquizallocations','childquizallocations.quiz_id','=','quizzes.id')
		        			->where('quizzes.video_id', '=', $id)
		        			->get()
		        			->pluck('quiz_id')
		        			->toArray();*/

		        		//delete from bundle_quizzes
		        		$delete = \DB::table('bundle_quizzes')	      
		        				  ->whereIn('quiz_id', $quizz_ids)
		        				  ->delete();
		        		
		        	}
		        	
		        }
		        \DB::commit();

			}catch (\Exception $e) {
			    \Log::info("Exception thrown when trying to delete bundle");
			    \Log::info($e->getTraceAsString());
                \DB::rollback();
            }
	        
	
	        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'Video Updated Successfully', 
	                'data' => $video 
	        ], 200);
        
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		if($this->is_admin())
		{
			Video::destroy($id);
			// return redirect('category');
			return Response::json([
            	'query_status' => 'success',
				'message' => 'Record successfully deleted!'
            ], 200);
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
	}

	protected function getTedVideoThumb($videoId){
		$ch = curl_init();
		$headers = array(
			"Content-type: text/json",
			"Connection: close",
		);
		$url = "http://www.ted.com/services/v1/oembed.json?url=http%3A%2F%2Fwww.ted.com%2Ftalks%2F$videoId";
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
		curl_setopt($ch, CURLOPT_URL, $url);

		$response = curl_exec($ch);

		if( 0 !== curl_errno( $ch ) || 200 !== curl_getinfo( $ch, CURLINFO_HTTP_CODE ) ) {
			$response = null;
		}
		curl_close($ch);

		$result = json_decode($response, true);

		if(empty($result)  || $result == null){
			return "includes/images/ted-no-thumbnail.png";
		}
		$result = $result['thumbnail_url'];
		return $result;
	}

}
 