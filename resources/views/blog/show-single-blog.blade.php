@extends("layouts.layout")
@section("content")
@section('title', $pageTitle)
<section>
  <div class="container">
  <div class="row">
     <div class="col-md-12 pt-4"> 
        <a class="primary-btn" href="{{ url($backUrl) }}">Back to results</a>
      </div>
  </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 mt-4">
        <div class="single-post-details-wrapper box-shadow">
          @if($singlePostResult != null)
           <div class="single-post-body-wrapper p-3">
           <p class="single-post-title">{{$singlePostResult->title}}</p>
           <p class="single-post-author-p">By: {{$singlePostResult->createdby_name}} in 
              @for ($i = 0; $i < count($singlePostResult->catNames); $i++)
               <span class="post-entry-category-link-span"><a href="{{ URL::route('blog.index', ['category', $singlePostResult->catSlugs[$i]]) }}">{{ $singlePostResult->catNames[$i] }}</a> 
                  @if($i < count($singlePostResult->catNames)-1)
                    ,
                  @endif
                 </span>
               @endfor
           on {{ Date::parse($singlePostResult->created_at)->format('j F, Y') }}</p>
           <div class="single-post-content">
            {!! Str::markdown($singlePostResult->body) !!}
          </div>
          
         </div>

          @else
             <div class="p-3 pt-4">
               <p class="alert alert-info no-border-radius">Sorry the post your are looking for can not be found.</p>
            </div>
         @endif
         
         <div class="row p-3">
             <div class="col-md-12"><hr/></div>
             
            <div class="col-md-6 text-left next-prev-link-wrapper">
            @if($previousPostResult != null) 
              <a href="{{ URL::route('blog.show', $previousPostResult->slug) }}">
							  <span>Previous Post </span>
							  <p>{{$previousPostResult->title}}</p>
							</a>
              @endif
            </div>
           

           <div class="col-md-6 next-prev-link-wrapper text-right">
           @if($nextPostResult != null) 
            <a href="{{ URL::route('blog.show', $nextPostResult->slug) }}">
							  <span class="btn-content-title"> Next Post</span>
							  <p>{{$nextPostResult->title}}</p>
							</a>
              @endif
           </div>
         </div>

        </div><!-- End single-post-details-wrapper -->
       </div><!-- End col div -->
 
         <!-- INCLUDE BLOG SIDEBAR -->
          @include('blog.blog-sidebar')
       
    </div><!-- end row div -->
  </container> <!-- end container div -->
</section>
@endsection