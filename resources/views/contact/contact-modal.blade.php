<!-- The Modal -->
<div class="modal" id="contactModal" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="no-border-radius modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h5 class="modal-title text-center">Get intouch</h5>
        <button type="button" class="close close-contact-modal" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <div class="form-top-text">
          <p>Using the form or the email address below, I will get back to you as soon as I'm able to thank you.</p>
          <p>
            <span class="form-label font-weight-bold">Email me : </span>

            {{env('APP_ADMIN_EMAIL')}}
          </p>

          <p>
            <span class="form-label font-weight-bold">Message me : </span>

          </p>
        </div>
        <div class="form-wrapper-contact-form">
         <form id="contact-form">
          <div class="err-div-contact-form"></div>
          <div class="form-group">
           <label class="form-label" for="name">Name *</label>
           <input type="text" name="name" id="c-name" class="form-control" maxlength="120"/> 
         </div>
         <div class="form-group">
           <label class="form-label" for="email">Email *</label>
           <input type="text" name="email" id="c-email" class="form-control" maxlength="120"/> 
         </div>
         <div class="form-group">
           <label class="form-label" for="phone">Phone *</label>
           <input type="text" name="phone" id="c-phone" class="form-control" maxlength="120"/> 
         </div>
         <div class="form-group">
           <label class="form-label" for="message">Message *</label>
           <textarea name="message" id="c-message" class="form-control" maxlength="6000"></textarea> 
         </div>
         <input type="hidden" value="" name="recaptcha">
         <p class="small">
          All fields marked with a * are mandatory
        </p>

        <div class="pt-3 text-center">
         <button id="contact-form-btn" type="submit" class="primary-btn">Submit</button>
       </div>
     </form>
   </div>
 </div>
</div>
</div>
</div>

