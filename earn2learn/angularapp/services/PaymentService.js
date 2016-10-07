(function() {'use strict';
    angularEarnToLearnServices.factory('PaymentService', ['$resource', '$localStorage', '_URLS', 'AUTH_EVENTS', function ($resource, $localStorage, _URLS, AUTH_EVENTS) {
        
        // Payment
        function Payment(data) {
            return $resource(_URLS.BASE_API + 'user/charge' + _URLS.TOKEN_API + $localStorage.token, {
                stripe_token    : data.stripe_token,
                type            : 2
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Payment
        function Payment2() {
            return $resource(_URLS.BASE_API + 'user/charge' + _URLS.TOKEN_API + $localStorage.token, {
                type            : 2
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Payment
        function GiftCardPayment(data) {
            return $resource(_URLS.BASE_API + 'giftcard/charge' + _URLS.TOKEN_API + $localStorage.token, {
                type            : 1,
                card_id         : data.card_id
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Get Transactions
        function GetAllTransactions() {
            return $resource(_URLS.BASE_API + 'payments' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Transactions By User
        function GetTransactionsByUser(id) {
            return $resource(_URLS.BASE_API + 'payments/by_user/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Update Payment Info
        function UpdatePaymentInfo(data) {
            return $resource(_URLS.BASE_API + 'user/update_card' + _URLS.TOKEN_API + $localStorage.token, {
                stripe_token    : data.token
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Subscription cancel
        function CancelSubscription() {
            return $resource(_URLS.BASE_API + 'user/subscription_close' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Subscription
        function Subscription() {
            return $resource(_URLS.BASE_API + 'user/subscription_resume' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        
        return {
            payment : Payment,
            payment2 : Payment2,
            giftCardPayment : GiftCardPayment,
            getTransactionsByUser : GetTransactionsByUser,
            getAllTransactions : GetAllTransactions,
            updatePaymentInfo : UpdatePaymentInfo,
            subscription : Subscription,
            cancelSubscription : CancelSubscription
        };
    }]);
})();