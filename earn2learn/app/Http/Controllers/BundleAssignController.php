<?php

namespace App\Http\Controllers;

use App\Badge;
use App\Bundle;
use App\ChildHouse;
use App\Childquizallocation;
use App\Traits\NotificationTrait;
use App\User;
use App\Http\Requests;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Response;
use Session;
use App\Events\NotifyChild;


class BundleAssignController extends Controller
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
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
//        print_r('hit here'); die;
        $request = $request->all();
        if (!$request['childId'] or
            !$request['bundleId']
        ) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        } else {
            $user = User::find($request['childId']);
            $bundle = Bundle::find($request['bundleId']);

            //get quiz ids for bundle
            $quiz_ids = DB::table('bundle_quizzes')
                            ->select('quiz_id')
                            ->where('bundle_quizzes.bundle_id', '=', $request['bundleId'])
                            ->get();

            //print_r($quiz_ids);

            if(!empty($quiz_ids))
            {
                foreach($quiz_ids as $quiz_id)
                {
                    $child_quiz_count = DB::table('childquizallocations')
                                    ->select('childquizallocations.id')
                                    ->where('childquizallocations.child_id', '=', $request['childId'])
                                    ->where('childquizallocations.quiz_id', '=', $quiz_id->quiz_id)
                                    ->count();
                    //print_r($child_quiz_count);

                    if($child_quiz_count == 0)
                    {
                        $child_quiz_arr = array();

                        $child_quiz_arr['child_id'] = $request['childId'];
                        $child_quiz_arr['quiz_id'] = $quiz_id->quiz_id;
                        $child_quiz_arr['enable'] = '1';
                        $child_quiz_arr['notify'] = true;
                        $child_quiz_arr['pass_percentage'] = env('PASS_PERCENTAGE', 100);
                        $child_quiz_arr['max_number_of_attempts'] = env('MAX_NUMBER_OF_ATTEMPTS', 3);

                        $insert_obj = Childquizallocation::create($child_quiz_arr);
                        $childquizallocation_id = $insert_obj->id;

                       // print_r('11111');
                        //print_r($insert_obj);
                    }
                    else{
                        //$child_quiz_allocation_id = DB::table('childquizallocations')
                        $insert_obj = Childquizallocation::
                            where('childquizallocations.quiz_id', '=', $quiz_id->quiz_id)
                            ->where('childquizallocations.child_id', '=', $request['childId'])
                            ->first();

                        $insert_obj->update(['enable' => 1]);
                        $childquizallocation_id = $insert_obj->id;

                        //print_r('22222--');
                        //print_r($insert_obj->id);
                    }
                    //print_r($childquizallocation_id);
                    $child_quiz_allocation_arr = array();

                    $child_quiz_allocation_arr['childquizallocation_id'] = $childquizallocation_id;
                    $child_quiz_allocation_arr['bundle_id'] = $request['bundleId'];

                    $bundle->child_quiz_allocations()->attach([$childquizallocation_id]);


                }
            }


            $pivotArray = [];
            if (isset($request['sponsor_id']) && $request['sponsor_id'] != '') {
                $pivotArray['sponsor_id'] = $request['sponsor_id'];
            }

            $returnData = $user->bundles()->save($bundle, $pivotArray);

            $this->notifyWhenNewLessonBundleAssignToChild(['bundleName' => $bundle->name, 'childId' => $request['childId']]);

            $child = User::select('user.f_name', 'user.l_name')->where('id', $request['childId'])->first();
            if (isset($request['sponsor_id']) && $request['sponsor_id'] != '') {
                $sponsor = User::select('user.f_name', 'user.l_name')->where('id', $request['sponsor_id'])->first();
                $parentId = ChildHouse::select('user.id')
                    ->join('house', 'house.id', '=', 'childhouses.house_id')
                    ->join('user', 'user.id', '=', 'house.user_id')
                    ->where('childhouses.child_id', $request['childId'])
                    ->first()->id;
                $this->notifyChildSponsoringToParent($child->f_name, $child->l_name,
                    $sponsor->f_name . ' ' . $sponsor->l_name, $parentId);
            }

            return Response::json([
                'query_status' => 'success',
                'message' => 'Record Updated Successfully',
                'data' => $returnData
            ], 200);
        }

    }

    /**
     *
     * remove assign bundle from child
     *
     * @param $id
     * @param Request $request
     * @return mixed
     *
     */
    public function update($id, Request $request)
    {
        $request = $request->all();
        $bundle = Bundle::find($id);
        $bundle->users()->detach([$request['childId']]);

        $childquizallocationIds = $bundle->child_quiz_allocations()
            ->where('child_id', $request['childId'])->get()->pluck('id')->toArray();

        if (!empty($childquizallocationIds)) {
            $bundle->child_quiz_allocations()->detach($childquizallocationIds);
        }else {
            \Log::info("==== request " . print_r($request, true));
            \Log::info("==== child quiz allocation ids are empty!");
        }

        if (empty($bundle)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }


        if (!$request['bundleId']) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }
        return Response::json([
            'query_status' => 'success',
            'message' => 'Record Updated Successfully',
            'data' => $bundle
        ], 200);

    }


    /**
     *
     * get children by bundle id
     *
     * @param $badge_id
     * @return mixed
     */

    public function getChildrenByBundleId($bundle_id)
    {

        $bundle = Bundle::find($bundle_id);
        $children = $bundle->users;

        if (!$children->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $children
        ], 200);
    }


    /**
     *
     * get assign bundle by child id
     *
     * @param $childId
     * @return mixed
     */
    public function getChildAssignBundles($childId)
    {

        //$b = Bundle::find(5)
        //$b->child_quiz_allocations()->with('quiz.video')->where('child_id', 56)->where('enable',

        $user = User::find($childId);

        $bundles = $user->bundles()->where('enable', 1)->get();

        $bundleArray = [];

        foreach ($bundles as $bundle) {

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

            // if quiz allocation is not zero add this object
            if(count($childQuizAllocation)) {
                $bundleArray[] = $bundle;
            }
        }

        if (!$bundles->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $bundleArray
        ], 200);
    }

}
