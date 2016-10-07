<!DOCTYPE html>
<html lang="en" class="app" ng-app="earnToLearnApp">
  <head>
    <title>Earn To Learn</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="includes/images/favicon.ico" type="image/x-icon">
    <base href="/" />

    <!-- build:css(assets/) /styles.css -->
    <link href="/vendor/bootstrap/dist/css/bootstrap.css" rel="stylesheet" />
    <link href="/vendor/angular/angular-csp.css" rel="stylesheet" />
    <link href="/vendor/angular-loading-bar/build/loading-bar.css" rel="stylesheet" />
    <link href="/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="/vendor/ng-dialog/css/ngDialog.css" rel="stylesheet" />
    <link href="/vendor/ng-dialog/css/ngDialog-theme-default.css" rel="stylesheet">
    <link href="/vendor/ng-dialog/css/ngDialog-theme-plain.css" rel="stylesheet">
    <link href="/vendor/sweetalert/dist/sweetalert.css" rel="stylesheet">
    <link rel="stylesheet" href="/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css" type="text/css"/>
    <link rel="stylesheet" href="/vendor/angular-rateit/dist/ng-rateit.css" type="text/css"/>

    <link rel="stylesheet" href="/css/animate.css" type="text/css" />
    <link rel="stylesheet" href="/css/font.css" type="text/css" />
    <link rel="stylesheet" href="/js/calendar/bootstrap_calendar.css" type="text/css" />
    <link rel="stylesheet" href="/js/slider/slider.css" type="text/css" />
    <link rel="stylesheet" href="/js/fuelux/fuelux.css" type="text/css" />
    <link rel="stylesheet" href="/js/datepicker/datepicker.css" type="text/css" />
    <link rel="stylesheet" href="/js/select2/select2.css" type="text/css" />
    <link rel="stylesheet" href="/js/datatables/datatables.css" type="text/css" />
    <link rel="stylesheet" href="/js/datatables/responsive.dataTables.min.css" type="text/css" />
    <link rel="stylesheet" href="/css/child-cus.css">
    <link rel="stylesheet" href="/css/intlTelInput.css">
    <link rel="stylesheet" href="/css/app.css" type="text/css" />
    <link href="includes/child_includes/css/cus.css" rel="stylesheet" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">
    <!-- endbuild -->

    <link href="includes/child_includes/css/cus.css" rel="stylesheet" rel="stylesheet">
      
    <!--[if lt IE 9]>
    <script src="/js/ie/html5shiv.js"></script>
    <script src="/js/ie/respond.min.js"></script>
    <script src="/js/ie/excanvas.js"></script>
    <![endif]-->

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug
         <link href="/css/ie10-viewport-bug-workaround.css" rel="stylesheet">-->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="/js/html5shiv.min.js"></script>
    <script src="/js/respond.min.js"></script>
    <![endif]-->

    <script src="https://js.stripe.com/v2/"></script>

    <!-- build:js(assets/) /vendors.js -->
    <script src="/vendor/jquery/dist/jquery.js"></script>
    <script src="/vendor/intl-tel-input/build/js/intlTelInput.js"></script>
    <script src="/vendor/bootstrap/dist/js/bootstrap.js"></script>
    <script src="/vendor/jquery-bridget/jquery-bridget.js"></script>
    <script src="/vendor/ev-emitter/ev-emitter.js"></script>
    <script src="/vendor/desandro-matches-selector/matches-selector.js"></script>
    <script src="/vendor/fizzy-ui-utils/utils.js"></script>
    <script src="/vendor/get-size/get-size.js"></script>
    <script src="/vendor/outlayer/item.js"></script>
    <script src="/vendor/outlayer/outlayer.js"></script>
    <script src="/vendor/masonry/masonry.js"></script>
    <script src="/vendor/imagesloaded/imagesloaded.js"></script>
    <script src="/vendor/angular/angular.js"></script>
    <script src="/vendor/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="/vendor/angular-bootstrap-datetimepicker-directive/angular-bootstrap-datetimepicker-directive.js"></script>
    <script src="/vendor/ngstorage/ngStorage.js"></script>
    <script src="/vendor/moment/moment.js"></script>
    <script src="/vendor/moment/locale/de.js"></script>
    <script src="/vendor/angular-moment/angular-moment.js"></script>
    <script src="/vendor/angular-animate/angular-animate.js"></script>
    <script src="/vendor/angular-chart/angular-chart.js"></script>
    <script src="/vendor/angular-cookies/angular-cookies.js"></script>
    <script src="/vendor/angular-loading-bar/build/loading-bar.js"></script>
    <script src="/vendor/angular-resource/angular-resource.js"></script>
    <script src="/vendor/angular-sanitize/angular-sanitize.js"></script>
    <script src="/vendor/angular-storage/dist/angular-storage.js"></script>
    <script src="/vendor/underscore/underscore.js"></script>
    <script src="/vendor/ng-dialog/js/ngDialog.js"></script>
    <script src="/vendor/sweetalert/dist/sweetalert.min.js"></script>
    <script src="/vendor/angular-flot/angular-flot.js"></script>
    <script src="/vendor/ng-file-upload-shim/ng-file-upload-shim.js"></script>
    <script src="/vendor/ng-file-upload/ng-file-upload.js"></script>
    <script src="/vendor/html2canvas/build/html2canvas.js"></script>
    <script src="/vendor/angular-bootstrap/ui-bootstrap.js"></script>
    <script src="/vendor/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script src="/vendor/humanize-duration/humanize-duration.js"></script>
    <script src="/vendor/angular-timer/dist/angular-timer.js"></script>
    <script src="/vendor/jquery.easy-pie-chart/dist/angular.easypiechart.js"></script>
    <script src="/vendor/angular-payments/lib/angular-payments.js"></script>
    <script src="/vendor/jquery.easy-pie-chart/dist/jquery.easypiechart.js"></script>
    <script src="/vendor/jquery.easy-pie-chart/dist/angular.easypiechart.js"></script>
    <script src="/vendor/angular-stripe/release/angular-stripe.js"></script>
    <script src="/vendor/angular-credit-cards/release/angular-credit-cards.js"></script>
    <script src="/vendor/slick-carousel/slick/slick.js"></script>
    <script src="/vendor/angular-slick/dist/slick.js"></script>
    <script src="/vendor/angular-messages/angular-messages.js"></script>
    <script src="/vendor/angular-filter/dist/angular-filter.js"></script>
    <script src="/vendor/angular-masonry/angular-masonry.js"></script>
    <script src="/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"></script>
    <script src="/vendor/ng-scrollbars/dist/scrollbars.min.js"></script>
    <script src="/vendor/intl-tel-input/lib/libphonenumber/build/utils.js"></script>
    <script src="/vendor/international-phone-number/releases/international-phone-number.js"></script>
    <script src="/vendor/angular-rateit/dist/ng-rateit.js"></script>

    <script src="/js/app-theme.js"></script>
    <script src="/js/parsley/parsley.min.js"></script>
    <script src="/js/parsley/parsley.extend.js"></script>
    <script src="/js/slimscroll/jquery.slimscroll.min.js"></script>
    <script src="/js/slider/bootstrap-slider.js"></script>
    <script src="/js/charts/easypiechart/jquery.easy-pie-chart.js"></script>
    <script src="/js/charts/sparkline/jquery.sparkline.min.js"></script>
    <script src="/js/charts/flot/jquery.flot.min.js"></script>
    <script src="/js/charts/flot/jquery.flot.tooltip.min.js"></script>
    <script src="/js/charts/flot/jquery.flot.resize.js"></script>
    <script src="/js/charts/flot/jquery.flot.grow.js"></script>
    <script src="/js/charts/flot/demo.js"></script>
    <script src="/js/fuelux/fuelux.js"></script>
    <script src="/js/datepicker/bootstrap-datepicker.js"></script>
    <script src="/js/select2/select2.min.js"></script>
    <script src="/js/app.plugin.js"></script>
    <script src="/js/datatables/jquery.dataTables.min.js"></script>
    <script src="/js/datatables/dataTables.responsive.min.js"></script>
    <script src="/js/lazy-scroll.js"></script>

    <!-- endbuild -->

    <!-- build:js /angularapp.js -->
    <script type="text/javascript" src="/angularapp/app.js"></script>
    <script type="text/javascript" src="/angularapp/route.js"></script>
    <script type="text/javascript" src="/angularapp/directives/thumbnail_directive.js"></script>
    <script type="text/javascript" src="/angularapp/directives/confirm_password_directive.js"></script>
    <script type="text/javascript" src="/angularapp/directives/notifications-list.js"></script>
    <script type="text/javascript" src="/angularapp/directives/select_validity_directive.js"></script>
    <script type="text/javascript" src="/angularapp/directives/scroll_down_directive.js"></script>
