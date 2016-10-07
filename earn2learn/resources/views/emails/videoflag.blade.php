<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div>
        Hello!   
        <br>     
        <br>
        <?php echo $meta['f_name']." ".$meta['l_name'];?> has been flaged on  "<?php echo $meta['lesson'];?>" video.
        <br>
        <br>
        Flag message is:
        <br>
        " <?php echo $meta['message']; ?> "
        <br>
        <br>

        <a href="{{ url('/#/admin/lesson') }}/<?php echo $meta['id']; ?>">Click here to review this video.</a>

        <br>
        <br>
        Thanks,
        <br>
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