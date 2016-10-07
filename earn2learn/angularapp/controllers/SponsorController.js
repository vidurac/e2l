(function() {'use strict';

    angularEarnToLearnControllers.controller('SponsorController', ['$scope', '$uibModal', '$rootScope', '$state', '$window', '$localStorage', '_URLS', 'AuthService', 'AUTH_EVENTS', 'cfpLoadingBar', 'LessonService', 'UserService', 'ParentService', '$q', 'SponsorService', '$stateParams', function ($scope, $uibModal, $rootScope, $state, $window, $localStorage, _URLS, AuthService, AUTH_EVENTS, cfpLoadingBar, LessonService, UserService, ParentService, $q, SponsorService, $stateParams) {

        // Resources
        $scope.resources = {
            newUser: {}
        };

        var getAllActiveSponsors = function getAllActiveSponsors() {
            $scope.resources.stillLoading = true;
            $scope.allActiveUsers = [];
            var getAllActiveSponsors = SponsorService.getAllActiveSponsors();
            getAllActiveSponsors.success(function (response) {
                $scope.resources.stillLoading = false;
                if (response.query_status == "success") {
                    $scope.allActiveUsers = response.data;
                }
            });
            getAllActiveSponsors.error(function (error) {
                $scope.resources.stillLoading = false;
            });
        };

        var getAllPendingSponsors = function getAllPendingSponsors() {
            $scope.allPendingUsers = [];
            $scope.resources.stillLoading = true;
            var getAllPendingSponsors = SponsorService.getAllPendingSponsors();
            getAllPendingSponsors.success(function (response) {
                $scope.resources.stillLoading = false;
                if (response.query_status == "success") {
                    $scope.allPendingUsers = response.data;
                }
            });
            getAllPendingSponsors.error(function (error) {
                $scope.resources.stillLoading = false;
            });
        };


        $scope.initAllSponsors = function initAllSponsors() {

            getAllActiveSponsors();
            getAllPendingSponsors();

        };

        $scope.resendInvitation = function resendInvitation(id) {

            swal({
                title: "Are you sure?",
                text: "This will send a new invitation to the sponsor.",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: true,
                showLoaderOnConfirm: true,
            }, function(isOk) {
                    if (isOk) {
                        var resendSponsorLink = SponsorService.resendSponsorLink({id: id});

                        resendSponsorLink.success(function(response) {

                            // success handler
                            if (response.query_status == "success") {

                                swal({
                                    type: "success",
                                    title: "Success!",
                                    text: "Sponsor invitation has been successfully sent.",
                                    timer: 3000,
                                    showConfirmButton: false
                                });


                            }else{

                                swal({
                                    type: "error",
                                    title: "Failed to create sponsor invitation.",
                                    text: response.message,
                                    timer: 3000,
                                    showConfirmButton: false
                                });

                            }

                        });

                        resendSponsorLink.error(function(error) {

                            // error handler
                            swal({
                                type: "error",
                                title: "Failed to send sponsor invitation",
                                text: error.message,
                                timer: 3000,
                                showConfirmButton: false
                            });

                        });
                    }
                }
            );


        };

        /**
         * Create initial sponsor link with following details
         * - first name
         * - last name
         * - email
         */
        $scope.createSponsorLink = function createSponsorLink(valid) {

            if (!valid) return;

            var userDetails = angular.copy($scope.resources.newUser);

            console.log(userDetails);

            var createLink = SponsorService.createSponsorLink(userDetails);

            createLink.success(function(response) {

                // success handler
                if (response.query_status == "success") {

                    swal({
                        type: "success",
                        title: "Success!",
                        text: "Sponsor invitation has been successfully sent.",
                        timer: 3000,
                        showConfirmButton: false
                    });

                    $state.go("parent.allSponsors", {}, {reload: true});

                }else{

                    swal({
                        type: "error",
                        title: "Failed to create sponsor invitation.",
                        text: response.message,
                        timer: 3000,
                        showConfirmButton: false
                    });

                }

            });

            createLink.error(function(error) {

                // error handler
                swal({
                    type: "error",
                    title: "Failed to create sponsor invitation",
                    text: error.message,
                    timer: 3000,
                    showConfirmButton: false
                });

            });

        };

        /**
         * Grant sponsor permission
         * @param id
         */
        $scope.grantDashboardAccess = function grantDashboardAccess(id) {
            swal({
                    title: "Are you sure?",
                    text: "This will grant dashboard access to the sponsor.",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    showLoaderOnConfirm: true,
                }, function(isOk) {

                    if (isOk) {

                        var grantAccess = SponsorService.grantSponsorDashboardAccess({id: id});

                        grantAccess.success(function(response) {

                            // success handler
                            if (response.query_status == "success") {

                                swal({
                                    type: "success",
                                    title: "Success!",
                                    text: "Sponsor permission has been successfully granted.",
                                    timer: 3000,
                                    showConfirmButton: false
                                });

                                $scope.initAllSponsors();

                            }else{

                                swal({
                                    type: "error",
                                    title: "Failed to grant dashboard permission to sponsor",
                                    text: response.message,
                                    timer: 3000,
                                    showConfirmButton: false
                                });

                            }

                        });

                        grantAccess.error(function(error) {

                            // error handler
                            swal({
                                type: "error",
                                title: "Failed to grant dashboard permission to sponsor",
                                text: error.message,
                                timer: 3000,
                                showConfirmButton: false
                            });

                        });
                    }
                }
            );
        };


        $scope.revokeDashboardAccess = function revokeDashboardAccess(id) {
            swal({
                    title: "Are you sure?",
                    text: "This will revoke dashboard access from sponsor.",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    showLoaderOnConfirm: true,
                }, function(isOk) {

                    if (isOk) {

                        var revokeAccess = SponsorService.revokeSponsorDashboardAccess({id: id});

                        revokeAccess.success(function(response) {

                            // success handler
                            if (response.query_status == "success") {

                                swal({
                                    type: "success",
                                    title: "Success!",
                                    text: "Sponsor permission has been successfully revoked.",
                                    timer: 3000,
                                    showConfirmButton: false
                                });

                                $scope.initAllSponsors();

                            }else{

                                swal({
                                    type: "error",
                                    title: "Failed to revoke dashboard permission from sponsor",
                                    text: response.message,
                                    timer: 3000,
                                    showConfirmButton: false
                                });

                            }

                        });

                        revokeAccess.error(function(error) {

                            // error handler
                            swal({
                                type: "error",
                                title: "Failed to revoke dashboard permission from sponsor",
                                text: error.message,
                                timer: 3000,
                                showConfirmButton: false
                            });

                        });
                    }
                }
            );
        };

        /**
         * Get ready sponsor token
         */
        $scope.getReadySponsorToken = function getReadySponsorToken() {
            AuthService.validateSponsorToken($stateParams.token).then(function (response) {

                //todo save to local storage and redirect to signIn
                $localStorage.sponsorToken = $stateParams.token;
                $state.go('login');

            }, function (error) {
                swal({
                    type                : "error",
                    title               : "Invalid token captured!",
                    text                : error.data.message,
                    timer               : 3000,
                    showConfirmButton   : true
                });
                $rootScope.$broadcast(AUTH_EVENTS.notSignedIn);
                $scope.txt = error.data.message;
            });
        };

    }]);

})();
