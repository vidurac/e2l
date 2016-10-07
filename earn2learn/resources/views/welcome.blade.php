<!--<!DOCTYPE html>
<html>
    <head>
        <title>Earn to Learn</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 96px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="title">Earn to Learn</div>
            </div>
        </div>
    </body>
</html>-->
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" class="app" ng-app="earnToLearnApp">

<head>
    <title>Earn To Learn</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <!--Link Libraries Styles-->
    <link href="/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/bower_components/angular/angular-csp.css" rel="stylesheet" />
    <link href="/bower_components/angular-loading-bar/build/loading-bar.css" rel="stylesheet" />
    <link href="/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="/bower_components/ng-dialog/css/ngDialog.css" rel="stylesheet" />
    <link href="/bower_components/ng-dialog/css/ngDialog-theme-default.css" rel="stylesheet">
    <link href="/bower_components/ng-dialog/css/ngDialog-theme-plain.css" rel="stylesheet">
    <link href="/bower_components/sweetalert/dist/sweetalert.css" rel="stylesheet">
    <!--<link href="bower_components/angular-timer/dist/assets/css/angular-timer-bower.css" rel="stylesheet"/>-->
    <!--Link Fonts-->
    <link href="https://fonts.googleapis.com/css?family=Tangerine" rel="stylesheet" />

    <!--Include Template-->
    <!--CSS-->

    <link rel="stylesheet" href="includes/template/css/animate.css" type="text/css" />
    <link rel="stylesheet" href="includes/template/css/font.css" type="text/css" />
    <link rel="stylesheet" href="includes/template/js/calendar/bootstrap_calendar.css" type="text/css" />
    <link rel="stylesheet" href="includes/template/js/slider/slider.css" type="text/css" />
    <link rel="stylesheet" href="includes/template/js/fuelux/fuelux.css" type="text/css" />
    <link rel="stylesheet" href="includes/template/js/datepicker/datepicker.css" type="text/css" />
    <link rel="stylesheet" href="includes/template/js/select2/select2.css" type="text/css" />
    <link rel="stylesheet" href="includes/template/js/datatables/datatables.css" type="text/css" />

    <link rel="stylesheet" href="includes/css/app.css" type="text/css" />

    <!--[if lt IE 9]>
    <script src="includes/template/js/ie/html5shiv.js"></script>
    <script src="includes/template/js/ie/respond.min.js"></script>
    <script src="includes/template/js/ie/excanvas.js"></script>
    <![endif]-->

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug
         <link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">-->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!--Link Custom CSS-->
    <link href="app/views/auth/login.css" rel="stylesheet">

    <!-- Custom styles for child this template -->
    <link href="includes/child_includes/css/cus.css" rel="stylesheet" rel="stylesheet">
</head>

<body ng-controller="MainCtrl">
<section class="vbox" ui-view>
</section>

<!--Link Javascript Libraries-->
<script src="/bower_components/jquery/dist/jquery.js"></script>
<script src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/bower_components/angular/angular.min.js"></script>
<script src="/bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script src="/bower_components/angular-bootstrap-datetimepicker-directive/angular-bootstrap-datetimepicker-directive.js"></script>
<script src="/bower_components/ngstorage/ngStorage.js"></script>
<script src="/bower_components/moment/moment.js"></script>
<script src="/bower_components/moment/locale/de.js"></script>
<script src="/bower_components/angular-moment/angular-moment.min.js"></script>
<script src="/bower_components/angular-animate/angular-animate.js"></script>
<script src="/bower_components/angular-chart/angular-chart.js"></script>
<script src="/bower_components/angular-cookies/angular-cookies.js"></script>
<script src="/bower_components/angular-loading-bar/build/loading-bar.js"></script>
<script src="/bower_components/angular-resource/angular-resource.js"></script>
<script src="/bower_components/angular-sanitize/angular-sanitize.js"></script>
<script src="/bower_components/angular-storage/dist/angular-storage.js"></script>
<script src="/bower_components/underscore/underscore-min.js"></script>
<script src="/bower_components/ng-dialog/js/ngDialog.min.js"></script>
<script src="/bower_components/sweetalert/dist/sweetalert.min.js"></script>
<script src="/bower_components/angular-flot/angular-flot.js"></script>
<script src="/bower_components/ng-file-upload-shim/ng-file-upload-shim.js"></script>
<script src="/bower_components/ng-file-upload/ng-file-upload.js"></script>
<script src="/bower_components/html2canvas/build/html2canvas.js"></script>

<script type="text/javascript" src="/bower_components/humanize-duration/humanize-duration.js"></script>

<script src="/bower_components/angular-timer/dist/angular-timer.js"></script>
<!-- <script src="/bower_components/angular-timer/dist/assets/js/angular-timer-bower.js"></script>
 <script src="/bower_components/angular-timer/dist/assets/js/angular-timer-all.min.js"></script>-->
<script src="/bower_components/jquery.easy-pie-chart/dist/angular.easypiechart.js"></script>
<script src="/bower_components/angular-payments/lib/angular-payments.js"></script>
<script src="/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js"></script>
<script src="/bower_components/jquery.easy-pie-chart/dist/angular.easypiechart.js"></script>

<script src="/bower_components/angular-credit-cards/release/angular-credit-cards.js"></script>


