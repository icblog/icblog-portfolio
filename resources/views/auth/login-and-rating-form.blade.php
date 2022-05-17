 <div class="login-wrapper-div form-wrapper">
    <p class="form-top-text">Please login Below</p>
    <div class="err-div"></div>
    <form id="login-form" method="POST">
       <div class="form-group">
       <label for="email">Email:</label>
       <input type="text" class="form-control" id="login-email" name="email">
     </div>
  <div class="form-group">
    <label>Password *</label>
    <div class="input-group mb-3">
      <input type="password" name="password" id="login-pwd" class="form-control">
      <div class="input-group-append">
        <button id="pwd-btn" class="pwd-btn no-border-radius btn btn-light" type="button"><span><i class="fa fa-eye"></i></span></button>
      </div>
    </div>
  </div>
  <p className="small-font-size">
    All fields marked with a * are mandatory
  </p>
  <div class="pt-3 text-center">
   <button id="login-form-btn" type="submit" class="primary-btn">Login</button>
 </div>
</form>
</div>

<div id="review-form-wrapper">
    Review form
</div>
