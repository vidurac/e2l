<?php

namespace App\Http\Controllers;

use App\Events\NotifyParent;
use App\MailSubscription;
use App\Lessonsratings;
use App\Traits\NotificationTrait;
use Illuminate\Http\Request;

use App\Traits\BadgeTrait;
use App\Traits\ChildgiftcardTrait;

use Auth;
use Response;
use App\Video;
use App\Question;
use App\Answer;
use App\Quiz;
use App\ChildHouse;
use App\ChildGiftCard;
use App\HomeGiftCard;
use App\Childquizallocation;
use App\Result;
use App\Reward;
use App\Attempt;
use App\House;
use App\User;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Badge;
use Log;

class LessonController extends CertificateController
{
    use BadgeTrait;
    use NotificationTrait;
    use ChildgiftcardTrait;

    public function __construct(){
        $this->middleware('jwt.auth');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id=NULL)
    {
        return Response::json([
        	'error' => 'access_denied',
        	'message' => 'unauthorized access blocked'
        ], 401);
    }    


    /**
     * check assigness for video.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAssignees($vid=NULL)
    {
        //check video assign to children
        $allocation_count = Quiz::select('childquizallocations.id')
                ->join('childquizallocations', 'childquizallocations.quiz_id', '=', 'quizzes.id')
                ->where('quizzes.video_id',$vid)
                ->where('childquizallocations.enable',1) 
                ->where('quizzes.user_id',Auth::user()->id)
                ->get()
                ->count();

        // return data
        return Response::json([
            'query_status' => 'success',
            'count' => $allocation_count
        ], 200);;

    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function by_video($id=null)
    {
    	$ans_filter = ($this->is_child()) ? array("id","answer"): array("id","answer","is_correct","enable");
    	$qus_filter = ($this->is_child()) ? array("id","question"): array("id","question","question_type","control_type","video_id","enable");
		
        // check if para id null
        if ($id==null) {
        	return Response::json([
	                'query_status' => 'error',
			    	'message' => 'missing argument'
	        ], 400);
        }
        // get video by video id and check video exist 
		$video = Video::select('videos.*','user.role_id')
                ->join('user', 'user.id', '=', 'videos.user_id')
                ->where('videos.id',$id)
                ->where('videos.enable',1)
                ->first();

		if(!$video)
		{
	        return Response::json([
	                'query_status' => 'error',
			    	'message' => 'data not found 1'
	        ], 404);
        }
        // get questions by video id and check questions exist 
        // $questions = Question::latest()->where('video_id',$id)->get();
        $questions = Question::select($qus_filter)->where('video_id',$id)->get();
		if(!$questions->count())
		{
            return Response::json([
                'query_status' => 'error',
		        'message' => 'data not found 2'
            ], 404);
        }
 		// reach all questions for get answers
 		foreach($questions as $question)
 		{
 			// get answers by question id and check answers exist 
	 		// $answers = Answer::select(array("answer","is_correct","enable"))->where('question_id',$question->id)->get();
	 		$answers = Answer::select($ans_filter)->where('question_id',$question->id)->get();
			if(!$answers->count())
			{
	            return Response::json([
	                'query_status' => 'error',
			    	'message' => 'data not found 3'
	            ], 404);
	        }
	        // pull answers to related question
	        $question->answers = $answers;
 		}
 		
        // pull questions to  video 
        $video->questions = $questions;
        $video_id = $id;
        $rating_avg = Lessonsratings::select("rating_value")->where('video_id',$video_id)->avg("rating_value");

        if($rating_avg != null){
            $rounded_rating_val=number_format($rating_avg, 1, '.', '');
        }else{
            $rounded_rating_val = 0;
        }

        //check video added to myhouse
        $quiz_count = Quiz::where('video_id','=',$id)->where('enable','=','1')->count();
        $video->quiz_count = $quiz_count;

        // return data
        return Response::json([
    		'query_status' => 'success',
            'data' => $video,
            'video_id' => $video_id,
            'rating_avg' => $rounded_rating_val
        ], 200);
        
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function by_quiz($id=null)
    {
        $ans_filter = ($this->is_child()) ? array("id","answer"): array("id","answer","is_correct","enable");
    	$qus_filter = ($this->is_child()) ? array("id","question"): array("id","question","question_type","control_type","video_id","enable");

        // check if para id null
        if ($id==null) {
        	return Response::json([
	                'query_status' => 'error',
			    	'message' => 'missing argument'
	        ], 400);
        }
        // get quiz by quiz id and check quiz exist 
        $quiz = Quiz::latest()->where('id',$id)->where('enable',1)->first();
        // if(empty($quiz))
        if(!$quiz)
        {
	        return Response::json([
	                'query_status' => 'error',
			    	'message' => 'data not found'
	        ], 404);
        }
        // get video by quiz video id and check video exist 
// 		$video = Video::latest()
// 		            ->where('id',$quiz->video_id)
// 		            ->where('enable',1)
// 		            ->first();
// 
		$video = DB::select( DB::raw("SELECT `videos`.* , `category`.`name` AS `category`, `category`.`parent_cat_id` AS parent_cat, (SELECT `category`.`name` FROM `category` WHERE `category`.`id`=`parent_cat` ) AS parent_category FROM `videos` INNER JOIN `category` ON `category`.`id` = `videos`.`category_id` WHERE `videos`.`id` =".$quiz->video_id." AND `videos`.`enable` = 1 ORDER BY `videos`.`created_at` DESC LIMIT 1") )[0];
		            
		if(!$video)
		{
	        return Response::json([
	                'query_status' => 'error',
			    	'message' => 'data not found'
	        ], 404);
        }

        // get questions by video id and check questions exist 
        $questions = Question::select($qus_filter)->where('video_id',$video->id)->get();
		if(!$questions->count())
		{
            return Response::json([
                'query_status' => 'error',
		    	'message' => 'data not found'
            ], 404);
        }
 		// reach all questions for get answers
 		foreach($questions as $question)
 		{
 			// get answers by question id and check answers exist 
	 		// $answers = Answer::select(array("answer","is_correct","enable"))->where('question_id',$question->id)->get();
	 		$answers = Answer::select($ans_filter)->where('question_id',$question->id)->get();
			if(!$answers->count())
			{
	            return Response::json([
	                'query_status' => 'error',
			    	'message' => 'data not found'
	            ], 404);
	        }
	        // pull answers to related question
	        $question->answers = $answers;
 		}
 		
        // pull questions to  video 
        $video->questions = $questions;
        // return data
        return Response::json([
    		'query_status' => 'success',
            'data' => $video
        ], 200);
        
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function by_child($id=null)
    {
        $child_id=Auth::user()->id;
        //$childgiftcard_points=$this->getChildGiftCard($child_id);
        $giftcard_points = ChildGiftCard::select('homegiftcards.points as card_points')
            ->join('homegiftcards', 'homegiftcards.child_id', '=', 'childgiftcards.child_id')
            ->where('childgiftcards.child_id', $id)
            ->where('childgiftcards.bundle_id', NULL)
            ->where('childgiftcards.is_approved', 1)
            ->where('homegiftcards.enable', 1)
            ->get();

        $childgiftcard_points = 0;

        if (empty($giftcard_points)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        else{
            foreach ($giftcard_points as $points){
                $childgiftcard_points = $childgiftcard_points + $points->card_points;
            }
        }
    	// check if para id null
        if ($id==null) {
        	return Response::json([
	                'query_status' => 'error',
			    	'message' => 'missing argument'
	        ], 400);
        }
        // get quiz by quiz id and check quiz exist
        $quizzes = Childquizallocation::latest()
            ->where('child_id', '=', $id)
            ->where('enable', '=', 1) 
            ->get();

        if(!$quizzes->count()){
	        return Response::json([
	                'query_status' => 'error',
			    	'message' => 'data not found'
			], 404);
        }
        foreach($quizzes as $quiz)
 		{
	 		// get video by quiz id and check video exist 
// 			$video = Quiz::latest() 
// 			            ->select('quizzes.created_at', 'videos.id as video_id', 'videos.title', 'videos.url', 'videos.video_id as url_id', 'videos.video_ref', 'quizzes.value as value')
//                         ->where('quizzes.id', '=', $quiz->quiz_id) 
//                         ->join('videos', 'videos.id', '=', 'quizzes.video_id') 
//                         ->first();   
                        
            $video = DB::select( DB::raw("SELECT `quizzes`.`created_at`, `videos`.`id` AS `video_id`, `videos`.`title`, `videos`.`url`, `videos`.`video_id` AS `url_id`, `videos`.`video_ref`, `quizzes`.`value` AS `value`, `category`.`name` AS `category`, `category`.`parent_cat_id` AS parent_cat, (SELECT `category`.`name` FROM `category` WHERE `category`.`id`=`parent_cat` ) AS parent_category FROM `quizzes` INNER JOIN `videos` ON `videos`.`id` = `quizzes`.`video_id` INNER JOIN `category` ON `category`.`id` = `videos`.`category_id` WHERE `quizzes`.`id` =".$quiz->quiz_id." AND quizzes.enable='1' ORDER BY `created_at` DESC LIMIT 1") );

			if(!$video) 
				$video = null;

            // dd($video[0]);
            if($this->is_admin() or $this->is_parent())
            {
                $attempts = Attempt::select('attempts.id') 
                        ->where('attempts.quiz_id', $quiz->quiz_id) 
                        ->where('attempts.status', 2)
                        ->where('attempts.is_passed', 0)
                        ->get();
            }
            else
            {
                $attempts = Attempt::select('attempts.id') 
                        ->where('attempts.quiz_id', $quiz->quiz_id) 
                        ->get();
            }

            /*$is_passed = Attempt::select('attempts.id') 
                        ->where('attempts.quiz_id', $quiz->quiz_id) 
                        ->where('attempts.status', 2)
                        ->where('attempts.is_passed', 1)
                        ->get();*/
             
