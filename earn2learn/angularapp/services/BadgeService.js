(function () {
    'use strict';
    angularEarnToLearnServices.factory('BadgeService', ['$http', '$state', '$resource', '$cookieStore', '$q', 'Upload', '$rootScope', '$localStorage', '_URLS', function ($http, $state, $resource, $cookieStore, $q, Upload, $rootScope, $localStorage, _URLS) {

        //Create a badge
        function CreateBadge(badge) {
            console.log(badge);
            return $resource(_URLS.BASE_API + 'badge' + _URLS.TOKEN_API + $localStorage.token, {
                name: badge.name,
                description: badge.description,
                badge_types_id: badge.badge_types_id,
                badge_image: badge.badge_image,
               /* points: badge.points,
                enable: badge.enable,*/
                category: badge.badgeCategory,
              /*  subCategory: badge.badgeSubCategory,*/
                badgeLessons: badge.badgeLessons,
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        //Update Badge
        function UpdateBadge(badgeId , badge) {

            return $resource(_URLS.BASE_API + 'badge/'+badgeId + _URLS.TOKEN_API + $localStorage.token, {
                name: badge.name,
                description: badge.description,
                badge_image: badge.badge_image,
                badge_types_id: badge.badge_types_id,
                /*points: badge.points,
                enable: badge.enable,*/
                category: badge.badgeCategory,
                subCategory: badge.badgeSubCategory,
                badgeLessons: badge.badgeLessons,
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'PUT',
                    isArray: false
                }
            }).query().$promise;
        }

        // Get All Badge type
        function GetAllBadgeType() {
            return $resource(_URLS.BASE_API + 'badgeType/getAllBadgeType' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        // Get All Badges
        function GetAllBadges() {
            return $resource(_URLS.BASE_API + 'badge/getAllBadges' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Change Badge Image
        function ChangeBadgeImage(badge_image, id, makeProgress) {
            return $q(function(resolve, reject) {
                Upload.upload({
                    url: _URLS.BASE_API + 'upload/badge/' + id + _URLS.TOKEN_API + $localStorage.token,
                    data: {
                        badge_image: badge_image
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

        // Get Badges by user id
        function GetSystemBadgesByUserId() {
            return $resource(_URLS.BASE_API + 'badge/getBadgesByUserId' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Badge by badge id
        function GetBadgeById(id) {
            return $resource(_URLS.BASE_API + 'badge/getBadgeById/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Badges by badge type id
        function GetBadgesByTypeId(typeId) {
            return $resource(_URLS.BASE_API + 'badge/getBadgesByTypeId/' + typeId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Badges by badge user
        function GetBadgesByUser() {
            return $resource(_URLS.BASE_API + 'badge/getBadgesByUser' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // check badge is existed
        function IsExisted(name) {
            return $resource(_URLS.BASE_API + 'badge/isExisted/' + name + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }


        // Get child achieve badges by childId
        /*function GetChildAchieveBadges(childId , totalPoints){

            return $resource(_URLS.BASE_API + 'badge/getChildAchieveBadges/' + _URLS.TOKEN_API + $localStorage.token, {
                childId: childId,
                totalPoints: totalPoints
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'GET',
                    isArray: false
                }
            }).get().$promise;
        }*/
        function GetChildAchieveBadges(childId){

            return $resource(_URLS.BASE_API + 'badge/getChildAchieveBadges/' + childId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }


        function GetBadgeLessons(badgeId){

            return $resource(_URLS.BASE_API + 'badge/getBadgeLessons/' + badgeId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }


        //get child badge data by child
        function GetBadgesByChild(childId,type){

            return $resource(_URLS.BASE_API + 'badge/getBadgesByChild/' + childId +'/'+type+ _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        //get
        function GetBadgeLessonsByBadgeId(badgeId){

            return $resource(_URLS.BASE_API + 'badge/getBadgeLessonsByBadgeId/' + badgeId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }


        function GetAchievedBadgesByChildId(childId){

            return $resource(_URLS.BASE_API + 'badge/getAchievedBadgesByChildId/' + childId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        function GetAchievedBadgesByChild(childId){
            return $resource(_URLS.BASE_API + 'badge/getAchievedBadgesByChild/' + childId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Delete Badge
        function DeleteBadge(badge) {
            return $resource(_URLS.BASE_API + 'badge/' + badge.id + _URLS.TOKEN_API + $localStorage.token, {
                name        : badge.name,
                enable      : 0,
                _method     : "PUT"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        return {
            createBadge: CreateBadge,
            getAllBadgeType: GetAllBadgeType,
            getAllBadges: GetAllBadges,
            getBadgesByTypeId: GetBadgesByTypeId,
            getBadgesByUser: GetBadgesByUser,
            getSystemBadgesByUserId: GetSystemBadgesByUserId,
            getBadgeById: GetBadgeById,
            deleteBadge: DeleteBadge,
            getChildAchieveBadges: GetChildAchieveBadges,
            updateBadge: UpdateBadge,
            changeBadgeImage: ChangeBadgeImage,
            isExisted: IsExisted,
            getBadgeLessons: GetBadgeLessons,
            getBadgesByChild: GetBadgesByChild,
            getBadgeLessonsByBadgeId: GetBadgeLessonsByBadgeId,
            getAchievedBadgesByChildId: GetAchievedBadgesByChildId,
            getAchievedBadgesByChild: GetAchievedBadgesByChild,
        };
    }]);
})();