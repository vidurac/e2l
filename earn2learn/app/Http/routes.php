<?php

    /*
    |--------------------------------------------------------------------------
    | Application Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register all of the routes for an application.
    | It's a breeze. Simply tell Laravel the URIs it should respond to
    | and give it the controller to call when that URI is requested.
    |
    */

    Route::get('sendemail', function () 
    {
        $receiver = 'thilan@wsolus.com';
		$subject = "Test - Confirm your Earn to Learn email address!";
		$message = "Message";
		$template = 'verifyemail.blade';
		$token = 'dGfDCeXtPNguT2ABYkpRI8MFUhq60sOwEJc7vn15LKW3jbHZxl4io9rzSayVQm';
		
		// pass data to email send 
		$email = Mail::send('emails.verifyemail', ['token' => $token, 'email' => $receiver], function ($message) use ($subject)
		{
			$message->from('info@wsolus.com', 'Earn to Learn');
			$message->to('thilan@wsolus.com', 'Thilan')->subject($subject);
		});
        if($email)
            return 'Done';
    });

    Route::get('/', function ()
    {
//        return view('welcome');
        // return date("Y-m-d H:i:s")+ 1 days;
        // return date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . "+7 days"));
        // return md5('pradeep@openarc.lk'.date_default_timezone_set('America/Chicago'), true);
        
        // return bin2hex(date_default_timezone_set('America/Chicago').'pradeep@openarc.lk');
        // var_dump(Auth::user());
        if (App::environment('production')){
            return view('angularjs.application_production');
        }
        return view('angularjs.application');
    });


    Route::group(['middleware' => 'cors', 'prefix' => 'cron'], function()
    {
        Route::get('check_videos','CronjobController@check_videos');
        Route::resource('daily_email', 'CronjobController@daily_email');
    });

    Route::group(['middleware' => 'cors', 'prefix' => 'api/v1'], function()
    {
        Route::resource('authenticate',     'AuthenticateController', ['only' => ['index']]);
        Route::post('authenticate',         'AuthenticateController@authenticate');
        Route::post('fb_authenticate',      'AuthenticateController@fb_authenticate');
        Route::get('authenticate/user',     'AuthenticateController@getAuthenticatedUser');
    });

    Route::group(['middleware' => 'cors', 'prefix' => 'api/v1'], function()
    {
        Route::post('save-sponsor-link',     'UserController@saveSponsorLink');
        Route::post('resend-sponsor-link',     'UserController@resendSponsorInvitation');
        Route::post('complete_sponsor_account',     'UserController@complete_sponsor_account');
        Route::post('revoke-sponsor-access',     'UserController@revokeSponsorAccess');
        Route::post('grant-sponsor-access',     'UserController@grantSponsorAccess');

        Route::get('get_all_users',                                 'UserController@get_all_users');
        Route::get('get_all_parents_with_child_count/{limit}',      'UserController@get_all_parents_with_child_count');
        Route::get('get_user_by_id/{id}',                    		'UserController@get_user_by_id');

        Route::get('get_user_by_parent_id/{parent_id}',       		'UserController@get_user_by_parent_id');

        Route::get('get_all_users_by_userrole/{userrole_id}',  		'UserController@get_all_users_by_userrole');
        Route::get('get_all_users_by_house/{house_id}',         	'UserController@get_all_users_by_house');
        Route::get('get_all_user_messages/{house_id}/{user_id}',    'UserController@get_all_user_messages_by_house');
        Route::get('load_recent_activities/{user_id}',         	    'UserController@load_recent_activities');

        Route::get('get_all_active_sponsors',         	            'UserController@getAllActiveSponsorsForParent');
        Route::get('get_all_sponsored_children',         	        'UserController@getAllSponsoredChildren');
        Route::get('get-sponsor-access',         	                'UserController@checkSponsorPermission');
        Route::get('check-sponsor',         	                    'UserController@checkSponsor');
        Route::get('get-sponsor-accessible-house-details',          'UserController@getSponsorAccessibleHouseDetails');
        Route::get('get_all_pending_sponsors',         	            'UserController@getAllInActiveSponsorsForParent');
        Route::get('get_user_by_name/{name}',                   	'UserController@get_user_by_name');
        Route::get('confirm_email/{token}',                     	'UserController@confirm_email');
        Route::get('validate_sponsor_token/{token}',                'UserController@validate_sponsor_token');
        Route::get('validate_sponsor_token_after/{token}',                'UserController@validate_sponsor_token_after');
        Route::get('user/payment_data',                         	'UserController@payment_data');
        Route::get('user/fb_disconnect',                         	'UserController@fb_disconnect');
        
        Route::get('user/subscription_close',                       'UserController@subscription_close');
        Route::get('user/subscription_resume',                      'UserController@subscription_resume');
        Route::post('user/update_card',                      	    'UserController@update_card');
        
        Route::post('user/password_reset',                      	'UserController@password_reset');
        Route::post('user/child_password_reset',                    'UserController@child_password_reset');
        Route::post('forgot_password',                          	'UserController@forgot_password');
        Route::post('user/subscription',                        	'UserController@subscription');
        Route::post('user/charge',                              	'UserController@charge');

        Route::post('user/deleteUser/{id}',                        	'UserController@deleteUser');

        Route::post('register',                                 	'UserController@register');
        Route::post('user/fb_connect',                              'UserController@fb_connect');
        Route::post('upload_image',                                 'UserController@upload_image');
        Route::resource('user',                                 	'UserController');
        Route::resource('user_delete',                              'UserController@destroy');
        Route::resource('user_soft_delete',                         'UserController@soft_delete');
        Route::resource('user_child_delete',                         'UserController@child_delete');
        Route::resource('user_subscription',                        'UserController@user_subscription');

        Route::get('get_show_guide_status',                         'UserController@get_showguide_status');
        Route::get('update_show_guide_status',                      'UserController@update_showguide_status');
        
        Route::get('get_userrole_by_id/{userrole_id}',          	'UserroleController@get_userrole_by_id');
        Route::resource('userrole',                             	'UserroleController');
        
        Route::get('password/tok_verify/{token}',               	'PasswordController@tok_verify');
        Route::post('password/reset',                           	'PasswordController@psw_reset');
        Route::resource('password',                             	'PasswordController');
        
        Route::get('get_main_categories',                       	'CategoryController@get_main_categories');
        Route::get('get_sub_items_by_category_id/{category_id}',	'CategoryController@get_sub_items_by_category_id');
        Route::get('get_category_by_id/{category_id}',          	'CategoryController@get_category_by_id');
        Route::get('get_category_by_name/{name}',               	'CategoryController@get_category_by_name');
        Route::get('get_category_by_quiz_id/{quiz_id}',         	'CategoryController@get_category_by_quiz_id');
        Route::get('getLessonsByCategoryId/{id}',         	'CategoryController@getLessonsByCategoryId');
        Route::resource('category',                             	'CategoryController');

        Route::get('category/check_lessons_exist/{id}',                               'CategoryController@check_lessons_exist');

        Route::post('category/DeleteCategory/{id}',                               'CategoryController@DeleteCategory');

        Route::get('getCategoryForLessons',                         'CategoryController@getCategoryForLessons');
        
        Route::get('get_video_by_id/{video_id}',                	'VideoController@get_video_by_id');
        Route::get('get_video_by_category_id/{category_id}',    	'VideoController@get_video_by_category_id');
        Route::get('getVideosByCategoryId/{category_id}',    	    'VideoController@getVideosByCategoryId');
        Route::get('get_videos_by_title/{title}',               	'VideoController@get_videos_by_title');
        Route::get('get_video_by_quiz_id/{quiz_id}',            	'VideoController@get_video_by_quiz_id');
        Route::resource('video',                                	'VideoController');
        
        Route::get('get_house_by_id/{house_id}',                	'HouseController@get_house_by_id');
        Route::get('get_house_by_user_id/{user_id}',            	'HouseController@get_house_by_user_id'); // perant id
        Route::get('get_houses_full_data',                      	'HouseController@get_houses_full_data');
        Route::get('getChildrenByHouseId/{house_id}',               'HouseController@getChildrenByHouseId');
        Route::get('getUserByHouseId/{house_id}',                   'HouseController@getUserByHouseId');
        Route::resource('house',                                	'HouseController');
        
        Route::get('get_all_quizzes',                           	'QuizController@get_all_quizzes');
        Route::get('get_all_quizzes_with_video',                   	'QuizController@get_all_quizzes_with_video');
        Route::get('get_all_quizzes_with_video_by_bundle/{id}',     'QuizController@get_all_quizzes_with_video_by_bundle');
        Route::get('get_quiz_by_id/{quiz_id}',                  	'QuizController@get_quiz_by_id');
        Route::get('get_quiz_by_user_id/{user_id}',             	'QuizController@get_quiz_by_user_id');
        Route::get('get_quiz_by_video_id/{video_id}',           	'QuizController@get_quiz_by_video_id');
        Route::get('get_quiz_by_user_video/{video_id}',         	'QuizController@get_quiz_by_user_video');
        Route::get('get_quiz_by_house_id/{house_id}/{video_id}',    'QuizController@get_quiz_by_house_id');
        Route::get('get_quiz_by_attempt_id/{attempt_id}',       	'QuizController@get_quiz_by_attempt_id');
        Route::get('get_quiz_by_category_id/{category_id}',    		'QuizController@get_quiz_by_category_id');
        Route::get('get_quiz_by_attempt_id/{attempt_id}',    		'QuizController@get_quiz_by_attempt_id');
        Route::get('get_all_house_quizzes_for_sponsor',    		    'QuizController@getAllHouseQuizzesForSponsor');
        Route::get('is_quiz_added_to_house/{video_id}/{user_id}',   'QuizController@checkQuizAlreadyAddedToHouse');
        Route::resource('quiz',                                 	'QuizController');
        
        Route::get('get_questions_by_quiz_id/{quiz_id}',			'QuestionController@get_questions_by_quiz_id');
        Route::resource('question',                      			'QuestionController@destroy');
        
        Route::get('get_answers_by_question_id/{question_id}',		'AnswerController@get_answers_by_question_id');
        Route::resource('answer',                           		'AnswerController');
        
        Route::get('get_allocation_by_child_id/{child_id}',   		'ChildquizallocationController@get_allocation_by_child_id');
        Route::get('get_allocation_by_quiz_id/{quiz_id}',     		'ChildquizallocationController@get_allocation_by_quiz_id');
        Route::get('get_allocation_by_user_quiz_id/{quiz_id}',		'ChildquizallocationController@get_allocation_by_user_quiz_id');
        Route::get('get_allocation_by_house_id/{house_id}',   		'ChildquizallocationController@get_allocation_by_house_id');
        Route::get('get_childs_by_quiz_id/{quiz_id}',         		'ChildquizallocationController@get_childs_by_quiz_id');
        Route::get('get_allocation_by_id/{id}',               		'ChildquizallocationController@get_allocation_by_id');
        Route::get('can-child-request-sponsor-gift-cards/{sid}/{points}',    'ChildquizallocationController@canChildRequestSponsorGiftCards');
        Route::resource('childquizallocation',                		'ChildquizallocationController');
        Route::resource('child_get_system_badge_ponits',             'ChildquizallocationController@get_system_badge_points');
        
        Route::post('attempt/status/{id}',                      	'AttemptController@status');

        Route::get('get_attempt_by_house_id/{house_id}',        	'AttemptController@get_attempt_by_house_id');
        Route::get('get_attempt_by_child_id/{child_id}',        	'AttemptController@get_attempt_by_child_id');
        Route::get('get_attempt_by_allocation_id/{allocation_id}',  'AttemptController@get_attempt_by_allocation_id');
        Route::get('get_attempt_by_quiz_id/{quiz_id}',          	'AttemptController@get_attempt_by_quiz_id');
        Route::get('get_attempt_by_id/{id}',                    	'AttemptController@get_attempt_by_id');
        Route::get('get_last_attempt_by_quiz_id/{quiz_id}',         'AttemptController@get_last_attempt_by_quiz_id');
        //attempt data
        Route::get('attempt/getPassedAttempt/{allocation_id}',         'AttemptController@getPassedAttempt');

        //update attempt status
        Route::post('attempt/updateStatus/{id}',                    'AttemptController@updateStatus');
        Route::resource('attempt',                              	'AttemptController');
        
        Route::get('get_result_by_attempt_id/{attempt_id}',         'ResultController@get_result_by_attempt_id');
        Route::get('get_result_by_question_id/{question_id}',       'ResultController@get_result_by_question_id');
        Route::get('get_result_by_id/{id}',                         'ResultController@get_result_by_id');
        Route::resource('result',                                 	'ResultController');
        
        Route::get('lesson/by_video/{id}',                          'LessonController@by_video');

        Route::get('lesson/getAssignees/{id}',                      'LessonController@getAssignees');


        Route::get('lesson/by_quiz/{id}',                           'LessonController@by_quiz');
        Route::get('lesson/by_child/{id}',                          'LessonController@by_child');
        Route::get('lesson/by_house/{id}',                          'LessonController@by_house');
        Route::get('lesson/submit/{id}',                            'LessonController@submit');
        Route::get('lesson/recommended',                            'LessonController@recommended');
        Route::get('lesson/getratingsbyvideoid/{id}',               'LessonController@getratingsbyvideoid');
        Route::get('lesson/restrcitparentrating/{id}',               'LessonController@restrict_parent_rating');
        Route::resource('lesson/addvideorating',                     'LessonController@addVideoRating');
        Route::post('lesson/update_question',                       'LessonController@update_question');
        Route::resource('lesson',                                   'LessonController');
        
        Route::resource('childhouse', 								'ChildHouseController');
        
        Route::get('reward/by_child/{id}', 							'RewardController@by_child');
        Route::get('reward/child_data/{id}', 						'RewardController@child_data');
        Route::get('reward/behavior_analysis/{id}', 				'RewardController@behavior_analysis');
        Route::get('reward/chore_analysis/{id}', 				    'RewardController@chore_analysis');
        Route::get('reward/lesson_analysis/{id}', 				    'RewardController@lesson_analysis');
        Route::resource('reward', 									'RewardController');
        
        Route::resource('taskcategory', 							'TaskCategoryController');
        Route::get('taskcategory/by_id/{id}', 						'TaskCategoryController@by_id');
        
        Route::get('task/get_tasks', 								'TaskController@get_tasks');
        Route::get('task/by_id/{id}', 								'TaskController@by_id');
        Route::get('task/by_house/{id}', 							'TaskController@by_house');
        Route::post('task/deleteTask/{id}', 						'TaskController@deleteTask');
        Route::get('task/checkTaskAllocationUsage/{id}', 			'TaskController@checkTaskAllocationUsage');
        Route::resource('task', 									'TaskController');
        
        Route::get('taskallocation/get_by_id/{id}', 				'TaskallocationController@get_by_id');
        Route::get('taskallocation/get_by_task_id/{id}', 			'TaskallocationController@get_by_task_id');
        Route::get('taskallocation/get_by_child_id/{id}', 			'TaskallocationController@get_by_child_id');
        Route::get('taskallocation/get_by_house_id/{id}', 			'TaskallocationController@get_by_house_id');
        Route::get('taskallocation/get_my_assigned_tasks', 			'TaskallocationController@get_my_assigned_tasks');
        Route::resource('taskallocation', 							'TaskallocationController');
        
        Route::get('taskattempt/by_id/{id}', 						'TaskattemptController@by_id');
        Route::get('taskattempt/by_house/{id}', 					'TaskattemptController@by_house_id');
        Route::get('taskattempt/by_child_id/{id}', 					'TaskattemptController@by_child_id');
        Route::get('taskattempt/by_taskallocation_id/{id}', 		'TaskattemptController@by_taskallocation_id');
        Route::get('taskattempt/by_task_id/{id}', 					'TaskattemptController@by_task_id');
        Route::post('taskattempt/review/{id}', 					    'TaskattemptController@review');
        Route::resource('taskattempt', 								'TaskattemptController');
        
        Route::get('homegiftcard/by_id/{id}', 						'HomeGiftCardController@by_id');
        Route::get('homegiftcard/getGiftCardByHouse', 				'HomeGiftCardController@getGiftCardByHouse');
        Route::get('homegiftcard/getHouseGiftCard/{id}', 	        'HomeGiftCardController@getHouseGiftCard');
        Route::get('homegiftcard/getHouseGiftCardByChild/{id}', 	'HomeGiftCardController@getHouseGiftCardByChild');
        Route::get('homegiftcard/by_house1/{id}', 					'HomeGiftCardController@by_house1');
        Route::get('homegiftcard/by_house/{id}', 					'HomeGiftCardController@by_house');
        Route::resource('homegiftcard', 							'HomeGiftCardController');
        
        Route::get('childgiftcard/by_id/{id}', 						'ChildGiftCardController@by_id');
        Route::get('childgiftcard/by_house/{id}', 					'ChildGiftCardController@by_house');
        Route::get('childgiftcard/by_sponsor', 					    'ChildGiftCardController@getChildRequestedGiftCardFromSponsor');
        Route::get('childgiftcard/by_child/{id}', 					'ChildGiftCardController@by_child');
        Route::get('childgiftcard/getHouseGiftCardByChild/{id}', 	'ChildGiftCardController@getHouseGiftCardByChild');
        Route::post('childgiftcard/card_approve/{id}', 				'ChildGiftCardController@card_approve');
        Route::post('childgiftcard/reject/{id}', 				    'ChildGiftCardController@reject');
        Route::resource('childgiftcard', 							'ChildGiftCardController');
        Route::get('childgiftcardpoints/{id}', 				        'ChildGiftCardController@child_giftcard_points');

        Route::resource('payment', 									'PaymentController');
        
        Route::post('giftcard/charge', 								'GiftCardController@charge');
        Route::get('giftcard/get', 									'GiftCardController@get');
        Route::get('giftcard/isAvailablePonintForRequest/{child}/{points}', 		    'GiftCardController@isAvailablePonintForRequest');
        Route::get('giftcard/card_by_id/{id}', 						'GiftCardController@card_by_id');
        Route::get('giftcard/getChaildGiftCardByChildGiftCard/{id}', 'GiftCardController@getChaildGiftCardByChildGiftCard');
        Route::post('giftcard/purchaseGiftCard/{card_id}',          'GiftCardController@purchaseGiftCard');
        Route::resource('giftcard', 								'GiftCardController');
        
        Route::get('report/households', 					        'ReportController@households');
        Route::get('report/childrens', 					            'ReportController@childrens');
        Route::get('report/lessons_analysis', 					    'ReportController@lessons_analysis');
        Route::get('report/giftcards_analysis', 					'ReportController@giftcards_analysis');
        Route::get('report/popular_lessons', 					    'ReportController@popular_lessons');
        Route::get('report/points_average', 					    'ReportController@points_average');
        Route::get('report/parent_analysis', 					    'ReportController@parent_analysis');
        Route::get('report/children_analysis', 					    'ReportController@children_analysis');
        Route::get('report/transaction_analysis', 					    'ReportController@transaction_analysis');
        // Route::resource('report', 									'ReportController');
        
        Route::post('upload/profile/{id}',                          'UploadController@profile');
        Route::post('upload/house/{id}', 							'UploadController@house');
        // Route::resource('upload', 									'UploadController');
        
        Route::resource('userlog', 								    'UserLogController');
        
        Route::get('mailsubscription/by_user/{id}',                 'MailSubscriptionController@by_user');
        Route::get('mailsubscription/by_id/{id}',                   'MailSubscriptionController@by_id');
        Route::resource('mailsubscription',                         'MailSubscriptionController');
        
        Route::get('custom/test_mail',                              'CustomController@test_mail');
        Route::get('custom/mailsubscription',                       'CustomController@mailsubscription');
        Route::get('custom/html2image',                             'CustomController@html2image');
        Route::post('custom/testImageResize',                       'CustomController@testImageResize');
        Route::resource('custom',                                   'CustomController');
        
        Route::get('certificate/by_id/{id}',                        'CertificateController@by_id');
        Route::get('certificate/by_child/{id}',                     'CertificateController@by_child');
        Route::post('certificate/certificate_image',                'CertificateController@certificate_image');
        // Route::get('certificate/create_certificate/{attempt_id}/{child_id}', 'CertificateController@create_certificate');
        Route::resource('certificate', 'CertificateController');
        
        Route::get('payments/by_user/{id}', 'PaymentController@by_user');
        Route::resource('payments', 'PaymentController');

        //badge section
        Route::get('badgeType/getAllBadgeType', 'BadgeTypeController@getAllBadgeType');
        Route::resource('badgeType', 'BadgeTypeController');

        Route::get('badge/getAllBadgeType', 'BadgeController@getAllBadgeType');
        Route::get('badge/getAllBadges', 'BadgeController@getAllBadges');
        Route::get('badge/getBadgesByTypeId/{id}', 'BadgeController@getBadgesByTypeId');
        Route::get('badge/getBadgesByUser', 'BadgeController@getBadgesByUser');
        Route::get('badge/getBadgeById/{id}', 'BadgeController@getBadgeById');
        Route::get('badge/getBadgesByAllocationId', 'BadgeController@getBadgesByAllocationId');
        Route::get('badge/isExisted/{name}', 'BadgeController@isExisted');
        Route::get('badge/getChildAchieveBadges/{childId}', 'BadgeController@getChildAchieveBadges');
        Route::get('badge/getBadgesByChild/{childId}/{type}', 'BadgeController@getBadgesByChild');
        Route::get('badge/getBadgeLessonsByBadgeId/{badgeId}', 'BadgeController@getBadgeLessonsByBadgeId');
        Route::get('badge/getBadgeLessons/{badgeId}', 'BadgeController@getBadgeLessons');
        Route::get('badge/getAchievedBadgesByChildId/{childId}', 'BadgeController@getAchievedBadgesByChildId');
        Route::get('badge/getAchievedBadgesByChild/{childId}', 'BadgeController@getAchievedBadgesByChild');
        Route::post('badge/badgeImage/', 'BadgeController@badgeImage');

        Route::resource('badge', 'BadgeController');

        Route::get('badgeAssign/getChildrenByBadgeId/{badgeId}', 'BadgeAssignController@getChildrenByBadgeId');
        Route::get('badgeAssign/getChildAssignBadges/{childId}', 'BadgeAssignController@getChildAssignBadges');
        Route::resource('badgeAssign', 'BadgeAssignController');

        Route::post('upload/badge/{id}', 'UploadController@badge');

        //Badgecompleted controller
        Route::get('child_completed_badges_get', 'BadgecompletedController@get_past_badges');

        //bundle section
        Route::get('bundle/getAllBundles/{user_id}', 'BundleController@getAllBundles');
        Route::get('bundle/getBundleById/{id}', 'BundleController@getBundleById');

        Route::get('bundle/getBundleCompletion/{id}', 'BundleController@getBundleCompletion');
        
        Route::get('bundle/getBundleLesson/{id}', 'BundleController@getBundleLesson');

        Route::get('bundle/getBundleQuizzes/{id}', 'BundleController@getBundleQuizzes');

        Route::get('bundle/getBundGiftCard/{id}', 'BundleController@getBundGiftCard');
        Route::get('bundle/getAllBundlesForSponsor', 'BundleController@getAllBundlesForSponsor');
        Route::get('bundle/get-bundle-info/{id}', 'BundleController@getBundleInfoForChild');
        Route::get('bundle/checkBundleCompletion/{id}', 'BundleController@checkBundleCompletion');
        Route::post('bundle/request-gift-card', 'BundleController@requestGiftCardFromLessonBundle');

        Route::delete('bundle/deleteBundle/{id}', 'BundleController@deleteBundle');

        Route::resource('bundle', 'BundleController');

        Route::get('bundleType/getAllBundleType/', 'BundleTypeController@getAllBundleType');
        Route::resource('bundleType', 'BundleTypeController');

        Route::get('bundleAssign/getChildrenByBundleId/{bundleId}', 'BundleAssignController@getChildrenByBundleId');
        Route::get('bundleAssign/getChildAssignBundles/{childId}', 'BundleAssignController@getChildAssignBundles');
        Route::resource('bundleAssign', 'BundleAssignController');
        //inbox message
        Route::get('inboxMessage/getAllReceivedMessage', 'IndexMessageController@getAllReceivedMessage');
        Route::get('inboxMessage/getMessagesByChildId/{childId}', 'IndexMessageController@getMessagesByChildId');
        Route::get('inboxMessage/getAllReceivedMessageByChild/{childId}', 'IndexMessageController@getAllReceivedMessageByChild');
        Route::get('inboxMessage/getAllSentMessageByChild/{childId}', 'IndexMessageController@getAllSentMessageByChild');
        Route::get('inboxMessage/getReceivedMessage/{receiver_id}', 'IndexMessageController@getReceivedMessage');
        Route::get('inboxMessage/getSentMessage/{sender_id}', 'IndexMessageController@getSentMessage');
        Route::get('inboxMessage/getUnseenMessagesCountByChild/{sender_id}', 'IndexMessageController@getUnseenMessagesCountByChild');
        Route::get('inboxMessage/getMessagesByHouseId/{sender_id}', 'IndexMessageController@getMessagesByHouseId');
        Route::post('inboxMessage/updateMessageStatus/{id}', 'IndexMessageController@updateMessageStatus');
        Route::post('inboxMessage/updateMessageVisibility/{id}', 'IndexMessageController@updateMessageVisibility');
        Route::get('inboxMessage/getUnseenMessagesCount/{receiver_id}', 'IndexMessageController@getUnseenMessagesCount');
        Route::get('inboxMessage/getMessageByChildId/{child_id}', 'IndexMessageController@getMessageByChildId');
        Route::get('inboxMessage/getParentMessageByChildId/{child_id}', 'IndexMessageController@getParentMessageByChildId');
        Route::resource('inboxMessage', 'IndexMessageController');
        Route::get('notification/getUnread/{userId}', 'NotificationController@getUnreadNotifications');
        Route::get('notification/getUnreadNotificationCount/{userId}', 'NotificationController@getUnreadNotificationCount');
        Route::post('notification/updateAsRead', 'NotificationController@updateAsRead');

        Route::post('add_flag', 'LessonController@addFlag');
        Route::post('delete_flag', 'LessonController@deleteFlag');







    });

Route::post('paymentEvent', function (App\Http\Controllers\StripWebhookController $request){


});

        // http://www.sitepoint.com/crop-and-resize-images-with-imagemagick/
        // https://github.com/Intervention/image
        // https://github.com/madcoda/php-youtube-api
        
        /**
         * Need to show @ sgin-up, Username exist error/email exist error
         * 
         * 
         */

Route::get('test11', function (Illuminate\Http\Request $request) {

//    $title = $request->input('title');
//    $content = $request->input('content');
//
//    Mail::send('emails.test', ['title' => $title, 'content' => $content], function ($message)
//    {
//
//        $message->from('gayan@wsolus.com', 'Christian Nwamba');
//
//        $message->to('gayanvirajith@gmail.com');
//
//    });
//
//    return response()->json(['message' => 'Request completed']);
    $users = App\User::latest()->with('mail_subscription')->where('user.role_id', 2)->where('user.enable', 1)->get();
});


if (App::environment('local')){
    \DB::listen(function($sql, $bindings, $time) {
        \Log::debug($sql);
        \Log::debug($bindings);
        \Log::debug($time);
    });
}
         