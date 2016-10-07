<?php

/**
 * Base translation bucket used by the app.
 * @see https://laravel.com/docs/5.2/localization
 */

return [
    'welcome' => 'Welcome to our application',
    'new_lesson_has_assigned' => 'New lesson named ":name" has just assigned for you',
    'new_chore_has_assigned' => 'New chore named ":name" has just assigned for you',
    'new_lesson_bundle_has_assigned' => 'New lesson bundle named ":name" has just assigned for you',
    'completed_a_chore_on_e2l' => 'completed a chore on Earn2Learn',
    'child_quiz_pass_notice_to_parent' => ':first_name :last_name just passed the quiz for :lesson and earned :points_amount points',
    'notify_quiz_fail_attempt_to_parent' => ':first_name :last_name just failed a quiz attempt for :lesson',
    'notify_chore_completed_to_parent' => ':first_name :last_name just finished a chore ":task" and ready to earn :points_amount points',
    'notify_badge_achieved_to_parent' => ':first_name :last_name just achieved a badge ":name"',
    'notify_new_message_to_parent' => 'You have just received a message from :first_name :last_name',
    'notify_new_message_to_child' => 'New message received from your parent.',
    'notify_quiz_attempt_to_parent' => ':first_name :last_name exceed the quiz attempt for :lesson',
    'sponsor_accepted_invitation' => ':first_name :last_name has accepted your sponsor invitation',
    'sponsor_name_is_now_sponsoring_to_your_child' => ':sponsorName is now sponsoring your child :first_name :last_name',
    'child_quiz_pass_by_sponsor_notice_to_parent' => ':first_name :last_name just passed the quiz for :lesson and earned :points_amount points which was assigned by :sponsorName (Sponsor)',
    'child_request_gift_card_form_sponsor' => ':first_name :last_name has requested $:amount :giftCardName gift card from :sponsorName',
    'child_request_gift_card_form_parent' => ':first_name :last_name has requested $:amount :giftCardName gift card',
    'child_gift_card_purchase_by_sponsor' => ':amount :giftCardName gift card has been purchased by :sponsorName for :first_name :last_name ',
    'notify_child_pass_lesson_bundle_to_parent' => ':first_name :last_name just completed the lesson bundle for :bundleName',
    'notify_child_pass_lesson_bundle_with_gift_card_to_parent' => ':first_name :last_name just completed the lesson bundle for :bundleName and ready to earn $:amount :giftCardName gift card',
    'notify_gift_card_purchase_by_sponsor_to_parent' => ':sponsorName just purchased :amount :giftCardName gift card to :first_name :last_name',
    'gift_card_rejected_by_parent' => 'Your :amount :giftCardName gift card has been rejected by parent',
    'gift_card_rejected_by_parent_to_sponsor' => ':amount :giftCardName gift card from :child has been rejected by :parent',
    'subscription_message' => 'You have successfully subscribed the EarnToLearn as a parent. Subscription valid till :subscription_end ',
    'unsubscription_message' => 'You have successfully unsubscribed from the EarnToLearn as a parent. Subscription valid till :subscription_end ',
    'enough_points_achieved_to_request_gift_card' => 'You have achieved enough points to request gift cards',
    'subscription_failed_message' => 'Your subscription failed.please update your card details.',
    'sponsor_not_accepted_invitation' => ':first_name :last_name did not accept your sponsor invitation',
];
