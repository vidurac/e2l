var angularEarnToLearnApp = angular.module('earnToLearnApp', ['earnToLearnApp.controllers', 'earnToLearnApp.services', 'ui.router', 'ngResource', 'ngCookies', 'ngDialog', 'angular-storage', 'angularMoment', 'ngStorage', 'ngAnimate', 'angular-loading-bar', 'cfp.loadingBar', 'angular-flot', 'easypiechart', 'credit-cards','slick','angular-stripe', 'easypiechart','timer','ngFileUpload', 'ngResource', 'ngMessages','angular.filter','wu.masonry','ngScrollbars', 'internationalPhoneNumber', 'ngRateIt','lazy-scroll']);
var angularEarnToLearnControllers = angular.module('earnToLearnApp.controllers', ['ui.bootstrap','ui.router','lazy-scroll']);
var angularEarnToLearnServices = angular.module('earnToLearnApp.services', []);


// Facebook Init
window.fbAsyncInit = function() {
    FB.init({
        appId       : '259365667778038',
        status      : true,
        xfbml       : true,
        version     : 'v2.7'
    });
};


(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    //js.src = "//connect.facebook.net/en_US/sdk.js";
    js.src = "https://connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


angularEarnToLearnApp // App Define APP Urls
    .constant('_URLS', {
            BASE: window.location.origin + '/',
            BASE_FOLDER: window.location.origin,
            BASE_API: window.location.origin + '/api/v1/',
            TOKEN_API: '?token=',
            COMMON_INTERVAL:  300000,
            SOCKET_SERVER: 'http://localhost:3000'
            // SOCKET_SERVER: 'http://52.41.68.132:3000'
        }
    )

    // App Define User Roles
    // 0 : public
    // 1 : admin
    // 2 : parent
    // 3 : child
    // 4 : moderator
    // 5 : sponsor
    .constant('USER_ROLES', [0, 1, 2, 3, 4, 5]) // App Define Auth Events
    .constant('AUTH_EVENTS', {
            notSignedIn: "not-signed-in",
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            registerFailed: 'auth-register-failed',
            logout: 'auth-logout',
            logoutSuccess: 'auth-logout-success',
            tokenExpired: 'auth-token-expired',
            notAuthenticated: 'auth-not-authenticated',
            notAutherized: 'auth-not-autherized',
            checkUser : 'check-user',
            startTrck : 'start-trck',
            updateTrck : 'update-trck'
        }

    ) // Default Redirections
    .constant('REDIRECT', function($state, rl) {
            switch (rl) {
                case 1:
                    $state.go("admin.dashboard");
                    break;
                case 2:
                    $state.go("parent.dashboard");
                    break;
                case 3:
                    $state.go("child.lessons");
                    break;
                case 5:
                    $state.go("sponsor.dashboard");
                    break;
            }
        }
    ) // App Config
    .config(['$httpProvider', 'cfpLoadingBarProvider', 'stripeProvider', 'ipnConfig', function($httpProvider, cfpLoadingBarProvider,stripeProvider, ipnConfig) {
            /*
             *  -------------- Stripe Publish key set to this. --------------
             */
            stripeProvider.setPublishableKey('pk_test_vPaduEZAbuXu50rOYiP1BFtX');

            /*--------------------------------------------------------------*/

            cfpLoadingBarProvider.includeSpinner = false;
            //$httpProvider.interceptors.push(['$q', function ($q, $state, $location, $localStorage) {
            $httpProvider.interceptors.push(['$timeout', '$q', '$injector', function($timeout, $q, $injector) {
                var loginModal, $http, $state, $localStorage;
                // this trick must be done so that we don't receive
                // `Uncaught Error: [$injector:cdep] Circular dependency found`
                $timeout(function() {
                    $http = $injector.get('$http');
                    $state = $injector.get('$state');
                    $localStorage = $injector.get('$localStorage');
                });
                return {
                    'request': function(config) {
                        config.headers = config.headers || {};
                        /*if ($localStorage.token) {
                         config.headers.Authorization = 'E2l ' + $localStorage.token;
                         }*/
                        return config;
                    },
                    'responseError': function(response) {
                        if (response.status === 401 || response.status === 403) {
                            $state.go('login');
                        }
                        return $q.reject(response);
                    }
                };
                //}]);
            }]);

            // International phone number config
            // ipnConfig.defaultCountry = 'pl';
            ipnConfig.nationalMode = false;
        }]

    ) // App Run injectors
    .run(['$rootScope', '$state','$stateParams',  '$localStorage', 'AuthService', 'AUTH_EVENTS', '_URLS', 'amMoment', '$window', function($rootScope, $state,$stateParams,  $localStorage, AuthService, AUTH_EVENTS, _URLS, amMoment, $window) {
            // International time
            //amMoment.changeLocale('cs');
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            // On State change function
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                var requireLogin = toState.data.requireLogin;
                var authorizedRoles = toState.data.authorizedRoles;


                if (toState.name == "readySponsorAccount") {
                    return;
                }

                // if(!AuthService.isAuthenticated() && (toState.name != "login" || toState.name != "register")){
                if (toState.name != "login" && toState.name != "register" && toState.name != "landing" && toState.name != "forgot" && toState.name != "reset" && toState.name != "confirmemail" && toState.name != "certificate" && toState.name != "readySponsorAccount") {
                    $rootScope.$broadcast(AUTH_EVENTS.checkUser);

                    if (!$rootScope.trid) {
                        $rootScope.$broadcast(AUTH_EVENTS.startTrck);
                    }else{
                        $rootScope.$broadcast(AUTH_EVENTS.updateTrck);
                    }

                    if (!AuthService.isAuthenticated()) {
                        event.preventDefault();
                        $rootScope.$broadcast(AUTH_EVENTS.notSignedIn);
                        return;
                    }
                }
                if (AuthService.isAuthenticated() && (toState.name == "login" || toState.name == "register" || toState.name == "landing" || toState.name == "forgot" || toState.name == "reset" || toState.name == "confirmemail" || toState.name == "certificate" || toState.name == "readySponsorAccount")) {
                    event.preventDefault();
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {
                        parameters: {
                            rl: JSON.parse($localStorage.user).role_id
                        }
                    });
                    return;
                }
                if (AuthService.isAuthenticated() && !AuthService.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    return;
                }
                if (requireLogin && !AuthService.isAuthenticated()) {
                    event.preventDefault();
                    $rootScope.$broadcast(AUTH_EVENTS.notSignedIn);
                }
            });

            // Window/Tab on close callback
            $window.onbeforeunload = function () {
                if ($rootScope.trid) {
                    $rootScope.$broadcast(AUTH_EVENTS.updateTrck);
                }
            };
        }]
    ).directive('chart', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            var allMembers = null;
            allMembers = JSON.parse(attrs.members);

            var d1 = [
                [0, 0]
            ];

            var last10Days = [];

            for (var i = 10; i > 0; i--) {
                var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
                if (i == 1) {
                    last10Days.push("Today");
                }
                else {
                    var d = new Date();
                    d.setDate(d.getDate() - (i - 1));
                    last10Days.push(monthNames[d.getMonth()] + ", " + d.getDate());
                }
            }
            var ccc = {};

            angular.forEach(allMembers, function (e, i) {
                var date1 = new Date(e.created_at);
                var date2 = new Date();
                var diffDays = Math.abs(date2.getDate() - date1.getDate());
                //var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                // debugger;

                if (e.role_id == 2 && diffDays < 20) {
                    //console.log(diffDays);
                    if (ccc[diffDays]) {
                        ccc[diffDays] += 1;
                    }else{
                        ccc[diffDays] = 1;
                    }
                }
            });

            for (var i = 0; i <= 9; i += 1) {
                if (ccc[10 - (i + 1)]) {
                    d1.push([i + 1, ccc[10 - (i + 1)]]);
                }else{
                    d1.push([i + 1, 0]);
                }
            }

            $.plot(elem, [{
                data: d1
            }], {
                series: {
                    lines: {
                        show: true,
                        lineWidth: 2,
                        fill: true,
                        fillColor: {
                            colors: [{
                                opacity: 0.0
                            }, {
                                opacity: 0.2
                            }]
                        }
                    },
                    points: {
                        radius: 5,
                        show: true
                    },
                    grow: {
                        active: true,
                        steps: 50
                    },
                    shadowSize: 2
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f0f0f0",
                    borderWidth: 1,
                    color: '#f0f0f0'
                },
                colors: ["#65bd77"],
                xaxis: {
                    mode: "categories",
                    ticks: [
                        [0, ""],
                        [1, last10Days[0]],
                        [2, last10Days[1]],
                        [3, last10Days[2]],
                        [4, last10Days[3]],
                        [5, last10Days[4]],
                        [6, last10Days[5]],
                        [7, last10Days[6]],
                        [8, last10Days[7]],
                        [9, last10Days[8]],
                        [10, last10Days[9]]
                    ]
                },
                yaxis: {
                    ticks: 10,
                    allowDecimals : false
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%y parents",
                    defaultTheme: false,
                    shifts: {
                        x: 0,
                        y: 20
                    }
                }
            });
        }
    };
}).directive('averagenumberofpointschart', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            var allValues = null;
            allValues = JSON.parse(attrs.values);

            var d1 = [];
            var d2 = [];

            var maxWeeks = 12;
            var maxWeeoValues;
            if (!(allValues.length < maxWeeks)) {
                maxWeeoValues = allValues.slice(Math.max(allValues.length - maxWeeks, 1))
            }else{
                maxWeeoValues = allValues;
                var a = maxWeeks - allValues.length ;
                for (var i = 0; i < a; i++) {
                    maxWeeoValues.unshift(0);
                }
            }
            for (var i = 0; i < maxWeeks; i++) {
                d1.push([i, maxWeeoValues[i]]);
                var aa = "";
                if (maxWeeoValues.length - i == 1) {
                    aa = "This<br/> Week";
                }else if (maxWeeoValues.length - i == 2) {
                    aa = "Last<br/> Week";
                }else{
                    aa = ((-(i -maxWeeoValues.length)) - 1) + " Weeks<br/>ago";
                }

                d2.push([i, aa]);
            }

            $.plot(elem, [{
                data: d1
            }], {
                series: {
                    lines: {
                        show: true,
                        lineWidth: 2,
                        fill: true,
                        fillColor: {
                            colors: [{
                                opacity: 0.0
                            }, {
                                opacity: 0.2
                            }]
                        }
                    },
                    points: {
                        radius: 5,
                        show: true
                    },
                    grow: {
                        active: true,
                        steps: 50
                    },
                    shadowSize: 2
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f0f0f0",
                    borderWidth: 1,
                    color: '#f0f0f0'
                },
                colors: ["#FB6B5B"],
                xaxis: {
                    /*show: false,
                     mode: "categories",*/
                    ticks: d2
                },
                yaxis: {
                    ticks: 5,
                    allowDecimals : false
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%y Points",
                    defaultTheme: false,
                    shifts: {
                        x: 0,
                        y: 20
                    }
                }
            });
        }
    };
}).directive('lowercase', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var lowerCase = function(inputValue) {
                if (inputValue == undefined) inputValue = '';
                var lowerCased = inputValue.toLowerCase();
                if (lowerCased !== inputValue) {
                    modelCtrl.$setViewValue(lowerCased);
                    modelCtrl.$render();
                }
                return lowerCased;
            }
            modelCtrl.$parsers.push(lowerCase);
            lowerCase(scope[attrs.ngModel]); // lowerCase initial value
        }
    };
}).filter('yesNo', function () {
    return function (boolean) {
        return boolean ? 'Yes' : 'No';
    }
}).filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
}).directive('chartpie', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.percent = parseInt(attrs.percent);
            console.log('attrt', attrs);
            scope.$watch("number", function(n, o) {
                $(element).easyPieChart({
                    /*lineCap: "square",*/
                    scaleLength: 5,
                    lineCap: 'round',
                    size: 110,
                    /*barColor: function(percent) {
                     percent /= 100;
                     return "rgb(" + Math.round(255 * (1 - percent)) + ", " + Math.round(255 * percent) + ", 0)";
                     },*/
                    barColor: '#FFC333',
                    trackColor: '#FFC333',
                    scaleColor: '#FFC333',
                    animate: 2000,
                    lineWidth: 7
                }).data('easyPieChart').update(attrs.percent);
            })
        }
    };
}).directive('allowPattern', [allowPatternDirective]);

function allowPatternDirective() {
    return {
        restrict: "A",
        compile: function(tElement, tAttrs) {
            return function(scope, element, attrs) {
                // I handle key events
                element.bind("keypress", function(event) {
                    var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
                    var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.

                    // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
                    if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
                        event.preventDefault();
                        return false;
                    }

                });
            };
        }
    };
} ;
