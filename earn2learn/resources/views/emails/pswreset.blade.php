<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    {{--<h2>Password Reset</h2>--}}
    
    <div>
      
      Dear Parent,
      <br>
      <br>

      Password reset request has been made to your Earn To Learn account.
      To reset your password please follow the below instructions,
      <br/>
      <br/>
      Click on the below link,
      <br/>
      <a href="{{ url('/#/reset', array($token)) }}">Reset your password</a>
      <br/>
      <br/>
      If you did not request to change your password, you can ignore this message.
      <br>
      {{--If this is an accident or if you didn't request a password reset, {!! HTML::link('support', 'Let Us Know', array('class' => 'btn')) !!}. --}}
      {{--<br>--}}
      <br>
      Thanks,
      <br>
      The Earn2Learn Team
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