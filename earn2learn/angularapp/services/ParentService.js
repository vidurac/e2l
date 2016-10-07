(function() {'use strict';
    angularEarnToLearnServices.factory('ParentService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS) {

        //Get show guide status by user id
        function GetshowGuideStatus() {
            return $resource(_URLS.BASE_API + 'get_show_guide_status' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        //Update show dialog column in the database
        function UpdateShowGuideDatabase() {
            return $resource(_URLS.BASE_API + 'update_show_guide_status' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        return {
            getShowGuideStatus : GetshowGuideStatus,
            updateShowGuideDatabase : UpdateShowGuideDatabase,
        };

    }]);
})();