@extends("layouts.layout")
@section("content")
@section('title', 'blog home')
<section>
  <div class="container">
    @include('layouts.page-intro')
    <!-- <div class="row">
      <div class="col-md-12">
      <p class="no-border-radius alert alert-info">Please note this page is currently under construction, check back soon for updates thank you.</p>
      </div>
    </div> -->
  </container> <!-- end container div -->
</section>

<section>
  <div class="container">
    <div class="row pt-4 display-flex">
    @empty($latestPostResult)
    <div class="col-md-12">                   
      <p class="no-border-radius alert alert-info text-center">There is currently no recent post.</p>
   </div>
    @else
    @foreach ($latestPostResult as $post_entry)
     <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 pb-3 pt-3">
       <div class="post-entry-wrapper">
        <a href="{{ URL::route('blog.show', $post_entry->slug) }}"><img class="img-fluid" src="{{$post_entry->imgUrls == '' ? 'https://res.cloudinary.com/icblog254/image/upload/v1662665884/icblog/siteimgs/vqkopmclbqxlbtfk9b59.png' : $post_entry->imgUrls}}" alt="Post image"/></a>
        <div class="post-entry-detail-wrapper">
        <p class="post-entry-title"><a href="{{ URL::route('blog.show', $post_entry->slug) }}">{{ Str::limit($post_entry->title, $strLimit)}}</a></p>
            @php
                $catNameArray  =  explode(',', $post_entry->catNames);
                $catSlugArray  =  explode(',', $post_entry->catSlugs);
                $catNameArrayLen = count($catNameArray);
            @endphp
            <p class="post-entry-detail-p"><strong>Category:</strong>
               @for ($i = 0; $i < $catNameArrayLen; $i++)
               <span class="post-entry-category-link-span"><a href="blog/category/{{$catSlugArray[$i]}}">{{ $catNameArray[$i] }}</a> 
                  @if($i < $catNameArrayLen-1)
                    ,
                  @endif
                 </span>
               @endfor
           
              </p>
             <p class="post-entry-detail-p"><strong>Date: </strong>{{ Date::parse($post_entry->created_at)->format('j F, Y') }}</p>
             <p class="post-entry-detail-p"><strong>Views:</strong> {{$post_entry->views}} </br> <strong>By:</strong> {{$post_entry->createdby_name}}</p>
            
            
          </div>
       </div>
    </div><!--End col div -->
    @endforeach
    @endempty
  </div><!-- end row display-flex div -->
  <div class="row mb-5">
     <div class="col-md-12 text-center">
        <a class="primary-btn" href="{{ URL::route('blog.allPostIndex', ['post','recent']) }}">All recent post</a>
     </div>
  </div>
</container> <!-- end container div -->
</section>

<section>
  
  <div class="container">
  <div class="row">
	<div class="col-md-12">
		<h1 class="h1-intro">Popular</h1>
	</div>
</div>
<div class="row pt-4 display-flex">
    @empty($popularPost)
    <div class="col-md-12">                   
      <p class="no-border-radius alert alert-info text-center">There is currently no popular post.</p>
   </div>
    @else
    @foreach ($popularPost as $post_entry)
     <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 pb-3 pt-3">
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
               <span class="post-entry-category-link-span"><a href="{{ URL::route('blog.allPostIndex', ['category', $catSlugArray[$i]]) }}">{{ $catNameArray[$i] }}</a> 
                  @if($i < $catNameArrayLen-1)
                    ,
                  @endif
                 </span>
               @endfor
           
              </p>
             <p class="post-entry-detail-p"><strong>Date: </strong>{{ Date::parse($post_entry->created_at)->format('j F, Y') }}</p>
             <p class="post-entry-detail-p"><strong>Views:</strong> {{$post_entry->views}} </br> <strong>By:</strong> {{$post_entry->createdby_name}}</p>
            
            
          </div>
       </div>
    </div><!--End col div -->
    @endforeach
    @endempty
  </div><!-- end row display-flex div -->
  <div class="row mb-5">
     <div class="col-md-12 text-center">
        <a class="primary-btn" href="{{ URL::route('blog.allPostIndex', ['post','popular']) }}">All popular post</a>
     </div>
  </div>
  </container> <!-- end container div -->
</section>

<section>
  <div class="container">
  <div class="row">
	<div class="col-md-12 pt-2 pb-2">
		<h1 class="h1-intro">Categories</h1>
	</div>
</div>
    
      @if(!empty($categoriesResult))
      <div class="row pt-2 mb-1">
       <div class="col-md-8 mx-auto">
       <div class="input-group blog-home-search-category-input-wrapper mb-3">
         <span class="blog-home-search-category-icon-search"><i class="fas fa-search"></i></span>
         <input type="text" class="form-control blog-home-search-category-input" placeholder="Search category" id="blog-home-search-category-input">
         <span class="blog-home-search-category-icon-times"><i class="fas fa-times"></i></span>
         </div>
        </div>
        </div> <!-- end row div -->
        <div class="row blog-home-category-row-wrapper">
         @php
           $categoriesResultLen = count($categoriesResult);
         @endphp

         @for ($i = 0; $i < $categoriesResultLen; $i++)

         <div class="col-xs-6 col-sm-4 col-md-3 col-lg-3 blog-home-category-wrapper">
           <a href="{{ URL::route('blog.allPostIndex', ['category', Str::slug($categoriesResult[$i]->name, '-')]) }}" class="box-shadow">
              {{$categoriesResult[$i]->name}}
           </a>
         </div> <!-- end col-md-3 div -->

         @endfor
         </div> <!-- end row div --> 
     
     @else
     <div class="row pt-2 mb-4">
      <div class="col-md-12 ">
       <p class="alert alert-info">Sorry! no categories yet</p>
      </div>
      </div> <!-- end row div -->
    @endif
    
     
  </container> <!-- end container div -->
</section>
@endsection