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
                    <p class="form-top-text">Enter your registered email below, we will send you a link to reset your
                        password.</p>
                    <div class="err-div"></div>
                    <form id="forgotten-pwd-form" action="POST">
                        <div class="form-group">
                            <label class="form-label" for="email">Email *</label>
                            <input type="email" class="form-control" id="forgotten-pwd-email-input"
                                placeholder="Enter email" name="email">
                        </div>
                        <input type="hidden" value="" name="recaptcha">
                        <p class="small">
                            All fields marked with a * are mandatory
                        </p>
                        <div class="text-center">
                            <button type="submit" id="forgotten-pwd-form-btn" class="primary-btn">Submit</button>
                        </div>
                    </form>
                </div><!-- end form-wrapper div -->
            </div> <!-- end col-md-6 div -->
        </div> <!-- end row div -->
        </container> <!-- end container div -->
</section>
@endsection
