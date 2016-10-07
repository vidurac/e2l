(function() {
    'use strict';
    angularEarnToLearnControllers.controller('TaskController', TaskController);
    TaskController.$inject = ['$scope', '$rootScope', '$state', '$window', '$sce', '$localStorage', '$stateParams', '_URLS', 'AuthService', 'TaskService', 'UserService', 'AUTH_EVENTS', 'cfpLoadingBar', 'ngDialog', '$timeout', '$filter'];
    function TaskController($scope, $rootScope, $state, $window, $sce, $localStorage, $stateParams, _URLS, AuthService, TaskService, UserService, AUTH_EVENTS, cfpLoadingBar, ngDialog, $timeout, $filter) {
        // Define resources model
        $scope.resources = {
            stillLoading : false,
            newTask : {
                category_id : 0
            },
            assignTask : {
                child_ids : [],
                old_child_ids : [],
                new_child_ids : [],
                remove_child_ids : []
            },
            allTasks : [],
            searchTaskName : "",
            addTaskButtonText : "Save",
            filterOptions: [{ name: "All Chores" }, { name: "System Chores", id: 1 }, { name: "My Chores", id: 0 }],
            filterBy: { name: "All Chores" },
            taskDurationOptions : [
                    {value : 10, name : '10min'},
                    {value : 20, name : '20min'},
                    {value : 30, name : '30min'},
                    {value : 45, name : '45min'},
                    {value : 60, name : '1hr'},
                    {value : 120, name : '2hr'},
                    {value : 180, name : '3hr'},
                    {value : 240, name : '4hr'},
                    {value : 300, name : '5hr'},
                    {value : 360, name : '6hr'}],
            taskOccuranceOptions : [
                    {value : 1, name : 'One Time'},
                    {value : 2, name : 'Daily'},
                    {value : 3, name : 'Weekly'},
                    {value : 4, name : 'Monthly'}
                ]
        }
        $scope.startingChroesBtnTxt = "Start";
        $scope.finishingChroesBtnTxt = "Conform Now";
        $scope.options = {
            animate:{
                duration:500,
                enabled:true
            },
            barColor:'red',
            scaleColor:false,
            lineWidth:20,
            lineCap:'circle',
            size: 200
        };

        // Get unsafe html
        $scope.getUnsafeHtml = function(text) {
            return $sce.trustAsHtml(text);
        }
        
        // Open add task popup
        $scope.openAddTaskPopup = function () {
            ngDialog.open({ 
                template: 'angularapp/views/_popups/add-task-popup.html',
                controller: 'TaskController',
                controllerAs: 'TaskController',
                backdrop : 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default'
            });
        }

        /*$scope.myDate = new Date();
        $scope.minDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 2,
            $scope.myDate.getDate());
        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() + 2,
            $scope.myDate.getDate());
        $scope.onlyWeekendsPredicate = function(date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        };*/
        
        // Open edit task popup
        $scope.openEditTaskPopup = function (task) {
            ngDialog.open({ 
                template: 'angularapp/views/_popups/edit-task-popup.html',
                controller: openEditTaskPopupCtrl,
                backdrop : 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default'
            });

            openEditTaskPopupCtrl.$inject = ['$scope', 'TaskService', '$stateParams'];

            function openEditTaskPopupCtrl($scope, TaskService, $stateParams) {
                $scope.selectedTask = angular.copy(task);
                    $scope.updateTaskButtonText = "Update";
                    
                    $scope.updateTask = function () {
                    $scope.isUpdateTaskWaiting = true;
                    $scope.updateTaskButtonText = "Updating";
                    TaskService.updateTask($scope.selectedTask).then(function (response) {
                        if (response.query_status == "success") {
                            $scope.updateTaskButtonText = "Updated";
                            ngDialog.close();
                            swal({   
                                type: "success",
                                title: "Success!",   
                                text: "You have successfully updated the chores.",   
                                timer: 3000,   
                                showConfirmButton: false 
                            });
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true,
                                inherit: false,
                                notify: true
                            });
                            $scope.isUpdateTaskWaiting = false;
                        }
                        else if (response.query_status == "error") {
                            swal({
                                type: "error",
                                title: "Duplicate record!",
                                text: response.message,
                                timer: 3000,
                                showConfirmButton: false
                            });
                            $scope.isUpdateTaskWaiting = false;
                            $scope.updateTaskButtonText = "Update";
                        }
                        else{
                            $scope.updateTaskButtonText = "Update";
                            $scope.isUpdateTaskWaiting = false;
                            console.log("ERROR : Failed to update Chore.")
                            console.log(response);
                            swal({   
                                type: "error",
                                title: "Failed to update chores!",   
                                text: response.message,   
                                timer: 3000,   
                                showConfirmButton: true 
                            });
                        }
                    }, function (error) {
                        $scope.updateTaskButtonText = "Update";
                        $scope.isUpdateTaskWaiting = false;
                        console.log("ERROR : Failed to update chores.")
                        console.log(error);
                        swal({   
                            type: "error",
                            title: "Failed to update chores!",   
                            text: "Something went wrong.",   
                            timer: 3000,   
                            showConfirmButton: true 
                        });
                    });
                }
            }
        }
        
        // Get all tasks
        $scope.getAllTasks = function () {
            $scope.resources.stillLoading = true;
            $scope.myTaskIds = [];

            //my task
            TaskService.getTaskAllocationByHouseId(JSON.parse($localStorage.user).house_id).then(function (response) {
                if (response.query_status == 'success') {
                    angular.forEach(response.data, function (val, index) {
                        $scope.myTaskIds.push(val.id);
                    })
                }
            }, function (error) {
                console.log("ERROR : While loading parent quizes");
                console.log(error);
            });


            TaskService.getAllTasks().then(function (response) {
                if (response.query_status == "success") {

                    angular.forEach(response.data, function (element, index) {
                        element["inHouse"] = $scope.myTaskIds.indexOf(element.id) > -1;
                    });

                    $scope.resources.allTasks = response.data;
                    $scope.resources.stillLoading = false;
                }else{
                    console.log("ERROR : Failed to load chores.");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load chores.");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }
        
        // Load Task
        $scope.loadTask = function () {
            $scope.resources.stillLoading = true;
            $scope.allocateTaskButtonText = "Assign";
            $scope.getAllHouseChildren();
            $scope.getTaskById($stateParams.id);
        }
        
        // Get Task By ID
        $scope.getTaskById = function (id) {
            TaskService.getAllTaskById(id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.current_task = response.data;

                    TaskService.getUserTaskAllocationsByTaskId(id).then(function (response) {
                        if (response.query_status == "success") {
                            $scope.resources.assignTask.value = parseInt(response.data[0].value);
                            $scope.resources.assignTask.duration = parseInt(response.data[0].duration);
                            $scope.resources.assignTask.occurance = parseInt(response.data[0].occurrence);

                            var start_date = response.data[0].start_date;
                            $scope.resources.assignTask.dt = new Date(start_date);
                            $scope.resources.assignTask.attempts = parseInt(response.data[0].attempts);
                            
                            angular.forEach(response.data, function (e, i) {
                                $scope.resources.assignTask.child_ids.push(e.child_id);
                                $scope.resources.assignTask.old_child_ids.push(e.child_id);
                            });
                            
                            $scope.isTaskAllocationUpdate = true;
                            $scope.allocateTaskUpdateButtonText = "Update";
                            $scope.resources.stillLoading = false;
                            $scope.taskNotAvailable = false;
                        }else{
                            $scope.resources.stillLoading = false;
                            $scope.taskNotAvailable = false;
                        }
                    }, function (error) {
                        $scope.resources.stillLoading = false;
                        $scope.taskNotAvailable = false;
                        $scope.resources.assignTask.dt = new Date();
                    });
                    
                    $scope.resources.stillLoading = false;
                    $scope.taskNotAvailable = false;
                }else{
                    console.log("FAIL");
                    $scope.resources.stillLoading = false;
                    console.log("ERROR : Failed to load chores.")
                    console.log(response)
                    $scope.current_task = null;
                    $scope.taskNotAvailable = true;
                }
            }, function (error) {
                console.log("ERROR : Failed to load chores.")
                console.log(error)
                $scope.current_task = null;
                $scope.resources.stillLoading = false;
                $scope.taskNotAvailable = true;
            });
        }
        
        // Get All Children in House
        $scope.getAllHouseChildren = function () {
            $scope.stillLoadingChildren = true;
            UserService.getUsersByHouseId(JSON.parse($localStorage.user).house_id).then(function (data) {
                if (data.query_status = "success") {
                    $scope.stillLoadingChildren = false;
                    $scope.allHouseChildren = data.data;
                } else {
                    // Error
                    console.log("Error : Failed to retrieve Children in house");
                    $scope.stillLoadingChildren = false;
                    console.log(data.data);
                    $scope.allHouseChildren = [];
                }
            }, function (e) {
                // Error
                console.log("Error : Failed to retrieve Children in house");
                $scope.stillLoadingChildren = false;
                console.log(e);
                $scope.allHouseChildren = [];
            });
        }
        
        // Add New Task
        $scope.addNewTask = function () {
            $scope.isAddTaskWaiting = true;
            $scope.resources.addTaskButtonText = "Saving";
            TaskService.createTask($scope.resources.newTask).then(function (response) {

                console.log("status : " + response.query_status);

                if (response.query_status == "success") {
                    console.log('came to success!!');
                    $scope.resources.addTaskButtonText = "Saved";
                    ngDialog.close();
                    swal({   
                        type: "success",
                        title: "Success!",   
                        text: "You have successfully added chores.",   
                        showConfirmButton: true
                    }, function () {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });

                    $scope.isAddTaskWaiting = false;
                }
                else if (response.query_status == "error") {
                    swal({
                        type: "error",
                        title: "Duplicate record!",
                        text: response.message,
                        showConfirmButton: true
                    }, function () {

                    });
                    $scope.isAddTaskWaiting = false;
                    $scope.resources.addTaskButtonText = "Save";
                }
                else{
                    $scope.isAddTaskWaiting = false;
                    $scope.resources.addTaskButtonText = "Save";
                    console.log("ERROR : Failed to add Chores.");
                    swal({
                        type: "error",
                        title: "Failed to create chores!",   
                        text: "Something went wrong.",   
                        showConfirmButton: true
                    }, function () {});
                }
            }, function (error) {
                $scope.isAddTaskWaiting = false;
                console.log("ERROR : Failed to add chores.")
                console.log(error);
                $scope.resources.addTaskButtonText = "Save";
                swal({   
                    type: "error",
                    title: "Failed to create chores!",   
                    text: "Something went wrong.",   
                    showConfirmButton: true
                }, function () {});
            });
        }
        
        // Delete Task
        $scope.deleteTask = function (task) {
            swal({
                title: "Are you sure?",
                text: "This will remove chores permenently.",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function(){
                TaskService.deleteUnassignTask(task).then(function (response) {

                    if (response.query_status == "success") {
                        swal({
                            type: "success",
                            title: "Success!",
                            text: "You have deleted chores successfully.",
                            showConfirmButton: false
                        },function () {
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true,
                                inherit: false,
                                notify: true
                            });
                        });

                    }else{
                        console.log("ERROR : Failed to delete Chores");
                        console.log(response.message);
                        swal({
                            type: "error",
                            title: "Failed to delete chores!",
                            text: response.message,
                            showConfirmButton: true
                        }, function (res) {
                            if (res) {
                                $state.go('parent.browseTasks');
                            }
                        });
                    }
                }, function(error){

                    console.log("ERROR : Failed to remove chores");
                    swal({
                        type: "error",
                        title: "Oops!",
                        text: "Failed to delete chores! Something went wrong.",

                        showConfirmButton: true
                    },function () {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                });
            });
        }
        
        // Create Task Allocation
        $scope.createTaskAllocation = function () {
            $scope.resources.assignTask.task_id = parseInt($stateParams.id);
            $scope.resources.assignTask.house_id = JSON.parse($localStorage.user).house_id;
            
            if ($scope.isTaskAllocationUpdate) {
                $scope.resources.assignTask.isCreate = 0;
                $scope.allocateTaskUpdateButtonText = "Updating...";
                $scope.isAllocateUpdateWaiting = true;
                $scope.resources.assignTask.new_child_ids_json = JSON.stringify($scope.resources.assignTask.new_child_ids);
                $scope.resources.assignTask.remove_child_ids_json = JSON.stringify($scope.resources.assignTask.remove_child_ids);
                $scope.resources.assignTask.child_ids_json = JSON.stringify($scope.resources.assignTask.child_ids);
                $scope.resources.assignTask.old_child_ids_json = JSON.stringify($scope.resources.assignTask.old_child_ids);
            }else{
                $scope.resources.assignTask.isCreate = 1;
                $scope.allocateTaskButtonText = "Assigning...";
                $scope.isAllocateWaiting = true;
                $scope.resources.assignTask.new_child_ids_json = JSON.stringify([]);
                $scope.resources.assignTask.remove_child_ids_json = JSON.stringify([]);
                $scope.resources.assignTask.child_ids_json = JSON.stringify($scope.resources.assignTask.child_ids);
                $scope.resources.assignTask.old_child_ids_json = JSON.stringify([]);
            }
            TaskService.createTaskAllocation($scope.resources.assignTask).then(function (response) {
                if (response.query_status == "success") {
                    if ($scope.isTaskAllocationUpdate) {
                        swal({   
                            type: "success",
                            title: "Success!",   
                            text: "You have successfully updated the assigned chores.",   
                            showConfirmButton: true 
                        },
                        function()
                        {
                            $state.go('parent.browseTasks');
                        });
                        $scope.allocateTaskUpdateButtonText = "Update";
                        $scope.isAllocateUpdateWaiting = false;
                    }else{
                        swal({   
                            type: "success",
                            title: "Success!",   
                            text: "You have successfully assigned the chores.",                                 
                            showConfirmButton: true 
                        },
                        function()
                        {
                            $state.go('parent.browseTasks');
                        });
                        $scope.allocateTaskButtonText = "Assign";
                        $scope.isAllocateWaiting = false;
                    }
                    
                    //ngDialog.closeAll();
                    // $state.transitionTo($state.current, $stateParams, {
                    //     reload: true,
                    //     inherit: false,
                    //     notify: true
                    // });

                    

                }else{
                    if ($scope.isTaskAllocationUpdate) {
                        swal({   
                            type: "error",
                            title: "Failed to update the assigned chores!",   
                            text: "Something went wrong.",   
                            timer: 3000,   
                            showConfirmButton: true 
                        });
                        $scope.allocateTaskUpdateButtonText = "Update";
                        $scope.isAllocateUpdateWaiting = false;
                    }else{
                        swal({   
                            type: "error",
                            title: "Failed to assign the chores!",   
                            text: "Something went wrong.",   
                            timer: 3000,   
                            showConfirmButton: true 
                        });
                        $scope.allocateTaskButtonText = "Assign";
                        $scope.isAllocateWaiting = false;
                    }
                }
            }, function (error) {
                console.log("ERROR : Failed to assign the Chores.");
                console.log(error);
                if ($scope.isTaskAllocationUpdate) {
                    swal({   
                        type: "error",
                        title: "Failed to update the assigned chores!",   
                        text: "Something went wrong.",   
                        timer: 3000,   
                        showConfirmButton: true 
                    });
                    $scope.allocateTaskUpdateButtonText = "Update";
                    $scope.isAllocateUpdateWaiting = false;
                }else{
                    swal({   
                        type: "error",
                        title: "Failed to assign the chores!",   
                        text: "Something went wrong.",   
                        timer: 3000,   
                        showConfirmButton: true 
                    });
                    $scope.allocateTaskButtonText = "Assign";
                    $scope.isAllocateWaiting = false;
                }
            });

            //EAR-121 Fix
            //window.location = _URLS.BASE_FOLDER+'/#/parent/tasks';  
        }
        
        // toggleUserCheckForTaskAssign
        $scope.toggleUserCheckForTaskAssign = function (userId) {
            
            if ($scope.isTaskAllocationUpdate) {
                var index1 = $scope.resources.assignTask.old_child_ids.indexOf(userId);
                if (index1 == -1) {
                    var ind = $scope.resources.assignTask.new_child_ids.indexOf(userId);
                    if (ind == -1) {
                        $scope.resources.assignTask["new_child_ids"].push(userId);
                    }else{
                        $scope.resources.assignTask.new_child_ids.splice(ind, 1);
                    }
                }else{
                    var ind2 = $scope.resources.assignTask.remove_child_ids.indexOf(userId);
                    if (ind2 == -1) {
                        $scope.resources.assignTask["remove_child_ids"].push(userId);
                    }else{
                        $scope.resources.assignTask.remove_child_ids.splice(ind, 1);
                    }
                }
                var index2 = $scope.resources.assignTask.child_ids.indexOf(userId);
                if (index2 == -1) {
                    $scope.resources.assignTask["child_ids"].push(userId);
                }else{
                    $scope.resources.assignTask.child_ids.splice(index2, 1);
                }
            }else{
                var index = $scope.resources.assignTask.child_ids.indexOf(userId);
                if (index == -1) {
                    $scope.resources.assignTask["child_ids"].push(userId);
                }else{
                    $scope.resources.assignTask.child_ids.splice(index, 1);
                }
            }
        }
        
        // Get Child Assigned tasks
        $scope.getChildAssignedTasks = function () {
            $scope.resources.stillLoading = true;
            TaskService.getChildAssignedTasks().then(function (response) {
                if (response.query_status == "success") {
                    $scope.resources.childAssignedTasks = response.data;
                    $scope.resources.stillLoading = false;
                }else{
                    console.log("ERROR : Failed to load Chores.");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load Chores.");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }
        
        // Get House assigned Tasks
        $scope.getTaskAllocationByHouseId = function () {
            $scope.resources.stillLoading = true;
            TaskService.getTaskAllocationByHouseId(JSON.parse($localStorage.user).house_id).then(function (response) {
                if(response.query_status == "success"){
                    $scope.houseAssignedTasks = response.data;
                    $scope.resources.stillLoading = false;
                }else{
                    console.log("ERROR : Failed to load house assigned Chores.");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load house assigned Chores.");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }
        
        // Get Child Finished Tasks
        $scope.getChildFinishedTask = function () {
            $scope.resources.stillLoading = true;
            TaskService.getChildFinishedTask(JSON.parse($localStorage.user).house_id).then(function (response) {
                if(response.query_status == "success"){
                    console.log("getChildFinishedTask",response.data);
                    $scope.childFinishedTasks = response.data;
                    $scope.resources.stillLoading = false;
                }else{
                    console.log("ERROR : Failed to load child finished Chores.");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load house child finished Chores.");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }
        
        // Satisfy chores
        $scope.taskSatisfication = function (chores, type) {
            $scope.satising = true;
            TaskService.satisfyChoresAttempt(chores.id, type).then(function (response) {
                if (response.query_status == "success") {
                    var msg = "";
                    if (type == 1) {
                        msg = "You have satisfied the chores successfully.";
                    }else{
                        msg = "You have unsatisfied the chores successfully.";
                    }
                    swal({   
                        type: "success",
                        title: "Success!",   
                        text: msg,   
                        timer: 3000,
                        showConfirmButton: false 
                    });
                    $scope.satising = false;
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }else{
                    $scope.satising = false;
                    if (type == 1) {
                        msg = "Failed to satisfy the chores.";
                    }else{
                        msg = "Failed to unsatisfy the chores.";
                    }
                    swal({   
                        type: "error",
                        title: "Failed!",   
                        text: msg,   
                        timer: 3000,
                        showConfirmButton: false 
                    });
                    console.log(response);
                    console.log("ERROR : Failed to satisfy the chores.");
                }
            }, function (error) {
                $scope.satising = false;
                var msg = "";
                if (type == 1) {
                    msg = "Failed to satisfy the chores.";
                }else{
                    msg = "Failed to unsatisfy the chores.";
                }
                swal({   
                    type: "error",
                    title: "Failed!",   
                    text: msg,   
                    timer: 3000,
                    showConfirmButton: false 
                });
                console.log(error);
                console.log("ERROR : Failed to satisfy the chores.");
            });
        }
        
        /*
        * Task Allocation Related Functions ----
        */
        
        // Load Child Selected Task
        $scope.loadChildSelectedTask = function () {
            $scope.taskAllocationId = $stateParams.allocation_id;
            $scope.resources.stillLoading = true;
            TaskService.getTaskByAllocationId($stateParams.allocation_id).then(function(response) {
                if (response.query_status == "success") {
                    $scope.taskData = response.data;
                    TaskService.getTaskAttemptByTaskAllocationId($stateParams.allocation_id).then(function (response) {
                        if (response.query_status == "success") {
                            $scope.currentTaskAttempt = response.data;
                            if (response.data.status != 2) {
                                var created_at = new Date(response.data.created_at);
                                var endTimeMili = new Date(created_at.setMinutes(created_at.getMinutes() + $scope.taskData.duration));
                                var current_server_time = new Date(response.data.current_server_time);
                                var diffInSec = (endTimeMili.getTime() - current_server_time.getTime())/ 1000;
                                if (diffInSec < 0) {
                                    diffInSec = 0;
                                }
                                $timeout(function () {
                                    $scope.$broadcast('timer-set-countdown', diffInSec);
                                    $scope.updateChart($scope.taskData.duration * 60, diffInSec);
                                    if (diffInSec != 0) {
                                        $scope.timerRunning = true;
                                        $scope.$broadcast('timer-start');
                                    }
                                }, 1000);
                            }
                            console.log(response.data);
                            $scope.resources.stillLoading = false;
                        }else{
                            console.log("ERROR : Failed to load chores attempt.");
                            console.log(response);
                            $scope.$broadcast('timer-set-countdown', $scope.taskData.duration * 60);
                            $scope.updateChart($scope.taskData.duration * 60, $scope.taskData.duration * 60);
                            $scope.resources.stillLoading = false;
                        }
                    }, function (error) {
                        console.log("ERROR : Failed to load chores attempt.");
                        console.log(error);
                        $scope.$broadcast('timer-set-countdown', $scope.taskData.duration * 60);
                        $scope.updateChart($scope.taskData.duration * 60, $scope.taskData.duration * 60);
                        $scope.resources.stillLoading = false;
                    });
                }else{
                    console.log("ERROR :Failed to load the chores.");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR :Failed to load the chores.");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }
        
        $scope.updateChart= function (fullDuration, restSec) {
            var val = (restSec * 100)/ fullDuration;
            $scope.$broadcast('chart-set-percentage', val);
        }

        // Start the timer
        $scope.startTask = function () {
            swal({
                title: "Are you sure you want to start this chore now?",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                closeOnConfirm: true,
                showLoaderOnConfirm: true
            }, function(confirmed) {
                if (confirmed) {
                    $scope.startingChroes = true;
                    $scope.startingChroesBtnTxt = "STARTING...";

                    $scope.attempt = {
                        child_id        : JSON.parse($localStorage.user).id,
                        task_id         : $scope.taskData.task_id,
                        allocation_id   : $stateParams.allocation_id,
                        house_id        : JSON.parse($localStorage.user).house_id
                    }
                    TaskService.createTaskAttempt($scope.attempt).then(function (response) {
                        if (response.query_status == "success") {
                            $scope.currentTaskAttempt = response.data;
                            $scope.timerRunning = true;
                            $scope.$broadcast('timer-start');
                            $scope.startingChroes = false;
                            $scope.startingChroesBtnTxt = "STARTED";
                    
                        }else{
                            console.log("ERROR : Failed to start the chroes.");
                            console.log(response);
                            $scope.startingChroes = false;
                            $scope.startingChroesBtnTxt = "START";
                            swal({   
                                type: "error",
                                title: "Failed to start the chroes!",   
                                text: "Something went wrong.",   
                                showConfirmButton: true 
                            });
                        }
                    }, function (error) {
                        console.log("ERROR : Failed to start the chroes.");
                        console.log(error);
                        $scope.startingChroes = false;
                        $scope.startingChroesBtnTxt = "START";
                        swal({   
                            type: "error",
                            title: "Failed to start the chroes!",   
                            text: "Something went wrong.",   
                            showConfirmButton: true 
                        });
                    });
                }
            });
        }
        
        // Stop the timer
        $scope.finishTask = function () {
            swal({
                title: "Are you sure you want to complete this chore?",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                closeOnConfirm: true,
                showLoaderOnConfirm: true
            }, function(confirmed) {
                if (confirmed) {
                    $scope.finishing = true;
                    $scope.finishingChroesBtnTxt = "CONFIRMING...";
                    $scope.updateAttempt = angular.copy($scope.currentTaskAttempt);
                    $scope.updateAttempt.status = 2;
                    TaskService.UpdateTaskAttempt($scope.updateAttempt).then(function (response) {
                        if (response.query_status == "success") {
                            $scope.currentTaskAttempt = response.data;
                            $scope.timerRunning = false;
                            $scope.$broadcast('timer-stop');
                            $scope.finishing = false;
                            $scope.finishingChroesBtnTxt = "FINISHED";
                            swal({   
                                type: "success",
                                title: "Success!",   
                                text: "You have completed this chore.",   
                                timer: 3000,   
                                showConfirmButton: false 
                            });
                            // Update Header Total Points
                            /*$rootScope.$broadcast("update-points", {
                                parameters: {
                                    points: parseInt($scope.taskData.value)
                                }
                            });*/
                        }else{
                            console.log("ERROR : Failed to finish the chroes.");
                            console.log(response);
                            $scope.finishing = false;
                            $scope.finishingChroesBtnTxt = "FINISH";
                            swal({   
                                type: "error",
                                title: "Failed to finish the chroes!",   
                                text: "Something went wrong.",   
                                showConfirmButton: true 
                            });
                        }
                    }, function (error) {
                        console.log("ERROR : Failed to finish the chroes.");
                        console.log(error);
                        $scope.finishing = false;
                        $scope.finishingChroesBtnTxt = "FINISH";
                        swal({   
                            type: "error",
                            title: "Failed to finish the chroes!",   
                            text: "Something went wrong.",   
                            showConfirmButton: true 
                        });
                    });
                }
            });
        }
        
        // Set count time to timer
        $scope.$on('timer-set-countdown', function (e, countdown) {
            $scope.countdown = countdown;
            $scope.$apply();
        });
        
        // update chart percentage
        $scope.$on('chart-set-percentage', function (e, val) {
            $scope.taskFinishedPercentage = parseInt(val);
        });
        
        /*$scope.$on('timer-stopped', function (event, data){
            console.log('Timer Stopped - data = ', data);
        });*/
        
        $scope.$on('timer-tick', function(event, data) {
            $scope.updateChart($scope.taskData.duration * 60, data.millis/1000);
        });
        
        /*
        * Task Attempts Related Functions ----
        */
        $scope.$broadcast('chart-set-percentage', 0);

        //Datepicker functions
        $scope.today = function() {
            $scope.resources.assignTask.dt = new Date();
        };

        $scope.clear = function() {
            $scope.resources.assignTask.dt = null;
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };

        $scope.toggleMin();
        $scope.maxDate = new Date(2020, 5, 22);

        $scope.inlineOptions = {
            customClass: getDayClass,
            //minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            //maxDate: new Date(2020, 5, 22),
            //minDate: new Date('yyyy-MM-dd'),
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
            $scope.resources.assignTask.dt = new Date(year, month, day);
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

        // $scope.limitKeypress = function ($event, value, maxLength) {
        //     if (value != undefined && value.toString().length >= maxLength) {
        //         $event.preventDefault();
        //     }
        // }


        $scope.deleteUnAssignTask = function deleteUnAssignTask(task) {
            $scope.loadingChildAssignedBadges = true;

            swal({
                title: "Delete chores.",
                text: "Would you like delete chores?",
                type: "error",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ok",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function (res) {
                if (res) {
                    TaskService.deleteUnassignTask(task).then(function (response) {
                        if (response.query_status == "success") {
                            swal({
                                type: "success",
                                title: "Success!",
                                text: "You have deleted chores successfully.",
                                showConfirmButton: true
                            },function () {
                                $state.transitionTo($state.current, $stateParams, {
                                    reload: true,
                                    inherit: false,
                                    notify: true
                                });
                            });
                        } else {
                            swal({
                                type: "error",
                                title: "Failed !",
                                text: response.message,
                                showConfirmButton: true
                            },function () {
                                $state.transitionTo($state.current, $stateParams, {
                                    reload: true,
                                    inherit: false,
                                    notify: true
                                });
                            });
                        }
                    }, function (error) {
                        console.log("ERROR : Failed to load data");
                        console.log(error);
                    });
                } else {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
            });
        }

        $scope.deleteTaskByAdmin = function deleteTaskByAdmin(task) {
            TaskService.checkTaskAllocationUsage(task.id).then(function (response) {
                console.log(response.data.count);
                if (response.data.count > 0) {
                    swal({
                        title: "Are you sure?",
                        text: "This chore is already in used",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, remove it!",
                        closeOnConfirm: true,
                        showLoaderOnConfirm: true
                    }, function(isOk) {
                        if (isOk) {
                            doDeleteTask(task);
                        }
                    });
                }else {
                    swal({
                        title: "Delete chores.",
                        text: "Would you like delete chores?",
                        type: "error",
                        showCancelButton: true,
                        cancelButtonText: "Cancel",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Ok",
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true
                    }, function (res) {
                        if (res) {
                            doDeleteTask(task);
                        } else {
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true,
                                inherit: false,
                                notify: true
                            });
                        }
                    });
                }
            }, function (error) {
                console.log("ERROR : Failed to load data");
                console.log(error);
            });
        };

        /**
         * delete task helper function
         * @param task
         */
        function doDeleteTask(task) {
            console.log("delete task");
            TaskService.deleteUnassignTask(task).then(function (response) {
                if (response.query_status == "success") {
                    swal({
                        type: "success",
                        title: "Success!",
                        text: "You have deleted chores successfully.",
                        showConfirmButton: true
                    },function () {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                } else {
                    swal({
                        type: "error",
                        title: "Failed !",
                        text: response.message,
                        showConfirmButton: true
                    },function () {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                }
            }, function (error) {
                console.log("ERROR : Failed to load data");
                console.log(error);
            });
        }

        /**
         * Reset filter properties on browse chores view
         */
        $scope.resetBrowseChoresFilters = function resetBrowseChoresFilters() {
            $scope.resources.filterBy = undefined;
            $scope.resources.searchTaskName = undefined;
        };

        /**
         * Reset filter properties on browse chores view
         */
        $scope.resetMyChoresFilters = function resetMyChoresFilters() {
            $scope.resources.searchTaskName = undefined;
        };

        /**
         * Reset filter properties on browse chores view
         */
        $scope.resetFinishChoresFilters = function resetMyChoresFilters() {
            $scope.resources.searchTaskName = undefined;
        };

        $scope.resetAdminTasksFilter = function resetAdminTasksFilter() {
            $scope.resources.searchTaskName = undefined;
        };

    }




    
//})();
})();




/*angular.module('ui.bootstrap.demo').controller('DatepickerDemoCtrl', function ($scope) {
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.options = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.options.minDate = $scope.options.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
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
});*/