<?php

namespace App\Http\Controllers;

use App\Bundle;
use App\ChildGiftCard;
use App\ChildHouse;
use App\Childquizallocation;
use App\HomeGiftCard;
use App\HouseSponsor;
use App\Http\Requests;
use App\Traits\NotificationTrait;
use App\User;
use App\Video;
use App\Quiz;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Scalar\String_;
use Response;
use Session;
use Illuminate\Support\Facades\DB;

class BundleController extends Controller
{
    use NotificationTrait;

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = NULL)
    {
        return Response::json([
            'error' => 'access_denied',
            'message' => 'unauthorized access blocked'
        ], 401);
    }

    /**
     * get all badges
     *
     * @return mixed
     *
     */
    public function getAllBundles($user_id)
    {
        $bundles = Bundle::latest()
//            ->with('quizzes')
            ->with('quizzes.video')
            ->with('child_quiz_allocations.quiz.video')
            ->select('bundle.*')
            ->where('user_id', $user_id)
            ->where('enable', 1)
            ->get();

//        $user = User::find($user_id);

//        $bundles = $user->bundles()->with('child_quiz_allocations.quiz.video');

        foreach ($bundles as $bundle) {

            $childQuizAllocation = $bundle
                ->child_quiz_allocations()
                ->with('quiz.video')
                ->get();

            if (!isset($bundle)) {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
            }

            $completedLessons = 0;
            foreach($childQuizAllocation as $cqa) {
                $attempt = $cqa->attempts()->where('status', 2)->where('is_passed', 1)->get();
                $cqa->completed = false;
                if ($attempt->count()) {
                    $cqa->completed = true;
                    $completedLessons++;
                }
            }

            $completion = 0;
            if ($childQuizAllocation->count()) {
                $completion = ($completedLessons/$childQuizAllocation->count()) * 100;
            }

            $bundle->completion = $completion;
            $bundle->child_quiz_allocations = $childQuizAllocation;
        }

        if (!$bundles->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $bundles
        ], 200);
    }

    /**
     *
     * get all system badges which admin created.
     *
     * @return mixed
     */

    public function getBundleByTypeId($type_id = null)
    {
        $badges = Badge::latest()
            ->select('bundle.*')
            ->where('bundle.bundle_types_id', '=', $type_id)
            ->get();

        if (!$badges->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $badges
        ], 200);
    }

    /**
     * get bundle quizzes by id
     *
     * @return bundle quiz list
     */

    public function getBundleQuizzes($id = null)
    {
        $bundle = Bundle::find($id);
        $quizzes = $bundle->quizzes;

        if (!$quizzes->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $quizzes
        ], 200);
    }


    /**
     * get bundle lesson by id
     *
     * @return Custom bundle list
     */

    public function getBundleLesson($id = null)
    {
        $bundle = Bundle::find($id);
        $videos = $bundle->videos;
        
        if (!$videos->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $videos
        ], 200);
    }

    public function getBundGiftCard($id = null)
    {
        $bundle = Bundle::find($id);
        //print_r($bundle->gift_card_id);
       // $videos = $bundle->videos;

        if ($bundle->gift_card_id == '') {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'gift_card_id' => $bundle->gift_card_id,
            'amount' => $bundle->amount
        ], 200);
    }

    /**
     *
     * @param $allocation_id
     * @return mixed
     */

    /*public function getBadgesByAllocationId($allocation_id)
    {
        $badges = Badge::latest()
            ->select('badges.*')
            ->where('allocation_id', '=', $allocation_id)
            ->where('enable', '=', 1)
            ->get();

        if (!$badges->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $badges
        ], 200);
    }

*/
    public function getBundleById($bundle_id)
    {
        $bundle = Bundle::latest()
            ->select('bundle.*')
            ->where('bundle.id', '=', $bundle_id)
            ->first();

        if (!$bundle->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $bundle
        ], 200);
    }


    /**
     * @param $points
     * @return mixed
     */

    public function isExistedBundleLesson($bundleId, $lessonId)
    {
        $bundle = Bundle::find($bundleId);
        $lessons = $bundle->videos;

            if(count($lessons) != 0){
                foreach ($lessons as $lesson){
                    return ($lesson->id != $lessonId);
                }
            }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $request = $request->all();
        //print_r($request); die;

        $saveData = null;
        if (
            !$request['name']
            //or !$request['points']
        ) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }
        $saveData['name'] = $request['name'];
        //$saveData['points'] = $request['points'];
        //$saveData['average_marks'] = $request['average_marks'];
        //$saveData['dollar_amount'] = $request['dollar_amount'];
        $saveData['bundle_types_id'] = $request['bundle_types_id'];
        $saveData['user_id'] = Auth::user()->id;



        if(!empty($request['bundleCard']) )
        {
            //foreach (json_decode($request['bundleCard']) as $key => $value){

                //$saveData['gift_card_id'] = $key;
                
            //}
        }

        //print_r($saveData); die;

        $saveData['gift_card_id'] = $request['bundleCard'];
        $saveData['amount'] = $request['amount'];
        $saveData['gift_card_image'] = $request['image_url'];
        //print_r($saveData); die;

