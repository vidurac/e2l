<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div>
        Hi <?php echo $parent;?>,
        <br>
        <br>
        This email serves as a payment confirmation for your recent purchase on Earn2Learn for <?php echo $meta['child_f_name']?>’s $<?php echo $meta['giftcard_amount']?> gift card to <?php echo $meta['giftcard']?>.
        <br>
        <a href="{{ url('/#/parent/transactions') }}">Click here</a> to see your transaction history.
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