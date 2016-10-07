(function() {'use strict';
    angularEarnToLearnServices.factory('VideoService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS) {
        
        //Get all videos
        function GetAllVideos() {
            return $resource(_URLS.BASE_API + 'video' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        //Get video by id
        function GetVideoById(id) {
            return $resource(_URLS.BASE_API + 'get_video_by_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        //Get video by category id
        function GetVideoByCategoryId(id) {
            return $resource(_URLS.BASE_API + 'get_video_by_category_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        //Get video by category id for badge
        function GetVideosByCategoryId(id) {
            return $resource(_URLS.BASE_API + 'getVideosByCategoryId/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        //Get videos by title
        function GetVideosByTitle(title) {
            return $resource(_URLS.BASE_API + 'get_videos_by_title/' + title + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        //Get video by quiz id
        function GetVideoByQuizId(id) {
            return $resource(_URLS.BASE_API + 'get_video_by_quiz_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        //Create a video
        function CreateVideo(video) {
            return $resource(_URLS.BASE_API + 'video' + _URLS.TOKEN_API + $localStorage.token, {
                title           : video.title,
                description     : video.description,
                url             : video.url,
                video_id        : video.video_id,
                i_frame         : video.i_frame,
                video_ref       : video.video_ref,
                category_id	    : video.category_id,
                enable          : video.enable,
                min_age	        : lesson.min_age,
                max_age	        : lesson.max_age,
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        //Create a video
        function CreateLesson(lesson) {
            console.log('lesson');
            console.log(lesson);
            return $resource(_URLS.BASE_API + 'lesson' + _URLS.TOKEN_API + $localStorage.token, {
                title           : lesson.title,
                description     : lesson.description,
                url             : lesson.url,
                video_id        : lesson.video_id,
                i_frame         : lesson.i_frame,
                video_ref       : lesson.video_ref,
                category_id	    : lesson.category_id,
                min_age	        : lesson.min_age,
                max_age	        : lesson.max_age,
                enable          : lesson.enable,
                questions       : lesson._questions
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        //Update video
        function UpdateVideo(id, video) {
            console.log(video);
            var vobj = VideoObj(video.url);
            console.log('Video id is: '+vobj.url_id);
            return $resource(_URLS.BASE_API + 'video/' + id + _URLS.TOKEN_API + $localStorage.token, {
                title           : video.title,
                description     : video.description,
                url             : video.url,
                video_id        : vobj.url_id,
                i_frame         : video.i_frame,
                video_ref       : video.video_ref,
                category_id	    : video.category_id,
                enable          : video.enable,
                min_age	        : video.min_age,
                max_age	        : video.max_age,
                visibility      : JSON.parse($localStorage.user).role_id == 1 ? 'public' : video.visibility, 
                _method	        : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        /*** Custom Functions ***/ 
        
        // Get youtube player
        function getYtPlayer(id) {
            var ifrm = document.createElement("IFRAME");
            ifrm.setAttribute("src", "https://www.youtube.com/embed/" + id + "?rel=0&fs=1&theme=light&loop=1&showinfo=0&disablekb=1&controls=1&autohide=1");
            ifrm.setAttribute("webkitallowfullscreen", "");
            ifrm.setAttribute("mozallowfullscreen","");
            ifrm.setAttribute("allowfullscreen","");
            ifrm.setAttribute("frameborder", "0");
            ifrm.setAttribute("id", "video");
            ifrm.style.width = 1200;
            ifrm.style.height = 675;
            return ifrm.outerHTML;
        }
        
        // Get ted player
        function getTdPlayer(id) {
            var ifrm = document.createElement("IFRAME");
            ifrm.setAttribute("src", "https://embed-ssl.ted.com/talks/" + id + ".html");
            ifrm.setAttribute("webkitallowfullscreen", "");
            ifrm.setAttribute("mozallowfullscreen","");
            ifrm.setAttribute("allowfullscreen","");
            ifrm.setAttribute("frameborder", "0");
            ifrm.setAttribute("id", "video");
            ifrm.style.width = 1200;
            ifrm.style.height = 675;
            return ifrm.outerHTML;
        }
        
        // Generate Player
        function GeneratePlayer(id, type){
            if (type == "youtube") {
                return getYtPlayer(id);
            }else if (type == "ted") {
                return getTdPlayer(id);
            }else{
                return "";
            }
        }
        
        // Create video object from url
        function VideoObj(url) {
            // If url is null or empty
            if (url == undefined || url == "") { return null; }
            
            var obj = {}; // Init OBJ
            
            // try for youtube
            var youtubeRegex = /(\?v=|\/\d\/|\/embed\/|\/v\/|\.be\/)([a-zA-Z0-9\-\_]+)/;
            var result = url.match(youtubeRegex);
            if (result) { 
                obj.type = "youtube";
                obj.url = url;
                obj.url_id = result[2]; 
                obj.element = getYtPlayer(result[2]);
                return obj; 
            }

            // validate ted urls
            var ted_rex = /ted\.com\/talks\/(.+)/;
            var validate_ted_url = url.match(ted_rex);
            if (!validate_ted_url) {
                return null;
            }

            // try for ted
            var ted_re = /(?:http:\/\/)?(?:www\.)?ted.com\/([a-zA-Z0-9\-\_]+)\/([a-zA-Z0-9\-\_]+)/;
            result = url.match(ted_re);
            if (result) { 
                obj.type = "ted";
                obj.url = url;
                obj.url_id = result[2]; 
                obj.element = getTdPlayer(result[2]);
                return obj; 
            }
            return null;
        }
        
        // Get Url Id Parameter From Url
        function GetUrlIdParameterFromUrl(url) {
            
            // If url is null or empty
            if (url == undefined || url == "") { return ""; }
            
            // try for youtube
            var youtubeRegex = /(\?v=|\/\d\/|\/embed\/|\/v\/|\.be\/)([a-zA-Z0-9\-\_]+)/;
            var result = url.match(youtubeRegex);
            if (result) { return result[2]; }
            
            // try for ted
            var ted_re = /(?:http:\/\/)?(?:www\.)?ted.com\/([a-zA-Z0-9\-\_]+)\/([a-zA-Z0-9\-\_]+)/;
            result = url.match(ted_re);
            if (result) { return result[2]; }
            
            return "";
        }
        
        // Get Lesson By VideoId
        function GetLessonByVideoId(vid) {
            return $resource(_URLS.BASE_API + 'lesson/by_video/' + vid + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        return {
            getAllVideos : GetAllVideos,
            getVideoById : GetVideoById,
            getVideoByCategoryId : GetVideoByCategoryId,
            getVideosByTitle : GetVideosByTitle,
            getVideoByQuizId : GetVideoByQuizId,
            createVideo : CreateVideo,
            updateVideo : UpdateVideo,
            getUrlIdParameterFromUrl : GetUrlIdParameterFromUrl,
            generatePlayer : GeneratePlayer,
            videoObj : VideoObj,
            getVideosByCategoryId : GetVideosByCategoryId,
        };
    }]);
})();