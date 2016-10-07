angularEarnToLearnApp.directive("masonry", function($parse) {
        return {
            restrict: 'AC',
            link: function (scope, elem, attrs) {
               // elem.masonry({ itemSelector: '.masonry-brick'});
            }
        };
    })
    .directive('masonryBrick', function ($compile) {
        return {
            restrict: 'AC',
            link: function (scope, elem, attrs) {
                scope.$watch('$index',function(v){
                    elem.imagesLoaded(function () {
                        elem.parents('.masonry').masonry('reload');
                    });
                });
            }
        };
    });