            // pull video to related quiz 
            $quiz->attempts = $attempts->count(); 
            //$quiz->is_passed = $is_passed->count() > 0 ? true : false; 
            $quiz->video = $video[0];
            if(isset($quiz->video)  && $quiz->video->video_ref == 'ted'){
                $video_thumb = $this->getTedVideoThumb($quiz->video->url_id);
                $quiz->video->thumb=$video_thumb;
            }

            if (isset($quiz->sponsor_id) && $quiz->sponsor_id != '') {
                $sponsor =$child = User::select('user.f_name', 'user.l_name')->where('id', $quiz->sponsor_id)->first();
                $quiz->sponsor_name = $sponsor->f_name . ' ' . $sponsor->l_name;
            }
            // dd($quiz);
        }
        // dd($quizzes);
        // return data

//        Log::info("Gift card points are :".print_r($childgiftcard_points,true));
        return Response::json([
            'query_status' => 'success',
            'data' => $quizzes,
            'childgiftcard_points' => $childgiftcard_points
        ], 200);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function by_house($id=null)
    {
        // check if para id null
        if ($id==null) {
        	return Response::json([
                    'query_status' => 'error',
                    'message' => 'missing argument'
                ], 400);
        }
        // filter for child
        // $ans_filter = ($this->is_child()) ? array("id","answer"): array("id","answer","is_correct","enable");
        // $qus_filter = ($this->is_child()) ? array("id","question"): array("id","question","question_type","control_type","video_id","enable");
        
        $quizzes = Quiz::where('house_id', '=', $id)->where('enable', '=', 1)->get();
        if(!$quizzes->count())
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        Log::info('##########Quizzes are :#######'.$quizzes);
        // dd($quizzes);
        // reach all quizzes for get videos
        foreach($quizzes as $quiz)
        {
            // get answers by question id and check answers exist 
            $video = Video::select('title', 'description', 'url', 'video_id', 'video_ref', 'category_id')->where('id',$quiz->video_id)->where('enable', '=', 1)->first();
    		if(empty($video))
    		{
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
            }
            // dd($video);
            // pull answers to related question
            $quiz->video = $video;
        }
        // dd($quizzes);
        // return data
        return Response::json([
            'query_status' => 'success',
            'data' => $quizzes
        ], 200);
        
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($this->is_admin() or $this->is_parent())
		{
			
            $request = $request->all();

            //print_r($request); die;
			
			if(	! $request['title']	 		or
				! $request['url']	 		or 
				! $request['video_id']  	or 
				! $request['video_ref']  	or 
				! $request['category_id']   or
				! $request['questions']     //or
                
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
		        ], 201); // 409 for Conflict status
			}
			
			$request['user_id'] = Auth::user()->id;
			
	        // $user = Video::create($request->all());
	        $video = Video::create($request);
	        
	        if ($video) 
	        {
    	        foreach (json_decode($request['questions']) as $row) 
    	        {
    	           
    	            if(	is_null($row->question) 	    or
        				is_null($row->question_type)   or 
        				is_null($row->control_type)    or 
        				is_null($row->answers)
        				)
        			{
        			    return Response::json([
        	            	'query_status' => 'error',
        	            	'message' => 'Please provide all required fields'
    	                ], 422); 
        			}
        			
        			$row->video_id = $video->id;
        			$row->enable = 1; // 1;enable, 0:disable
        			
        			// $question_new = Question::create($request->all());
    	            $question_new = Question::create(get_object_vars($row));
    	            // check question type boolean/muliple choice, then set ansewers limit
    	            $limit = ( $row->question_type ) ? 4: 2;
    	            if($question_new)
    	            {
    	                foreach ($row->answers as $key=>$answer)
    	                {
    	                    if($key<$limit)
    	                    {
            	                if(	is_null($answer->answer) or empty($answer->answer) )
                    			{
                    	            return Response::json([
                    	            	'query_status' => 'error',
                    	            	'message' => 'Please provide all required fields'
                    	            ], 422);
                    	        }
                                // $answer['user_id'] = Auth::user()->id;
                    			$answer->question_id = $question_new->id;
                    			$answer->enable = 1; // 1;enable, 0:disable
                    			
                    	        // $answer = Answer::create($request->all());
                    	        $answer = Answer::create(get_object_vars($answer));
        	                    
        	                    /* return Response::json([
                	        		'query_status' => 'success',
                	                'message' => 'Video Created Successfully', 
                	                'data' => $answer
                	            ], 201);*/
    	                    }
    	                }
    	            }
        			
    	           /* return Response::json([
    	        		'query_status' => 'success',
    	                'message' => 'Question Created Successfully', 
    	                'data' => $question_new
    	            ], 201);*/
    	        }

                //Add lesson to my lessons section
                if($this->is_parent())
                {
                    $quiz_data = array(
                                    "house_id" => $request['house_id'],
                                    "value" => $request['value'],
                                    "video_id" => $video->id,
                                    "score" => env('PASS_PERCENTAGE'),
                                    "user_id" => Auth::user()->id,
                                    "enable" => 1
                                );
                    //print_r($quiz_data); die;

                    $quiz = Quiz::create($quiz_data);
                }
	        }
    	 		
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
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        return Response::json([
        	'error' => 'access_denied',
        	'message' => 'unauthorized access blocked'
        ], 401);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id // id of finished attempt
     * @return \Illuminate\Http\Response
     * @internal param Request $request
     */
    public function submit($id=null)
    {
        // get n' check attempt id
        if( !$id or $id==null ) 
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'missing argument'
            ], 400); 
        }

		$results = Result::orderBy('id', 'asc')->where('attempt_id', '=', $id)->where('enable', '=', 1);
		$results_for_questionid = Result::orderBy('id', 'asc')->where('attempt_id', '=', $id)->where('enable', '=', 1)->first();

        $question_id = $results_for_questionid->question_id;
        $video_id = Question::select('video_id')->where('id', $question_id)->first();
        $video_id=$video_id->video_id;
        $all_questions = Question::where('video_id', $video_id)->get();

        $total_ans=count($all_questions);
        $correct_ans = $results->where('is_correct', '=', 1)->count();

        if($correct_ans != 0 and $total_ans != 0)
        {   
            $score_percentage = round(($correct_ans/$total_ans)*100)*1;
        }
        else
        {
            $score_percentage = 0;
        }
            
        // update attempt record when attempt id finised 
        $attempt = Attempt::find($id);
        // dd($attempt);
        // check attempt if not exist

        if(empty($attempt) or !$attempt)
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        // get quiz data 
        $quiz = Quiz::find($attempt->quiz_id);
        $quiz_id=$attempt->quiz_id;
        $user_id=Auth::user()->id;
        // pass rate on % 
        $pass_score = $quiz->score;

        // $pass_score and $value will be override with childquizallocation's score and value
        $child_quiz_allocation = Childquizallocation::find($attempt->allocation_id);
        if ($child_quiz_allocation->pass_percentage > 0) {
            $pass_score = $child_quiz_allocation->pass_percentage;
        }

        // points for the quiz 
        $value = $quiz->value;

        $value = ($score_percentage >= $pass_score)? $value : 0;
        
        // check quiz has passed! 
        $is_pass = ($score_percentage >= $pass_score)? 1 : 0; 

        \Log::info('==== update attempt status ');
        $update_attempt = $attempt->update(['total_qus' => $total_ans,'correct_ans' => $correct_ans,'score_percentage' => $score_percentage,'is_passed' => $is_pass,'status' => 2]);
        \Log::info('==== update attempt status end');


        // Get total count attempt
        $attemptCount = Attempt::where('allocation_id', $attempt->allocation_id)
            ->where('status','=','2')
            ->count();

        \Log::info('==== total attempt count with status 2 are ' . $attemptCount);

        $lesson = Video::select('title', 'id')->where('id', $quiz->video_id)->first();
        $child = User::select('user.f_name', 'user.l_name')->where('id', Auth::user()->id)->first();

        $userData = ChildHouse::select('user.*')
            ->join('house', 'house.id', '=', 'childhouses.house_id')
            ->join('user', 'user.id', '=', 'house.user_id')
            ->where('childhouses.child_id', Auth::user()->id)
            ->first();

        if($update_attempt)
        {
            \Log::info('==== update attempt if block');
            // update allocation record when attempt id finised 
            // dd($attempt->allocation_id); 
            //$update_allocation = Childquizallocation::find($attempt->allocation_id);
            $update_allocation = $child_quiz_allocation;

            \Log::info('==== allocation info : ' . print_r($update_allocation->toArray(), true));

            if ($update_allocation->notify === 1 && $update_allocation->max_number_of_attempts !== 0 && ($attemptCount >= $update_allocation->max_number_of_attempts)) {
                // send attempt notifiction;
                //Your lesson attempts have been exceeded
                \Log::debug('============ quizz attempt finished.');

                // notify data
                $notifyData = [
                    'message' => trans('messages.notify_quiz_attempt_to_parent', [
                        'first_name' => $child->f_name,
                        'last_name' => $child->l_name,
                        'lesson' => $lesson->title,
                    ]),
                    'type' => 'lesson',
                    'link' => '#/parent/lesson/' . $lesson->id,
                    'user_id' => $userData->id
                ];

                // Fire notify event
                event(new NotifyParent($notifyData));

            }

            $update_allocation->update(['status' => 3]);

            \Log::info('==== child allocation updated');

            // if couldn't update the record
            if(!$update_allocation)
            {
                return Response::json([
                        'query_status' => 'error',
                        'message' => 'somthing went wrong 1', 
                ], 403);
            }

            // dd($update_allocation);
            if($is_pass==1) 
            {
                // add reward 
                $reward = Reward::create(['attempt_id'=>$id, 'child_id'=>Auth::user()->id, 'value'=>$value, 'type'=>1, 'enable'=>1]);

                $current_user=Auth::user();
                $child_id=$current_user->id;
                $parent = $this->getParent($child_id);

                $badges_data = $this->getChildAllBadges(Auth::user()->id);

                $completedLessons = $this->getCompletedLessonsByChildId(Auth::user()->id);
                if($badges_data != null){
                    $achieveBadgeData = $this->achieveBadge($badges_data,$completedLessons);
                    if($achieveBadgeData != null){
                        foreach ($achieveBadgeData as $achieveBadge ){
                            if(!$this->isBadgeAlreadyAchieved(Auth::user()->id,$achieveBadge)){
                                $current_user->completedBadges()->save($achieveBadge);
                                $this->notifyBadgeEarningToParent($child->f_name, $child->l_name, $parent->id, $achieveBadge->name);
                            }
                        }
                    }
                }

                // Check gift card request
                if ($this->canChildRequestGiftCard(Auth::user()->id)) {
                    //send a notification
                    \Log::info("===== can send a notification saying eligible for gift card");
                    $this->notifyChildWhenGiftCanRequest(['userId' => Auth::user()->id]);
                }

               /* for($i=0 ; $i < count($badges_data) ; $i++){
                    $badgeid=$badges_data[$i]['id'];
                    $badgepoint=$badges_data[$i]['points'];
                    $badgename=$badges_data[$i]['name'];
                    $badgeid=$badges_data[$i]['id'];
                    $userid=$badges_data[$i]['user_id'];

                    $child_id=Auth::user()->id;
                    $child_house_id=$this->get_child_house_id($child_id);
                    $child_house_id=$child_house_id["house_id"];
                    $badgetypes_id=$badges_data[$i]['badge_types_id'];

                    $parent_id=$userid;
                    $parent_house_id=$this->get_parent_house_id($parent_id);
                    $parent_house_id=$parent_house_id["id"];

                    $badgeassign_status=$this->get_badge_assign_status($child_id,$badgeid);

                    $data_array=array(
                        'badgeid'=>$badgeid,
                        'userid'=>$child_id
                    );



                    if($badgetypes_id==1){
                        //System badges handle
                        if($total_points >= $badgepoint){
                            if($duplicate_badge_status == true){
                                $this->add_a_badge($data_array);
                                $this->notifyBadgeEarningToParent($child->f_name, $child->l_name, $parent_id, $badgename);
                            }
                        }
                    }
                    else if(($badgetypes_id!=1) && ($child_house_id==$parent_house_id)){
                        //Parent assigned badges handle
                        if(($total_points >= $badgepoint) && ($badgeassign_status==true)){
                            Log::info('Total points and badge points are equal');
                            if($duplicate_badge_status == true){
                                $this->add_a_badge($data_array);
                                $this->notifyBadgeEarningToParent($child->f_name, $child->l_name, $parent_id, $badgename);
                            }
                        }
                    }


                }
                */

                // set score child performed
                $reward->score = $score_percentage;


                // create certificate
                $this->create_certificate($id, Auth::user()->id); // attempt_id, child_id

                $email = $userData->email;

                \Log::info('=== user email : ' . $email);
                \Log::info('=== user id : ' . $userData->id);
                \Log::info('=== lesson id : ' . $lesson->id);

                $meta = array(
                    'child_f_name'  => $child->f_name,
                    'child_l_name'  => $child->l_name,
                    'lesson'        => $lesson->title,
                    'lesson_points' => $quiz->value,
                );

                $receiver = $email;
                $subject  = $child->f_name." ".$child->l_name." passed the ".$lesson->title." lesson!";
                $message  = "Message";
                $template = 'lessonfinished';
                $token    = '';

                $mailSetting = MailSubscription::where('user_id', $userData->id)->first();

                $data=Childquizallocation::select('custom_message', 'sponsor_id')->where('child_id',$user_id)->where('quiz_id',$quiz_id)->first();

                if ($data->sponsor_id != '') {
                    $sponsor = User::select('user.f_name', 'user.l_name')->where('id', $data->sponsor_id)->first();
                    $sponsor_name = $sponsor->f_name . ' ' . $sponsor->l_name;

                    $this->notifyWhenChildPassAQuizWhichWasAssignedBySponsor(
                        [
                            'childFirstName' => $child->f_name,
                            'childLastName' => $child->l_name,
                            'lessonTitle' =>$lesson->title,
                            'quizValue' => $quiz->value,
                            'lessonId' => $lesson->id,
                            'userId' => $userData->id,
                            'sponsorName' => $sponsor_name
                        ]
                    );
                    $meta['sponsor'] = $sponsor_name;
                    $template = 'lessonfinishedbysponsor';
                    \Log::info("==== lesson assigned by sponsor send email to parent! start");


                    if (isset($mailSetting) && $mailSetting->lesson) {
                        $email = $this->send_email($receiver, $message, $subject, $template, $token, $meta);
                    }
                    \Log::info("==== lesson assigned by sponsor send email to parent! end");
                }else {
                    if (isset($mailSetting) && $mailSetting->lesson) {
                        $email = $this->send_email($receiver, $message, $subject, $template, $token, $meta);
                    }
                    $this->notifyWhenChildPassAQuizToParent([
                        'childFirstName' => $child->f_name,
                        'childLastName' => $child->l_name,
                        'lessonTitle' =>$lesson->title,
                        'quizValue' => $quiz->value,
                        'lessonId' => $lesson->id,
                        'userId' => $userData->id
                    ]);
                }


                // check mail send
                return Response::json([ 
                        'query_status' => 'success', 
                        'message' => 'reward created successfully', 
                        'data' => $reward,
                        'message_data' => $data
                ], 201); 
            } 

            $cqa = Childquizallocation::find($attempt->allocation_id);
            $cqa->update(['status' => 0]);

            if ($cqa->notify) {
                // notify lesson fail data
                $notifyData = [
                    'message' => trans('messages.notify_quiz_fail_attempt_to_parent', [
                        'first_name' => $child->f_name,
                        'last_name' => $child->l_name,
                        'lesson' => $lesson->title,
                    ]),
                    'type' => 'lesson',
                    'link' => '#/parent/lesson/' . $lesson->id,
                    'user_id' => $userData->id
                ];

                // Fire notify event
                event(new NotifyParent($notifyData));
            }

            return Response::json([ 
                    'query_status' => 'success', 
                    'message' => 'attempt failed', 
                    // 'data' => $attempt 
            ], 201); 
                
        } 
        // if couldn't update the record
        return Response::json([
                'query_status' => 'error',
                'message' => 'somthing went wrong 2', 
        ], 403);
			
        // return Response::json([
        // 	'error' => 'access_denied',
        // 	'message' => 'unauthorized access blocked'
        // ], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Response::json([
        	'error' => 'access_denied',
        	'message' => 'unauthorized access blocked'
        ], 401);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update_question(Request $request)
    {
        
        if($this->is_admin() or $this->is_parent())
		{
            $request = $request->all();
            //print_r($request); die;
			//  or ! $request['id']
			if( ! isset($request['answers']) or ! isset($request['question']) or ! isset($request['question_type']) or ! isset($request['control_type']) or ! isset($request['video_id']) )
			{
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'please provide all required fields'
                ], 422); 
            }
              
            if(isset($request['is_new']) and $request['is_new']=='true')
            {
                $question_new = Question::create([
                       'question'       => $request['question'], 
                       'video_id'       => $request['video_id'], 
                       'question_type'  => $request['question_type'], 
                       'control_type'   => $request['control_type'], 
                       'user_id'        => Auth::user()->id, 
                       'enable'         => 1
                    ]);
                
                if($question_new)
                {
                    
                    foreach (json_decode($request['answers']) as $answer)
                    {
                        
                        $answer->question_id = $question_new->id;
                        $answer->enable = 1; // 1;enable, 0:disable
                        
                        // $answer = Answer::create($request->all());
                        $answer = Answer::create(get_object_vars($answer));
                        
                    }
                    $answers = Answer::select("id","answer","is_correct","enable")->where('question_id',$question_new->id)->get();
        	        $question_new["answers"] = $answers;
                   
                    return Response::json([
        	        		'query_status' => 'success',
        	                'message' => 'New Question Created Successfully', 
        	                'question' => $question_new
        	            ], 201);
                }
            }
              
            if(! isset($request['id']) )
			{
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'please provide all required fields'
                ], 422); 
            }
            
            $question = Question::findOrFail($request['id']);
            $question->update([
                       'question'       => $request['question'], 
                       'video_id'       => $request['video_id'], 
                       'question_type'  => $request['question_type'], 
                       'control_type'   => $request['control_type'], 
                       'user_id'        => Auth::user()->id, 
                       'enable'         => $request['enable'], 
                    ]);
                
            if($question)
            {   
                foreach (json_decode($request['answers']) as $answer)
                {
                    $answer->question_id = $question->id;
                    $answer->enable = 1; // 1;enable, 0:disable
                    
                    $obj_answer = Answer::findOrFail($answer->id);
                    $answer = $obj_answer->update(get_object_vars($answer));
                }
                
                $answers = Answer::select("id","answer","is_correct","enable")->where('question_id',$question->id)->get();
        	    $question["answers"] = $answers;
                //print_r($request); die;
                return Response::json([
    	        		'query_status' => 'success',
    	                'message' => 'Question Updated Successfully', 
    	                'question' => $question
    	            ], 201);
            }
		}
        
        return Response::json([
        	'error' => 'access_denied'
        ], 401);
        
    }

    /**
     * Get the recommended lessons for parent.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function recommended()
    {
        // parent already used
        $attempted = Attempt::select('videos.id')
                    ->join('quizzes', 'quizzes.id', '=', 'attempts.quiz_id')
                    ->join('videos', 'videos.id', '=', 'quizzes.video_id')
                    ->where('quizzes.user_id', Auth::user()->id)                    
                    ->groupBy('videos.id')
                    ->get()->pluck('id')->toArray();
                    
        // most popular and parent not used
        $popular = Attempt::groupBy('videos.id')
                    ->join('quizzes', 'quizzes.id', '=', 'attempts.quiz_id')
                    ->join('videos', 'videos.id', '=', 'quizzes.video_id')
                    ->join('category', 'category.id', '=', 'videos.category_id')
                    ->whereNotIn('videos.id', $attempted)
                    ->where('videos.enable', 1)
                    ->where('videos.visibility', 'public')
                    ->orderBy('count', 'desc')
                    ->get(['videos.title', 'videos.url', 'videos.video_id as url_id', 'videos.video_ref', 'videos.id as video_id','category.name as category', DB::raw('count(videos.id) as count')])
                    ->take(6);
        // dd($attempted);
        if(!$popular->count()){
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);	
            }
            
        return Response::json([
                'query_status' => 'success',
                'data' => $popular
            ], 200);
        
    }


    public function getLessonsByChild($id)
    {
        $user = User::find($id);
        $badgeData = null;
        if($type == 1){
            $badgeData = $user->completedBadges;
        }
        if($type == 2){
            $badgeData = $user->badges;
        }
        if ($badgeData == null) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }
        return Response::json([
            'query_status' => 'success',
            'data' => $badgeData
        ], 200);
    }

    /**
     * Add flag.
     *     
     */
    public function addFlag(Request $request)
    {
        $request = $request->all();
        //print_r($request);
        $video = Video::find($request['video_id']);

        $video->video_flags()->attach(Auth::user()->id,['message' => $request['description'] ]);

        /*$user = Video::select('user.email','user.f_name','user.l_name')
                    ->join('user', 'user.id', '=', 'videos.user_id')                    
                    ->where('videos.id', $request['video_id'])
                    ->first();*/

        $user = User::select('f_name','l_name')->where('id','=',Auth::user()->id)->first();

        $admin = User::select('email')->where('role_id','=','1')->first();

        \Log::info('===.............................. email : ' . $admin->email);

        $receiver = $admin->email;
        $message = "";
        $subject = "e2l video flag notifiction";
        $template = "videoflag";
        $token = "";
        $meta = array(
                    'f_name'  => $user->f_name,
                    'l_name'  => $user->l_name,
                    'lesson'  => $video->title,
                    'message' => $request['description'],
                    'id' => $video->id
                );

        $email = $this->send_email($receiver, $message, $subject, $template, $token, $meta);

        //print_r($meta);
        return Response::json([
            'query_status' => 'success',
            'data' => $video
        ], 200);
    }