//        $homeGiftCard = HomeGiftCard::find(1);

//        $saveData['homegiftcards_id'] = $homeGiftCard->id;

        $quizzes = $request['bundleLessons'];

        $bundle_check= \Validator::make($request,[
                'name' =>'unique:bundle,name,id'
                ]);

        $bundle_status = $bundle_check->passes();

        //print_r($bundle_status);
        //die;

        if($bundle_status == true){
            $bundle = Bundle::create($saveData);

            if(!empty($quizzes) ){
                foreach (json_decode($quizzes) as $key => $value){
                    if($value)
                    {
                        $quiz = Quiz::find($key);
                        $bundle->quizzes()->save($quiz);
                    }
                    
                }
            }
            return Response::json([
                'query_status' => 'success',
                'message' => ' Bundle Created Successfully',
                'data' => $bundle
            ], 201);
        }
        else
        {
            return Response::json([
                    'query_status' => 'error',
                    'message' => 'This Bundle name already exist.',
                    'data' => 'A Duplicate Bundle'
                ], 201);
        }        

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        \Log::info("=== update lesson bundle 1");

        $bundle = Bundle::find($id);
        if (empty($bundle)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $request = $request->all();
        //print_r($request); die;

        if (!$request['name'] ) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }

        $bundle_check = \Validator::make($request, [
                'name' => 'unique:bundle,name,' . $id
            ]);

        $bundle_status = $bundle_check->passes();
        // print_r($bundle_status);
        // die;

        if($bundle_status != 'true')
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'This Bundle name already exist.'
            ], 201);
        }

        $saveData['name'] = $request['name'];
        //$saveData['points'] = $request['points'];
       // $saveData['average_marks'] = $request['average_marks'];
        //$saveData['dollar_amount'] = $request['dollar_amount'];
        $saveData['bundle_types_id'] = $request['bundle_types_id'];

        if(!empty($request['giftCardValue']))
        {
            $giftCardValue = json_decode($request['giftCardValue']);

            $saveData['amount'] = $giftCardValue->amount;
            if(!empty($giftCardValue->image_url))
            {
                $saveData['gift_card_image'] = $giftCardValue->image_url;
            }
            $saveData['gift_card_id'] = $giftCardValue->cardId;
        }

