@extends("layouts.layout")
@section("content")
@section('title', 'admin allpost')
<section>
  <div class="container-fluid">
    <div class="row pt-5">
       <div class="col-md-12 text-center">
        @include('layouts.page-intro')
        <p>Hello! admim see all post details below or <a class="btn primary-btn no-border-radius" href="{{route('admin.addpost')}}">Add post</a></p>
      </div> <!-- end col-md-12 div -->
    </div> <!-- end row div -->
    <div class="row pt-3">
      <div class="col-md-10 mx-auto">
       <div id="all-post-wrapper">
                      @if($totalCount > 0)
                      @foreach ($postResult as $post)
                        <div class="admin-post-detail-wrapper p-2 box-shadow mb-4">
                           <div class="text-right">
                            <!-- Edit and Delete Btn -->
                              <a href="{{route('admin.editPostIndex',$post->id)}}" class="btn btn-primary edit-post-btn no-border-radius"><span><i class="fas fa-edit"></i></span></a>
                              <button type="button" class="btn btn-danger delete-post-btn no-border-radius" data-postid="{{$post->id}}" data-posthasimages="{{$post->has_images}}" data-cloudinaryfoldername="{{$post->cloudinary_folder_name}}"><span><i class="fas fa-trash"></i></span></button>
                        </div>
                            <h4 class="post-title">{{$post->title}}</h4>
                            <div class="post-error-div"></div> 
                           <p>
                            Status: <span class="admin-detail-value-span {{$post->status == 'saved' ? 'text-danger' : 'text-success'}}"><strong>{{$post->status}}</strong></span><br/> 
                            Created date: <span class="admin-detail-value-span">{{$post->created_at}}</span><br/> 
                            Created by: <span class="admin-detail-value-span">{{$post->createdby_name}}</span><br/>
                            Updated date: <span class="admin-detail-value-span">{{$post->updated_at == $post->created_at ? "--" : $post->updated_at}}</span><br/>
                            Updated by: <span class="admin-detail-value-span">{{$post->updatedby_name == NULL ? "--" : $post->updatedby_name}}</span><br/>
                         </p>
                        
                       </div><!--admin-post-detail-wrapper -->
                        @endforeach
                        @else
                          
                              <p class="no-border-radius alert alert-info text-center">There is currently no post.</p>
                              
                          
                        @endif
                       </div><!--admin-all-post-wrapper -->
                
                <div class="next-pre-btn-wrapper mt-2 text-center" data-dir1="<?php echo $pagenum; ?>" data-dir2="<?php echo $last; ?>" data-dir3="<?php echo $totalCount; ?>" data-resultperpage="<?php echo $resultPerPage; ?>"><button class="pre-btn primary-btn">Previous</button>&nbsp;&nbsp;&nbsp;<button class="next-btn primary-btn">Next</button></div>
       </div> <!-- end col-md-12 div -->
    </div> <!-- end row div -->
</div> <!-- end container div -->
</section>

@endsection