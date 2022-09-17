@extends("layouts.layout")
@section("content")
@section('title', 'login')
<section>
    <div class="container">
        <div class="row pt-5">
            <div class="page-intro-wrapper text-center col-md-5">
                @include('layouts.page-intro')
            </div>
            <div class="col-md-7">
                <div class="form-wrapper">
                    <p class="form-top-text">Enter your login in details below.</p>
                    <div class="err-div"></div>
                    <form id="login-form" class="login-form" method="POST">
                        <div class="form-group">
                            <label class="form-label" for="email">Email *</label>
                            <input type="text" class="form-control" id="login-email" name="email"  maxlength="255">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="password">Password *</label>
                            <div class="input-group mb-3">
                                <input type="password" name="password" id="login-pwd" class="login-pwd form-control"  maxlength="255">
                                <input type="hidden" value="" name="recaptcha"  maxlength="1">
                                <div class="input-group-append">
                                    <button id="pwd-btn" class="pwd-btn no-border-radius btn btn-light"
                                        type="button"><span><i class="fa fa-eye"></i></span></button>
                                </div>
                            </div>
                        </div>
                        <p class="small">
                            All fields marked with a * are mandatory
                        </p>
                        <div class="cf">
                            <a href="{{ route('forgottenPass.index') }}" class="float-left">Forgotten
                                password?</a>
                            <a href="{{ route('register.index') }}" class="float-right">Register</a>
                        </div>
                        <div class="pt-3 text-center">
                            <button id="login-form-btn" type="submit" class="login-form-btn primary-btn">Login</button>
                        </div>
                    </form>
                </div><!-- end form-wrapper div -->
            </div> <!-- end col-md-7 div -->
        </div> <!-- end row div -->
        </container> <!-- end container div -->
</section>
@endsection
