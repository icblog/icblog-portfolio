@include('mail.components.mail-header')
<p>To complete your registeration please click on the link below, please note for security reasons this link will expiry
    in 20mins from the time of this email.</p>

<h6><a style="text-decoration: underline;" href="{{ $dataObj->link }}" target="_blank">Complete your registeration</a>
</h6>
@include('mail.components.mail-footer')
