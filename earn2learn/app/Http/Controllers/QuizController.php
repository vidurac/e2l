<?php

namespace App\Http\Controllers;

use App\Attempt;
use App\Bundle;
use App\HouseSponsor;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use App\Quiz;
use Response;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Log;

class QuizController extends Controller
{
	public function __construct(){
        $this->middleware('jwt.auth');
    }

	/**
	 * Display a listing of the resource.
	 * ***For quizzes by get current logged user
	 * @return Response
	 */
	public function index()
	{

		// $quizzes = Quiz::latest()->where('user_id', '=', Auth::user()->id)->get();
		$quizzes = Quiz::latest()->select('quizzes.*', 'videos.category_id', 'videos.title', 'videos.description', 'videos.video_id as video_url_id', 'videos.video_ref', 'videos.min_age', 'videos.max_age', 'videos.user_id as owner_id', 'user.role_id', \DB::raw( 'ROUND(AVG( rating_value ), 1) as rating_value') )
                                ->where('videos.enable', '=',1)
                                ->where('quizzes.enable', '=',1)
                                ->where('quizzes.user_id', '=', Auth::user()->id)
                                ->with('sponsor')
                                ->join('videos', 'videos.id', '=', 'quizzes.video_id')
                                ->join('user', 'videos.user_id', '=', 'user.id')
                                ->leftJoin('lessons_ratings', 'lessons_ratings.video_id', '=', 'quizzes.video_id')
                                ->groupBy('quizzes.id')
                                ->get();



		foreach ($quizzes as $row)
		{
//			\Log::info("Quiz house id is :".$row->house_id);
			$result_arr=$row->child_quiz_allocations()->get()->pluck('child_id')->toArray();
//			\Log::info("Quiz result is :".print_r($result_arr,true));
			$row['child_ids'] = $result_arr;
//			\Log::info("Quizzes are :".print_r($row,true));
            $sponsor_name = '';
            if (isset($row->sponsor)) {
                \Log::info("====== sponsor exists");
                $sponsor_name = $row->sponsor->f_name . ' ' . $row->sponsor->l_name;
            }else {
                \Log::info("====== sponsor not exists");
            }
            unset($row['sponsor']);
            $row['sponsor_name'] = $sponsor_name;
        }

//		\Log::info("Child id array is :".print_r($result_arr,true));

		// if(empty($quizzes)){

		if(count($quizzes) > 0){
			$i=0;
			foreach ($quizzes as $quizze){
				if($quizze->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($quizze->video_url_id);
					$quizze['thumb'] =$video_thumb;
				}
			}
		}

		if(!$quizzes->count())
		{
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }



        return Response::json([
    		'query_status' => 'success',
            'data' => $quizzes
        ], 200);
	}

