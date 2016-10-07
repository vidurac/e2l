(function () {
    'use strict';
    angularEarnToLearnControllers.controller('BadgeController', ['$scope', '$rootScope', '$state', '$sce', '$http', '$q', '$window', '$localStorage', 'BadgeService', 'UserService', '$stateParams', 'Upload', 'cfpLoadingBar', 'BadgeAssignService', 'ngDialog', 'CategoryService', 'VideoService', function ($scope, $rootScope, $state, $sce, $http, $q, $window, $localStorage, BadgeService, UserService, $stateParams, Upload, cfpLoadingBar, BadgeAssignService, ngDialog, CategoryService, VideoService) {

        // Badge Model
        $scope.badgeModel = {
            allBadge: [],
            system: [],
            allCustomBadge: [],
            badgeTypes: [],
            badgeLessons: [],
            allCategories: [],
            myLessons : [],
            allCategoriesObj : {},
            subCategories : {},
            badgeStatus:'',
            badgeCat:'all'
        }
        // $scope.badgeCat='No';
        $scope.credentials = {};
        $scope.systemBadgeTypeId = 1;
        $scope.childBadgeType = 0;
        // Resources
        // Define resources model
        $scope.resources = {
            stillLoading: true,
            loadingBadges: false,
            badgeAssignHouse: {},
            selectedTypeId: 0,
            addForSelectedType: false,
            searchBadgeName: "",
            addBadgeButtonText: "Add Badge",
            addForSelectedCatedory: false,
            isSaving: false,
            newBadge: {
                name: "",
                description: "",
                badge_types_id: 0,
                badge_image: "",
                points: 0,
                enable: 1,
                badgeCategory: "",
                badgeSubCategory: "",
                badgeLessons: 0,
            },
        }

        $scope.isValidImageFormat = false;
        $scope.showUploadImage = false;
        $scope.updateImage = false;

        if ($stateParams.catId) {
            $scope.resources.addForSelectedCatedory = true;
            $scope.resources.selectedCategory_id = $stateParams.catId;
            $scope.resources.newVideo.category_id = $stateParams.catId;
        }

        // Initialize
        $scope.init = function () {
            $scope.resources.stillLoading = true;
            $scope.badgeData = null;
            $rootScope.badgeData = null;
            $scope.getAllBadgeType();
            $scope.getAllBadges();
            $scope.loadAllCategories();
            $scope.getHouseMembers();
        }

        // Bind All Badge type
        $scope.getAllBadgeType = function () {
            $scope.resources.stillLoading = true;

            BadgeService.getAllBadgeType().then(function (response) {
                if (response.query_status == 'success') {
                    $scope.badgeModel.badgeTypes = response.data;
                }
            }, function (error) {
                console.log("ERROR : While loading badge type");
                console.log(error);
            });
        }

        // Bind All Badges
        $scope.getAllBadges = function () {
            $scope.resources.stillLoading = true;
            BadgeService.getAllBadges().then(function (response) {
                if (response.query_status == 'success') {
                    console.log(response.data);
                    $scope.badgeModel.allBadge = response.data;
                    $scope.badgeModel.tempAllBadge = response.data;
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                $scope.resources.stillLoading = false;
                console.log("ERROR : While loading all badges");
                console.log(error);
            });
        }

        $scope.getFilteredList = function (typeId, isMain) {

            $scope.badgeModel.badgeStatus="";
            $scope.getBadgeCat(typeId);
            // //
            $scope.FilteredIdList = [];
            if($scope.badgeModel.tempAllBadge==undefined){

                $scope.badgeModel.allBadge = [];
            }else{

                $scope.badgeModel.allBadge = $scope.badgeModel.tempAllBadge;
            }
            console.log($scope.badgeModel.tempAllBadge)
            if (typeId == null) {
                delete $scope.FilteredIdList;
                // delete $scope.searchBadgeName;
            }
            if (isMain && typeId != null) {
                angular.forEach($scope.badgeModel.badgeTypes, function (e) {
                    $scope.FilteredIdList.push(e.id);
                });
            } else if(typeId != null) {
                console.log(typeId);
                $scope.FilteredIdList.push(typeId);
            }

        }

        $scope.getFilteredListAdmin = function getFilteredListAdmin(typeId, isMain) {
            $scope.getBadgeCat(typeId);
            $scope.FilteredIdList = [];
            $scope.badgeModel.allBadge = $scope.badgeModel.tempAllBadge;
            if (typeId == null) {
                delete $scope.FilteredIdList;
            }
            if (isMain && typeId != null) {
                angular.forEach($scope.badgeModel.badgeTypes, function (e) {
                    $scope.FilteredIdList.push(e.id);
                });
            } else if(typeId != null) {
                $scope.FilteredIdList.push(typeId);
            }
        }
        $scope.resetFilters = function()
        {
            // $scope.filterUser.type = 'all';
            delete $scope.FilteredIdList;
            $scope.searchBadgeName = "";
            $scope.badgeStatus='';
            $scope.badgeCat='all'
        }
        $scope.getBadgeCat=function(typeId){
            if(typeId=='1'){
                $scope.badgeModel.badgeCat="system"
            }else if(typeId=='2'){
                $scope.badgeModel.badgeCat="custom"

            }else{
                $scope.badgeModel.badgeCat="all"
            }
        }
        // Badge filter By type id
        $scope.filterByType = function (badge) {
            if (!$scope.FilteredIdList) {
                return true;
            }
            return ($scope.FilteredIdList.indexOf(badge.badge_types_id) !== -1);
        }

        // Bind All Badges
        $scope.getBadgesByTypeId = function (typeId) {
            $scope.resources.stillLoading = true;
            $scope.myBadgeIds = [];

            BadgeService.getBadgesByTypeId(typeId).then(function (response) {
                if (response.query_status == 'success') {
                    $scope.badgeModel.allBadge = response.data;
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : While loading badges by type");
                console.log(error);
            });
        }

        // Bind All Badges by user in parent section
        $scope.loadUserCreatedBadge = function () {
            $scope.resources.stillLoading = true;
            $scope.getAllBadgeType();
            $scope.getHouseMembers();
            $scope.parentBadge=[];
            //load badge by id
            BadgeService.getBadgesByTypeId($scope.systemBadgeTypeId).then(function (response) {
                if (response.query_status == 'success') {
                    $scope.badgeModel.allBadge = response.data;
                    BadgeService.getBadgesByUser().then(function (response) {
                        console.log(response);
                        if (response.query_status == 'success') {
                            $scope.parentBadge = response.data;
                            $scope.badgeModel.allBadge = $scope.badgeModel.allBadge.concat($scope.parentBadge);
                            $scope.badgeModel.tempAllBadge = $scope.badgeModel.allBadge;
                            $scope.resources.stillLoading = false;
                        }
                    }, function (error) {
                        //if(response.data == null){
                        $scope.badgeModel.allBadge;
                        $scope.badgeModel.tempAllBadge = $scope.badgeModel.allBadge;
                        //}
                        console.log("badge data error");
                        $scope.resources.stillLoading = false;

                    });
                }
            }, function (error) {
                BadgeService.getBadgesByUser().then(function (response) {
                    if (response.query_status == 'success') {
                        $scope.badgeModel.tempAllBadge = response.data
                        $scope.badgeModel.allBadge = $scope.badgeModel.allBadge.concat(response.data);
                        $scope.resources.stillLoading = false;
                    }
                }, function (error) {
                    console.log("ERROR : While loading custom badges");
                    console.log(error);
                });
                $scope.resources.stillLoading = false;
                console.log("ERROR : While loading badges by type");
                console.log(error);
            });
        }

        // Create new badge
        $scope.addNewBadge = function addNewBadge(data) {

            if (
                data.name == null ||
                 data.name.trim() == "" ||
                data.description == null ||
                data.description.trim() == "") {
                swal("Error!", "Please fill required fields", "error");
                $scope.resources.isSaving = false;
                return;
            }

            if(data.badgeLessons == 0)
            {
                swal("Error!", "Please select at least one Lesson", "error");
                $scope.resources.isSaving = false;
                return;
            }
            console.log(data.badgeLessons);
            console.log("befor");
            if(data.badgeLessons != 0)
            {
                var tempSelectionLesson = [];
                angular.forEach(data.badgeLessons, function (e ,i) {
                    if(e){
                        tempSelectionLesson[i] = true;
                    }

                });
                data.badgeLessons = $scope.toObject(tempSelectionLesson);
                if(tempSelectionLesson.length == 0){
                    swal("Error!", "Please select at least one Lesson", "error");
                    $scope.resources.isSaving = false;
                    return;
                }

            }
            console.log(data.badgeLessons);
            $scope.resources.isSaving = true;
            BadgeService.createBadge(data).then(function (response) {
                if (response.query_status == "success") {
                    $scope.upload(data.badge_image, response.data.id);
                    swal({
                        title: "Success!",
                                text: "You have successfully add badge.",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Ok",
                                closeOnConfirm: true,
                                showLoaderOnConfirm: false
                            }, function (res) {
                                if (res) {
                                    if (JSON.parse($localStorage.user).role_id == 1) {
                                        $state.go("admin.badges");
                                    } else if (response.data.badge_types_id == 2 && JSON.parse($localStorage.user).role_id == 2) {
                                        $state.go("parent.badges");
                                    }
                                }
                            });
                        }
                        if (response.query_status == "error") {
                            $scope.resources.isSaving = false;
                            swal("Error!", response.message, "error");
                        }
                    }, function (error) {
                        console.log(error);
                    });


        };

        $scope.toObject = function toObject(arr) {
            var rv = {};
            for (var i = 0; i < arr.length; ++i)
                rv[i] = arr[i];
            return rv;
        }


        // check upload image type
        $scope.uploadFileValidate = function (picFile) {
            if (picFile == null) {
                swal("Error!", "Please add correct image type.", "error");
                //location.reload();
            } else {
                $scope.isValidImageFormat = true;
                $scope.showUploadImage = true;
            }
        };

        // upload on file select or drop
        $scope.upload = function (badge_image, id) {
            if (id == 0) {
                return;
            }
            $scope.uploadImageBtnTxt = "Uploading...";
            $scope.uploading = true;
            BadgeService.changeBadgeImage(badge_image, id, function (uploadSize) {
            }).then(function (response) {
                if (response.data.query_status == "success") {
                    $scope.uploadImageBtnTxt = "Uploaded";
                    $scope.uploading = false;
                    /*//swal("Success!", "You have successfully uploaded badge image.", "success");
                    location.reload();*/
                } else {
                    $scope.uploadImageBtnTxt = "Upload";
                    $scope.uploading = false;
                    swal("Error!", "Failed to uploaded badge image.", "error");
                }
            }, function (error) {
                $scope.uploadImageBtnTxt = "Upload";
                $scope.uploading = false;
                swal("Error!", "Failed to uploaded badge image.", "error");
            });
        };


        //edit badge section
        $scope.editBadge = function (badge) {
            console.log(JSON.parse($localStorage.user));
            $scope.resources.stillLoading = true;
            if (badge != null) {
                if (JSON.parse($localStorage.user).role_id == 1) {
                    $scope.resources.newBadge = badge;
                    $state.go("admin.updateBadge", {id: badge.id});
                } else if (badge.badge_types_id == 2 && JSON.parse($localStorage.user).role_id == 2) {
                    $scope.resources.newBadge = badge;
                    $state.go("parent.updateBadge", {id: badge.id});
                }
            }
        }

        // Create edit badge
        $scope.loadEditBadge = function () {
            $scope.badgeId = $stateParams.id;
            $scope.resources.isSaving = false;
            $scope.resources.addBadgeButtonText = "Update";
            BadgeService.getBadgeById($scope.badgeId).then(function (response) {
                if (response.query_status == "success") {
                    $scope.badgeData = response.data;
                    BadgeService.getBadgeLessons($scope.badgeId).then(function (response) {
                        if (response.query_status == "success") {
                            var tempSelection = {};
                            angular.forEach(response.data, function (e) {
                                tempSelection[e.id] = true;
                            });
                            $scope.updateBadgeData.badgeLessons = tempSelection;
                        }
                    }, function (error) {
                        console.log(error);
                    });
                    $scope.loadLessons($scope.badgeData.category_id);
                    $scope.updateBadgeData = angular.copy($scope.badgeData);
                }
            }, function (error) {
                console.log(error);
            });
        };

        //update badge details
        $scope.updateBadge = function (data) {
            swal({
                title: "Are you sure?",
                text: "Are you sure you want to update this badge?",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, do it!",
                closeOnConfirm: true,
                showLoaderOnConfirm: true
            }, function (res) {
                if (res) {
                if (
                    data.name == null ||
                    data.name.trim() == "" ||
                    data.description == null ||
                    data.description.trim() == "") {
                    return;
                }
                    BadgeService.getBadgeById(data.id).then(function (response) {
                        if (response.query_status == 'success') {
                            $scope.badge = response.data;
                            BadgeService.isExisted(data.name).then(function (response) {
                                if (response.query_status == "success" && response.data_count <= 1) {
                                    $scope.badgeId = $stateParams.id;
                                    $scope.resources.isSaving = true;
                                    $scope.resources.addBadgeButtonText = "Updating";

                                    BadgeService.updateBadge($scope.badgeId, data).then(function (response) {
                                        if (response.query_status == "success") {
                                            if (!angular.equals(data.badge_image, $scope.badge.badge_image)) {
                                                $scope.upload(data.badge_image, $scope.badgeId);
                                            }
                                                swal({
                                                    title: "Success!",
                                                    text: "You have successfully update badge.",
                                                    type: "success",
                                                    showCancelButton: false,
                                                    confirmButtonColor: "#DD6B55",
                                                    confirmButtonText: "Ok",
                                                    closeOnConfirm: true,
                                                    showLoaderOnConfirm: false
                                                }, function (res) {
                                                    if (res) {
                                                        if (JSON.parse($localStorage.user).role_id == 1) {
                                                            $state.go("admin.badges");
                                                        } else if (response.data.badge_types_id == 2 && JSON.parse($localStorage.user).role_id == 2) {
                                                            $state.go("parent.badges");
                                                        }
                                                    }
                                                });
                                        }
                                    }, function (error) {
                                        console.log(error);
                                    });
                                } else {
                                    swal("Error!", "Badge was already existed for given name.", "error");
                                    $scope.resources.isSaving = false;
                                    return;
                                }
                            }, function (error) {
                                console.log(error);
                            });

                        }}, function (error) {
                    console.log(error);
                });


            }else {
                    location.reload();
                }


                /*//get badge by id before update
                BadgeService.getBadgeById(data.id).then(function (response) {
                    if (response.query_status == 'success') {
                        $scope.badge = response.data;

                        //if ($scope.badge.points != data.points) {
                            //check badge point existed

                        //} else {
                            $scope.badgeId = $stateParams.id;
                            $scope.resources.addBadgeButtonText = "Updating";
                            BadgeService.updateBadge($scope.badgeId, data).then(function (response) {
                                if (response.query_status == "success") {
                                    if (!angular.equals(data.badge_image, $scope.badge.badge_image)) {
                                        $scope.upload(data.badge_image, $scope.badgeId);
                                    }
                                    $scope.resources.addBadgeButtonText = "Update";
                                    $scope.resources.isSaving = false;

                                    swal({
                                        title: "Success!",
                                        text: "You have successfully updated badge.",
                                        type: "success",
                                        showCancelButton: false,
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "Ok",
                                        closeOnConfirm: true,
                                        showLoaderOnConfirm: false
                                    }, function (res) {
                                        if (res) {
                                            if (JSON.parse($localStorage.user).role_id == 1) {
                                                $state.go("admin.badges");
                                            } else if (response.data.badge_types_id == 2 && JSON.parse($localStorage.user).role_id == 2) {
                                                $state.go("parent.badges");
                                            }
                                        }
                                    });
                                }
                            }, function (error) {
                                console.log(error);
                            });
                       // }
                    }
                }, function (error) {
                    console.log(error);
                });*/
            });
        };


        // Open Child custom badge assign popup
        $scope.childAssignPopup = function (badgeId) {
            ngDialog.open({
                template: 'assignChildToBadge',
                backdrop: 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default',
                controller: childAssignPopupCtrl,
            });

            childAssignPopupCtrl.$inject = ['$scope', '$rootScope', 'UserService', 'BadgeAssignService', '$localStorage', 'HouseService'];

            function childAssignPopupCtrl($scope, $rootScope, UserService, BadgeAssignService, $localStorage, HouseService) {
                $scope.loadingHouseMembers = $rootScope.loadingHouseMembers;
                $scope.loadingAssignedMembers = true;
                $scope.assignedMembers = [];
                $scope.assignedMembersAllocationData = {};

                HouseService.getChildrenByHouseId(JSON.parse($localStorage.user).house_id).then(function (response) {
                    if (response.query_status == "success") {
                        BadgeAssignService.getChildrenByBadgeId(badgeId).then(function (response) {
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
                        BadgeAssignService.assignBadge(childId, badgeId).then(function (response) {
                            $scope.assignedMembers.push(childId);
                            $scope.assignedMembersAllocationData[parseInt(childId)] = response.data.id;
                        }, function (error) {
                            console.log("ERROR : While assign member to badge.");
                            console.log(error);
                        });
                    } else {
                        var index = $scope.assignedMembers.indexOf(childId);
                        var childId = $scope.assignedMembersAllocationData[childId];
                        BadgeAssignService.removeAssignBadge(childId, badgeId).then(function (data) {
                            console.log(data);
                            $scope.assignedMembers.splice(index, 1);
                            delete $scope.assignedMembersAllocationData[childId];
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
            $rootScope.loadingHouseMembers = true;
            if(JSON.parse($localStorage.user).role_id == 2){

                UserService.getUsersByHouseId(JSON.parse($localStorage.user).house_id).then(function (data) {
                    if (data.query_status = "success") {
                        $rootScope.loadingHouseMembers = false;
                        $scope.allHouseParticipants = data.data;
                        $rootScope.allHouseParticipants = data.data;
                        if ($rootScope.allHouseParticipants.length) {
                            $scope.loadChidAchieveBadges($rootScope.allHouseParticipants[0].id);
                        }
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

        // Bind All assign Badges by user in parent section
        $scope.loadChildAssignedBadges = function (childId) {
            if ($scope.selectedMember == childId) {
                return;
            }
            $scope.selectedMember = childId;
            $scope.loadingChildAssignedBadges = true;
            BadgeAssignService.getChildAssignBadges(childId).then(function (response) {
                if (response.query_status == "success") {
                    $scope.childBadges = response.data;
                    $scope.loadingChildAssignedBadges = false;
                } else {
                    console.log("ERROR : Failed to load child assigned data");
                    console.log(response);
                    $scope.childBadges = [];
                    $scope.loadingChildAssignedBadges = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load child assigned data");
                console.log(error);
                $scope.childBadges = [];
                $scope.loadingChildAssignedBadges = false;
            });
        }

        //child
        $scope.loadChidAchieveBadges = function (childId) {
            console.log(childId);
            $scope.childBadges = [];
            $scope.selectedMember = childId;
            $scope.loadingChildAssignedBadges = true;
            UserService.getRewardsByChild(childId).then(function (response) {
                if (response.query_status == "success") {
                    $scope.child_total_points = response.data.total_points;
                    BadgeService.getChildAchieveBadges(childId).then(function (response) {
                        if (response.query_status == "success") {
                            $scope.childBadges = [];
                            $scope.childBadges = response.data;
                            console.log($scope.childBadges.length);
                            $scope.loadingChildAssignedBadges = false;
                        } else {
                            console.log("ERROR : Failed to load child assigned data");
                            console.log(response);
                            $scope.childBadges = [];
                            $scope.loadingChildAssignedBadges = false;
                        }
                    }, function (error) {
                        $scope.childBadges = [];
                        console.log("ERROR : Failed to load child assigned data");
                        console.log(response);
                        $scope.loadingChildAssignedBadges = false;
                    });
                    //
                } else {
                    $scope.child_total_points = 0;
                }
            }, function (error) {
                $scope.child_total_points = 0;
            });
        };


        //delete badge
        $scope.deleteBadge = function (badge) {
            $scope.loadingChildAssignedBadges = true;

            swal({
                title: "Delete Badge.",
                text: "Would you like delete badge?",
                type: "error",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ok",
                closeOnConfirm: true,
                showLoaderOnConfirm: true
            }, function (res) {
                if (res) {
                    BadgeService.deleteBadge(badge).then(function (response) {
                        if (response.query_status == "success") {
                            swal("Success!", "You have successfully deleted badge.", "success");
                        } else {
                            swal("Failed !", "You can't delete this badge.", "error");
                            location.reload();
                        }
                    }, function (error) {
                        console.log("ERROR : Failed to load data");
                        console.log(error);
                    });
                } else {
                    location.reload();
                }
            });
        }


        //load lesson category
        $scope.loadLessonCategory = function loadLessonCategory() {
            CategoryService.getMainCategories().then(function (response) {
                if (response.query_status == "success") {
                    $scope.categoryList = response.data;
                }
            });
        }

        //load sub category by selected category
        $scope.loadLessonSubCategory = function loadLessonSubCategory(category) {
            CategoryService.getSubItemsByCategoryId(category).then(function (response) {
                if (response.query_status == "success") {
                    console.log(response.data);
                    $scope.subCategoryList = response.data.subcategory;
                }
            });
        }

        //load lessons by selected subcategory
        $scope.loadLessons = function loadLessons(subCategory) {
            console.log(JSON.parse($localStorage.user));
            VideoService.getVideoByCategoryId(subCategory).then(function (response) {
                if (response.query_status == "success") {

                    $scope.data_arr = [];
                    angular.forEach(response.data, function (e) {

                        if(JSON.parse($localStorage.user).role_id == 1)
                        {
                            if(e.visibility == "public")
                            {
                                $scope.data_arr.push(e);
                            } 
                        }
                        if(JSON.parse($localStorage.user).role_id == 2)
                        {
                            if(e.visibility == "public" || e.user_id == JSON.parse($localStorage.user).id)
                            {
                                $scope.data_arr.push(e);
                            } 
                        }
                                               
                    });

                    $scope.categoryLessons = true;
                    $scope.lessonList = $scope.data_arr ;
                    
                }
            }, function(e) {
                $scope.lessonList = [];
                $scope.categoryLessons = false;
            });
        }

        // Load All categories
        $scope.loadAllCategories = function loadAllCategories() {
            $scope.allCategoriesLoading = true;
            CategoryService.getAllCategories().then(function(data) {
                if (data.query_status == "success") {
                    angular.forEach(data.data, function (e, i) {
                        $scope.badgeModel.allCategoriesObj[e.id] = e;
                        if (e.parent_cat_id != 0) {
                            if (!$scope.badgeModel.subCategories[e.parent_cat_id]) {
                                $scope.badgeModel.subCategories[e.parent_cat_id] = [];
                            }
                            $scope.badgeModel.subCategories[e.parent_cat_id].push(e);
                        }
                    });
                    $scope.badgeModel.allCategories = data.data;
                    $scope.allCategoriesLoading = false;
                }
                else {
                    $scope.badgeModel.allCategories = [];
                    $scope.allCategoriesLoading = false;
                }
            }, function(e) {
                $scope.badgeModel.allCategories = [];
                $scope.allCategoriesLoading = false;
            });
        }

        $scope.setFilterType = function setFilterType(value) {
            $scope.childBadgeType = value;
        }

        $scope.getChildBadge = function getChildBadge(childId , value) {
            $scope.badgeModel.badgeCat="";
            (value=='1')?$scope.badgeModel.badgeStatus="achived":$scope.badgeModel.badgeStatus="assigned";
            $scope.FilteredIdList = undefined;
            if( childId!= null && value != null && value != 0 ){
                BadgeService.getBadgesByChild(childId ,value ).then(function (response) {
                    if (response.query_status == 'success') {
                        $scope.badgeModel.allBadge = response.data;

                        $scope.resources.stillLoading = false;
                    }
                }, function (error) {
                    console.log(error.data)
                    console.log("ERROR : While loading all badges");
                    if(error.data.data==null)
                        $scope.badgeModel.allBadge =[] ;

                    console.log(error);
                });
            }else{
                $scope.getAllBadges();
            }
        }


        $scope.showDescription = function showDescription (badgeId) {
            ngDialog.open({
                template: 'badgeDescription',
                backdrop: 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default',
                controller: childAssignPopupCtrl,
            });

            childAssignPopupCtrl.$inject = ['$scope','BadgeService'];

            function childAssignPopupCtrl($scope) {
                BadgeService.getBadgeById(badgeId).then(function (response) {
                    if (response.query_status == "success") {
                        $scope.badge = response.data;
                    }
                }, function (error) {
                    console.log(error);
                });

            }
        }

        $scope.getBadgeLessons = function getBadgeLessons(badgeId) {
            BadgeService.getBadgeLessonsByBadgeId(badgeId).then(function (response) {
                if (response.query_status == 'success') {
                    //console.log(response.data);
                    $scope.badgeModel.myLessons = response.data;
                    /* angular.forEach(response.data, function (e, i) {
                     $scope.badgeModel.myLessons.push[e];
                     });*/
                    console.log($scope.badgeModel.myLessons);
                    //$scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : While loading badge lesson datas");
                console.log(error);
            });

        }

        $scope.loadChildAchievedBadges = function loadChildAchievedBadges() {
            BadgeService.getAchievedBadgesByChildId(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status == 'success') {
                    console.log(response.data);
                    $scope.resources.stillLoading= false;
                    $scope.childAchievedBadges = response.data;
                }
            }, function (error) {
                console.log("ERROR : While loading child achieved badges");
                console.log(error);
            });

        }



    }]);

})();