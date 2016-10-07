(function() {
    'use strict';
    angularEarnToLearnControllers.controller('VideoController', ['$scope', '$rootScope', '$state', '$window', '$localStorage', '$stateParams', '$sce', '$timeout', '_URLS', 'AuthService', 'CategoryService', 'VideoService', 'LessonService', 'ngDialog', 'AUTH_EVENTS', 'cfpLoadingBar', function($scope, $rootScope, $state, $window, $localStorage, $stateParams, $sce, $timeout, _URLS, AuthService, CategoryService, VideoService, LessonService,ngDialog, AUTH_EVENTS, cfpLoadingBar) {

        // Video Model
        $scope.VideoModel = {
            allVideos: [],
            allCategories: [],
            allCategoriesObj : {},
            subCategories : {}
        };

        // Define resources model
        $scope.resources = {
            stillLoading: true,
            stillLoadingCategories : true,
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
            newQuestionSelectedIndex: 0,
            selectedCategory_id: 0,
            addForSelectedCatedory: false,
            searchVideoName: "",
            addVideoButtonText: "Save",
            videoIframeHolder: $sce.trustAsHtml("<p class=\"text-center text-muted\" style=\"margin-top: -130px;\">Enter Youtube/Ted Video URL</p>")
        }


        //lesson category
        $scope.CategoryModel = {
            categories : [],
            users : [],
            selectedCategory : null
        };

        // Define resources model
        $scope.resources = {
            stillLoading : false,
            newCategory : {},
            searchCategoryName : "",
            addCategoryButtonText : "Save"
        }
        $scope.isAddCategoryWaiting = false;


        // Initialize
        $scope.init = function() {
            $scope.resources.stillLoading = true;
            $scope.user_role_id = JSON.parse($localStorage.user).role_id;
            $scope.getAllCategories();
            $scope.getAllVideos();
            $scope.getMainCategories();
        }

        $scope.catVisibilityFilter = function(category)
        {
            // console.log('kkk');
            // console.log(category);
            
            return true;
        }

        $scope.addedbyFilter = function(user)
        {
            if(user == "all")
            {

            }
            else if(user == "admin")
            {

            }
            else if(user == "others")
            {

            }
            else
            {
                return true;
            }
        }

        $scope.visibilityFilter = function(video)
        {
            //console.log('kkk');
            //console.log(video);
            if(video.visibility == "public")
            {
                return true;
            }

            if(video.user_id == JSON.parse($localStorage.user).id)
            {
                return true;
            }

            if(JSON.parse($localStorage.user).role_id == 1)
            {
                return true;
            }
        }

        $scope.resetFilters = function()
        {
            $scope.filterUser.type = 'all';
            $scope.filterUser.role_id = undefined;
            delete $scope.FilteredIdList;
            $scope.searchVideoName = "";

            $scope.filterByMinAge = "";
            $scope.filterByMaxAge = "";
        }

        $scope.filterUser = {type: 'all'};
        $scope.setFilterCurrentUser = function setFilterCurrentUser(type) {
            $scope.filterUser.type = type;
        };

        /**
         * Set filter role
         * @param type
         */
        $scope.setFilterOwnerRole = function setFilterOwnerRole(role_id) {
            $scope.filterUser = {
                type: 'all',
                role_id: role_id
            };
        };

        /**
         * Filter lesson by role id
         * @param lesson
         * @returns {boolean}
         */
        $scope.filterByCurrentRole = function(lesson) {
            if (undefined != $scope.filterUser.role_id && $scope.filterUser.role_id != "") {
                return $scope.filterUser.role_id == lesson.role_id;
            }else {
                return true;
            }
        };

        $scope.filterByCurrentParent = function filterByCurrentParent(video) {
            //console.log($scope.filterUser);

            if ($scope.filterUser.type == 'admin') {
                return video.user_id == JSON.parse($localStorage.user).id;
            }else if ($scope.filterUser.type == 'parent') {
                return video.user_id != JSON.parse($localStorage.user).id;
            }else {
                return true;
            }
        };
        
        // Get All Categories
        $scope.getAllCategories = function(){
            $scope.resources.stillLoadingCategories = true;
            CategoryService.getAllCategories().then(function(response) {
                if (response.query_status == "success") {
                    angular.forEach(response.data, function (e, i) {
                        $scope.VideoModel.allCategoriesObj[e.id] = e;
                        if (e.parent_cat_id != 0) {
                            if (!$scope.VideoModel.subCategories[e.parent_cat_id]) {
                                $scope.VideoModel.subCategories[e.parent_cat_id] = [];
                            }
                            $scope.VideoModel.subCategories[e.parent_cat_id].push(e);
                        }
                    });
                    $scope.VideoModel.allCategories = response.data;
                    $scope.resources.stillLoadingCategories = false;
                }else{
                    console.log("ERROR : Failed to load all categories");
                    console.log(response.message);
                    $scope.VideoModel.allCategoriesObj = {};
                    $scope.resources.stillLoadingCategories = false;
                }
            }, function(error){
                console.log("ERROR : Failed to load all categories");
                console.log(error);
                $scope.VideoModel.allCategoriesObj = {};
                $scope.resources.stillLoadingCategories = false;
            });
        }

        // Load Video
        $scope.loadVideo = function() {
            $scope.resources.stillLoading = true;
            var vid = parseInt($stateParams.id);
            VideoService.getVideoById(vid).then(function(video) {
                if (video.query_status == 'success') {
                    // on success
                    console.log(video);
                    $scope.resources.stillLoading = false;
                    $scope.cur_video = video.data;
                    $rootScope.cur_video = video.data;

                    $scope.videoTitle = $sce.trustAsHtml(video.data.title);
                    $scope.videoDescription = $sce.trustAsHtml(video.data.description);
                    // generate video iframe
                    var videoFrame = VideoService.generatePlayer(video.data.video_id, video.data.video_ref);

                    // render video html 
                    $scope.videoIframe = $sce.trustAsHtml(videoFrame);
                }
                else {
                    // on error
                    console.log("Error : Loading Video");
                    console.log(video);
                    $scope.resources.stillLoading = false;
                }
            }, function(e) {
                // on error
                console.log("Error : Loading Video");
                console.log(e);
                $scope.resources.stillLoading = false;
            });
        }
        
        // Bind All Videos
        $scope.getAllVideos = function() {
            $scope.resources.stillLoading = true;
            
            VideoService.getAllVideos().then(function(response) {
                if (response.query_status == "success") {
                    $scope.VideoModel.allVideos = response.data;
                    $scope.resources.stillLoading = false;
                }
                else {
                    $scope.VideoModel.allVideos = [];
                    $scope.resources.stillLoading = false;
                }
            }, function(error) {
                console.log("Error : Failed to load videos");
                console.log(error);
                $scope.VideoModel.allVideos = [];
                $scope.resources.stillLoading = false;
            });
        }

        // repeat nth time ng-repeat
        $scope.getNumber = function(num) {
            return new Array(num);
        }

        // Load All categories
        $scope.loadAllCategories = function() {
            CategoryService.getAllCategories().then(function(data) {
                if (data.query_status == "success") {
                    $scope.VideoModel.allCategories = data.data;
                }
                else {
                    $scope.VideoModel.allCategories = [];
                }
            }, function(e) {
                $scope.VideoModel.allCategories = [];
            });
        }

        // Get sub and main categories in video
        $scope.getMainSubCategoryNames = function (catId) {
            var cat = {};
            catId = parseInt(catId);
            var subCatObj = $scope.VideoModel.allCategoriesObj[catId];
            if (catId != 0 && subCatObj) {
                cat["sub"] = subCatObj.name;
            }
            if (subCatObj && subCatObj.parent_cat_id && subCatObj.parent_cat_id != 0 && $scope.VideoModel.allCategoriesObj[subCatObj.parent_cat_id]) {
                cat["main"] = $scope.VideoModel.allCategoriesObj[subCatObj.parent_cat_id].name;
            }
            return cat;
        }
        
        // Get Filtered ID list
        $scope.getFilteredIdList = function (catId, isMain) {
            $scope.FilteredIdList  = [];
            if (catId == null) {
                delete $scope.FilteredIdList;
            }
            if (isMain) {
                angular.forEach($scope.VideoModel.subCategories[catId], function (e, i) {
                    $scope.FilteredIdList.push(e.id);
                });
            }else{
                $scope.FilteredIdList.push(catId);
            }
        }
        
        // Lesson filter By Category id
        $scope.filterByCategory = function(lesson) {
            if (!$scope.FilteredIdList) {
                return true;
            }
            return ($scope.FilteredIdList.indexOf(lesson.category_id) !== -1);
        };


        //lesson category

        // Open Popups
        $scope.openPopup = function (popup, data) {
            switch(popup) {
                case 1:
                    // add category
                    ngDialog.open({
                        template: 'angularapp/views/_popups/add-category-popup.html',
                        controller: 'VideoController',
                        controllerAs: 'categoryCtrl',
                        backdrop : 'static',
                        showClose: true,
                        closeByDocument: false,
                        closeByEscape: false,
                        className: 'ngdialog-theme-default'
                    });
                    break;

                case 2:
                    // add video
                    ngDialog.open({
                        template: 'angularapp/views/_popups/add-video-popup.html',
                        controller: 'VideoController',
                        controllerAs: 'videoCtrl',
                        backdrop : 'static',
                        showClose: true,
                        closeByDocument: false,
                        closeByEscape: false,
                        className: 'ngdialog-theme-default'
                    });
                    break;

                case 3:
                    // edit category
                    ngDialog.open({
                        template: 'angularapp/views/_popups/edit-category-popup.html',
                        controller: editCategoryPopupCrl,
                        backdrop : 'static',
                        showClose: true,
                        closeByDocument: false,
                        closeByEscape: false,
                        className: 'ngdialog-theme-default'
                    });

            };

            editCategoryPopupCrl.$inject = ['$scope'];

            function editCategoryPopupCrl ($scope) {
                $scope.selectedCategory = angular.copy(data);
                $scope.updateCategoryButtonText = "Update";
                // Update Category
                $scope.updateCategory = function (category) {
                    

                    CategoryService.check_lessons_exist(category).then(function(response){

                        if (response.query_status == "success" && response.lessons_exit) {
                            swal({
                                title: "Are you sure?",
                                text: "This category contains allocated lessons.",
                                type: "info",
                                showCancelButton: true,
                                closeOnConfirm: false,
                                showLoaderOnConfirm: true,
                            }, function(isConfirm){
                                if(!isConfirm)
                                {
                                    return false;
                                }
                                if(isConfirm)
                                {
                                    $scope.updateCategoriesNew(category);
                                }
                            });
                        }
                        if(!response.lessons_exit)
                        {
                            $scope.updateCategoriesNew(category);
                        }
                    });                    
                }
                $scope.updateCategoriesNew = function(category)
                {
                    $scope.isUpdateCategoryWaiting = true;
                    $scope.updateCategoryButtonText = "Wait...";
                    
                    CategoryService.updateCategories(category).then(function(response){
                        if (response.query_status == "success") {
                            $scope.updateCategoryButtonText = "Updated";
                            ngDialog.close();
                            swal({
                                type: "success",
                                title: "Success!",
                                text: "You have successfully updated the category!",
                                timer: 3000,
                                showConfirmButton: false
                            });
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true,
                                inherit: false,
                                notify: true
                            });
                            $scope.isUpdateCategoryWaiting = false;
                        }else{
                            $scope.isUpdateCategoryWaiting = false;
                            $scope.updateCategoryButtonText = "Update";
                            console.log("error : " + response.message);
                            swal({
                                type: "error",
                                title: "Error!",
                                text: response.message,
                                timer: 3000,
                                showConfirmButton: true
                            });
                        }
                    }, function (error) {
                        $scope.updateCategoryButtonText = "Update";
                        $scope.isUpdateCategoryWaiting = false;
                        console.log("error : " + error.statusText);
                        swal({
                            type: "error",
                            title: "Oops!",
                            text: "Something went wrong.",
                            timer: 3000,
                            showConfirmButton: true
                        });
                    });
                }
            } //'CategoryController'
        }

        

        // Get All Main Categories
        $scope.getMainCategories = function(){
            $scope.resources.stillLoadingCategories = true;
            CategoryService.getMainCategories().then(function(response){
                if (response.query_status == "success") {
                    $scope.CategoryModel.categories = response.data;
                }else{
                    $scope.CategoryModel.categories = [];
                }
                $scope.resources.stillLoadingCategories = false;
            }, function (error) {
                console.log("error : " + error.statusText);
                $scope.resources.stillLoading = false;
            });
        }

        // Get Sub Items By Category ID
        $scope.getSubItemsByCategoryId = function (catId) {
            $scope.resources.stillLoading = true;
            CategoryService.getSubItemsByCategoryId(catId).then(function(response){
                if (response.query_status == "success") {
                    //$state.go("admin.categories");
                    if (response.data.category == null) {
                        $state.go("admin.categories");
                        return;
                    }
                    $scope.CategoryModel.selectedCategory = response.data;
                }else{
                    $scope.CategoryModel.selectedCategory = [];
                }
                $scope.resources.stillLoading = false;
            }, function (error) {
                console.log("error : " + error.statusText);
                $scope.resources.stillLoading = false;
            });
        }

        // Add new category
        $scope.addNewCategory = function () {
            $scope.isAddCategoryWaiting = true;
            var isParent = ($scope.CategoryModel.selectedCategory == null);
            $scope.resources.newCategory.parent_cat_id = 0;
            $scope.resources.newCategory.enable = 1;
            if (!isParent) {
                $scope.resources.newCategory.parent_cat_id = $scope.CategoryModel.selectedCategory.category.id;
            }
            CategoryService.addCategories($scope.resources.newCategory).then(function(response){
                if (response.query_status == "success") {
                    response.data.parent_cat_id = $scope.resources.newCategory.parent_cat_id;
                    ngDialog.close();
                    swal({
                        type: "success",
                        title: "Success!",
                        text: "You have successfully added a new category!",
                        showConfirmButton: true
                    });
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                    $scope.isAddCategoryWaiting = false;
                }else{
                    $scope.isAddCategoryWaiting = false;
                    console.log("error : " + response.message);
                    swal({
                        type: "error",
                        title: "Failed to create category!",
                        text: response.message,
                        showConfirmButton: true
                    });
                }
            }, function (error) {
                $scope.isAddCategoryWaiting = false;
                console.log("error : " + error.statusText);
                swal({
                    type: "error",
                    title: "Oops!",
                    text: "Failed to create category! Something went wrong.",
                    showConfirmButton: true
                });
            });
        }

        // Delete Category
        $scope.deleteCategory = function (category) {
            swal({
                title: "Are you sure?",
                text: "This will remove category permenently.",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function(){
                CategoryService.deleteCategory(category).then(function (response) {
                    //console.log("testing.....................");
                    //console.log(response);
                    if (response.query_status == "success") {
                        swal({
                            type: "success",
                            title: "Success!",
                            text: "You have deleted category successfully.",
                            showConfirmButton: true
                        }, function () {
                            if ($scope.CategoryModel.selectedCategory != null && $scope.CategoryModel.selectedCategory.category != null && $scope.CategoryModel.selectedCategory.category.parent_cat_id != 0) {
                                $state.go("admin.category", {id : $scope.CategoryModel.selectedCategory.category.parent_cat_id});
                            }else if ($scope.CategoryModel.selectedCategory != null && $scope.CategoryModel.selectedCategory.category != null && $scope.CategoryModel.selectedCategory.category.parent_cat_id == 0) {
                                $state.go("admin.categories");
                            }else{
                                $state.transitionTo($state.current, $stateParams, {
                                    reload: true,
                                    inherit: false,
                                    notify: true
                                });
                            }
                        });

                    }else{
                        console.log("ERROR : Failed to remove category");
                        console.log(response.message);
                        swal({
                            type: "error",
                            title: "Failed to delete category!",
                            text: response.message,
                            showConfirmButton: true
                        }, function () {
                            // do nothing
                        });
                    }
                }, function(error){
                    console.log("ERROR : Failed to remove category");
                    console.log(error);
                    swal({
                        type: "error",
                        title: "Oops!",
                        text: "Failed to delete category! Something went wrong.",
                        showConfirmButton: true
                    }, function () {
                        // do nothing
                    });
                });
            });
        }

        // Get Selected Category Name
        $scope.getSelectedCategoryName = function () {
            return $sce.trustAsHtml($scope.CategoryModel.selectedCategory.category.name);
        }

        // Get video thumbnail url
        $scope.getTedThumb = function(embed) {
            var imgSrc = "";
            if (video.video_ref == "youtube") {
                imgSrc = "http://img.youtube.com/vi/" + video.video_id + "/0.jpg";
            }
            if (video.video_ref == "ted") {

            }
            return imgSrc;
        }

        if ($stateParams.id == undefined) {
            $scope.getMainCategories();
        }else{
            if (parseInt($stateParams.id) == 0) {
                $state.go("admin.categories");
            }
            $scope.getSubItemsByCategoryId($stateParams.id);
        }
    }]);
})();