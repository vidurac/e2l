(function () {
    'use strict';
    angularEarnToLearnApp.config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES', function ($stateProvider, $urlRouterProvider, USER_ROLES) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
        // Logging Route
            .state('landing', {
                url: "/",
                templateUrl: "angularapp/views/auth/login.html",
                data: {
                    requireLogin: false,
                    authorizedRoles: [USER_ROLES]
                },
                controller: "AuthController as auth"
            })
            // Logging Route
            .state('login', {
                url: "/login",
                templateUrl: "angularapp/views/auth/login.html",
                data: {
                    requireLogin: false,
                    authorizedRoles: [USER_ROLES]
                },
                controller: "AuthController as auth"
            })
            // Register Route
            .state('register', {
                url: "/register",
                templateUrl: "angularapp/views/auth/register.html",
                data: {
                    requireLogin: false,
                    authorizedRoles: [USER_ROLES]
                },
                controller: "AuthController"
            })
            // Forgot Password Route
            .state('forgot', {
                url: "/forgot",
                templateUrl: "angularapp/views/auth/forgot.html",
                data: {
                    requireLogin: false,
                    authorizedRoles: [USER_ROLES]
                },
                controller: "AuthController as auth"
            })
            .state('completeSponsorAccount', {
                url: "/complete-sponsor-account/:token",
                templateUrl: "angularapp/views/auth/complete-sponsor.html",
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "AuthController as auth"
            })
            .state('readySponsorAccount', {
                url: "/sponsor-account-ready/:token",
                template: "<div ng-init='getReadySponsorToken()'></div>",
                data: {
                    requireLogin: false,
                    authorizedRoles: [USER_ROLES]
                },
                controller: "SponsorController"
            })
            // Reset Password Route
            .state('reset', {
                url: "/reset/:resetToken",
                templateUrl: "angularapp/views/auth/reset_psw.html",
                data: {
                    requireLogin: false,
                    authorizedRoles: [USER_ROLES]
                },
                controller: "AuthController as auth"
            })
            // ConfirmEmail Route
            .state('confirmemail', {
                url: "/confirm/:token",
                templateUrl: "angularapp/views/auth/confirm_email.html",
                data: {
                    requireLogin: false,
                    authorizedRoles: [USER_ROLES]
                },
                controller: "AuthController as auth"
            })
            // certificate Route
            .state('certificate', {
                url: "/certificate",
                templateUrl: "angularapp/views/parent/certificate-common.html",
                data: {
                    requireLogin: false,
                    authorizedRoles: [USER_ROLES]
                },
                controller: "AuthController as auth"
            })
            // Error Routes
            .state('404', {
                url: "/404",
                templateUrl: "angularapp/views/_errors/404.html",
                data: {
                    requireLogin: false,
                    authorizedRoles: [USER_ROLES]
                }
            })
            // FB share Routes
            .state('fbshare', {
                url: "/fbshare",
                templateUrl: "angularapp/views/socialmedia/fb.html",
                data: {
                    requireLogin: false,
                    authorizedRoles: [USER_ROLES]
                }
            })
            /***********Admin Routes***********/
            // Admin Routes
            .state('admin', {
                abstract: true,
                url: '/admin',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                templateUrl: 'angularapp/views/_shared/_admin.template.html',
                controller: "AdminController"
            })
            // Admin-Dashboard
            .state('admin.dashboard', {
                url: '/dashboard',
                templateUrl: 'angularapp/views/admin/dashboard.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "AdminController"
            })
            // Admin-Categories
            .state('admin.categories', {
                url: '/category',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                templateUrl: 'angularapp/views/admin/category.html',
                controller: "CategoryController"
            })
            .state('admin.category', {
                url: '/category/:id',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                templateUrl: 'angularapp/views/admin/category_details.html',
                controller: "CategoryController"
            })

            .state('parent.category', {
                url: '/category/:id',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/admin/category_details.html',
                controller: "CategoryController"
            })

            // Admin-Add Lessons
            .state('admin.addlessons', {
                url: '/addlessons',
                templateUrl: 'angularapp/views/admin/add-lesson.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "LessonController"
            })

            // Parent-Add Lessons
            .state('parent.addlessons', {
                url: '/addlessons',
                templateUrl: 'angularapp/views/admin/add-lesson.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "LessonController"
            })

            .state('admin.addlessonstocat', {
                url: '/addlessons/:catId',
                templateUrl: 'angularapp/views/admin/add-lesson.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "LessonController"
            })

            .state('parent.addlessonstocat', {
                url: '/addlessons/:catId',
                templateUrl: 'angularapp/views/admin/add-lesson.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "LessonController"
            })
            // Admin Edit Lesson
            .state('admin.editlesson', {
                url: '/editlesson/:id',
                templateUrl: 'angularapp/views/admin/edit-lesson.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "LessonController"
            })

            // Parent Edit Lesson
            .state('parent.editlesson', {
                url: '/editlesson/:id',
                templateUrl: 'angularapp/views/admin/edit-lesson.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "LessonController"
            })
            // Admin-Lessons
            .state('admin.lessons', {
                url: '/lessons',
                templateUrl: 'angularapp/views/admin/videos.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1],USER_ROLES[2]]
                },
                controller: "VideoController"
            })

            // Parent-Lessons
            .state('parent.lessons', {
                url: '/lessons',
                templateUrl: 'angularapp/views/parent/videos.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1],USER_ROLES[2]]
                },
                controller: "VideoController"
            })

            // Admin-Video View
            .state('admin.video', {
                url: '/lesson/:id',
                templateUrl: 'angularapp/views/admin/lesson_view.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1],USER_ROLES[2]]
                },
                controller: "LessonController"
            })

            // Parent-Video View
            .state('parent.video', {
                url: '/lesson/:id',
                templateUrl: 'angularapp/views/parent/lesson_view.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "LessonController"
            })

            // Administrators (disabled)
            .state('admin.administrators', {
                url: '/administrators',
                templateUrl: 'angularapp/views/admin/administrators.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "UserController"
            })
            // Parents
            .state('admin.parents', {
                url: '/parents',
                templateUrl: 'angularapp/views/admin/parents.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "UserController"
            })
            // Parents
            .state('admin.user', {
                url: '/user/:id',
                templateUrl: 'angularapp/views/admin/user-view.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "UserController"
            })
            // Profile
            .state('admin.profile', {
                url: '/profile',
                templateUrl: 'angularapp/views/admin/user-view.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "UserController"
            })
            // Members
            .state('admin.members', {
                url: '/children',
                templateUrl: 'angularapp/views/admin/members.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "UserController"
            })
            // Admin-Houses
            .state('admin.houses', {
                url: '/houses',
                templateUrl: 'angularapp/views/admin/houses.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "HouseController"
            })
            // Admin-Houses
            .state('admin.house', {
                url: '/house/:id',
                templateUrl: 'angularapp/views/admin/house_view.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "HouseController"
            })
            // Admin-Tasks categories
            .state('admin.taskcategories', {
                url: '/task/categories',
                templateUrl: 'angularapp/views/admin/tasks-categories.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "TaskController"
            })
            // Admin-Tasks
            .state('admin.tasks', {
                url: '/tasks',
                templateUrl: 'angularapp/views/admin/tasks.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "TaskController"
            })

            // Admin-Reports
            .state('admin.reports', {
                url: '/reports',
                templateUrl: 'angularapp/views/admin/reports.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "ReportController"
            })
            // All Transactions
            .state('admin.transactions', {
                url: '/transactions',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                templateUrl: 'angularapp/views/admin/transactions.html',
                controller: "PaymentController"
            })

            /** badges section **/
            .state('admin.badges', {
                url: '/badges/',
                templateUrl: 'angularapp/views/admin/badges.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "BadgeController"
            })

            .state('admin.addBadge', {
                url: '/badges/badge',
                templateUrl: 'angularapp/views/admin/add-badge.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "BadgeController"
            })
            .state('admin.updateBadge', {
                url: '/badges/badge/:id',
                templateUrl: 'angularapp/views/admin/update-badge.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "BadgeController",

            })

            // Bundle Section
            .state('admin.bundles', {
                url: '/bundles',
                templateUrl: 'angularapp/views/admin/bundles.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "BundleController",

            })

            .state('admin.addBundle', {
                url: '/bundles/bundle',
                templateUrl: 'angularapp/views/admin/add-bundle.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "BundleController"
            })

            /*.state('admin.updateBundle', {
                url: '/bundles/bundle/:id',
                templateUrl: 'angularapp/views/admin/update-bundle.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[1]]
                },
                controller: "BundleController",

            })*/


            /*******************************Parent Routes**************************************/

            // Parent Routes
            .state('parent', {
                abstract: true,
                url: '/parent',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/_shared/_parent.template.html'
            })
            // Parent-Dashboard
            .state('parent.dashboard', {
                url: '/dashboard',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/dashboard.html',
                controller: 'ParentController'
            })
            // Parent-Dashboard
            .state('parent.house', {
                url: '/house',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/house.html',
                controller: "HouseController"
            })
            // Parent Add new members
            .state('parent.addNewParticipant', {
                url: '/add',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/add-participants.html',
                controller: "UserController"
            })
            // Parent Add new sponser
            .state('parent.addSponsor', {
                url: '/add-sponsor',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/add-sponsor.html',
                controller: "SponsorController"
            })
            // All sponsors
            .state('parent.allSponsors', {
                url: '/sponsors',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/all-sponsors.html',
                controller: "SponsorController"
            })
            // All members
            .state('parent.allParticipant', {
                url: '/participants',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/all-participants.html',
                controller: "UserController"
            })
            // Load User
            .state('parent.user', {
                url: '/user/:id',
                templateUrl: 'angularapp/views/parent/user-view.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "UserController"
            })
            // Load User
            .state('parent.profile', {
                url: '/profile',
                templateUrl: 'angularapp/views/parent/profile.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "UserController"
            })
            // View Lesson
            .state('parent.lesson', {
                url: '/lesson/:id',
                templateUrl: 'angularapp/views/parent/lesson_view.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "LessonController"
            })
            .state('parent.sponsorLesson', {
                url: '/sponsor-lesson/:id/:houseId',
                templateUrl: 'angularapp/views/parent/sponsor_lesson_view.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "LessonController"
            })
            // Search Lessons
            .state('parent.mylessons', {
                url: '/mylessons',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/my-lessons.html',
                controller: "LessonController"
            })
            // Search Lessons
            .state('parent.sponsorLessons', {
                url: '/sponsor-lessons',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/sponsor-lessons.html',
                controller: "LessonController"
            })
            // Search Lessons
            .state('parent.childlessons', {
                url: '/childlessons',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/child-lessons.html',
                controller: "LessonController"
            })
            // Sponsor child selections
            .state('parent.childsponsorlessons', {
                url: '/childsponsorlessons',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/child-sponsor-lessons.html',
                controller: "LessonController"
            })
            // Browse Lessons
            .state('parent.browselessons', {
                url: '/browselessons',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/browse-lessons.html',
                controller: "LessonController"
            })
            // Search Lessons results
            .state('parent.resultslessons', {
                url: '/searchlessons/:find',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/search-results.html',
                controller: "LessonController"
            })
            // House Assigned Tasks
            .state('parent.assignedTasks', {
                url: '/assignedtasks',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/house-tasks.html',
                controller: "TaskController"
            })
            // Finished Tasks
            .state('parent.finishedTasks', {
                url: '/finishedTasks',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/finished-tasks.html',
                controller: "TaskController"
            })
            // Browse Tasks
            .state('parent.browseTasks', {
                url: '/tasks',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/browse-tasks.html',
                controller: "TaskController"
            })
            // Allocate Tasks
            .state('parent.task', {
                url: '/task/:id',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/task_view.html',
                controller: "TaskController"
            })
            // Payments
            .state('parent.payment', {
                url: '/pay',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/payment.html',
                controller: "PaymentController"
            })
            // All Gift cards
            .state('parent.allCards', {
                url: '/cards',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/all-gift-cards.html',
                controller: "GiftcardController"
            })
            // House Gift cards
            .state('parent.myCards', {
                url: '/mycards',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/house-gift-cards.html',
                controller: "GiftcardController"
            })
            // Child Requested Gift cards
            .state('parent.myCardsRequests', {
                url: '/childcards',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/child-gift-cards.html',
                controller: "GiftcardController"
            })
            // Child Requested Gift cards
            .state('parent.sponsoredCardsRequests', {
                url: '/sponsored-child-cards',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/sponsored-child-gift-cards.html',
                controller: "GiftcardController"
            })
            // Parent Transactions
            .state('parent.transactions', {
                url: '/transactions',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/transactions.html',
                controller: "PaymentController"
            })
            // Parent Configurations
            .state('parent.configurations', {
                url: '/configurations',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/configurations.html',
                controller: "HouseController"
            })

            // Parent Badge section
            .state('parent.badges', {
                url: '/badges',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                templateUrl: 'angularapp/views/parent/badges.html',
                controller: "BadgeController"
            })

            .state('parent.addBadge', {
                url: '/badges/badge',
                templateUrl: 'angularapp/views/parent/add-badge.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "BadgeController"
            })

            .state('parent.updateBadge', {
                url: '/badges/badge/:id',
                templateUrl: 'angularapp/views/parent/update-badge.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "BadgeController"
            })

            .state('parent.assignBadges', {
                url: '/badges/assign/',
                templateUrl: 'angularapp/views/parent/child-badge.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "BadgeController"
            })

            .state('parent.loadBadge', {
                url: '/badges/assign/:id',
                templateUrl: 'angularapp/views/parent/child-badge.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "BadgeController"
            })

            .state('parent.loadAchieveBadge', {
                url: '/badges/achieve/',
                templateUrl: 'angularapp/views/parent/child-achieve-badge.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "BadgeController"
            })


            // Bundle Section
            .state('parent.bundles', {
                url: '/bundles',
                templateUrl: 'angularapp/views/parent/bundles.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "BundleController",

            })

            // Sponsor Bundles
            .state('parent.sponsorBundles', {
                url: '/sponsor-bundles',
                templateUrl: 'angularapp/views/parent/sponsor-bundles.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "BundleController",

            })

            .state('parent.addBundle', {
                url: '/bundles/bundle',
                templateUrl: 'angularapp/views/parent/add-bundle.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "BundleController"
            })

            .state('parent.updateBundle', {
                url: '/bundles/updateBundle/:id',
                templateUrl: 'angularapp/views/parent/update-bundle.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "BundleController",

            })

            .state('parent.inboxMessage', {
                url: '/messages',
                templateUrl: 'angularapp/views/parent/inbox-messages.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "InboxMessageController"
            })

            .state('parent.createMessage', {
                url: '/messages/createMessage',
                templateUrl: 'angularapp/views/parent/create-message.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "InboxMessageController"
            })


            .state('parent.giftcardPayment', {
                url: '/payment/giftcard/:id',
                templateUrl: 'angularapp/views/parent/giftcard-payment.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[2]]
                },
                controller: "GiftcardController"
            })


            /*******************************Child Routes**************************************/

            // Child Routes
            .state('child', {
                abstract: true,
                url: '/child',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/_shared/_child.template-v2.html',
                controller: 'ChildController'
            })
            // Child-Dashboard
            // .state('child.dashboard', {
            //     url: '/lessons',
            //     data: {
            //         requireLogin: true,
            //         authorizedRoles: [USER_ROLES[3]]
            //     },
            //     templateUrl: 'angularapp/views/child/lessons.html',
            //     controller: "ChildController"
            // })
            // Child Assigned-Lessons
            .state('child.lessons', {
                url: '/lessons',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/child/lessons.html',
                controller: "ChildController"
            })
            // Child Assigned-Lesson bundles
            .state('child.lessonBundles', {
                url: '/lesson-bundles',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/child/lesson-bundles.html',
                controller: "ChildController"
            })
            // Child Assigned-Chores
            .state('child.chores', {
                url: '/chores',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/child/chores.html',
                controller: "ChildController"
            })

            // Child Assigned-Gift-cards
            .state('child.gift-cards', {
                url: '/gift-cards',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/child/gift-cards.html',
                controller: "ChildController"
            })
            // Child Assigned-Lessons
            .state('child.lessonDetails', {
                url: '/quiz/:quizid',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/child/lesson-details.html',
                controller: "AttemptController"
            })
            // Child Lesson bundle Assigned-Lessons
            .state('child.lessonBundleLessonDetails', {
                url: '/bundle/:bundleId/quiz/:quizid',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/child/lesson-details.html',
                controller: "AttemptController"
            })
            // Child Assigned-Lessons
            .state('child.lesson', {
                url: '/lesson/:quizid/:attemptid',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/child/quiz.html',
                controller: "AttemptController"
            })
            // Child Assigned-Lessons
            .state('child.lessonBundleLesson', {
                url: '/bundle/:bundleId/lesson/:quizid/:attemptid',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/child/quiz.html',
                controller: "AttemptController"
            })
            // Watch Selected Video
            .state('child.watchVideo', {
                url: '/video/:quizid/:attemptid',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/child/video.html',
                controller: "AttemptController"
            })
            // Watch Lesson bundle Selected Video
            .state('child.LessonBundleWatchVideo', {
                url: '/bundle/:bundleId/video/:quizid/:attemptid',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/child/video.html',
                controller: "AttemptController"
            })

            // Load User
            .state('child.profile', {
                url: '/profile',
                templateUrl: 'angularapp/views/child/user-view.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                controller: "UserController"
            })
            // Assigned Tasks
            .state('child.tasks', {
                url: '/tasks',
                templateUrl: 'angularapp/views/child/tasks.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                controller: "TaskController"
            })
            // Assigned Task by Id
            .state('child.task', {
                url: '/task/:allocation_id',
                templateUrl: 'angularapp/views/child/task-view.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                controller: "TaskController"
            })

            //message
            .state('child.inboxMessage', {
                url: '/messages',
                templateUrl: 'angularapp/views/child/inbox-messages.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                controller: "InboxMessageController"
            })


            .state('child.createMessage', {
                url: '/messages/createMessage/:id',
                templateUrl: 'angularapp/views/child/create-message.html',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                controller: "InboxMessageController"
            })

            // Lesson bundle detail
            .state('child.lessonBundleDetails', {
                url: '/lesson-bundle/:bundleId',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/child/lesson-bundle-details.html',
                controller: 'LessonBundleController'
            })
            //achieved badges
            .state('child.achieved', {
                url: '/achieved-badges',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[3]]
                },
                templateUrl: 'angularapp/views/child/achieved-badges.html',
                controller: 'BadgeController'
            })


            // Sponsor Routes
            .state('sponsor', {
                abstract: true,
                url: '/sponsor',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[5]]
                },
                templateUrl: 'angularapp/views/_shared/_sponsor.template.html'
            })
            // Sponsor-Dashboard
            .state('sponsor.dashboard', {
                url: '/dashboard',
                data: {
                    requireLogin: true,
                    authorizedRoles: [USER_ROLES[5]]
                },
                templateUrl: 'angularapp/views/sponsor/dashboard.html',
            })


    }]);
   })();