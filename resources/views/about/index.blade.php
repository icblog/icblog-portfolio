@extends("layouts.layout")
@section("content")
@section('title', 'about us')
<section class="about">
  <div class="container-fluid">
    @include('layouts.page-intro')

    <div class="pt-4 row">
        <div class="aboutus-wrapper col-md-10 mx-auto">
        <div class="aboutus-detail-wrapper">
          <div class="image"
          style="background-image:url('https://res.cloudinary.com/adomb/image/upload/v1649731190/imgs/our-history_e15njq.jpg');">
      </div>
      <div class="desc">
       <h6>
        Our History
    </h6>
    <p>
        Founded in 2016 adom balloons uses balloons to
        transform all events into something spectacular,
        including Weddings, Civil Partnerships,
        Birthdays, Anniversaries, Christenings and
        Corporate Events. We believe that every occasion
        should be magical therefore we create bespoke
        balloon decorations to suit every individual and
        budget.
    </p>
</div>
</div>
</div> 

<div class="aboutus-wrapper col-md-10 mx-auto">
    <div class="aboutus-detail-wrapper mt-5">
        <div class="desc meet-joanah-wrapper">
          <h6>
                                Meet Joanah
                            </h6>
                            <p>
                                Joanah is passionate about what she does her
                                touch of flair will definitely make your event
                                an event to remember for years to come, she is
                                passionate about what she does, down to earth
                                and super friendly. Feel free to say hello when
                                ever you see her.
                            </p>
       </div>
       <div class="image"
       style="background-image:url('https://res.cloudinary.com/adomb/image/upload/v1649730550/imgs/meet-Joanah_c6igmd.jpg');">
   </div>

</div>
</div>                    
</div>
</div>
</section>

@endsection