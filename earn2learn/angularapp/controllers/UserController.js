(function() {
    'use strict';
    angularEarnToLearnControllers.controller('UserController', ['$scope', '$rootScope', '$state', '$sce', '$http', '$window', 'TaskService', 'GiftcardService', 'LessonService', '$resource', '$localStorage', '$filter', '$stateParams', '_URLS', 'AuthService', 'UserService', 'AUTH_EVENTS', 'cfpLoadingBar', 'ngDialog', 'Upload','ChildService','BadgeService', function($scope, $rootScope, $state, $sce, $http, $window, TaskService, GiftcardService, LessonService, $resource, $localStorage, $filter, $stateParams, _URLS, AuthService, UserService, AUTH_EVENTS, cfpLoadingBar, ngDialog, Upload,ChildService,BadgeService) {

        // User Model
        $scope.usersModel = {
            allUsers: [],
            users: [],
            userSummary : {
                totalPoints : 0,
                behaviorPlus : 0,
                behaviorMinus : 0,
                lessonsPoints : 0,
                choresPoints : 0,
                giftCardPoints : 0,
                passedLessons : 0,
                failedLessons : 0,
            }
        }

        $scope.credentials = {};
        $scope.uploadImageBtnTxt = "Upload";
        $scope.fbConnectBtnTxt = "connect";
        $scope.fbDisconnectBtnTxt = "disconnect";
        
        // Get User
        /*$scope.user = function(){
            if ($localStorage && $localStorage.user) {
                return JSON.parse($localStorage.user);
            }else{
                return {};
            }
        }*/
        
        if($scope.user != null){
            if ($scope.user()._fb == 1) {
                $scope.fbConnectBtnTxt = "connected";
            }
        }

        
        // Resources
        $scope.resources = {
            defaultTemplate: "add-user-template",
            behaviorPoints: 0,
            selectedUser: null,
            silectedFilterRole: {
                name: "All users",
                value: 0
            },
            filterRoleChange: function(item) {
                $scope.resources.silectedFilterRole = item;
            },
            userRoles: [{
                name: "Administrator",
                value: 1
            }, {
                name: "Parent",
                value: 2
            }, {
                name: "Child",
                value: 3
            }],
            filterRoles: [{
                name: "All users",
                value: 0
            }, {
                name: "Administrators",
                value: 1
            }, {
                name: "Parents",
                value: 2
            }, {
                name: "Children",
                value: 3
            }],
            createButtonText: "Create",
            isCreateWaiting: false,
            stillLoading: false,
            noUsers: false,
            searchUserName: "",
            newUser: {},
            updateUserButtonText: "Update",
            isCurrentLoggedUser: false,
            currentTab : "behaviorTab"
        }

        // Init Function
        $scope.init = function(role) {
            $rootScope.userRoleId = role;
            $scope.getUsersByRole(role);
            $scope.today();
        }
        
        // Get unsafe html
        $scope.getUnsafeHtml = function(text) {
            return $sce.trustAsHtml(text);
        }
        
        // jsonDecodeStr
        $scope.jsonDecodeStr = function (str) {
            return JSON.parse(str);
        }
        
        // Filter Users
        $scope.filteredUsers = function() {
            if ($scope.resources.silectedFilterRole.value == 0) {
                return $scope.usersModel.allUsers;
            }
            return $filter('filter')($scope.usersModel.allUsers, {
                role_id: $scope.resources.silectedFilterRole.value
            });
        }

        // Get User Type from role id
        $scope.getRoleName = function(role) {
            if (role == 1) {
                return "Administrator"
            }
            else if (role == 2) {
                return "Parent"
            }
            else if (role == 3) {
                return "Child"
            }
        }

        // Get All Users
        $scope.getAllUsers = function() {
            UserService.getAllUsers().then(function(response) {
                $scope.usersModel.allUsers = response.data;
            });
        }

        // Get All Participants in House
        $scope.getAllParticipants = function() {
            $scope.resources.stillLoading = true;
            UserService.getUsersByHouseId(JSON.parse($localStorage.user).house_id).then(function(data) {
                if (data.query_status = "success") {
                    $scope.resources.stillLoading = false;
                    $scope.allHouseParticipants = data.data;
                }
                else {
                    // Error
                    console.log("Error : Failed to retrieve participants in house");
                    $scope.resources.stillLoading = false;
                    console.log(data.data);
                    $scope.allHouseParticipants = [];
                }
            }, function(e) {
                // Error
                console.log("Error : Failed to retrieve participants in house");
                $scope.resources.stillLoading = false;
                console.log(e);
                $scope.allHouseParticipants = [];
            });
        }

        // Get All Users By Role Id
        $scope.getUsersByRole = function(role_id) {
            $scope.resources.stillLoading = true;
            UserService.getUsersByUserRole(role_id).then(function(response) {
                if (response.query_status == "success") {
                    $scope.usersModel.users = response.data;
                    $scope.resources.stillLoading = false;
                    $scope.resources.noUsers = false;
                }
                else {
                    $scope.usersModel.users = [];
                    $scope.resources.stillLoading = false;
                    $scope.resources.noUsers = true;
                }
            }, function(error) {
                $scope.usersModel.users = [];
                $scope.resources.stillLoading = false;
                $scope.resources.noUsers = true;
                console.log("Error : Failed to load users.");
                console.log(error);
            });
        }

        // Get User By Id
        $scope.getUserById = function(userId) {
            var a, keepGoing = true;
            angular.forEach($scope.usersModel.allUsers, function(v, i) {
                if (keepGoing) {
                    if (v.id == userId) {
                        a = v;
                        keepGoing = false;
                    }
                }
            });
            return a;
        }

        // Select User
        $scope.selectUser = function(user) {
            //$scope.resources.selectedUser = user;
            $scope.resources.selectedUser = $scope.getUserById(user.id);
            $scope.resources.defaultTemplate = "user-profile-template";
        }

        // show Add User
        $scope.showAddUser = function(data, showTemplate) {
            if (showTemplate) {
                $scope.resources.selectedUser = null;
                $scope.resources.defaultTemplate = "add-user-template";
                return;
            }
        }

        //Datepicker functions
        $scope.today = function() {
            $scope.resources.newUser.dt = new Date();
        };
        //$scope.today();

        $scope.clear = function() {
            $scope.resources.newUser.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.resources.newUser.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'yyyy-MM-dd'];
        $scope.format = $scope.formats[4];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    //datepicker ended


    // Create new user
        $scope.createUser = function(credentials, isAdmin) {
            console.log("hit here........");
            console.log($rootScope.userRoleId);
            console.log($scope.resources.newUser.dt);
            var date_of_birth = $filter('date')($scope.resources.newUser.dt, "yyyy-MM-dd");
            console.log('Converted date is :'+ date_of_birth);
            if ($rootScope.userRoleId == undefined) {
                $scope.resources.newUser.role_id = 3;
            }
            else {
                $scope.resources.newUser.role_id = $rootScope.userRoleId;
            }
            $scope.resources.newUser.enable = 1;

            if ($scope.resources.newUser.role_id == 3) {
                if (
                    credentials.f_name == null ||
                    credentials.f_name.trim() == "" ||
                    credentials.l_name == null ||
                    credentials.l_name.trim() == "" ||
                    credentials.username == null ||
                    credentials.username.trim() == "" ||
                    credentials.password == null ||
                    credentials.password.trim() == "" ||
                    credentials.confirm_password == null ||
                    credentials.confirm_password.trim() == ""
                ) {
                    return;
                }
                $scope.resources.newUser.house_id = JSON.parse($localStorage.user).house_id;

            }
            else {
                if (
                    credentials.f_name == null ||
                    credentials.f_name.trim() == "" ||
                    credentials.l_name == null ||
                    credentials.l_name.trim() == "" ||
                    credentials.email == null ||
                    credentials.email.trim() == "" ||
                    credentials.username == null ||
                    credentials.username.trim() == "" ||
                    credentials.password == null ||
                    credentials.password.trim() == "" ||
                    credentials.confirm_password == null ||
                    credentials.confirm_password.trim() == ""
                ) {
                    return;
                }
            }

            $scope.resources.createButtonText = "Wait...";
            $scope.resources.isCreateWaiting = true;

            UserService.createUser(credentials,date_of_birth).then(function(user) {
                if (user.query_status == "success") {
                    $scope.resources.isCreateWaiting = true;
                    $scope.resources.createButtonText = "Create"
                    $scope.usersModel.users.push(user.data);


                    if($rootScope.userRoleId == 2)
                    {
                        var msg = "Parent successfully added.";
                    }
                    else{
                        var msg = "Child successfully added.";
                    }
                    swal({
                        type: "success",
                        title: "Success!",
                        text: msg,
                        showConfirmButton: true
                    }, function () {
                        if (!isAdmin) {
                            $state.go("parent.user", {
                                id: user.data.id
                            });
                        }
                        else {
                            $state.go("admin.user", {
                                id: user.data.id
                            });
                        }
                    });

                    ngDialog.closeAll();
                }
                else {
                    $scope.resources.isCreateWaiting = false;
                    $scope.resources.createButtonText = "Create";
                    swal({
                        type: "error",
                        title: "Error!",
                        text: user.message,
                        showConfirmButton: true
                    }, function () {});
                }
            }, function(error) {
                $scope.resources.isCreateWaiting = false;
                $scope.resources.createButtonText = "Create";
                sweetAlert("Error!", "Something went wrong.", "error");
                console.log("Error : Failed to create member.");
                console.log(error);
            });
        }

        // close window
        $scope.close = function() {
            console.log('hi');
            $rootScope.dialog.close();
        }

        // Open children user popup
        $scope.loadChildren = function(user) {
            console.log(user.id);
            ChildService.getChildrenByParentId(user.id).then(function(response) {
                if (response.query_status == "success") {

                    $rootScope.parent_child = response.data;
                    console.log($rootScope.parent_child);
                    $rootScope.dialog=ngDialog.open({
                        template: 'angularapp/views/_popups/show-children-popup.html',
                        controller: 'UserController',
                        controllerAs: 'userCtrl',
                        backdrop: 'static',
                        showClose: true,
                        closeByDocument: true,
                        closeByEscape: false,
                        className: 'ngdialog-theme-default'
                    });
                    //angular.element(document.querySelector('#createUserForm')).parsley();
                }
            }, function(error) {
                console.log("Error : Failed to load users.");
                console.log(error);
            });
        }

        // Open create user popup
        $scope.createUserPopup = function(role) {
            ngDialog.open({
                template: 'angularapp/views/_popups/add-user-popup.html',
                controller: 'UserController',
                controllerAs: 'userCtrl',
                backdrop: 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default'
            });
            angular.element(document.querySelector('#createUserForm')).parsley();
        }

        // Load Selected User
        $scope.loadSelectedUser = function() {
            $scope.resources.stillLoading = true;

            if ($state.current.name == "admin.profile") {
                $scope.parentId = JSON.parse($localStorage.user).id;
            }
            else {
                $scope.parentId = $stateParams.id;
            }

            UserService.getUserById($scope.parentId).then(function(response) {
                if (response.query_status == "success") {
                    $scope.userData = response.data;
                    $scope.updateUserData = angular.copy($scope.userData);
                    
                    if ($scope.updateUserData.email == " ") {
                        $scope.updateUserData.email = "";
                    }
                    
                    if (response.data.id == JSON.parse($localStorage.user).id) {
                        $scope.resources.isCurrentLoggedUser = true;
                    }

                    $scope.countryList = UserService.getCountryList();
                    $scope.loadStates($scope.updateUserData.country);
                    
                    $scope.resources.stillLoading = false;
                }
                else {
                    console.log("ERROR : Failed to load parent.");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function(error) {
                console.log("ERROR : Failed to load parent.");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }

        // Load Parent Selected User
        $scope.loadParentSelectedUser = function() {
            $scope.resources.stillLoading = true;

            if ($state.current.name == "parent.profile") {
                $scope.parentId = JSON.parse($localStorage.user).id;
            }
            else {
                $scope.parentId = $stateParams.id;
            }

            $scope.houseChilds = [];
            UserService.getUsersByHouseId(JSON.parse($localStorage.user).house_id).then(function(data) {
                if (data.query_status = "success") {
                    $scope.allHouseParticipants = data.data;
                    angular.forEach(data.data, function(e, i) {
                        $scope.houseChilds.push(e.id);
                    });
                    if ($state.current.name == "parent.profile") {
                        lU($scope.parentId);
                    }
                    else {
                        if ($scope.houseChilds.indexOf(parseInt($scope.parentId)) == -1) {
                            $scope.resources.stillLoading = false;
                        }
                        else {
                            lU($scope.parentId)
                        }
                    }
                }
                else {
                    console.log("Error : Failed to retrieve participants in house");
                    console.log(data);
                    $scope.allHouseParticipants = [];
                    if ($state.current.name == "parent.profile") {
                        lU($scope.parentId);
                    }
                }
            }, function(e) {
                // Error
                console.log("Error : Failed to retrieve participants in house");
                console.log(e);
                $scope.allHouseParticipants = [];
                if ($state.current.name == "parent.profile") {
                    lU($scope.parentId);
                }
            });
        }

        function lU(uid) {
            UserService.getUserById(uid).then(function(response) {
                if (response.query_status == "success") {
                    $scope.userData = response.data;

                    $scope.updateUserData = angular.copy($scope.userData);
                    
                    if ($scope.updateUserData.email == " ") {
                        $scope.updateUserData.email = "";
                    }
                    
                    if (response.data.id == JSON.parse($localStorage.user).id) {
                        $scope.resources.isCurrentLoggedUser = true;
                    }

                    // Get Country List
                    $scope.countryList = UserService.getCountryList();
                    $scope.loadStates($scope.updateUserData.country);
                    $scope.getRewardsByChild(uid);
                }
                else {
                    console.log("ERROR : Failed to load parent.");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function(error) {
                console.log("ERROR : Failed to load parent.");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }

        // Get Rewards By Child
        $scope.getRewardsByChild = function(cid) {
            UserService.getBehaviorPoints(cid).then(function(response) {
                if (response.query_status == "success") {
                    $scope.child_behavior_rewards = response.data;
                    $scope.resources.stillLoading = false;
                }
                else {
                    console.log("ERROR : Failed to load today behavior");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                    $scope.child_behavior_rewards = {
                        this_day: {
                            good : 0,
                            bad : 0
                        },
                        this_week: {
                            good : 0,
                            bad : 0
                        },
                        this_month: {
                            good : 0,
                            bad : 0
                        },
                        this_year : {
                            good : 0,
                            bad : 0
                        }
                    }
                }
            }, function(error) {
                console.log("ERROR : Failed to load today behavior");
                console.log(error);
                $scope.resources.stillLoading = false;
                $scope.child_behavior_rewards = {
                    this_day: {
                        good : 0,
                        bad : 0
                    },
                    this_week: {
                        good : 0,
                        bad : 0
                    },
                    this_month: {
                        good : 0,
                        bad : 0
                    },
                    this_year : {
                        good : 0,
                        bad : 0
                    }
                }
            });
        }

        // Load Parent Selected User
        $scope.loadUserProfile = function() {
            $scope.resources.stillLoading = true;

            UserService.getUserById(JSON.parse($localStorage.user).id).then(function(response) {
                if (response.query_status == "success") {
                    $scope.userData = response.data;
                    $scope.updateUserData = angular.copy($scope.userData);
                    if (response.data.id == JSON.parse($localStorage.user).id) {
                        $scope.resources.isCurrentLoggedUser = true;
                    }

                    $scope.countryList = UserService.getCountryList();
                    $scope.loadStates($scope.updateUserData.country);
                    $scope.resources.stillLoading = false;
                }
                else {
                    console.log("ERROR : Failed to load parent.");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function(error) {
                console.log("ERROR : Failed to load parent.");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }

        // Phone Number Pattern
        $scope.phoneNumberPattern = (function() {
            var regexp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            return {
                test: function(value) {
                    return regexp.test(value);
                }
            };
        })();

        // Update User
        $scope.updateUser = function(user) {
            console.log('Update user...');
            console.log(user);
            swal({
                title: "Are you sure?",
                text: "Are you sure you want to update profile details?",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, do it!",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function() {
                $scope.resources.updateUserButtonText = "Updating...";
                $scope.isWaiting = true;
                UserService.updateUser(user.id, user).then(function (response) {
                    if (response.query_status == "success") {
                        $scope.resources.updateUserButtonText = "Update";
                        var messageTxt = "";
                        if ($scope.resources.isCurrentLoggedUser) {
                            messageTxt = "You have successfully updated your profile information.";
                        }
                        else {
                            messageTxt = "You have successfully updated " + user.f_name + "'s profile information.";
                        }
                        $rootScope.$broadcast(AUTH_EVENTS.checkUser);
                        swal({
                            type: "success",
                            title: "Success!",
                            text: messageTxt,
                            timer: 3000,
                            showConfirmButton: true
                        });
                        //$scope.loadSelectedUser();
                        if(user.role_id == 2)
                        {
                            $state.go("admin.parents"); 
                        }
                        if(user.role_id == 3)
                        {
                            $state.go("admin.members"); 
                        }
                                               
                        $scope.isWaiting = false;
                    }
                    else {
                        console.log("ERROR : Failed to update user.");
                        console.log(response);
                        var messageTxt = "";
                        if ($scope.resources.isCurrentLoggedUser) {
                            messageTxt = "Failed to update your profile information.";
                        }
                        else {
                            messageTxt = "Failed to update " + user.f_name + "'s profile information.";
                        }
                        swal({
                            type: "error",
                            title: messageTxt,
                            text: response.message,
                            showConfirmButton: true
                        }, function () {
                            $scope.resources.updateUserButtonText = "Update";
                            $scope.isWaiting = false;
                        });
                    }
                }, function (error) {
                    console.log("ERROR : Failed to update user.");
                    console.log(error);
                    $scope.isWaiting = false;
                    $scope.resources.updateUserButtonText = "Update";
                    swal({
                        type: "error",
                        title: "Failed to update user!",
                        text: "Something went wrong.",
                        timer: 3000,
                        showConfirmButton: true
                    });
                });
            });
        }

        // Delete User
        $scope.deleteUser = function(user) {
            swal({
                title: "Are you sure?",
                text: "This will delete user permenently.",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function(isOk) {
                if (isOk) {
                    user.enable = 0;
                    UserService.deleteUser(user.id).then(function(response) {
                        if (response.query_status == "success") {
                            swal({
                                type: "success",
                                title: "Success!",
                                text: "You have successfully deleted the user.",
                                timer: 3000,
                                showConfirmButton: true
                            });

                            if ($state.current.name == "admin.user") {
                                if (user.role_id == 1) {
                                    $state.go("admin.administrators");
                                }
                                if (user.role_id == 2) {
                                    $state.go("admin.parents");
                                }
                                if (user.role_id == 3) {
                                    $state.go("admin.members");
                                }
                            }

                            if ($state.current.name == "parent.user") {
                                $state.go("parent.allParticipant");
                            }


                        }
                        else {
                            console.log("ERROR : Failed to delete user.");
                            console.log(response);
                            swal({
                                type: "error",
                                title: "Failed to delete user!",
                                text: response.message,
                                timer: 3000,
                                showConfirmButton: true
                            });
                        }
                    }, function(error) {
                        console.log("ERROR : Failed to delete user.");
                        console.log(error);
                        swal({
                            type: "error",
                            title: "Failed to delete user!",
                            text: "Something went wrong.",
                            timer: 3000,
                            showConfirmButton: true
                        });
                    });
                }
            });
        }

        // Soft Delete User
        $scope.softdeleteUser = function(user) {
            UserService.subscriptionPeriod(user.id).then(function(response) {
                if(response.query_status == "success"){
                    swal({
                            title: "Are you sure?",
                            text: "This will delete the user.",
                            type: "info",
                            showCancelButton: true,
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                        }, function(isOk) {
                            if (isOk) {
                                user.enable = 0;
                                UserService.softDeleteUser(user.id).then(function(response) {
                                    if (response.query_status == "success") {
                                        swal({
                                            type: "success",
                                            title: "Success!",
                                            text: "You have successfully deleted the user.",
                                            timer: 3000,
                                            showConfirmButton: true
                                        },function (res) {
                                            if(res){
                                                if ($state.current.name == "admin.user") {
                                                    if (user.role_id == 1) {
                                                        $state.go("admin.administrators");
                                                    }
                                                    if (user.role_id == 2) {
                                                        $state.go("admin.parents");
                                                    }
                                                    if (user.role_id == 3) {
                                                        $state.go("admin.members");
                                                    }
                                                }

                                                if ($state.current.name == "parent.user") {
                                                    $state.go("parent.allParticipant");
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        console.log("ERROR : Failed to delete user.");
                                        console.log(response);
                                        swal({
                                            type: "error",
                                            title: "Failed to delete user!",
                                            text: response.message,
                                            timer: 3000,
                                            showConfirmButton: true
                                        });
                                    }
                                }, function(error) {
                                    console.log("ERROR : Failed to delete user.");
                                    console.log(error);
                                    swal({
                                        type: "error",
                                        title: "Failed to delete user!",
                                        text: "Something went wrong.",
                                        timer: 3000,
                                        showConfirmButton: true
                                    });
                                });
                            }
                        });
                }
                else {
                    console.log("ERROR : Failed to delete user.");
                    swal({
                        type: "error",
                        title: "Failed to delete user!",
                        text: response.message,
                        showConfirmButton: true
                    });
                }
                console.log(response);
            }, function(error) {
                console.log("ERROR : Failed to delete user.");
                console.log(error);
                swal({
                    type: "error",
                    title: "Failed to delete user!",
                    text: "Something went wrong.",
                    timer: 3000,
                    showConfirmButton: true
                });

            });

        }
        // Soft Delete Child User
        $scope.softdeleteChildUser = function(user) {
            swal({
                title: "Are you sure?",
                text: "This will delete user permenently.",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function(isOk) {
                if (isOk) {
                    user.enable = 0;
                    UserService.softDeleteChildUser(user.id).then(function(response) {
                        if (response.query_status == "success") {
                            swal({
                                type: "success",
                                title: "Success!",
                                text: "You have successfully deleted the user.",
                                timer: 3000,
                                showConfirmButton: true
                            });

                            if ($state.current.name == "admin.user") {
                                if (user.role_id == 1) {
                                    $state.go("admin.administrators");
                                }
                                if (user.role_id == 2) {
                                    $state.go("admin.parents");
                                }
                                if (user.role_id == 3) {
                                    $state.go("admin.members");
                                }
                            }

                            if ($state.current.name == "parent.user") {
                                $state.go("parent.allParticipant");
                            }


                        }
                        else {
                            console.log("ERROR : Failed to delete user.");
                            console.log(response);
                            swal({
                                type: "error",
                                title: "Failed to delete user!",
                                text: response.message,
                                timer: 3000,
                                showConfirmButton: true
                            });
                        }
                    }, function(error) {
                        console.log("ERROR : Failed to delete user.");
                        console.log(error);
                        swal({
                            type: "error",
                            title: "Failed to delete user!",
                            text: "Something went wrong.",
                            timer: 3000,
                            showConfirmButton: true
                        });
                    });
                }
            });
        }

        // Change User Pasword
        $scope.changeUserPassword = function(userData) {
            ngDialog.open({
                template: 'angularapp/views/_popups/change-user-password-popup.html',
                controller: changeUserPasswordCtrl,
                backdrop: 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default'
            });

            changeUserPasswordCtrl.$inject = ['$scope'];

            function changeUserPasswordCtrl($scope) {
                $scope.changePasswordButtonText = "Update";
                $scope.changeUserPassword = function(password) {
                    $scope.changePasswordButtonText = "Updating...";
                    $scope.isChangePasswordWaiting = true;
                    UserService.passwordReset(password).then(function(response) {
                        if (response.query_status == "success") {
                            $scope.changePasswordButtonText = "Updated";
                            $scope.isChangePasswordWaiting = false;
                            ngDialog.close();
                            swal({
                                type: "success",
                                title: "Success!",
                                text: "You have updated password successfully.",
                                showConfirmButton: true
                            });
                        }
                        else if (response.query_status == "duplicate_pwd") {
                            console.log("You have entered a duplicate password...");
                            $scope.changePasswordButtonText = "Update";
                            $scope.isChangePasswordWaiting = false;
                            ngDialog.close();
                            swal({
                                type: "error",
                                title: "Existing Password!",
                                text: response.message,
                                showConfirmButton: true
                            });
                        }
                        else {
                            $scope.changePasswordButtonText = "Update";
                            $scope.isChangePasswordWaiting = false;
                            console.log("ERROR : Failed to change password");
                            console.log(response);
                            swal({
                                type: "error",
                                title: "Change Password Failed!",
                                //text: response.data.message,
                                text: response.message,
                                showConfirmButton: true
                            });
                        }
                    }, function(error) {
                        $scope.changePasswordButtonText = "Update";
                        $scope.isChangePasswordWaiting = false;
                        console.log("ERROR : Failed to change password");
                        console.log(error);
                        swal({
                            type: "error",
                            title: "Change Password Failed!",
                            text: error.data.message,
                            showConfirmButton: true
                        });
                    });
                }
            }
        }

        // Change Child Pasword
        $scope.changeChildPassword = function(userData) {
            $rootScope.child_id=userData.id;
            ngDialog.open({
                template: 'angularapp/views/_popups/change-child-password-popup.html',
                controller: changeChildPasswordCtrl,
                backdrop: 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default'
            });

            changeChildPasswordCtrl.$inject = ['$scope'];

            function changeChildPasswordCtrl($scope) {
                var child_id = $rootScope.child_id;
                $scope.childChangePasswordButtonText = "Update";
                $scope.changeChildPassword = function(password) {
                    $scope.childChangePasswordButtonText = "Updating...";
                    $scope.isChildChangePasswordWaiting = true;
                    UserService.childPasswordReset(password, child_id).then(function(response) {
                        if (response.query_status == "success") {
                            $scope.childChangePasswordButtonText = "Updated";
                            $scope.isChildChangePasswordWaiting = false;
                            ngDialog.close();
                            swal({
                                type: "success",
                                title: "Success!",
                                text: "You have updated password successfully.",
                                showConfirmButton: true
                            });
                        }
                        else if (response.query_status == "duplicate_pwd") {
                            console.log("You have entered a duplicate password...");
                            $scope.childChangePasswordButtonText = "Update";
                            $scope.isChildChangePasswordWaiting = false;
                            swal({
                                type: "error",
                                title: "Duplicate password!",
                                text: response.message,
                                showConfirmButton: true
                            });
                        }
                        else {
                            $scope.childChangePasswordButtonText = "Update";
                            $scope.isChildChangePasswordWaiting = false;
                            console.log("ERROR : Failed to change password");
                            console.log(response);
                            swal({
                                type: "error",
                                title: "Change Password Failed!",
                                //text: response.data.message,
                                text: response.message,
                                showConfirmButton: true
                            });
                        }
                    }, function(error) {
                        $scope.childChangePasswordButtonText = "Update";
                        $scope.isChildChangePasswordWaiting = false;
                        console.log("ERROR : Failed to change password");
                        console.log(error);
                        swal({
                            type: "error",
                            title: "Change Password Failed!",
                            text: error.data.message,
                            showConfirmButton: true
                        });
                    });
                }
            }
        }
        
        // Add Behavior Points
        $scope.behaviorPoints = function(points, userId) {
            UserService.addRewards({
                child_id: userId,
                value: points,
                type: 3
            }).then(function(response) {
                if (response.query_status == "success") {
                    var txt;
                    if (points > 0) {
                        txt = "You have added " + points + " points to the user for good behaviors.";
                        // $scope.getRewardsByChild(userId);
                        $scope.child_behavior_rewards.this_day.good += points;
                        $scope.child_behavior_rewards.this_week.good += points;
                        $scope.child_behavior_rewards.this_month.good += points;
                        $scope.child_behavior_rewards.this_year.good += points;
                    }
                    else {
                        var p = 0 - points;
                        txt = "You have reduce " + p + " points from the user for bad behaviors.";
                        // $scope.getRewardsByChild(userId);
                        $scope.child_behavior_rewards.this_day.bad += points;
                        $scope.child_behavior_rewards.this_week.bad += points;
                        $scope.child_behavior_rewards.this_month.bad += points;
                        $scope.child_behavior_rewards.this_year.bad += points;
                    }
                    swal({
                        type: "success",
                        title: "Success!",
                        text: txt,
                        timer: 3000,
                        showConfirmButton: true
                    });
                    $scope.summaryByChildId();
                    $scope.resources.behaviorPoints = 0;
                }
                else {
                    console.log("ERROR : While adding rewards");
                    console.log(error);
                    swal({
                        type: "error",
                        title: "Failed to update user!",
                        text: response.message,
                        timer: 3000,
                        showConfirmButton: true
                    });
                }
            }, function(error) {
                console.log("ERROR : While adding rewards");
                console.log(error);
                swal({
                    type: "error",
                    title: "Failed to update user!",
                    text: "Something went wrong.",
                    timer: 3000,
                    showConfirmButton: true
                });
            });
        }

        // upload later on form submit or something similar
        $scope.uploadPic = function(picFile) {
            if (picFile) {
                $scope.upload(picFile);
            }
        };

        // upload on file select or drop
        $scope.upload = function(image) {
            var id = $scope.updateUserData.id;
            $scope.uploadImageBtnTxt = "Uploading..." ;
            $scope.uploading = true;
            UserService.changeProfileImage(image, id, function(uploadSize) {
                image.progress = uploadSize;
            }).then(function (response) {
                console.log(response);
                if (response.status == 201) {
                    $scope.uploadImageBtnTxt = "Uploaded";
                    $scope.uploading = false;
                    image = null;
                    //swal("Success!", "You have successfully updated user profile image.", "success");
                    swal({
                        type: "success",
                        title: "Success",
                        text: "You have successfully updated user profile image.",
                        showConfirmButton: true
                    },function(){
                        // console.log('User role is :'+JSON.parse($localStorage.user).id);
                        console.log('User role is :'+JSON.parse($localStorage.user).role_id);
                        // Handle user by role
                        var roleid = JSON.parse($localStorage.user).role_id;
                        if(roleid == 1){
                            $state.go("admin.members");
                        }
                        if(roleid == 2){
                            location.reload();
                        }
                    });
                    /*$state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });*/
                    //location.reload();
                }else{
                    $scope.uploadImageBtnTxt = "Upload";
                    $scope.uploading = false;
                    swal("Error!", "Failed to update user profile image.", "error");
                }
            }, function (error) {
                console.log(error);
                $scope.uploadImageBtnTxt = "Upload";
                $scope.uploading = false;
                swal("Error!", "Failed to update user profile image.", "error");
            });
        };
        
        // Load states for country
        $scope.loadStates = function (country) {
            $scope.loadingStates = true;
            $scope.state_list = UserService.populateStates(country);
            $scope.loadingStates = false;
        }
        
        // Load User summary by child id
        $scope.summaryByChildId  = function () {
            var id;
            if ($state.current.name == "parent.profile") {
                id = JSON.parse($localStorage.user).id;
            }
            else {
                id = $stateParams.id;
            }
            
            UserService.getUserSummary(id).then(function (response) {
                if (response.query_status == "success") {
                    var totalPoints = ((parseInt(response.data.behavior_plus)>0?parseInt(response.data.behavior_plus):0) + (parseInt(response.data.behavior_minus)>0?parseInt(response.data.behavior_minus):0) + (parseInt(response.data.lesson.points)>0?parseInt(response.data.lesson.points):0)+ (parseInt(response.data.tasks)>0?parseInt(response.data.tasks):0)+ (parseInt(response.data.gift_card)>0?parseInt(response.data.gift_card):0));
                    console.log(totalPoints);
                    $scope.usersModel.userSummary.behaviorPlus      = parseInt(response.data.behavior_plus) > 0 ? parseInt(response.data.behavior_plus):0 ;
                    $scope.usersModel.userSummary.behaviorMinus     = parseInt(Math.abs(response.data.behavior_minus));
                    $scope.usersModel.userSummary.choresPoints      = parseInt(response.data.tasks) > 0 ? parseInt(response.data.tasks):0 ;
                    $scope.usersModel.userSummary.giftCardPoints    = parseInt(Math.abs(response.data.gift_card));
                    $scope.usersModel.userSummary.lessonsPoints     = parseInt(response.data.lesson.points);
                    $scope.usersModel.userSummary.totalPoints       = totalPoints > 0 ? totalPoints: 0;
                    $scope.usersModel.userSummary.passedLessons     = parseInt(response.data.lesson.passed);
                    $scope.usersModel.userSummary.failedLessons     = parseInt(response.data.lesson.failed);
                }else{
                    console.log("ERROR : While loading user summary");
                    console.log(response);
                }
            }, function (error) {
                console.log("ERROR : While loading user summary");
                console.log(error);
            });
        }
        
        // Get Child Assign Lessons
        $scope.getChildAssignedLessons = function () {
            var id;
            if ($state.current.name == "parent.profile") {
                id = JSON.parse($localStorage.user).id;
            }
            else {
                id = $stateParams.id;
            }
            
            $scope.ChildAssignedLessons = [];
            $scope.loadingAssignedLessons = true;
            LessonService.getMyAssignedLessons(id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.refreshChildAssignedLessons(response.data);
                    $scope.loadingAssignedLessons = false;
                }else{
                    console.log("ERROR : Failed To Load Child Assign Lessons.");
                    console.log(response.message);
                    $scope.refreshChildAssignedLessons([]);
                    $scope.loadingAssignedLessons = false;
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Assign Lessons.");
                console.log(error);
                $scope.refreshChildAssignedLessons([]);
                $scope.loadingAssignedLessons = false;
            });
        }
        
        // Refresh My Assigned Lessons
        $scope.refreshChildAssignedLessons = function (data) {
            $scope.ChildAssignedLessons = data;
        }
        
        // Get Child assigned chores
        $scope.getChildAssignedChoresByChildId = function () {
            var id;
            if ($state.current.name == "parent.profile") {
                id = JSON.parse($localStorage.user).id;
            }
            else {
                id = $stateParams.id;
            }
            
            $scope.ChildAssignedChores = [];
            $scope.loadingAssignedChores = true;
            
            TaskService.getTaskAllocationByChildId(id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.ChildAssignedChores = response.data;
                    $scope.loadingAssignedChores = false;
                }else{
                    console.log("ERROR : Failed To Load Child Assign Lessons.");
                    console.log(response.message);
                    $scope.loadingAssignedChores = false;
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Assign Lessons.");
                console.log(error);
                $scope.loadingAssignedChores = false;
            });
        }
        
        // Get Child assigned chores
        $scope.getChildAssignedGiftcards = function () {
            var id;
            if ($state.current.name == "parent.profile") {
                id = JSON.parse($localStorage.user).id;
            }
            else {
                id = $stateParams.id;
            }
            
            $scope.ChildGiftcards = [];
            $scope.loadingGiftcards = true;
            
            GiftcardService.getGiftcardsByChildId(id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.ChildGiftcards = response.data;
                    $scope.loadingGiftcards = false;
                }else{
                    console.log("ERROR : Failed To Load Child Giftcards.");
                    console.log(response);
                    $scope.loadingGiftcards = false;
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Giftcards.");
                console.log(error);
                $scope.loadingGiftcards = false;
            });
        }
        
        // get certificates 
        $scope.getCertificateByUser = function () {
            var id;
            if ($state.current.name == "parent.profile") {
                id = JSON.parse($localStorage.user).id;
            }
            else {
                id = $stateParams.id;
            }
            
            $scope.ChildCertificates = [];
            $scope.loadingCertificates = true;
            
            UserService.getCertificateByUser(id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.ChildCertificates = response.data;
                    $scope.loadingCertificates = false;
                }else{
                    console.log("ERROR : Failed To Load Child Certificates.");
                    console.log(response);
                    $scope.loadingCertificates = false;
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Certificates.");
                console.log(error);
                $scope.loadingCertificates = false;
            });
        }
        
        // print certificate
        $scope.printCertificate = function (data) {
            var html = UserService.getCertificateHtml(data);
            var mywindow = window.open();
            mywindow.document.write(html);
            mywindow.print();
            mywindow.close();
            return true;
        }
        
        // Share certificateOnFb
        $scope.shareOnFb = function (certificate) {
            var html = UserService.getCertificateHtml(certificate);
            UserService.getCertificateImageUrl(certificate.certificate_id, html).then(function (response) {
                if (response.query_status == "success") {
                    FB.ui({
                        method: 'share',//share // feed
                        display: 'popup',
                        //href: 'http://mumzcare.com/po/',
                        href : _URLS.BASE_FOLDER + response.data.url
                    }, function(shareResponse){
                        if (response && !response.error_message) {
                            swal("Success!", "You have successfully shared the certificate in your facebook timeline.", "success");
                        } 
                    });
                }else{
                    swal("Error!", "Failed to shared the certificate", "error");
                }
            }, function (error) {
                swal("Error!", "Failed to shared the certificate", "error");
            });
        }
        
        // View Certificate
        $scope.viewCertificate = function (certificate) {
            var html = UserService.getCertificateHtml(certificate);
            console.log(html);
            console.log(certificate);
            ngDialog.open({ 
                template: "<div>" + html + "</div>",
                backdrop : 'static',
                showClose: false,
                plain: true,
                closeByDocument: true,
                closeByEscape: true,
                className: 'ngdialog-theme-default certificatePopup'
            });
        }


        // get badges by child id
        $scope.getBadgesByUser = function () {
            var id;
            if ($state.current.name == "parent.profile") {
                id = JSON.parse($localStorage.user).id;
            }
            else {
                id = $stateParams.id;
            }

            $scope.childBadges = [];
            $scope.loadingBadges = true;

            BadgeService.getAchievedBadgesByChild(id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.childBadges = response.data;
                    $scope.loadingBadges = false;
                }else{
                    console.log("ERROR : Failed To Load Child Badges.");
                    console.log(response);
                    $scope.loadingBadges = false;
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Badges.");
                console.log(error);
                $scope.loadingBadges = false;
            });
        }


        // Share badgesOnFb
        $scope.badgeShareOnFb = function badgeShareOnFb (badges) {
            var html = UserService.getBadgeHtml(badges);
            UserService.getBadgeImageUrl(badges.id, html).then(function (response) {
                if (response.query_status == "success") {
                    console.log(_URLS.BASE_FOLDER + response.data.url);
                    FB.ui({
                        method: 'feed',//share // feed
                        href : _URLS.BASE_FOLDER + response.data.url
                    }, function(shareResponse){
                        if (response && !response.error_message) {
                            swal("Success!", "You have successfully shared the badges in your facebook timeline.", "success");
                        }
                    });
                }else{
                    swal("Error!", "Failed to shared the badge", "error");
                }
            }, function (error) {
                swal("Error!", "Failed to shared the badge", "error");
            });
        }


        // Get child chore points
        $scope.getChildChorepoints = function () {
            var id;
            if ($state.current.name == "parent.profile") {
                id = JSON.parse($localStorage.user).id;
            }
            else {
                id = $stateParams.id;
            }
            
            $scope.ChildChorepoints = [];
            $scope.loadingChildChorepoints = true;
            
            UserService.getChildChorepoints(id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.ChildChorepoints = response.data;
                    $scope.loadingChildChorepoints = false;
                }else{
                    console.log("ERROR : Failed To Load Child Chores points.");
                    console.log(response);
                    $scope.loadingChildChorepoints = false;
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Chores points.");
                console.log(error);
                $scope.loadingChildChorepoints = false;
            });
        }
        
        // Get child Lesson points
        $scope.getChildLessonpoints = function () {
            var id;
            if ($state.current.name == "parent.profile") {
                id = JSON.parse($localStorage.user).id;
            }
            else {
                id = $stateParams.id;
            }
            
            $scope.ChildLessonpoints = [];
            $scope.loadingChildLessonpoints = true;
            
            UserService.getChildLessonpoints(id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.ChildLessonpoints = response.data;
                    $scope.loadingChildLessonpoints = false;
                }else{
                    console.log("ERROR : Failed To Load Child Lesson points.");
                    console.log(response);
                    $scope.loadingChildLessonpoints = false;
                }
            }, function (error) {
                console.log("ERROR : Failed To Load Child Lesson points.");
                console.log(error);
                $scope.loadingChildLessonpoints = false;
            });
        }
        
        // Connect with Facebook
        $scope.facebookConnect = function () {
            $scope.connectingFb = true;
            $scope.fbConnectBtnTxt = "connecting...";
            FB.login(function (response) {
                if (response.authResponse) {
                    FB.api('/me',{
                            fields: 'name,first_name,last_name,email,picture'
                        }, function (response) {
                            console.log(response);
                            if (response.email != JSON.parse($localStorage.user).email) {
                                $scope.connectingFb = false;
                                $scope.fbConnectBtnTxt = "connect";
                                $scope.$apply();
                                swal({   
                                    type    : "error",
                                    title   : "Invalid email address.",
                                    text    : "Please enter registered email adress to continue.",
                                    showConfirmButton: true
                                });
                                return;
                            }else{
                                UserService.connectFb(response).then(function (response1) {
                                    if (response1.query_status == "success") {
                                        $scope.connectingFb = false;
                                        $scope.fbConnectBtnTxt = "connected";
                                        // $scope.$apply();
                                        swal({   
                                            type    : "success",
                                            title   : "Success!",   
                                            text    : "You have successfully connected with the facebook.",
                                            showConfirmButton: true
                                        });
                                        $rootScope.$broadcast(AUTH_EVENTS.checkUser);
                                    }else{
                                        swal({   
                                            type    : "error",
                                            title   : "Connecting Failed!",   
                                            text    : response1.data.message,
                                            showConfirmButton: true
                                        });
                                        $scope.connectingFb = false;
                                        $scope.fbConnectBtnTxt = "connect";
                                    }
                                }, function (error) {
                                    swal({   
                                        type    : "error",
                                        title   : "Connecting Failed!",   
                                        text    : error.data.message,
                                        showConfirmButton: true
                                    });
                                    $scope.connectingFb = false;
                                    $scope.fbConnectBtnTxt = "connect";
                                });
                                
                            }
                    });
                }else{
                    $scope.connectingFb = false;
                    $scope.fbConnectBtnTxt = "connect";
                    $scope.$apply();
                    console.log("User cancelled login or did not fully autherized.");
                }
            },{scope: 'email'});
        }
        
        // Disconnect facebook
        $scope.disconnectFacebook = function () {
            $scope.disconnectingFb = true;
            $scope.fbDisconnectBtnTxt = "disconnecting...";
            UserService.disconnectFb().then(function (response) {
                if (response.query_status == "success") {
                    $scope.disconnectingFb = false;
                    $scope.fbDisconnectBtnTxt = "disconnected";
                    $scope.connectingFb = false;
                    $scope.fbConnectBtnTxt = "connect";
                    swal({   
                        type    : "success",
                        title   : "Success!",   
                        text    : "You have successfully disconnected your facebook account from your Earn2Learn account.",
                        showConfirmButton: true
                    });
                    $rootScope.$broadcast(AUTH_EVENTS.checkUser);
                }else{
                    $scope.disconnectingFb = false;
                    $scope.fbDisconnectBtnTxt = "disconnect";
                    swal({   
                        type    : "error",
                        title   : "Disconnecting Failed!",   
                        text    : response.data.message,
                        showConfirmButton: true
                    });
                }
            }, function (error) {
                $scope.disconnectingFb = false;
                $scope.fbDisconnectBtnTxt = "disconnect";
                swal({   
                    type    : "error",
                    title   : "Disconnecting Failed!",   
                    text    : error.data.message,
                    showConfirmButton: true
                });
            });
        }

        $scope.resetUserFilter = function resetUserFilter() {
            $scope.searchUserName = undefined;
        };


    }]);

})();

