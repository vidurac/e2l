(function() {'use strict';
    angularEarnToLearnServices.factory('ReportService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS) {
        
        // View total number of households (Parent signups)
        function GetHouseHoldCount() {
            return $resource(_URLS.BASE_API + 'report/households' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // View total number of children
        function GetChildrenCount() {
            return $resource(_URLS.BASE_API + 'report/childrens' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Percentage of children taking the quiz after watching videos
        function GetLessonAnalytics() {
            return $resource(_URLS.BASE_API + 'report/lessons_analysis' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Percentage of children purchasing gift cards

        function GetGiftcardsAnalytics() {
            return $resource(_URLS.BASE_API + 'report/giftcards_analysis' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Average time spent by parent on the site
        function AverageSpentTimeParent() {
            return $resource(_URLS.BASE_API + 'report/parent_analysis' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Average time spent by child on the site
        function AverageSpentTimeChild() {
            return $resource(_URLS.BASE_API + 'report/children_analysis' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Most Popular lesson
        function MostPopularLesson() {
            return $resource(_URLS.BASE_API + 'report/popular_lessons' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Transactions Day Month Week Year
        function TransactionDayMonthWeekYear() {
            return $resource(_URLS.BASE_API + 'report/transaction_analysis' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Average number of points awarded weekly
        function AverageNumberOfPointsAwardedWeekly() {
            return $resource(_URLS.BASE_API + 'report/points_average' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        return {
            getHouseHoldCount                   : GetHouseHoldCount,
            getChildrenCount                    : GetChildrenCount,
            getLessonAnalytics                  : GetLessonAnalytics,
            getGiftcardsAnalytics               : GetGiftcardsAnalytics,
            averageSpentTimeParent              : AverageSpentTimeParent,
            averageSpentTimeChild               : AverageSpentTimeChild,
            mostPopularLesson                   : MostPopularLesson,
            transactionDayMonthWeekYear         : TransactionDayMonthWeekYear,
            averageNumberOfPointsAwardedWeekly  : AverageNumberOfPointsAwardedWeekly
        };
    }]);
})();