<!--    <script type="text/javascript" src="/angularapp/directives/masonry_directive.js"></script>-->
    <script type="text/javascript" src="/angularapp/services/RedirectService.js"></script>
    <script type="text/javascript" src="/angularapp/services/AuthService.js"></script>
    <script type="text/javascript" src="/angularapp/services/AdminService.js"></script>
    <script type="text/javascript" src="/angularapp/services/CategoryService.js"></script>
    <script type="text/javascript" src="/angularapp/services/ChildService.js"></script>
    <script type="text/javascript" src="/angularapp/services/HouseService.js"></script>
    <script type="text/javascript" src="/angularapp/services/ParentService.js"></script>
    <script type="text/javascript" src="/angularapp/services/UserService.js"></script>
    <script type="text/javascript" src="/angularapp/services/VideoService.js"></script>
    <script type="text/javascript" src="/angularapp/services/LessonService.js"></script>
    <script type="text/javascript" src="/angularapp/services/AllocationService.js"></script>
    <script type="text/javascript" src="/angularapp/services/AttemptService.js"></script>
    <script type="text/javascript" src="/angularapp/services/TaskService.js"></script>
    <script type="text/javascript" src="/angularapp/services/QuizService.js"></script>
    <script type="text/javascript" src="/angularapp/services/GiftcardService.js"></script>
    <script type="text/javascript" src="/angularapp/services/PaymentService.js"></script>
    <script type="text/javascript" src="/angularapp/services/ReportService.js"></script>
    <script type="text/javascript" src="/angularapp/services/BadgeService.js"></script>
    <script type="text/javascript" src="/angularapp/services/BundleAssignService.js"></script>
    <script type="text/javascript" src="/angularapp/services/BadgeAssignService.js"></script>
    <script type="text/javascript" src="/angularapp/services/BundleService.js"></script>
    <script type="text/javascript" src="/angularapp/services/InboxMessageService.js"></script>
    <script type="text/javascript" src="/angularapp/services/NotificationService.js"></script>
    <script type="text/javascript" src="/angularapp/services/SponsorService.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/_MainController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/AuthController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/AdminController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/CategoryController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/ChildController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/HouseController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/ParentController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/UserController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/VideoController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/TaskController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/LessonController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/AnswerController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/AttemptController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/TaskController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/PaymentController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/GiftcardController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/ReportController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/BadgeController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/BundleController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/InboxMessageController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/ParentRootController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/SponsorController.js"></script>
    <script type="text/javascript" src="/angularapp/controllers/LessonBundleController.js"></script>
    <!-- endbuild -->

    <script type="text/javascript">
      $( function() {
        $( "#startdatepicker" ).datepicker();
      } );
    </script>
  </head>
  <body ng-controller="MainCtrl">
    <section class="vbox vh100" ui-view>
    </section>
    <!-- process:template
    <script>
    </script>
    /process -->
    <script type="text/javascript">
      var cb = function () {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = 'https://fonts.googleapis.com/css?family=Tangerine';
        var h = document.getElementsByTagName('head')[0];
        h.parentNode.insertBefore(l, h);
      };
      var raf = requestAnimationFrame || mozRequestAnimationFrame ||
          webkitRequestAnimationFrame || msRequestAnimationFrame;
      if (raf) raf(cb);
      else window.addEventListener('load', cb);





    </script>
  </body>
</html>
