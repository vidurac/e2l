(function () {
    'use strict';
        angularEarnToLearnServices.factory('BundleService', ['$http', '$state', '$resource', '$cookieStore', '$q', 'Upload', '$rootScope', '$localStorage', '_URLS', function ($http, $state, $resource, $cookieStore, $q, Upload, $rootScope, $localStorage, _URLS) {

        //Create a bundle
        function CreateBundle(bundle) {
            //console.log(bundle);
            return $resource(_URLS.BASE_API + 'bundle' + _URLS.TOKEN_API + $localStorage.token, {
                name: bundle.name,
                //points: bundle.points,
                //average_marks: bundle.average_marks,
                //dollar_amount: bundle.dollar_amount,
                bundle_types_id: bundle.bundle_types_id,
                homegiftcards_id: bundle.homegiftcards_id,
                bundleLessons: bundle.bundleLesson,
                bundleCard: (bundle.giftCardValue.length > 0) ? bundle.giftCardValue[0].cardId : '',
                amount: (bundle.giftCardValue.length > 0) ? bundle.giftCardValue[0].amount : '',
                image_url: (bundle.giftCardValue.length > 0) ? bundle.giftCardValue[0].image_url : ''
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        //Update bundle
        function UpdateBundle(bundleId , bundle) {
            console.log(bundle);

            return $resource(_URLS.BASE_API + 'bundle/'+bundleId + _URLS.TOKEN_API + $localStorage.token, {
                name: bundle.name,
                // points: bundle.points,
                // average_marks: bundle.average_marks,
                // dollar_amount: bundle.dollar_amount,
                bundle_types_id: bundle.bundle_types_id,
                homegiftcards_id: bundle.homegiftcards_id,
                bundleLessons: bundle.bundleLesson,
                giftCardValue: bundle.giftCardValue
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'PUT',
                    isArray: false
                }
            }).query().$promise;
        }

        // Get Bundle completion
        function getBundleCompletion(id) {
            return $resource(_URLS.BASE_API + 'bundle/getBundleCompletion/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get All bundle type
        function GetAllBundleType() {
            return $resource(_URLS.BASE_API + 'bundleType/getAllBundleType' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        // Get All bundle
        function GetAllBundles(uId) {
            return $resource(_URLS.BASE_API + 'bundle/getAllBundles/'+ uId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Bundle by bundle id
        function GetBundleById(id) {
            return $resource(_URLS.BASE_API + 'bundle/getBundleById/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Bundle lessons bundle id
        function GetBundleLesson(id) {
            return $resource(_URLS.BASE_API + 'bundle/getBundleLesson/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Bundle quizzes by bundle id
        function GetBundleQuizzes(id) {
            return $resource(_URLS.BASE_API + 'bundle/getBundleQuizzes/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Bundle gift cards by bundle id
        function GetBundleGiftCard(id) {
            return $resource(_URLS.BASE_API + 'bundle/getBundGiftCard/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Bundle by bundle user
        function GetBundlesByUser() {
            return $resource(_URLS.BASE_API + 'bundle/getBundlesByUser' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Delete bundle
        function DeleteBundle(bundle) {
            // console.log('del');
            // console.log(bundle.id);
            return $resource(_URLS.BASE_API + 'bundle/deleteBundle/' + bundle.id + _URLS.TOKEN_API + $localStorage.token, {
                name        : bundle.name,
                enable      : 0,
                _method     : "DELETE"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // Get all lesson bundles that are accessible by sponsor
        function GetAllBundlesForSponsor() {
            return $resource(_URLS.BASE_API + 'bundle/getAllBundlesForSponsor' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get child bundle information
        function GetChildBundleInfo(id) {
            return $resource(_URLS.BASE_API + 'bundle/get-bundle-info/'+ id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        function RequestBundleGiftCard(details) {
            return $http.post(_URLS.BASE_API + 'bundle/request-gift-card' + _URLS.TOKEN_API + $localStorage.token, details);
        }

        return {
            createBundle: CreateBundle,
            getAllBundleType: GetAllBundleType,
            getAllBundles: GetAllBundles,
            getBundleLesson: GetBundleLesson,
            getBundleQuizzes: GetBundleQuizzes,
            getBundleGiftCard: GetBundleGiftCard,
            getBundleByUser: GetBundlesByUser,
            getBundleById: GetBundleById,
            deleteBundle: DeleteBundle,
            updateBundle: UpdateBundle,
            getAllBundlesForSponsor: GetAllBundlesForSponsor,
            getChildBundleInfo: GetChildBundleInfo,
            requestBundleGiftCard: RequestBundleGiftCard,
            getBundleCompletion : getBundleCompletion

        };
    }]);
})();