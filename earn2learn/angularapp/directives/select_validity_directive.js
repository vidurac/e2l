angularEarnToLearnApp.directive('selectValidity', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
            if (ngModelCtrl && attr.multiple) {
                ngModelCtrl.$isEmpty = function(value) {
                    return !value || value.length === 0;
                }
            }
        }
    }
});