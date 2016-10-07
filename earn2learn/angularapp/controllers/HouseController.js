(function() {'use strict';
    angularEarnToLearnControllers.controller('HouseController', ['$scope', '$rootScope', '$state', '$window', '$localStorage', '$sce', '$stateParams', '_URLS', 'AuthService', 'HouseService', 'LessonService', 'AUTH_EVENTS', 'cfpLoadingBar', function ($scope, $rootScope, $state, $window, $localStorage, $sce, $stateParams, _URLS, AuthService, HouseService, LessonService, AUTH_EVENTS, cfpLoadingBar) {
        
        // Init resources
        $scope.allHouses = [];
        $scope.resources = {
            updateHouseBtnText : "Update",
            currentTab : "members",
            stillLoading : true,
            stillLoadingLessons : true,
            stillLoadingHouseMembers : true
        };
        
        $scope.uploadImageBtnTxt = "Upload";
        $scope.subBtnTxt = "Update";
        $scope.isValidImageFormat = false;

        // Get unsafe html
        $scope.getUnsafeHtml = function(text) {
            return $sce.trustAsHtml(text);
        }
        
        // repeat nth time ng-repeat
        $scope.getNumber = function(num) {
            return new Array(num);   
        }
        
        // Get All Houses
        $scope.getAllHouses = function(){
            $scope.resources.stillLoading = true;
            HouseService.getHousesFullData().then(function (data) {
                if (data.query_status == "success") {
                    // Success
                    $scope.allHouses = data.data;
                    $scope.resources.stillLoading = false;
                }else{
                    // Error
                    $scope.resources.stillLoading = false;
                    console.log("Error : Failed to retrieve all houses.");
                    console.log(data.data);
                    $scope.allHouses = [];
                }
            }, function(e){
                // Error
                $scope.resources.stillLoading = false;
                console.log("Error : Failed to retrieve all houses.");
                console.log(e);
                $scope.allHouses = [];
            });
        }
        
        // Load House
        $scope.loadHouse = function () {
            $scope.resources.stillLoading = true;
            if ($state.current.name == "parent.house") {
                $scope.loadParentHouse();
                return;
            }
            if (!$stateParams.id) {
                $state.go("admin.houses");
            }
            $scope.house_id = parseInt($stateParams.id);
            HouseService.getHouseById($scope.house_id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.house = response.data;
                    
                    $scope.getHouseLessons($scope.house_id);
                    
                    $scope.updateHouseData = angular.copy(response.data);
                    $scope.resources.stillLoading = false;
                }else{
                    $scope.house = null;
                    console.log("ERROR : Failed To Load House Data.");
                    $scope.resources.stillLoading = false;
                    console.log(response.message);
                }
            }, function (error) {
                $scope.house = null;
                console.log("ERROR : Failed To Load House Data.");
                $scope.resources.stillLoading = false;
                console.log(error);
            });
        }
        
        // Load Parent House
        $scope.loadParentHouse = function () {
            $scope.resources.stillLoading = true;
            if (!JSON.parse($localStorage.user).house_id) {
                $state.go("admin.dashboard");
            }
            $scope.house_id = JSON.parse($localStorage.user).house_id;
            HouseService.getHouseById($scope.house_id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.house = response.data;
                    $scope.getHouseQuizes();
                    $scope.updateHouseData = angular.copy(response.data);
                    $scope.resources.stillLoading = false;
                }else{
                    $scope.house = null;
                    console.log("ERROR : Failed To Load House Data.");
                    $scope.resources.stillLoading = false;
                    console.log(response.message);
                }
            }, function (error) {
                $scope.house = null;
                console.log("ERROR : Failed To Load House Data.");
                $scope.resources.stillLoading = false;
                console.log(error);
            });
        }
        
        // Get House Assigned Quizes
        $scope.getHouseQuizes = function () {
            $scope.houseLessons = [];
            $scope.resources.stillLoadingLessons = true;
            // Load house lessons
            LessonService.getLessonIdsByParent().then(function (response) {
                if (response.query_status == 'success') {
                    $scope.houseLessons = response.data;
                    $scope.resources.stillLoadingLessons = false;
                }else{
                    console.log("ERROR : While loading house lessons");
                    console.log(response.message);
                    $scope.houseLessons = [];
                    $scope.resources.stillLoadingLessons = false;
                }
            }, function (error) {
                console.log("ERROR : While loading house lessons");
                $scope.houseLessons = [];
                $scope.resources.stillLoadingLessons = false;
                console.log(error);
            });
        }
        
        // Get House Lessons
        $scope.getHouseLessons = function (houseId) {
            $scope.houseLessons = [];
            $scope.resources.stillLoadingLessons = true;
            // Load house lessons
            LessonService.getLessonByHouseId(houseId).then(function (response) {
                if (response.query_status == 'success') {
                    $scope.houseLessons = response.data;
                    $scope.resources.stillLoadingLessons = false;
                }else{
                    console.log("ERROR : While loading house lessons");
                    console.log(response.message);
                    $scope.houseLessons = [];
                    $scope.resources.stillLoadingLessons = false;
                }
            }, function (error) {
                console.log("ERROR : While loading house lessons");
                $scope.houseLessons = [];
                $scope.resources.stillLoadingLessons = false;
                console.log(error);
            });
        }
        
        // Update house
        $scope.updateHouse = function (house) {
            $scope.resources.updateHouseBtnText = "Updating...";
            $scope.isWaiting = true;
            HouseService.updateHouse(house).then(function (response) {
                if (response.query_status == "success") {
                    $scope.resources.updateHouseBtnText = "Update";
                    swal({   
                        type: "success",
                        title: "Success!",   
                        text: "You have successfully updated the house.",   
                        timer: 3000,   
                        showConfirmButton: true 
                    });
                    $scope.loadHouse();
                    $scope.isWaiting = false;
                }else{
                    console.log("ERROR : Failed to update house.");
                    console.log(response);
                    swal({   
                        type: "error",
                        title: "Failed to update house!",   
                        text: response.message,   
                        timer: 3000,   
                        showConfirmButton: true 
                    });
                    $scope.resources.updateHouseBtnText = "Update";
                    $scope.isWaiting = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to update house.");
                console.log(error);
                $scope.isWaiting = false;
                $scope.resources.updateHouseBtnText = "Update";
                swal({   
                    type: "error",
                    title: "Failed to update house!",   
                    text: "Something went wrong.",   
                    timer: 3000,   
                    showConfirmButton: true 
                });
            });
        }

        // check upload image type
        $scope.uploadFileValidate = function(picFile) {
            if(picFile == null){
                swal("Error!", "Please add correct image type.", "error");
                location.reload();
            }else{
                $scope.isValidImageFormat = true;
            }
        };
        
        // upload later on form submit or something similar
        $scope.uploadPic = function(picFile) {
            if (picFile) {
                $scope.upload(picFile);
            }
        };

        // upload on file select or drop
        $scope.upload = function(image) {
            var id = $scope.house.id;
            $scope.uploadImageBtnTxt = "Uploading..." ;
            $scope.uploading = true;
            HouseService.changeHouseImage(image, id, function(uploadSize) {
                image.progress = uploadSize;
            }).then(function (response) {
                console.log(response);
                if (response.status == 201) {
                    $scope.uploadImageBtnTxt = "Uploaded";
                    $scope.uploading = false;
                    image = null;
                    swal("Success!", "You have successfully updated house image.", "success");
                    
                    location.reload();
                }else{
                    $scope.uploadImageBtnTxt = "Upload";
                    $scope.uploading = false;
                    swal("Error!", "Failed to update house image.", "error");
                }
            }, function (error) {
                console.log(error);
                $scope.uploadImageBtnTxt = "Upload";
                $scope.uploading = false;
                swal("Error!", "Failed to update house image.", "error");
            });
        };
        
        // Get Email configurations
        $scope.loadEmailConfig = function () {
            $scope.resources.stillLoading = true;
            HouseService.getEmailConfigByUser(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.resources.stillLoading = false;
                    $scope.emailSubscriptions = response.data;
                    console.log('loadEmailConfig',response);
                }else{
                    $scope.resources.stillLoading = false;
                    console.log("ERROR : Failed to load email subscriptions.");
                    console.log(response);
                }
            }, function(error){
                $scope.resources.stillLoading = false;
                $scope.loadingFailed = true;
                console.log("ERROR : Failed to load email subscriptions.");
                console.log(error);
            });
        }
        
        // update email subscriptions
        $scope.updateEmailSubscriptions = function (conf) {
            console.log(conf)
            $scope.subUpdating = true;
            $scope.subBtnTxt = "Updating";
            HouseService.updateEmailConfig(conf).then(function(response){
                console.log(response);
                if (response.query_status == "success") {
                    swal({   
                        type: "success",
                        title: "Success!",   
                        text: "You have successfully updated the email subscription settings.",   
                        timer: 3000,   
                        showConfirmButton: true 
                    });
                    $scope.subUpdating = false;
                    $scope.subBtnTxt = "Update";
                }else{
                    swal({   
                        type: "error",
                        title: "ERROR!",   
                        text: "Failed to update email subscription settings.",   
                        timer: 3000,   
                        showConfirmButton: true 
                    });
                    console.log("ERROR : Failed to update email subscription settings.");
                    console.log(response);
                    $scope.subUpdating = false;
                    $scope.subBtnTxt = "Update";
                }
            }, function(error){
                swal({   
                    type: "error",
                    title: "ERROR!",   
                    text: "Failed to update email subscription settings.",   
                    timer: 3000,   
                    showConfirmButton: true 
                });
                console.log("ERROR : Failed to update email subscription settings.");
                console.log(error);
                $scope.subUpdating = false;
                $scope.subBtnTxt = "Update";
            });
        }
    }]);
})();