(function() {'use strict';
    angularEarnToLearnControllers.controller('AuthController', ['$scope', '$rootScope', '$state', '$window', '$stateParams', '$timeout', '$localStorage', '_URLS', 'AuthService',  'AUTH_EVENTS', 'cfpLoadingBar', function ($scope, $rootScope, $state, $window, $stateParams, $timeout, $localStorage, _URLS, AuthService,  AUTH_EVENTS, cfpLoadingBar) {

        $(document).ready(function () {
            // $("#loginForm").parsley();
            // $("#registerForm").parsley();
        });
        //angular.element(document.querySelector('#registerForm')).parsley();
        //angular.element(document.querySelector('#registerForm')).parsley();

        // Initialize credentials
        $scope.credentials = {};
        $scope.loginAttempts = {};
        $scope.loggingButtonText = "Sign in";
        $scope.registerButtonText = "Sign up";
        $scope.forgotButtonText = "Send";
        $scope.resetButtonText = "Reset";
        $scope.isWaiting = false;
        $scope.isRegWaiting = false;
        $scope.sponsor = {};
        $scope.loginAttempts = getLoginAttempts();
        checkAndResetLoginAttempt();

        // Scope Login function
        $scope.signin = function (credentials) {
            // angular.element(document.querySelector('#loginForm')).parsley();
            if (credentials.username == null || credentials.username.trim() == "" || credentials.password == null || credentials.password.trim() == "") {
                return;
            }

            var loginAttempt = getLoginAttemptsCount();
            var lastLoginAttemptsinMinutes = timeDiffInMinutes();

            // console.log('login attempts: ' + loginAttempt);
            // console.log('login time minutes: ' + lastLoginAttemptsinMinutes);

            if (loginAttempt >= 3 && (lastLoginAttemptsinMinutes >= 0 && lastLoginAttemptsinMinutes <= 3)) {
                credentials.password = "";
                swal({
                    type: "error",
                    title: "Login attempts exceeded",
                    text: "You have exceeded the number of allowed login attempts. Please try again later.",
                    showConfirmButton: true
                }, function () {
                });
                return;
            }else if (lastLoginAttemptsinMinutes >= 3) {
                delete $localStorage.loginAttempts;
                $scope.loginAttempts =  {count: 0};
            }

            $scope.loggingButtonText = "Wait...";
            $scope.isWaiting = true;
            AuthService.signin(credentials, function (data) {
                //$scope.loggingButtonText = "Redirecting...";
                $scope.isWaiting = true;
                swal({
                    type: "success",
                    title: "Success!",
                    text: "You have been successfully logged in.",
                    timer: 3000,
                    showConfirmButton: false
                });
            }, function (message) {
                $scope.loggingButtonText = "Sign in"
                $scope.registerButtonText = "Sign up";
                $scope.isWaiting = false;
                $scope.isRegWaiting = false;
                credentials.password = "";
                $scope.loginAttempts.count = $scope.loginAttempts.count + 1;
                $localStorage.loginAttempts = JSON.stringify($scope.loginAttempts);
                setLastAttemptDateWhenAttemptExceed();
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed, {
                        parameters: {
                            message: message
                        }
                    });
            });
        };

        // set House Name
        $scope.setHouseName = function (credentials) {
            credentials.house_name = "Home-" + credentials.username;
        };

        // Scope Register function
        $scope.signup = function (credentials) {
            angular.element(document.querySelector('#registerForm')).parsley();
            if (
                credentials.fname == null ||
                credentials.fname.trim() == "" ||
                credentials.lname == null ||
                credentials.lname.trim() == "" ||
                credentials.email == null ||
                credentials.email.trim() == "" ||
                credentials.username == null ||
                credentials.username.trim() == "" ||
                credentials.password == null ||
                credentials.password.trim() == "" ||
                credentials.confirm_password == null ||
                credentials.confirm_password.trim() == "",
                credentials.house_name == null ||
                credentials.house_name.trim() == ""
                ) {
                return;
            }
            $scope.registerButtonText = "Wait..."
            $scope.isRegWaiting = true;
            AuthService.signup(credentials).then(function (user) {
                $scope.registerButtonText = "Redirecting...";
                $scope.isRegWaiting = true;
                swal({
                    type: "success",
                    title: "Success!",
                    text: "Please check your inbox to confirm your email address.",
                    showConfirmButton: true
                });
                $state.go("login");
            }, function (error) {
                console.log("error");
                console.log(error);
                $scope.registerButtonText = "Sign up";
                $scope.isRegWaiting = false;
                sweetAlert("Registration Failed!", error.data.message, "error");
            });
        };

        // Facebook Login
        $scope.fbLogin = function () {
            FB.login(function (response) {
                if (response.authResponse) {
                    // console.log("WELCOME : Fetching your information");
                    FB.api('/me',{
                            fields: 'name,first_name,last_name,email,picture'
                        }, function (response) {
                        AuthService.fbSignin(JSON.stringify(response), function (data) {
                            swal({
                                type: "success",
                                title: "Success!",
                                text: "You have been successfully logged in.",
                                timer: 3000,
                                showConfirmButton: false
                            });
                        }, function (message) {
                        });
                    });
                }else{
                    console.log("User cancelled login or did not fully autherized.");
                }
            },{scope: 'email'});
        }

        // Scope Forgot Password
        $scope.forgotPassword = function (credentials) {
            $scope.isWaiting = true;
            $scope.forgotButtonText = "Sending..."
            AuthService.forgotPassword(credentials).then(function (response) {
                if (response.query_status == "success") {
                    $timeout(function() {
                        $scope.isWaiting = false;
                        $scope.forgotButtonText = "Sent";
                        swal({
                            type: "success",
                            title: "Success!",
                            text: "Password Reset code send to " + credentials.email,
                            showConfirmButton: true
                        });
                        $state.go("login");
                    }, 2000);
                }else{
                    $scope.isWaiting = false;
                    $scope.forgotButtonText = "Send";
                    $scope.credentials.email=null;
                    console.log("ERROR : While sending password reset code.");
                    console.log(response);
                    sweetAlert("Password Reset Failed!", response.message, "error");
                }
            }, function (error) {
                $scope.isWaiting = false;
                $scope.forgotButtonText = "Send";
                $scope.credentials.email=null;
                angular.element('#email').trigger('focus');
                console.log("ERROR : While sending password reset code.");
                console.log(error);
                if (error.status == 404) {
                    sweetAlert("Password Reset Failed!", error.data.message, "error");
                }else{
                    sweetAlert("Password Reset Failed!", "Something went wrong.", "error");
                }

            });
        }

        // Verify Password Reset Token
        $scope.verifyPswResetToken = function () {
            var token = $stateParams.resetToken
            AuthService.verifyPswResetToken(token).then(function (response) {
                if (response.query_status == "success") {
                    $scope.validToken = true;
                }else{
                    console.log("Failed to verify password reset token.");
                    console.log(response);
                    $scope.validToken = false;

                    swal({
                        title: "Reset password link is expired.",
                        text: "token expired or missed match",
                        type: "info",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        showLoaderOnConfirm: true
                    }, function (res) {
                        $state.go("login");
                    });

                }
            }, function (error) {
                console.log("Failed to verify password reset token.");
                console.log(error);
               // $state.go("login");
                $scope.validToken = false;

                swal({
                        title: "Reset password link is expired",
                        text: "token expired or missed match",
                        type: "error",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        showLoaderOnConfirm: true
                    }, function (res) {
                        $state.go("login");
                    });
            });
        }

        // Scope Reset Password
        $scope.resetPassword = function (credentials) {
            $scope.isWaiting = true;
            $scope.resetButtonText = "Resetting...";
            credentials["resetToken"] = $stateParams.resetToken;
            AuthService.resetPassword($stateParams.resetToken, credentials.password).then(function (response) {
                if (response.query_status == "success") {
                    $scope.isWaiting = false;
                    $scope.forgotButtonText = "Reset"
                    swal({
                        type: "success",
                        title: "Success!",
                        text: "Password Reset Successfully!",
                        showConfirmButton: true
                    });
                    $state.go("login");
                }else{
                    $scope.isWaiting = false;
                    $scope.forgotButtonText = "Reset"
                    console.log("ERROR : While Reset password.");
                    console.log(response);
                    sweetAlert("Password Reset Failed!", "Something went wrong.", "error");
                }
            }, function (error) {
                $scope.isWaiting = false;
                $scope.forgotButtonText = "Reset"
                console.log("ERROR : While Reset password.");
                console.log(error);
                sweetAlert("Password Reset Failed!", "Something went wrong.", "error");
            });
        }

        // conf email
        $scope.confirmEmail = function () {
            $scope.txt = "Confirming your email...";
            $scope.confirming = true;
            $scope.token = $stateParams.token;
            AuthService.confirmEmail($stateParams.token).then(function (response) {
                if (response.query_status == "success") {
                    $scope.confirming = false;
                    $scope.confirmed = true;
                    swal({
                        type                : "success",
                        title               : "Email Confirmed!",
                        text                : "Please login to the system.",
                        timer               : 3000,
                        showConfirmButton   : true
                    });
                    $rootScope.$broadcast(AUTH_EVENTS.notSignedIn);
                    $scope.txt = "Email Confirmed! Please login to the system.";
                }else{
                    console.log("ERROR : Failed to confirm email.")
                    console.log(response.data);
                    $scope.confirming = false;
                    $scope.confirmed = false;
                    swal({
                        type                : "error",
                        title               : "Email Confirmation Failed!",
                        text                : response.message,
                        timer               : 3000,
                        showConfirmButton   : true
                    });
                    $rootScope.$broadcast(AUTH_EVENTS.notSignedIn);
                    $scope.txt = response.message;
                }
            }, function (error) {
                console.log("ERROR : Failed to confirm email.")
                console.log(error);
                $scope.confirming = false;
                $scope.confirmed = false;
                swal({
                    type                : "error",
                    title               : "Email Confirmation Failed!",
                    text                : error.data.message,
                    timer               : 3000,
                    showConfirmButton   : true
                });
                $rootScope.$broadcast(AUTH_EVENTS.notSignedIn);
                $scope.txt = error.data.message;
            });

        }

        $scope.token = $localStorage.token;
        $scope.tokenClaims = AuthService.getTokenClaims();

        $scope.validateSponsorToken = function validateSponsorToken() {
            AuthService.validateSponsorToken($stateParams.token).then(function (response) {
                console.log('validate token success!');
                $scope.sponsor = {};
                console.log(response.data.data.f_name);
                $scope.sponsor.f_name = response.data.data.f_name;
                $scope.sponsor.l_name = response.data.data.l_name;
                $scope.sponsor.parent_name = response.data.data.parent_name;

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

        $scope.updateSponsorDetails = function updateSponsorDetails(valid) {

            var sponsor = angular.extend({}, {token: $stateParams.token}, {is_accept: valid});

            var completeSponsorAccount = AuthService.completeSponsorAccount(sponsor);

            completeSponsorAccount.success(function (response) {
                swal({
                    type: "success",
                    title: "Success!",
                    text: "You have been successfully accepted invitation request.",
                    timer: 3000,
                    showConfirmButton: false
                });

                // remove sponsor token
                delete $localStorage.sponsorToken;

                $state.transitionTo('parent.dashboard', {}, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            });

            completeSponsorAccount.error(function (error) {
                // $state.go('parent.dashboard');
                // remove sponsor token
                delete $localStorage.sponsorToken;

                $state.transitionTo('parent.dashboard', {}, {
                    reload: true,
                    inherit: false,
                    notify: true
                });

            });

        };

        function timeDiffInMinutes() {
            var loginAttempts = getLoginAttempts();
            var diff, minutes = 0;
            if (loginAttempts && loginAttempts.lastAttemptAt) {
                diff = Math.abs(new Date() - new Date(loginAttempts.lastAttemptAt));
                minutes = Math.floor((diff/1000)/60);
            }
            return minutes;
        }

        function getLoginAttempts(){
            if ($localStorage && $localStorage.loginAttempts) {
                return JSON.parse($localStorage.loginAttempts);
            }else{
                return {count: 0};
            }
        }

        function setLastAttemptDateWhenAttemptExceed() {
            if ($scope.loginAttempts.count >= 2 && !$scope.loginAttempts.lastAttemptAt) {
                $scope.loginAttempts.lastAttemptAt = new Date();
            }
        }

        function getLoginAttemptsCount() {
            if ($localStorage && $localStorage.loginAttempts) {
                var obj = JSON.parse($localStorage.loginAttempts);
                return obj.count;
            }else{
                return 0
            }
        }

        function flushLoginAttempts() {
            if ($localStorage && $localStorage.loginAttempts) {
                delete $localStorage.loginAttempts;
            }
        }

        function checkAndResetLoginAttempt() {

            var loginAttempt = getLoginAttemptsCount();
            var lastLoginAttemptsinMinutes = timeDiffInMinutes();

            // console.log('login attempts: ' + loginAttempt);
            // console.log('login time minutes: ' + lastLoginAttemptsinMinutes);

            if (loginAttempt >= 3 && lastLoginAttemptsinMinutes >= 0 && lastLoginAttemptsinMinutes <= 3) {
            }else if (lastLoginAttemptsinMinutes >= 3) {
                delete $localStorage.loginAttempts;
                $scope.loginAttempts =  {count: 0};
            }
        }

    }]);
})();