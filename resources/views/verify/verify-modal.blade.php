<!-- The Modal -->
<div class="modal" id="verifyModal" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="no-border-radius modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h5 class="modal-title text-center">Checking the Link</h5>
        <button type="button" id="verify-modal-close-btn" class="verify-modal-close-btn close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <div id="login-wrapper-div">
          @include('auth.login-and-rating-form')
        </div>
        <div id="complete-reg-wrapper-div">
          @include('auth.complete-register-form')
       </div>
        <div id="reset-password-wrapper-div">
           @include('auth.reset-passowrd-form')
        </div>
        <div id="reg-wrapper-div">
          @include('auth.register-form1')
        </div>
        <div id="forgotten-password-wrapper-div">
          @include('auth.forgotten-password-form')
        </div>

         

        
       
      </div>

      

    </div>
  </div>
</div>