//        $saveData['user_id'] = Auth::user()->id;

        $quiz_ids = array();
        if(!empty($request['bundleLessons']))
        {
            $lessons = json_decode( $request['bundleLessons'] );

            foreach($lessons as $quiz_id => $bool)
            {
                if ($bool)
                {
                    array_push($quiz_ids,$quiz_id );
                }
            }
            \Log::info('==============='.print_r($quiz_ids,true) );
            $bundle->quizzes()->detach();
            $bundle->quizzes()->sync($quiz_ids);
        }

        //check bundle assinee table
        $bundle_assignees = DB::table('bundle_assignees')
                            ->select('bundle_assignees.id','bundle_assignees.user_id as child_id')
                            ->where('bundle_assignees.bundle_id', '=', $id)
                            ->get();

       // print_r($quiz_ids); die;

        $bundle->child_quiz_allocations()->detach();

        foreach($bundle_assignees as $bundle_assignee)
        {
            if(!empty($quiz_ids))
            {
                foreach($quiz_ids as $quiz_id)
                {
                    $child_quiz_count = DB::table('childquizallocations')
                        ->select('childquizallocations.id')
                        ->where('childquizallocations.child_id', '=', $bundle_assignee->child_id)
                        ->where('childquizallocations.quiz_id', '=', $quiz_id)
                        ->count();
                    //print_r($child_quiz_count);

                    if($child_quiz_count == 0)
                    {
                        $child_quiz_arr = array();

                        $child_quiz_arr['child_id'] = $bundle_assignee->child_id;
                        $child_quiz_arr['quiz_id'] = $quiz_id;
                        $child_quiz_arr['enable'] = '1';
                        $child_quiz_arr['notify'] = true;
                        $child_quiz_arr['pass_percentage'] = env('PASS_PERCENTAGE');
                        $child_quiz_arr['max_number_of_attempts'] = env('MAX_NUMBER_OF_ATTEMPTS');

                        $insert_obj = Childquizallocation::create($child_quiz_arr);
                        $childquizallocation_id = $insert_obj->id;

                        // print_r('11111');
                        //print_r($insert_obj);
                    }
                    else{
                        //$child_quiz_allocation_id = DB::table('childquizallocations')
                        $insert_obj = Childquizallocation::
                        where('childquizallocations.quiz_id', '=', $quiz_id)
                            ->where('childquizallocations.child_id', '=', $bundle_assignee->child_id)
                            ->first();

                        $insert_obj->update(['enable' => 1]);
                        $childquizallocation_id = $insert_obj->id;

                        //print_r('22222--');
                        //print_r($insert_obj->id);
                    }
                    //print_r($childquizallocation_id);
                    $child_quiz_allocation_arr = array();

                    $child_quiz_allocation_arr['childquizallocation_id'] = $childquizallocation_id;
                    $child_quiz_allocation_arr['bundle_id'] = $id;

                    $bundle->child_quiz_allocations()->attach([$childquizallocation_id]);


                }
            }
        }



        //print_r($quiz_ids); die;

        /*if(count($bundle_assignees) > 0)
        {
            $bundle->child_quiz_allocations()->detach();
            $bundle->child_quiz_allocations()->sync($quiz_ids);
        }*/


        $bundle->update($saveData);

        return Response::json([
            'query_status' => 'success',
            'message' => 'Record Updated Successfully',
            'data' => $bundle
        ], 200);

    }

    /**
     * Remove the specified resource from bundle.
     *
     * @param  int  $id
     *
     * @return Response
     */

    public function deleteBundle($id)
    {
        //print_r($id);
        $bundle = Bundle::find($id);
//        print_r($bundle->users()->count());
//        die;
        if($bundle->users()->count() == 0)
        {
            if (empty($bundle)) {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
            }

            //$bundle->videos()->detach();
            //$bundle->delete($id);
            $bundle->update(['enable' => 0]);

            return Response::json([
                'query_status' => 'success',
                'message' => 'Record Deleted Successfully',
                'data' => $bundle
            ], 200);
        }
        else
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'bundle is already assigned'
            ], 404);
        }

        /*if (empty($bundle)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $bundle->videos()->detach();
        $bundle->delete($id);

        return Response::json([
            'query_status' => 'success',
            'message' => 'Record Deleted Successfully',
            'data' => $bundle
        ], 200);*/


    }


    public function remove($id, Request $request)
    {

        $bundle = Bundle::find($id)->videos()->detach();

        if (empty($bundle)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'message' => 'Record Updated Successfully',
            'data' => $bundle
        ], 200);


    }

    /**
     * child assigned badges checks on parent view
     *
     * @param Request $request
     * @return mixed
     */
    /*public function getChildAchieveBadges(Request $request)
    {
        $request = $request->all();
        $request['totalPoints'];
        $allAchiveBadges = collect([]);;
        if (!$request['totalPoints'] or
            !$request['childId']
        ) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }
        $points = (int)$request['totalPoints'];
        $allAchiveBadges = Badge::where('badges.badge_types_id', '=',1)
            ->where('badges.points','<=' , $points )
            ->orderBy('badges.points', 'ASC')
            ->get();
        if (!$allAchiveBadges->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
        $user = User::find($request['childId']);
        $parentAssignBadges = $user->badges;

        if($parentAssignBadges->count() != 0){
            $key = "points";
            $allAchiveBadges = $this->duplicateRemover($allAchiveBadges,$parentAssignBadges ,$key);
        }
        $sorted = $allAchiveBadges->sortBy('points');
        $sorted->values()->all();
        return Response::json([
            'query_status' => 'success',
            'data' => $sorted
        ], 200);
    }*/

    /**
     * Retursn all bundles that are accessible by the sponsors
     * @return mixed
     */
    public function getAllBundlesForSponsor() {

        $userId = Auth::user()->id;

        // All house ids that sponsor has been accepted
        $userIds = HouseSponsor::select('house.user_id')->join('house', 'house_sponsors.house_id', '=', 'house.id')->where('house_sponsors.user_id', $userId)->where('house_sponsors.enable', 1)->get()->pluck('user_id')->toArray();


        if (empty($userIds)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Data not found'
            ], 404);
        }

        $bundles = Bundle::latest()
            ->select('bundle.*', 'house.id as house_id', 'house.name as house_name', 'user.f_name', 'user.l_name')
            ->with('quizzes.video')
            ->with('child_quiz_allocations.quiz.video')
            ->join('house', 'bundle.user_id', '=','house.user_id')
            ->join('user', 'bundle.user_id', '=','user.id')
            ->whereIn('bundle.user_id', $userIds)
            ->where('bundle.enable', 1)
            ->get();


        foreach ($bundles as $bundle) {

            $childQuizAllocation = $bundle
                ->child_quiz_allocations()
                ->with('quiz.video')
                ->get();

            if (!isset($bundle)) {
                return Response::json([
                    'query_status' => 'error',
                    'message' => 'data not found'
                ], 404);
            }

            $completedLessons = 0;
            foreach($childQuizAllocation as $cqa) {
                $attempt = $cqa->attempts()->where('status', 2)->where('is_passed', 1)->get();
                $cqa->completed = false;
                if ($attempt->count()) {
                    $cqa->completed = true;
                    $completedLessons++;
                }
            }

            $completion = 0;
            if ($childQuizAllocation->count()) {
                $completion = ($completedLessons/$childQuizAllocation->count()) * 100;
            }

            $bundle->completion = $completion;
            $bundle->child_quiz_allocations = $childQuizAllocation;
        }

        if (!$bundles->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $bundles
        ], 200);
    }

    /**
     * Returns a bundle information which is assigned to current logged in child
     * @param $id
     * @return mixed
     */
    public function getBundleInfoForChild($id) {

//        $bundle = Bundle::where('id', $id)
//            ->where('child_id', Auth::user()->id)
//            ->first();

        $user = User::find(Auth::user()->id);
        $bundle = $user->bundles()->where('bundle.id', $id)->first();



        $childQuizAllocation = $bundle
            ->child_quiz_allocations()->where('child_id', $user->id)
            ->with('quiz.video')
            ->get();

        if (!isset($bundle)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $completedLessons = 0;
        foreach($childQuizAllocation as $cqa) {
            if(isset($cqa->quiz->video)  && $cqa->quiz->video->video_ref == 'ted'){
                $video_thumb = $this->getTedVideoThumb($cqa->quiz->video->video_id);
                $cqa->quiz->video->thumb=$video_thumb;
            }
            $attempt = $cqa->attempts()->where('status', 2)->where('is_passed', 1)->get();
            $cqa->completed = false;
            if ($attempt->count()) {
                $cqa->completed = true;
                $completedLessons++;
            }
        }

        $completion = 0;
        if ($childQuizAllocation->count()) {
            $completion = ($completedLessons/$childQuizAllocation->count()) * 100;
        }

        $bundle->completion = $completion;

        //check already requested the gift card
        $bundle->giftcard_requested = false;
        if ($bundle->completion == 100) {

            $count = DB::table('homegiftcards')
                ->join('childgiftcards', 'childgiftcards.housecard_id', '=', 'homegiftcards.id')
                ->where('childgiftcards.bundle_id', $bundle->id)
                ->where('childgiftcards.child_id', $user->id)->count();
            if ($count) {
                $bundle->giftcard_requested = true;
            }

        }

        $bundle->child_quiz_allocations = $childQuizAllocation;

        return Response::json([
            'query_status' => 'success',
            'data' => $bundle
        ], 200);
    }

    /**
     * Checks bundle completion for particular child
     * @param $id
     * @return mixed
     */
    public function checkBundleCompletion($id) {

        \Log::info("==== check bundle completion action");
        $user = User::find(Auth::user()->id);
        $bundle = $user->bundles()->where('bundle.id', $id)->first();

        $childQuizAllocation = $bundle
            ->child_quiz_allocations()->where('child_id', $user->id)
            ->get();

        \Log::info("==== after child_quiz_allocations()");

        if (!isset($bundle)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $completedLessons = 0;
        foreach($childQuizAllocation as $cqa) {
            $attempt = $cqa->attempts()->where('status', 2)->where('is_passed', 1)->get();
            $cqa->completed = false;
            if ($attempt->count()) {
                $cqa->completed = true;
                $completedLessons++;
            }
        }

        $completion = 0;
        if ($childQuizAllocation->count()) {
            $completion = ($completedLessons/$childQuizAllocation->count()) * 100;
        }

        $bundle->completion = $completion;
        $bundle->child_quiz_allocations = $childQuizAllocation;

        if ($bundle->completion == 100) {
            //send notification
            $parent = ChildHouse::select('user.id', 'user.email')
                ->join('house', 'house.id', '=', 'childhouses.house_id')
                ->join('user', 'user.id', '=', 'house.user_id')
                ->where('childhouses.child_id', $user->id)
                ->first();

            $parentId = $parent->id;
            $parentEmail = $parent->email;

            if (isset($bundle->gift_card_id) && $bundle->gift_card_id != '') {

                // Get bundle assign record to check sponsor details
                $bundleAssign = $bundle->users()->where('user.id', $user->id)->first();

                \Log::info("==== bundle assign : " . print_r($bundleAssign->toArray(), true));

                $sponsor_id = null;
                if (isset($bundleAssign) && !empty($bundleAssign)) {
                    if (isset($bundleAssign->pivot->sponsor_id) && $bundleAssign->pivot->sponsor_id != '') {
                        \Log::info("==== not empty!");
                        $sponsor_id = $bundleAssign->pivot->sponsor_id;
                    }
                }

                \Log::info("==== bundle gift card request!");

                DB::beginTransaction();

                try {

                    // Create housegiftcard with enable 1 and bundle_id
                    $childHouse = ChildHouse::where('child_id', $user->id)->select('house_id')->first();
                    // Create hidden homegiftcard
                    $homeGiftCard = HomeGiftCard::create([
                        'card_id' => $bundle->gift_card_id,
                        'child_id' => $user->id,
                        'house_id' => isset($childHouse->house_id)? $childHouse->house_id : null,
                        'points' => $bundle->amount,
                        'enable' => 1,
                        'bundle_id' => $bundle->id,
                        'sponsor_id'=> $sponsor_id,
                    ]);

                    //todo create childgiftcards with bundle_id
                    $childGiftCard = ChildGiftCard::create([
                        'housecard_id' => $homeGiftCard->id,
                        'house_id' => isset($childHouse->house_id)? $childHouse->house_id : null,
                        'child_id' => $user->id,
                        'enable' => 1,
                        'bundle_id' => $bundle->id,
                        'requested_type' => 1,
                        'sponsor_id'=> $sponsor_id,
                    ]);

                    DB::commit();
                    // all good
                } catch (\Exception $e) {
                    DB::rollback();
                }

                $this->notifyWhenChildPassALessonBundleWithGiftCardToParent([
                    'childFirstName' => $user->f_name,
                    'childLastName' => $user->l_name,
                    'amount' => $bundle->amount,
                    'giftCardName' => $bundle->gift_card_id,
                    'bundleName' => $bundle->name,
                    'userId' => $parentId,
                ]);

                if (isset($sponsor_id) && !empty($sponsor_id)) {
                    $this->notifyWhenChildPassALessonBundleWithGiftCardToParent([
                        'childFirstName' => $user->f_name,
                        'childLastName' => $user->l_name,
                        'amount' => $bundle->amount,
                        'giftCardName' => $bundle->gift_card_id,
                        'bundleName' => $bundle->name,
                        'userId' => $sponsor_id,
                    ]);
                }

                $receiver = $parentEmail;
                $subject  = $user->f_name ." ".$user->l_name." completed the ".$bundle->name." lesson bundle!";
                $message  = "Message";
                $template = 'lesson_bundle_completed_with_gift_card';
                $token    = '';

                $meta = array(
                    'child_f_name'  => $user->f_name,
                    'child_l_name'  => $user->l_name,
                    'lesson_bundle' => $bundle->name,
                    'gift_card_amount' => $bundle->amount,
                    'gift_card_name' => $bundle->gift_card_id,
                );

                $this->send_email($receiver, $message, $subject, $template, $token, $meta);
                \Log::info("=== send lesson bundle gift card email to parent");

            }else {
                $this->notifyWhenChildPassALessonBundleToParent([
                    'childFirstName' => $user->f_name,
                    'childLastName' => $user->l_name,
                    'bundleName' => $bundle->name,
                    'userId' => $parentId,
                ]);

                $receiver = $parentEmail;
                $subject  = $user->f_name ." ".$user->l_name." completed the ".$bundle->name." lesson bundle!";
                $message  = "Message";
                $template = 'lesson_bundle_completed';
                $token    = '';

                $meta = array(
                    'child_f_name'  => $user->f_name,
                    'child_l_name'  => $user->l_name,
                    'lesson_bundle' => $bundle->name,
                );

                $this->send_email($receiver, $message, $subject, $template, $token, $meta);
                \Log::info("=== send lesson bundle no gift card email to parent");
            }
        }

        return Response::json([
            'query_status' => 'success',
            'data' => ['id'=> $bundle->id, 'completion' => $bundle->completion]
        ], 200);
    }

    /**
     * Checks bundle completion for particular child
     * @param Request $request
     * @return mixed
     * @internal param $id
     */
    public function requestGiftCardFromLessonBundle(Request $request) {

        $request = $request->all();

        if (!isset($request['id']) && empty($request['id'] )) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }

        $user = User::find(Auth::user()->id);
        $bundle = $user->bundles()->where('bundle.id', $request['id'])->first();

        if (!isset($bundle)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $childQuizAllocation = $bundle
            ->child_quiz_allocations()->where('child_id', $user->id)
            ->get();

        $completedLessons = 0;
        foreach($childQuizAllocation as $cqa) {
            $attempt = $cqa->attempts()->where('status', 2)->where('is_passed', 1)->get();
            $cqa->completed = false;
            if ($attempt->count()) {
                $cqa->completed = true;
                $completedLessons++;
            }
        }

        $completion = 0;
        if ($childQuizAllocation->count()) {
            $completion = ($completedLessons/$childQuizAllocation->count()) * 100;
        }

        $bundle->completion = $completion;
        $bundle->child_quiz_allocations = $childQuizAllocation;
        $count = 0;
        $isRequested = false;
        if ($bundle->completion == 100) {

            $count = DB::table('homegiftcards')
                ->join('childgiftcards', 'childgiftcards.housecard_id', '=', 'homegiftcards.id')
                ->where('childgiftcards.bundle_id', $bundle->id)
                ->where('childgiftcards.child_id', $user->id)->count();

            if (isset($bundle->gift_card_id) && $bundle->gift_card_id != '' && !$count) {

                // Get bundle assign record to check sponsor details
                $bundleAssign = $bundle->users()->where('user.id', $user->id)->first();

                \Log::info("==== bundle assign : " . print_r($bundleAssign->toArray(), true));

                $sponsor_id = null;
                if (isset($bundleAssign) && !empty($bundleAssign)) {
                    if (isset($bundleAssign->pivot->sponsor_id) && $bundleAssign->pivot->sponsor_id != '') {
                        \Log::info("==== not empty!");
                        $sponsor_id = $bundleAssign->pivot->sponsor_id;
                    }
                }


                //send notification
                $parent = ChildHouse::select('user.id', 'user.email')
                    ->join('house', 'house.id', '=', 'childhouses.house_id')
                    ->join('user', 'user.id', '=', 'house.user_id')
                    ->where('childhouses.child_id', $user->id)
                    ->first();

                $parentId = $parent->id;
                $parentEmail = $parent->email;

                DB::beginTransaction();

                try {

                    // Create housegiftcard with enable 1 and bundle_id
                    $childHouse = ChildHouse::where('child_id', $user->id)->select('house_id')->first();
                    // Create hidden homegiftcard
                    $homeGiftCard = HomeGiftCard::create([
                        'card_id' => $bundle->gift_card_id,
                        'child_id' => $user->id,
                        'house_id' => isset($childHouse->house_id)? $childHouse->house_id : null,
                        'points' => $bundle->amount,
                        'enable' => 1,
                        'bundle_id' => $bundle->id,
                        'sponsor_id'=> $sponsor_id,
                    ]);

                    //todo create childgiftcards with bundle_id
                    $childGiftCard = ChildGiftCard::create([
                        'housecard_id' => $homeGiftCard->id,
                        'house_id' => isset($childHouse->house_id)? $childHouse->house_id : null,
                        'child_id' => $user->id,
                        'enable' => 1,
                        'bundle_id' => $bundle->id,
                        'requested_type' => 1,
                        'sponsor_id'=> $sponsor_id,
                    ]);

                    DB::commit();

                    // all good
                } catch (\Exception $e) {
                    DB::rollback();
                }

                $this->notifyWhenChildPassALessonBundleWithGiftCardToParent([
                    'childFirstName' => $user->f_name,
                    'childLastName' => $user->l_name,
                    'amount' => $bundle->amount,
                    'giftCardName' => $bundle->gift_card_id,
                    'bundleName' => $bundle->name,
                    'userId' => $parentId,
                ]);

                if (isset($sponsor_id) && !empty($sponsor_id)) {
                    $this->notifyWhenChildPassALessonBundleWithGiftCardToParent([
                        'childFirstName' => $user->f_name,
                        'childLastName' => $user->l_name,
                        'amount' => $bundle->amount,
                        'giftCardName' => $bundle->gift_card_id,
                        'bundleName' => $bundle->name,
                        'userId' => $sponsor_id,
                    ]);
                }

                $receiver = $parentEmail;
                $subject  = $user->f_name ." ".$user->l_name." completed the ".$bundle->name." lesson bundle!";
                $message  = "Message";
                $template = 'lesson_bundle_completed_with_gift_card';
                $token    = '';

                $meta = array(
                    'child_f_name'  => $user->f_name,
                    'child_l_name'  => $user->l_name,
                    'lesson_bundle' => $bundle->name,
                    'gift_card_amount' => $bundle->amount,
                    'gift_card_name' => $bundle->gift_card_id,
                );

                //send email to parent saying lesson bundle completion with gift card
                $this->send_email($receiver, $message, $subject, $template, $token, $meta);
            }
        }

        return Response::json([
            'query_status' => 'success',
            'data' => [
                'id'=> $bundle->id,
                'completion' => $bundle->completion,
                'count' => $count,
                'isRequested' => $isRequested
                ]
        ], 200);
    }

    public function getBundleCompletion($bundleId='')
    {
        $bundle = Bundle::find($bundleId);

        $childQuizAllocation = $bundle
            ->child_quiz_allocations()
            ->count();

        return Response::json([
            'query_status' => 'success',
            'allocations' => $childQuizAllocation
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
