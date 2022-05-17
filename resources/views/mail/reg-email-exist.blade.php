@include('mail.components.mail-header')
<p>We've notice you already an account with us, click on the link below to reset your password or discard this email if you did not made this request.</p> 
<p>Please note, for security reasons this link will expiry in 1 hour from the time of this email.</p><br>

<h6><a style="text-decoration: underline;" href="{{$dataObj->link}}"target="_blank">Reset your password</a></h6>
@include('mail.components.mail-footer')