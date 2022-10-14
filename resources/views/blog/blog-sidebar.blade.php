<div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4">
<div class="side-bar-details-wrapper box-shadow">
    <h5>Categories</h5>
    @if(count($categoriesResult) > 0)
       <div class="input-group sidebar-search-category-input-wrapper mb-3">
         <span class="sidebar-search-category-icon-search"><i class="fas fa-search"></i></span>
         <input type="text" class="form-control sidebar-search-category-input" placeholder="Search category" id="sidebar-search-category-input">
         <span class="sidebar-search-category-icon-times"><i class="fas fa-times"></i></span>
         </div>
        <div class="sidebar-category-wrapper">
         @php
           $categoriesResultLen = count($categoriesResult);
         @endphp

         @for ($i = 0; $i < $categoriesResultLen; $i++)
            @php
              $categorySlug = Str::slug($categoriesResult[$i]->name, '-');
            @endphp
         <div class="sidebar-category-link-wrapper">
             @if($categorySlug == $requestSlug)
             <span class="sidebar-category-span">{{$categoriesResult[$i]->name}} ({{$categoriesResult[$i]->categoryPostTotal}})</span>
             @else
             <a class="sidebar-category-link" href="{{ URL::route('blog.index', ['category', $categorySlug]) }}">
              {{$categoriesResult[$i]->name}} <span> ({{$categoriesResult[$i]->categoryPostTotal}})</span>
             </a>
             @endif
           
           
         </div> <!-- end col-md-3 div -->

         @endfor
         </div> <!-- end row div --> 
     
     @else
     
       <p class="alert alert-info">Sorry! no categories yet</p>
      
      
    @endif
    
 </div><!-- End side-bar-details-wrapper div -->
 @if($urlSlug != "latest")
 <div class="side-bar-details-wrapper box-shadow">
    <h5>Latest post</h5>
 @if(count($latestPostResult) > 0)
    @php
           $i = 1;
         @endphp
    @foreach ($latestPostResult as $post_entry)
    @if($i <= 4)
    <div class="card no-border mt-3 mb-3">
      <div class="row no-gutters">
        <div class="col-sm-5">
        <a href="{{ URL::route('blog.show', $post_entry->slug) }}"><img class="card-img no-border-radius" src="{{$post_entry->imgUrls == '' ? 'https://res.cloudinary.com/icblog254/image/upload/v1662665884/icblog/siteimgs/vqkopmclbqxlbtfk9b59.png' : $post_entry->imgUrls}}" alt="Post image"/></a>
         </div><!-- End col 5 div -->
         <div class="col-sm-7 p-2">
         <p class="post-entry-title"><a href="{{ URL::route('blog.show', $post_entry->slug) }}">{{ Str::limit($post_entry->title, $strLimit)}}</a></p>
         </div><!-- End col 7 div -->
      </div><!-- End row no-gutters div -->
    </div><!-- End card div --> 
    <hr/>

    @endif
          @php
           $i++;
         @endphp
    @endforeach
    <div class="text-center">
       <a href="{{ URL::route('blog.index', ['post','latest']) }}">All latest post</a>
    </div>
   
    @else
    <p class="no-border-radius alert alert-info text-center">There are no <strong>latest</strong> post.</p>
    @endif
    
 </div><!-- End side-bar-details-wrapper div --> 
  
 @endif

 @if($urlSlug != "popular")
 <div class="side-bar-details-wrapper box-shadow">
    <h5>Popular</h5>
  @if(count($popularPost) > 0)
    @php
           $i = 1;
         @endphp
    @foreach ($popularPost as $post_entry)
    @if($i <= 4)
    <div class="card no-border mt-3 mb-3">
      <div class="row no-gutters">
        <div class="col-sm-5">
        <a href="{{ URL::route('blog.show', $post_entry->slug) }}"><img class="card-img no-border-radius" src="{{$post_entry->imgUrls == '' ? 'https://res.cloudinary.com/icblog254/image/upload/v1662665884/icblog/siteimgs/vqkopmclbqxlbtfk9b59.png' : $post_entry->imgUrls}}" alt="Post image"/></a>
         </div><!-- End col 5 div -->
         <div class="col-sm-7 p-2">
         <p class="post-entry-title"><a href="{{ URL::route('blog.show', $post_entry->slug) }}">{{ Str::limit($post_entry->title, $strLimit)}}</a></p>
         </div><!-- End col 7 div -->
      </div><!-- End row no-gutters div -->
    </div><!-- End card div -->
    <hr/> 
    @endif
        @php
           $i++;
         @endphp
    @endforeach
    <div class="text-center">
        <a href="{{ URL::route('blog.index', ['post','popular']) }}">All popular post</a>
    </div>
   
    @else
    <p class="no-border-radius alert alert-info text-center">There are no <strong>popular</strong> post.</p>

    @endif
    
 </div><!-- End side-bar-details-wrapper div -->
  @endif
 
 
</div> <!-- End col div -->
