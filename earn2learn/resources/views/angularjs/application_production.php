<!DOCTYPE html>
<html lang="en" class="app" ng-app="earnToLearnApp">
  <head>
    <title>Earn To Learn</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="includes/images/favicon.ico" type="image/x-icon">
    <base href="/">

    <link rel="stylesheet" href="/styles.css">

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

    <script src="/vendors.js"></script>

    <script src="/angularapp.js"></script>

    <script type="text/javascript">
      $( function() {
        $( "#startdatepicker" ).datepicker();
      } );
    </script>
  </head>
  <body ng-controller="MainCtrl">
    <section class="vbox vh100" ui-view>
    </section>
    <script>
    </script>
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