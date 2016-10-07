(function() {'use strict';
    angularEarnToLearnServices.factory('BadgeAssignService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS) {
        
        // Assign Child To Badge
        function AssignBadge(childId, badgeId) {
            return $resource(_URLS.BASE_API + 'badgeAssign' + _URLS.TOKEN_API + $localStorage.token, {
                childId    : childId,
                badgeId     : badgeId,
                status      : 1
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Unassign Child from Badge
        function RemoveAssignBadge(childId , badgeId) {
            return $resource(_URLS.BASE_API + 'badgeAssign/' + badgeId + _URLS.TOKEN_API + $localStorage.token, {
                childId    : childId,
                badgeId     : badgeId,
                status      : 0,
                _method	    : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'PUT',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Get Assign Badges for child By child id
        function GetChildAssignBadges(childId){
            return $resource(_URLS.BASE_API + 'badgeAssign/getChildAssignBadges/' + childId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get child by badge id
        function GetChildrenByBadgeId(badgeId){
            return $resource(_URLS.BASE_API + 'badgeAssign/getChildrenByBadgeId/' + badgeId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        return {
            getChildAssignBadges : GetChildAssignBadges,
            getChildrenByBadgeId : GetChildrenByBadgeId,
            assignBadge : AssignBadge,
            removeAssignBadge : RemoveAssignBadge
        };
    }]);
})();