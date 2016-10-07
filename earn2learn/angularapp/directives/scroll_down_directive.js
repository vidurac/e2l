angularEarnToLearnControllers.directive("scrollDown", ["$timeout", function($timeout) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            $('#box').mCustomScrollbar('scrollTo','100%');
        }
    }
}]).directive('resetOnBlur', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.bind('blur', function () {
                scope.$apply(setAnotherValue);
            });
            function setAnotherValue() {
                $noSpace=ngModel.$viewValue.replace(/\s+/g,'')
                ngModel.$setViewValue($noSpace);
                ngModel.$render();
            }
        }
    };
});