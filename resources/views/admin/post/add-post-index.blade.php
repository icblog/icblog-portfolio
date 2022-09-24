@extends("layouts.layout")
@section("content")
@section('title', 'admin add post')
<section>
  <div class="container-fluid">
    <div class="row pt-5">
       <div class="col-md-12 text-center">
        @include('layouts.page-intro')
        <p>Hello! admin add post details below.</p>
        
      </div> <!-- end col-md-12 div -->
    </div> <!-- end row div -->
    <div class="row pt-3">
      <div class="col-md-8 mx-auto">
      <div class="text-right"><a class="btn primary-btn no-border-radius" href="{{route('admin.allpost')}}">All post</a></div>
          <div class="form-wrapper">
          
          <form action="{{route('admin.storepost')}}" id="add-post-form" class="add-post-form" method="POST" enctype="multipart/form-data">
                <div class="form-group">
                     <label class="form-label" for="Post-images">Post-images</label><span> (Optional)</span>

                     <div class="mb-4 add-post-input-images"></div>
                </div> 
                <div class="err-div"></div>  
               <div class="form-group">
                     <label class="form-label" for="title">Title *</label>
                       <input type="text" class="form-control" id="title" name="title"  maxlength="400">
                  </div>
                    <div class="form-group">
                        <label class="form-label" for="category">Category *</label>
                          <div class="input-group mb-3">
                          @if(!empty($categoriesResult))
                          <select id="admin-post-category-select" data-max="" multiple="multiple" style="" name="selectedCategories[]">
                            
                            @foreach ($categoriesResult as $category)
                              <option value="{{$category->id}}">{{$category->name}}</option>
                             @endforeach
                            </select>
                            @else
                            <p value="">Sorry! no categories yet</p>
                            @endif
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="form-label" for="postbody">Body *</label>
                          <p>You can use markdown inside the body area click <a href="https://www.markdownguide.org/cheat-sheet" rel="nofollow" target="_blank">here</a> for more info thank you.</p>
                          <textarea class="form-control" id="postbody" name="postbody" rows="3" maxlength="10000"></textarea>
                        </div>
                        <div class="text-center saveorpublish">
                          <label class="label-container">Save post 
                            <input type="radio" name="saveorpublish" value="saved">
                          </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <label class="label-container">Publish post
                            <input type="radio" name="saveorpublish" value="published">
		
	        	            </label>
                      </div>
                        <p class="small">
                            All fields marked with a * are mandatory
                        </p>
                        <div class="pt-3 text-center">
                            <button id="post-form-btn" type="submit" class="post-form-btn primary-btn">Submit</button>
                        </div>
                    </form>
                </div><!-- end form-wrapper div -->
          </div> <!-- end col-md-8 div -->
    </div> <!-- end row div -->
</div> <!-- end container div -->
</section>

@endsection