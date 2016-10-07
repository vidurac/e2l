(function() {'use strict';
    angularEarnToLearnServices.factory('BundleAssignService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS) {
        
        // Assign Child To Bundle
        function AssignBundle(childId, bundleId) {
            return $resource(_URLS.BASE_API + 'bundleAssign' + _URLS.TOKEN_API + $localStorage.token, {
                childId    : childId,
                bundleId     : bundleId,
                status      : 1
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // Assign Child To Bundle as object
        function AssignBundleAsObject(obj) {
            return $resource(_URLS.BASE_API + 'bundleAssign' + _URLS.TOKEN_API + $localStorage.token, obj, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }


        // Remove Child from Bundle
        function RemoveAssignBundle(childId , bundleId) {
            return $resource(_URLS.BASE_API + 'bundleAssign/' + bundleId + _URLS.TOKEN_API + $localStorage.token, {
                childId    : childId,
                bundleId     : bundleId,
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
        
        // Get Assign Bundele for child By child id
        function GetChildAssignBundles(childId){
            return $resource(_URLS.BASE_API + 'bundleAssign/getChildAssignBundles/' + childId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get children by bundle id
        function GetChildrenByBundleId(bundleId){
            return $resource(_URLS.BASE_API + 'bundleAssign/getChildrenByBundleId/' + bundleId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        return {
            getChildAssignBundles : GetChildAssignBundles,
            getChildrenByBundleId : GetChildrenByBundleId,
            assignBundle : AssignBundle,
            assignBundleAsObject : AssignBundleAsObject,
            removeAssignBundle : RemoveAssignBundle
        };
    }]);
})();