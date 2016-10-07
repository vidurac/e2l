(function() {'use strict';
    angularEarnToLearnControllers.controller('ReportController', ['$scope', '$rootScope', '$state', '$window', '$localStorage', '$sce', '_URLS', 'AuthService', 'AUTH_EVENTS', 'cfpLoadingBar', 'LessonService', 'UserService', 'ReportService', 'VideoService', function ($scope, $rootScope, $state, $window, $localStorage, $sce, _URLS, AuthService, AUTH_EVENTS, cfpLoadingBar, LessonService, UserService, ReportService, VideoService) {
        
        $scope.houseHoldCount = 0;
        $scope.childCount = 0;
        $scope.lessonAnalytics = 0;
        $scope.giftcardsAnalytics = 0;
        $scope.averageSpentTimeParent = 0;
        $scope.averageSpentTimeChild = 0;
        
        $scope.transactionDayAmount = 0.00;
        $scope.transactionMonthAmount = 0.00;
        $scope.transactionWeekAmount = 0.00;
        $scope.transactionYearAmount = 0.00;
        
        $scope.options1 = {
            animate:{
                duration:500,
                enabled:true
            },
            barColor:'red',
            scaleColor:false,
            lineWidth:20,
            lineCap:'circle',
            size: 200
        };
        
        $scope.options2 = {
            animate:{
                duration:500,
                enabled:true
            },
            barColor:'green',
            scaleColor:false,
            lineWidth:20,
            lineCap:'circle',
            size: 200
        };
        
        $scope.redirect_parent = function() {
            window.location = _URLS.BASE_FOLDER+'/#/admin/parents';
        };

        $scope.redirect_children = function() {
            window.location = _URLS.BASE_FOLDER+'/#/admin/children';
        };

        $scope.redirect_house = function() {
            window.location = _URLS.BASE_FOLDER+'/#/admin/houses';
        };

        // View total number of households (Parent signups)
        $scope.getHouseHoldCount = function () {
            ReportService.getHouseHoldCount().then(function (response) {
                if (response.query_status == "success") {
                    $scope.houseHoldCount = response.count;
                    $scope.houseHoldDisableCount = response.count_disable;
                }else{
                    $scope.houseHoldCount = 0;
                    $scope.houseHoldDisableCount = 0;
                }
            }, function (error) {
                $scope.houseHoldCount = 0;
            });
        }
        
        // View total number of children
        $scope.getChildrenCount = function () {
            ReportService.getChildrenCount().then(function (response) {
                if (response.query_status == "success") {
                    $scope.childCount = response.count;
                    $scope.childCountDisableCount = response.count_disable;
                }else{
                    $scope.childCount = 0;
                }
            }, function (error) {
                $scope.childCount = 0;
            });
        }
        
        // Percentage of children taking the quiz after watching videos
        $scope.getLessonAnalytics = function () {
            $scope.loadinggetLessonAnalytics = true;
            ReportService.getLessonAnalytics().then(function (response) {
                if (response.query_status == "success") {
                    $scope.lessonAnalytics = response.percentage;
                    $scope.loadinggetLessonAnalytics = false;
                }else{
                    $scope.lessonAnalytics = 0;
                    $scope.loadinggetLessonAnalytics = false;
                }
            }, function (error) {
                $scope.lessonAnalytics = 0;
                $scope.loadinggetLessonAnalytics = false;
            });
        }
        
        // Percentage of children purchasing gift cards
        $scope.getGiftcardsAnalytics = function () {
            $scope.loadinggetGiftcardsAnalytics = true;
            ReportService.getGiftcardsAnalytics().then(function (response) {
                if (response.query_status == "success") {
                    $scope.giftcardsAnalytics = response.percentage;
                    $scope.loadinggetGiftcardsAnalytics = false;
                }else{
                    $scope.giftcardsAnalytics = 0;
                    $scope.loadinggetGiftcardsAnalytics = false;
                }
            }, function (error) {
                $scope.loadinggetGiftcardsAnalytics = false;
                $scope.giftcardsAnalytics = 0;
            });
        }
        
        // Average time spent by parent on the site
        $scope.averageSpentTimeParent = function () {
            ReportService.averageSpentTimeParent().then(function (response) {
                if (response.query_status == "success") {
                    $scope.averageSpentTimeParent = response.data.avg_time;
                }else{
                    $scope.averageSpentTimeParent = 0;
                }
            }, function (error) {
                $scope.averageSpentTimeParent = 0;
            });
        }
        
        // Average time spent by child on the site
        $scope.averageSpentTimeChild = function () {
            ReportService.averageSpentTimeChild().then(function (response) {
                if (response.query_status == "success") {
                    $scope.averageSpentTimeChild = response.data.avg_time;
                }else{
                    $scope.averageSpentTimeChild = 0;
                }
            }, function (error) {
                $scope.averageSpentTimeChild = 0;
            });
        }
        
        // Get seconds in min and hours
        $scope.secToMinHours = function (seconds) {
            var days = Math.floor(seconds / 86400);
            var hours = Math.floor((seconds % 86400) / 3600);
            var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
            var timeString = '';
            if(days > 0) timeString += (days > 1) ? (days + " days ") : (days + " day ");
            if(hours > 0) timeString += (hours > 1) ? (hours + " hours ") : (hours + " hour ");
            if(minutes >= 0) timeString += (minutes > 1) ? (minutes + " minutes ") : (minutes + " minute ");
            return timeString;
        }
        
        // Get Most popular lesson
        $scope.getMostPopularLesson = function () {
            $scope.loadingPopularLesson = true;
            $scope.popularLesson = null;
            ReportService.mostPopularLesson().then(function (response) {
                if (response.query_status == "success") {
                    $scope.popularLesson = response.data;
                    var videoFrame = VideoService.generatePlayer(response.data.video_id, response.data.video_ref);
                    $scope.videoIframe = $sce.trustAsHtml(videoFrame);
                    $scope.loadingPopularLesson = false;
                }else{
                    $scope.loadingPopularLesson = false;
                    console.log("ERROR : Failed to load most popular lesson");
                    console.log(response);
                }
            }, function(error){
                $scope.loadingPopularLesson = false;
                console.log("ERROR : Failed to load most popular lesson");
                console.log(error);
            });
        }
        
        // Average time spent by child on the site
        $scope.transactionDayMonthWeekYear = function () {
            ReportService.transactionDayMonthWeekYear().then(function (response) {
                if (response.query_status == "success") {
                    $scope.transactionDayAmount = ((response.data.this_day)/100).toFixed(2);
                    $scope.transactionWeekAmount = ((response.data.this_week)/100).toFixed(2);
                    $scope.transactionMonthAmount = ((response.data.this_month)/100).toFixed(2);
                    $scope.transactionYearAmount = ((response.data.this_year)/100).toFixed(2);
                }else{
                    $scope.transactionDayAmount = 0.00;
                    $scope.transactionMonthAmount = 0.00;
                    $scope.transactionWeekAmount = 0.00 ;
                    $scope.transactionYearAmount = 0.00;
                }
            }, function (error) {
                $scope.transactionDayAmount = 0.00;
                $scope.transactionMonthAmount = 0.00;
                $scope.transactionWeekAmount = 0.00;
                $scope.transactionYearAmount = 0.00;
            });
        }
        
        // Average number of points awarded weekly
        $scope.getAverageNumberOfPointsAwardedWeekly = function () {
            $scope.loadingAverageNumberOfPointsAwardedWeekly = true;
            ReportService.averageNumberOfPointsAwardedWeekly().then(function (response) {
                $scope.averageNumberOfPointsAwardedWeekly = [];
                if (response.query_status == "success") {
                    angular.forEach(response.data, function (e, i) {
                        $scope.averageNumberOfPointsAwardedWeekly.push(parseInt(e));
                    });
                    $scope.loadingAverageNumberOfPointsAwardedWeekly = false;
                }else{
                    $scope.averageNumberOfPointsAwardedWeekly = [];
                    $scope.loadingAverageNumberOfPointsAwardedWeekly = false;
                }
            }, function (error) {
                $scope.averageNumberOfPointsAwardedWeekly = [];
                $scope.loadingAverageNumberOfPointsAwardedWeekly = false;
            });
        }
        
    }]);
})();