//    public function getratingsbyvideoid($id)
//    {
//        $data = Lessonsratings::select(\DB::raw("ROUND(rating_value, 1)"))->where('video_id',$id)->avg("rating_value");
//
//        if($data != null){
//            return Response::json([
//                'query_status' => 'success',
//                'data' => number_format($data, 1, '.', '')
//            ], 200);
//        }else{
//            return Response::json([
//                'query_status' => 'error',
//                'data' => 'data not found'
//            ], 404);
//        }
//
//
//    }

    public function addVideoRating(Request $request)
    {

        $restrictuser_forlesson_rating = Lessonsratings::select('id')->where('parent_id',Auth::user()->id)->where('video_id',$request['video_id'])->first();
        $avg_rating = Lessonsratings::select("rating_value")->where('video_id',$request['video_id'])->avg("rating_value");


        if($restrictuser_forlesson_rating == null) {
            $addvideo_result = Lessonsratings::create(
                [
                    'parent_id' => Auth::user()->id,
                    'video_id' => $request['video_id'],
                    'rating_value' => $request['ratevalue']
                ]);
            $avg_rating = Lessonsratings::select("rating_value")->where('video_id',$request['video_id'])->avg("rating_value");

            if ($addvideo_result != null) {
                return Response::json([
                    'query_status' => 'success',
                    'data' => number_format($avg_rating, 1,'.','')
                ], 200);
            } else {
                return Response::json([
                    'query_status' => 'error',
                ], 404);
            }
        }
        else{
            return Response::json([
                'query_status' => 'duplicate_record',
                'data' => number_format($avg_rating, 1,'.','')
            ], 200);
        }


    }

    public function restrict_parent_rating($video_id)
    {
        $restrictuser_forlesson_rating = Lessonsratings::select('id')->where('parent_id',Auth::user()->id)->where('video_id',$video_id)->first();

        if($restrictuser_forlesson_rating !=null){
            return Response::json([
                'query_status' => 'duplicate_record',
            ], 200);
        }else{
            return Response::json([
                'query_status' => 'success',
            ], 200);
        }
    }

    /**
     * Delete flag.
     *     
     */
    public function deleteFlag(Request $request)
    {
        $request = $request->all();
        //print_r($request);
        $video = Video::find($request['video_id']);

        $video->video_flags()->detach(Auth::user()->id, ['video_id' => $request['video_id'] ]);

        // //print_r($video);
        return Response::json([
            'query_status' => 'success',
            'data' => $video
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
