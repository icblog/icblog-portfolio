@extends("layouts.layout")
@section("content")
@section('title', 'blog home')
<section>
  <div class="container pt-5">
  @include('layouts.page-intro')
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 mt-4">
         <div class="post-wrapper box-shadow">
         <div class="row pt-1 display-flex">
         @if($mainResult->isEmpty())
           <div class="col-sm-12 pt-3">
               {{Markdown::parse('<p class="text-center no-border-radius alert alert-info text-center">'.$noResultMsg.'</p>')}}
          </div>
          @else
          @foreach ($mainResult as $post_entry)
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 pb-3 pt-3">
            <div class="post-entry-wrapper">
             <a href="{{ URL::route('blog.show', $post_entry->slug) }}"><img class="img-fluid" src="{{$post_entry->imgUrls == '' ? 'https://res.cloudinary.com/icblog254/image/upload/v1662665884/icblog/siteimgs/vqkopmclbqxlbtfk9b59.png' : $post_entry->imgUrls}}" alt="Post image"/></a>
              <div class="post-entry-detail-wrapper">
        <p class="post-entry-title"><a href="{{ URL::route('blog.show', $post_entry->slug) }}">{{ Str::limit($post_entry->title, $strLimit) }}</a></p>
            @php
                $catNameArray  =  explode(',', $post_entry->catNames);
                $catSlugArray  =  explode(',', $post_entry->catSlugs);
                $catNameArrayLen = count($catNameArray);
            @endphp
            <p class="post-entry-detail-p"><strong>Category:</strong>
               @for ($i = 0; $i < $catNameArrayLen; $i++)
                @if($requestAction == "category")
                
                <span class="post-entry-category-link-span">
                  {{ $catNameArray[$i] }}
                </span>
                @else
                <span class="post-entry-category-link-span"><a href="{{ URL::route('blog.index', ['category', $catSlugArray[$i]]) }}">{{ $catNameArray[$i] }}</a> 
                   @if($i < $catNameArrayLen-1)
                    ,
                  @endif
                 </span>
              @endif
             @endfor
           
              </p>
             <p class="post-entry-detail-p"><strong>Date: </strong>{{ Date::parse($post_entry->created_at)->format('j F, Y') }}</p>
             <p class="post-entry-detail-p"><strong>Views:</strong> {{$post_entry->views}} </br> <strong>By:</strong> {{$post_entry->createdby_name}}</p>
            
            
          </div>
       </div>
    </div><!--End col div -->
     @endforeach
    @endif
     </div> <!-- End row display-flex -->
     <!-- Show pagination link if we have results -->
     @if(!$mainResult->isEmpty())
     <div class="row pb-2 pt-4 text-center">
       <div class="blog-pagi-link-wrapper mx-auto md-12">
         {!! $mainResult->links() !!}
       </div> 
     </div>
     @endif
    
    </div> <!-- End div box-shadow -->
    </div><!-- End div col -->
         
      <!-- INCLUDE BLOG SIDEBAR -->
      @include('blog.blog-sidebar')
       
    </div><!-- end row div -->
  </container> <!-- end container div -->
</section>
@endsection