(function() {'use strict';
    angularEarnToLearnServices.factory('RedirectService', ['$state', function ($state) {
        
        // Assign Child To Lesson
        function go(rl) {
            if (rl == 1) {
                $state.go("admin.dashboard");
            }else if (rl == 2) {
                $state.go("parent.dashboard");
            }else if (rl == 3) {
                $state.go("child.lessons");
            }else if (rl == 5) {
                $state.go("sponsor.dashboard");
            }
        }
        
        return {
            go : go
        };
    }]);
})();