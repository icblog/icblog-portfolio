@extends("layouts.layout")
@section("content")
@section('title', 'register')
<section>
    <div class="container">
        <div class="row pt-5">
            <div class="page-intro-wrapper text-center col-md-5">
                @include('layouts.page-intro')
            </div>
            <div class="col-md-7">
                <div class="form-wrapper">
                    <p class="form-top-text">Please complete your registration</p>
                    <div class="err-div"></div>
                    <form id="complete-register-form" method="POST">
                       
                        <div class="form-group">
                            <label class="form-label">Username *</label>
                            <input type="text" class="form-control" value="" name="username" id="username"  maxlength="255" />

                        </div>

                     <div class="form-group">
                            <label class="form-label" for="pwd">Password *</label>
                            <div class="input-group mb-3">
                                <input type="password" name="password" id="pwd" class="form-control"  maxlength="255">
                                <div class="input-group-append">
                                    <button id="pwd-btn" class="pwd-btn no-border-radius btn btn-light"
                                        type="button"><span><i class="fa fa-eye"></i></span></button>
                                </div>
                            </div>
                        </div>
                        <p class="small">
                            All fields marked with a * are mandatory
                        </p>
                        <input type="hidden" class="form-control" id="complete-reg-email" name="email"  maxlength="255">
                        <input type="hidden" value="" name="recaptcha"  maxlength="1">
                        <div class="pt-3 text-center">
                            <button id="complete-register-form-btn" type="submit" class="primary-btn">Submit</button>
                        </div>
                    </form>

                </div><!-- end form-wrapper div -->
            </div> <!-- end col-md-6 div -->
        </div> <!-- end row div -->
        </container> <!-- end container div -->
</section>
@endsection
