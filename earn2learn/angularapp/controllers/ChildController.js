(function () {
    'use strict';
    angularEarnToLearnControllers.controller('ChildController', ['$scope', '$rootScope', '$state', '$window', '$localStorage', '_URLS', 'AuthService', 'LessonService', 'ChildService', 'TaskService', 'UserService', 'AUTH_EVENTS', 'GiftcardService', 'cfpLoadingBar', '$q', 'NotificationService', 'InboxMessageService', '$timeout', 'BundleAssignService', '$interval', function ($scope, $rootScope, $state, $window, $localStorage, _URLS, AuthService, LessonService, ChildService, TaskService, UserService, AUTH_EVENTS, GiftcardService, cfpLoadingBar, $q, NotificationService, InboxMessageService, $timeout, BundleAssignService, $interval) {

        // Video Model
        $scope.LessonModel = {
            myLessons: [],
            myTasks: []
        };
        $scope.child_total_points = 0;
        $scope.completedPercentage = 0;
        // Define resources model
        $scope.resources = {
            stillLoading: false,
        }

        $scope.loadingAssignedLessons = false;
        $scope.loadingAssignedTasks = false;
        $scope.loadingAssignGiftCards = false;

        $scope.breakpoints = [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }];

        $scope.badgeimages = [];
        var badgeimgdata = null;

        // Get int
        $scope.getInt = function (ret) {
            return parseInt(ret);
        }

        // Get Total Points
        $scope.getTot = function () {
            return $scope.completedPercentage;
        }

        // Init Child Controller
        $scope.init_child_ctrl = function () {
            $scope.getAssignLessonCount();
            $scope.getChildBadgePoints();
            $scope.getTotalPoints();
            $scope.getLastCompletedBadges();
            $scope.getMyAssignedLessonsCompletedPercentage();
            $scope.initNewMessageCount();
        }

        // Get Assign Lessons Count
        $scope.getAssignLessonCount = function () {
            $scope.assignLessonCount = 0;
            LessonService.getMyAssignedLessons(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.assignLessonCount = 0;
                    angular.forEach(response.data, function (e, i) {
                        if (e.status != 3) {
                            $scope.assignLessonCount += 1;
                        }
                    })
                } else {
                    console.log("ERROR : Failed To Load Child Assign Lessons Count.");
                    console.log(response.message);
                    $scope.assignLessonCount = 0;
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Assign Lessons Count.");
                console.log(error);
                $scope.assignLessonCount = 0;
            });
        }

        // Get My Assign Lessons (For Child)
        $scope.getMyAssignedLessons = function () {
            $scope.tab = 'available';
            //$scope.resources.stillLoading = true;
            $scope.LessonModel.myLessons = [];
            $scope.loadingAssignedLessons = true;
            LessonService.getMyAssignedLessons(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.refreshMyAssignedLessons(response.data);
                    $scope.loadingAssignedLessons = false;
                } else {
                    console.log("ERROR : Failed To Load Child Assign Lessons.");
                    console.log(response.message);
                    $scope.refreshMyAssignedLessons([]);
                    $scope.loadingAssignedLessons = false;
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Assign Lessons.");
                console.log(error);
                $scope.refreshMyAssignedLessons([]);
                $scope.loadingAssignedLessons = false;
            });
        }

        // get badge points
        $scope.getChildBadgePoints = function () {
            var deferred = $q.defer();
            ChildService.getSystemBadgePoints().then(function (response) {
                if (response.query_status == "success") {
                    $scope.badgepoints = response.data;
                    var badgename = response.data;
                    // console.log('Badge name is:'+badgename[0]['name']);
                    deferred.resolve(response);
                } else {
                    deferred.resolve(response);
                    console.log("ERROR : Failed to load badge points");
                    console.log(response);
                }
            }, function (error) {
                console.log("ERROR : Failed to load badge points");
                console.log(error);
            });
        }


        // Get Total points
        $scope.getTotalPoints = function () {
            var deferred = $q.defer();
            UserService.getRewardsByChild(JSON.parse($localStorage.user).id).then(function (response) {

                if ((response.query_status == "success")) {
                    var childtotalpoints = response.data.total_points;
                    //var status_data = response.data.user_id;

                    deferred.resolve(response);
                    if (childtotalpoints > 0) {
                        $scope.child_total_points = response.data.total_points;
                    }
                    if (childtotalpoints < 0) {
                        $scope.child_total_points = 0;
                    }
                } else {
                    $scope.child_total_points = 0;
                    deferred.resolve(response);
                }
            }, function (error) {
                $scope.child_total_points = 0;
            });
        }

        //Get last completed 5 badges
        $scope.getLastCompletedBadges = function () {
            var deferred = $q.defer();
            ChildService.getLastCompletedBadges().then(function (response) {
                if (response.query_status == 'success') {
                    $scope.badgedata = response.data;
                    var badge_data = response.data;
                    for (var i = 0; i < badge_data.length; i++) {
                        badgeimgdata = badge_data[i]['badge_image'];
                        $scope.badgeimages.push(badgeimgdata);
                    }
                    deferred.resolve(response);
                }

            }, function (error) {
                console.log('error loading achieved baddges');
                $scope.badgedata = null;
                deferred.resolve(response);
            });
        }


        // Get My Assign Lessons completed Perecentage
        $scope.getMyAssignedLessonsCompletedPercentage = function () {
            LessonService.getMyAssignedLessons(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status == "success") {

                    var total_giftcard_points = response.childgiftcard_points;
                    console.log('Total gift card points are :'+ total_giftcard_points);
                    var childpoints = $scope.child_total_points;
                    console.log('Child total points are :'+ childpoints);

                    var giftcard_completed_percentage;

                    if(childpoints > total_giftcard_points){
                        giftcard_completed_percentage = ((childpoints-total_giftcard_points)/childpoints)*100;

                        var completedgift_card_points = ((total_giftcard_points)/childpoints)*100;
                        $scope.completedPercentageGiftCard = completedgift_card_points.toFixed(2);

                        $rootScope.$broadcast("update-complete-percentage", {
                            parameters: {
                                completedPercentage: giftcard_completed_percentage
                            }
                        });
                    }
                    else if(childpoints==null||childpoints==0){
                        giftcard_completed_percentage = 0;

                        var completedgift_card_points = 0;
                        $scope.completedPercentageGiftCard = completedgift_card_points;
                        $rootScope.$broadcast("update-complete-percentage", {
                            parameters: {
                                completedPercentage: 0
                            }
                        });
                    }
                    else {
                        giftcard_completed_percentage = ((childpoints-total_giftcard_points)/childpoints)*100;

                        var completedgift_card_points = ((total_giftcard_points)/childpoints)*100;
                        $scope.completedPercentageGiftCard = completedgift_card_points.toFixed(2);
                        $rootScope.$broadcast("update-complete-percentage", {
                            parameters: {
                                completedPercentage: 100
                            }
                        });
                    }
                    // for (var i = 0; i < total_giftcards.length; i++) {
                    //     var giftcard_point = total_giftcards[i]['points'];
                    //
                    //     if (childpoints == giftcard_point) {
                    //         $rootScope.$broadcast("update-complete-percentage", {
                    //             parameters: {
                    //                 completedPercentage: 100
                    //             }
                    //         });
                    //         break;
                    //     }
                    //     if (giftcard_point > childpoints) {
                    //
                    //         $rootScope.$broadcast("update-complete-percentage", {
                    //             parameters: {
                    //                 completedPercentage: (childpoints / giftcard_point) * 100
                    //             }
                    //         });
                    //         $scope.badgeimage = 'uploads/badges/' + badgeimage;
                    //         break;
                    //     }
                    //
                    // }


                } else {
                    $rootScope.$broadcast("update-complete-percentage", {
                        parameters: {
                            completedPercentage: 0
                        }
                    });
                }
            }, function (error) {
                $rootScope.$broadcast("update-complete-percentage", {
                    parameters: {
                        completedPercentage: 0
                    }
                });
            });
        }

        // Refresh My Assigned Lessons
        $scope.refreshMyAssignedLessons = function (data) {
            $scope.LessonModel.myLessons = data;
        }

        // Get My Assigned Tasks
        $scope.getMyAssignedTasks = function () {
            $scope.LessonModel.myTasks = [];
            $scope.loadingAssignedTasks = true;

            TaskService.getMyAssignedTasks().then(function (response) {
                if (response.query_status == "success") {
                    $scope.refreshMyAssignedTasks(response.data);
                    $scope.loadingAssignedTasks = false;
                } else {
                    console.log("ERROR : Failed To Load Child Assign Lessons.");
                    console.log(response.message);
                    $scope.refreshMyAssignedTasks([]);
                    $scope.loadingAssignedTasks = false;
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Assign Lessons.");
                console.log(error);
                $scope.refreshMyAssignedTasks([]);
                $scope.loadingAssignedTasks = false;
            });
        }

        // Refresh My Assigned Tasks
        $scope.refreshMyAssignedTasks = function (data) {
            $scope.LessonModel.myTasks = data;
        }


        // jsonDecodeStr
        $scope.jsonDecodeStr = function (str) {
            return JSON.parse(str);
        }

        // load house assigned gift cards
        $scope.getChildAssignedGiftCards = function () {
            $scope.loadingAssignGiftCards = true;

            GiftcardService.getHouseGiftCardByChild(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.houseAssighedGiftCards = response.data;
                    $scope.loadingAssignGiftCards = false;
                } else {
                    console.log("ERROR : Failed to load house assigned gift cards");
                    console.log(response);
                    $scope.loadingAssignGiftCards = false;
                    $scope.houseAssighedGiftCards = [];
                }
            }, function (error) {
                console.log("ERROR : Failed to load house assigned gift cards");
                console.log(error);
                $scope.loadingAssignGiftCards = false;
                $scope.houseAssighedGiftCards = [];
            });
        }


        // request gift cards from parent
        $scope.childRequestGiftCard = function (giftCard) {
            GiftcardService.isAvailablePonintForRequest(JSON.parse($localStorage.user).id, giftCard.card_points).then(function (response) {
                console.log(response.data);
                if (response.query_status == "success" && response.data.canRequest) {
                    console.log();
                    swal({
                        title: "Are you sure?",
                        text: "Are you sure to request this card from parent?",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, I want it!",
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true
                    }, function (confirmed) {
                        if (confirmed) {
                            giftCard["child_id"] = JSON.parse($localStorage.user).id;
                            console.log(giftCard);

                            var giftCardRequestobject = {
                                housecard_id: giftCard.card_id,
                                house_id: giftCard.card_house_id,
                                child_id: giftCard.child_id,
                                enable: 1,
                                card_house_id: giftCard.card_id,
                            };

                            if (giftCard.sponsor_id) {
                                giftCardRequestobject.sponsor_id = giftCard.sponsor_id;
                            }
                            console.log(giftCardRequestobject);
                            // check card_house_id

                            if (undefined != giftCardRequestobject.sponsor_id) {
                                GiftcardService.canChildRequestGiftCardFromSponsor(giftCardRequestobject.sponsor_id, giftCard.card_points).then(function (response) {
                                    console.log(response.data);

                                    if (response.query_status == "success" && response.data.canRequest) {

                                        GiftcardService.childRequestGiftCard(giftCardRequestobject).then(function (response) {
                                            if (response.query_status == "success") {
                                                swal({
                                                    type: "success",
                                                    title: "Success!",
                                                    text: "You have successfully requested a gift card from parent.",
                                                    timer: 3000,
                                                    showConfirmButton: false
                                                });
                                            } else {
                                                console.log("ERROR : Failed to request gift cards from parent");
                                                console.log(response);
                                                swal({
                                                    type: "error",
                                                    title: "Oops!",
                                                    text: "Failed to requested a gift card from parent.",
                                                    timer: 3000,
                                                    showConfirmButton: false
                                                });
                                            }
                                        }, function (error) {
                                            console.log("ERROR : Failed to request gift cards from parent");
                                            console.log(error);
                                            swal({
                                                type: "error",
                                                title: "Oops!",
                                                text: "Failed to requested a gift card from parent.",
                                                timer: 3000,
                                                showConfirmButton: false
                                            });
                                        });

                                    } else {
                                        console.log("ERROR : Failed to request gift cards from parent");
                                        console.log(response);
                                        swal({
                                            type: "error",
                                            title: "Oops!",
                                            text: "Failed to request this gift card from sponsor you may need more points.",
                                            timer: 3000,
                                            showConfirmButton: false
                                        });
                                    }
                                }, function (error) {

                                    console.log("ERROR : Failed to request gift cards from parent");
                                    console.log(error);
                                });
                            } else {
                                GiftcardService.childRequestGiftCard(giftCardRequestobject).then(function (response) {
                                    if (response.query_status == "success") {
                                        swal({
                                            type: "success",
                                            title: "Success!",
                                            text: "You have successfully requested a gift card from parent.",
                                            timer: 3000,
                                            showConfirmButton: false
                                        });
                                    } else {
                                        console.log("ERROR : Failed to request gift cards from parent");
                                        console.log(response);
                                        swal({
                                            type: "error",
                                            title: "Oops!",
                                            text: "Failed to requested a gift card from parent.",
                                            timer: 3000,
                                            showConfirmButton: false
                                        });
                                    }
                                }, function (error) {
                                    console.log("ERROR : Failed to request gift cards from parent");
                                    console.log(error);
                                    swal({
                                        type: "error",
                                        title: "Oops!",
                                        text: "Failed to requested a gift card from parent.",
                                        timer: 3000,
                                        showConfirmButton: false
                                    });
                                });
                            }
                        }
                    });
                }
                else {
                    swal({
                        type: "error",
                        title: "Oops!",
                        text: "Failed to requested a gift card from parent.",
                        timer: 3000,
                        showConfirmButton: false
                    });
                }
            });

        }

        // Child Total Points Change - Watcher
        $rootScope.$on("update-points", function (event, args) {
            if (args.parameters && args.parameters.points) {
                $scope.child_total_points += args.parameters.points;
                $timeout(function () {
                    $scope.$apply();
                }, 2000);

            }
        });

        // Child Total Points Change - Watcher
        $rootScope.$on("refresh-complete-percentage", function (event, args) {
            $scope.getMyAssignedLessonsCompletedPercentage();
        });

        // Child Total Points Change - Watcher
        $rootScope.$on("update-complete-percentage", function (event, args) {
            if (args.parameters && args.parameters.completedPercentage) {
                $scope.completedPercentage = parseInt(args.parameters.completedPercentage);
            }
        });

        var toggleCount = 0;
        $scope.notifications = [];
        $scope.toggleNotification = false;
        $scope.isNotificationLoading = false;

        // Get unread notification
        var getUnreadNotification = function getUnreadNotification() {
            $scope.isNotificationLoading = true;
            var userId = JSON.parse($localStorage.user).id;
            var unreadNotification = NotificationService.getUnreadNotificationCount(userId);
            unreadNotification.success(function(response) {
                // success handler
                if (response.query_status == "success") {
                    $scope.unreadNotificationCount = response.data.count;
                }else{
                    $scope.unreadNotification = [];
                    $scope.notifications = [];
                    $scope.unreadNotificationCount = 0;
                    // no notifications found
                }
                $scope.isNotificationLoading = false;
            });
            unreadNotification.error(function() {
                // error handler
                $scope.isNotificationLoading = false;
            });
        };

        var stopInterval;
        $scope.initInterval = function() {
            // Don't start a new fight if we are already fighting
            if ( angular.isDefined(stopInterval) ) return;

            stopInterval = $interval(function() {
                getUnreadNotification();
                $scope.initNewMessageCount();
                toggleCount = 0;
            }, _URLS.COMMON_INTERVAL);
        };

        $scope.stopIntervalTimer = function(stopInterval) {
            if (angular.isDefined(stop)) {
                $interval.cancel(stopInterval);
                stopInterval = undefined;
            }
        };

        $scope.$on('$destroy', function() {
            // Make sure that the interval is destroyed too
            $scope.stopIntervalTimer();
        });

        /**
         * init method for new notification
         */
        $scope.initNotificationList = function initNotificationList() {
            getUnreadNotification();
            $scope.initInterval();
        };

        $scope.initNotificationList();

        /**
         * init method for new message  count
         */
        $scope.initNewMessageCount = function initNewMessageCount() {
            var userId = JSON.parse($localStorage.user).id;
            var newMessageCount = InboxMessageService.getUnseenMessagesCount(userId);
            newMessageCount.success(function (response) {
                // success handler
                if (response.query_status == "success") {
                    if (response.data.count != 0) {
                        $scope.newMessageCount = response.data.count;
                    }
                }
            });
            newMessageCount.error(function () {
                console.error('error loading new message count');
            });
        };

        $scope.initNewMessageCount();


        // Child notifications

        // SocketService.on("user-channel-" + JSON.parse($localStorage.user).id + ":App\\Events\\NotifyChild", function (data) {
        //     console.log('emit received! ' + data.message);
        //     console.log(data);
        //     if (data.type != 'message') {
        //         $scope.notifications.push(data);
        //         if (data.type != undefined && data.type == 'lesson') {
        //             $scope.getMyAssignedLessons();
        //         } else if (data.type != undefined && data.type == 'chore') {
        //             $scope.getMyAssignedTasks();
        //         }
        //         getUnreadNotification();
        //         toggleCount = 0;
        //     } else {
        //         $scope.initNewMessageCount();
        //     }
        //
        // });

        // Open/Close for notification toggle

        $scope.toggleNotificationPanel = function toggleNotificationPanel() {
            $scope.toggleNotification = !$scope.toggleNotification;

            toggleCount++;
            var userId = JSON.parse($localStorage.user).id;

            if ($scope.toggleNotification) {
                $scope.isNotificationLoading = true;
                var unreadNotification = NotificationService.getUnreadNotification(userId);
                unreadNotification.success(function(response) {
                    // success handler
                    if (response.query_status == "success") {
                        $scope.notifications = response.data;
                        $scope.unreadNotification = response.data;
                    }else{
                        $scope.unreadNotification = [];
                        $scope.notifications = [];
                        // no notifications found
                    }
                    $scope.isNotificationLoading = false;
                });
                unreadNotification.error(function() {
                    // error handler
                    $scope.isNotificationLoading = false;
                });
            }

            if (toggleCount >= 1 && !$scope.toggleNotification) {
                // clear notifications
                var markNotificationsAsRead = NotificationService.updateAllAsRead(userId);
                markNotificationsAsRead.success(function (response) {
                    $scope.unreadNotification = [];
                    $scope.notifications = [];
                    $scope.unreadNotificationCount = 0;
                });
                markNotificationsAsRead.error(function () {
                    // error handler
                    // console.error('error updating notification messages');
                    // $scope.toggleNotification = !$scope.toggleNotification;
                    $scope.unreadNotificationCount = 0;
                });
            } else {
                // $scope.toggleNotification = !$scope.toggleNotification;
            }
        };

        $scope.closeNotificationPopup = function closeNotificationPopup() {
            $scope.toggleNotification = false;
        };

        $scope.navigateToMessagesView = function navigateToMessagesView() {
            console.log('navigate!');
            $scope.newMessageCount = 0;
            $state.go('child.inboxMessage');

        };

        $scope.getMyAssignedLessonBundles = function getMyAssignedLessonBundles() {

            $scope.LessonModel.myBundles = [];
            $scope.loadingAssignedBundles = true;

            BundleAssignService.getChildAssignBundles(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.LessonModel.myBundles = response.data;
                    $scope.loadingAssignedBundles = false;
                } else {
                    $scope.loadingAssignedBundles = false;
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Assign Lessons.");
                console.log(error);
                $scope.loadingAssignedBundles = false;
            });
        };

        // Child's gift card total points
        $scope.getChildGiftCardPoints = function getChildGiftCardPoints(Id) {
            Id = 21;
            ChildService.getChildGiftcardPoints(Id).then(function (response){
                if (response.query_status == "success") {
                    console.log('Total points are :' + response.data);
                }else {
                    console.log('Total points are : Error');
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Assign Lessons.");
                console.log(error);
                $scope.loadingAssignedBundles = false;
            });
        };


    }]);
})();