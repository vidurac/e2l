(function() {'use strict';
    angularEarnToLearnServices.factory('AttemptService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS) {
        
        // Get attempt by id
        function GetAttemptById(id) {
            return $resource(_URLS.BASE_API + 'get_attempt_by_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get attempt by house id
        function GetAttemptByHouseId(houseId) {
            return $resource(_URLS.BASE_API + 'get_allocation_by_house_id/' + houseId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get attempt by child id
        function GetAttemptByChildId(childId) {
            return $resource(_URLS.BASE_API + 'get_attempt_by_child_id/' + childId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get attempt by quiz id
        function GetAttemptByQuizId(quizId){
            return $resource(_URLS.BASE_API + 'get_attempt_by_quiz_id/' + quizId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get attempt by allocation id
        function GetAttemptByAllocationId(id) {
            return $resource(_URLS.BASE_API + 'get_attempt_by_allocation_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Create Allocation
        function CreateAllocation(data) {
            return $resource(_URLS.BASE_API + 'attempt' + _URLS.TOKEN_API + $localStorage.token, {
                house_id      : data.house_id,
                quiz_id       : data.quiz_id,
                allocation_id : data.allocation_id,
                enable        : 1
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Update attempt 
        function UpdateAllocation(attemptId, data) {
            return $resource(_URLS.BASE_API + 'attempt/' + attemptId + _URLS.TOKEN_API + $localStorage.token, {
                house_id        : data.house_id,
                quiz_id         : data.quiz_id,
                allocation_id   : data.allocation_id,
                enable          : 1,
                _method         : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Create a answer
        function CreateAnswer(data) {
            return $resource(_URLS.BASE_API + 'result' + _URLS.TOKEN_API + $localStorage.token, {
                attempt_id  : data.attemptId,
                answer_id   : data.answerId,
                question_id : data.questionId,
                enable      : 1
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Update a Answer
        function UpdateAnswer(id, data) {
            return $resource(_URLS.BASE_API + 'result/' + id + _URLS.TOKEN_API + $localStorage.token, {
                attempt_id  : data.attemptId,
                answer_id   : data.answerId,
                question_id : data.questionId,
                enable      : 1,
                _method     : 'PATCH'
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // Update a status
        function UpdateStatus(id, status) {
            return $resource(_URLS.BASE_API + 'attempt/updateStatus/' + id + _URLS.TOKEN_API + $localStorage.token, {
                    status  : status,
                _method     : 'POST'
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // Get Given Answers By Attempt ID
        function GetAnswersByAttemptId(id) {
            return $resource(_URLS.BASE_API + 'get_result_by_attempt_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Finish the attempt
        function FinishAttempt(attempt_id) {
            return $resource(_URLS.BASE_API + 'lesson/submit/' + attempt_id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // get last attempt
        function GetLastAttempt(quizId) {
            return $resource(_URLS.BASE_API + 'get_last_attempt_by_quiz_id/' + quizId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // get attempt limit
        function GetAttemptLimit(alocationId) {
            return $resource(_URLS.BASE_API + 'get_allocation_by_id/' + alocationId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // get attempt data
        function GetPassedAttempt(alocationId) {
            return $resource(_URLS.BASE_API + 'attempt/getPassedAttempt/' + alocationId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // get attempt data
        function GetLessonByAttempt(alocationId) {
            return $resource(_URLS.BASE_API + 'attempt/getPassedAttempt/' + alocationId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // get attempt data
        function CheckLessonBundleCompletion(id) {
            return $resource(_URLS.BASE_API + 'bundle/checkBundleCompletion/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }


        return {
            getAttemptById              : GetAttemptById,
            getAttemptByHouseId         : GetAttemptByHouseId,
            getAttemptByChildId         : GetAttemptByChildId,
            getAttemptByQuizId          : GetAttemptByQuizId,
            getAttemptByAllocationId    : GetAttemptByAllocationId,
            getLastAttempt              : GetLastAttempt,
            createAllocation            : CreateAllocation,
            updateAllocation            : UpdateAllocation,
            createAnswer                : CreateAnswer,
            updateAnswer                : UpdateAnswer,
            getAnswersByAttemptId       : GetAnswersByAttemptId,
            finishAttempt               : FinishAttempt,
            updateStatus                : UpdateStatus,
            getAttemptLimit             : GetAttemptLimit,
            getPassedAttempt            : GetPassedAttempt,
            checkLessonBundleCompletion : CheckLessonBundleCompletion,
        };
    }]);
})();