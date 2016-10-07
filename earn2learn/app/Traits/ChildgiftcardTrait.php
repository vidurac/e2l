<?php 

namespace App\Traits;

use App\ChildGiftCard;
use App\Childquizallocation;
use App\HomeGiftCard;
use App\Reward;
use Illuminate\Database\Eloquent\Collection;


trait ChildgiftcardTrait{

    public function getChildGiftCard($child_id)
    {
        $giftcard_points=HomeGiftCard::orderBy('points', 'asc')->where('child_id',$child_id)->where('enable',1)->get();
        return $giftcard_points;
    }

    /**
     * Returns whether child can request gift cards or not
     * @param $child_id
     * @return bool
     */
    public function canChildRequestGiftCard($child_id) {

        $giftcard_points=HomeGiftCard::orderBy('points', 'asc')->where('child_id',$child_id)->where('enable',1)->where('bundle_id',null)->get();

        if(isset($giftcard_points) && !count($giftcard_points)) {
            return false;
        }


        $child_points = Reward::select('value')
            ->where('child_id', $child_id)
            ->sum('value');

        $allowedGiftCards = 0;
        foreach ($giftcard_points as $giftcard) {

            //check total rewards against gift cards points

            if (isset($giftcard->sponsor_id)) {
                $c = Childquizallocation::select(\DB::raw('sum(rewards.value) as total_points'))
                    ->join('attempts', 'childquizallocations.id', '=', 'attempts.allocation_id')
                    ->join('rewards', 'attempts.id', '=', 'rewards.attempt_id')
                    ->where('sponsor_id', $giftcard->sponsor_id)
                    ->where('childquizallocations.child_id', $child_id)
                    ->where('is_passed', 1)
                    ->get()->first();

                if (isset($c->total_points)) {
                    if ($c->total_points >= $giftcard->points) {
                        $allowedGiftCards++;
                    }
                }
            }else {
                if ($child_points >= $giftcard->points) {
                    $allowedGiftCards++;
                }
            }
        }

        \Log::info("===== no.of eligible gift cards " . $allowedGiftCards);

        if ($allowedGiftCards > 0) {
            return true;
        }else {
            return false;
        }
    }
}
