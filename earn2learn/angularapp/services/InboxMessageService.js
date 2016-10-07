(function () {
    'use strict';
    angularEarnToLearnServices.factory('InboxMessageService', ['$http', '$state', '$resource', '$cookieStore', '$q','$rootScope', '$localStorage', '_URLS', function ($http, $state, $resource, $cookieStore, $q, $rootScope, $localStorage, _URLS) {

        //Create a message
        function CreateMessage(message) {
            console.log(message);
            return $resource(_URLS.BASE_API + 'inboxMessage' + _URLS.TOKEN_API + $localStorage.token, {
                receiver_id: message.receiver_id,
                subject: message.subject,
                message: message.message,
                status: 0,
                type: message.type,
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        //Update Message
        function UpdateMessage(messageId , message) {
            return $resource(_URLS.BASE_API + 'inboxMessage/'+messageId + _URLS.TOKEN_API + $localStorage.token, {
                    status: 1,
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'PUT',
                    isArray: false
                }
            }).query().$promise;
        }


        // Get All received message
        function GetAllReceivedMessage() {
            return $resource(_URLS.BASE_API + 'inboxMessage/getAllReceivedMessage' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get All received message by child
        function GetAllReceivedMessageByChild(childId) {
            return $resource(_URLS.BASE_API + 'inboxMessage/getAllReceivedMessageByChild/' + childId+ _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get All sent message by child
        function GetAllSentMessageByChild(childId) {
            return $resource(_URLS.BASE_API + 'inboxMessage/getAllSentMessageByChild/' + childId+ _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get All unread message
        function GetAllUnreadMessage() {
            return $resource(_URLS.BASE_API + 'inboxMessage/getAllUnreadMessage' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get All read message
        function GetAllReadMessage() {
            return $resource(_URLS.BASE_API + 'inboxMessage/getAllReadMessage' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get message by message id
        function GetMessageById(id) {
            return $resource(_URLS.BASE_API + 'inboxMessage/getMessageById/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get message by child id
        function GetMessagesByChildId(childId) {
            return $resource(_URLS.BASE_API + 'inboxMessage/getMessagesByChildId/' + childId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get message all sent id
        function GetAllSentMessages() {
            return $resource(_URLS.BASE_API + 'inboxMessage/GetAllSentMessages/' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get message all sent id
        function GetReceivedMessage(receiver_id) {
            return $resource(_URLS.BASE_API + 'inboxMessage/getReceivedMessage/' +receiver_id+ _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get message all sent id
        function GetSentMessage(sender_id) {
            return $resource(_URLS.BASE_API + 'inboxMessage/getSentMessage/' +sender_id+ _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // set message status
        function SetMessageStatus(chils_id,type) {
            return $resource(_URLS.BASE_API + 'inboxMessage/updateMessageStatus/' +chils_id + _URLS.TOKEN_API + $localStorage.token, {
                type        : type,
                _method     : "POST"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }// set message Visibility
        function SetMessageVisibility(user,chils_id) {
            return $resource(_URLS.BASE_API + 'inboxMessage/updateMessageVisibility/' +user + _URLS.TOKEN_API + $localStorage.token, {
                child:chils_id,
                _method     : "POST"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }


        // Get unseen messages count for user
        function GetUnseenMessagesCount(receiverId) {
            return $http.get(_URLS.BASE_API + 'inboxMessage/getUnseenMessagesCount/' + receiverId + _URLS.TOKEN_API + $localStorage.token);
        }

        // message receive from child
        function GetUnseenMessagesCountByChild(receiverId) {
            return $http.get(_URLS.BASE_API + 'inboxMessage/getUnseenMessagesCountByChild/' + receiverId + _URLS.TOKEN_API + $localStorage.token);
        }

        //get all child messages
        function GetMessageByChildId(childId) {
            return $http.get(_URLS.BASE_API + 'inboxMessage/getMessageByChildId/' + childId + _URLS.TOKEN_API + $localStorage.token);
        }

        //get all parent messagess
        function GetParentMessageByChildId(childId) {
            return $http.get(_URLS.BASE_API + 'inboxMessage/getParentMessageByChildId/' + childId + _URLS.TOKEN_API + $localStorage.token);
        }


        return {
            createMessage: CreateMessage,
            updateMessage: UpdateMessage,
            getAllReceivedMessage: GetAllReceivedMessage,
            getAllUnreadMessage: GetAllUnreadMessage,
            getAllReadMessage: GetAllReadMessage,
            getMessageById: GetMessageById,
            getMessagesByChildId: GetMessagesByChildId,
            getAllSentMessages: GetAllSentMessages,
            getAllReceivedMessageByChild: GetAllReceivedMessageByChild,
            getAllSentMessageByChild: GetAllSentMessageByChild,
            getReceivedMessage: GetReceivedMessage,
            getSentMessage: GetSentMessage,
            setMessageStatus: SetMessageStatus,
            setMessageVisibility: SetMessageVisibility,
            getUnseenMessagesCount: GetUnseenMessagesCount,
            getUnseenMessagesCountByChild: GetUnseenMessagesCountByChild,
            getMessageByChildId: GetMessageByChildId,
            getParentMessageByChildId: GetParentMessageByChildId,
        };
    }]);
})();