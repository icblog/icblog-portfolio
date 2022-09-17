@extends("layouts.layout")
@section("content")
@section('title', 'admin edit post')
<section>
  <div class="container-fluid">
    <div class="row pt-5">
       <div class="col-md-12 text-center">
        @include('layouts.page-intro')
        <p>Hello! admin edit post details below.</p>
      </div> <!-- end col-md-12 div -->
    </div> <!-- end row div -->
    <div class="row">
      <div class="col-md-8 mx-auto">
      <div class="text-right"><a class="btn primary-btn no-border-radius" href="{{route('admin.allpost')}}">All post</a></div>
      @if($singlePostResult != "")
      <div class="form-wrapper">
        <div class="err-div"></div>
          <form action="{{route('admin.updatepost')}}" id="edit-post-form" class="edit-post-form" method="POST" enctype="multipart/form-data">
         <div class="row mb-3">
           <div class="col-md-12">
            <h5>Saved post details</h5>
           </div>
          <div class="col-md-6">
          <p>
            Status: <span class="admin-detail-value-span {{$singlePostResult->status == 'saved' ? 'text-danger' : 'text-success'}}"><strong>{{$singlePostResult->status}}</strong></span><br/> 
            Created date: <span class="admin-detail-value-span">{{$singlePostResult->created_at}}</span><br/> 
            Created by: <span class="admin-detail-value-span">{{$singlePostResult->createdby_name}}</span><br/>
            Updated date: <span class="admin-detail-value-span">{{$singlePostResult->updated_at == $singlePostResult->created_at ? "--" : $singlePostResult->updated_at}}</span><br/>
            Updated by: <span class="admin-detail-value-span">{{$singlePostResult->updatedby_name == NULL ? "--" : $singlePostResult->updatedby_name}}</span><br/>
          </p>
          </div>
          <div class="col-md-6">
          <p>
            Has images: <span class="admin-detail-value-span {{$singlePostResult->has_images == 'no' ? 'text-danger' : 'text-success'}}"><strong>{{$singlePostResult->has_images}}</strong></span><br/> 
            Cloudinary foldername: <span class="admin-detail-value-span">{{$singlePostResult->cloudinary_folder_name == NULL ? "--" : $singlePostResult->cloudinary_folder_name}}</span><br/>
          </p>
          </div>
           
          <div class="col-md-12">
          <hr/>
            <h5 class="mt-5">Edit form details</h5>
           </div>
        </div>
          

              <div class="form-group">
                     <label class="form-label" for="Post-images">Post-images</label><span> (Optional)</span>
                     <div class="mb-4 edit-post-input-images" data-imgurls="{{$singlePostResult->imgUrls}}" data-imgpublicids="{{$singlePostResult->imgPublicIds}}"></div>
                </div>
               
          
                 <div class="form-group">
                     <label class="form-label" for="title">Title *</label>
                       <input type="text" class="form-control" id="title" name="title" value="{{$singlePostResult->title}}"  maxlength="400">
                  </div>
                    <div class="form-group">
                        <label class="form-label" for="category">Default category *</label>
                          <div class="input-group mb-3">
                          @if(!empty($categoriesResult))
                          <select id="admin-post-category-select" data-catids="{{$singlePostResult->catIds}}" data-max="" multiple="multiple" style="" name="selectedCategories[]">
                            
                            @foreach ($categoriesResult as $category)
                              <option value="{{$category->id}}">{{$category->name}}</option>
                             @endforeach
                            </select>
                            @else
                            <p>Sorry! no categories yet</p>
                            @endif
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="form-label" for="postbody">Body *</label>
                          <textarea class="form-control" id="postbody" name="postbody" rows="3" maxlength="10000">{{$singlePostResult->body}}</textarea>
                        </div>
                        <div class="text-center saveorpublish">
                          <label class="label-container">Save post 
                            <input type="radio" name="saveorpublish" value="saved" {{$singlePostResult->status == 'saved' ? 'checked' : ''}}>
                          </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <label class="label-container">Publish post
                            <input type="radio" name="saveorpublish" value="published" {{$singlePostResult->status == 'published' ? 'checked' : ''}}>
		
	        	            </label>
                      </div>
                        <p class="small">
                            All fields marked with a * are mandatory
                        </p>
                        <input type="hidden" name="postid" value="{{$singlePostResult->id}}">
                        <input type="hidden" name="previousTitle" value="{{$singlePostResult->title}}">
                        <input type="hidden" name="posthasImages" value="{{$singlePostResult->has_images}}">
                        <input type="hidden" id="post-images-tobe-deleted" data-imgpublicid='[]'>
                        <div class="pt-3 text-center">
                            <button id="edit-post-form-btn" type="submit" class="edit-post-form-btn primary-btn">Submit</button>
                        </div>
                    </form>
                </div><!-- end form-wrapper div -->
                @else
                  <p class="text-center">Sorry! we did not find that post</p>
              @endif
          </div> <!-- end col-md-8 div -->
    </div> <!-- end row div -->
</div> <!-- end container div -->
</section>

@endsection