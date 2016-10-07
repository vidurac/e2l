    (function() {'use strict';
    angularEarnToLearnServices.factory('QuizService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS) {
        
        // Update Quiz
        function UpdateQuiz(id, quiz) {
            return $resource(_URLS.BASE_API + 'quiz/' + id + _URLS.TOKEN_API + $localStorage.token, {
                video_id        : quiz.video_id,
                description     : quiz.description,
                enable          : quiz.enable,
                _method         : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        //Get all quizes
        function GetAllQuizes() {
            return $resource(_URLS.BASE_API + 'get_all_quizzes_with_video' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        function GetAllQuizesByBundleId(id) {
            return $resource(_URLS.BASE_API + 'get_all_quizzes_with_video_by_bundle/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        return {
            updateQuiz      : UpdateQuiz,
            getAllQuizes    : GetAllQuizes,
            getAllQuizesByBundleId    : GetAllQuizesByBundleId
        };
    }]);
})();