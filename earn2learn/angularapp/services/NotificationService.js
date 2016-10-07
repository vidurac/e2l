(function() {'use strict';
    angularEarnToLearnServices.factory('NotificationService', ['$http', '$localStorage', '_URLS', function ($http, $localStorage, _URLS) {

        // update all notification as read
        function updateAllAsRead(uId) {
            return $http.post(_URLS.BASE_API + 'notification/updateAsRead' + _URLS.TOKEN_API + $localStorage.token, {user_id: uId});
        }

        // get all unread notification
        function getUnreadNotification(uId) {
            return $http.get(_URLS.BASE_API + 'notification/getUnread/' + uId + _URLS.TOKEN_API + $localStorage.token);
        }

        // get all unread notification
        function getUnreadNotificationCount(uId) {
            return $http.get(_URLS.BASE_API + 'notification/getUnreadNotificationCount/' + uId + _URLS.TOKEN_API + $localStorage.token);
        }
        
        return {
            getUnreadNotification : getUnreadNotification,
            getUnreadNotificationCount : getUnreadNotificationCount,
            updateAllAsRead : updateAllAsRead
        };
    }]);
})();