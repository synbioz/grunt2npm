<?php
     $to      = 'contact@victordarras.fr';
     $subject = 'Mail de mon site :';
     $message = $_POST['message'];
     $email   = $_POST['email'];
     $headers = 'From: '. $_POST['email'] . "\r\n" .
     'Reply-To: '. $_POST['email'] . "\r\n" .
     'X-Mailer: PHP/' . phpversion();

    if ($message !== '' && $email !== '') {
        if (mail($to, $subject, $message, $headers))
          echo('ok');
        else
          echo('ko');
    }
 ?>