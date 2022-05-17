<div>
<div class="form-wrapper">
  <p>Enter your email below and we'll send you a link to reset your password,
   please note this link will expired in <strong>15mins</strong>.</p>
   <div class="err-div"></div>
 <form id="forgotten-pwd-form" action="POST">
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" class="form-control" id="forgotten-pwd-email" placeholder="Enter email" name="email">
    </div>
    <input type="hidden" value="forgotten_pass" name="action">
    <div class="text-center">
   <button type="submit" id="forgotten-pwd-form-btn" class="primary-btn">Submit</button>
   </div>
  </form>
</div>
</div>