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
        <strong><?php echo $meta['sponsor'];?></strong> has sponsored <strong><?php echo $meta['child_f_name']." ".$meta['child_l_name'];?></strong> to watch video about <strong><?php echo $meta['lesson'];?></strong> and we’re happy to report that <strong><?php echo $meta['child_f_name']." ".$meta['child_l_name'];?></strong> has successfully watched the video and passed the test and earned <?php echo $meta['lesson_points'];?> points!
        <br>
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