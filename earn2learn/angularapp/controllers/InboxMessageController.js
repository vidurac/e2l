(function () {
    'use strict';
    angularEarnToLearnControllers.controller('InboxMessageController', ['$scope', '$rootScope', '$state', '$sce', '$http', '$q', '$window', '$localStorage', 'UserService', '$stateParams','InboxMessageService','ngDialog','HouseService', function ($scope, $rootScope, $state, $sce, $http, $q, $window, $localStorage, UserService, $stateParams, InboxMessageService,ngDialog,HouseService) {

        // Message Model
        $scope.inboxMessageModel = {
            allMessages: [],
            newMessages: [],
            readMessages: [],
        }
        $scope.sendButtonText = "Send";
        $scope.selectedChildId = 0;
        // Define resources model
        $scope.resources = {
            stillLoading: true,
            searchMessageSubject: "",
            isSaving: false,
            newMessage: {
                receiver_id:0 ,
                subject: "",
                message: "",
                status: 0,
                type: 0,
            },
        }

        $scope.unreadMessageCount = [];

        // Initialize
        $scope.init = function () {
            $scope.resources.stillLoading = true;
            $scope.messageData = null;
            $scope.getAllMessages();
        }

        // Bind All Messages
        $scope.getAllMessages = function () {
            $scope.resources.stillLoading = true;

            InboxMessageService.getAllReceivedMessage().then(function (response) {
                if (response.query_status == 'success') {
                    $scope.allReceivedMessage = response.data;
                    $scope.loadingReceivedMessage = false;
                }
            }, function (error) {
                $scope.loadingReceivedMessage = true;
                $scope.allReceivedMessage = 0;
                console.log("ERROR : While loading message");
                console.log(error);
            });
        }


        // Create new message
        $scope.addNewMessage = function addNewMessage(data,receiver_id) {

            $scope.resources.isSaving = true;
            if (
                data.message == null ||
                data.message.trim() == "") {
                return;
            }
            data.receiver_id = receiver_id;
            UserService.getUserById(data.receiver_id).then(function (response) {
                if(response.data.role_id === 2 || response.data.role_id === 5){
                    console.log('child as a sender');
                    data.type = 0;
                }
                if(response.data.role_id === 3){
                    console.log('child as a receiver');
                    data.type = 1;
                }

                InboxMessageService.createMessage(data).then(function (response) {
                    if (response.query_status == "success") {
                        $scope.resources.sendButtonText = "Sent";
                        $scope.resources.isSaving = false;

                        UserService.getUserById(JSON.parse($localStorage.user).id).then(function (res) {
                            if(res.data.role_id==2 || res.data.role_id==5){
                                $scope.loadParentMessage(data.receiver_id);
                                $scope.resources.newMessage.message="";
                            }else if(res.data.role_id==3){
                                $scope.loadChildMessage(JSON.parse($localStorage.user).id);
                                $scope.resources.newMessage.message="";

                            }
                        });

                    }
                }, function (error) {
                    console.log(error);
                });

            });
        };


        // Load All House members
        $scope.loadHouseMembers = function () {

            $rootScope.loadingHouseMembers = true;
            UserService.getUsersMessages(JSON.parse($localStorage.user).house_id,JSON.parse($localStorage.user).id).then(function (data) {
                console.log(data);
                if (data.query_status = "success") {
                    $rootScope.loadingHouseMembers = false;
                    $scope.allHouseParticipants = data.data;
                    $rootScope.allHouseParticipants = data.data;
                } else {
                    // Error
                    console.log("Error : Failed to retrieve participants in house");
                    $rootScope.loadingHouseMembers = false;
                    $scope.allHouseParticipants = [];
                    $rootScope.allHouseParticipants = [];
                }
            }, function (e) {
                console.log("Error : Failed to retrieve participants in house");
                $rootScope.loadingHouseMembers = false;
                console.log(e);
                $scope.allHouseParticipants = [];
                $rootScope.allHouseParticipants = [];
            });
        }


        // Load inbox messages by child
        $scope.allInboxMessages = function (childId) {
            InboxMessageService.getAllReceivedMessageByChild(childId).then(function (response) {
                if (response.query_status = "success") {
                    $scope.allReceivedMessage = response.data;
                    $scope.loadingReceivedMessage = false;
                }
            }, function (e) {
                $scope.loadingReceivedMessage = true;
                $scope.allReceivedMessage = 0;
                console.log("Error : Failed to retrieve participants in house");
                $rootScope.loadingHouseMembers = false;
                console.log(e);
            });
        }

        // Load sent messages by child
        $scope.allSentMessages = function (childId) {
            InboxMessageService.getAllSentMessageByChild(childId).then(function (response) {
                console.log(response);
                if (response.query_status = "success") {
                    $scope.allReceivedMessage = response.data;
                    $scope.loadingReceivedMessage = false;
                }
            }, function (e) {
                $scope.loadingReceivedMessage = true;
                $scope.allReceivedMessage = 0;
                console.log("Error : Failed to retrieve participants in house");
                $rootScope.loadingHouseMembers = false;
                console.log(e);
            });
        }


        // Load child messages
        $scope.loadAllInboxMessage = function () {
            InboxMessageService.getAllReceivedMessage().then(function (response) {
                if (response.query_status = "success") {

                }
            }, function (e) {
                console.log("Error : Failed to retrieve participants in house");
                $rootScope.loadingHouseMembers = false;
                console.log(e);
            });
        }

        // Load child inbox messages
        $scope.childInboxMessages = function () {
            InboxMessageService.getChildReceivedMessage(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status = "success") {
                    $scope.allReceivedMessage = response.data;
                    $scope.loadingReceivedMessage = false;
                }
            }, function (e) {
                console.log("Error : Failed to retrieve participants in house");
                $rootScope.loadingHouseMembers = false;
                console.log(e);
            });
        }

        // Load child messages
        $scope.childSentMessages = function () {
            InboxMessageService.getChildSendMessage(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status = "success") {
                    $scope.allReceivedMessage = response.data;
                    $scope.loadingReceivedMessage = false;
                }
            }, function (e) {
                console.log("Error : Failed to retrieve participants in house");
                $rootScope.loadingHouseMembers = false;
                console.log(e);
            });
        }

        // Open Child
        $scope.readChildMessage = function (childId) {
            $scope.selectedChildId = childId;
            $scope.type = 1;
            $scope.quantity = 15;
            // loadChildMessage(0)

            InboxMessageService.getSentMessage(childId).then(function (response) {
                if (response.query_status = "success") {
                    $scope.allReceivedMessage = response.data;
                    UserService.getUserById(childId).then(function (response) {
                        if (response.query_status = "success") {
                            $scope.messageSender = response.data.f_name;
                        }},function () {
                    });
                }
            }, function (e) {
                console.log("Error : Failed to retrieve participants in house");
                $scope.allReceivedMessage = 0;
                console.log(e);
            });

            //send message
            InboxMessageService.getReceivedMessage(childId).then(function (response) {
                if (response.query_status = "success") {
                    $scope.allSendMessage = response.data;
                    $scope.loadingReceivedMessage = false;
                    $scope.messageReciver =  "Me ";
                }
            }, function (e) {
                console.log("Error : Failed to retrieve participants in house");
                $scope.allSendMessage = 0
                console.log(e);
            });
        }

        $scope.loadChildMessage = function loadChildMessage(childId) {

            $scope.quantity = 15;
            $scope.chilID='';

            //get all child messages

            HouseService.getHouseById(JSON.parse($localStorage.user).house_id).then(function (response) {
                $scope.parentName  = response.data.f_name;
                $scope.selectedParentId = response.data.user_id;
            });

            InboxMessageService.setMessageVisibility(JSON.parse($localStorage.user).id,$scope.chilID).then(function (response) {

                    if (response.query_status = "success") {
                        $scope.loadingMessage = false;
                    }
                }, function (e) {

            });



            InboxMessageService.getMessageByChildId(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status = "success") {
                    console.log(response);
                    $scope.allMessages  = response.data.data;
                    $scope.loadingMessage = false;
                }
            }, function (e) {
                console.log("Error : Failed to retrieve participants in house");
                $scope.allSendMessage = 0
                console.log(e);
            });
        }


        $scope.loadParentMessage = function loadParentMessage(childId) {
            $scope.quantity = 15;
            $scope.selectedChildId = childId
            InboxMessageService.setMessageVisibility(JSON.parse($localStorage.user).id,childId).then(function (response) {

                InboxMessageService.getParentMessageByChildId(childId).then(function (response) {
                    if (response.query_status = "success") {
                        $scope.allMessages  = response.data.data;
                        $scope.loadingMessage = false;
                    }
                }, function (e) {
                    console.log("Error : Failed to retrieve participants in house");
                    $scope.allSendMessage = 0

                });

            }, function (e) {
                InboxMessageService.getParentMessageByChildId(childId).then(function (response) {
                    if (response.query_status = "success") {
                        $scope.allMessages  = response.data.data;
                        $scope.loadingMessage = false;
                    }
                }, function (e) {
                    console.log("Error : Failed to retrieve participants in house");
                    $scope.allSendMessage = 0

                });
            });


        }

        $scope.loadEachChildMessage=function loadEachChildMessage(childId) {
            $scope.quantity = 15;
            $scope.selectedChildId = childId;
            InboxMessageService.setMessageVisibility(JSON.parse($localStorage.user).id,childId).then(function (response) {
                InboxMessageService.getParentMessageByChildId(childId).then(function (response) {
                    if (response.query_status = "success") {
                        $scope.allMessages  = response.data.data;
                        $scope.loadingMessage = false;
                        $scope.loadHouseMembers();
                    }
                }, function (e) {
                    console.log("Error : Failed to retrieve participants in house");
                    $scope.allSendMessage = 0
                    console.log(e);
                    $scope.allMessages  = [];
                    $scope.loadingMessage = false;
                });
            }, function (e) {
                $scope.allMessages  = [];
                $scope.loadingMessage = false;
                InboxMessageService.getParentMessageByChildId(childId).then(function (response) {
                    if (response.query_status = "success") {
                        $scope.allMessages  = response.data.data;
                        $scope.loadingMessage = false;
                        $scope.loadHouseMembers();
                    }
                }, function (e) {
                    console.log("Error : Failed to retrieve participants in house");
                    $scope.allSendMessage = 0
                    console.log(e);
                    $scope.allMessages  = [];
                    $scope.loadingMessage = false;
                }); 
            });



        }

        // Load child messages
        $scope.showAllMessages = function showAllMessages() {
            $scope.quantity = 100;
        }

    }]);



})();