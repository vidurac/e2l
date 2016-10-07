<?php 

namespace App\Traits;

use App\Events\NotifyChild;
use App\Events\NotifyParent;

trait NotificationTrait{

    /**
     * Send a notification to parent when particular child earn a badge
     * @param $childFistName
     * @param $childLastName
     * @param $parentId
     * @param $badgeName
     */
    public function notifyBadgeEarningToParent($childFistName, $childLastName, $parentId, $badgeName) {

        // notify data
        $notifyData = [
            'message' => trans('messages.notify_badge_achieved_to_parent', [
                'first_name'  => $childFistName,
                'last_name'  => $childLastName,
                'name' => $badgeName
            ]),
            'type' => 'badge',
            'link' => '#/parent/badges',
            'user_id' => $parentId
        ];

        // Fire notify event
        event(new NotifyParent($notifyData));

    }

    /**
     * Send a notification to child when new chore assigned
     * @param $taskName
     * @param $taskId
     * @param $childId
     */
    public function notifyNewChoreAssignToChild($taskName, $taskId, $childId) {

        // notify data
        $notifyData = [
            'message' => trans('messages.new_chore_has_assigned', ['name' => $taskName]),
            'type' => 'chore',
            'link' => '#/child/task/' . $taskId,
            'user_id' => $childId
        ];

        // Fire notify event
        event(new NotifyChild($notifyData));
    }


    /**
     * Send a notification to parent when a sponsoring a child
     * @param $childFistName
     * @param $childLastName
     * @param $sponsorName
     * @param $parentId
     */
    public function notifyChildSponsoringToParent($childFistName, $childLastName, $sponsorName, $parentId) {

        // notify data
        $notifyData = [
            'message' => trans('messages.sponsor_name_is_now_sponsoring_to_your_child', [
                'first_name'  => $childFistName,
                'last_name'  => $childLastName,
                'sponsorName' => $sponsorName
            ]),
            'type' => 'sponsor',
            'link' => '#/parent/sponsors',
            'user_id' => $parentId
        ];

        // Fire notify event
        event(new NotifyParent($notifyData));

    }

    /**
     * Send notification when a parent assigned new lesson to child
     * @param $lessonTitle
     * @param $quizId
     * @param $childId
     */
    public function notifyWhenNewLessonAssignedToChild($lessonTitle, $quizId, $childId) {

        $notifyData = [
            'message' => trans('messages.new_lesson_has_assigned', ['name' => $lessonTitle]),
            'type' => 'lesson',
            'link' => '#/child/quiz/' . $quizId,
            'user_id' => $childId
        ];

        // Fire notify event
        event(new NotifyChild($notifyData));

    }

    /**
     * Send notification to child when new lesson bundle assigned
     * @param array $meta
     */
    public function notifyWhenNewLessonBundleAssignToChild(array $meta) {
        $notifyData = [
            'message' => trans('messages.new_lesson_bundle_has_assigned', [
                'name' => $meta['bundleName']
            ]),
            'type' => 'bundle',
            'link' => '',
            'user_id' => $meta['childId']
        ];

        // Fire notify event
        event(new NotifyChild($notifyData));
    }

    /**
     * Send notification to parent when child pass a lesson
     * @param array $meta
     */
    public function notifyWhenChildPassAQuizToParent(array $meta) {

        // notify data
        $notifyData = [
            'message' => trans('messages.child_quiz_pass_notice_to_parent', [
                'first_name' => $meta['childFirstName'],
                'last_name' => $meta['childLastName'],
                'lesson' => $meta['lessonTitle'],
                'points_amount' => $meta['quizValue']
            ]),
            'type' => 'lesson',
            'link' => '#/parent/lesson/' . $meta['lessonId'],
            'user_id' => $meta['userId']
        ];

        // Fire notify event
        event(new NotifyParent($notifyData));
    }

    /**
     * Send notification to parent when child pass a lesson which was assigned by
     * the Sponsor
     * @param array $meta
     * @internal param array $mata
     */
    public function notifyWhenChildPassAQuizWhichWasAssignedBySponsor(array $meta) {

        // notify data
        $notifyData = [
            'message' => trans('messages.child_quiz_pass_by_sponsor_notice_to_parent', [
                'first_name' => $meta['childFirstName'],
                'last_name' => $meta['childLastName'],
                'lesson' => $meta['lessonTitle'],
                'points_amount' => $meta['quizValue'],
                'sponsorName' => $meta['sponsorName']
            ]),
            'type' => 'lesson',
            'link' => '#/parent/lesson/' . $meta['lessonId'],
            'user_id' => $meta['userId']
        ];

        // Fire notify event
        event(new NotifyParent($notifyData));

    }

