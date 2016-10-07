<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div>
      <?php 
          $vs = json_decode($meta);
          $refs = '';
          foreach ($vs as $v)
          {
          // dd($v->video_id);
            $refs .= 'In '.ucfirst($v->category).' Category, Title: '.$v->video_title.' Url: https://www.youtube.com/watch?v='.$v->video_id.' <br>';
          }
      ?>
      Howdy Admin! There <?php echo (sizeof($vs)>0) ? 'are some videos that' : 'is a video that'; ?> crashed.
      <br>
      <?php echo $refs; ?>
      <br>
      Please remove <?php (sizeof($vs)>0)?'them' : 'it'; ?> from the system.
      <br>
      <br>
      <br>Have a great day!!
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