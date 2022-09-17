@extends("layouts.layout")
@section("content")
@section('title', 'admin dashboard')


<section>
  <div class="container">
    <div class="row pt-5">
       <div class="col-md-12 text-center">
        @include('layouts.page-intro')
        <p>Hello! admin pick a task below.</p>
      </div> <!-- end col-md-12 div -->
    </div> <!-- end row div -->
    <div class="row pt-5">
       <div class="col-xs-6 col-sm-4 col-md-3 col-lg-3">
       <a
          href="{{route('admin.addpost')}}"
           class="box-shadow dashboard-task-link"
          >
            Add post
        </a>
      </div> <!-- end col-md-3 div -->
       <div class="col-xs-6 col-sm-4 col-md-3 col-lg-3">
       <a
          href="{{route('admin.allpost')}}"
           class="box-shadow dashboard-task-link"
          >
            All post
        </a>
       </div> <!-- end col-md-3 div -->
       <div class="col-xs-6 col-sm-4 col-md-3 col-lg-3">

       <a
          href="{{route('admin.category')}}"
           class="box-shadow dashboard-task-link"
          >
           Categories
        </a>
       
       </div> <!-- end col-md-3 div -->

       
    </div> <!-- end row div -->

  </container> <!-- end container div -->
</section>

@endsection