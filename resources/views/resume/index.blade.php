@extends("layouts.layout")
@section("content")
@section('title', 'resume')
<section>
  <div class="container">
    <div class="content-wrapper row">
       <div class="col-md-6 mx-auto text-center">
        @include('layouts.page-intro')
        <p>Click on the button below, this will open google drive link where you can download a copy of my resume thank you. </p>
        <div class="pt-3 pb-3">
            <a href="{{env('CV_DOWNLOAD_LINK')}}" class="primary-btn" target="_blank">Download Resume</a> 
        </div>
      </div> <!-- end col-md-9 div -->

    </div> <!-- end row div -->
  </container> <!-- end row div -->
</section>
@endsection