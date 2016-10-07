angularEarnToLearnApp.directive('videoThumbnail', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        //template : '<div class="control-group"><img class="img img-responsive" src="' + video.videoId + '" /></div>',
        replace: true,
        scope : {
            //video : "=",
            getThumbUrl : function (video) {
                
                var imgSrc = "";
                if (video.videoRef == "youtube") {
                    imgSrc = "http://img.youtube.com/vi/" + video.videoId + "/0.jpg";
                }
                return imgSrc;
            }
        },
        compile: function(element, attrs)
        {
            /*var imgSrc = "";
            if (attrs.videoRef == "youtube") {
                imgSrc = "http://img.youtube.com/vi/" + attrs.videoId + "/0.jpg";
            }
            if (attrs.videoRef == "ted") {
                
            }*/
            console.log(attrs.video);
            var htmlText = '<div class="control-group"><img class="img img-responsive" ng-src="" /></div>';
            element.replaceWith(htmlText);
        }
    }
}]);