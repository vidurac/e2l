(function() {
    'use strict';
    angularEarnToLearnControllers.controller('PaymentController', ['$scope', '$rootScope', '$resource', '$state', '$filter', '$window', '$localStorage', '$sce', '$stateParams', '_URLS', 'AuthService', 'HouseService', 'LessonService', 'AUTH_EVENTS', 'cfpLoadingBar', 'PaymentService', function($scope, $rootScope,$resource, $state, $filter, $window, $localStorage, $sce, $stateParams, _URLS, AuthService, HouseService, LessonService, AUTH_EVENTS, cfpLoadingBar, PaymentService) {
        $scope.card = {};
        $scope.updateFormEnable = false;
        $scope.unsubscribeBtnText = "Unsubscribe";
        $scope.subscribeBtnText = "Subscribe";
        $scope.updatePaymentsBtnText = "Update";

        
        $scope.resources = {
            stillLoading : false
        }
        if ($state.current.name == "parent.payment") {
            $scope.paymentFor = 2
        }
        
        $scope.openUpdateForm = function openUpdateForm (val) {
            $scope.updateFormEnable = val;
        }

        $scope.checkPaymentUser = function () {
            $scope.isLoadingUserDetails = true;
            $resource(_URLS.BASE_API + 'user').get({
                token: $localStorage.token
            }, function(user) {
                $scope.isLoadingUserDetails = false;
                $scope.usr = user.data;
                $scope.updateFormEnable = false;
            }, function () {
                $scope.isLoadingUserDetails = false;
            });
        }

        // Payments
        $scope.pay = function(type) {
            console.log(type);
            $scope.isAddingCcWaiting = true;
            if (type) {
                PaymentService.payment2().then(function (response) {
                    if (response.query_status == "success") {
                        swal({
                            title: "Success!",
                            text: "Payment Success.",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Ok",
                            closeOnConfirm: true,
                            showLoaderOnConfirm: false
                        }, function (res) {
                            if (res) {
                                $scope.isAddingCcWaiting = false;
                                $state.go("parent.dashboard");
                            }
                        });
                    }else{
                        swal({   
                            type                : "error",
                            title               : "Payment Failed!",   
                            text                : "Something went wrong",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Ok",
                            closeOnConfirm: true,
                            showLoaderOnConfirm: false
                        }, function (res) {
                            if (res) {
                                location.reload();
                                $scope.isAddingCcWaiting = false;
                            }
                        });
                    }
                }, function (error) {
                    swal({   
                        type                : "error",
                        title               : "Payment Failed!",   
                        text                : "Something went wrong",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true,
                        showLoaderOnConfirm: false
                    }, function (res) {
                        if (res) {
                            location.reload();
                            $scope.isAddingCcWaiting = false;
                        }
                    });
                    $scope.isAddingCcWaiting = false;
                    console.log("ERROR : Failed to payment");
                    console.log(error);
                });
            }else{
                Stripe.card.createToken({
                    number: $scope.card.number,
                    cvc: $scope.card.cvc,
                    exp_month: $scope.card.expiration.month,
                    exp_year: $scope.card.expiration.year
                }, stripeResponseHandler);
            }
        }

        function stripeResponseHandler(status, response) {
            if (response.error) {
                swal({   
                    type                : "error",
                    title               : "Payment Failed!",   
                    text                : response.error.message,
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true,
                    showLoaderOnConfirm: false
                }, function (res) {
                    if (res) {
                        location.reload();
                        $scope.isAddingCcWaiting = false;
                    }
                });
                $scope.isAddingCcWaiting = false;
            }
            else {
                $scope.data = {
                    stripe_token   : response.id,
                    type    : $scope.paymentFor
                }
                PaymentService.payment($scope.data).then(function (response) {
                    swal({
                        title: "Success!",
                        text: "Payment Success.",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true,
                        showLoaderOnConfirm: false
                    }, function (res) {
                        if (res) {
                            $scope.isAddingCcWaiting = false;
                            $state.go("parent.dashboard");
                            $scope.isAddingCcWaiting = false;
                        }
                    });
                    location.reload();
                    $state.go("parent.dashboard");

                    $scope.isAddingCcWaiting = false;
                }, function (error) {
                    swal({
                        type                : "error",
                        title               : "Payment Failed!",   
                        text                : error.data.message,
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true,
                        showLoaderOnConfirm: false
                    }, function (res) {
                        if (res) {
                            location.reload();
                            $scope.isAddingCcWaiting = false;
                        }
                    });
                    $scope.isAddingCcWaiting = false;
                    console.log("ERROR : Failed to payment");
                    console.log(error);
                });
            }
        }

        // update payment details
        $scope.updatePaymentDetails = function () {
            $scope.isAddingCcWaiting = true;
            $scope.updatePaymentsBtnText = "Updating...";
            Stripe.card.createToken({
                number: $scope.card.number,
                cvc: $scope.card.cvc,
                exp_month: $scope.card.expiration.month,
                exp_year: $scope.card.expiration.year
            }, updateStripeResponseHandler);
        }
        
        function updateStripeResponseHandler(status, response) {
            if (response.error) {
                swal({   
                    type                : "error",
                    title               : "Payment Information Updating Failed!",   
                    text                : response.error.message,
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true,
                    showLoaderOnConfirm: false
                }, function (res) {
                    if (res) {
                        $scope.isAddingCcWaiting = false;
                        $state.go("parent.dashboard");
                    }
                });
                $scope.isAddingCcWaiting = false;
                $scope.updatePaymentsBtnText = "Update";
            } else {
                $scope.data = {
                    token   : response.id
                }
                PaymentService.updatePaymentInfo($scope.data).then(function (response) {
                    swal({
                        type                : "success",
                        title               : "Payment details successfully updated!",   
                        text                : "",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true,
                        showLoaderOnConfirm: false
                    }, function (res) {
                        if (res) {
                            $scope.isAddingCcWaiting = false;
                            $state.go("parent.dashboard");
                        }
                    });
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                    $scope.updatePaymentsBtnText = "Updated";
                    $scope.isAddingCcWaiting = false;
                }, function (error) {
                    swal({   
                        type                : "error",
                        title               : "Failed to update payment details.",   
                        text                : "",   
                        showConfirmButton   : true 
                    }, function (res) {
                        if (res) {
                            location.reload();
                            $scope.isAddingCcWaiting = false;
                        }
                    });
                    $scope.updatePaymentsBtnText = "Update";
                    $scope.isAddingCcWaiting = false;
                    console.log("ERROR : Failed to update payment details");
                    console.log(error);
                });
            }
        }
        
        // Get Parent Transactions
        $scope.getParentTransactions = function () {
            $scope.transactionHistory = [];
            $scope.resources.stillLoading = true;
            PaymentService.getTransactionsByUser(JSON.parse($localStorage.user).id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.transactionHistory = response.data;
                    // $scope.transactionHistory = [];
                    $scope.resources.stillLoading = false;
                }else{
                    console.log("ERROR : Failed to load transaction history");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load transaction history");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }
        
        // Get All Transaction
        $scope.getAllTransactions = function () {
            $scope.resources.stillLoading = true;
            PaymentService.getAllTransactions().then(function (response) {
                if (response.query_status == "success") {
                    $scope.transactionHistory = response.data;
                    $scope.resources.stillLoading = false;
                }else{
                    console.log("ERROR : Failed to load transaction history");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load transaction history");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }
    
        // Render Parent Transaction Table
        $scope.renderParentTransactionTable = function () {
            var data =[];
			
            angular.forEach($scope.transactionHistory, function (value, index) {
                
    			var paymentType;
    			if (value.type == 1) {
    			    paymentType = "Giftcard Payment";
    			}else{
    			    paymentType = "Monthly Payment";
    			}
                data.push({
                    "index"         : index + 1,
                    "type"          : paymentType,
                    "charge_id"     : value.charge_id,
                    "child_name"    : value.child_name,
                    "giftcard_name" : value.giftcard,
                    "amount"        : "$" + ((value.amount)/100).toFixed(2),
                    "currency"      : value.currency.toUpperCase(),
                    "status"        : value.status == "succeeded" ? "Completed" : value.status,
                    "date"          : $filter('date')(new Date(value.created_at), "MMM dd, yyyy h:mma")
                });
            });
            console.log(data);
            jQuery("#transactionTable").dataTable({
                data: data,
                columns: [
                    {  "title": "#", data: 'index'},
                    {  "title": "Payment Type", data: 'type' },
                    {  "title": "Transaction Id", data: 'charge_id' },
                    {  "title": "Child Name", data: 'child_name' },
                    {  "title": "Giftcard Name", data: 'giftcard_name' },
                    {  "title": "Amount", data: 'amount' },
                    {  "title": "Currency", data: 'currency' },
                    {  "title": "Status", data: 'status' },
                    {  "title": "Payment Date", data: 'date' }
                ],
                "fnDrawCallback": function(oSettings) {
                    if(jQuery('table#transactionTable td').hasClass('dataTables_empty')){
                        jQuery('#transactionTable_paginate').hide();
                    } else {
                        jQuery('#transactionTable_paginate').show();
		    }	
                    if ($('#transactionTable tr').length < 11) {
                        //$('.dataTables_paginate').hide();
                    }
                }
            });
        }
        
        // Render All Transaction Table
        $scope.renderAllTransactionTable = function () {
            var data =[];

            angular.forEach($scope.transactionHistory, function (value, index) {
    			var paymentType;
    			if (value.type == 1) {
    			    paymentType = "Giftcard Payment";
    			}else{
    			    paymentType = "Monthly Payment";
    			}
                data.push({
                    "index"         : index + 1,
                    "user"          : value.f_name,
                    "user_id"       : value.user_id,
                    "type"          : paymentType,
                    "charge_id"     : value.charge_id,
                    "amount"        : "$" + ((value.amount)/100).toFixed(2),
                    "currency"      : value.currency.toUpperCase(),
                    "status"        : value.status == "succeeded" ? "Complete" : value.status,
                    "date"          : $filter('date')(new Date(value.created_at), "MMM dd, yyyy h:mma")
                });
            });

            var table = $("#transactionTable").DataTable({
                data: data,
                "columnDefs": [ {
                    "targets": [ 0,1,2,3,4,5,6,7,8 ],
                    "orderable": false
                } ],
                columns: [
                    { "title": "#", data: 'index'},
                    { "title": "User Name", data: 'user' },
                    { "title": "User Id", data: 'user_id' },
                    { "title": "Payment Type", data: 'type' },
                    { "title": "Transaction Id", data: 'charge_id' },
                    { "title": "Amount", data: 'amount' },
                    { "title": "Currency", data: 'currency' },
                    { "title": "Status", data: 'status' },
                    { "title": "Payment Date", data: 'date' }
                ],
                "fnDrawCallback": function(oSettings) {

                    if(jQuery('table#transactionTable td').hasClass('dataTables_empty')){
                        jQuery('#transactionTable_paginate').hide();
                    } else {
                        jQuery('#transactionTable_paginate').show();
                    }
                    if ($('#transactionTable tr').length < 11) {
                        //$('.dataTables_paginate').hide();
                    }
                }
            });


        }

        
        // subscribe
        $scope.subscribe = function () {
            $scope.subscribing = true;
            $scope.subscribeBtnText = "Subscribing...";
            
            PaymentService.subscription().then(function (response) {
                if (response.query_status == "success") {
                    $scope.subscribing = false;
                    $scope.subscribeBtnText = "Subscribed";
                    swal({   
                        type                : "success",
                        title               : "Payment Subscribed Successfully!",   
                        text                : "",   
                        showConfirmButton   : true 
                    });
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }else{
                    console.log("ERROR : Failed to load transaction history");
                    console.log(response);
                    $scope.subscribing = false;
                    $scope.subscribeBtnText = "Subscribe";
                    swal({   
                        type                : "error",
                        title               : "Failed to Subscribed the Payments!",   
                        text                : response.message,   
                        showConfirmButton   : true 
                    });
                }
            }, function (error) {
                console.log("ERROR : Failed to Subscribed");
                console.log(error);
                $scope.subscribing = false;
                $scope.subscribeBtnText = "Subscribe";
                swal({   
                    type                : "error",
                    title               : "Failed to Subscribed the Payments!",   
                    text                : error.data.message,
                    showConfirmButton   : true 
                });
            });
            
        }
        
        // unsubscribe
        $scope.unsubscribe = function () {
            $scope.unsubscribing = true;
            $scope.unsubscribeBtnText = "Unsubscribing...";
            
            PaymentService.cancelSubscription().then(function (response) {
                if (response.query_status == "success") {
                    $scope.unsubscribing = false;
                    $scope.unsubscribeBtnText = "Unsubscribed";
                    swal({   
                        type                : "success",
                        title               : "Payment Unsubscribed Successfully!",   
                        text                : "",   
                        showConfirmButton   : true 
                    });
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }else{
                    console.log("ERROR : Failed to load transaction history");
                    console.log(response);
                    $scope.unsubscribing = false;
                    $scope.unsubscribeBtnText = "Unsubscribe";
                    swal({   
                        type                : "error",
                        title               : "Failed to Unsubscribed the Payments!",   
                        text                : response.message,   
                        showConfirmButton   : true 
                    });
                }
            }, function (error) {
                console.log("ERROR : Failed to load transaction history");
                console.log(error);
                $scope.unsubscribing = false;
                $scope.unsubscribeBtnText = "Unsubscribe";
                swal({   
                    type                : "error",
                    title               : "Failed to Unsubscribed the Payments!",   
                    text                : response.message,   
                    showConfirmButton   : true 
                });
            });
            
            
            
        }


    }]);
})();