<!--Link with payments-->
<script type="text/javascript" src="https://js.stripe.com/v2/"></script>
<script src="/bower_components/angular-stripe/release/angular-stripe.js"></script>
<script type="text/javascript">
    //Stripe.setPublishableKey('');
</script>

<!--Include Template-->
<!--JS-->
<script src="includes/template/js/app-theme.js"></script>
<script src="includes/template/js/parsley/parsley.min.js"></script>
<script src="includes/template/js/parsley/parsley.extend.js"></script>
<script src="includes/template/js/slimscroll/jquery.slimscroll.min.js"></script>
<script src="includes/template/js/slider/bootstrap-slider.js"></script>
<script src="includes/template/js/charts/easypiechart/jquery.easy-pie-chart.js"></script>
<script src="includes/template/js/charts/sparkline/jquery.sparkline.min.js"></script>
<script src="includes/template/js/charts/flot/jquery.flot.min.js"></script>
<script src="includes/template/js/charts/flot/jquery.flot.tooltip.min.js"></script>
<script src="includes/template/js/charts/flot/jquery.flot.resize.js"></script>
<script src="includes/template/js/charts/flot/jquery.flot.grow.js"></script>
<script src="includes/template/js/charts/flot/demo.js"></script>
<script src="includes/template/js/fuelux/fuelux.js"></script>
<script src="includes/template/js/datepicker/bootstrap-datepicker.js"></script>
<script src="includes/template/js/select2/select2.min.js"></script>
<script src="includes/template/js/app.plugin.js"></script>
<script src="includes/template/js/datatables/jquery.dataTables.min.js"></script>

<!-- Bootstrap ui js for popup modal-->
<script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.13.4.js"></script>
<!--<link href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">-->

<!--Link App JS-->
<script src="app/app.js"></script>
<script src="app/route.js"></script>

<!--Link Services-->
<script type="text/javascript" src="app/directives/thumbnail_directive.js"></script>
<script type="text/javascript" src="app/directives/confirm_password_directive.js"></script>


<!--Link Services-->
<script type="text/javascript" src="app/services/AuthService.js"></script>
<script type="text/javascript" src="app/services/AdminService.js"></script>
<script type="text/javascript" src="app/services/CategoryService.js"></script>
<script type="text/javascript" src="app/services/ChildService.js"></script>
<script type="text/javascript" src="app/services/HouseService.js"></script>
<script type="text/javascript" src="app/services/ParentService.js"></script>
<script type="text/javascript" src="app/services/UserService.js"></script>
<script type="text/javascript" src="app/services/VideoService.js"></script>
<script type="text/javascript" src="app/services/LessonService.js"></script>
<script type="text/javascript" src="app/services/AllocationService.js"></script>
<script type="text/javascript" src="app/services/AttemptService.js"></script>
<script type="text/javascript" src="app/services/TaskService.js"></script>
<script type="text/javascript" src="app/services/QuizService.js"></script>
<script type="text/javascript" src="app/services/GiftcardService.js"></script>
<script type="text/javascript" src="app/services/PaymentService.js"></script>
<script type="text/javascript" src="app/services/ReportService.js"></script>
<script type="text/javascript" src="app/services/BadgeService.js"></script>
<script type="text/javascript" src="app/services/BadgeAssignService.js"></script>
<script type="text/javascript" src="app/services/BundleService.js"></script>
<script type="text/javascript" src="app/services/BundleAssignService.js"></script>

<!--Link Controllers-->
<script type="text/javascript" src="app/controllers/_MainController.js"></script>
<script type="text/javascript" src="app/controllers/AuthController.js"></script>
<script type="text/javascript" src="app/controllers/AdminController.js"></script>
<script type="text/javascript" src="app/controllers/CategoryController.js"></script>
<script type="text/javascript" src="app/controllers/ChildController.js"></script>
<script type="text/javascript" src="app/controllers/HouseController.js"></script>
<script type="text/javascript" src="app/controllers/ParentController.js"></script>
<script type="text/javascript" src="app/controllers/UserController.js"></script>
<script type="text/javascript" src="app/controllers/VideoController.js"></script>
<script type="text/javascript" src="app/controllers/TaskController.js"></script>
<script type="text/javascript" src="app/controllers/LessonController.js"></script>
<script type="text/javascript" src="app/controllers/AnswerController.js"></script>
<script type="text/javascript" src="app/controllers/AttemptController.js"></script>
<script type="text/javascript" src="app/controllers/TaskController.js"></script>
<script type="text/javascript" src="app/controllers/PaymentController.js"></script>
<script type="text/javascript" src="app/controllers/GiftcardController.js"></script>
<script type="text/javascript" src="app/controllers/ReportController.js"></script>
<script type="text/javascript" src="app/controllers/BadgeController.js"></script>
<script type="text/javascript" src="app/controllers/BundleController.js"></script>

<!--Link Custom JS-->

<!--Child UI Bindings-->
<!-- Placed at the end of the document so the pages load faster -->
<!--<script src="includes/child_includes/plugin/slick-1.5.9/slick/slick.min.js"></script>-->
<script src="/bower_components/slick-carousel/slick/slick.js"></script>
<script src="/bower_components/angular-slick/dist/slick.js"></script>
<script src="includes/child_includes/js/cus.js"></script>

</body>

</html>
