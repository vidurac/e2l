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
      Welcome to Earn2Learn. <strong><?php echo $meta['parent']?></strong> invited you to become a sponsor on Earn2Learn, please complete your account sign up by clicking the link below:
      <br>
      <br>
      <a href="{{ url('/#/sponsor-account-ready', array($token)) }}">Click here to complete your account creation.</a>
      <br>
      <br>
      Thanks,
      <br>
      The Earn2Learn Team
      <br>
      <br>
      <br>
      <small> 
      </small>
    </div>
  </body>
</html>