<?php

namespace App\Traits;

use App\Reward;
use App\Badge;
use App\ChildHouse;
use App\House;
use App\Video;
use App\User;
use Illuminate\Database\Eloquent\Collection;


trait BadgeTrait
{

    public function reward_by_child($id)
    {
        if ($id == null) {
            return 'id is null';
        }

        $rewards = Reward::select('rewards.*')
            ->where('rewards.child_id', '=', $id)
            ->get();

        $data["total_points"] = 0;
        $data["rewards"] = $rewards;
        $data["today_good_points"] = 0;
        $data["today_bad_points"] = 0;
        $data["user_id"] = \Auth::user()->id;

        foreach ($rewards as $reward) {
            $data["total_points"] += $reward->value;
            if ($reward->type == 3 and $reward->created_at > date('Y-m-d 00:00:00')) {
                if ($reward->value > 0) {
                    $data["today_good_points"] += $reward->value;
                } else {
                    $data["today_bad_points"] += $reward->value;
                }
            }
        }


        if (!$rewards->count()) {
            return 'reward not found';
        }

        return $data;
    }

    public function get_all_badges()
    {
        $badges_data = Badge::orderBy('points', 'asc')->get();

        if ($badges_data != null) {
            return $badges_data;
        } else {
            return null;
        }
    }

    public function get_child_house_id($child_id)
    {
        $child_house_id = ChildHouse::select('childhouses.house_id')->where('childhouses.child_id', $child_id)->first();
        return $child_house_id;
    }

    public function get_parent_house_id($parent_id)
    {
        $parent_house_id = House::select('house.id')->where('house.user_id', $parent_id)->first();

        return $parent_house_id;
    }

    public function get_badge_assign_status($child_id, $badgeid)
    {
        $result = \DB::table('badge_assignee')->where('user_id', $child_id)->where('badge_id', $badgeid)->first();

        if ($result != null) {
            return true;
        } else {
            return false;
        }
    }


    //get parent data by child id
    public function getParent($child_id)
    {
        $result = User::select('user.id', 'user.f_name')
            ->join('house', 'house.user_id', '=', 'user.id')
            ->join('childhouses', 'house_id', '=', 'house.id')
            ->where('childhouses.child_id', $child_id)
            ->first();

        if ($result != null) {
            return $result;
        } else {
            return null;
        }
    }


    //get all badges
    public function getChildAllBadges($childId)
    {
        $badges_data = Badge::latest()->select('badges.*')->where('badges.badge_types_id', 1)->get();
        $user = User::find($childId);
        $userBadges = $user->badges;

        if ($userBadges != null && count($userBadges) > 0) {
            foreach ($userBadges as $userBadge) {
                $badges_data->push($userBadge);
            }
        }

        if ($badges_data != null) {
            return $badges_data;
        } else {
            return null;
        }
    }

    //get child completed lessons for badge complete
    public function getCompletedLessonsByChildId($childId)
    {
        $compltededLessons = Video::select('videos.id')
            ->join('quizzes', 'quizzes.video_id', '=', 'videos.id')
            ->join('attempts', 'attempts.quiz_id', '=', 'quizzes.id')
            ->join('childquizallocations', 'childquizallocations.quiz_id', '=', 'quizzes.id')
            ->where('attempts.is_passed', 1)
            ->where('childquizallocations.child_id', $childId)
            ->groupBy('videos.id')->get();

        if ($compltededLessons == null) {
            return null;
        } else {
            return $compltededLessons;
        }
    }


    /**
     *
     * check child already achieved given badge
     *
     * @param $chilsId
     * @param $badgeData
     * @return mixed
     */
    public function isBadgeAlreadyAchieved($chilsId, $badgeData)
    {
        $user = User::find($chilsId);
        $completedBadge = $user->completedBadges;
        return $completedBadge->contains($badgeData);
    }


    //achieve badges
    public function achieveBadge($badgeData, $completedLessons)
    {
        $complteBadges = collect([]);
        foreach ($badgeData as $badge) {
            $badgeLessons = $badge->lessons;
            $badgeLessonCount = count($badgeLessons);
            $badgeLessonComplete = collect([]);
            foreach ($badgeLessons as $lesson) {
                if ($completedLessons->contains($lesson)) {
                    $badgeLessonComplete->push($lesson);
                }
            }
            if (count($badgeLessonComplete) == $badgeLessonCount) {
                $complteBadges->push($badge);
            }
        }
        return $complteBadges;
    }


}
