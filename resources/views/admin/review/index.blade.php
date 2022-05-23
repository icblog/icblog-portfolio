@extends("layouts.layout")
@section("content")
@section('title', 'admin review')
<section class="admin-review">
  <div class="container-fluid">
    @include('layouts.page-intro')
    @if(!$reviewData->isEmpty())
    <div class="row">
      <div class="review-item-wrapper masonry">
       @foreach ($reviewData as $review)
       @php $statusClassName = ""; @endphp
       @if($review->status == "Unapproved")
       @php $statusClassName = "text-danger"; @endphp
       @endif
        @if($review->status == "Approved")
       @php $statusClassName = "text-success";@endphp
       @endif
       <div class="review-item item box-shadow">
        <div class="mb-1">
          <div class="admin-review-stars" value="{{$review->star}}"></div>
        </div>
        <div>
        <span class="font-weight-bold">Date:</span>
        <span>
          {{$review->created_at}}
        </span>
      </div>
      <div>
        <span class="font-weight-bold">Status:</span>
        <span class="{{$statusClassName}}"
        >
          {{$review->status}}
        </span>
      </div>

      <div>
        <span class="font-weight-bold">By:</span>
        <span>
          {{$review->first_name}}
        </span>
      </div>
        <div class="mb-1">
        <span class="font-weight-bold">Comment:</span> 
          {{$review->comment}}
        
       </div>

       @if($review->status != "Approved")
      <div class="mt-4 text-center">
       <button type="button" class="primary-btn show-reply-form-btn">Take action</button>
     </div>
       @endif

    <div class="reply-form-wrapper form-wrapper">
        <div class="text-right">
       <span class="close-reply-form-btn primary-btn">x</span>
       </div>
         <div class="pt-1 err-div"></div>
      
      <form id="reply-form" method="POST">
      <div class="form-group">
      <label>Status:</label>
      <select
      class="status form-control"
      name="status">
      <option value="">Select status</option>
      <option value="Approved">Approved</option>
      <option value="Unapproved">Unapproved</option>
      <option value="Pending">Pending</option>
     </select>
  </div>
            <div class="mt-1 form-group">
     <label for="comment">Your reply:</label>
      <textarea name="comment" class="comment form-control" maxlength="6000"></textarea> 
    </div>
    <input type="hidden" value="{{$review->id}}" name="reviewId" class="reviewId">
    <div class="pt-3 text-center">
       <button type="submit" class="reply-form-btn primary-btn">Submit</button>
     </div>
          </form>
       </div><!-- End form wrapper -->
      </div>
       @endforeach
     </div>
   </div>
   <div class="row">
     <div class="col-md-12">
       <div id="pagi-link-wrapper">
       {!! $reviewData->links() !!}
     </div>
       
     </div>
   </div>
   @else
   <div class="row">
     <div class="text-center col-md-12">
       <p>Sorry there no reviews, please check back soon.</p>
     </div>
   </div>
   @endif

 </div>
</section>

@endsection