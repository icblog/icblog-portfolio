<div>
  <div class="form-wrapper">
    <p class="form-top-text">Enter your new passowrd below<br/><strong> 8 characters minimum</strong></p>
    <div class="err-div"></div>
    <form id="reset-password-form" method="POST">
     <div class="form-group">
    <label class="form-label" for="pwd">Password *</label>
    <div class="input-group mb-3">
      <input type="password" name="pwd" id="reset-pwd" class="form-control">
      <div class="input-group-append">
        <button id="pwd-btn" class="pwd-btn no-border-radius btn btn-light" type="button"><span><i class="fa fa-eye"></i></span></button>
      </div>
    </div>
  </div>
  <p className="small-font-size">
    All fields marked with a * are mandatory
  </p>
  <input type="hidden" value="reset_password" name="action">
  
  <div class="pt-3 text-center">
   <button id="reset-password-form-btn" type="submit" class="primary-btn">Submit</button>
 </div>
</form>
</div>
</div>
