angularEarnToLearnApp.directive('notificationList', ['$window', '$timeout', function($window, $timeout) {
    return {
        restrict: 'EA',
        templateUrl: 'angularapp/views/_popups/notification-list.html',
        scope: {
            toggleNotification: '=',
            isNotificationLoading: "=",
            unreadNotification: '=',
            refreshNotificationList: '&callbackFn1',
            closePopup: '&callbackFn2'
        },
        link: function(scope, elem, attrs) {

            /**
             * change $state to given url
             * @param url
             */
            scope.navigateTo = function navigateTo(url) {
                scope.closePopup();
                // console.log('toggle notification' + scope.toggleNotification);
                if (url != undefined && url != '') {
                    $window.location.href = url;
                }
            };

            scope.$watch("toggleNotification", function(value) {
                if (value) {
                    scope.refreshNotificationList();
                }
            });

            scope.close = function close() {
                scope.closePopup();
            };
        }
    }
}]);