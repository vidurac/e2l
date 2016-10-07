(function() {'use strict';
    angularEarnToLearnServices.factory('TaskService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS) {
        
        // Get All Task Categories
        function GetAllTaskCategories() {
            return $resource(_URLS.BASE_API + 'taskcategory' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get All Task Categories By Id
        function GetAllTaskCategoryById(id) {
            return $resource(_URLS.BASE_API + 'taskcategory/by_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Create Task Category
        function CreateTaskCategory(category) {
            return $resource(_URLS.BASE_API + 'taskcategory' + _URLS.TOKEN_API + $localStorage.token, {
                category    : category.name,
                enable      : 1
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Update Task Category
        function UpdateTaskCategory(category) {
            return $resource(_URLS.BASE_API + 'taskcategory/' + category.id + _URLS.TOKEN_API + $localStorage.token, {
                category    : category.name,
                enable      : category.enable,
                _method     : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Get All Tasks
        function GetAllTasks() {
            return $resource(_URLS.BASE_API + 'task' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Task By Id
        function GetAllTaskById(id) {
            return $resource(_URLS.BASE_API + 'task/by_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Create Task
        function CreateTask(task) {
            return $resource(_URLS.BASE_API + 'task' + _URLS.TOKEN_API + $localStorage.token, {
                task        : task.name,
                description : task.description,
                category    : task.category_id
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Update Task
        function UpdateTask(task) {
            return $resource(_URLS.BASE_API + 'task/' + task.id + _URLS.TOKEN_API + $localStorage.token, {
                task        : task.task,
                description : task.description,
                category    : task.category,
                enable      : task.enable,
                _method     : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Delete Task
        function DeleteTask(task) {
            return $resource(_URLS.BASE_API + 'task/' + task.id + _URLS.TOKEN_API + $localStorage.token, {
                task        : task.task,
                category    : task.category,
                enable      : 0,
                _method     : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }


        // Delete Task if n
        function DeleteUnassignTask(task) {
            return $resource(_URLS.BASE_API + 'task/deleteTask/' + task.id + _URLS.TOKEN_API + $localStorage.token, {
                enable      : 0,
                _method     : "POST"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Get Today tasks
        function GetTodayTasks() {
            return $resource(_URLS.BASE_API + 'get_today_tasks' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Task By Allocation Id
        function GetTaskByAllocationId(id) {
            return $resource(_URLS.BASE_API + 'taskallocation/get_by_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Task By Id
        function GetAllocationByTaskId(id) {
            return $resource(_URLS.BASE_API + 'taskallocation/get_by_task_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get task allocation by child id
        function GetTaskAllocationByChildId(childId) {
            return $resource(_URLS.BASE_API + 'taskallocation/get_by_child_id/' + childId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Create task allocation
        function CreateTaskAllocation(taskAllocation) {
            return $resource(_URLS.BASE_API + 'taskallocation' + _URLS.TOKEN_API + $localStorage.token, {
                is_create           :   taskAllocation.isCreate,
                child_ids           :   taskAllocation.child_ids_json,
                old_child_ids       :   taskAllocation.old_child_ids_json,
                new_child_ids       :   taskAllocation.new_child_ids_json,
                remove_child_ids    :   taskAllocation.remove_child_ids_json,
		        task_id             :   taskAllocation.task_id,
                house_id            :   taskAllocation.house_id,
                //start_date          :   taskAllocation.start_date,
                start_date          :   taskAllocation.dt,
                //duration            :   taskAllocation.duration,
                occurrence          :   taskAllocation.occurance,
                attempts            :   taskAllocation.attempts,
                value               :   taskAllocation.value,
                enable              :   1
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Update task allocation
        function UpdateTaskAllocation(taskAllocation) {
            return $resource(_URLS.BASE_API + 'taskallocation/' + taskAllocation.id + _URLS.TOKEN_API + $localStorage.token, {
                child_ids    :   taskAllocation.child_ids,
		        task_id     :   taskAllocation.task_id,
                house_id    :   taskAllocation.house_id,
                start_date  :   taskAllocation.start_date,
                repeatable  :   taskAllocation.repeatable,
                duration    :   taskAllocation.duration,
                occurrence   :   taskAllocation.occurance,
                attempts    :   taskAllocation.attempts,
                value       :   taskAllocation.value,
                status      :   taskAllocation.status,
                enable      :   taskAllocation.enable,
                _method     :   'PATCH'
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Get Child Assigned Tasks
        function GetChildAssignedTasks(){
            return $resource(_URLS.BASE_API + 'task' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // GetUserTaskAllocationsByTaskId
        function GetUserTaskAllocationsByTaskId(taskId) {
            return $resource(_URLS.BASE_API + 'taskallocation/get_by_task_id/' + taskId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Task Allocation By House Id
        function GetTaskAllocationByHouseId(houseId) {
            return $resource(_URLS.BASE_API + 'task/by_house/' + houseId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Task Allocation By House Id
        function GetChildFinishedTask(houseId) {
            return $resource(_URLS.BASE_API + 'taskattempt/by_house/' + houseId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get My Assigned Tasks (For Child)
        function GetMyAssignedTasks() {
            return $resource(_URLS.BASE_API + 'taskallocation/get_my_assigned_tasks' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get by task attempt id
        function GetByTaskAttemptId(id) {
            return $resource(_URLS.BASE_API + 'taskattempt/by_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get task attempt by task id
        function GetTaskAttemptByTaskId(id) {
            return $resource(_URLS.BASE_API + 'taskattempt/by_task_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get task attempt by house id
        function GetTaskAttemptByHousId(id) {
            return $resource(_URLS.BASE_API + 'taskattempt/by_house_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get task attempt by child id
        function GetTaskAttemptByChildId(id) {
            return $resource(_URLS.BASE_API + 'taskattempt/by_child_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get task attempt by task allocation id
        function GetTaskAttemptByTaskAllocationId(id) {
            return $resource(_URLS.BASE_API + 'taskattempt/by_taskallocation_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        // Get check allocation usage by task
        function CheckTaskAllocationUsage(id) {
            return $resource(_URLS.BASE_API + 'task/checkTaskAllocationUsage/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Create Task Attempt
        function CreateTaskAttempt(taskAttempt) {
            return $resource(_URLS.BASE_API + 'taskattempt' + _URLS.TOKEN_API + $localStorage.token, {
                child_id            :   taskAttempt.child_id,
                task_id             :   taskAttempt.task_id,
                allocation_id       :   taskAttempt.allocation_id,
                house_id            :   taskAttempt.house_id,
                status              :   0,
		        enable              :   1
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Update Task Attempt
        function UpdateTaskAttempt(taskAttempt) {
            return $resource(_URLS.BASE_API + 'taskattempt/' + taskAttempt.id + _URLS.TOKEN_API + $localStorage.token, {
                child_id            : taskAttempt.child_id,
                task_id             : taskAttempt.task_id,
                allocation_id       : taskAttempt.allocation_id,
                house_id            : taskAttempt.house_id,
                status              : taskAttempt.status,
		        enable              : taskAttempt.enable,
		        _method             : 'PATCH'
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Satisfy or unsatisfy taask
        function SatisfyChoresAttempt(id, type) {
            return $resource(_URLS.BASE_API + 'taskattempt/review/' + id + _URLS.TOKEN_API + $localStorage.token, {
                status  : type
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        return {
            getAllTaskCategories                : GetAllTaskCategories,
            getAllTaskCategoryById              : GetAllTaskCategoryById,
            createTaskCategory                  : CreateTaskCategory,
            updateTaskCategory                  : UpdateTaskCategory,
            getAllTasks                         : GetAllTasks,
            getAllTaskById                      : GetAllTaskById,
            createTask                          : CreateTask,
            updateTask                          : UpdateTask,
            deleteTask                          : DeleteTask,
            getTodayTasks                       : GetTodayTasks,
            getTaskByAllocationId               : GetTaskByAllocationId,
            getAllocationByTaskId               : GetAllocationByTaskId,
            getTaskAllocationByChildId          : GetTaskAllocationByChildId,
            createTaskAllocation                : CreateTaskAllocation,
            updateTaskAllocation                : UpdateTaskAllocation,
            getChildAssignedTasks               : GetChildAssignedTasks,
            getUserTaskAllocationsByTaskId      : GetUserTaskAllocationsByTaskId,
            getTaskAllocationByHouseId          : GetTaskAllocationByHouseId,
            getMyAssignedTasks                  : GetMyAssignedTasks,
            // Task Attempt related functions
            getByTaskAttemptId                  : GetByTaskAttemptId,
            getTaskAttemptByTaskId              : GetTaskAttemptByTaskId, 
            getTaskAttemptByHousId              : GetTaskAttemptByHousId,
            getTaskAttemptByChildId             : GetTaskAttemptByChildId,
            getTaskAttemptByTaskAllocationId    : GetTaskAttemptByTaskAllocationId,
            createTaskAttempt                   : CreateTaskAttempt,
            UpdateTaskAttempt                   : UpdateTaskAttempt,
            getChildFinishedTask                : GetChildFinishedTask,
            satisfyChoresAttempt                : SatisfyChoresAttempt,
            deleteUnassignTask                  : DeleteUnassignTask,
            checkTaskAllocationUsage            : CheckTaskAllocationUsage
        };
    }]);
})();