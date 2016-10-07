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
    <strong><?php echo $meta['child_f_name']." ".$meta['child_l_name'];?></strong> just completed the lesson bundle for <?php echo $meta['lesson_bundle'];?> and
    ready to earn $<?php echo $meta['gift_card_amount']; ?> <?php echo ucwords($meta['gift_card_name']); ?> gift card.
    <br>
    To approve this request, please <a href="{{ url('/#/parent/sponsored-child-cards') }}">click here</a>.
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