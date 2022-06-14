@include('mail.components.mail-header')
<p>New contact message from icblog website, below are the details.</p>
<p>
  <span class="bolded">Name:</span>
  {{$dataObj->c_name}}	
</p>

<p>
  <span class="bolded">Email:</span>
  {{$dataObj->c_email}}	
</p>

<p>
  <span class="bolded">Phone number:</span>
  {{$dataObj->c_phone}}	
</p>

<p>
  <span class="bolded">Message:</span>
  {{$dataObj->c_message}}	
</p>


@include('mail.components.mail-footer')