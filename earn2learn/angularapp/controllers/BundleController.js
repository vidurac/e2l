(function () {
    'use strict';
    angularEarnToLearnControllers.controller('BundleController', ['$scope', '$rootScope', '$state', '$sce', '$http', '$q', '$window', '$localStorage', 'BundleService', 'VideoService', 'GiftcardService', 'UserService', '$stateParams', 'Upload', 'cfpLoadingBar', 'ngDialog','QuizService', function ($scope, $rootScope, $state, $sce, $http, $q, $window, $localStorage, BundleService, VideoService, GiftcardService,UserService, $stateParams, Upload, cfpLoadingBar, ngDialog,QuizService) {

        //Giftcard Model
        $scope.giftCardModel = {
            allGiftCards : [],
            giftCardValues : [5, 10, 15, 25, 50, 100, 150, 200, 250, 500],
            selectedGiftCardValue : 0
        }

        $scope.QuizModel = {}
        $scope.warning_message = '';

        // Bundle Model
        $scope.bundleModel = {
            allBundle: [],
            systemBundle: [],
            allCustomBundle: [],
            bundleTypes: [],
            bundleLesson:[],
            bundleGiftCard:[],
            bundleCard:[],
            giftCardValue: []
        }

        // Video Model
        $scope.VideoModel = {
            allVideos: []
        }

        //Giftcard Model
        $scope.GiftModel = {
            allGiftCards: []
        }

        $scope.credentials = {};
        $scope.systemBundleTypeId = 1;
        // Resources
        // Define resources model
        $scope.resources = {
            stillLoading: true,
            loadingBundles: false,
            bundleAssignHouse: {},
            selectedTypeId: 0,
            addForSelectedType: false,
            searchBundleName: "",
            addBundleButtonText: "Save",
            isSaving: false,
            newBundle: {
                name: "",
                avarage_marks :0,
                bundle_types_id: 0,
                dollor_amount: 0,
                points: 0,
                homegiftcards_id:0,
                bundleLesson:0,
                bundleCard:'',
                giftCardValue: []
            },
        }

        // Initialize
        $scope.init = function () {
            $scope.resources.stillLoading = true;
            $scope.bundleData = null;
            $rootScope.bundleData = null;
            $scope.getBundleTypes();
            $scope.getAllBundles();
        }

        // Initialize
        $scope.initForSponsor = function () {
            $scope.resources.stillLoading = true;
            $scope.bundleData = null;
            $rootScope.bundleData = null;
            $scope.getBundleTypes();
            $scope.getAllBundlesForSponsor();
        }

        $scope.UnselectGiftCards = function () {


            var data = angular.element('input');

            angular.forEach(data, function(value, key) {

                if(value.type==='radio' ){

                    console.log("hit");

                   angular.element(value).prop("checked", false);

                   $scope.updateBundleData.giftCardValue[0].cardId = '';
                   $scope.updateBundleData.giftCardValue[0].amount = '';
                } 
            });
        }

        $scope.UnselectGiftCardsForAdd = function () {


            var data = angular.element('input');

            angular.forEach(data, function(value, key) {

                if(value.type==='radio' ){

                    console.log("hit");

                   angular.element(value).prop("checked", false);

                   $scope.resources.newBundle.giftCardValue[0].cardId = '';
                   $scope.resources.newBundle.giftCardValue[0].amount = '';

                   $scope.resources.newBundle.giftCardValue = [];
                   //delete $scope.resources.newBundle.giftCardValue;
                } 
            });
        }



        // Bind All Bundle type
        $scope.getBundleTypes = function () {
            $scope.resources.stillLoading = true;

            BundleService.getAllBundleType().then(function (response) {
                if (response.query_status == 'success') {
                    $scope.bundleModel.bundleTypes = response.data;
                }
            }, function (error) {
                console.log("ERROR : While loading bundle type");
                console.log(error);
            });
        }

        // Bind All Bundle
        $scope.getAllBundles = function () {
            $scope.resources.stillLoading = true;
            BundleService.getAllBundles(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status == 'success') {
                    $scope.bundleModel.allBundle = response.data;
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : While loading all bundle");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }

        // All bundles can be accessible by sponsor
        $scope.getAllBundlesForSponsor = function () {
            $scope.resources.stillLoading = true;
            BundleService.getAllBundlesForSponsor().then(function (response) {
                if (response.query_status == 'success') {
                    $scope.bundleModel.allBundle = response.data;
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : While loading all bundle");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }

        $scope.quizFilter = function(quiz)
        {
            //console.log(quiz.user_id);

            /*if(quiz.visibility == "public" || quiz.user_id == JSON.parse($localStorage.user).id)
            {
                return true;
            }*/
            return true;
        }

        // Bind All quizes
        $scope.loadAllQuizes = function () {
            console.log('hit....');
            $scope.resources.stillLoading = true;
            $scope.resources.addBundleButtonText = "Save";
            $scope.resources.isSaving =  false;
            QuizService.getAllQuizes().then(function (response) {
                if (response.query_status == 'success') {
                    $scope.QuizModel.allQuizes = response.data;
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : While loading all quizes");
                console.log(error);
                $scope.resources.stillLoading = true;
            });
        }


        // Bind All quizes
        $scope.loadAllQuizesByBundle = function loadAllQuizesByBundle(id) {
            console.log('hit....');
            $scope.resources.stillLoading = true;
            $scope.resources.addBundleButtonText = "Save";
            $scope.resources.isSaving =  false;
            QuizService.getAllQuizesByBundleId(id).then(function (response) {
                if (response.query_status == 'success') {
                    $scope.QuizModel.allQuizes = response.data;
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : While loading all quizes");
                console.log(error);
                $scope.resources.stillLoading = true;
            });
        }

        // Bind All videos
        $scope.loadAllLesson = function () {
            $scope.resources.stillLoading = true;
            $scope.resources.addBundleButtonText = "Save";
            $scope.resources.isSaving =  false;
            VideoService.getAllVideos().then(function (response) {
                if (response.query_status == 'success') {
                    $scope.VideoModel.allVideos = response.data;
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : While loading all bundle");
                console.log(error);
                $scope.resources.stillLoading = true;
            });
        }

        // jsonDecodeStr
        $scope.jsonDecodeStr = function (str) {
            return JSON.parse(str);
        }

        // Bind All Gift cards
        $scope.loadAllGiftCards = function () {
            $scope.resources.stillLoading = true;
            /*GiftcardService.getAllGiftCardsFromAdmin().then(function (response) {
                if (response.query_status == 'success') {
                    console.log(response);
                    $scope.GiftModel.allGiftCards = response.data;
                    $scope.resources.addBundleButtonText = false;
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : While loading all bundle");
                console.log(error);
                $scope.resources.stillLoading = true;
            });*/

            //console.log('hit.....');
            GiftcardService.getAllGiftCards().then(function(response){
                if (response.query_status == "success") {
                    $scope.giftCardModel.allGiftCards = JSON.parse(response.data);
                    console.log(JSON.parse(response.data));
                    $scope.resources.stillLoading = false;
                }else{
                    console.log("ERROR : Failed to load all gift cards");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load all gift cards");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }


        // Bind House All Gift cards
        $scope.loadHouseGiftCards = function () {
            $scope.resources.stillLoading = true;
            GiftcardService.getHouseGiftCards(JSON.parse($localStorage.user).house_id).then(function (response) {
                if (response.query_status == 'success') {
                    console.log(response);
                    $scope.GiftModel.allGiftCards = response.data;
                    $scope.resources.addBundleButtonText = false;
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : While loading all bundle");
                console.log(error);
                $scope.resources.stillLoading = true;
            });
        }

        // Create new badge
        $scope.addNewBundle = function (data) {
            $scope.resources.isSaving = true;
             if (
             data.name == null ||
             data.name.trim() == "" ) {
             return;
             }
            
            

            if(data.bundleLesson == 0)
            {
                swal("Error!", "Please select at least one Lesson", "error");
                //
                $scope.resources.isSaving = false;
                return;
            }

            var lessons_exist = false;
            angular.forEach(data.bundleLesson, function (e) {
                if(e)
                {
                    lessons_exist = true;
                }                
            });

            if(!lessons_exist)
            {
                swal("Error!", "Please select at least one Lesson", "error");
                //
                $scope.resources.isSaving = false;
                return;
            }
             

            if(data.giftCardValue != undefined && data.giftCardValue.length == 1 &&  data.giftCardValue[0].amount == 0)
            {
                swal("Error!", "Please select gift card value.", "error");
                $scope.resources.isSaving = false;
                return;
            }        

            //console.log(data.bundleLesson);
            //return false;

             $scope.resources.addBundleButtonText = "Saving";
                 BundleService.createBundle(data).then(function (response) {
                     if (response.query_status == "success") {
                         swal("Success!", "You have successfully save bundle.", "success");
                         if(data.bundle_types_id == 1){
                             $state.go("admin.bundles");
                         }
                         if(data.bundle_types_id == 2){
                             $state.go("parent.bundles");
                         }
                     }
                     if (response.query_status == "error") {
                        $scope.resources.isSaving = false;
                        $scope.resources.addBundleButtonText = "Save";
                        swal("Error!", response.message, "error");
                     }
                }, 
                function (error) {
                    swal("Error!", "Failed to save bundle data.", "error");
                    $scope.resources.isSaving = false;
                
            });
        };


        $scope.getFilteredList = function (typeId, isMain) {
            $scope.FilteredIdList = [];
            if (typeId == null) {
                delete $scope.FilteredIdList;
            }
            if (isMain) {
                angular.forEach($scope.bundleModel.bundleTypes, function (e) {
                    $scope.FilteredIdList.push(e.id);
                });
            } else {
                $scope.FilteredIdList.push(typeId);
            }
        }

        // Bundle filter By type id
        $scope.filterByType = function (bundle) {
            if (!$scope.FilteredIdList) {
                return true;
            }
            return ($scope.FilteredIdList.indexOf(bundle.bundle_types_id) !== -1);
        }

        // get Bundle Completion
        $scope.getBundleCompletion = function (bundleId) {
            BundleService.getBundleCompletion(bundleId).then(function (response) {
                if (response.query_status == "success") {

                    if(response.allocations > 0)
                    {
                        $scope.warning_message = "Some Lessons of this bundle may be completed by child";
                    }
                }
            }, function (error) {
                console.log(error);
            });
        }

        // load edit bundle
        $scope.loadEditBundle = function (bundle) {
            $scope.bundleId = $stateParams.id;
            $scope.resources.isSaving = false;
            $scope.resources.addBundleButtonText = "Update";

            BundleService.getBundleById($scope.bundleId).then(function (response) {
                // console.log('bundle...............');
                // console.log(JSON.parse($localStorage.user).id);
                // console.log(response.data.user_id)
                // console.log('end..................');

                if (response.query_status == "success") {
                    var temp_bundle_lesson = [];

                    $scope.created_user_id = response.data.user_id;
                    $scope.logged_user_id = JSON.parse($localStorage.user).id;

                    $scope.loadAllQuizesByBundle($scope.bundleId);
                    BundleService.getBundleQuizzes($scope.bundleId).then(function (response) {
                         console.log('res');
                         console.log(response);
                        if (response.query_status == "success") {
                            var tempSelection = {};
                            angular.forEach(response.data, function (e) {
                                tempSelection[e.id]=true;
                                // angular.forEach(response.data, function (e, i) {
                                // $scope.bundleModel.bundleLesson= e.id;
                                // });
                            });
                            $scope.updateBundleData.bundleLesson = tempSelection;
                        }
                    }, function (error) {
                        console.log(error);
                    });

                    /*BundleService.getBundleLesson($scope.bundleId).then(function (response) {
                        // console.log('res');
                        // console.log(response);
                        if (response.query_status == "success") {
                            var tempSelection = {};
                            angular.forEach(response.data, function (e) {
                                tempSelection[e.id]=true;
                            // angular.forEach(response.data, function (e, i) {
                                // $scope.bundleModel.bundleLesson= e.id;
                            // });
                            });
                            $scope.updateBundleData.bundleLesson = tempSelection;
                        }
                    }, function (error) {
                        console.log(error);
                    });*/

                    // console.log('bundle_id:');
                    // console.log($scope.bundleId);
                    //load bundle gift cards
                    BundleService.getBundleGiftCard($scope.bundleId).then(function (response) {

                        if (response.query_status == "success") {

                            $scope.bundleModel.bundleGiftCardId = response.gift_card_id;
                            $scope.bundleModel.amount = response.amount;

                            $scope.updateBundleData.giftCardValue = [];
                            $scope.updateBundleData.giftCardValue.push({cardId: response.gift_card_id, amount: response.amount});

                            $scope.updateBundleData.bundleGiftCardId = response.gift_card_id;
                            $scope.updateBundleData.amount = response.amount;

                        }
                    }, function (error) {
                        console.log('service call hited error section');
                        console.log(error);
                    });

                    $scope.bundleData = response.data;
                    $scope.updateBundleData = angular.copy($scope.bundleData);
                }
            }, function (error) {
                console.log(error);
            });
        };

        //update bundle details
        $scope.updateBundle = function (data) {

            $scope.resources.isSaving = true;
            if (
                data.name == null ||
                data.name.trim() == "" ) {
                return;
            }
            //console.log(data.bundleLesson);
            //return false;
            var at_least_one_bundle_exist = 'no';
            if(data.bundleLesson != undefined)
            {   
                angular.forEach(data.bundleLesson, function (val, ind) {
                    if(val)
                    {
                        at_least_one_bundle_exist = 'yes';
                    }                    
                });
            }

            if(data.giftCardValue != undefined && data.giftCardValue[0].cardId != 0 && data.giftCardValue[0].amount == 0)
            {
                //if(data.giftCardValue[0].amount == 0)
                {
                    swal("Error!", "Please select gift card value.", "error");
                    $scope.resources.isSaving = false;
                    return false;
                }
            }  
            if(data.bundleLesson == undefined || data.bundleLesson == 0 || at_least_one_bundle_exist == 'no')
            {
                swal("Error!", "Please select at least one Lesson", "error");
                //
                $scope.resources.isSaving = false;
                return false;
            }          
            
            //return false;
                //console.log(data.giftCardValue[0].amount);
                //get bundle by id before update
                BundleService.getBundleById(data.id).then(function (response) {
                    if (response.query_status == 'success') {
                        $scope.resources.addBundleButtonText = "Updating";

                        BundleService.updateBundle(data.id , data ).then(function (response) {
                            if (response.query_status == 'success') {
                                swal("Success!", "You have successfully save bundle.", "success");
                                // location.reload();
                                $state.transitionTo('parent.bundles', {}, {
                                    reload: true,
                                    inherit: false,
                                    notify: true
                                });
                            }
                            //console.log('res :....');
                            //console.log(response);
                            if (response.query_status == 'error')
                            {
                                swal("Error!", response.message, "error");
                                $scope.resources.isSaving = false;
                            }
                        }, function (error) {
                            console.log(error);
                        });
                    }                    
                }, function (error) {
                    console.log(error);
                });
            

        };


        // Open Child bundle assign popup
        $scope.childAssignPopup = function (bundleId) {
            ngDialog.open({
                template: 'assignChildToBundle',
                backdrop: 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default',
                controller: childAssignPopupCtrl,
            });

            childAssignPopupCtrl.$inject = ['$scope', '$rootScope', 'UserService', 'BundleAssignService', '$localStorage', 'HouseService'];

            function childAssignPopupCtrl ($scope, $rootScope, UserService, BundleAssignService, $localStorage, HouseService) {
                // console.log('bid:');
                // console.log(bundleId);
                $scope.loadingHouseMembers = $rootScope.loadingHouseMembers;
                $scope.loadingAssignedMembers = true;
                $scope.assignedMembers = [];
                $scope.assignedMembersAllocationData = {};
                HouseService.getChildrenByHouseId(JSON.parse($localStorage.user).house_id).then(function (response) {
                    if (response.query_status == "success") {
                        BundleAssignService.getChildrenByBundleId(bundleId).then(function (response) {
                            if (response.query_status == "success") {
                                angular.forEach(response.data, function (val, ind) {
                                    console.log(val);
                                    if (val.enable == 1) {
                                        $scope.assignedMembers.push(parseInt(val.id));
                                        $scope.assignedMembersAllocationData[parseInt(val.id)] = val.id;
                                    }
                                });
                                $scope.loadingAssignedMembers = false;
                            } else {
                                console.log("ERROR : While loading Allocations By Quiz.");
                                console.log(response.message);
                                $scope.loadingAssignedMembers = false;
                            }
                        }, function (error) {
                            console.log("ERROR : While loading house children.");
                            console.log(error);
                            $scope.loadingAssignedMembers = false;
                        });
                        $scope.allHouseParticipants = response.data;
                    } else {
                        console.log("ERROR : While loading house children.");
                        console.log(response.message);
                        $scope.loadingAssignedMembers = false;
                    }
                }, function (error) {
                    console.log("ERROR : While loading house children.");
                    console.log(error);
                    $scope.loadingAssignedMembers = false;
                });
                $scope.allHouseParticipants = $rootScope.allHouseParticipants;

                // child Assign to badge
                $scope.childAssigToggle = function (childId, isAdd) {
                    // console.log('b id');
                    // console.log(bundleId);
                    if (isAdd) {
                        BundleAssignService.assignBundle(childId, bundleId).then(function (response) {
                            $scope.assignedMembers.push(childId);
                            $scope.assignedMembersAllocationData[parseInt(childId)] = response.data.id;
                        }, function (error) {
                            console.log("ERROR : While assign member to badge.");
                            console.log(error);
                        });
                    } else {
                        var index = $scope.assignedMembers.indexOf(childId);
                        // console.log("before " + childId);
                        var childId2 = $scope.assignedMembersAllocationData[childId];
                        // console.log("after " + childIdz);
                        BundleAssignService.removeAssignBundle(childId, bundleId).then(function (data) {
                            $scope.assignedMembers.splice(index, 1);
                            delete $scope.assignedMembersAllocationData[childId2];
                            console.log($scope.assignedMembersAllocationData);
                        }, function (error) {
                            console.log("ERROR : While unassign member from badge.");
                            console.log(error);
                        });
                    }
                }
            }
        }

        // Open Child bundle assign popup
        $scope.childAssignPopupForSponsor = function (bundleId, houseId) {

            $rootScope.tempHouseId = houseId;

            ngDialog.open({
                template: 'assignChildToBundle',
                backdrop: 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default',
                controller: childAssignPopupForSponsorCtrl,
            });

            childAssignPopupForSponsorCtrl.$inject = ['$scope', '$rootScope', 'UserService', 'BundleAssignService', '$localStorage', 'HouseService'];

            function childAssignPopupForSponsorCtrl ($scope, $rootScope, UserService, BundleAssignService, $localStorage, HouseService) {

                $scope.loadingHouseMembers = $rootScope.loadingHouseMembers;
                $scope.loadingAssignedMembers = true;
                $scope.assignedMembers = [];
                $scope.assignedMembersAllocationData = {};
                HouseService.getChildrenByHouseId($rootScope.tempHouseId).then(function (response) {
                    if (response.query_status == "success") {
                        BundleAssignService.getChildrenByBundleId(bundleId).then(function (response) {
                            if (response.query_status == "success") {
                                angular.forEach(response.data, function (val, ind) {
                                    console.log(val);
                                    if (val.enable == 1) {
                                        $scope.assignedMembers.push(parseInt(val.id));
                                        $scope.assignedMembersAllocationData[parseInt(val.id)] = val.id;
                                    }
                                });
                                $scope.loadingAssignedMembers = false;
                            } else {
                                console.log("ERROR : While loading Allocations By Quiz.");
                                console.log(response.message);
                                $scope.loadingAssignedMembers = false;
                            }
                        }, function (error) {
                            console.log("ERROR : While loading house children.");
                            console.log(error);
                            $scope.loadingAssignedMembers = false;
                        });
                        $scope.allHouseParticipants = response.data;
                    } else {
                        console.log("ERROR : While loading house children.");
                        console.log(response.message);
                        $scope.loadingAssignedMembers = false;
                    }
                }, function (error) {
                    console.log("ERROR : While loading house children.");
                    console.log(error);
                    $scope.loadingAssignedMembers = false;
                });
                $scope.allHouseParticipants = $rootScope.allHouseParticipants;

                // child Assign to badge
                $scope.childAssigToggle = function (childId, isAdd) {
                    if (isAdd) {
                        BundleAssignService.assignBundleAsObject(
                            {
                                childId    : childId,
                                bundleId     : bundleId,
                                status      : 1,
                                sponsor_id  : JSON.parse($localStorage.user).id
                            }
                        ).then(function (response) {
                            $scope.assignedMembers.push(childId);
                            $scope.assignedMembersAllocationData[parseInt(childId)] = response.data.id;
                        }, function (error) {
                            console.log("ERROR : While assign member to badge.");
                            console.log(error);
                        });
                    } else {
                        var index = $scope.assignedMembers.indexOf(childId);
                        var childId2 = $scope.assignedMembersAllocationData[childId];
                        BundleAssignService.removeAssignBundle(childId, bundleId).then(function (data) {
                            $scope.assignedMembers.splice(index, 1);
                            delete $scope.assignedMembersAllocationData[childId2];
                            console.log($scope.assignedMembersAllocationData);
                        }, function (error) {
                            console.log("ERROR : While unassign member from badge.");
                            console.log(error);
                        });
                    }
                }
            }
        }


        // Load All House members
        $scope.getHouseMembers = function () {
            //console.log(JSON.parse($localStorage.user).house_id);
            //$rootScope.loadingHouseMembers = true;
            UserService.getUsersByHouseId(JSON.parse($localStorage.user).house_id).then(function (data) {
                if (data.query_status = "success") {
                    $rootScope.loadingHouseMembers = false;
                    $scope.allHouseParticipants = data.data;
                    $rootScope.allHouseParticipants = data.data;
                } else {
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

        $scope.setGiftCardAmount = function setGiftCardAmount(cardId, value,image_url) {
            console.log('gift card image: ');
            console.log(image_url);
            //console.log(value);
            $scope.resources.newBundle.giftCardValue = [];
            $scope.resources.newBundle.giftCardValue.push({cardId: cardId, amount: value, image_url : image_url });
            
            //console.log($scope.resources.newBundle.giftCardValue)
        };

        $scope.setGiftCardAmountEdit = function setGiftCardAmountEdit(cardId, value, image_url) {
            console.log('gift card image url: ');
            console.log(image_url);
            //console.log(value);
            $scope.updateBundleData.giftCardValue = [];
            $scope.updateBundleData.giftCardValue.push({cardId: cardId, amount: value, image_url : image_url});
            //console.log($scope.resources.newBundle.giftCardValue)
        };

        $scope.deleteBundle = function (bundle) {
            // console.log('delete : ');
            // console.log(bundle.id);
            if(bundle.id > 0)
            {
                swal({
                    title: "Are you sure?",
                    text: "Are you sure to delete this bundle?",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, I want it!",
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function(confirmed) {
                    if(confirmed)
                    {
                        BundleService.deleteBundle(bundle).then(function (response) {
                            console.log(response.query_status);
                            if(response.query_status == "success")
                            {
                                swal("Success!", "You have successfully delete bundle.", "success");
                                location.reload();
                            }
                            if(response.query_status == "error")
                            {
                                swal("Error!", "This Bundle is already assigned.", "error");
                                location.reload();
                            }

                        }, function (error) {
                            swal("Error!", "This Bundle is already assigned.", "error");
                            //location.reload();

                            console.log("ERROR : While deleting bundle.");
                            console.log(error);
                        });
                    }
                })

                /*BundleService.deleteBundle(bundle).then(function (response) {
                    console.log(response.query_status);
                    if(response.query_status == "success")
                    {
                        swal("Success!", "You have successfully delete bundle.", "success");
                        location.reload();
                    }

                }, function (error) {
                    console.log("ERROR : While deleting bundle.");
                    console.log(error);
                });*/
            }
        }

    }]);

})();