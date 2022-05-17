@extends("layouts.layout")
@section("content")
@section('title', 'reviews')

<section class="reviews">
  <div class="container-fluid">
    @include('layouts.page-intro')
    <div class="row">
      @if (session('access_error'))
      <div class="col-md-12">
        <div class="no-border-radius alert alert-danger">
         <strong>Error!</strong>
         {{ session('access_error') }}
       </div>
     </div>
     @endif
     <div class="col-md-8 mx-auto">
      <p className="small-bottom-padding">
        We pride ourselves about the excellent
        service we provide and always looking for
        ways to renew and improve teh way we do business. But wait, do not
        take our words for it below are what some of
        our client say about us. If we've had the
        pleasure of doing business with you then
        please

        @if (Auth::check())

        <button id="leave-review-btn" class="primary-btn" data-toggle="modal" data-target="#reviewModal">leave as a review</button>
        

        @else
        <button id="login-btn" class="primary-btn" data-toggle="modal" data-target="#authModal">login and review us</button>
        @endif

      </p>
    </div>

  </div>
</div>
</section>

@endsection


