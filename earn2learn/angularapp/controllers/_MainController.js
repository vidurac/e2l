(function() {'use strict';
    angularEarnToLearnControllers.controller('MainCtrl', ['$scope', '$rootScope', '$state', '_URLS', '$window', '$resource', '$localStorage', 'ngDialog', 'AuthService', 'AUTH_EVENTS', 'RedirectService', 'SponsorService', function ($scope, $rootScope, $state,_URLS, $window,$resource, $localStorage, ngDialog, AuthService, AUTH_EVENTS, RedirectService, SponsorService) {
        
        // Get video id from url
        function getVideoIdFromUrl(url, type) {
            var regex = /(\?v=|\&v=|\/\d\/|\/embed\/|\/v\/|\.be\/)([a-zA-Z0-9\-\_]+)/;
            var youtubeurl = $(this).text();
            var regexyoutubeurl = youtubeurl.match(regex);
            if (regexyoutubeurl) {
                return regexyoutubeurl[2];
            }
            return "";
        }


        // Main Triggers
        $scope.triggers = {
            /*setCurrentUserToken : function (token) {
                $rootScope.token = token;
            },*/
            // User is not signed in yet
            notSignedIn : function () {
                $state.go("login");
            },
            // What is doing if logging successed
            loginSuccess : function (event, args) {
                RedirectService.go(args.parameters.rl);
            },
            // What is doing if logging logging failed
            loginFailed: function (event, args) {
                sweetAlert("Oops...", args.parameters.message, "error");
            },
            // Logout
            logout : function () {
                AuthService.logout(function (argument) {
                    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                });
            },
            // logoutSuccess
            logoutSuccess : function () {
                $state.go("login");
                ngDialog.close();
            },
            //Not Autherized
            notAutherized : function () {
                console.log("Not Autherized");
            },
            // Token Expired
            tokenExpired : function () {
                console.log("token Expired");
            },
            // check user
            checkUser : function () {
                $resource(_URLS.BASE_API + 'user').get({
                    token: $localStorage.token
                }, function(user_data) {
                    $localStorage.user = JSON.stringify(user_data.data);
                }, function (error) {
                    $rootScope.$broadcast(AUTH_EVENTS.logout);
                });
            },
            // Start track
            startTrck : function () {
                AuthService.logStart().then(function (response) {
                    if (response.query_status == "success") {
                        $rootScope.trid = response.data.log_id;
                    }
                });
            },
            // Update Track
            updateTrck : function () {
                if ($rootScope.trid) {
                    AuthService.logUpdate($rootScope.trid);
                }
            },
        }
        
        // Main triggers broadcasters 
        $scope.$on(AUTH_EVENTS.loginSuccess, $scope.triggers.loginSuccess);
        $scope.$on(AUTH_EVENTS.loginFailed, $scope.triggers.loginFailed);
        $scope.$on(AUTH_EVENTS.notSignedIn, $scope.triggers.notSignedIn);
        $scope.$on(AUTH_EVENTS.notAutherized, $scope.triggers.notAutherized);
        $scope.$on(AUTH_EVENTS.tokenExpired, $scope.triggers.tokenExpired);
        $scope.$on(AUTH_EVENTS.logout, $scope.triggers.logout);
        $scope.$on(AUTH_EVENTS.logoutSuccess, $scope.triggers.logoutSuccess);
        $scope.$on(AUTH_EVENTS.checkUser, $scope.triggers.checkUser);
        $scope.$on(AUTH_EVENTS.startTrck, $scope.triggers.startTrck);
        $scope.$on(AUTH_EVENTS.updateTrck, $scope.triggers.updateTrck);



        // Get User
        $scope.user = function(){
            if ($localStorage && $localStorage.user) {
                return JSON.parse($localStorage.user);
            }else{
                return {};
            }
        }
        
        // Get Days Different
        $scope.getDateDiff = function (date) {
            var today = new Date();
            var d = new Date(date);
            var timeDiff = Math.abs(d.getTime() - today.getTime());
            return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        }
        
        // Get User Type from role id
        $scope.getRoleName = function(role){
            if (role == 1) {return "Administrator"}else if (role == 2) { return "Parent"}else if (role == 3) { return "Child" } else if (role == 5) { return "Sponsor"}
        }
        
        // System Logout
        $scope.logout = function(){
            $rootScope.$broadcast(AUTH_EVENTS.logout);
        }

        /**
         * Check sponsor permission access
         * if permission level is enabled returns true
         * otherwise returns false
         */
        $scope.checkSponsorAccess = function checkSponsorAccess() {

            var sponsorAccess = SponsorService.getSponsorAccess();
            $scope.sponsorAccess = false;

            sponsorAccess.success(function (response) {

                if (response.query_status == "success") {

                    var sponsor = response.data;

                    $scope.sponsorAccess = (sponsor.enable == 1);

                }
            });

            sponsorAccess.error(function (error) {

                console.error('sponsor permission return error response');

            });
        };

        /**
         * ng scroller
        **/
        $scope.config = {
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: true // enable scrolling buttons by default
            },
            axis: 'y', // enable 2 axis scrollbars by default
            theme: 'dark',
            advanced:{
                updateOnContentResize: true
            },
            callbacks:{
                onInit: function(){
                    $('#child-box').mCustomScrollbar('scrollTo','100%');
                }
            }


        }

        /**
         * ng scroller top
         **/
        $scope.configtop = {
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: true // enable scrolling buttons by default
            },
            axis: 'y', // enable 2 axis scrollbars by default
            theme: 'dark',
            advanced:{
                updateOnContentResize: true
            },
            callbacks:{
                onInit: function(){

                    var windowHeight = $(window).innerHeight();
                    // $('#child-box').mCustomScrollbar('scrollTo','100%');
                    var msggap = $('.parent-view .messages-container .slim-scroll nav').offset();
                    //alert(msggap.top);
                   // alert(windowHeight);
                    $('.parent-view .messages-container .slim-scroll nav').css('height', windowHeight-(msggap.top));


                  //  alert(windowHeight);
                }
            }
        }

    }]);
})();