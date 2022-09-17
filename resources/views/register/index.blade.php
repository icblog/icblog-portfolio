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
                    <p class="form-top-text">To register, enter your email below.</p>
                    <div class="err-div"></div>
                    <form id="initial-register-form" method="POST">

                        <div class="form-group">
                            <label class="form-label" for="email">Email *</label>
                            <input type="text" class="form-control" id="initial-register-email-input" name="email"  maxlength="255">
                        </div>
                        <input type="hidden" value="" name="recaptcha"  maxlength="1">
                        <p class="small">
                            All fields marked with a * are mandatory
                        </p>
                        <div class="pt-3 text-center">
                            <button id="initial-register-form-btn" type="submit" class="primary-btn">Submit</button>
                        </div>
                    </form>
                </div><!-- end form-wrapper div -->
            </div> <!-- end col-md-6 div -->
        </div> <!-- end row div -->
        </container> <!-- end container div -->
</section>
@endsection
