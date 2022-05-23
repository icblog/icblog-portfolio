@extends("layouts.layout")
@section("content")
@section('title', 'home')
@include('home.hero')

<section class="welcome-services">
        <div class="container-fluid">
          <div class="row">
            <div class="welcome-wrapper col-md-6">
              <h2 class="pb-4 pt-5">Welcome</h2>
              <p>
                A warm welcome to Adom Balloons, here we make
                every event special.
              </p>
              <p>
                We specialise in using balloons to transform all
                events into something spectacular, including
                Weddings, Civil Partnerships, Birthdays,
                Anniversaries, Christenings and Corporate
                Events. We believe that every occasion should be
                different therefore we create bespoke balloon
                decorations to suit every individual and budget.
              </p>
            </div>
            <div class="service-wrapper-outer col-md-6">
              <h2 class="service-h2-heading pb-4 pt-5">
                Our services
              </h2>
              <div class="service-wrapper row">
                <div class="text-center individual-service-wrapper col-xs-6 col-sm-6 col-md-6 col-lg-4">
                  <div>
                    <span class="service-icon icon-color">
                      <i class="fas fa-glass-cheers"></i>
                    </span>
                    <p>Wedding</p>
                  </div>
                </div>
                <div class="text-center individual-service-wrapper col-xs-6 col-sm-6 col-md-6 col-lg-4">
                  <div>
                    <span class="service-icon icon-color">
                      <i class="fas fa-ring"></i>
                    </span>
                    <p>Engagement</p>
                  </div>
                </div>
                <div class="text-center individual-service-wrapper col-xs-6 col-sm-6 col-md-6 col-lg-4">
                  <div>
                    <span class="service-icon icon-color">
                    <i class="fas fa-birthday-cake"></i>

                    </span>
                    <p>Birthday</p>
                  </div>
                </div>

                <div class="text-center individual-service-wrapper col-xs-6 col-sm-6 col-md-6 col-lg-4">
                  <div>
                    <span class="service-icon icon-color">
                      <i class="fas fa-cross"></i>
                    </span>
                    <p>Christening</p>
                  </div>
                </div>
                <div class="text-center individual-service-wrapper col-xs-6 col-sm-6 col-md-6 col-lg-4">
                  <div>
                    <span class="service-icon icon-color">
                     <i class="fas fa-calendar"></i>
                    </span>
                    <p>Corporate event</p>
                  </div>
                </div>
                <div class="text-center individual-service-wrapper col-xs-6 col-sm-6 col-md-6 col-lg-4">
                  <div>
                    <span class="service-icon icon-color">
                     <i class="fab fa-pagelines"></i>
                    </span>
                    <p>Funeral</p>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>  
      </section>

 @if(!$workData->isEmpty())
    <section class="work">
  <div class="container-fluid">
      <div class="row">
       <div class="text-center col-md-12">
       <h2 class="service-h2-heading pb-4 pt-4">
                Our Latest work
        </h2>
        <p>Below are just a few sample work we've done, scroll down to see more.</p> 
      </div>
     </div>
        <!-- INCLUDE WORK CARD -->
       @include('work.work-card')
    <div class="row">
       <div class="mb-4 text-center col-md-12">
        <a href="{{route('work.index')}}" class="view-more-link">Go to our work page >></a> 
      </div>
     </div>
  </div>
</section>
   @endif

  @if(!$reviewData->isEmpty())
    <section class="review">
  <div class="container-fluid">
      <div class="row">
       <div class="text-center col-md-12">
       <h2 class="service-h2-heading pb-4 pt-4">
                Client reviews
        </h2>
        <p>Below are what some of client says about us.</p> 
      </div>
     </div>
        <!-- INCLUDE review CARD -->
       @include('review.review-card')
    <div class="row">
       <div class="mb-4 text-center col-md-12">
        <a href="{{route('review.index')}}" class="view-more-link">Go to our review page >></a> 
      </div>
     </div>
  </div>
</section>
   @endif



@endsection


