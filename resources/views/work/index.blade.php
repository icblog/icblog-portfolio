@extends("layouts.layout")
@section("content")
@section('title', 'our work')
<section class="work">
  <div class="container-fluid">
    @include('layouts.page-intro')
    @if(!$workData->isEmpty())
    <div class="row">
      <div class="masonry">
       @foreach ($workData as $work)
       <div class="item">
        <img src="{{$work->imgUrl}}" />
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
     <div class="text-enter col-md-12">
       <p>There is no uploaded work</p>
     </div>
   </div>
   @endif

 </div>
</section>

@endsection