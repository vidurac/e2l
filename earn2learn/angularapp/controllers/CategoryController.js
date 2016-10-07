(function() {'use strict';
    angularEarnToLearnControllers.controller('CategoryController', ['$scope', '$rootScope', '$state', '$window', '$sce', '$localStorage', '$stateParams', '$timeout', '_URLS', 'AuthService', 'CategoryService', 'ngDialog', 'cfpLoadingBar', function ($scope, $rootScope, $state, $window, $sce, $localStorage, $stateParams, $timeout, _URLS, AuthService, CategoryService,ngDialog, cfpLoadingBar) {
        // AdminModal

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
        $scope.user_role_id = JSON.parse($localStorage.user).role_id;
        
        $scope.openCategory = function(subCategoryObj) {

            if(JSON.parse($localStorage.user).role_id == 1)
            {
                $state.go("admin.category", subCategoryObj);
            }
            if(JSON.parse($localStorage.user).role_id == 2)
            {
                $state.go("parent.category", subCategoryObj);
            }
            
        };
        // Open Popups
        $scope.openPopup = function (popup, data) {
            switch(popup) {
                case 1:
                // add category
                ngDialog.open({ 
                    template: 'angularapp/views/_popups/add-category-popup.html',
                    controller: 'CategoryController',
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
            $scope.resources.stillLoading = true;
            CategoryService.getMainCategories().then(function(response){
                //console.log(response);
                if (response.query_status == "success") {
                    $scope.CategoryModel.categories = response.data;
                }else{
                    $scope.CategoryModel.categories = [];
                }
                $scope.resources.stillLoading = false;
            }, function (error) {
                console.log("error : " + error.statusText);
                $scope.resources.stillLoading = false;
            });
        }
        
        // Get Sub Items By Category ID
        $scope.getSubItemsByCategoryId = function (catId) {

            $scope.resources.stillLoading = true;
            $scope.parent_cat_id = '';
            CategoryService.getSubItemsByCategoryId(catId).then(function(response){
                if (response.query_status == "success") {
                    //$state.go("admin.categories");
                    //console.log(response.data.category.parent_cat_id);
                    //console.log(response);
                    $scope.parent_cat_id = response.data.category.parent_cat_id;

                    //console.log(response.data);
                    //$scope.CategoryModel.selectedCategory.category.parent_cat_id
                    
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
                        showConfirmButton: true,
                        confirmButtonText: "OK"
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
                    timer: 3000,   
                    showConfirmButton: true 
                });
            });
        }
        
        // Delete Category
        $scope.deleteCategory = function (category) {

            //console.log($scope.CategoryModel.selectedCategory.subcategory[0].parent_cat_id);
            //return false;

            swal({   
                title: "Are you sure?",   
                text: "This will remove category permenently.",   
                type: "info",   
                showCancelButton: true,   
                closeOnConfirm: false,   
                showLoaderOnConfirm: true, 
            }, function(){   
                CategoryService.deleteCategory(category).then(function (response) {
                    if (response.query_status == "success") {
                        swal({   
                            type: "success",
                            title: "Success!",   
                            text: "You have deleted category successfully.",   
                            //timer: 3000,   
                            showConfirmButton: true,
                            closeOnConfirm : true 
                        },
                        function(){
                            if ($scope.CategoryModel.selectedCategory != null && $scope.CategoryModel.selectedCategory.subcategory[0] != null && $scope.CategoryModel.selectedCategory.subcategory[0].parent_cat_id != 0) {
                                //console.log('11111');
                                //console.log($scope.CategoryModel.selectedCategory.subcategory[0].parent_cat_id);
                                //$state.go("admin.category", {id : $scope.CategoryModel.selectedCategory.subcategory[0].parent_cat_id});
                                $scope.getSubItemsByCategoryId($scope.CategoryModel.selectedCategory.subcategory[0].parent_cat_id);
                            }else if ($scope.CategoryModel.selectedCategory != null && $scope.CategoryModel.selectedCategory.subcategory[0] != null && $scope.CategoryModel.selectedCategory.subcategory[0].parent_cat_id == 0) {
                                //console.log('22222');
                                if(JSON.parse($localStorage.user).role_id == 1)
                                {
                                    $state.go("admin.categories");
                                }
                                if(JSON.parse($localStorage.user).role_id == 2)
                                {
                                    $state.go("parent.categories");
                                }
                                
                            }else{
                                $state.transitionTo($state.current, $stateParams, {
                                    reload: true,
                                    inherit: false,
                                    notify: true
                                });
                            }
                        }
                        );
                        
                    }else{
                        console.log("ERROR : Failed to remove category");
                        console.log(response.message);
                        swal({   
                            type: "error",
                            title: "Failed to delete category!",   
                            text: response.message,   
                            timer: 3000,   
                            showConfirmButton: true 
                        });
                    }
                }, function(error){
                    console.log("ERROR : Failed to remove category");
                    console.log(error);
                    swal({   
                        type: "error",
                        title: "Oops!",   
                        text: "Failed to delete category! Something went wrong.",   
                        timer: 3000,   
                        showConfirmButton: true 
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