    /**
     * For get all quizzes with  video
     *
     * @return Response
     */
    public function get_all_quizzes_with_video()
    {
        $quizzes = Quiz::select('videos.video_id','videos.video_ref','videos.title','videos.video_id','quizzes.id','videos.user_id','videos.visibility')
                    ->join('videos', 'videos.id', '=', 'quizzes.video_id')
                    ->where('quizzes.enable', '=',1)
                    ->where('videos.enable', '=',1)
                    ->where('quizzes.user_id', '=',Auth::user()->id)
                    ->get();
        //dd($quizzes);
        /*$quizzes = Quiz::select('quizzes.*', 'attempts.id as attempt_id', 'attempts.allocation_id as allocation_id')
            ->orderBy('quizzes.id','asc')
            ->join('attempts', 'attempts.quiz_id', '=', 'quizzes.id')
            ->where('attempts.id', '=', $attempt_id)
            ->get();*/

		if(count($quizzes) > 0){
			$i=0;
			foreach ($quizzes as $quizze){
				if($quizze->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($quizze->video_id);
					$quizze['thumb'] =$video_thumb;
				}
			}

		}

        if(!$quizzes->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $quizzes
        ], 200);
    }

    /**
     * For get all quizzes with  video
     *
     * @return Response
     */
    public function get_all_quizzes_with_video_by_bundle($id)
    {

        $bundle = Bundle::find($id);

        if (empty($bundle)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }


        $quizzes = Quiz::select('videos.video_id','videos.video_ref','videos.title','videos.video_id','quizzes.id')
            ->join('videos', 'videos.id', '=', 'quizzes.video_id')
            ->where('quizzes.enable', '=',1)
            ->where('videos.enable', '=',1)
            ->where('quizzes.user_id', '=',$bundle->user_id)
            ->get();
        //dd($quizzes);
        /*$quizzes = Quiz::select('quizzes.*', 'attempts.id as attempt_id', 'attempts.allocation_id as allocation_id')
            ->orderBy('quizzes.id','asc')
            ->join('attempts', 'attempts.quiz_id', '=', 'quizzes.id')
            ->where('attempts.id', '=', $attempt_id)
            ->get();*/

		if(count($quizzes) > 0){
			$i=0;
			foreach ($quizzes as $quizze){
				if($quizze->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($quizze->video_id);
					$quizze['thumb'] =$video_thumb;
				}
			}

		}

        if(!$quizzes->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

		if(count($quizzes) > 0){
			$i=0;
			foreach ($quizzes as $quizze){
				if($quizze->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($quizze->video_id);
					$quizze['thumb'] =$video_thumb;
				}
			}

		}

        return Response::json([
            'query_status' => 'success',
            'data' => $quizzes
        ], 200);
    }
	
	/**
	 * For get all quizzes
	 *
	 * @return Response
	 */
	public function get_all_quizzes()
	{
		$quizzes = Quiz::latest()->where('enable', '=',1)->get();
		
		if(!$quizzes->count())
		{
			return Response::json([
		    	'query_status' => 'error',
		    	'message' => 'data not found'
		    ], 404);	
		}
	
	    return Response::json([
	    	'query_status' => 'success',
	        'data' => $quizzes
	    ], 200);
	}
	
	/**
	 * For get a quiz by id
	 *
	 * @return Response
	 */
	public function get_quiz_by_id($quiz_id)
	{
		$quiz = Quiz::find($quiz_id);
	
		if(empty($quiz))
		{
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }
        
        return Response::json([
    		'query_status' => 'success',
            'data' => $quiz
        ], 200);
	}
	
	/**
	 * For get quiz by a video id
	 *
	 * @return Response
	 */
	public function get_quiz_by_video_id($video_id)
	{
		$quizzes = Quiz::latest()->where('video_id', '=', $video_id)->where('enable', '=',1)->get();
	
		// if(empty($quizzes)){
		if(!$quizzes->count())
		{
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }

		if(count($quizzes) > 0){
			$i=0;
			foreach ($quizzes as $quizze){
				if($quizze->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($quizze->video_id);
					$quizze['thumb'] =$video_thumb;
				}
			}

		}
        
        return Response::json([
    		'query_status' => 'success',
            'data' => $quizzes
        ], 200);
	}
	
	/**
	 * For get quiz by a user id
	 *
	 * @return Response
	 */
	public function get_quiz_by_user_id($user_id)
	{
		$quizzes = Quiz::latest()->where('user_id', '=', $user_id)->get();
	
		// if(empty($quizzes)){
		if(!$quizzes->count())
		{
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }

		if(count($quizzes) > 0){
			$i=0;
			foreach ($quizzes as $quizze){
				if($quizze->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($quizze->video_id);
					$quizze['thumb'] =$video_thumb;
				}
			}

		}
        
        return Response::json([
    		'query_status' => 'success',
            'data' => $quizzes
        ], 200);
	}
	
	/**
	 * For get quiz by a user id
	 *
	 * @return Response
	 */
	public function get_quiz_by_user_video($video_id)
	{
	    \Log::info("=== " .__FUNCTION__);
		$quizzes = Quiz::latest()->where('user_id', '=', Auth::user()->id)->where('video_id', '=', $video_id)->where('enable', 1)->get();
	
		// if(empty($quizzes)){
		if(!$quizzes->count())
		{
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }

		if(count($quizzes) > 0){
			$i=0;
			foreach ($quizzes as $quizze){
				if($quizze->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($quizze->video_id);
					$quizze['thumb'] =$video_thumb;
				}
			}

		}
        
        return Response::json([
    		'query_status' => 'success',
            'data' => $quizzes
        ], 200);
	}

    /**
     * For get quiz by a video id
     *
     * @return Response
     */
    public function get_quiz_by_house_id($house_id, $video_id)
    {
        $quizzes = Quiz::latest()->where('house_id', '=', $house_id)->where('video_id', '=', $video_id)->where('enable', '=',1)->get();

        // if(empty($quizzes)){
        if(!$quizzes->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

		if(count($quizzes) > 0){
			$i=0;
			foreach ($quizzes as $quizze){
				if($quizze->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($quizze->video_id);
					$quizze['thumb'] =$video_thumb;
				}
			}

		}

        return Response::json([
            'query_status' => 'success',
            'data' => $quizzes
        ], 200);
    }
	
	/**
	 * For get quiz by a user id
	 *
	 * @return Response
	 */
	public function get_quiz_by_attempt_id($attempt_id)
	{

		if ($this->is_child()) {
            $quizzes = Quiz::select('quizzes.*', 'childquizallocations.pass_percentage as score', 'attempts.id as attempt_id', 'attempts.allocation_id as allocation_id', 'attempts.status as attempt_status', 'childquizallocations.max_number_of_attempts')
                ->orderBy('quizzes.id','asc')
                ->join('attempts', 'attempts.quiz_id', '=', 'quizzes.id')
                ->join('childquizallocations', 'childquizallocations.quiz_id', '=', 'quizzes.id')
                ->where('attempts.id', '=', $attempt_id)
                ->where('childquizallocations.child_id', Auth::user()->id)
                ->get();

        }else {
            $quizzes = Quiz::select('quizzes.*', 'childquizallocations.pass_percentage as score', 'attempts.id as attempt_id', 'attempts.allocation_id as allocation_id', 'attempts.status as attempt_status', 'childquizallocations.max_number_of_attempts')
                ->orderBy('quizzes.id','asc')
                ->join('attempts', 'attempts.quiz_id', '=', 'quizzes.id')
                ->join('childquizallocations', 'childquizallocations.quiz_id', '=', 'quizzes.id')
                ->where('attempts.id', '=', $attempt_id)
                ->get();
        }
		// if(empty($quizzes)){
		if(!$quizzes->count())
		{
            return Response::json([
            	'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }

        if($this->is_child())
        {
            foreach ($quizzes as &$q) {
                $attemptCount = Attempt::latest()
                        ->where('quiz_id', $q->id)
                        ->where('allocation_id', $q->allocation_id)
                        ->where('status', 2)
                        ->count();
                $remainingAttempts = 0;
                if ($q->max_number_of_attempts >= $attemptCount) {
                    $remainingAttempts  = $q->max_number_of_attempts - $attemptCount;
                }
                $q['remainingAttempt']= $remainingAttempts;
                $q['attemptCount']= $attemptCount;
            }
        }

        
        return Response::json([
    		'query_status' => 'success',
            'data' => $quizzes
        ], 200);
	}
	
	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{

		if($this->is_admin() or $this->is_parent())
		{
			
			//$this->validate($request, ['name' => 'required']); // Uncomment and modify if you need to validate any input.
			$request = $request->all();

			//print_r($request); die;

			$request['score'] = env('PASS_PERCENTAGE');
			Log::info('Score pass percentage is '.$request['score']);
			
			if(	! $request['video_id']	 	or 
				! $request['value']   or
				! $request['score']   //or
				// ! $request['house_id'] //or
				// ! $request['user_id']
				
				){
				
	            return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422); 
	        } 

	        if (!isset($request['user_id'])) {
                $request['user_id'] = Auth::user()->id;
            }

			// enable the quiz
			$request['enable'] = 1;
			//print_r($request); die;
	        // $user = Quiz::create($request->all());
	        $quiz = Quiz::create($request);
	 		
	        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'Quiz Created Successfully', 
	                'data' => $quiz 
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

        $request = $request->all();
        
		if($this->is_admin() or $this->is_parent())
		{
			$quiz = Quiz::findOrFail($id);

			if(	! $request['video_id'] ){
				
				return Response::json([
	            	'query_status' => 'error',
	            	'message' => 'Please provide all required fields'
	            ], 422); 
			}
			
			$request['user_id'] = Auth::user()->id;

            try {

                $quiz->update($request);

                if($request['enable'] == 0)
                {
//                    $quizz_ids = Quiz::select('id')
//                            ->where('video_id','=',$request['video_id'])
//                            ->get()
//                            ->pluck('id')
//                            ->toArray();

                    if(isset($quiz))
                    {
                        //update child quizz allocation
                        /*$update_allocation = Childquizallocation::where('quiz_id','IN',$quizz_ids)
                            ->update(['enable' => 0]);*/

                        $childquizallocation_ids = Quiz::select('childquizallocations.id')
                            ->join('childquizallocations','childquizallocations.quiz_id','=','quizzes.id')
                            ->where('quizzes.video_id', '=', $quiz->video_id)
                            ->where('quizzes.user_id', '=', Auth::user()->id)
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

                        //delete from bundle_quizzes
                        $delete = \DB::table('bundle_quizzes')        
                                  ->where('quiz_id', $quiz->id)
                                  ->delete();
                        
                    }
                }
                
                \DB::commit();

            } catch (\Exception $e) {
                \DB::rollback();
            }

	        
	
	        return Response::json([
	        		'query_status' => 'success',
	                'message' => 'Quiz Updated Successfully', 
	                'data' => $quiz 
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
			
			Quiz::destroy($id);
			return Response::json([
            	'query_status' => 'success',
        		'message' => 'Record successfully deleted!'
            ], 200);
		}
		
		return Response::json([
        	'error' => 'access_denied'
        ], 401);
	}

	public function getAllHouseQuizzesForSponsor() {

        $userId = Auth::user()->id;

        // All house ids that sponsor has been accepted
        $ids = HouseSponsor::all()->where('user_id', $userId)->where('enable', 1)->pluck('house_id')->toArray();

        if (empty($ids)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Data not found'
            ], 404);
        }

        // $quizzes = Quiz::latest()->where('user_id', '=', Auth::user()->id)->get();
        $quizzes = Quiz::latest()->select('quizzes.*', 'videos.category_id', 'videos.title', 'videos.description', 'videos.video_id as video_url_id', 'videos.video_ref', 'videos.min_age', 'videos.max_age', 'videos.user_id as owner_id', 'u2.role_id as role_id', 'house.name as house_name', 'user.f_name', 'user.l_name', 'user.id as parent_id', 'u1.f_name as sponsor_f_name', 'u1.l_name as sponsor_l_name', \DB::raw( 'ROUND(AVG( rating_value ), 1) as rating_value' ))
            ->where('videos.enable', '=',1)
            ->where('quizzes.enable', '=',1)
            ->whereIn('quizzes.house_id', $ids)
            ->join('videos', 'videos.id', '=', 'quizzes.video_id')
            ->join('house', 'quizzes.house_id', '=', 'house.id')
            ->join('user', 'quizzes.user_id', '=', 'user.id')
            ->join('user as u2', 'videos.user_id', '=', 'u2.id')
            ->leftJoin('user as u1', 'u1.id', '=', 'quizzes.sponsor_id')
            ->leftJoin('lessons_ratings', 'lessons_ratings.video_id', '=', 'quizzes.video_id')
            ->groupBy('quizzes.id')
            ->get();

        // if(empty($quizzes)){
        if(!$quizzes->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

		if(count($quizzes) > 0){
			$i=0;
			foreach ($quizzes as $quizze){
				if($quizze->video_ref == 'ted'){
					$video_thumb = $this->getTedVideoThumb($quizze->video_url_id);
					$quizze['thumb'] =$video_thumb;
				}
			}
		}

        return Response::json([
            'query_status' => 'success',
            'data' => $quizzes
        ], 200);
    }

    /**
     * Checks quiz already been added to house by video_id and user_id
     * @param $video_id
     * @param $user_id
     * @return mixed
     */
    public function checkQuizAlreadyAddedToHouse($video_id, $user_id) {

        $q = Quiz::where('video_id', $video_id)->where('user_id', $user_id)->where('enable', 1)->first();

        if (isset($q)) {
            return Response::json([
                'query_status' => 'success',
                'data' => ['exists' => true]
            ], 200);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => ['exists' => false]
        ], 200);
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

		$result = json_decode($response,true);

		if(empty($result) || $result == null){
			return "includes/images/ted-no-thumbnail.png";
		}
		$result = $result['thumbnail_url'];
		return $result;
	}

}
