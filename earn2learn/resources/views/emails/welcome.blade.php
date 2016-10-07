<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
  </head>
  <body>

    <div>
      Hi <?php echo $parent;?>
      <br>
      <br>
      Welcome to Eearn2Learn. To get started, please confirm your email address by clicking the link below:
      <br>
      <br>
      <a href="{{ url('/#/confirm', array($token)) }}">Click here to confirm your email address.</a>
      <br/>
      <br/>
      {{--URL: {{ url('/#/login') }}--}}
      Followings are your login Details:
      <br>
      {{--<a href="{{ url('/#/confirm', array($token)) }}">Click here to confirm your email address.</a>--}}
      Username: <?php echo $username;?>
      <br>
      Password: <?php echo $pw;?>
      <br>
      <br>
      Thanks,
      <br>
      The Earn2Learn Team
      <br>
      <br>
      <br>
      <small>
        <!--You received this email because you registered and subscribed on earntolearn.com . -->
        <!--And this can let you be informed of our updates, notifications of children, payments, etc. -->
        <!--We respect and protect your privacy well. -->
        <!--If you don't want to receive our emails, you can easily <a href="{{ url('/#/parent/configurations') }}">unsubscribe</a> here and changing configurations. -->

        You can manage the emails you receive from Earn to Learn by visiting <a href="{{ url('/#/parent/configurations') }}">Settings</a> on your account.
      </small>
    </div>
  </body>
</html>