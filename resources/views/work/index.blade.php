@extends("layouts.layout")
@section("content")
@section('title', 'our work')
<section class="work">
  <div class="container-fluid">
    @include('layouts.page-intro')
    <p class="text-center">We pride ourselves with what we do,below are some of our work samples click on image to enlarge.</p>
    @if(!$workData->isEmpty())
     <!-- INCLUDE WORK CARD -->
    @include('work.work-card')
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