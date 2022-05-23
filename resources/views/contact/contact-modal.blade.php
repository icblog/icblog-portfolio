<!-- The Modal -->
<div class="modal" id="contactModal" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="no-border-radius modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h5 class="modal-title text-center">Contact us</h5>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <div class="form-top-text">
          <p>We are always happy to help, get intouch using the form or the details below and a member of our team will get back to you.</p>
          <p>
            <span class="form-label font-weight-bold">Email us : </span>

            {{env('APP_SUPPORT_EMAIL')}}
          </p>

          <p>
            <span class="form-label font-weight-bold">Call us : </span>
            {{env('APP_CONTACT_NUMBER')}}
            <span class="small">
              (Mon-Sat 8am-7pm)
            </span>
          </p>

          <p>
            <span class="form-label font-weight-bold">Message us : </span>

          </p>
        </div>
        <div class="form-wrapper">
         <form id="contact-form">
          <div class="err-div"></div>
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

