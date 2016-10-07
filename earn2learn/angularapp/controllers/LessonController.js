(function() {
    'use strict';
    angularEarnToLearnControllers.controller('LessonController', ['$scope', '$rootScope', '$state', '$window', '$localStorage', 'QuizService', '$stateParams', '$sce', '$timeout', '_URLS', 'AuthService', 'CategoryService', 'LessonService', 'VideoService', 'UserService', 'AUTH_EVENTS', 'cfpLoadingBar', 'ngDialog', '$q', function($scope, $rootScope, $state, $window, $localStorage, QuizService, $stateParams, $sce, $timeout, _URLS, AuthService, CategoryService, LessonService, VideoService, UserService, AUTH_EVENTS, cfpLoadingBar, ngDialog, $q) {

        // Video Model
        $scope.LessonModel = {
            allVideos: [],
            allCategories: [],
            myLessons : [],
            allCategoriesObj : {},
            subCategories : {}
        };

        $scope.user_rate_status;

        $scope.rateObj = {
            rateValue: 0
        };

        $scope.user_role_id = JSON.parse($localStorage.user).role_id;

        // Define resources model
        $scope.resources = {
            stillLoading: true,
            loadingHouseMembers : false,
            maxQuestionCount: 10,
            newVideo: {
                questions: [{
                    order_no: 1,
                    question: "",
                    question_type: 1,
                    control_type: 1,
                    answers: []
                }]
            },
            videoAssignHouse: {},
            newQuestionSelectedIndex: 0,
            selectedCategory_id: 0,
            addForSelectedCatedory: false,
            searchVideoName: "",
            addVideoButtonText: "Publish",
            addFlagButtonText : "Save",
            isSaving : false,
            videoIframeHolder: $sce.trustAsHtml("<p class=\"text-center text-muted\" style=\"margin-top: -130px;\">Enter Youtube/Ted Video URL</p>")
        }

        $scope.dataItems=5;
        $scope.loadMore = function () {
        $scope.isLoading = true;
            $scope.dataItems=$scope.dataItems + 2;
            $timeout(function () {
                $scope.isLoading = false;
            }, 1000);

        };

        // Check is category id set for add new lesson
        if ($stateParams.catId) {
            $scope.resources.addForSelectedCatedory = true;
            $scope.resources.selectedCategory_id = $stateParams.catId;
            $scope.resources.newVideo.category_id = $stateParams.catId;
        }

        // Open add task popup
        $scope.openFlagPopup = function (video) {

            //console.log(video);
            $scope.video_id = video.id;

            if(video.flag)
            {
                $scope.resources.addFlagButtonText = "Save";
                ngDialog.open({
                    template: 'angularapp/views/_popups/add-flag-popup.html',
                    controller: flagCtrl,
                    backdrop : 'static',
                    showClose: true,
                    closeByDocument: false,
                    closeByEscape: false,
                    className: 'ngdialog-theme-default',
                    preCloseCallback:function()
                    {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    }
                    // scope: $scope
                });

                flagCtrl.$inject = ['$scope', '$rootScope', 'LessonService'];
                //noinspection JSAnnotator
                function flagCtrl($scope, $rootScope, LessonService) {
                    $scope.resources = {
                        newFlag : {
                            video_id : video.id
                        },
                        addFlagButtonText : "Save"
                    }

                    // Add New Task
                    $scope.addNewFlag = function () {
                        $scope.isAddTaskWaiting = true;
                        $scope.resources.addFlagButtonText = "Saving";

                        //console.log($scope.resources.newFlag);
                        LessonService.CreateFlag($scope.resources.newFlag).then(function (response) {

                            if (response.query_status == "success") {
                                console.log('came to success!!');
                                $scope.resources.addFlagButtonText = "Saved";
                                ngDialog.close();
                                swal({
                                    type: "success",
                                    title: "Success!",
                                    text: "You have successfully added flag.",
                                    timer: 3000,
                                    showConfirmButton: false
                                });
                                $state.transitionTo($state.current, $stateParams, {
                                    reload: true,
                                    inherit: false,
                                    notify: true
                                });
                                $scope.isAddTaskWaiting = false;
                            }
                            else{
                                $scope.isAddTaskWaiting = false;
                                $scope.resources.addFlagButtonText = "Save";
                                console.log("ERROR : Failed to add Flag.");
                                swal({
                                    type: "error",
                                    title: "Failed to create flag!",
                                    text: "Something went wrong.",
                                    timer: 3000,
                                    showConfirmButton: true
                                });
                            }
                        }, function (error) {
                            $scope.isAddTaskWaiting = false;
                            console.log("ERROR : Failed to add flag.")
                            console.log(error);
                            $scope.resources.addFlagButtonText = "Save";
                            swal({
                                type: "error",
                                title: "Failed to save flag!",
                                text: "Something went wrong.",
                                timer: 3000,
                                showConfirmButton: true
                            });
                        });
                    }
                }
            }
            else
            {

                LessonService.DeleteFlag(video.id).then(function (response) {
                    //console.log("flag deleted");

                    if (response.query_status == "success") {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    }
                });
            }

        }



        // checks current logged in user is a sponsor
        var checkIsSponsor = function checkIsSponsor() {
            $scope.isSponsor = false;
            UserService.checkIsSponsor().then(function (response) {
                if (response.query_status == 'success') {
                    $scope.isSponsor = true;
                }
            }, function (error) {

            });
        };

        $scope.videoFilter = function(video)
        {
            if(video.visibility == "public" || video.user_id == JSON.parse($localStorage.user).id)
            {
                return true;
            }
        }

        checkIsSponsor();

        $scope.getMin = function(v1, v2){
            if(v1 == null && v2 != null){
                return v2;
            }

            if(v2 == null && v1 != null){
                return v1;
            }

            if(v1 == null){
                v1 = 0;
            }

            if(v2 == null){
                v2 = 0;
            }

            return Math.min(v1, v2);
        };

        $scope.getMax = function(v1, v2){
            if(v1 == null && v2 != null){
                return v2;
            }

            if(v2 == null && v1 != null){
                return v1;
            }

            if(v1 == null){
                v1 = 0;
            }

            if(v2 == null){
                v2 = 0;
            }

            return Math.max(v1, v2);
        };

        // Initialize
        $scope.init = function() {
            $scope.resources.stillLoading = true;
            $scope.quizData = null;
            $scope.loadAllCategories();
            $rootScope.quizData = null;
            $scope.getAllVideos();
            $scope.getHouseMembers();
        }

        // Init for edi lesson
        $scope.initforeditlesson = function () {
            $scope.editLessonTab = "video";
            $scope.resources.selectedCategory_id = 76;
            $scope.loadAllCategories();
            $scope.loadLesson();
        }

        // Bind All Videos
        $scope.getAllVideos = function() {
            $scope.resources.stillLoading = true;
            $scope.myLessonsIds = [];

            // Load my house lessons
            LessonService.getLessonIdsByParent().then(function (response) {
                if (response.query_status == 'success') {
                    // $scope.resources.current_user_id = JSON.parse($localStorage.user).id;
                    angular.forEach(response.data, function (val, index) {
                        $scope.myLessonsIds.push(val.video_id);
                    })
                }
            }, function (error) {
                console.log("ERROR : While loading parent quizes");
                console.log(error);
            });

            // Load All Lessons
            VideoService.getAllVideos().then(function(response) {
                console.log(response);
                if (response.query_status == "success") {
                    $scope.resources.current_user_id = JSON.parse($localStorage.user).id;
                    console.log("Current user id is :"+$scope.resources.current_user_id);
                    angular.forEach(response.data, function (element, index) {
                        element["inHouse"] = $scope.myLessonsIds.indexOf(element.id) > -1;
                    });
                    $scope.LessonModel.allVideos = response.data;
                    $scope.resources.stillLoading = false;
                }
                else {
                    $scope.LessonModel.allVideos = [];
                    $scope.resources.stillLoading = false;
                }
            }, function(error) {
                console.log("Error : Failed to load videos");
                console.log(error);
                $scope.LessonModel.allVideos = [];
                $scope.resources.stillLoading = false;
            });
        }


        $scope.restrictLessonRatings = function restrictLessonRatings(video_id) {
            // console.log('Video id is##### :'+video_id);
            var status;
            if( video_id!= null){
                LessonService.restrcitParentRateLesson(video_id).then(function (response) {
                    $scope.user_status = response.query_status;
                    if (response.query_status == 'duplicate_record') {
                        // console.log('Duplicate record....fghfhffh');
                        $scope.user_rate_status = false;
                        // console.log($scope.user_rate_status);
                        // if($scope.user_rate_status){

                        // }
                        //else{
                        $scope.rate_stars = false;
                        // }
                        $scope.rate_stars_obj = {
                            status: false
                        };
                        $scope.rateObj.alreadyRated = true;
                    }
                    if (response.query_status == 'success') {
                        // console.log('Unique record....');
                        $scope.rate_stars = true;
                        $scope.rate_stars_obj = {
                            status: true
                        };
                        $scope.user_rate_status = true;
                        $scope.rateObj.alreadyRated = false;
                    }
                }, function (error) {
                    $scope.rateObj.alreadyRated = false;
                    console.log("ERROR : While loading restrcit lesson ratings.....");
                    console.log(error);
                    return error;
                });
            }else{
                console.log('Data is null');
                return null;
            }
        }


        // Load Lesson
        $scope.loadLesson = function() {

            $scope.user_id = JSON.parse($localStorage.user).id;
            $scope.role_id = JSON.parse($localStorage.user).role_id;

            $scope.resources.stillLoading = true;
            var vid = parseInt($stateParams.id);
            $scope.vid = vid;
            var vid = parseInt($stateParams.id);
            var vid = parseInt($stateParams.id);
            LessonService.getLessonByVideoId(vid).then(function(lesson) {
                //console.log(lesson);

                if (lesson.query_status == 'success') {
                    // on success
                    $scope.resources.stillLoading = false;

                    $scope.cur_lesson = lesson.data;
                    $scope.video_id = lesson.video_id;

                    //Get lesson ratings
                    $scope.averageRating = lesson.rating_avg;
                    $scope.current_lesson_rateval = lesson.rating_avg;
                    $rootScope.cur_lesson = lesson.data;

                    //Rating stars
                    //rate_stars

                    $scope.rating = 0;

                    $scope.ratings = [{
                        //current: 3.5,
                        current: 1,
                        max: 5
                    }];

                    $scope.rateObj.rateValue = lesson.rating_avg;

                    //$scope.user_rate_status = $scope.restrictLessonRatings($scope.video_id);
                    $scope.restrictLessonRatings($scope.video_id);


                    // if(rounded_rating_val != null){
                    //     console.log('Rounded rating value is not null...');
                    //     $scope.ratings = [{
                    //         //current: 3.5,
                    //         current: rounded_rating_val,
                    //         max: 5
                    //     }];
                    // }else{
                    //     console.log('Rounded rating value is null....');
                    //     $scope.ratings = [{
                    //         current: 1,
                    //         max: 5
                    //     }];
                    // }

                    $scope.videoTitle = $sce.trustAsHtml(lesson.data.title);
                    $scope.videoDescription = $sce.trustAsHtml(lesson.data.description);
                    // generate video iframe
                    var videoFrame = VideoService.generatePlayer(lesson.data.video_id, lesson.data.video_ref);
                    // render video html 
                    $scope.videoIframe = $sce.trustAsHtml(videoFrame);
                    $scope.notAvailable = false;
                }
                else {
                    // on error
                    console.log("Error : Loading Lesson");
                    console.log(lesson);
                    $scope.notAvailable = true;
                    $scope.resources.stillLoading = false;
                    $state.go("parent.mylessons");
                }
            }, function(e) {
                // on error
                console.log("Error : Loading Lesson");
                console.log(e);
                $scope.notAvailable = true;
                $scope.resources.stillLoading = false;
                if (e.status == 404) {
                    $state.go("parent.mylessons");
                    return;
                }
            });

            if (AuthService.checkIsRoleHaveAccess([2,3])) {
                $scope.isVideoInHouse(vid);

                // Load House Members
                $rootScope.loadingHouseMembers = true;
                UserService.getUsersByHouseId(JSON.parse($localStorage.user).house_id).then(function (data) {
                    if (data.query_status = "success") {
                        $rootScope.loadingHouseMembers = false;
                        $scope.allHouseParticipants = data.data;
                        $rootScope.allHouseParticipants = data.data;
                    } else {
                        // Error
                        console.log("Error : Failed to retrieve participants in house");
                        $rootScope.loadingHouseMembers = false;
                        console.log(data.data);
                        $scope.allHouseParticipants = [];
                        $rootScope.allHouseParticipants = [];
                    }
                }, function (e) {
                    // Error
                    console.log("Error : Failed to retrieve participants in house");
                    $rootScope.loadingHouseMembers = false;
                    console.log(e);
                    $scope.allHouseParticipants = [];
                    $rootScope.allHouseParticipants = [];
                });
            }
        };


        // Load Lesson
        $scope.loadLessonForSponsorView = function() {
            $scope.resources.stillLoading = true;
            var vid = parseInt($stateParams.id);
            $scope.vid = vid;
            var vid = parseInt($stateParams.id);
            LessonService.getLessonByVideoId(vid).then(function(lesson) {
                if (lesson.query_status == 'success') {
                    // on success
                    $scope.resources.stillLoading = false;

                    $scope.cur_lesson = lesson.data;
                    $rootScope.cur_lesson = lesson.data;

                    $scope.videoTitle = $sce.trustAsHtml(lesson.data.title);
                    $scope.videoDescription = $sce.trustAsHtml(lesson.data.description);
                    // generate video iframe
                    var videoFrame = VideoService.generatePlayer(lesson.data.video_id, lesson.data.video_ref);
                    // render video html
                    $scope.videoIframe = $sce.trustAsHtml(videoFrame);
                    $scope.notAvailable = false;
                }
                else {
                    // on error
                    console.log("Error : Loading Lesson");
                    console.log(lesson);
                    $scope.notAvailable = true;
                    $scope.resources.stillLoading = false;
                    $state.go("parent.mylessons");
                }
            }, function(e) {
                // on error
                console.log("Error : Loading Lesson");
                console.log(e);
                $scope.notAvailable = true;
                $scope.resources.stillLoading = false;
                if (e.status == 404) {
                    $state.go("parent.mylessons");
                    return;
                }
            });

            if (AuthService.checkIsRoleHaveAccess([2,3])) {
                $scope.isVideoInHouseForSponsor($stateParams.houseId, vid);

                // Load House Members
                $rootScope.loadingHouseMembers = true;
                UserService.getUsersByHouseId($stateParams.houseId).then(function (data) {
                    if (data.query_status = "success") {
                        $rootScope.loadingHouseMembers = false;
                        $scope.allHouseParticipants = data.data;
                        $rootScope.allHouseParticipants = data.data;
                    } else {
                        // Error
                        console.log("Error : Failed to retrieve participants in house");
                        $rootScope.loadingHouseMembers = false;
                        console.log(data.data);
                        $scope.allHouseParticipants = [];
                        $rootScope.allHouseParticipants = [];
                    }
                }, function (e) {
                    // Error
                    console.log("Error : Failed to retrieve participants in house");
                    $rootScope.loadingHouseMembers = false;
                    console.log(e);
                    $scope.allHouseParticipants = [];
                    $rootScope.allHouseParticipants = [];
                });
            }
        }

        $scope.checkAssignees = function(vid){
            LessonService.checkAssignees(vid).then(function (data) {
                if (data.query_status = "success") {

                }
            }, function (e) {

            });
        }

        $scope.checkValidity = function(cur_lesson)
        {
            //console.log($scope.initial_visibility);
            if(cur_lesson.quiz_count > 0 && cur_lesson.visibility == "private" && $scope.initial_visibility != "private")
            {
                swal({
                    type: "error",
                    title: "Unable to make this lesson as private.",
                    text: "This lesson is alreay been used by others.",
                    showConfirmButton: true
                });

                cur_lesson.visibility = "public";
            }
        }

        // Load Update Lesson data --------------------
        $scope.loadUpdateLessonData = function () {
            $scope.resources.stillLoading = true;
            $scope.updateVideoButtonText = "Update Video";
            $scope.updateQuestionButtonText = "Update Question";

            $scope.answersIndexLables = ['A.','B.','C.','D.'];
            $scope.role_id = JSON.parse($localStorage.user).role_id;

            var vid = parseInt($stateParams.id);
            $scope.vid = vid;

            // Load All Categories
            $scope.loadAllCategoriesForLessons();

            // Get Lesson Data
            LessonService.getLessonByVideoId(vid).then(function(lesson) {
                console.log(lesson);
                if (lesson.query_status == 'success') {
                    // on success
                    $scope.resources.stillLoading = false;

                    $scope.cur_lesson = lesson.data;
                    $scope.initial_visibility = lesson.data.visibility;

                    $scope.lessonQuestions = [];
                    $scope.selectedQuestion = null;
                    if (lesson.data.questions) {
                        $scope.lessonQuestions = lesson.data.questions;
                        angular.forEach($scope.lessonQuestions, function (e, i) {
                            e["is_new"] = false;
                        });
                        $scope.resources.updateQuestionSelectedIndex = 0;
                        $scope.selectedQuestion = $scope.lessonQuestions[0];
                    }

                    $scope.selectedCategory_id = lesson.data.category_id;
                    $rootScope.cur_lesson = lesson.data;
                    $scope.videoTitle = $sce.trustAsHtml(lesson.data.title);
                    $scope.videoDescription = $sce.trustAsHtml(lesson.data.description);
                    // generate video iframe
                    var videoFrame = VideoService.generatePlayer(lesson.data.video_id, lesson.data.video_ref);
                    // render video html 
                    $scope.videoIframe = $sce.trustAsHtml(videoFrame);
                    $scope.notAvailable = false;
                }
                else {
                    // on error
                    console.log("Error : Loading Lesson");
                    console.log(lesson);
                    $scope.notAvailable = true;
                    $scope.resources.stillLoading = false;
                    $state.go("parent.mylessons");
                }
            }, function(e) {
                // on error
                console.log("Error : Loading Lesson");
                console.log(e);
                $scope.notAvailable = true;
                $scope.resources.stillLoading = false;
                if (e.status == 404) {
                    $state.go("parent.mylessons");
                    return;
                }
            });
        }

        // Add new video
        $scope.addNewVideo = function(data) {
            //console.log(data);
            //return;

            if (
                data.title == null ||
                data.title.trim() == "" ||
                data.description == null ||
                data.description.trim() == "" ||
                data.url == null ||
                data.url.trim() == "" ||
                data.category_id == null) {
                return;
            }

            if (!$scope.isValidAnswers()) {
                return;
            }

            if(data.max_age <= data.min_age)
            {
                swal({
                    type: "error",
                    title: "Max age range should be greater than Min age range",
                    text: "Max age range should be greater than Min age range",
                    showConfirmButton: true
                });
                return false;
            }


            var vobj = VideoService.videoObj(data.url);
            if (vobj == null) {
                // alert("Enter Valid Youtube/Ted Video URL");
                // return;
                swal({
                    type: "error",
                    title: "Invalid Youtube/Ted Video URL",
                    text: "Please check your Youtube/Ted Video URL",
                    showConfirmButton: true
                });
                return;
            }

            data.category_id = parseInt(data.category_id);
            data.video_id = vobj.url_id;
            data.video_ref = vobj.type;
            data.i_frame = vobj.element;
            data.enable = 1;

            if($scope.resources.newVideo.questions.length < 4)
            {
                swal({
                    type: "error",
                    title: "Failed to create the lesson!",
                    text: "There should be minimun 4 questions for a lesson",
                    showConfirmButton: true
                });
                return;
            }

            var q = $scope.resources.newVideo.questions;

            angular.forEach(q, function (val, ind) {
                if (val.question_type == 0) {
                    if (val.answers.length != 2) {
                        swal({
                            type: "error",
                            title: "Failed to create the lesson!",
                            text: "There should be maximum 2 answers for TRUE & FALSE questions",
                            showConfirmButton: true
                        });
                        return;
                    }
                }
                if (val.question_type == 1) {
                    if (val.answers.length > 4) {
                        swal({
                            type: "error",
                            title: "Failed to create the lesson!",
                            text: "There should be maximum 4 answers for multiple answer questions",
                            showConfirmButton: true
                        });
                        return;
                    }
                }
            });

            $scope.resources.addVideoButtonText = "Publishing";
            $scope.resources.isSaving = true;
            data._questions = JSON.stringify(q);

            console.log('Title is :' + data.title);

            if(data.title!=null)
            {
                LessonService.createLesson(data).then(function (response) {

                    //console.log(response);
                    if (response.query_status == "success") {
                        $scope.resources.addVideoButtonText = "Published";
                        $scope.resources.isSaving = false;

                        swal({
                            type: "success",
                            title: "Success!",
                            text: "Lesson Created Successfully.",
                            showConfirmButton: true
                        });

                        if(JSON.parse($localStorage.user).role_id == 1)
                        {
                            if($stateParams.catId > 0)
                            {
                                //console.log('1');
                                $state.go("admin.category", {
                                    id: parseInt($stateParams.catId)
                                });
                            }
                            else
                            {
                                //console.log('2');
                                $state.go("admin.lessons");
                            }

                        }

                        if(JSON.parse($localStorage.user).role_id == 2)
                        {
                            //console.log('8888');
                            $state.go("parent.browselessons");
                        }

                    }
                    else {
                        $scope.resources.addVideoButtonText = "Publish";
                        $scope.resources.isSaving = false;
                        //console.log('response....');
                        //console.log(response);
                        swal({
                            type: "error",
                            title: "Failed to create the lesson!",
                            text: response.message,
                            showConfirmButton: true
                        });
                        //console.log(response);
                    }
                }, function (error) {
                    console.log(error);
                    $scope.resources.addVideoButtonText = "Publish";
                    $scope.resources.isSaving = false;
                    swal({
                        type: "error",
                        title: "Failed to create the lesson!",
                        text: error.message,
                        showConfirmButton: true
                    });
                });

            }
            else {
                swal({
                    type: "error",
                    title: "Lesson title can not be empty!",
                    text: "Please enter a title to lesson",
                    showConfirmButton: true
                });
            }

        };

        // Load Searched Videos
        $scope.loadSearchVideos = function() {
            $scope.resources.stillLoading = true;
            var keyword = $stateParams.find;
            $scope.keyword = keyword;
            VideoService.getVideosByTitle(keyword).then(function(data) {
                if (data.query_status = 'success') {
                    $scope.searchLessons = data.data;
                    $scope.resources.stillLoading = false;
                }
                else {
                    console.log("Error : Failed to load lessons");
                    console.log(data.data);
                    $scope.searchLessons = [];
                    $scope.resources.stillLoading = false;
                }
            }, function(e) {
                console.log("Error : Failed to load lessons");
                console.log(e);
                $scope.searchLessons = [];
                $scope.resources.stillLoading = false;
            });
        }

        // Load My Lessons
        $scope.loadMyLessons = function() {
            $scope.myLessons = [];
            $scope.resources.stillLoading = true;
            $scope.loadAllCategories();
            $scope.getHouseMembers();
            // Load my house lessons
            LessonService.getLessonIdsByParent().then(function (response) {
                if (response.query_status == 'success') {
                    $scope.myLessons = response.data;
                    $scope.resources.stillLoading = false;
                    $scope.resources.current_user_id = JSON.parse($localStorage.user).id;
                    // console.log('Current user id is :'+ JSON.parse($localStorage.user).id);
                }else{
                    $scope.myLessons = [];
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : While loading my house lessons");
                $scope.myLessons = [];
                $scope.resources.stillLoading = false;
                console.log(error);
            });
        };

        // Load all lesson view by sponsor
        $scope.getAllSponsorLessons = function getAllSponsorLesson() {
            $scope.myLessons = [];
            $scope.resources.stillLoading = true;
            $scope.loadAllCategories();
            $scope.resources.current_user_id = JSON.parse($localStorage.user).id;
            // Load my house lessons
            LessonService.getAllHouseLessonsForSponsor().then(function (response) {
                if (response.query_status == 'success') {
                    $scope.myLessons = response.data;
                    $scope.resources.stillLoading = false;
                }else{
                    $scope.myLessons = [];
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : While loading my house lessons");
                $scope.myLessons = [];
                $scope.resources.stillLoading = false;
                console.log(error);
            });
        };

        // Load All categories
        $scope.loadAllCategories = function() {
            // console.log('got it');
            $scope.allCategoriesLoading = true;
            CategoryService.getAllCategories().then(function(data) {
                if (data.query_status == "success") {
                    angular.forEach(data.data, function (e, i) {
                        $scope.LessonModel.allCategoriesObj[e.id] = e;
                        if (e.parent_cat_id != 0) {
                            if (!$scope.LessonModel.subCategories[e.parent_cat_id]) {
                                $scope.LessonModel.subCategories[e.parent_cat_id] = [];
                            }
                            $scope.LessonModel.subCategories[e.parent_cat_id].push(e);
                        }
                    });
                    $scope.LessonModel.allCategories = data.data;
                    $scope.allCategoriesLoading = false;
                }
                else {
                    $scope.LessonModel.allCategories = [];
                    $scope.allCategoriesLoading = false;
                }
            }, function(e) {
                $scope.LessonModel.allCategories = [];
                $scope.allCategoriesLoading = false;
            });

            //console.log($scope.LessonModel.allCategories);
            //console.log('sub....');

            //console.log($scope.LessonModel.subCategories);
        }

        // Load All categories for lessons
        $scope.loadAllCategoriesForLessons = function() {
            // console.log('got it');
            $scope.allCategoriesLoading = true;
            $scope.role_id = JSON.parse($localStorage.user).role_id;

            CategoryService.GetAllCategoriesForLessons().then(function(data) {
                //console.log("aaaa");
                //console.log(data);

                if (data.query_status == "success") {
                    angular.forEach(data.data, function (e, i) {
                        $scope.LessonModel.allCategoriesObj[e.id] = e;
                        if (e.parent_cat_id != 0) {
                            if (!$scope.LessonModel.subCategories[e.parent_cat_id]) {
                                $scope.LessonModel.subCategories[e.parent_cat_id] = [];
                            }
                            $scope.LessonModel.subCategories[e.parent_cat_id].push(e);
                        }
                    });
                    $scope.LessonModel.allCategories = data.data;
                    $scope.allCategoriesLoading = false;
                }
                else {
                    $scope.LessonModel.allCategories = [];
                    $scope.allCategoriesLoading = false;
                }
            }, function(e) {
                $scope.LessonModel.allCategories = [];
                $scope.allCategoriesLoading = false;
            });
        }

        // On Video Url Change when lesson add
        $scope.onUrlChange = function() {
            var vobj = VideoService.videoObj($scope.resources.newVideo.url);
            if (vobj == null) {
                $scope.resources.videoIframeHolder = $sce.trustAsHtml("<p class=\"text-center text-muted\" style=\"margin-top: -130px; color : red;\">Invalid Youtube/Ted Video URL</p>");
                return;
            }
            $scope.resources.videoIframeHolder = $sce.trustAsHtml(vobj.element);
            $scope.videoIframe = $sce.trustAsHtml(vobj.element);
        }

        // On Video Url Change when lesson add
        $scope.onUpdateUrlChange = function() {
            var vobj = VideoService.videoObj($scope.cur_lesson.url);
            if (vobj == null) {
                $scope.videoIframe = $sce.trustAsHtml("<p class=\"text-center text-muted\" style=\"margin-top: -130px; color : red;\">Invalid Youtube/Ted Video URL</p>");
                return;
            }
            $scope.videoIframe = $sce.trustAsHtml(vobj.element);
        }

        $scope.isValidQuestion = function() {
            var selectedQuestion = $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex];
            if (selectedQuestion.question == null || selectedQuestion.question == "") {
                $scope.questionNotValidated = true;
                $scope.questionValidationError = "Enter a question.";
                return false;
            }
            else
            {
                $scope.questionNotValidated = false;
                $scope.questionValidationError = "";
                return true;
            }
        }

        $scope.isValidNumberOfAnswers = function() {
            var selectedQuestion = $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex];

            if (selectedQuestion.answers.length >= 2) {
                $scope.questionNotValidated = false;
                $scope.questionValidationError = "";
                return true;
            }
        }

        // Validate current answer and question
        $scope.isValidAnswers = function() {
            var selectedQuestion = $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex];
            if (selectedQuestion.question == null || selectedQuestion.question == "") {
                $scope.questionNotValidated = true;
                $scope.questionValidationError = "Enter a question.";
                return false;
            }
            if (selectedQuestion.answers.length == 0) {
                $scope.questionNotValidated = true;
                $scope.questionValidationError = "Enter the answers.";
                return false;
            }
            if (selectedQuestion.answers.length < 2) {
                $scope.questionNotValidated = true;
                $scope.questionValidationError = "Enter at least 2 answers.";
                return false;
            }
            var haveAnswerFilled = true;
            var haveAnswer = false;
            angular.forEach(selectedQuestion.answers, function(value, index) {
                if (value.answer == null || value.answer == '') {
                    haveAnswerFilled = false;
                }
                if (value.is_correct == 1) {
                    haveAnswer = true;
                }
            });
            if (!haveAnswerFilled) {
                $scope.questionNotValidated = true;
                $scope.questionValidationError = "Enter the answers.";
                return false;
            }
            if (!haveAnswer) {
                $scope.questionNotValidated = true;
                $scope.questionValidationError = "Mark the right answer.";
                return false;
            }
            $scope.questionNotValidated = false;
            $scope.questionValidationError = "";
            return true;
        }

        // Add new Question
        $scope.addNewQuestion = function() {
            if (!$scope.isValidAnswers()) {
                return;
            }

            var qlength = $scope.resources.newVideo.questions.length;
            /*if (qlength >= $scope.resources.maxQuestionCount) {
             return;
             }*/
            console.log('111');
            $scope.resources.newVideo.questions.push({
                order_no: qlength + 1,
                question: "",
                question_type: 1,
                control_type: 1,
                answers: []
            });
            console.log('2222');
            $scope.selectQuestion($scope.resources.newVideo.questions.length - 1);

            console.log('33333');
        }

        // select Question
        $scope.selectQuestion = function(index) {
            if (index == $scope.resources.newQuestionSelectedIndex) {
                return;
            }
            if ($scope.resources.newQuestionSelectedIndex != $scope.resources.newVideo.questions.length - 1) {
                if (!$scope.isValidAnswers()) {
                    return;
                }
            }

            $scope.resources.newQuestionSelectedIndex = index;
        }

        // Remove New Question
        $scope.removeQuestion = function() {
            var questionLength = $scope.resources.newVideo.questions.length;

            if (questionLength == 1) {
                return;
            }
            swal({
                title: "Are you sure?",
                text: "Do you want to remove this question before save?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true
            }, function() {
                $scope.removeQuestionConfiremed(function() {
                    //$timeout(function() {
                    //swal("Deleted!", "Question has been deleted.", "success");
                    //}, 500);

                    //$scope.resources.newVideo.questions.splice(index, 1);    
                    //$scope.selectedQuestion = $scope.resources.newVideo.questions[0];

                    $scope.resources.newQuestionSelectedIndex = 0;

                    $timeout(function() {
                        //removeQuestion();
                    }, 200);
                });
            });
        }

        // Confirm to Remove New Question
        $scope.removeQuestionConfiremed = function(callback) {
            $scope.resources.newVideo.questions.splice($scope.resources.newQuestionSelectedIndex, 1);
            angular.forEach($scope.resources.newVideo.questions, function(val, index) {
                val.order_no = index + 1;
            });
            callback();
        }

        // Change Question Type
        $scope.changeQtype = function(type) {
            $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].answers = [];
            $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].question_type = type;
            $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].control_type = type;

            //$scope.selectedQuestion.question = '';
            $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].question = '';
            //console.log($scope.resources.newVideo.questions);

            if ($scope.selectedQuestion) {
                $scope.selectedQuestion.answers = [];
                $scope.selectedQuestion.question_type = type;
                $scope.selectedQuestion.control_type = type;
            }

            if (type == 0) {
                $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].answers = [{
                    answer: "TRUE"
                }, {
                    answer: "FALSE"
                }];

                if ($scope.selectedQuestion) {
                    $scope.selectedQuestion.answers = [{
                        answer: "TRUE"
                    }, {
                        answer: "FALSE"
                    }];
                }
            }
        }

        // Change Question Type
        $scope.changeQtypeNew = function(type) {
            $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].answers = [];
            $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].question_type = type;
            $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].control_type = type;

            $scope.selectedQuestion.question = '';
            //$scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].question = '';
            //console.log($scope.resources.newVideo.questions);

            if ($scope.selectedQuestion) {
                $scope.selectedQuestion.answers = [];
                $scope.selectedQuestion.question_type = type;
                $scope.selectedQuestion.control_type = type;
            }

            if (type == 0) {
                $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].answers = [{
                    answer: "TRUE"
                }, {
                    answer: "FALSE"
                }];

                if ($scope.selectedQuestion) {
                    $scope.selectedQuestion.answers = [{
                        answer: "TRUE"
                    }, {
                        answer: "FALSE"
                    }];
                }
            }
        }

        // on select changeSelectedRadio
        $scope.changeSelectedRadio = function(index) {
            angular.forEach($scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].answers, function(value, i) {
                if (index == i) {
                    $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].answers[i].is_correct = 1;
                }
                else {
                    $scope.resources.newVideo.questions[$scope.resources.newQuestionSelectedIndex].answers[i].is_correct = 0;
                }
            })
            //check valid answers
            $scope.isValidAnswers();
        }

        // on select change Selected Radio in update
        $scope.updateSelectedRadio = function (index) {
            angular.forEach($scope.selectedQuestion.answers, function(value, i) {
                if (index == i) {
                    $scope.selectedQuestion.answers[i].is_correct = 1;
                }
                else {
                    $scope.selectedQuestion.answers[i].is_correct = 0;
                }
            })
            $scope.questionNotValidated = false;
        }

        // Get House name
        $scope.getHouseName = function() {
            return JSON.parse($localStorage.user).house_name;
        }

        // Get unsafe html
        $scope.getUnsafeHtml = function(text) {
            return $sce.trustAsHtml(text);
        }

        // Make Quiz
        $scope.makeQuiz = function () {
            swal({
                title: "Are you sure?",
                text: "Are you sure you want to add this lesson to your House?",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, do it!",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function() {
                //description
                $scope.resources.videoAssignHouse.video_id = $rootScope.cur_lesson.id;
                $scope.resources.videoAssignHouse.house_id = JSON.parse($localStorage.user).house_id;
                LessonService.createQuiz($scope.resources.videoAssignHouse).then(function (argument) {
                    if (argument.query_status == "success") {
                        $scope.addedToHouse = true;
                        $scope.quizData = argument.data;
                        $rootScope.quizData = argument.data;
                        $timeout(function() {
                            swal("Success!", "Lesson successfully added to your house.", "success");
                        }, 500);
                        ngDialog.closeAll();
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    }else{
                        console.log(argument.message);
                        $scope.quizData = null;
                        $rootScope.quizData = null;
                        swal("Error!", argument.message, "error");
                    }

                }, function (error) {
                    console.log(error);
                    swal("Error!", error.message, "error");
                });
            });
        }

        // Add Video To House
        $scope.addVideoToHouse = function () {
            $rootScope.videoIframe = $scope.videoIframe;
            $rootScope.videoTitle = $sce.trustAsHtml($rootScope.cur_lesson.title);
            $rootScope.videoDescription = $sce.trustAsHtml($rootScope.cur_lesson.description);
            console.log($rootScope.cur_lesson);
            ngDialog.open({
                template: 'assignVideoToHouseTemplate',
                backdrop : 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default',
                controller: 'LessonController',
            });
        }

        // Remove Video From House
        $scope.removeVideoFromHouse = function () {
            //console.log($rootScope.cur_lesson.id);
            LessonService.checkAssignees($rootScope.cur_lesson.id).then(function (response) {
                if (response.query_status == "success") {
                    if(response.count > 0)
                    {
                        swal({
                            title: "Are you sure?",
                            text: "This lesson is already assigned to children.",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes, remove it!",
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true
                        }, function(isOk) {

                            if (isOk)
                            {
                                $scope.removeConfirmedVideoFromHouse();
                                return false;
                            }
                            if(!isOk)
                            {
                                return false;
                            }
                        });
                    }
                }

            }, function (error) {
                console.log(error);
                swal("Error!", error.message, "error");
            });

            swal({
                title: "Are you sure?",
                text: "This will remove lesson from My Lessons.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, remove it!",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function(isOk) {
                if (isOk) {

                    $scope.removeConfirmedVideoFromHouse();

                    /*if ($scope.addedToHouse) {
                     QuizService.updateQuiz($scope.quizData[0].id, {
                     video_id    : $rootScope.cur_lesson.id,
                     description : $rootScope.cur_lesson.description,
                     enable      : 0
                     }).then(function (response) {
                     if (response.query_status == "success") {
                     $scope.addedToHouse = false;
                     $scope.quizData = null;
                     $rootScope.quizData = null;
                     swal("Deleted!", "Lesson deleted from the house successfully.", "success");
                     $state.go("parent.mylessons");
                     $state.transitionTo($state.current, $stateParams, {
                     reload: true,
                     inherit: false,
                     notify: true
                     });
                     }else{
                     console.log("ERROR : Failed to delete lesson from house.");
                     console.log(response);
                     swal("Failed!", "Failed to remove lesson from the house", "error");
                     }
                     }, function (error) {
                     console.log("ERROR : Failed to delete lesson from the house.");
                     console.log(error);
                     swal("Failed!", "Failed to remove lesson from the house", "error");
                     });
                     }*/
                }
            });
        }

        $scope.removeConfirmedVideoFromHouse = function()
        {
            if ($scope.addedToHouse) {
                QuizService.updateQuiz($scope.quizData[0].id, {
                    video_id    : $rootScope.cur_lesson.id,
                    description : $rootScope.cur_lesson.description,
                    enable      : 0
                }).then(function (response) {
                    if (response.query_status == "success") {
                        $scope.addedToHouse = false;
                        $scope.quizData = null;
                        $rootScope.quizData = null;
                        swal("Deleted!", "Lesson deleted successfully.", "success");
                        $state.go("parent.mylessons");
                        /*$state.transitionTo($state.current, $stateParams, {
                         reload: true,
                         inherit: false,
                         notify: true
                         });*/
                    }else{
                        console.log("ERROR : Failed to delete lesson from house.");
                        console.log(response);
                        swal("Failed!", "Failed to remove lesson from the house", "error");
                    }
                }, function (error) {
                    console.log("ERROR : Failed to delete lesson from the house.");
                    console.log(error);
                    swal("Failed!", "Failed to remove lesson from the house", "error");
                });
            }
        }

        // Check video is in house
        $scope.isVideoInHouse = function (vid) {
            LessonService.getQuizByUserVideo(vid).then(function (response) {
                if (response.query_status == "success") {
                    $scope.addedToHouse = true;
                    $scope.quizData = response.data;
                    $rootScope.quizData = response.data;
                }else{
                    $scope.addedToHouse = false;
                    $scope.quizData = null;
                    $rootScope.quizData = null;
                }
            },function (err) {
                console.log("ERROR : Failed to load getQuizByUserVideo.");
                console.log(err);
                $scope.addedToHouse = false;
                $scope.quizData = null;
                $rootScope.quizData = null;
            });
        }

        $scope.isVideoInHouseForSponsor = function isVideoInHouseForSponsor(hid, vid) {
            LessonService.getQuizByHouseVideo(hid, vid).then(function (response) {
                if (response.query_status == "success") {
                    $scope.addedToHouse = true;
                    $scope.quizData = response.data;
                    $rootScope.quizData = response.data;
                }else{
                    $scope.addedToHouse = false;
                    $scope.quizData = null;
                    $rootScope.quizData = null;
                }
            },function (err) {
                console.log("ERROR : Failed to load getQuizByUserVideo.");
                console.log(err);
                $scope.addedToHouse = false;
                $scope.quizData = null;
                $rootScope.quizData = null;
            });
        }

        // Open Child Quiz allocation popup
        $scope.childAssignPopup = function () {
            ngDialog.open({
                template: 'assignMembersToQuizTemplate',
                backdrop : 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default',
                controller: childAssignPopupCtrl,
            });
            childAssignPopupCtrl.$inject = ['$scope', '$rootScope', 'UserService', 'AllocationService'];
            function childAssignPopupCtrl($scope, $rootScope, UserService, AllocationService) {

                $scope.loadingHouseMembers = $rootScope.loadingHouseMembers;
                $scope.loadingAssignedMembers = true;
                $scope.assignedMembers = [];
                $scope.assignedMembersAllocationData = {};
                $scope.assignedMembersAllocationDetails = {};

                AllocationService.getAllocationsByQuiz($rootScope.quizData[0].id).then(function (response) {
                    if (response.query_status == "success") {
                        angular.forEach(response.data, function (val, ind) {
                            if (val.enable == 1) {
                                $scope.assignedMembers.push(parseInt(val.child_id));
                                $scope.assignedMembersAllocationData[parseInt(val.child_id)] = val.id;
                                $scope.assignedMembersAllocationDetails[parseInt(val.child_id)] = val;

                            }
                            var str = JSON.stringify($scope.assignedMembersAllocationDetails);
                            str = JSON.stringify($scope.assignedMembersAllocationDetails, null, 4);

                            // console.log('Assigned members allocation details object type is :'+str);
                        });

                        angular.forEach($scope.allHouseParticipants, function (participant) {
                            // console.log('Child ids are :'+participant.id);
                            var membersallocationdetails = $scope.assignedMembersAllocationDetails[parseInt(participant.id)];

                            if(membersallocationdetails != null){
                                // console.log('Members allocation details are not null....');
                                // console.log('Pass percentage is :'+membersallocationdetails.pass_percentage);
                                // console.log('Custom message is :'+membersallocationdetails.custom_message);
                                participant.pass_percentage = parseInt(membersallocationdetails.pass_percentage);
                                participant.max_number_of_attempts = parseInt(membersallocationdetails.max_number_of_attempts);
                                participant.custom_message = membersallocationdetails.custom_message;
                                participant.notify = membersallocationdetails.notify;
                                // $scope.allHouseParticipants.push($scope.allHouseParticipants);
                            }

                        });
                        var str2 = JSON.stringify($scope.allHouseParticipants);
                        str2 = JSON.stringify($scope.allHouseParticipants, null, 4);

                        console.log('All house participants are :'+str2);
                        $scope.loadingAssignedMembers = false;
                    }else{
                        console.log("ERROR : While loading Allocations By Quiz.");
                        console.log(response.message);
                        $scope.loadingAssignedMembers = false;
                    }
                }, function (error) {
                    console.log("ERROR : While loading Allocations By Quiz.");
                    console.log(error);
                    $scope.loadingAssignedMembers = false;
                });

                $scope.allHouseParticipants = $rootScope.allHouseParticipants;


                $scope.childAssigToggle = function (childId, isAdd, passpercentage, numofattempts, custommessage, notify) {
                    var quizData = $rootScope.quizData[0];
                    console.log('Controller:Lesson pass percentage is: '+ passpercentage);
                    console.log('Controller:Number of attempts are: '+ numofattempts);
                    console.log('Controller:Custom message is : '+ custommessage);
                    console.log('Controller:Notify check is : '+ notify);

                    if (isAdd) {
                        AllocationService.assignChildToLesson(childId, quizData.id, passpercentage, numofattempts, custommessage, notify).then(function (response) {
                            $scope.assignedMembers.push(childId);
                            $scope.assignedMembersAllocationData[parseInt(childId)] = response.data.id;
                        }, function (error) {
                            console.log("ERROR : While assign member to quiz.");
                            console.log(error);
                        });
                    }else{
                        var index = $scope.assignedMembers.indexOf(childId);
                        var allocationId = $scope.assignedMembersAllocationData[childId];
                        AllocationService.unassignChildToLesson(allocationId, passpercentage, numofattempts, custommessage, notify).then(function (data) {
                            $scope.assignedMembers.splice(index, 1);
                            delete $scope.assignedMembersAllocationData[childId];
                            console.log($scope.assignedMembersAllocationData);
                        }, function (error) {
                            console.log("ERROR : While unassign member from quiz.");
                            console.log(error);
                        });
                    }
                }

                // child Assign to quiz
                $scope.childAssignToggleBySponsor = function childAssignToggleBySponsor(childId, isAdd, passpercentage, numofattempts, custommessage, notify) {
                    var quizData = $rootScope.quizData[0];
                    console.log('Controller:Lesson pass percentage is: '+ passpercentage);
                    console.log('Controller:Number of attempts are: '+ numofattempts);
                    console.log('Controller:Custom message is : '+ custommessage);
                    console.log('Controller:Notify check is : '+ notify);

                    var assignObject = {
                        child_id    : childId,
                        quiz_id     :  quizData.id,
                        enable      : 1,
                        pass_percentage : passpercentage,
                        max_number_of_attempts : numofattempts,
                        custom_message : custommessage,
                        notify: 1, // enable,
                        sponsor_id: JSON.parse($localStorage.user).id,
                    };


                    if (isAdd) {
                        AllocationService.assignChildToLessonAsObject(assignObject).then(function (response) {
                            $scope.assignedMembers.push(childId);
                            $scope.assignedMembersAllocationData[parseInt(childId)] = response.data.id;
                        }, function (error) {
                            console.log("ERROR : While assign member to quiz.");
                            console.log(error);
                        });
                    }else{
                        var index = $scope.assignedMembers.indexOf(childId);
                        var allocationId = $scope.assignedMembersAllocationData[childId];
                        assignObject._method = "PATCH";
                        assignObject.enable = 0;
                        AllocationService.unassignChildToLessonAsObject(allocationId, assignObject).then(function (data) {
                            $scope.assignedMembers.splice(index, 1);
                            delete $scope.assignedMembersAllocationData[childId];
                            console.log($scope.assignedMembersAllocationData);
                        }, function (error) {
                            console.log("ERROR : While unassign member from quiz.");
                            console.log(error);
                        });
                    }
                }
            }
        }

        // Get My Assign Lessons (For Child)
        $scope.getMyAssignedLessons = function () {
            $scope.resources.stillLoading = true;
            LessonService.getMyAssignedLessons(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.LessonModel.myLessons = response.data;
                    $scope.resources.stillLoading = false;
                }else{
                    console.log("ERROR : Failed To Load Child Assign Lessons.");
                    console.log(response.message);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Assign Lessons.");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }

        // Update Video
        $scope.updateVideo = function (video) {
            console.log("video");
            console.log(video);
            $scope.updateVideoButtonText = "Updating Video...";
            $scope.isVideoUpdating = true;
            VideoService.updateVideo(video.id, video).then(function (response) {
                if (response.query_status == "success") {
                    //swal("Success!", "Video updated successfully.", "success");

                    swal({
                            type: "success",
                            title: "Success!",
                            text: "Video updated successfully",
                            //timer: 3000,
                            showConfirmButton: true,
                            closeOnConfirm : true
                        },
                        function(){
                            if(JSON.parse($localStorage.user).role_id == 1)
                            {
                                $state.go('admin.video', {id: parseInt($stateParams.id)});
                            }
                            if(JSON.parse($localStorage.user).role_id == 2)
                            {
                                $state.go('parent.lesson', {id: parseInt($stateParams.id)});
                            }
                        }
                    );

                    $scope.updateVideoButtonText = "Update Video";
                    $scope.isVideoUpdating = false;
                }else{
                    console.log("ERROR : FAILED TO UPDATE VIDEO.");
                    console.log(response);
                    //swal("Failed!", "Failed to update video", "error");
                    swal({
                        type: "error",
                        title: "Failed to update video",
                        text: response.message,
                        showConfirmButton: true
                    });
                    $scope.updateVideoButtonText = "Update Video";
                    $scope.isVideoUpdating = false;
                }
            }, function (error) {
                console.log("ERROR : FAILED TO UPDATE VIDEO.");
                console.log(error);
                //swal("Failed!", "Failed to update video", "error");
                swal({
                    type: "error",
                    title: "Failed to update video",
                    text: error,
                    showConfirmButton: true
                });
                $scope.updateVideoButtonText = "Update Video";
                $scope.isVideoUpdating = false;
            });
        }

        $scope.isValidUpdatedQuestion = function() {
            var selectedQuestion = $scope.selectedQuestion;
            if (selectedQuestion.question == null || selectedQuestion.question == "") {
                $scope.questionNotValidated = true;
                $scope.questionValidationError = "Enter a question.";
                return false;
            }
            else
            {
                $scope.questionNotValidated = false;
                $scope.questionValidationError = "";
                return true;
            }
        }


        $scope.isValidUpdatedNumberOfAnswers = function() {
            var selectedQuestion = $scope.selectedQuestion;

            if (selectedQuestion.answers.length >= 2) {
                $scope.questionNotValidated = false;
                $scope.questionValidationError = "";
                return true;
            }
        }

        // Validate current answer and question
        $scope.isValidUpdatedAnswers = function() {
            var selectedQuestion = $scope.selectedQuestion;
            if (selectedQuestion.question == null || selectedQuestion.question == "") {
                $scope.questionNotValidated = true;
                $scope.questionValidationError = "Enter a question.";
                return false;
            }
            if (selectedQuestion.answers.length == 0) {
                $scope.questionNotValidated = true;
                $scope.questionValidationError = "Enter the answers.";
                return false;
            }
            if (selectedQuestion.answers.length < 2) {
                $scope.questionNotValidated = true;
                $scope.questionValidationError = "Enter at least 2 answers.";
                return false;
            }
            var haveAnswerFilled = true;
            var haveAnswer = false;
            angular.forEach(selectedQuestion.answers, function(value, index) {
                if (value.answer == null || value.answer == '') {
                    haveAnswerFilled = false;
                }
                if (value.is_correct == 1) {
                    haveAnswer = true;
                }
            });
            if (!haveAnswerFilled) {
                $scope.questionNotValidated = true;
                $scope.questionValidationError = "Enter the answers.";
                return false;
            }
            if (!haveAnswer) {
                $scope.questionNotValidated = true;
                $scope.questionValidationError = "Mark the right answer.";
                return false;
            }
            $scope.questionNotValidated = false;
            $scope.questionValidationError = "";
            return true;
        }

        // select Update Question
        $scope.selectUpdateQuestion = function (index) {
            $scope.updateQuestionInline(function () {
                if ($scope.cur_lesson.questions[index]) {
                    $scope.resources.updateQuestionSelectedIndex = index;
                    $scope.selectedQuestion = $scope.cur_lesson.questions[index];
                }else{
                    $scope.resources.updateQuestionSelectedIndex = 0;
                    $scope.selectedQuestion = $scope.cur_lesson.questions[0];
                }
            });

        }

        // Update Question from + button -----------------
        $scope.updateQuestionInline = function (successCallback, errorCallback) {

            if (!$scope.isValidUpdatedAnswers()) {
                return;
            }
            //console.log(call_from);

            $scope.isQuestionUpdating = true;
            $scope.updateQuestionButtonText = "Updating Question...";
            $scope.resources.tempUpdatedIndex = angular.copy($scope.resources.updateQuestionSelectedIndex);
            $scope.selectedQuestion._answers = JSON.stringify($scope.selectedQuestion.answers);
            LessonService.updateLessonQuestion($scope.selectedQuestion).then(function (response) {
                if (response.query_status == "success") {
                    if ($scope.lessonQuestions[$scope.resources.tempUpdatedIndex].is_new) {
                        $scope.lessonQuestions[$scope.resources.tempUpdatedIndex] = response.question;
                        $scope.lessonQuestions[$scope.resources.tempUpdatedIndex].is_new = false;

                        //swal("Success!", "Question updated successfully.", "success");
                    }
                    $scope.updateQuestionButtonText = "Update Question";

                    $scope.isQuestionUpdating = false;
                    if (successCallback) {
                        successCallback();
                        return;
                    }
                }else{
                    console.log("ERROR : Failed to update Question.");
                    console.log(response);

                    swal("ERROR!", "Failed to update Question.", "error");

                    $scope.updateQuestionButtonText = "Update Question";
                    $scope.isQuestionUpdating = false;
                    if (errorCallback) {
                        errorCallback();
                    }
                }
            }, function (error) {
                console.log("ERROR : Failed to update Question.");
                console.log(error);

                swal("ERROR!", "Failed to update Question.", "error");
                $scope.updateQuestionButtonText = "Update Question";
                $scope.isQuestionUpdating = false;
                if (errorCallback) {
                    errorCallback();
                }
            });
        }

        // Update Question -----------------
        $scope.updateQuestion = function (successCallback, errorCallback) {

            if (!$scope.isValidUpdatedAnswers()) {
                return;
            }

            if($scope.lessonQuestions.length < 4)
            {
                swal({
                    type: "error",
                    title: "Failed to create the lesson!",
                    text: "There should be minimun 4 questions for a lesson",
                    showConfirmButton: true
                });
                return;
            }


            $scope.isQuestionUpdating = true;
            $scope.updateQuestionButtonText = "Updating Question...";
            $scope.resources.tempUpdatedIndex = angular.copy($scope.resources.updateQuestionSelectedIndex);
            $scope.selectedQuestion._answers = JSON.stringify($scope.selectedQuestion.answers);

            LessonService.updateLessonQuestion($scope.selectedQuestion).then(function (response) {

                //console.log($scope.lessonQuestions.length);
                if (response.query_status == "success") {
//console.log($scope.lessonQuestions[$scope.resources.tempUpdatedIndex]);
                    if ($scope.lessonQuestions[$scope.resources.tempUpdatedIndex].is_new) {
                        //console.log('success');
                        $scope.lessonQuestions[$scope.resources.tempUpdatedIndex] = response.question;
                        $scope.lessonQuestions[$scope.resources.tempUpdatedIndex].is_new = false;

                        //swal("Success!", "Question updated successfully.", "success");


                    }

                    swal({
                            type: "success",
                            title: "Success!",
                            text: "Question updated successfully.",
                            //timer: 3000,
                            showConfirmButton: true,
                            closeOnConfirm : true
                        },
                        function(){
                            if(JSON.parse($localStorage.user).role_id == 1)
                            {
                                $state.go('admin.video', {id: parseInt($stateParams.id)});
                            }
                            if(JSON.parse($localStorage.user).role_id == 2)
                            {
                                $state.go('parent.lesson', {id: parseInt($stateParams.id)});
                            }
                        }
                    );

                    $scope.updateQuestionButtonText = "Update Question";

                    $scope.isQuestionUpdating = false;
                    if (successCallback) {
                        successCallback();
                        return;
                    }
                }else{
                    console.log("ERROR : Failed to update Question.");
                    console.log(response);

                    swal("ERROR!", "Failed to update Question.", "error");

                    $scope.updateQuestionButtonText = "Update Question";
                    $scope.isQuestionUpdating = false;
                    if (errorCallback) {
                        errorCallback();
                    }
                }
            }, function (error) {
                console.log("ERROR : Failed to update Question.");
                console.log(error);

                swal("ERROR!", "Failed to update Question.", "error");
                $scope.updateQuestionButtonText = "Update Question";
                $scope.isQuestionUpdating = false;
                if (errorCallback) {
                    errorCallback();
                }
            });
        }

        // Add update Question
        $scope.addUpdateQuestion = function() {
            var qlength = $scope.lessonQuestions.length;
            $scope.total_questions = qlength + 1;
            /*if (qlength >= $scope.resources.maxQuestionCount) {
             return;
             }*/
            $scope.lessonQuestions.push({
                is_new : true,
                order_no: $scope.lessonQuestions.length + 1,
                question: "",
                question_type: 1,
                control_type: 1,
                answers: [],
                enable : 1,
                video_id : parseInt($stateParams.id)
            });
            //$scope.selectedQuestion = $scope.lessonQuestions[$scope.lessonQuestions.length - 1];
            $scope.selectUpdateQuestion($scope.lessonQuestions.length - 1);
        }

        // Remove New Question ---------------------
        $scope.removeUpdateQuestion = function() {
            var questionLength = $scope.cur_lesson.questions.length;
            if (questionLength == 1) {
                return;
            }
            swal({
                title: "Are you sure?",
                text: "Do you want to remove this question?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Delete it!",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function() {
                if ($scope.selectedQuestion.is_new) {
                    console.log('This is a new question');
                    var index = $scope.lessonQuestions.indexOf($scope.selectedQuestion);
                    $scope.lessonQuestions.splice(index, 1);
                    $scope.selectedQuestion = $scope.lessonQuestions[0];
                    console.log('Selected question is: '+$scope.selectedQuestion);
                    $scope.resources.updateQuestionSelectedIndex = 0;
                    $timeout(function() {
                        swal("Deleted!", "Question has been deleted.", "success");
                    }, 500);
                }else{
                    console.log('This is a old question');
                    $scope.selectedQuestion.enable = 0;
                    LessonService.removeQuestion($scope.selectedQuestion).then(function (response) {
                        if (response.query_status == "success") {
                            var index = $scope.lessonQuestions.indexOf($scope.selectedQuestion);
                            $scope.lessonQuestions.splice(index, 1);
                            $scope.selectedQuestion = $scope.lessonQuestions[0];
                            console.log('Selected question is: '+$scope.selectedQuestion.id);
                            $scope.resources.updateQuestionSelectedIndex = 0;
                            $timeout(function() {
                                swal("Deleted!", "Question has been deleted.", "success");
                            }, 500);
                        }else{
                            console.log("Error : Failed to remove question");
                            $timeout(function() {
                                swal("Failed!", "Failed to delete the question.", "error");
                            }, 500);
                        }
                    }, function (error) {
                        console.log("Error : Failed to remove question");
                        $timeout(function() {
                            swal("Failed!", "Failed to delete the question.", "error");
                        }, 500);
                    });
                }

            });
        }

        // Delete Lesson
        $scope.deleteLesson = function(lesson) {

            if(lesson.quiz_count > 0 && JSON.parse($localStorage.user).role_id != 1)
            {
                swal("Error", "This Lesson is use by the other parents. If you want to delete, please flag the lesson with proper comment. Then admin will remove the video soon.", "error");

                return false;
            }

            swal({
                title: "Are you sure?",
                text: "This will remove lesson permanently.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function(isOk) {
                if (isOk) {
                    lesson.enable = 0;
                    VideoService.updateVideo(lesson.id, lesson).then(function (response) {
                        if (response.query_status == "success") {
                            // swal("Deleted!", "Lesson deleted successfully.", "success");

                            swal({
                                title: "Deleted",
                                text: "Lesson deleted successfully.",
                                type: "success",
                                confirmButtonText: "Ok",
                                closeOnConfirm: true,
                            }, function(isOk) {

                                if(JSON.parse($localStorage.user).role_id == 1)
                                {
                                    $state.go("admin.lessons");
                                }
                                if(JSON.parse($localStorage.user).role_id == 2)
                                {
                                    $state.go("parent.lessons");
                                }
                            });

                        }else{
                            console.log("ERROR : Failed to delete lesson.");
                            console.log(response);
                            swal("Failed!", "Failed to remove lesson", "error");
                        }
                    }, function (error) {
                        console.log("ERROR : Failed to delete lesson.");
                        console.log(error);
                        swal("Failed!", "Failed to remove lesson", "error");
                    });
                }
            });
        }

        // Get sub and main categories in video
        $scope.getMainSubCategoryNames = function (catId) {
            var cat = {};
            catId = parseInt(catId);
            var subCatObj = $scope.LessonModel.allCategoriesObj[catId];
            if (catId != 0 && subCatObj) {
                cat["sub"] = subCatObj.name;
            }
            if (subCatObj && subCatObj.parent_cat_id && subCatObj.parent_cat_id != 0 && $scope.LessonModel.allCategoriesObj[subCatObj.parent_cat_id]) {
                cat["main"] = $scope.LessonModel.allCategoriesObj[subCatObj.parent_cat_id].name;
            }
            return cat;
        }

        /**
         * Keyword filter with multiple properties
         * It searches by title, category and sub category
         * @param row
         * @returns {boolean}
         */
        $scope.keywordSearch = function keywordSearch(row) {
            if (row.catName == undefined) row.catName = '';
            if (row.subCatName == undefined) row.subCatName = '';
            return (
                angular.lowercase(row.title).indexOf(angular.lowercase($scope.searchLessonName) || '') !== -1 ||
                angular.lowercase(row.catName).indexOf(angular.lowercase($scope.searchLessonName) || '') !== -1 ||
                angular.lowercase(row.subCatName).indexOf(angular.lowercase($scope.searchLessonName) || '') !== -1
            );
        };

        // Load All House members
        $scope.getHouseMembers = function () {
            $rootScope.loadingHouseMembers = true;
            UserService.getUsersByHouseId(JSON.parse($localStorage.user).house_id).then(function (data) {
                if (data.query_status = "success") {
                    $rootScope.loadingHouseMembers = false;
                    $scope.allHouseParticipants = data.data;
                    $rootScope.allHouseParticipants = data.data;
                } else {
                    // Error
                    console.log("Error : Failed to retrieve participants in house");
                    $rootScope.loadingHouseMembers = false;
                    console.log(data.data);
                    $scope.allHouseParticipants = [];
                    $rootScope.allHouseParticipants = [];
                }
            }, function (e) {
                // Error
                console.log("Error : Failed to retrieve participants in house");
                $rootScope.loadingHouseMembers = false;
                console.log(e);
                $scope.allHouseParticipants = [];
                $rootScope.allHouseParticipants = [];
            });
        };

        // Get all sponsored children
        $scope.getAllSponsoredChildren = function getAllSponsoredChildren() {

            UserService.getAllSponsoredChildren().then(function (data) {
                if (data.query_status = "success") {
                    $rootScope.loadingHouseMembers = false;
                    $scope.allHouseParticipants = data.data;
                    $rootScope.allHouseParticipants = data.data;
                } else {
                    // Error
                    console.log("Error : Failed to retrieve participants in house");
                    $rootScope.loadingHouseMembers = false;
                    console.log(data.data);
                    $scope.allHouseParticipants = [];
                    $rootScope.allHouseParticipants = [];
                }
            }, function (e) {
                // Error
                console.log("Error : Failed to retrieve participants in house");
                $rootScope.loadingHouseMembers = false;
                console.log(e);
                $scope.allHouseParticipants = [];
                $rootScope.allHouseParticipants = [];
            });
        };

        // Load child assigned lessons
        $scope.loadChildAssignedLessons = function (childId) {
            if ($scope.selectedMember == childId) {
                return;
            }
            $scope.selectedMember = childId;
            $scope.loadingChildAssignedLesson = true;

            LessonService.getMyAssignedLessons(childId).then(function(response) {
                if (response.query_status == "success") {
                    $scope.childLessons = response.data;
                    $scope.loadingChildAssignedLesson = false;
                }else{
                    console.log("ERROR : Failed to load child assigned data");
                    console.log(response);
                    $scope.childLessons = [];
                    $scope.loadingChildAssignedLesson = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load child assigned data");
                console.log(error);
                $scope.childLessons = [];
                $scope.loadingChildAssignedLesson = false;
            });
        }

        // Get Filtered ID list
        $scope.getFilteredIdList = function (catId, isMain) {
            $scope.FilteredIdList  = [];
            // $scope.filterOpt = {};
            if (catId == null) {
                delete $scope.FilteredIdList;
            }

            if (isMain) {
                angular.forEach($scope.LessonModel.subCategories[catId], function (e, i) {
                    $scope.FilteredIdList.push(e.id);
                    console.log('Function started.....');
                });
            }else{
                $scope.FilteredIdList.push(catId);
            }
        };

        $scope.setAllChildrentFilter = function setAllChildrenFilter() {
            $scope.filterOpt.selectedChildId = 0
        };

        $scope.filterOpt = {};
        $scope.filterUser = {};
        // Get Filtered Child ID list
        $scope.getFilteredChildIdList = function (childId) {
            // console.log('###Get filtered child id function fired###');
            // console.log('Child id is :'+childId);
            // $scope.FilteredIdList  = [];
            // if (childId == null) {
            //     delete $scope.FilteredIdList;
            // }
            //     var testarr=$scope.myLessons;
            //     var str = JSON.stringify(testarr);
            //     str = JSON.stringify(testarr, null, 4); // (Optional) beautiful indented output.
            //     console.log(str); // Logs output to dev tools console.
            //     angular.forEach($scope.myLessons, function (e, i) {
            //         console.log('Child ids are :'+e.child_ids);
            //         var childids = e.child_ids;
            //         if(childids != null){
            //         console.log('Child ids are :'+childids);
            //
            //         if(childids == childId){
            //             console.log('If condition passed....');
            //             $scope.FilteredIdList.push(e.id);
            //         }
            //         else{
            //             console.log('If condition failed....');
            //         }
            //         }
            //         // if (childids.indexOf(childId) != -1) {
            //         //     $scope.FilteredIdList.push(e.id);
            //         // }
            //
            //     });
            $scope.filterOpt.selectedChildId = childId;
            console.log("=== selected child " + $scope.filterOpt.selectedChildId);
        }

        // Lesson filter By Category id
        $scope.filterByCategory = function(lesson) {
            if (!$scope.FilteredIdList) {
                return true;
            }
            return ($scope.FilteredIdList.indexOf(lesson.category_id) !== -1);
        };

        $scope.resetFilters = function()
        {
            $scope.searchLessonName = "";
            $scope.filterByMinAge = "";
            $scope.filterByMaxAge = "";
            $scope.filterOpt.uid = undefined;
            $scope.filterOpt.role_id = undefined;
            delete $scope.FilteredIdList;
        };

        $scope.resetMyLessonFilters = function resetMyLessonFilters()
        {
            $scope.searchLessonName = "";
            $scope.filterByMinAge = "";
            $scope.filterByMaxAge = "";
            $scope.filterOpt.uid = undefined;
            $scope.filterOpt.selectedAddedBy = undefined;
            $scope.filterOpt.selectedChildId = undefined;
            $scope.filterOpt.role_id = undefined;
            delete $scope.FilteredIdList;
        };

        $scope.resetSponsorLessonFilters = function resetSponsorLessonFilters()
        {
            $scope.searchLessonName = "";
            $scope.filterByMinAge = "";
            $scope.filterByMaxAge = "";
            $scope.filterOpt.uid = undefined;
            $scope.filterOpt.selectedAddedBy = undefined;
            $scope.filterOpt.selectedChildId = undefined;
            $scope.filterOpt.role_id = undefined;
            delete $scope.FilteredIdList;
        }

        // Lesson filter By Child id
        $scope.filterByChildId = function(lesson) {
            // console.log(lessonn.child_ids);
            // console.log('###child filter function fired####');

            if (undefined != $scope.filterOpt.selectedChildId && $scope.filterOpt.selectedChildId != 0) {
                if (lesson.child_ids.length == 0) {
                    return false;
                }else {
                    if (undefined != $scope.filterOpt.selectedChildId) {
                        return (lesson.child_ids.indexOf($scope.filterOpt.selectedChildId) !== -1);
                    }
                }
            }else if ($scope.filterOpt.selectedChildId == 0){
                // filter lessons which are assigned to child
                // var found = false;
                // for (var i = 0; i < $scope.allHouseParticipants.length && !found; i++) {
                //     // if ($scope.allHouseParticipants[i].id === "specialword") {
                //     //     found = true;
                //     // }
                //     if (lesson.child_ids.indexOf($scope.allHouseParticipants[i].id) !== -1) {
                //         found = true;
                //         break;
                //     }
                // }
                // return found;
                return (lesson.child_ids.length > 0)
            }else {
                return true;
            }

        };

        $scope.filterOpt.selectedAddedBy = undefined;

        /**
         * Set filter  type as parent,sponsor or none
         * @param type
         */
        $scope.setFilterAddedBy = function setFilterAddedBy(type) {
            $scope.filterOpt.uid = undefined;
            $scope.filterOpt.role_id = undefined;
            $scope.filterOpt.selectedAddedBy = type;
        };

        /**
         * Set filter role
         * @param type
         */
        $scope.setFilterOwnerRole = function setFilterOwnerRole(role_id) {
            $scope.filterOpt.uid = undefined;
            $scope.filterOpt.role_id = role_id;
            $scope.filterOpt.selectedAddedBy = undefined;
        };

        /**
         * Filter sponsor added lessons and parent added lessons
         * @param lesson
         * @returns {*}
         */
        $scope.filterBySponsorAdded = function(lesson) {
            if (undefined != $scope.filterOpt.selectedAddedBy) {
                if ($scope.filterOpt.selectedAddedBy == 'sponsor') {
                    return (lesson.sponsor_id);
                }else if ($scope.filterOpt.selectedAddedBy == 'parent'){
                    return (!lesson.sponsor_id);
                }
            }else {
                return true;
            }

        };

        /**
         * Set filter lesson by current user
         */
        $scope.setFilterCurrentUser = function (id) {
            $scope.filterOpt.uid = id;
        };

        /**
         * Filter lesson by current user id
         * @param lesson
         * @returns {boolean}
         */
        $scope.filterByCurrentParent = function(lesson) {
            if (undefined != $scope.filterOpt.uid && $scope.filterOpt.uid != "") {
                return $scope.filterOpt.uid == lesson.owner_id;
            }else {
                return true;
            }
            return true;
        };

        /**
         * Filter lesson by role id
         * @param lesson
         * @returns {boolean}
         */
        $scope.filterByCurrentRole = function(lesson) {
            if (undefined != $scope.filterOpt.role_id && $scope.filterOpt.role_id != "") {
                return $scope.filterOpt.role_id == lesson.role_id;
            }else {
                return true;
            }
        };

        // // Lesson filter by child id
        // $scope.filterByChildId = function(lesson) {
        //     console.log('###child filter function fired####');
        //     if (!$scope.FilteredIdList) {
        //         return true;
        //     }
        //     return ($scope.FilteredIdList.indexOf(lesson.category_id) !== -1);
        // };

        //load all children
        $scope.loadAllChildren= function loadAllChildren() {
            if (!$scope.FilteredIdList) {
                return true;
            }
            return ($scope.FilteredIdList.indexOf(lesson.category_id) !== -1);
        };

        // Open assign lesson to other house popup
        $scope.assignLessonToSponsoredHouse = function assignLessonToSponsoredHouse() {
            ngDialog.open({
                template: 'assignVideoToOtherHouseTemplate',
                backdrop : 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: true,
                className: 'ngdialog-theme-default',
                controller: assignLessonToSponsoredHouseCtrl,
            });
            assignLessonToSponsoredHouseCtrl.$inject = ['$scope', '$rootScope', 'UserService', 'AllocationService', 'LessonService', '$localStorage'];
            function assignLessonToSponsoredHouseCtrl($scope, $rootScope, UserService, AllocationService, LessonService, $localStorage) {

                $scope.otherHouseDetails = [];
                $scope.res = {};

                var getSponsorAccessibleHouseDetails = function getSponsorAccessibleHouseDetails() {
                    UserService.getSponsorAccessibleHouseDetails().then(function (response) {
                        if (response.query_status == 'success') {
                            $scope.otherHouseDetails = response.data;
                            $scope.res.selectedHouse = $scope.otherHouseDetails[0];
                        }
                    }, function (error) {

                    });
                };

                getSponsorAccessibleHouseDetails();

                // Assign video lesson to other sponsored house
                $scope.assignToOtherHouse = function assignToOtherHouse() {

                    console.log("video id: " + $rootScope.cur_lesson.id);

                    console.log($scope.res.selectedHouse);

                    //
                    // video_id        : quizData.video_id,
                    //     //description     : "",
                    //     value           : quizData.value,
                    //     score           : quizData.score,
                    //     house_id        : quizData.house_id,
                    //     sponsor_id      : quizData.sponsor_id


                    var quizData = {
                        video_id: $rootScope.cur_lesson.id,
                        value: $scope.res.value,
                        score: $scope.res.score,
                        house_id: $scope.res.selectedHouse.house_id,
                        user_id: $scope.res.selectedHouse.id,
                        sponsor_id: JSON.parse($localStorage.user).id
                    };

                    console.log(quizData);


                    LessonService.checkQuizAlreadyExistsInHouse($rootScope.cur_lesson.id, $scope.res.selectedHouse.id).then(function (argument) {
                        if (argument.query_status == "success") {

                            if (argument.data.exists) {
                                swal("Error!", 'Selected Lesson is already exists', "error");
                            }else {
                                LessonService.createQuizBySponsor(quizData).then(function (argument) {
                                    if (argument.query_status == "success") {

                                        $timeout(function() {
                                            swal("Success!", "Lesson successfully added to house.", "success");
                                        }, 500);
                                        // $state.transitionTo($state.current, $stateParams, {
                                        //     reload: true,
                                        //     inherit: false,
                                        //     notify: true
                                        // });
                                    }else{
                                        $scope.quizData = null;
                                        $rootScope.quizData = null;
                                        swal("Error!", argument.message, "error");
                                    }

                                }, function (error) {
                                    console.log(error);
                                    swal("Error!", error.message, "error");
                                });
                            }

                        }
                    }, function (error) {
                        console.log(error);
                        swal("Error!", error.message, "error");
                    });
                    ngDialog.closeAll();
                };
            }
        }


        $scope.getChilLessons = function getChildLessons(childId) {
            console.log('Child id is :'+childId);

            if( childId!= null){
                LessonService.getLessonByChildId(childId).then(function (response) {
                    if (response.query_status == 'success') {
                        if(response.data!=null){
                            $scope.LessonModel.myLessons = response.data;
                            console.log('Video id is :'+$scope.LessonModel.myLessons);

                            $scope.resources.stillLoading = false;
                        }
                    }
                }, function (error) {
                    console.log("ERROR : While loading all lessons");
                    console.log(error);
                });
            }else{
                $scope.getAllVideos();
            }
        }




        $scope.getSelectedRating = function (rating,videoId) {
            $scope.rateval = rating;
            $scope.ratevideo_id = videoId;
            console.log('Rating is :'+$scope.rateval);
            console.log('Video id is :'+$scope.ratevideo_id);
            $scope.addLessonRatings(videoId,rating);
            $scope.parent_rate_stars = true;
            $timeout(function(){}, 3000);
            $scope.after_rate_stars = "after_rate_stars=true";
        }

        //    Add lesson ratings
        $scope.addLessonRatings = function addLessonRatings(videoId,rating) {
            console.log('Video id is##### :'+videoId);
            console.log('Video rating is##### :'+rating);

            if( videoId!= null){
                LessonService.userAddRatings(videoId,rating).then(function (response) {
                    if (response.query_status == 'success') {
                        console.log('Rating Added....');
                        $scope.averageRating = response.data;
                    }
                    if (response.query_status == 'error') {
                        console.log('Something went wrong....');
                    }
                    if (response.query_status == 'duplicate_record') {
                        console.log('A duplicate record....');
                        $scope.averageRating = response.data;
                    }
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }, function (error) {
                    console.log("ERROR : While loading ratings");
                    console.log(error);
                });
            }else{
                console.log('Video id is null');
            }
        }

        //Restrcit lesson rating parent
        //var video_id = $scope.video_id;

        //
        // //    Get lesson ratings
        // $scope.getLessonRatings = function getLessonRatings(videoId) {
        //     //videoId = 48;
        //     console.log('Video id is :'+videoId);
        //
        //     if( videoId!= null){
        //         LessonService.getRatingsByVideoId(videoId).then(function (response) {
        //             if (response.query_status == 'success') {
        //                 if(response.data!=null){
        //                     $scope.current_lesson_rateval = response.data;
        //                     console.log('Average value is :'+ $scope.current_lesson_rateval);
        //
        //                 }
        //             }
        //         }, function (error) {
        //             console.log("ERROR : While loading ratings");
        //             console.log(error);
        //         });
        //     }else{
        //         console.log('Video id is null');
        //     }
        // }


        // $scope.user1 = {rating:5};
        // $scope.user2 = {rating:2};
        // $scope.user3 = {rating:1};
        // $scope.averageRating = 3.5;

        // $scope.$watch(function(){return $scope.user1.rating + $scope.user2.rating + $scope.user3.rating;}, function(oldVal, newVal) {
        //     if (newVal) { updateAverageRating(); }
        // });

        // function updateAverageRating(){ $scope.averageRating = ($scope.user1.rating + $scope.user2.rating + $scope.user3.rating) / 3; }
        // function updateAverageRating(){ $scope.averageRating = 3.5; }

        $scope.isReadonly = true;
        // $scope.rateFunction = function(rating) {
        //     console.log("Rating selected: " + rating);
        // };

        $scope.confirmRating = function (newRating) {
            var d = $q.defer();

            $timeout(function  () {

                var vid = parseInt($stateParams.id);
                LessonService.userAddRatings(vid,newRating).then(function (response) {
                    if (response.query_status == 'success') {
                        console.log('Rating Added....');
                        $scope.rateObj.rateValue = response.data;
                        $scope.rateObj.alreadyRated = true;
                        d.resolve();
                    }
                    if (response.query_status == 'duplicate_record') {
                        console.log('A duplicate record....');
                        $scope.rateObj.rateValue = response.data;
                        console.log($scope.rateObj.resetable);
                        $scope.rateObj.alreadyRated = true;
                        d.resolve();
                    }
                    if (response.query_status == 'error') {
                        console.log('Something went wrong....');
                        d.reject();
                    }

                    // $state.transitionTo($state.current, $stateParams, {
                    //     reload: true,
                    //     inherit: false,
                    //     notify: true
                    // });
                }, function (error) {
                    console.log("ERROR : While loading ratings");
                    console.log(error);
                    d.reject();
                });

                //
                // if(confirm('Are you sure about rating us with '+newRating+' stars?')){
                //     d.resolve();
                // }else{
                //     d.reject();
                // }
            });

            return d.promise;
        };

    }]);

    // Directive for star rating
    angularEarnToLearnControllers.directive('starRating', function () {
        return {
            restrict: 'A',
            template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '<i class="fa fa-star"></i>' +
            '</li>' +
            '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {

                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function (index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue', function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                });
            }
        }
    });

    angularEarnToLearnControllers.directive("averageStarRating", function() {
        return {
            restrict : "EA",
            template : "<div class='average-rating-container'>" +
            "  <ul class='rating background' class='readonly'>" +
            "    <li ng-repeat='star in stars' class='star'>" +
            "      <i class='fa fa-star'></i>" + //&#9733
            "    </li>" +
            "  </ul>" +
            "  <ul class='rating foreground' class='readonly' style='width:{{filledInStarsContainerWidth}}%'>" +
            "    <li ng-repeat='star in stars' class='star filled'>" +
            "      <i class='fa fa-star'></i>" + //&#9733
            "    </li>" +
            "  </ul>" +
            "</div>",
            scope : {
                averageRatingValue : "=ngModel",
                max : "=?", //optional: default is 5
            },
            link : function(scope, elem, attrs) {
                if (scope.max == undefined) { scope.max = 5; }
                function updateStars() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({});
                    }
                    var starContainerMaxWidth = 100; //%
                    scope.filledInStarsContainerWidth = scope.averageRatingValue / scope.max * starContainerMaxWidth;
                };
                scope.$watch("averageRatingValue", function(oldVal, newVal) {
                    if (newVal) { updateStars(); }
                });
            }
        };
    });



})();
