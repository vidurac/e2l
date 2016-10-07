(function() {
    'use strict';
    angularEarnToLearnServices.factory('AuthService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$q', '$localStorage', '_URLS', 'AUTH_EVENTS', function($http, $state, $resource, $cookieStore, $rootScope, $q, $localStorage, _URLS, AUTH_EVENTS) {
        
        // Login Function
        function Signin(credentials, successCallback, errorCallback) {
            return $resource(_URLS.BASE_API + 'authenticate', {
                username: credentials.username,
                password: credentials.password
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query(function(data) {
                $resource(_URLS.BASE_API + 'user').get({
                    token: data.token
                }, function(user_data) {
                    if (user_data.data.enable == 0) {
                        errorCallback("This account has been disabled!");
                        return;
                    }
                    $localStorage.token = data.token;
                    $localStorage.user = JSON.stringify(user_data.data);
                    if ($localStorage && $localStorage.loginAttempts) {
                        delete $localStorage.loginAttempts;
                    }
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {
                        parameters: {
                            rl: user_data.data.role_id
                        }
                    });
                });
            }, function (error) {
                errorCallback("Invalid Username or Password!");
            });
        }
        
        // FB sign in
        function FbSignin(fb_data, successCallback, errorCallback) {
            return $resource(_URLS.BASE_API + 'fb_authenticate', {
                data: fb_data
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query(function(data) {
                $resource(_URLS.BASE_API + 'user').get({
                    token: data.token
                }, function(user_data) {
                    if (user_data.data.enable == 0) {
                        errorCallback("This account has been disabled!");
                        return;
                    }
                    $localStorage.token = data.token;
                    $localStorage.user = JSON.stringify(user_data.data);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {
                        parameters: {
                            rl: user_data.data.role_id
                        }
                    });
                });
            }, function (error) {
                errorCallback("Invalid Username or Password!");
            });
        }

        // Register Function
        function Signup(credentials) {
            return $resource(_URLS.BASE_API + 'register', {
                f_name: credentials.fname,
                l_name: credentials.lname,
                email: credentials.email,
                password: credentials.password,
                username: credentials.username,
                confirm_password: credentials.confirm_password,
                house_name : credentials.house_name,
                role_id : 2
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // Logout
        function Logout(successCallback) {
            tokenClaims = {};
            $localStorage.$reset();
            successCallback();
        }
        
        // Is Authenticated
        function IsAuthenticated() {
            return !!$localStorage.token && !!$localStorage.user;
        }
        
        //User is Authorized
        function IsAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (this.isAuthenticated() && authorizedRoles.indexOf(JSON.parse($localStorage.user).role_id) !== -1);
        }
        
        // urlBase64Decode
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        // getClaimsFromToken
        function getClaimsFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }
        
        // Forgot Password
        function ForgotPassword(credentials) {
            return $resource(_URLS.BASE_API + 'forgot_password' + _URLS.TOKEN_API + $localStorage.token, {
                email      : credentials.email
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Reset Password
        function ResetPassword(token, pass){
            // console.log(token);
            // console.log(' ........... ');
            // console.log(pass);

            return $resource(_URLS.BASE_API + 'password/reset', {
                reset_token : token,
                password    : pass
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // Is Have Access Valid User
        function CheckIsRoleHaveAccess(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authorizedRoles.indexOf(JSON.parse($localStorage.user).role_id) !== -1);
        }
        
        // Verify Password Reset Token
        function VerifyPswResetToken(token) {
            return $resource(_URLS.BASE_API + 'password/tok_verify/' + token).get().$promise;
        }
        
        // Confirm Email
        function ConfirmEmail(token) {
            return $resource(_URLS.BASE_API + 'confirm_email/' + token).get().$promise;
        }

        // User Log Start
        function LogStart() {
            return $resource(_URLS.BASE_API + 'userlog' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // User Log Start
        function LogUpdate(id) {
            return $resource(_URLS.BASE_API + 'userlog/' + id + _URLS.TOKEN_API + $localStorage.token, {
                _method     : 'PATCH'
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // validate sponsor token
        function validateSponsorToken(token) {
            return $http.get(_URLS.BASE_API + 'validate_sponsor_token/' + token);

        }

        // validate sponsor token
        function validateSponsorTokenAfter(token) {
            return $http.get(_URLS.BASE_API + 'validate_sponsor_token_after/' + token + _URLS.TOKEN_API + $localStorage.token);

        }

        // complete sponsor account creation
        function completeSponsorAccount(details) {
            return $http.post(_URLS.BASE_API + 'complete_sponsor_account' + _URLS.TOKEN_API + $localStorage.token, details);
        }
        
        // Token Claims
        var tokenClaims = getClaimsFromToken();

        return {
            signin                  : Signin,
            fbSignin                : FbSignin,
            signup                  : Signup,
            logout                  : Logout,
            forgotPassword          : ForgotPassword,
            resetPassword           : ResetPassword,
            checkIsRoleHaveAccess   : CheckIsRoleHaveAccess,
            getTokenClaims          : function () {
                return tokenClaims;
            },
            isAuthenticated         : IsAuthenticated,
            isAuthorized            : IsAuthorized,
            verifyPswResetToken     : VerifyPswResetToken,
            confirmEmail            : ConfirmEmail,
            logStart                : LogStart,
            logUpdate               : LogUpdate,
            validateSponsorToken    : validateSponsorToken,
            validateSponsorTokenAfter    : validateSponsorTokenAfter,
            completeSponsorAccount    : completeSponsorAccount
        };
    }]);
})();