    /**
     * Send  notification to parent when child request a gift card from sponsor
     * @param array $meta
     */
    public function notifyWhenChildRequestAGiftCardFromSponsor(array $meta) {

        // notify data
        $notifyData = [
            'message' => trans('messages.child_request_gift_card_form_sponsor', [
                'first_name' => $meta['childFirstName'],
                'last_name' => $meta['childLastName'],
                'amount' => $meta['amount'],
                'sponsorName' => $meta['sponsorName'],
                'giftCardName' => $meta['giftCardName'],

            ]),
            'type' => 'sponsor',
            'link' => '#/parent/childcards',
            'user_id' => $meta['userId']
        ];

        // Fire notify event
        event(new NotifyParent($notifyData));
    }


    /**
     * Send  notification to parent when child request a gift card from sponsor
     * @param array $meta
     */
    public function notifyWhenChildRequestAGiftCardFromParent(array $meta) {

        // notify data
        $notifyData = [
            'message' => trans('messages.child_request_gift_card_form_parent', [
                'first_name' => $meta['childFirstName'],
                'last_name' => $meta['childLastName'],
                'amount' => $meta['amount'],
                'giftCardName' => $meta['giftCardName'],

            ]),
            'type' => 'giftcard',
            'link' => '#/parent/childcards',
            'user_id' => $meta['userId']
        ];

        // Fire notify event
        event(new NotifyParent($notifyData));
    }

    /**
     * Send notification to parent when sponsor purchase a gift card for a child
     * @param array $meta
     */
    public function notifyWhenSponsorPurchasedAGiftCardToChild(array $meta) {
        // notify data
        $notifyData = [
            'message' => trans('messages.notify_gift_card_purchase_by_sponsor_to_parent', [
                'first_name' => $meta['childFirstName'],
                'last_name' => $meta['childLastName'],
                'amount' => $meta['amount'],
                'sponsorName' => $meta['sponsorName'],
                'giftCardName' => $meta['giftCardName'],

            ]),
            'type' => 'sponsor',
            'link' => '#/parent/childcards',
            'user_id' => $meta['userId']
        ];

        // Fire notify event
        event(new NotifyParent($notifyData));
    }

    /**
     * Send notification to parent when child completed a lesson bundle
     * @param array $meta
     */
    public function notifyWhenChildPassALessonBundleToParent(array $meta) {

        $notifyData = [
            'message' => trans('messages.notify_child_pass_lesson_bundle_to_parent', [
                'first_name' => $meta['childFirstName'],
                'last_name' => $meta['childLastName'],
                'bundleName' => $meta['bundleName']
            ]),
            'type' => 'lesson',
            'link' => '#/parent/bundles',
            'user_id' => $meta['userId']
        ];

        // Fire notify event
        event(new NotifyParent($notifyData));
    }

    /**
     * Send notification to parent when child completed a lesson bundle
     * @param array $meta
     */
    public function notifyWhenChildPassALessonBundleWithGiftCardToParent(array $meta) {

        $notifyData = [
            'message' => trans('messages.notify_child_pass_lesson_bundle_with_gift_card_to_parent', [
                'first_name' => $meta['childFirstName'],
                'last_name' => $meta['childLastName'],
                'amount' => $meta['amount'],
                'giftCardName' => $meta['giftCardName'],
                'bundleName' => $meta['bundleName']
            ]),
            'type' => 'lesson',
            'link' => '#/parent/bundles',
            'user_id' => $meta['userId']
        ];

        // Fire notify event
        event(new NotifyParent($notifyData));
    }

    /**
     * Send notification to child when gift card request been rejected
     * @param array $meta
     */
    public function notifyChildWhenGiftRejectByParent(array $meta) {

        $notifyData = [
            'message' => trans('messages.gift_card_rejected_by_parent', [
                'amount' => $meta['amount'],
                'giftCardName' => $meta['giftCardName'],
            ]),
            'type' => 'giftcard',
            'link' => '',
            'user_id' => $meta['userId']
        ];

        // Fire notify event
        event(new NotifyParent($notifyData));
    }

    /**
     * Send notification to sponsor when gift card request been rejected
     * @param array $meta
     */
    public function notifySponsorWhenGiftRejectByParent(array $meta) {

        $notifyData = [
            'message' => trans('messages.gift_card_rejected_by_parent_to_sponsor', [
                'amount' => $meta['amount'],
                'giftCardName' => $meta['giftCardName'],
                'child' => $meta['child'],
                'parent' => $meta['parent'],
            ]),
            'type' => 'giftcard',
            'link' => '',
            'user_id' => $meta['userId']
        ];

        // Fire notify event
        event(new NotifyParent($notifyData));
    }

    /**
     * Send notification to sponsor when gift card request been rejected
     * @param array $meta
     */
    public function notifyChildWhenGiftCanRequest(array $meta) {

        $notifyData = [
            'message' => trans('messages.enough_points_achieved_to_request_gift_card'),
            'type' => 'giftcard',
            'link' => '#/child/gift-cards',
            'user_id' => $meta['userId']
        ];

        // Fire notify event
        event(new NotifyChild($notifyData));
    }
}
