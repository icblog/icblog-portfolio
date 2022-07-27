<!-- The Modal -->
<div class="modal" id="authModal" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="no-border-radius modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h5 class="modal-title text-center">select option</h5>
        <button type="button" id="auth-modal-close-btn" class="auth-modal-close-btn close">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <div id="auth-option-wrapper">
           <button class="auth-btn" data-dir="auth-option-login-wrapper">Login <i class="fas fa-arrow-circle-right"></i></button>
            <button class="auth-btn" data-dir="auth-option-forgotten-pass-wrapper">Forgotten password? <i class="fas fa-arrow-circle-right"></i></button>
             <button class="auth-btn" data-dir="auth-option-register-wrapper">Register <i class="fas fa-arrow-circle-right"></i></button>
        </div>
        <div id="auth-option-login-wrapper">
           <button class="auth-back-btn" data-dir="auth-option-login-wrapper"><i class="fas fa-arrow-circle-left"></i> Back</button>
          @include('auth.login-form')
        </div>
        <div id="auth-option-forgotten-pass-wrapper">
          <button class="auth-back-btn" data-dir="auth-option-forgotten-pass-wrapper"><i class="fas fa-arrow-circle-left"></i> Back</button>
          @include('auth.forgotten-password-form')
        </div>
        <div id="auth-option-register-wrapper">
          <button class="auth-back-btn" data-dir="auth-option-register-wrapper"><i class="fas fa-arrow-circle-left"></i> Back</button>
           @include('auth.register-form1')
        </div>
      </div>
   </div>
  </div>
</div>