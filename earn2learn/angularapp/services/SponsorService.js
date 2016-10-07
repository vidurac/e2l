(function() {'use strict';
    angularEarnToLearnServices.factory('SponsorService', ['$http', '$localStorage', '_URLS', function ($http, $localStorage, _URLS) {

        // update all notification as read
        function createSponsorLink(userDetails) {
            return $http.post(_URLS.BASE_API + 'save-sponsor-link' + _URLS.TOKEN_API + $localStorage.token, userDetails);
        }

        // resend sponsor creation link
        function resendSponsorLink(userDetails) {
            return $http.post(_URLS.BASE_API + 'resend-sponsor-link' + _URLS.TOKEN_API + $localStorage.token, userDetails);
        }

        // grant sponsor dashboard access
        function grantSponsorDashboardAccess(userDetails) {
            return $http.post(_URLS.BASE_API + 'grant-sponsor-access' + _URLS.TOKEN_API + $localStorage.token, userDetails);
        }

        // revoke sponsor dashboard access
        function revokeSponsorDashboardAccess(userDetails) {
            return $http.post(_URLS.BASE_API + 'revoke-sponsor-access' + _URLS.TOKEN_API + $localStorage.token, userDetails);
        }

        // get all pending sponsors
        function getAllPendingSponsors() {
            return $http.get(_URLS.BASE_API + 'get_all_pending_sponsors' + _URLS.TOKEN_API + $localStorage.token);
        }

        function getAllActiveSponsors() {
            return $http.get(_URLS.BASE_API + 'get_all_active_sponsors' + _URLS.TOKEN_API + $localStorage.token);
        }

        function getSponsorAccess() {
            return $http.get(_URLS.BASE_API + 'get-sponsor-access' + _URLS.TOKEN_API + $localStorage.token);
        }
        
        return {
            createSponsorLink: createSponsorLink,
            getAllActiveSponsors: getAllActiveSponsors,
            getAllPendingSponsors: getAllPendingSponsors,
            resendSponsorLink: resendSponsorLink,
            grantSponsorDashboardAccess: grantSponsorDashboardAccess,
            revokeSponsorDashboardAccess: revokeSponsorDashboardAccess,
            getSponsorAccess: getSponsorAccess,
        };
    }]);
})();