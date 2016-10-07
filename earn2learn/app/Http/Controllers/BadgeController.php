<?php

namespace App\Http\Controllers;

use App\Badge;
use App\Badgecompleted;
use App\User;
use App\Video;
use App\Http\Requests;
use Auth;
use Carbon\Carbon;
use Guzzle\Common\Collection;
use Illuminate\Http\Request;
use PhpParser\Node\Scalar\String_;
use Response;
use Session;
use Illuminate\Support\Facades\DB;
use Log;


class BadgeController extends Controller
{
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
     * @return mixed
     */
    public function getAllBadgeType()
    {
        $badgeType = BadgeType::latest()
            ->select('badge_types.*')
            ->get();

        if (!$badgeType->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $badgeType
        ], 200);
    }

    /**
     * get all enable badges
     *
     * @return mixed
     *
     */
    public function getAllBadges()
    {
        $badges = Badge::latest()
            ->select('badges.*','user.f_name','user.l_name','user.role_id')
            ->join('user', 'user.id', '=', 'badges.user_id')
            ->where('badges.enable', '=', 1)
            ->get();
        $i = 0;
        $badgesData = [];
         foreach ($badges as $badge){
                $badgesData[$i]['id'] = $badge->id;
                $badgesData[$i]['name'] = $badge->name;
                $badgesData[$i]['description'] = $badge->description;
                $badgesData[$i]['badge_types_id'] = $badge->badge_types_id;
                $badgesData[$i]['badge_image'] = $badge->badge_image;
                $badgesData[$i]['lessons'] = $badge->lessons;
                $badgesData[$i]['user_fname'] = $badge->f_name;
                $badgesData[$i]['user_lname'] = $badge->l_name;
                $badgesData[$i]['user_role'] = $badge->role_ids;
             $i++;
            }

        if (count($badgesData) == 0) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $badgesData
        ], 200);
    }

    /**
     *
     * get all system badges which admin created.
     *
     * @return mixed
     */

    public function getBadgesByTypeId($type_id = null)
    {
        $badges = Badge::latest()
            ->select('badges.*')
            ->where('badges.badge_types_id', '=', $type_id)
            ->where('badges.enable', '=', 1)
            ->get();

        $i = 0;
        $badgesData =[];
        foreach ($badges as $badge){
            $badgesData[$i]['id'] = $badge->id;
            $badgesData[$i]['name'] = $badge->name;
            $badgesData[$i]['description'] = $badge->description;
            $badgesData[$i]['badge_types_id'] = $badge->badge_types_id;
            $badgesData[$i]['badge_image'] = $badge->badge_image;
            $badgesData[$i]['lessons'] = $badge->lessons;
            $i++;
        }

        if (count($badgesData) == 0) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $badgesData
        ], 200);
    }

    /**
     * get all badge by user
     *
     * @return Custom badge list
     */

    public function getBadgesByUser()
    {
        $badges = Badge::latest()
            ->select('badges.*')
            ->where('badges.user_id', '=', Auth::user()->id)
            ->where('badges.enable', '=', 1)
            ->get();

        $i = 0;
        $badgesData = [];
        foreach ($badges as $badge){


            $badgesData[$i]['id'] = $badge->id;
            $badgesData[$i]['name'] = $badge->name;
            $badgesData[$i]['description'] = $badge->description;
            $badgesData[$i]['badge_types_id'] = $badge->badge_types_id;
            $badgesData[$i]['badge_image'] = $badge->badge_image;
            $badgesData[$i]['lessons'] = $badge->lessons;
            count($badge->users)?$badgesData[$i]['assigned'] = 1:$badgesData[$i]['assigned'] = 0;
            $i++;
        }

        if (count($badgesData) == 0) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $badgesData
        ], 200);
    }

    /**
     *
     * @param $allocation_id
     * @return mixed
     */

    public function getBadgesByAllocationId($allocation_id)
    {
        $badges = Badge::latest()
            ->select('badges.*')
            ->where('allocation_id', '=', $allocation_id)
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


    public function getBadgeById($badge_id)
    {
        $badge = Badge::latest()
            ->select('badges.*')
            ->where('badges.id', '=', $badge_id)
            ->first();

        if (!$badge->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $badge
        ], 200);
    }


    /**
     * @param $points
     * @return mixed
     */
    public function isExisted($name)
    {
        $badges = Badge::latest()
            ->select('badges.*')
            ->where('badges.name', '=', $name)
            ->where('badges.user_id', '=', Auth::user()->id)
            ->where('enable', '=', 1)
            ->get();

        return Response::json([
            'query_status' => 'success',
            'data_count' => $badges->count(),
        ], 200);
    }


    public function isExistedBadge($points, $id)
    {
        $badges = Badge::latest()
            ->select('badges.*')
            ->where('badges.points', '=', $points)
            ->where('badges.user_id', '=', Auth::user()->id)
            ->where('enable', '=', 1)
            ->get();

        return Response::json([
            'query_status' => 'success',
            'data_count' => $badges->count(),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $request = $request->all();
        if (
            !$request['name']
        ) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }

        $badges_check= \Validator::make($request,[
            'name' =>'unique:badges,name,id'
        ]);

        $badges_status = $badges_check->passes();
        if($badges_status == true){
            $request['user_id'] = Auth::user()->id;
            $request['enable'] = 1;
            $request['category_id'] = $request['category'];
            $badge = Badge::create($request);

            $lessons = $request['badgeLessons'];

            if(count($lessons) != 0 && count($badge) != 0){
                foreach (json_decode($lessons) as $key => $value){
                    $video = Video::find($key);
                    $badge->lessons()->save($video);
                }
            }

            return Response::json([
                'query_status' => 'success',
                'message' => ' Badge Created Successfully',
                'data' => $badge
            ], 201);
        }
        else
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'This Badge name already exist.',
                'data' => 'A Duplicate Badge'
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
        $badge = Badge::find($id);
        if (empty($badge)) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        $request = $request->all();
        if (!$request['name']
        ) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }
        $badges_check= \Validator::make($request,[
            'name' =>'unique:badges,name,'. $id

        ]);

        $badges_status = $badges_check->passes();

        if($badges_status != 'true')
        {
            return Response::json([
                'query_status' => 'error',
                'message' => 'This Bundle name already exist.'
            ], 201);
        }

        $request['user_id'] = Auth::user()->id;
        $badge->update($request);

        return Response::json([
            'query_status' => 'success',
            'message' => 'Record Updated Successfully',
            'data' => $badge
        ], 200);

    }

    public function getChildAchieveBadges($childId)
    {
        if($childId == null){
            return Response::json([
                'query_status' => 'error',
                'message' => 'Please provide all required fields'
            ], 422);
        }


        $childAchivedAllBadges = Badgecompleted::select('*')
            ->join('badges', 'badges.id', '=', 'badges_completed.badge_id')
            ->where('badges_completed.user_id', '=', $childId)
            ->orderBy('badges.points', 'asc')
            ->get();

        $badgesData = [];
        $i = 0;
        foreach ($childAchivedAllBadges as $badge){
            $badgesData[$i]['id'] = $badge->id;
            $badgesData[$i]['name'] = $badge->name;
            $badgesData[$i]['description'] = $badge->description;
            $badgesData[$i]['badge_types_id'] = $badge->badge_types_id;
            $badgesData[$i]['badge_image'] = $badge->badge_image;
            $badgesData[$i]['lessons'] = $badge->lessons;
            $i++;
        }
        
        if (count($badgesData) == 0) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found'
            ], 404);
        }

        if(count($badgesData) != 0){
            return Response::json([
                'query_status' => 'success',
                'data' => $badgesData
            ], 200);
        }

    }


    /**
     *
     * use for remove duplicate in 2 collection
     *
     * @param $firstCollection
     * @param $secondCollection
     * @param $key
     * @return static
     *
     */
    public function duplicateRemover($firstCollection ,$secondCollection , $key ){
        $returnData =  collect([]);
            foreach($firstCollection as $badge){
                if(!$secondCollection->contains($key,$badge->points)){
                    $returnData = $returnData->push($badge);
                }
            }
        return $returnData->merge($secondCollection);
    }


    public function destroy($id)
    {
            Badge::destroy($id);
            return Response::json([
                'query_status' => 'success',
                'message' => 'record successfully deleted!'
            ], 200);

        return Response::json([
            'error' => 'access_denied'
        ], 401);
    }


    /**
     *badge lessons
     *
     * @param null $id
     * @return mixed
     */
    public function getBadgeLessons($id = null)
    {
        $badge = Badge::find($id);
        $lessons = $badge->lessons;

        if (!$lessons->count()) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }

        return Response::json([
            'query_status' => 'success',
            'data' => $lessons
        ], 200);
    }


    public function getBadgesByChild($id = null,$type)
    {
        $user = User::find($id);
        $badgesData=[];
        $i = 0;
        if($type == 1){
// $badgeData = $user->completedBadges;
            $childAchivedAllBadges = $user->completedBadges;

            foreach ($childAchivedAllBadges as $badge){
                $badgesData[$i]['id'] = $badge->id;
                $badgesData[$i]['name'] = $badge->name;
                $badgesData[$i]['description'] = $badge->description;
                $badgesData[$i]['badge_types_id'] = $badge->badge_types_id;
                $badgesData[$i]['badge_image'] = $badge->badge_image;
                $badgesData[$i]['lessons'] = $badge->lessons;
                $i++;
            }
        }
        if($type == 2){
            $completedCollection=$user->completedBadges;
            $badges = $user->badges;

            foreach ($badges as $badge){
                if(!$completedCollection->contains($badge)){
                    $badgesData[$i]['id'] = $badge->id;
                    $badgesData[$i]['name'] = $badge->name;
                    $badgesData[$i]['description'] = $badge->description;
                    $badgesData[$i]['badge_types_id'] = $badge->badge_types_id;
                    $badgesData[$i]['badge_image'] = $badge->badge_image;
                    $badgesData[$i]['lessons'] = $badge->lessons;
                    $i++;
                }
            }
        }

        if ($badgesData == null) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }
        return Response::json([
            'query_status' => 'success',
            'data' => $badgesData
        ], 200);
    }


    public function getBadgeLessonsByBadgeId($id = null)
    {
        $badge = Badge::find($id);
        $badgeLessons = $badge->lessons;

        if ($badgeLessons == null) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }
        return Response::json([
            'query_status' => 'success',
            'data' => $badgeLessons
        ], 200);
    }


    public function getAchievedBadgesByChildId($id = null)
    {
        $user = User::find($id);
        $badges = $user->completedBadges;

        if ($badges == null) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }
        return Response::json([
            'query_status' => 'success',
            'data' => $badges
        ], 200);
    }


    public function getAchievedBadgesByChild($id = null)
    {
        $childAchivedAllBadges = Badgecompleted::select('badges.*','user.f_name','user.l_name')
            ->join('badges', 'badges.id', '=', 'badges_completed.badge_id')
            ->join('user', 'user.id', '=', 'badges_completed.user_id')
            ->where('badges_completed.user_id', '=', $id)
            ->orderBy('badges.points', 'asc')
            ->get();

        if ($childAchivedAllBadges == null) {
            return Response::json([
                'query_status' => 'error',
                'message' => 'data not found',
                'data' => null
            ], 404);
        }
        return Response::json([
            'query_status' => 'success',
            'data' => $childAchivedAllBadges
        ], 200);
    }


    public function badgeImage(Request $request)
    {
        if( is_null($request->id) or is_null($request->getContent()) )
            return Response::json([
                'query_status' => 'error',
                'message' => 'missing argument'
            ], 401);

        $file = str_replace('/', '-', $request->id).'.png';

        $conv = new \Anam\PhantomMagick\Converter();
        $conv->addPage($request->getContent())
            ->width(800)
            ->height(600)
            ->quality(50)
            ->toPng()
            ->save('./uploads/badges/achieved/'.$file);

        $data = array(
            'url'=>'/uploads/badges/achieved/'.$file,
            'file'=>$file
        );

        return Response::json([
            'query_status' => 'success',
            'data' => $data
        ], 200);
    }


}
