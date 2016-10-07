(function () {
    'use strict';
    angularEarnToLearnControllers.controller('AttemptController', ['$scope', '$rootScope', '$state', '$sce', '$window', '$localStorage', '$stateParams', '_URLS', 'AuthService', 'LessonService', 'VideoService', 'AttemptService', 'AllocationService', 'AUTH_EVENTS', 'cfpLoadingBar', function ($scope, $rootScope, $state, $sce, $window, $localStorage, $stateParams, _URLS, AuthService, LessonService, VideoService, AttemptService, AllocationService, AUTH_EVENTS, cfpLoadingBar) {
        // Define resources model
        $scope.resources = {
            stillLoading: true,
            stillLoadingMyAttempts: true,
            attemptCompleted: false,
            currentQuestionIndex: 0,
            currentQuestion: {},
            currentAnswer: 0,
            answerList: {},
            notAnsweredList: [],
            isValidateChecked: true
        };
        $scope.parsingRate = 0;
        $scope.points = 0;
        $scope.questions = [];

        $scope.isLessonPassed = false;

        // Load
        $scope.loadMyQuestionAnswers = function () {
            $scope.resources.stillLoading = true;
            $scope.loadingQuestionsList = true;

            $scope.validQuiz = false;
            var quizId = 0;
            var attempId = 0;
            if ($stateParams.quizid) {
                quizId = parseInt($stateParams.quizid);
            }
            if ($stateParams.attemptid) {
                attempId = parseInt($stateParams.attemptid);
            }
            $scope.current_quiz = quizId;
            $scope.attempId = attempId;

            LessonService.getQuizByAttemptId(attempId).then(function (response) {
                if (response.query_status == "success") {
                    $scope.parsingRate = response.data[0].score;
                    console.log(response.data[0]);
                    $scope.remainingAttempt = response.data[0].remainingAttempt;
                    // $scope.remainingAttempt = response.data[0].score;
                    $scope.points = response.data[0].value;

                    // check whether quiz already completed by attempt status
                    if (response.data[0].attempt_status != undefined) {
                        if (response.data[0].attempt_status == 2) {
                            $state.go('child.lessons');
                        }
                    }

                } else {
                    $scope.parsingRate = 0;
                    $scope.points = 0;
                    console.log("ERROR :  Failed To Load Quiz.");
                    console.log(response.message);
                }
            }, function (error) {
                console.log("ERROR :  Failed To Load Quiz.");
                console.log(error);
                $scope.parsingRate = 0;
                $scope.points = 0;
            });

            LessonService.getAllocationByUserQuizId(quizId).then(function (response) {

                if (response.query_status == "success") {
                    $scope.validQuiz = true;

                    if (response.data[0].status == 3) {
                        $scope.resources.attemptCompleted = true;
                        $scope.quiz = {};
                        $scope.resources.stillLoading = false;
                    }

                    LessonService.getLessonByQuizId(quizId).then(function (response) {
                        if (response.query_status == "success") {
                            if (response.data) {
                                $scope.quiz = response.data;
                                $scope.$on('$locationChangeStart', function (event, next, current) {
                                    // Here you can take the control and call your own functions:

                                    if ($scope.backToAllClicked) {
                                        $scope.backToAllClicked = false;
                                        return;
                                    }

                                    swal({
                                        title: "Are you sure you want to go back?",
                                        text: "",
                                        type: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes",
                                        closeOnConfirm: true,
                                        showLoaderOnConfirm: true
                                    }, function (res) {
                                        if (res) {
                                            $scope.finishAttempt();
                                            console.log($scope.attempId);
                                            AttemptService.finishAttempt($scope.attempId).then(function (response) {
                                            });

                                            $scope.hasAttemptToFinish = false;
                                            $scope.attemptStatus = 0;
                                            $state.go("child.lessonDetails", {quizid: parseInt($stateParams.quizid)});
                                        } else {
                                            $state.go('child.lesson', {
                                                quizid: parseInt($stateParams.quizid),
                                                attemptid: $stateParams.attemptid
                                            });
                                        }
                                    });
                                    event.preventDefault();
                                });

                                // Assign first question in Lesson
                                $scope.nextIndex = 0;
                                $scope.questions = response.data.questions;

                                // Current Sele;cted Question Assign
                                $scope.resources.currentQuestion = response.data.questions[$scope.nextIndex];
                                AttemptService.getAnswersByAttemptId($scope.attempId).then(function (response) {
                                    console.log(response);
                                    if (response.query_status == "success") {
                                        angular.forEach(response.data, function (value, index) {
                                            $scope.resources.answerList[value.question_id] = {
                                                id: parseInt(value.id),
                                                attemptId: parseInt(value.attempt_id),
                                                questionId: parseInt(value.question_id),
                                                answerId: parseInt(value.answer_id)
                                            }
                                        });

                                        $scope.resources.stillLoading = false;
                                        $scope.loadingQuestionsList = false;

                                    } else {
                                        console.log("ERROR : While loading answerList");
                                        console.log(response.message);
                                        $scope.resources.stillLoading = false;
                                        $scope.loadingQuestionsList = false;
                                    }
                                }, function (error) {
                                    console.log("ERROR : While loading answerList");
                                    console.log(error);
                                    $scope.resources.stillLoading = false;
                                    $scope.loadingQuestionsList = false;
                                });
                            } else {
                                $scope.quiz = {};
                                $scope.resources.stillLoading = false;
                                $scope.loadingQuestionsList = false;
                            }
                        } else {
                            console.log("ERROR : Get Lesson By Quiz Id.");
                            console.log(response.message);
                            $scope.validQuiz = false;
                            $scope.resources.stillLoading = false;
                            $scope.loadingQuestionsList = false;
                        }
                    }, function (error) {
                        console.log("ERROR : Get Lesson By Quiz Id.");
                        console.log(error);
                        $scope.validQuiz = false;
                        $scope.resources.stillLoading = false;
                        $scope.loadingQuestionsList = false;
                    });
                } else {
                    $scope.validQuiz = false;
                    $scope.resources.stillLoading = false;
                    $scope.loadingQuestionsList = false;
                    console.log("ERROR : Loading Allocation By Quiz.");
                    console.log(response.message);
                }
            }, function (error) {
                $scope.validQuiz = false;
                $scope.resources.stillLoading = false;
                $scope.loadingQuestionsList = false;
                console.log("ERROR : Loading Allocation By Quiz.");
                console.log(error);
            });
        }

        // Is Valid Quiz
        $scope.CheckIsValidQuiz = function () {
            $scope.resources.stillLoading = true;

            $scope.validQuiz = false;
            var quizId = 0;
            if ($stateParams.quizid) {
                quizId = parseInt($stateParams.quizid);
            }
            $scope.current_quiz = quizId;
            LessonService.getAllocationByUserQuizId(quizId).then(function (response) {
                $scope.attemptId = response.data[0].id;
                $scope.attemptStatus = response.data[0].status;

                //status: 0
                if (response.query_status == "success") {
                    $scope.validQuiz = true;
                    $rootScope.allocationId = response.data[0].id;
                    VideoService.getVideoByQuizId(quizId).then(function (response) {
                        if (response.query_status == "success") {
                            if (response.data && response.data) {
                                $scope.quiz = response.data;
                                console.log($scope.quiz);
                            } else {
                                $scope.quiz = {};
                            }
                            $scope.resources.stillLoading = false;
                        } else {
                            console.log("ERROR : Get Video By Quiz Id.");
                            console.log(response.message);
                            $scope.validQuiz = false;
                            $scope.resources.stillLoading = false;
                        }
                    }, function (error) {
                        console.log("ERROR : Get Video By Quiz Id.");
                        console.log(error);
                        $scope.validQuiz = false;
                        $scope.resources.stillLoading = false;
                    });

                    // Load All attempts for this quiz in user
                    $scope.resources.stillLoadingMyAttempts = true;
                    AttemptService.getAttemptByQuizId($scope.current_quiz).then(function (response) {
                        if (response.query_status == "success") {
                            $scope.myAttempts = response.data;
                            $scope.hasAttemptToFinish = false;
                            $scope.attemptIdToFinish = 0;
                            $scope.finishedAttempt = false;

                            angular.forEach(response.data, function (e, i) {
                                // console.log(e);
                                if (e.status == 0) {
                                    $scope.hasAttemptToFinish = true;
                                    $scope.attemptIdToFinish = e.id;
                                }
                                if (e.is_passed == 1) {
                                    $scope.finishedAttempt = true;
                                    $scope.gotScore = e.score_percentage;
                                }
                                if (e.status == 0 && e.is_passed == 0) {
                                    $scope.hasAttemptToFinish = false;
                                }
                            })

                            $scope.resources.stillLoadingMyAttempts = false;
                        } else {
                            $scope.myAttempts = [];
                            $scope.resources.stillLoadingMyAttempts = false;
                        }
                    }, function (error) {
                        $scope.myAttempts = [];
                        console.log("ERROR : Loading Attempt for user By Quiz.");
                        console.log(response.message);
                        $scope.resources.stillLoadingMyAttempts = false;
                    });

                } else {
                    $scope.validQuiz = false;
                    $scope.resources.stillLoading = false;
                    console.log("ERROR : Loading Allocation By Quiz.");
                    console.log(response.message);
                }
            }, function (error) {
                $scope.validQuiz = false;
                $scope.resources.stillLoading = false;
                console.log("ERROR : Loading Allocation By Quiz.");
                console.log(error);
            });
        }


        // Start a Attempt
        $scope.startNewAttempt = function () {
            $scope.newAttempt = {
                house_id: JSON.parse($localStorage.user).house_id,
                quiz_id: parseInt($stateParams.quizid),
                allocation_id: $rootScope.allocationId
            }
            AttemptService.createAllocation($scope.newAttempt).then(function (response) {
                if (response.query_status == "success") {
                    $scope.attemptId = response.data.id;
                    $stateParams.attemptid = response.data.id;
                    if ($stateParams.bundleId != undefined) {
                        $state.go('child.LessonBundleWatchVideo', {
                            quizid: parseInt($stateParams.quizid),
                            attemptid: response.data.id,
                            bundleId: $stateParams.bundleId
                        });
                    }else {
                        $state.go('child.watchVideo', {
                            quizid: parseInt($stateParams.quizid),
                            attemptid: $scope.attemptId
                        });
                    }
                    //$scope.watchedVideo = true;
                    //$state.go('child.lesson', {quizid: parseInt($stateParams.quizid), attemptid: $scope.attemptId});
                } else {
                    console.log("ERROR : Failed to start attempt.");
                    console.log(response.message);
                }
            }, function (error) {
                console.log("ERROR : Failed to start attempt.");
                console.log(error);
            });
        }


        // Continue Attempt
        $scope.contAttempt = function () {
            $state.go('child.lesson', {quizid: parseInt($stateParams.quizid), attemptid: $scope.attemptIdToFinish});
        }

        // On Select Answer
        $scope.selectAnswer = function (answerId) {
            console.log($scope.resources.currentQuestion.id);
            console.log($scope.questions[$scope.resources.currentQuestionIndex]);
            $scope.resources.currentAnswer = answerId;

            if ($scope.resources.answerList[$scope.resources.currentQuestion.id] == undefined) {
                console.log('undefined block');
                $scope.resources.answerList[$scope.resources.currentQuestion.id] = {
                    attemptId: $scope.attempId,
                    questionId: $scope.resources.currentQuestion.id,
                    answerId: answerId
                }
                console.log($scope.resources.answerList[$scope.resources.currentQuestion.id]);
            } else {
                console.log('defined block');
                $scope.resources.answerList[$scope.resources.currentQuestion.id].answerId = answerId;
            }
            console.log($scope.resources.answerList);
            var index = $scope.resources.notAnsweredList.indexOf(parseInt($scope.resources.currentQuestion.id));
            if (index > -1) {
                $scope.resources.notAnsweredList.splice(index, 1);
            }
            $scope.submitAnswer();
        }

        // Submit Answer
        $scope.submitAnswer = function () {
            if ($scope.resources.currentAnswer != 0) {
                var answer = $scope.resources.answerList[$scope.resources.currentQuestion.id];
                var isUpdateBusy, isCreatingBusy;

                if (answer.id == undefined) {

                    AttemptService.createAnswer(answer).then(function (response) {
                        console.log(response);
                        if (response.query_status == "success") {
                            $scope.resources.answerList[parseInt(response.data.question_id)]["id"] = response.data.id;
                            $scope.getAnsweredQuestionCount();
                        } else {
                            console.log("ERROR : While Create answer.");
                            console.log(response.message);
                        }
                    }, function (error) {
                        console.log("ERROR : While Create answer.");
                        console.log(error);
                    });
                } else {
                    console.log(answer);
                    AttemptService.updateAnswer(answer.id, answer).then(function (response) {
                        console.log(response)
                    }, function (error) {
                        console.log("ERROR : While updating answer.");
                        console.log(error);
                    });
                }
                $scope.resources.currentAnswer = 0;
            }
            ;
        }

        // Check whether all questions have answered
        $scope.checkAllAnswered = function () {
            var ind = null;
            var keepGoing = true;
            angular.forEach($scope.questions, function (v, i) {

                if(keepGoing) {
                    if ($scope.resources.answerList[v.id] == undefined) {
                        $scope.resources.notAnsweredList.push(v.id);
                        if (ind == null) {
                            ind = i;
                            keepGoing = false;
                        }
                    }
                }


            });
            if (ind != null) {
                $scope.nextIndex = ind;
                // $scope.resources.currentQuestion = $scope.questions[$scope.resources.currentQuestionIndex];
                $scope.resources.currentQuestion = $scope.questions[$scope.nextIndex]; // Fix EAR-700
                console.log($scope.resources.currentQuestion);
                console.log($scope.resources.answerList);
            }
            // console.log($scope.questions);
            // console.log($scope.resources.notAnsweredList);
            // console.log('Next Index: ' + $scope.nextIndex);
        };

        $scope.hasMissingAnswer = false;
        $scope.checkMissingAnswers = function checkMissingAnswers () {
            var ind = null;
            var keepGoing = true;
            $scope.hasMissingAnswer = false;
            $scope.missingAnswerIndex = undefined;
            angular.forEach($scope.questions, function (v, i) {

                if(keepGoing) {
                    if ($scope.resources.answerList[v.id] == undefined) {
                        // $scope.resources.notAnsweredList.push(v.id);
                        if (ind == null) {
                            ind = i;
                            keepGoing = false;
                        }
                    }
                }


            });
            if (ind != null) {
                $scope.hasMissingAnswer = true;
                $scope.missingAnswerIndex = ind;
            }else {
                $scope.missingAnswerIndex = undefined;
                $scope.hasMissingAnswer = false;
            }
        };

        // Finish Attempt
        $scope.finishAttempt = function () {
            console.log($scope.resources.answerList);
            console.log($scope.resources.currentAnswer);

            if (isEmptyObject($scope.resources.answerList)) {
                swal({
                    title: "Oops! You have not selected any answer",
                    text: "Please select at least one answer to finish the quiz",
                    type: "warning",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true,
                    showLoaderOnConfirm: true
                }, function () {

                });
            }else {
                $scope.submitAnswer();
                //var answered = $scope.checkAllAnswered();
                swal({
                    title: "Are you sure you want to complete the quiz?",
                    text: "",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, do it!",
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function () {

                    var attempId = 0;
                    if ($stateParams.attemptid) {
                        attempId = parseInt($stateParams.attemptid);
                    }
                    AttemptService.finishAttempt(attempId).then(function (response) {
                        if (response.query_status == "success") {
                            if (response.message == "attempt failed") {
                                swal({
                                    title: "Sorry, but you did not pass the quiz.",
                                    text: "Would you like to take the quiz again?",
                                    type: "error",
                                    showCancelButton: true,
                                    cancelButtonText: "View Assigned Lessons",
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "Try Again",
                                    closeOnConfirm: true,
                                    showLoaderOnConfirm: true
                                }, function (res) {
                                    if (res) {
                                        // $state.go("child.lessonDetails", {quizid: parseInt($stateParams.quizid)}, { reload: true });
                                        if ($stateParams.bundleId != undefined) {
                                            $state.transitionTo("child.lessonBundleLessonDetails",
                                                {
                                                    quizid: parseInt($stateParams.quizid),
                                                    bundleId: $stateParams.bundleId
                                                }, {
                                                    reload: true,
                                                    inherit: false,
                                                    notify: true
                                                });
                                        }else {
                                            $state.transitionTo("child.lessonDetails", {quizid: parseInt($stateParams.quizid)}, {
                                                reload: true,
                                                inherit: false,
                                                notify: true
                                            });
                                        }
                                    } else {
                                        // $state.go("child.dashboard", {}, { reload: true });
                                        $state.transitionTo("child.lessons", {}, {
                                            reload: true,
                                            inherit: false,
                                            notify: true
                                        });
                                    }
                                });
                            } else {
                                //badge complete
                                console.log(attempId);
                                /*AttemptService.finishAttempt(attempId).then(function (response) {

                                 },function () {
                                 console.log("ERROR : While Loading Lesson by Attempt Id");
                                 console.log(response.message);
                                 });*/

                                // Update Header Total Points
                                $rootScope.$broadcast("update-points", {
                                    parameters: {
                                        points: response.data.value
                                    }
                                });
                                // Update completed percentage
                                $rootScope.$broadcast("refresh-complete-percentage");
                                console.log("Message data is: "+response.message_data.custom_message);
                                var messagedata=response.message_data.custom_message;
                                if (messagedata === undefined || messagedata == '') {
                                    messagedata  = 'Congratulations! You have passed this quiz!';
                                }
                                if ($stateParams.bundleId != undefined) {

                                    AttemptService.checkLessonBundleCompletion($stateParams.bundleId).then(function (response) {
                                        // $state.go("child.lessonBundleLessonDetails", {
                                        //     bundleId: $stateParams.bundleId,
                                        //     quizid: $stateParams.quizid
                                        // });
                                    }, function (error) {
                                        console.error(error);
                                        // $state.go("child.lessonBundleLessonDetails", {
                                        //     bundleId: $stateParams.bundleId,
                                        //     quizid: $stateParams.quizid
                                        // });
                                    });



                                    swal({
                                        title: messagedata,
                                        text: "Would you like to watch another video and take another quiz?",
                                        type: "success",
                                        showCancelButton: true,
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "Back to bundle",
                                        cancelButtonText: "Go to dashboard",
                                        closeOnConfirm: true,
                                        showLoaderOnConfirm: true
                                    }, function(isOk) {
                                        // $state.go("child.lessonBundleLessonDetails", {
                                        //         bundleId: $stateParams.bundleId,
                                        //         quizid: $stateParams.quizid
                                        // });
                                        if (isOk) {
                                            $state.go("child.lessonBundleDetails", {
                                                bundleId: $stateParams.bundleId,
                                            });
                                        }else {
                                            $state.go("child.lessons");
                                        }


                                        // $state.transitionTo('child.lessonBundleDetails', {bundleId: $scope.bundle.id}, {
                                        //     reload: true,
                                        //     inherit: false,
                                        //     notify: true
                                        // });
                                    });


                                }else {
                                    swal({
                                        //title: "Congratulations! You have passed this quiz!",
                                        title: messagedata,
                                        text: "Would you like to watch another video and take another quiz?",
                                        type: "success",
                                        showCancelButton: false,
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "Watch another",
                                        cancelButtonText: "Go to dashboard",
                                        closeOnConfirm: true,
                                        showLoaderOnConfirm: true
                                    }, function (res) {
                                        if (res) {
                                            $state.go("child.lessons");
                                        } else {
                                            $state.go("child.lessons");
                                        }
                                    });
                                }
                            }
                        } else {
                            console.log("ERROR : While Finishing the Quiz");
                            console.log(response.message);
                            swal("Failed!", response.message, "error");
                        }
                    }, function (error) {
                        // $scope.validQuiz = false;
                        // $scope.resources.stillLoading = false;
                        // console.log("ERROR : While Finishing the Quiz.");
                        // swal("Failed!", "Something went wrong when finishing attempt.", "error");
                        // console.log(error);
                    });
                });
                $scope.resources.stillLoadingMyAttempts = true;
                AttemptService.getAttemptByQuizId($scope.current_quiz).then(function (response) {
                    if (response.query_status == "success") {
                        $scope.myAttempts = response.data;
                        $scope.hasAttemptToFinish = false;
                        $scope.attemptIdToFinish = 0;
                        $scope.finishedAttempt = false;
                        angular.forEach(response.data, function (e, i) {
                            if (e.status == 0) {
                                $scope.hasAttemptToFinish = true;
                                $scope.attemptIdToFinish = e.id;
                            }
                            if (e.is_passed == 1) {
                                $scope.finishedAttempt = true;
                                $scope.gotScore = e.score_percentage;
                            }
                        })

                        $scope.resources.stillLoadingMyAttempts = false;
                    } else {
                        $scope.myAttempts = [];
                        $scope.resources.stillLoadingMyAttempts = false;
                    }
                }, function (error) {
                    $scope.myAttempts = [];
                    console.log("ERROR : Loading Attempt for user By Quiz.");
                    console.log(response.message);
                    $scope.resources.stillLoadingMyAttempts = false;
                });
            }

        }

        // Get Answered Question Count
        $scope.getAnsweredQuestionCount = function () {
            $scope.answeredQuestionCount = 0;
            angular.forEach($scope.resources.answerList, function (e, i) {
                $scope.answeredQuestionCount += 1;
            });
            return $scope.answeredQuestionCount;
        }

        //redirect to video page
        $scope.startWatchVideo = function () {
            AttemptService.getLastAttempt(parseInt($stateParams.quizid)).then(function (response) {

                console.log(response.query_status);
                console.log(response.data.status);

                if (response.query_status == "success") {
                    $scope.myAttemptStatus = response.data.status;
                    if ($scope.myAttemptStatus == 0) {
                        if ($stateParams.bundleId != undefined) {
                            $state.go('child.LessonBundleWatchVideo', {
                                quizid: parseInt($stateParams.quizid),
                                attemptid: response.data.id,
                                bundleId: $stateParams.bundleId
                            });
                        }else {
                            $state.go('child.watchVideo', {
                                quizid: parseInt($stateParams.quizid),
                                attemptid: response.data.id
                            });
                        }
                    } else if ($scope.myAttemptStatus == 1) {
                        if ($stateParams.bundleId != undefined) {
                            $state.go('child.lessonBundleLesson', {
                                quizid: parseInt($stateParams.quizid),
                                attemptid: response.data.id,
                                bundleId: $stateParams.bundleId
                            });
                        }else {
                            $state.go('child.lesson', {
                                quizid: parseInt($stateParams.quizid),
                                attemptid: response.data.id
                            });
                        }
                    } else if ($scope.myAttemptStatus == 2) {
                        AllocationService.getAllocationById(parseInt($rootScope.allocationId)).then(function (response) {
                            if (response.query_status == "success") {
                                $state.passPrecentage = parseInt(response.data.pass_percentage)
                            }
                        });


                        AttemptService.getPassedAttempt(parseInt($rootScope.allocationId)).then(function (response) {
                            if (response.query_status == "success") {
                                $scope.scorePrecentage = response.data.score_percentage;

                                if($state.passPrecentage == 0){
                                    $state.passPrecentage = response.data.score_percentage;
                                }
                                console.log(response.data);
                                if($state.passPrecentage != $scope.scorePrecentage ){
                                    AttemptService.getAttemptByAllocationId(parseInt($rootScope.allocationId)).then(function (response) {
                                        if (response.query_status == "success") {
                                            $scope.attemptCount = 0;
                                            angular.forEach(response.data, function (e, i) {
                                                if (e.status == 2) {
                                                    $scope.attemptCount += 1;
                                                }
                                            })
                                            AttemptService.getAttemptLimit(parseInt($rootScope.allocationId)).then(function (response) {
                                                if (response.query_status == "success") {
                                                    if ($scope.attemptCount >= response.data.max_number_of_attempts) { // max number of attempt exceeded error message
                                                        swal("Failed!", "Your lesson attempts have been exceeded", "error");
                                                    } else {
                                                        $scope.startNewAttempt();
                                                    }
                                                }
                                            }, function (error) {
                                                console.log("ERROR : Loading attempt limit by allocation id.");
                                                console.log(response.message);
                                            });
                                        }
                                    }, function (error) {
                                        console.log("ERROR : Loading allocation by allocation id.");
                                        console.log(response.message);
                                    });

                                }else{
                                    swal("Failed!", "You have already passed this lesson please try another.", "error");
                                }

                            }

                        }, function (error) {
                            console.log("ERROR : Loading attempt limit by allocation id.");
                            console.log(response.message);
                        });
                    }
                    else if ($scope.myAttemptStatus == 3) { // if child already watch video then redirect to lesson
                        if ($stateParams.bundleId != undefined) {
                            $state.go('child.lessonBundleLesson', {
                                quizid: parseInt($stateParams.quizid),
                                attemptid: response.data.id,
                                bundleId: $stateParams.bundleId
                            });
                        } else {
                            $state.go('child.lesson', {
                                quizid: parseInt($stateParams.quizid),
                                attemptid: response.data.id
                            });
                        }
                    }
                }

            }, function (error) {
                $scope.startNewAttempt();
                //console.log("ERROR : Loading Last Attempt for user By Quiz.");
                //console.log(response.message);
            });
        }

        //watch video
        $scope.watchVideoInit = function () {
            //get last attempt details by quiz id
            AttemptService.getLastAttempt(parseInt($stateParams.quizid)).then(function (response) {
                $scope.watchedVideo = false;
                if (response.query_status == "success") {
                    $scope.myAttempts = response.data;
                    $scope.myAttemptStatus = response.data.status;
                    $scope.hasAttemptToFinish = false;
                    $scope.attemptIdToFinish = 0;
                    $scope.finishedAttempt = false;

                    if ($scope.myAttemptStatus == 0) {
                        LessonService.getLessonByQuizId(parseInt($stateParams.quizid)).then(function (response) {
                            if (response.query_status == "success") {
                                $scope.validQuiz = true;
                                if (response.data) {
                                    $scope.quiz = response.data;
                                    var videoFrame = VideoService.generatePlayer(response.data.video_id, response.data.video_ref);
                                    $scope.videoIframe = $sce.trustAsHtml(videoFrame);
                                    $scope.hasAttemptToFinish = false;
                                    $scope.resources.stillLoading = false;
                                } else {
                                    $scope.resources.stillLoading = false;
                                }
                            }
                        });

                        $scope.videoWatchSatatus = 3;
                        AttemptService.updateStatus($stateParams.attemptid, $scope.videoWatchSatatus).then(function (response) {

                        }, function (error) {

                        });
                    } else if ($scope.myAttemptStatus == 3) {
                        if ($stateParams.bundleId != undefined) {
                            $state.go('child.lessonBundleLesson', {
                                quizid: parseInt($stateParams.quizid),
                                attemptid: $stateParams.attemptid,
                                bundleId: $stateParams.bundleId
                            });
                        }else {
                            $state.go('child.lesson', {
                                quizid: parseInt($stateParams.quizid),
                                attemptid: $stateParams.attemptid
                            });
                        }
                        console.log("watched video - start quiz")
                    }
                    $scope.resources.stillLoadingMyAttempts = false;
                }
            }, function (error) {

            });

        };

        $scope.startQuiz = function () {

            swal({
                title: "Are you sure you want to start the quiz?",
                text: "You cannot go back and see the video after start the quiz",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                closeOnConfirm: true,
                showLoaderOnConfirm: true
            }, function (res) {
                if (res) {
                    if ($stateParams.bundleId != undefined) {
                        $state.go('child.lessonBundleLesson', {
                            quizid: parseInt($stateParams.quizid),
                            attemptid: $stateParams.attemptid,
                            bundleId: $stateParams.bundleId
                        });
                    }else {
                        $state.go('child.lesson', {
                            quizid: parseInt($stateParams.quizid),
                            attemptid: $stateParams.attemptid
                        });
                    }
                }
            });

        };

        $scope.$watch('resources.currentQuestionIndex', function () {
            if ($scope.questions) {
                $scope.resources.currentQuestion = $scope.questions[$scope.resources.currentQuestionIndex];
            }
        });

        //quiz previous button
        $scope.clickPreviousButton = function (index, quizCount, currentQues) {
            $scope.resources.currentQuestion = currentQues;
            console.log($scope.resources.currentQuestion);
            console.log($stateParams.attemptid);
            $scope.checkMissingAnswers();
            if (quizCount > index && index >= 0) {
                $scope.nextIndex = index;
                $scope.showQuestion = true;
            } else {
                swal({
                    title: "Are you sure you want to go back?",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    closeOnConfirm: true,
                    showLoaderOnConfirm: true
                }, function (res) {
                    if (res) {
                        $scope.videoWatchSatatus = 1;
                        AttemptService.updateStatus($stateParams.attemptid, $scope.videoWatchSatatus).then(function (response) {
                        }, function (error) {

                        });
                        $state.go("child.lessonDetails", {quizid: parseInt($stateParams.quizid)});
                    } else {
                        $state.go('child.lesson', {
                            quizid: parseInt($stateParams.quizid),
                            attemptid: $stateParams.attemptid
                        });
                    }
                });
            }
        }

        //quiz next button
        $scope.clickNextButton = function (index, quizCount, currentQues) {
            $scope.resources.currentQuestion = currentQues;
            console.log($scope.resources.currentQuestion);
            $scope.checkMissingAnswers();
            if (quizCount > index) {
                $scope.nextIndex = index;
                $scope.showQuestion = true;
            } else {
                $scope.quizSubmit = true;
            }
        }

        //quiz skip button
        $scope.clickSkipButton = function () {
            //console.log($stateParams);
            //$state.go('child.watchVideo', {quizid: parseInt($stateParams.quizid)});
        }

        var checkBundleView = function checkBundleView() {
            if ($stateParams.bundleId != undefined) {
                $scope.bundleId = $stateParams.bundleId;
            }
        };

        checkBundleView();

        /**
         * Back to lesson function
         */
        $scope.backToLessonBtnAction = function backToLessonBtnAction() {
            $scope.backToAllClicked = true;

            swal({
                title: "Are you sure you want to go back?",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                closeOnConfirm: true,
                showLoaderOnConfirm: true
            }, function (res) {
                if ($scope.answeredQuestionCount > 0) {
                    if (res) {
                        AttemptService.updateStatus($stateParams.attemptid, 2).then(function (response) {
                        }, function (error) {});
                    }
                }else {
                    if (res) {
                        AttemptService.updateStatus($stateParams.attemptid, 3).then(function (response) {
                        }, function (error) {});
                    }
                }
                if ($stateParams.bundleId != undefined) {
                    $state.transitionTo("child.lessonBundleLessonDetails",
                        {
                            quizid: parseInt($stateParams.quizid),
                            bundleId: $stateParams.bundleId
                        }, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                }else {
                    $state.transitionTo("child.lessonDetails", {quizid: parseInt($stateParams.quizid)}, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }

            });


        };

        function isEmptyObject(map) {
            for(var key in map) {
                if (map.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }
    }]);
})();
        