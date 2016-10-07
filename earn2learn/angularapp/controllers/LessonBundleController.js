(function () {
    'use strict';
    angularEarnToLearnControllers.controller('LessonBundleController', ['$scope', '$rootScope', '$state', '$sce', '$http', '$q', '$window', '$localStorage', 'BundleService', 'VideoService', 'GiftcardService', 'UserService', '$stateParams', 'Upload', 'cfpLoadingBar', 'ngDialog', '$timeout', function ($scope, $rootScope, $state, $sce, $http, $q, $window, $localStorage, BundleService, VideoService, GiftcardService,UserService, $stateParams, Upload, cfpLoadingBar, ngDialog, $timeout) {


        var getChildBundleInfo = function getChildBundleInfo() {
            $scope.stillLoading = true;
            var bundleId = $stateParams.bundleId;
            BundleService.getChildBundleInfo(bundleId).then(function (response) {
                if (response.query_status == 'success') {
                    $scope.bundle = response.data;
                }
                $scope.stillLoading = false;
            }, function (error) {
                console.log("ERROR : While loading bundle type");
                console.log(error);
                $scope.stillLoading = false;
            });

        };

        getChildBundleInfo();

        /**
         * request lesson bundle gift
         */
        $scope.isRequestingBundleGiftCard = false;
        $scope.requestBundleGiftCard = function requestBundleGiftCard() {

            $scope.isRequestingBundleGiftCard = true;

            BundleService.requestBundleGiftCard({id: $scope.bundle.id}).then(function (response) {
                $scope.isRequestingBundleGiftCard = false;
                if (response.data.query_status == 'success') {
                    swal({
                        title: "Success!",
                        text: "You have successfully requested a gift card.",
                        type: "success",
                        confirmButtonText: "Ok",
                    }, function(isOk) {
                        $state.transitionTo('child.lessonBundleDetails', {bundleId: $scope.bundle.id}, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                    console.log('==== log success!')
                }
                console.log(response);
            }, function (error) {
                console.log("ERROR : While loading bundle type");
                console.log(error);
                $scope.isRequestingBundleGiftCard = false;
            });

            // $timeout(function () {
            //
            //     $scope.isRequestingBundleGiftCard = false;
            //
            //     // swal("Success!", "You have successfully requested a gift card.", "success");
            //
            //
            //
            // }, 3000)

        };


    }]);

})();