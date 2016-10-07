(function() {'use strict';
    angularEarnToLearnServices.factory('AllocationService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS) {
        
        // Assign Child To Lesson
        function AssignChildToLesson(child_id, quiz_id, passpercentage, numofattempts, custommessage, notify) {
            // console.log('Service:Lesson pass percentage is: '+ passpercentage);
            // console.log('Service:Number of attempts are: '+ numofattempts);
            // console.log('Service:Custom message is : '+ custommessage);
            // console.log('Service:Custom message is : '+ notify);

            return $resource(_URLS.BASE_API + 'childquizallocation' + _URLS.TOKEN_API + $localStorage.token, {
                child_id    : child_id,
                quiz_id     : quiz_id,
                enable      : 1,
                pass_percentage : passpercentage,
                max_number_of_attempts : numofattempts,
                custom_message : custommessage,
                notify: notify
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // Same as `AssignChildToLesson` but accept parameters as object
        function AssignChildToLessonAsObject(obj) {
            return $resource(_URLS.BASE_API + 'childquizallocation' + _URLS.TOKEN_API + $localStorage.token, obj, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Uunassign Child from Lesson
        function UnassignChildToLesson(allocationId,  passpercentage, numofattempts, custommessage, notify) {
            return $resource(_URLS.BASE_API + 'childquizallocation/' + allocationId + _URLS.TOKEN_API + $localStorage.token, {
                enable      : 0,
                pass_percentage : passpercentage,
                max_number_of_attempts : numofattempts,
                custom_message : custommessage,
                notify: notify,
                _method	    : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        function UnassignChildToLessonAsObject(allocationId, obj) {
            return $resource(_URLS.BASE_API + 'childquizallocation/' + allocationId + _URLS.TOKEN_API + $localStorage.token, obj, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Get Allocations By Quiz
        function GetAllocationsByQuiz(quizId){
            return $resource(_URLS.BASE_API + 'get_allocation_by_quiz_id/' + quizId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Allocations By id
        function GetAllocationById(allocation_id){
            return $resource(_URLS.BASE_API + 'get_allocation_by_id/' + allocation_id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        return {
            getAllocationsByQuiz : GetAllocationsByQuiz,
            assignChildToLesson : AssignChildToLesson,
            unassignChildToLesson : UnassignChildToLesson,
            getAllocationById : GetAllocationById,
            assignChildToLessonAsObject : AssignChildToLessonAsObject,
            unassignChildToLessonAsObject : UnassignChildToLessonAsObject,


        };
    }]);
})();