(function() {'use strict';

    angularEarnToLearnControllers.controller('ParentController', ['$scope', '$uibModal', '$rootScope', '$state', '$window', '$localStorage', '_URLS', 'AuthService', 'AUTH_EVENTS', 'cfpLoadingBar', 'LessonService', 'UserService', 'ParentService', '$q', '$timeout', function ($scope, $uibModal, $rootScope, $state, $window, $localStorage, _URLS, AuthService, AUTH_EVENTS, cfpLoadingBar, LessonService, UserService, ParentService, $q, $timeout) {

        //Temporary modal service is stored here
        //$uibModal
        $scope.lessons = [];
        $scope.allHouseParticipants = [];
        $scope.userRecentActivities = [];

        //Update database
        $scope.updateShowGuide = function() {
            ParentService.updateShowGuideDatabase().then(function(response) {
                if (response.query_status == "success") {
                    console.log('Database updated...');
                }
                else {
                    console.log('Database did not updated...');
                }
            }, function(error) {
                console.log("Error : Failed to update database...");
                console.log(error);
            });
        }

        var modalController = function ($scope, $uibModalInstance) {

            $scope.HasChecked = false;
            $scope.ok = function() {
                $uibModalInstance.close($scope.HasChecked);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        };

        modalController.$inject = ['$scope', '$uibModalInstance'];

        // Get show guide data
        $scope.getShowGuideStatus = function getShowGuideStatus() {
            var deferred = $q.defer();
            ParentService.getShowGuideStatus().then(function(response) {
                if(response.query_status == "success") {
                    $scope.statusval=true;
                    console.log('Value is: '+ $scope.statusval);
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
            }, function(error) {
                deferred.reject(error);
                return false;
                console.log("Error : Failed to load data...");
                console.log(error);
            });
            return deferred.promise;
        };
       
        //Load modal
        $scope.openWindow = function () {
            $scope.$modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'angularapp/views/modals/show.html',
                backdrop  : 'static',
                controller: modalController,
                size: 'lg',
                // keyboard  : false,
                // scope: $scope,
            });

            $scope.$modalInstance.result.then(function (isChecked) {
                if (isChecked) {
                    $scope.updateShowGuide();
                }
            }, function () {
                // nothing happen when cancel the popup
            });
        };

        // Load Lessons
        $scope.loadLessons = function () {

            //Load show guide modal on page load
            //angular.element(document).ready(function () {
                //     $scope.getShowGuideStatus();
            //}

            ParentService.getShowGuideStatus().then(function (data) {
                var statusval = data.query_status;

                if(statusval=='enabled')
                {
                    // console.log('Status is true...');
                }
                else
                {
                    $scope.openWindow();
                    // console.log('Status is false...');
                }

            });

            //Toggle full screen the dashboard
            //$scope.toggleFullScreen = function () {
                $scope.toggleUrl = _URLS.BASE_FOLDER+'/#/parent/dashboard';
                // console.log('Toggle url is: '+ $scope.toggleUrl);
            //};

            LessonService.getLessonIdsByParent().then(function (response) {
                if (response.query_status == 'success') {
                    $scope.lessons = response.data;
                }else{
                    $scope.lessons = [];
                }
            }, function (error) {
                $scope.lessons = [];
            });
        }

        // Load Recent Activities
        $scope.loadRecentActivities = function () {
            // console.log('hi..');
            // console.log(JSON.parse($localStorage.user).id);
            UserService.loadRecentActivities(JSON.parse($localStorage.user).id).then(function(data) {
                if (data.query_status = "success") {
                    $scope.userRecentActivities = data.data;
                }
                else {
                    $scope.userRecentActivities = [];
                }
            }, function(e) {
                $scope.userRecentActivities = [];
            });
        }

        // Load Members
        $scope.loadMembers = function () {
            $scope.loadingAllHouseParticipants=true;
            UserService.getUsersByHouseId(JSON.parse($localStorage.user).house_id).then(function(data) {
                if (data.query_status = "success") {
                    $scope.allHouseParticipants = data.data;
                }
                else {
                    $scope.allHouseParticipants = [];
                }
                $scope.loadingAllHouseParticipants=false;
            }, function(e) {
                $scope.allHouseParticipants = [];
                $scope.loadingAllHouseParticipants=false;
            });
        }

        $scope.LoadRecommendedLessons = function () {
            $scope.loadingRecommendedLessons = true;
            UserService.loadRecommendedLessons().then(function(response) {
                if (response.query_status = "success") {
                    $scope.loadingRecommendedLessons = false;
                    $scope.recommendedLessons = response.data;
                }
                else {
                    $scope.recommendedLessons = [];
                    $scope.loadingRecommendedLessons = false;
                }
            }, function(e) {
                $scope.recommendedLessons = [];
                $scope.loadingRecommendedLessons = false;
            });
        }

        // repeat nth time ng-repeat
        $scope.getNumber = function(num) {
            return new Array(num);
        }

        

    }]);




})();
