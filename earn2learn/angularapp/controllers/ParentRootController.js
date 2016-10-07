(function() {'use strict';

    angularEarnToLearnControllers.controller('ParentRootController', ['$scope', '$rootScope', '$localStorage', 'NotificationService', 'InboxMessageService' , '_URLS' , '$state', 'AuthService', '$interval', function ($scope, $rootScope, $localStorage, NotificationService, InboxMessageService, _URLS, $state, AuthService, $interval) {



        // Child notifications
        $scope.notifications = [];
        $scope.toggleNotification = false;
        $scope.isNotificationLoading = false;
        $scope.base_url = _URLS.BASE;
        var toggleCount = 0;

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
        $scope.clearCount=function () {
            $scope.newMessageCount = 0;
        }
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
            newMessageCount.success(function(response) {
                // success handler
                if (response.query_status == "success") {
                    if (response.data.count != 0) {
                        $scope.newMessageCount = response.data.count;
                    }
                }
            });
            newMessageCount.error(function() {
                console.error('error loading new message count');
            });
        };

        $scope.initNewMessageCount();

        // Parent notification
        // SocketService.on("user-channel-" + JSON.parse($localStorage.user).id +":App\\Events\\NotifyParent", function (data) {
        //     console.log('emit received! ');
        //     console.log(data);
        //     if (data.type != 'message') {
        //         $scope.notifications.push(data);
        //         getUnreadNotification();
        //         toggleCount = 0;
        //     }else {
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
                markNotificationsAsRead.success(function(response) {
                    $scope.unreadNotification = [];
                    $scope.notifications = [];
                    $scope.unreadNotificationCount = 0;
                });
                markNotificationsAsRead.error(function() {
                    // error handler
                    $scope.unreadNotificationCount = 0;
                    // console.error('error updating notification messages');
                    // $scope.toggleNotification = !$scope.toggleNotification;
                });
            }else {
                // $scope.toggleNotification = !$scope.toggleNotification;
            }
        };

        $rootScope.$on('UpdateMessagesAsRead', function(event, data) {
            console.log('UpdateMessagesAsRead emit fired!');
            $scope.initNewMessageCount();

        });

        $scope.navigateToMessagesView = function navigateToMessagesView() {
            $scope.newMessageCount = 0;
            $state.go('parent.inboxMessage');

        };


        $scope.closeNotificationPopup = function closeNotificationPopup() {
            $scope.toggleNotification = false;
        };


        $scope.checkMySponsorInvitations = function checkMySponsorInvitations () {

            var tokenValue = $localStorage.sponsorToken;

            if (undefined != tokenValue) {

                AuthService.validateSponsorTokenAfter(tokenValue).then(function (response) {

                    // console.log(response);
                    $state.go('completeSponsorAccount', {token: tokenValue});

                }, function (error) {

                    // invalid token

                });

            }


        };


    }]);




})();
