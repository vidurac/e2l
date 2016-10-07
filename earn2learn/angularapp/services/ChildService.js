(function() {'use strict';
    angularEarnToLearnServices.factory('ChildService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS) {

        // Get Badge point
        function GetSystemBadgePoints() {
            return $resource(_URLS.BASE_API + 'child_get_system_badge_ponits' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get completed last 5 badges
        function GetLastCompletedBadges() {
            return $resource(_URLS.BASE_API + 'child_completed_badges_get' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get child for parent
        function GetChildrenByParentId(id) {
            return $resource(_URLS.BASE_API + 'get_user_by_parent_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }


        return {
            getSystemBadgePoints : GetSystemBadgePoints,
            getLastCompletedBadges : GetLastCompletedBadges,
            getChildrenByParentId : GetChildrenByParentId
        };
    }]);
})();