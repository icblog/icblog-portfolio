<div>
  <div class="form-wrapper">
    <p class="form-top-text">Please complete your registration</p>
    <div class="err-div"></div>
    <form id="complete-register-form" method="POST">

      <div class="form-group">
       <label for="email">Email:</label>
       <input type="text" class="form-control" id="complete-reg-email" name="email" disabled>
     </div>
     <div class="form-group">
      <label>Title *</label>
      <select
      class="form-control"
      name="title"
      id="title">
      <option value="">Select your title</option>
      <option value="Mr">Mr</option>
      <option value="Mrs">Mrs</option>
      <option value="Miss">Miss</option>
      <option value="Ms">Ms</option>
      <option value="Dr">Dr</option>
    </select>
  </div>

  <div class="form-group">
    <label>First name *</label>
    <input
    type="text"
    class="form-control"
    value=""
    name="fname"
    id="fname"
    maxLength="120"
    />

  </div>

  <div class="form-group">
    <label>Last name *</label>
    <input
    type="text"
    class="form-control"
    name="lname"
    id="lname"
    maxLength="120"
    />

  </div>

  <div class="form-group">
    <label>Password *</label>
    <div class="input-group mb-3">
      <input type="password" name="pwd" id="pwd" class="form-control">
      <div class="input-group-append">
        <button id="pwd-btn" class="pwd-btn no-border-radius btn btn-light" type="button"><span><i class="fa fa-eye"></i></span></button>
      </div>
    </div>
  </div>
  <p className="small-font-size">
    All fields marked with a * are mandatory
  </p>
  <div class="pt-3 text-center">
   <button id="complete-register-form-btn" type="submit" class="primary-btn">Submit</button>
 </div>
</form>
</div>
</div>