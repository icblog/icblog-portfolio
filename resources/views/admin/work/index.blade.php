@extends("layouts.layout")
@section("content")
@section('title', 'admin work')
<section class="admin-work">
  <div class="container-fluid">
    @include('layouts.page-intro')
    @if(!$workData->isEmpty())
    <div class="row">
      <div class="masonry">
       @foreach ($workData as $work)
       <div class="admin-work-item item">
        <button type="button" class="no-border-radius btn primary-btn admin-work-img-delete-btn" data-dir1="{{$work->id}}" data-dir2="{{$work->publicId}}"><span><i class="fa fa-trash"></i></span></button>
        <div class="delete-work-feedback"></div>
        <img class="admin-work-img" src="{{$work->imgUrl}}" />
       </div>
       @endforeach
     </div>
    
     
   </div>
   <div class="row">
     <div class="col-md-12">
       <div id="pagi-link-wrapper">
       {!! $workData->links() !!}
     </div>
       
     </div>
   </div>
   @else
   <div class="row">
     <div class="col-md-12">
       <p>There is no uploaded work</p>
     </div>
   </div>
   @endif

 </div>
</section>

@endsection