(function() {'use strict';
    angularEarnToLearnServices.factory('HouseService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS', '$q', 'Upload', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS, $q, Upload) {
        
        // Get all houses
        function GetAllHouses() {
            return $resource(_URLS.BASE_API + 'house' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Houses Full Data
        function GetHousesFullData(){
            return $resource(_URLS.BASE_API + 'get_houses_full_data' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get house by id
        function GetHouseById(id) {
            return $resource(_URLS.BASE_API + 'get_house_by_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get house by user(parent) id
        function GetHouseByParentId(id) {
            return $resource(_URLS.BASE_API + 'get_house_by_user_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Create a House
        function CreateHouse(house) {
            return $resource(_URLS.BASE_API + 'house' + _URLS.TOKEN_API + $localStorage.token, {
                name        : house.name,
                description	: house.description,
                image       : "",
                enable      : house.enable
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Update House
        function UpdateHouse(house) {
            /*return $resource(_URLS.BASE_API + 'house/' + house.id + _URLS.TOKEN_API + $localStorage.token, {
                name        : house.name,
                description	: house.description,
                image       : house.image,
                _method     : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;*/
            return $resource(_URLS.BASE_API + 'house/'+ house.id + _URLS.TOKEN_API + $localStorage.token, { 
                name        : house.name,
                description	: house.description,
                //image       : house.image,
                _method     : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': { 
                    method:'POST', 
                    isArray: false 
                }
            }).query().$promise;
        }
        
        // Change Profile Image
        function ChangeHouseImage(image, id, makeProgress) {
            return $q(function(resolve, reject) {
                Upload.upload({
                    url: _URLS.BASE_API + 'upload/house/' + id + _URLS.TOKEN_API + $localStorage.token,
                    data: {
                        image: image
                    }
                }).then(function(resp) {
                    resolve(resp);
                }, function(resp) {
                    reject(resp);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    makeProgress(progressPercentage);
                })
            });
        }
        
        // Get Email configurations by user
        function GetEmailConfigByUser(userId) {
            return $resource(_URLS.BASE_API + 'mailsubscription/by_user/' + userId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Update Email configurations by user
        function UpdateEmailConfig(config) {

            return $resource(_URLS.BASE_API + 'mailsubscription/'+ config.id + _URLS.TOKEN_API + $localStorage.token, { 
                user_id     : config.user_id,
                payment     : config.payment,
                giftcard    : config.giftcard,
                lesson      : config.lesson,
                task        : config.task,
                newsletter 	: config.newsletter,
                certificate : config.certificate,
                _method     : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': { 
                    method:'POST', 
                    isArray: false 
                }
            }).query().$promise;
        }

        //Get children by house
        function GetChildrenByHouseId($id) {
            return $resource(_URLS.BASE_API + 'getChildrenByHouseId/'+ $id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        //Get user data by house
        function GetUserByHouseId($houseId) {
            return $resource(_URLS.BASE_API + 'getUserByHouseId/'+ $houseId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        return {
            getAllHouses            : GetAllHouses,
            getHouseById            : GetHouseById,
            getHouseByParentId      : GetHouseByParentId,
            createHouse             : CreateHouse,
            updateHouse             : UpdateHouse,
            getHousesFullData       : GetHousesFullData,
            changeHouseImage        : ChangeHouseImage,
            getEmailConfigByUser    : GetEmailConfigByUser,
            updateEmailConfig       : UpdateEmailConfig,
            getChildrenByHouseId    : GetChildrenByHouseId,
            getUserByHouseId     : GetUserByHouseId,
        };
    }]);
})();