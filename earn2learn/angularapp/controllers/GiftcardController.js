(function() {
    'use strict';
    angularEarnToLearnControllers.controller('GiftcardController', ['$scope', '$rootScope', '$state', '$window', '$localStorage', '_URLS', 'AdminService', 'AUTH_EVENTS', 'cfpLoadingBar', 'GiftcardService', 'ngDialog', '$stateParams', 'HouseService','UserService',function($scope, $rootScope, $state, $window, $localStorage, _URLS, AdminService, AUTH_EVENTS, cfpLoadingBar, GiftcardService, ngDialog, $stateParams ,HouseService,UserService) {
        
        $scope.giftCardModel = {
            allGiftCards : [],
            giftCardValues : [5, 10, 15, 25, 50, 100, 150, 200, 250, 500],
            selectedGiftCardValue : 0
        }

        $scope.giftcard ={
            card_id: "",
            child_giftcard_id:0,
            child_id:0,
            enable:1,
            house_id:0,
            points:0,
            recipientEmail:"",
            recipientFName:"",
            recipientLName:"",
            purchaserFName:"",
            purchaserLName:"",
            purchaserEmail:"",
            purchaserCity:"",
            purchaserAddress:"",
            purchaserZipCode:"",
            purchaserState:"",
            purchaserCountry:"",
            purchaserPhone:"",
            cardNumber : 0,
            cardCvc : 0,
            cardExpirYear :0,
            cardExpirMonth:0,
            cardType:"",
        }
        $scope.searchCard='';
        
        $scope.resources = {
            stillLoading : false,
            stillProcessing: false
        }
        
        $scope.selectedCard = null;
        
        // repeat nth time ng-repeat
        $scope.getNumber = function(num) {
            return new Array(num);
        }
        
        // jsonDecodeStr
        $scope.jsonDecodeStr = function (str) {
            return JSON.parse(str);
        }
        
        $rootScope.$on('refresh-cards', function(event, data) {
            $scope.getAllGiftCards();
        });
        
        // Get All Gift cards
        $scope.getAllGiftCards = function () {
            $scope.resources.stillLoading = true;
            $scope.asignedCards = [];
            $scope.loadinAssignedCards = true;

            GiftcardService.getHouseAssignedGiftCards(JSON.parse($localStorage.user).house_id).then(function(response){
                if (response.query_status == "success") {
                    console.log(response);
                    angular.forEach(response.data, function (e, i) {
                        if (e.card_enable == 1) {
                            $scope.asignedCards.push(e.Id);
                        }
                    })
                    $scope.loadinAssignedCards = false;
                }else{
                    $scope.asignedCards = [];
                    $scope.loadinAssignedCards = false;
                }
            }, function () {
                $scope.asignedCards = [];
                $scope.loadinAssignedCards = false;
            });
            
            GiftcardService.getAllGiftCards().then(function(response){
                if (response.query_status == "success") {
                    $scope.giftCardModel.allGiftCards = JSON.parse(response.data);
                    console.log(JSON.parse(response.data));
                    $scope.resources.stillLoading = false;
                }else{
                    console.log("ERROR : Failed to load all gift cards");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load all gift cards");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }
        
        // load house assigned gift cards
        $scope.getHouseAssighedGiftCards = function () {
            $scope.resources.stillLoading = true;
            GiftcardService.getHouseAssignedGiftCards(JSON.parse($localStorage.user).house_id).then(function(response){
                if (response.query_status == "success") {
                    $scope.resources.stillLoading = false;
                    $scope.houseAssighedGiftCards = response.data;
                }else{
                    console.log("ERROR : Failed to load house assigned gift cards");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load house assigned gift cards");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }
        
        // Remove card from house
        $scope.remove = function (card) {
            swal({
                title: "Are you sure?",
                text: "Are you sure to remove this card from your house?",
                type: "info",  
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, do it!",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function(confirmed) {
                if(confirmed){
                    $scope.removing = true;
                    card.card_enable = 0;
                    GiftcardService.updateHouseAssignCard(card).then(function (response) {
                        if (response.query_status == "success") {
                            swal({   
                                type: "success",
                                title: "Success!",   
                                text: "You have removed gift card from house.",   
                                showConfirmButton: true
                            }, function () {
                                $scope.removing = false;
                                $scope.getHouseAssighedGiftCards();
                            });
                        }else{
                            console.log("ERROR : Failed to remove card.")
                            console.log(response)
                            swal({   
                                type: "error",
                                title: "Oops!",   
                                text: "Failed to removed gift card from house.",   
                                showConfirmButton: true
                            }, function () {
                                $scope.removing = false;
                            });
                        }
                    }, function (error) {
                        console.log("ERROR : Failed to remove card.")
                        console.log(error);
                        swal({   
                            type: "error",
                            title: "Oops!",   
                            text: "Failed to removed gift card from house.",   
                            showConfirmButton: true
                        }, function () {
                            $scope.removing = false;
                        });
                    });
                }
            });
        }
        
        // Assign Gift Card Popup
        $scope.assignGiftCardPopup = function (card) {
            ngDialog.open({ 
                template: 'assignGiftCardToHouseTemplate',
                backdrop : 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default',
                controller: assignGiftCartPopupCtrl
            });

            assignGiftCartPopupCtrl.$inject = ['$scope', '$rootScope', 'UserService'];

            function assignGiftCartPopupCtrl ($scope, $rootScope, UserService) {
                // assign gift cards to house
                $scope.selectedCard = card;
                $scope.selectedCard["child_id"] = [];
                $scope.giftCardModel = {
                    giftCardValues : [5, 10, 15, 25, 50, 100, 150, 200, 250, 500],
                    selectedGiftCardValue : 0
                }

                // Get All Participants in House
                $scope.getAllParticipants = function() {
                    $scope.loadingMembers = true;
                    UserService.getUsersByHouseId(JSON.parse($localStorage.user).house_id).then(function(data) {
                        if (data.query_status = "success") {
                            $scope.loadingMembers = false;
                            $scope.allHouseParticipants = data.data;
                            console.log('members', data.data);
                        }
                        else {
                            console.log("Error : Failed to retrieve participants in house");
                            console.log(data);
                            $scope.loadingMembers = false;
                            $scope.allHouseParticipants = [];
                        }
                    }, function(e) {
                        console.log("Error : Failed to retrieve participants in house");
                        console.log(e);
                        $scope.loadingMembers = false;
                        $scope.allHouseParticipants = [];
                    });
                }

                // assign card to house
                $scope.assignGiftCardToHouse = function (giftCard) {
                    var a = {
                        houseId : JSON.parse($localStorage.user).house_id,
                        value   : $scope.giftCardModel.selectedGiftCardValue,
                        Id      : giftCard.Id,
                        child_id: giftCard.child_id
                    }
                    $scope.adding = true;
                    GiftcardService.assignGiftCardToHouse(a).then(function(response){
                        if (response.query_status == "success") {
                            $scope.adding = false;
                            $rootScope.$broadcast('refresh-cards');
                            swal({
                                type: "success",
                                title: "Success!",
                                text: "You have added gift card successfully.",
                                showConfirmButton: true
                            }, function () {
                            });
                            ngDialog.close();
                        }else{
                            console.log("ERROR : Failed to assign gift cards.");
                            console.log(response);
                            $scope.adding = false;
                            swal({
                                type: "error",
                                title: "Oops!",
                                text: "Failed to assign gift cards.",
                                showConfirmButton: true
                            }, function () {

                            });
                        }
                    }, function (error) {
                        console.log("ERROR : Failed to assign gift cards.");
                        console.log(error);
                        $scope.adding = false;
                        swal({
                            type: "error",
                            title: "Oops!",
                            text: "Failed to assign gift cards.",
                            showConfirmButton: true
                        }, function () {

                        });
                    });
                }

                // Select child for assign card
                $scope.selectChild = function (id) {
                    if ($scope.selectedCard.child_id.indexOf(id) == -1) {
                        $scope.selectedCard.child_id.push(id);
                    }else{
                        var index = $scope.selectedCard.child_id.indexOf(id);
                        $scope.selectedCard.child_id.splice(index, 1);
                    }
                    console.log($scope.selectedCard.child_id);
                }
            }
        }


        // Assign Gift Card Popup
        $scope.assignGiftCardPopupBySponsor = function (card) {
            ngDialog.open({
                template: 'assignGiftCardToHouseTemplate',
                backdrop : 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default',
                controller: assignGiftCartPopupCtrl2
            });

            assignGiftCartPopupCtrl2.$inject = ['$scope', '$rootScope', 'UserService'];

            function assignGiftCartPopupCtrl2 ($scope, $rootScope, UserService) {
                // assign gift cards to house
                $scope.selectedCard = card;
                $scope.selectedCard["child_id"] = [];
                $scope.giftCardModel = {
                    giftCardValues : [5, 10, 15, 25, 50, 100, 150, 200, 250, 500],
                    selectedGiftCardValue : 0
                }

                // Get All Participants in House
                $scope.getAllParticipants = function() {
                    $scope.loadingMembers = true;
                    UserService.getAllSponsoredChildren().then(function(data) {
                        if (data.query_status = "success") {
                            $scope.loadingMembers = false;
                            $scope.allHouseParticipants = data.data;
                            console.log('members', data.data);
                        }
                        else {
                            console.log("Error : Failed to retrieve participants in house");
                            console.log(data);
                            $scope.loadingMembers = false;
                            $scope.allHouseParticipants = [];
                        }
                    }, function(e) {
                        console.log("Error : Failed to retrieve participants in house");
                        console.log(e);
                        $scope.loadingMembers = false;
                        $scope.allHouseParticipants = [];
                    });
                }

                // assign card to house
                $scope.assignGiftCardToHouse = function (giftCard) {
                    var a = {
                        houseId : JSON.parse($localStorage.user).house_id,
                        value   : $scope.giftCardModel.selectedGiftCardValue,
                        Id      : giftCard.Id,
                        child_id: giftCard.child_id,
                        sponsorId: JSON.parse($localStorage.user).id
                    };
                    console.log(giftCard);
                    console.log(a);
                    $scope.adding = true;
                    GiftcardService.assignGiftCardToHouseBySponsor(a).then(function(response){
                        if (response.query_status == "success") {
                            $scope.adding = false;
                            $rootScope.$broadcast('refresh-cards');
                            swal({
                                type: "success",
                                title: "Success!",
                                text: "You have added gift card successfully.",
                                showConfirmButton: true
                            }, function () {
                            });
                            ngDialog.close();
                        }else{
                            console.log("ERROR : Failed to assign gift cards");
                            console.log(response);
                            $scope.adding = false;
                            swal({
                                type: "error",
                                title: "Oops!",
                                text: "Failed to assign gift cards",
                                showConfirmButton: true
                            }, function () {

                            });
                        }
                    }, function (error) {
                        console.log("ERROR : Failed to assign gift cards");
                        console.log(error);
                        $scope.adding = false;
                        swal({
                            type: "error",
                            title: "Oops!",
                            text: "Failed to assign gift cards",
                            showConfirmButton: true
                        }, function () {

                        });
                    });
                };

                // Select child for assign card
                $scope.selectChild = function (id) {
                    if ($scope.selectedCard.child_id.indexOf(id) == -1) {
                        $scope.selectedCard.child_id.push(id);
                    }else{
                        var index = $scope.selectedCard.child_id.indexOf(id);
                        $scope.selectedCard.child_id.splice(index, 1);
                    }

                    console.log($scope.selectedCard.child_id);
                }
            }
        }

        // Load Child requested gift cards
        $scope.loadRequestedGiftcards = function () {
            $scope.resources.stillLoading = true;
            $scope.usr = JSON.parse($localStorage.user);
            GiftcardService.loadCardRequests(JSON.parse($localStorage.user).house_id).then(function(response){
                if (response.query_status == "success") {
                    $scope.resources.stillLoading = false;
                    $scope.requestedGiftCards = response.data;
                    // console.log('requestedGiftCards', $scope.requestedGiftCards);
                }else{
                    console.log("ERROR : Failed to load house assigned gift cards");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load house assigned gift cards");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }

        // Load Child requested gift cards from sponsor
        $scope.loadRequestedGiftCardsFromSponsor = function () {
            $scope.resources.stillLoading = true;
            $scope.usr = JSON.parse($localStorage.user);
            GiftcardService.loadChildGiftCardRequestsFromSponsor().then(function(response){
                if (response.query_status == "success") {
                    $scope.resources.stillLoading = false;
                    $scope.requestedGiftCards = response.data;
                    console.log('requestedGiftCards', $scope.requestedGiftCards);
                }else{
                    console.log("ERROR : Failed to load house assigned gift cards");
                    console.log(response);
                    $scope.resources.stillLoading = false;
                }
            }, function (error) {
                console.log("ERROR : Failed to load house assigned gift cards");
                console.log(error);
                $scope.resources.stillLoading = false;
            });
        }
        
        /*// Open Gift Card Payment Form
        $scope.openGiftCardPaymentForm = function (giftcard) {
            ngDialog.open({ 
                template: 'giftCardPaymentTemplate',
                backdrop : 'static',
                showClose: true,
                closeByDocument: false,
                closeByEscape: false,
                className: 'ngdialog-theme-default',
                controller: openGiftCardPaymentFormCrl
            });

            openGiftCardPaymentFormCrl.$inject = ['$scope', '$rootScope', 'PaymentService', '$state'];

            function openGiftCardPaymentFormCrl ($scope, $rootScope, PaymentService, $state) {
                $scope.card = {};
                $scope.selectedCard = giftcard;
                $scope.usr = JSON.parse($localStorage.user);

                // Pay gift card
                $scope.payForGiftCard = function () {
                    $scope.isAddingCcWaiting = true;
                    $scope.data = {
                        card_id         : giftcard.child_card_id
                    }
                    PaymentService.giftCardPayment($scope.data).then(function (response) {
                        if (response.query_status == "success") {
                            swal({
                                type                : "success",
                                title               : "Payment Success!",
                                text                : "You will receive your gift card via email.",
                                timer               : 3000,
                                showConfirmButton   : true
                            });

                            $scope.isAddingCcWaiting = false;
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true,
                                inherit: false,
                                notify: true
                            });
                            ngDialog.closeAll();
                        }else{
                            swal({
                                type                : "error",
                                title               : "Payment Failed!",
                                text                : "Something went wrong",
                                timer               : 3000,
                                showConfirmButton   : true
                            });
                            $scope.isAddingCcWaiting = false;
                            console.log("ERROR : Failed to payment");
                            console.log(response);
                        }
                    }, function (error) {
                        swal({
                            type                : "error",
                            title               : "Payment Failed!",
                            text                : "Something went wrong",
                            timer               : 3000,
                            showConfirmButton   : true
                        });
                        $scope.isAddingCcWaiting = false;
                        console.log("ERROR : Failed to payment");
                        console.log(error);
                    });
                }

                function stripeResponseHandler(status, response) {
                    if (response.error) {
                        swal({
                            type                : "error",
                            title               : "Payment Failed!",
                            text                : response.error.message,
                            timer               : 3000,
                            showConfirmButton   : true
                        });
                        $scope.isAddingCcWaiting = false;
                    }
                    else {
                        $scope.data = {
                            card_id         : giftcard.child_card_id
                        }
                        PaymentService.giftCardPayment($scope.data).then(function (response) {
                            swal({
                                type                : "success",
                                title               : "Payment Success!",
                                text                : "You will receive your gift card via email.",
                                timer               : 3000,
                                showConfirmButton   : true
                            });
                            ngDialog.closeAll();
                            $scope.isAddingCcWaiting = false;
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true,
                                inherit: false,
                                notify: true
                            });
                        }, function (error) {
                            swal({
                                type                : "error",
                                title               : "Payment Failed!",
                                text                : "Something went wrong",
                                timer               : 3000,
                                showConfirmButton   : true
                            });
                            $scope.isAddingCcWaiting = false;
                            console.log("ERROR : Failed to payment");
                            console.log(error);
                        });
                    }
                }

            }
        }
        */

        $scope.openGiftCardPaymentForm = function openGiftCardPaymentForm(giftcard) {
            $state.go('parent.giftcardPayment',{id:giftcard.child_giftcard_id});

        }

        $scope.loadGiftCardDetails = function loadGiftCardDetails() {
           GiftcardService.getChaildGiftCardByChildGiftCard($stateParams.id).then(function (response) {
                if (response.query_status == "success") {
                    $scope.giftcard =  response.data;
                    HouseService.getUserByHouseId(response.data.house_id).then(function (responseData) {
                        $scope.userData = responseData.data[0];

                        $scope.giftcard.purchaserFName  = $scope.userData.f_name;
                        $scope.giftcard.purchaserLName =$scope.userData.l_name;
                        $scope.giftcard.purchaserEmail = $scope.userData.email;

                        if ($scope.giftcard.sponsor_id != undefined && $scope.giftcard.sponsor_id != '') {
                            $scope.giftcard.purchaserFName  = $scope.giftcard.sponsor_first_name;
                            $scope.giftcard.purchaserLName =$scope.giftcard.sponsor_last_name;
                            $scope.giftcard.purchaserEmail = $scope.giftcard.sponsor_email;
                        }

                        $scope.countryList  =  GiftcardService.getCountryList();
                        $scope.loadStates($scope.giftcard.purchaserCountry);

                    },function (error) {
                        console.log("ERROR : Failed to reject the card.");
                        console.log(error);
                    });
                }
            }, function (error) {
                console.log("ERROR : Failed to reject the card.");
                console.log(error);
            });


        }

        $scope.payForGiftCard = function payForGiftCard(giftcard) {
            $scope.giftcard.cardType = $scope.checkPaymentCard(giftcard.cardNumber);
            $scope.resources.stillProcessing = true;
            GiftcardService.purchaseGiftCard($stateParams.id , giftcard).then(function (response) {
                if (response.query_status == "success") {
                    swal({
                        type: "success",
                        title: "Success!",
                        text: "You have paid gift card successfully.",
                        timer: 3000,
                        showConfirmButton: true
                    }, function (res) {
                        if (res) {
                            $state.go('parent.myCards');
                        }
                    });

                }

            }, function (error) {
                console.log("ERROR : Failed to reject the card.");
                console.log(error);
                swal({
                    type: "error",
                    title: "Oops!",
                    text: "Failed to paid for gift card.",
                    closeOnConfirm: true,
                    cancelButtonText: "Ok"
                }, function (res) {
                    if (res) {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    }
                });

            });

        }


        // Reject Gift Card
        $scope.rejectGiftCard = function rejectGiftCard (card) {
            swal({
                title: "Are you sure?",
                text: "Do you want reject this gift card?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                closeOnConfirm: true,
                showLoaderOnConfirm: true
            }, function(confirmed) {
                if (confirmed) {
                    $scope.rejectCardData = {
                        child_card_id   : card.child_card_id,
                        housecard_id    : card.housecard_id,
                        house_id        : JSON.parse($localStorage.user).house_id,
                        child_id        : card.child_id
                    }
                    
                    GiftcardService.rejectGiftCard($scope.rejectCardData).then(function (response) {
                        if (response.data.query_status == "success") {
                            swal({
                                type: "success",
                                title: "Success!",
                                text: "You have rejected gift card successfully.",
                                timer: 3000,
                                showConfirmButton: true
                            }, function () {
                                $state.transitionTo($state.current, $stateParams, {
                                    reload: true,
                                    inherit: false,
                                    notify: true
                                });
                            });

                        }else{
                            swal({
                                type: "error",
                                title: "Oops!",
                                text: "Failed to rejected gift card.",
                                timer: 3000,
                                showConfirmButton: false
                            });
                            console.log("ERROR : Failed to reject the card.");
                            console.log(response);
                        }
                    }, function (error) {
                        swal({   
                            type: "error",
                            title: "Oops!",   
                            text: "Failed to rejected gift card.",   
                            timer: 3000,   
                            showConfirmButton: false 
                        });
                        console.log("ERROR : Failed to reject the card.");
                        console.log(error);
                    });
                }
            });
        }

        $scope.loadStates = function (country) {
            console.log(country);
            $scope.loadingStates = true;
            $scope.state_list = GiftcardService.populateStates(country);
            $scope.loadingStates = false;
        }

        $scope.checkPaymentCard = function checkPaymentCard(number) {

            // visa
                var re = new RegExp("^4");
                if (number.match(re) != null)
                    return "Visa";

                // Mastercard
                re = new RegExp("^5[1-5]");
                if (number.match(re) != null)
                    return "Mastercard";

                // AMEX
                re = new RegExp("^3[47]");
                if (number.match(re) != null)
                    return "AMEX";

                // Discover
                re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
                if (number.match(re) != null)
                    return "Discover";

                // Diners
                re = new RegExp("^36");
                if (number.match(re) != null)
                    return "Diners";

                // JCB
                re = new RegExp("^35(2[89]|[3-8][0-9])");
                if (number.match(re) != null)
                    return "JCB";

                return "";
        }

    }]);
})();