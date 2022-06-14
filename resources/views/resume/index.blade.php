@extends("layouts.layout")
@section("content")
@section('title', 'about me')
<section>
  <div class="container">
    <div class="about-wrapper row pt-5">
       <div class="col-md-12">
        @include('layouts.page-intro')
        <p>Click on the button below, this will open google drive link where you can download a copy of my resume thank you. </p>
       </div> <!-- end col-md-12 div -->
    </div> <!-- end row div -->
  </container> <!-- end row div -->
</section>




<section>
  <div class="container">
     <div class="pt-4 row">
         <div class="col-md-12">
            <a href="{{env('CV_DOWNLOAD_LINK')}}" class="primary-btn" target="_blank">Download Resume</a> 
        </div><!-- end col-md-12 div -->
       </div><!-- end row div -->
</div> <!-- end Container div -->
</section>

@endsection