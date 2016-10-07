(function() {'use strict';
    angularEarnToLearnServices.factory('CategoryService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS) {
        
        //Get all categories
        function GetAllCategories() {
            return $resource(_URLS.BASE_API + 'category' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        //Get all categories for lessons
        function GetAllCategoriesForLessons() {
            return $resource(_URLS.BASE_API + 'getCategoryForLessons' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        //Get Main Categories
        function GetMainCategories() {
            return $resource(_URLS.BASE_API + 'get_main_categories' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        //Get category by id
        function GetCategoryById(id) {
            return $resource(_URLS.BASE_API + 'get_category_by_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        //Get category by name
        function GetCategoryByName(name) {
            return $resource(_URLS.BASE_API + 'get_category_by_name/' + name + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Sub Items By Category Id
        function GetSubItemsByCategoryId(id) {
            return $resource(_URLS.BASE_API + 'get_sub_items_by_category_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get lessons By Category Id
        function GetLessonsByCategoryId(id) {
            return $resource(_URLS.BASE_API + 'getLessonsByCategoryId/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Add Categories
        function AddCategories(category) {
            return $resource(_URLS.BASE_API + 'category'+ _URLS.TOKEN_API + $localStorage.token, { 
                name            : category.name, 
                parent_cat_id   : category.parent_cat_id,
                enable          : category.enable
            }, {
                fetch: 'JSONP',
                'query': { 
                    method:'POST', 
                    isArray: false 
                }
            }).query().$promise;
        }

        function check_lessons_exist(category) {
            //return $resource(_URLS.BASE_API + 'category/check_lessons_exist/'+ category.id + _URLS.TOKEN_API + $localStorage.token, { 
            return $resource(_URLS.BASE_API + 'category/check_lessons_exist/' + category.id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Update Categories
        function UpdateCategories(category) {
            return $resource(_URLS.BASE_API + 'category/'+ category.id + _URLS.TOKEN_API + $localStorage.token, { 
                name            : category.name, 
                parent_cat_id   : category.parent_id,
                _method	        : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': { 
                    method:'POST', 
                    isArray: false 
                }
            }).query().$promise;
        }
        
        // Delete Category
        function DeleteCategory(category) {
            console.log("category_id:" + category.id );
            return $resource(_URLS.BASE_API + 'category/DeleteCategory/'+ category.id + _URLS.TOKEN_API + $localStorage.token, { 
                name            : category.name, 
                parent_cat_id   : category.parent_id,
                enable          : 0
            }, {
                fetch: 'JSONP',
                'query': { 
                    method:'POST', 
                    isArray: false 
                }
            }).query().$promise;
        }
        
        return {
            getAllCategories : GetAllCategories,
            getMainCategories: GetMainCategories,
            getCategoryById: GetCategoryById,
            getCategoryByName : GetCategoryByName,
            getSubItemsByCategoryId : GetSubItemsByCategoryId,
            addCategories: AddCategories,
            updateCategories: UpdateCategories,
            deleteCategory: DeleteCategory,
            getLessonsByCategoryId: GetLessonsByCategoryId,
            GetAllCategoriesForLessons : GetAllCategoriesForLessons,
            check_lessons_exist : check_lessons_exist

        };
    }]);
})();