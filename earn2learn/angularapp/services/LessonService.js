(function() {'use strict';
    angularEarnToLearnServices.factory('LessonService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS) {
        
        //Get videos by title
        function GetVideosByTitle(title) {
            return $resource(_URLS.BASE_API + 'get_videos_by_title/' + title + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        //Create a flag
        function CreateFlag(newFlag) {
            //console.log(newFlag);
            return $resource(_URLS.BASE_API + 'add_flag' + _URLS.TOKEN_API + $localStorage.token, {
                video_id           : newFlag.video_id,
                description        : newFlag.description,
                }, 
                {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        //Delete a flag
        function DeleteFlag(video_id) {
            console.log(video_id);
            return $resource(_URLS.BASE_API + 'delete_flag' + _URLS.TOKEN_API + $localStorage.token, {
                video_id           : video_id
                }, 
                {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        //Create a video
        function CreateLesson(lesson) {
            return $resource(_URLS.BASE_API + 'lesson' + _URLS.TOKEN_API + $localStorage.token, {
                title           : lesson.title,
                description     : lesson.description,
                url             : lesson.url,
                video_id        : lesson.video_id,
                i_frame         : lesson.i_frame,
                video_ref       : lesson.video_ref,
                category_id	    : lesson.category_id,
                min_age         : lesson.min_age,
                max_age         : lesson.max_age,
                enable          : lesson.enable,
                questions       : lesson._questions,
                value           : JSON.parse($localStorage.user).role_id == 1 ? '' : lesson.value,
                house_id        : JSON.parse($localStorage.user).house_id,
                visibility      : JSON.parse($localStorage.user).role_id == 1 ? 'public' : lesson.visibility,
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        //Update Lesson Questions
        function UpdateLessonQuestion(question) {
            return $resource(_URLS.BASE_API + 'lesson/update_question' + _URLS.TOKEN_API + $localStorage.token, {
                id              : question.id,
                question        : question.question,
                question_type   : question.question_type,
                control_type    : question.control_type,
                video_id        : question.video_id,
                answers         : question._answers,
                min_age	        : question.min_age,
                max_age	        : question.max_age,
                enable	        : question.enable,
                is_new          : question.is_new
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Create Quiz
        function CreateQuiz(quizData) {
            return $resource(_URLS.BASE_API + 'quiz' + _URLS.TOKEN_API + $localStorage.token, {
                video_id        : quizData.video_id,
                //description     : "",
                value           : quizData.value,
                score           : quizData.score,
                house_id        : quizData.house_id
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // Create Quiz
        function CreateQuizBySponsor(quizData) {
            return $resource(_URLS.BASE_API + 'quiz' + _URLS.TOKEN_API + $localStorage.token, {
                video_id        : quizData.video_id,
                //description     : "",
                value           : quizData.value,
                score           : quizData.score,
                house_id        : quizData.house_id,
                sponsor_id      : quizData.sponsor_id,
                user_id         : quizData.user_id
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Get Lesson Ids By Parent
        function GetLessonIdsByParent() {
            return $resource(_URLS.BASE_API + 'quiz' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Lesson Ids By Parent
        function GetAllHouseLessonsForSponsor() {
            return $resource(_URLS.BASE_API + 'get_all_house_quizzes_for_sponsor' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Lesson By VideoId
        function GetLessonByVideoId(vid) {
            //console.log(vid);
            return $resource(_URLS.BASE_API + 'lesson/by_video/' + vid + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Lesson assigness
        function getAssignees(vid) {
            //console.log(vid);
            return $resource(_URLS.BASE_API + 'lesson/getAssignees/' + vid + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Lesson assingees
        function checkAssignees(vid) {
            //console.log(vid);
            return $resource(_URLS.BASE_API + 'lesson/getAssignees/' + vid + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Quiz By User Video
        function GetQuizByUserVideo(vid){
            return $resource(_URLS.BASE_API + 'get_quiz_by_user_video/' + vid + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Quiz by house id
        function GetQuizByHouseVideo(hid, vid){
            return $resource(_URLS.BASE_API + 'get_quiz_by_house_id/' + hid + '/' + vid + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Quiz By Attempt Id
        function GetQuizByAttemptId(attemptId) {
            return $resource(_URLS.BASE_API + 'get_quiz_by_attempt_id/' + attemptId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get My Assigned Lessons
        function GetMyAssignedLessons(childId){
            return $resource(_URLS.BASE_API + 'lesson/by_child/' + childId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Allocation By User QuizId
        function GetAllocationByUserQuizId(quizId){
            return $resource(_URLS.BASE_API + 'get_allocation_by_user_quiz_id/' + quizId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Lesson By Quiz Id
        function GetLessonByQuizId(quizId){
            return $resource(_URLS.BASE_API + 'lesson/by_quiz/' + quizId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Lessons By House Id
        function GetLessonByHouseId(house_id) {
            return $resource(_URLS.BASE_API + 'lesson/by_house/' + house_id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Check quizz already exists in house
        function CheckQuizAlreadyExistsInHouse(vId, uId) {
            return $resource(_URLS.BASE_API + 'is_quiz_added_to_house/' + vId + '/' + uId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Remove Lesson
        function RemoveQuestion(question) {
            return $resource(_URLS.BASE_API + 'question/' + question.id + _URLS.TOKEN_API + $localStorage.token, {
                id              : question.id,
                question        : question.question,
                video_id        : question.video_id,
                question_type   : question.question_type,
                enable          : question.enable,
                control_type    : question.control_type,
                _method         : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        //Get lessons by child name
        function GetLessonByChildId(childId){
            return $resource(_URLS.BASE_API + 'lesson/by_child/' + childId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        //Restrcit parent rate lesson
        function RestrcitParentRateLesson(videoId){
            return $resource(_URLS.BASE_API + 'lesson/restrcitparentrating/' + videoId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }


        function UserAddRatings(videoId,rating){
            console.log('Video id is#####Service :'+videoId);
            console.log('Video rating is#####Service :'+rating);
            return $resource(_URLS.BASE_API + 'lesson/addvideorating' + _URLS.TOKEN_API + $localStorage.token, {
                video_id        : videoId,
                ratevalue       : rating
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        return {
            createLesson : CreateLesson,
            createQuiz : CreateQuiz,
            createQuizBySponsor : CreateQuizBySponsor,
            getLessonIdsByParent : GetLessonIdsByParent,
            getLessonByVideoId : GetLessonByVideoId,
            getLessonByChildId : GetLessonByChildId,
            getQuizByUserVideo : GetQuizByUserVideo,
            getQuizByHouseVideo : GetQuizByHouseVideo,
            getQuizByAttemptId  : GetQuizByAttemptId,
            getMyAssignedLessons : GetMyAssignedLessons,
            getAllocationByUserQuizId : GetAllocationByUserQuizId,
            getLessonByQuizId : GetLessonByQuizId,
            getLessonByHouseId : GetLessonByHouseId,
            updateLessonQuestion : UpdateLessonQuestion,
            removeQuestion      : RemoveQuestion,
            getAllHouseLessonsForSponsor      : GetAllHouseLessonsForSponsor,
            checkQuizAlreadyExistsInHouse      : CheckQuizAlreadyExistsInHouse,
            checkAssignees : checkAssignees,
            restrcitParentRateLesson : RestrcitParentRateLesson,
            userAddRatings : UserAddRatings,
            CreateFlag : CreateFlag,
            DeleteFlag : DeleteFlag,
        };
    }]);
})();
