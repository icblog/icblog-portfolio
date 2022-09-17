@extends("layouts.layout")
@section("content")
@section('title', 'admin categories')
<section>
  <div class="container">
    <div class="row pt-5">
       <div class="col-md-12 text-center">
        @include('layouts.page-intro')
        <p>Hello! admin manage category below.</p>
      </div> <!-- end col-md-12 div -->
    </div> <!-- end row div -->
    <div class="row pt-3">
    <div class="col-md-8 mx-auto">
                <div class="form-wrapper">
                  <div class="err-div"></div>
                    <form id="add-category-form" class="add-category-form" method="POST">
                       <div class="form-group category-form-group-wrapper">
                            <label class="form-label" for="category-name">Create a new category <br/> Name*</label>
                            <input type="text" class="form-control" id="category-name" name="categoryname">
                            <button id="add-category-form-btn" type="submit" class="add-category-form-btn primary-btn">Save</button>
                        </div>
                        <p class="small">
                            All fields marked with a * are mandatory
                        </p>
                        </form>
                        <p>Already saved categories</p>
                      <div id="admin-all-category-wrapper">
                      @if($totalCount > 0)
                      @foreach ($categoriesResult as $category)
                        <div class="admin-category-detail-wrapper p-2 box-shadow mb-4">
                        <div class="input-group">
                         <input type="button" class="form-control admin-all-category-input" value="{{$category->name}}" data-dir="{{$category->name}}" data-categoryid="{{$category->id}}">
                           <div class="input-group-append">
                            <!-- Edit and Delete Btn -->
                            <button class="btn btn-primary edit-category-btn" type="button"><span><i class="fas fa-edit"></i></span></button>
                            <button class="btn btn-danger delete-category-btn" type="button"><span><i class="fas fa-trash"></i></span></button>
                                 <!-- Save and Cancel Btn -->
                            <button class="btn btn-success save-category-btn" type="button"><span><i class="fas fa-check"></i></span></button>
                            <button class="btn btn-warning cancel-category-btn" type="button"><span><i class="fas fa-times"></i></span></button>
                         </div>
                        </div>
                        <div class="category-err-div"></div> 
                        <p>
                            Created date: <span class="admin-detail-value-span">{{$category->created_at}}</span><br/> 
                            Created by: <span class="admin-detail-value-span">{{$category->createdby_name}}</span><br/>
                            Updated date: <span class="admin-detail-value-span">{{$category->updated_at == $category->created_at ? "--" : $category->updated_at}}</span><br/>
                            Updated by: <span class="admin-detail-value-span">{{$category->updatedby_name == NULL ? "--" : $category->updatedby_name}}</span><br/>
                         </p>
                        
                        </div><!--admin-category-detail-wrapper -->
                        @endforeach
                        @else
                          
                              <p class="text-center">There is currently no category, please add one using the form above thank you.</p>
                          
                        @endif
                       </div><!--admin-all-category-wrapper -->
                </div><!-- end form-wrapper div -->
                <div class="next-pre-btn-wrapper mt-2 text-center" data-dir1="<?php echo $pagenum; ?>" data-dir2="<?php echo $last; ?>" data-dir3="<?php echo $totalCount; ?>" data-resultperpage="<?php echo $resultPerPage; ?>"><button class="pre-btn primary-btn">Previous</button>&nbsp;&nbsp;&nbsp;<button class="next-btn primary-btn">Next</button></div>
            </div> <!-- end col-md-8 div -->
    </div> <!-- end row div -->

</div> <!-- end container div -->
</section>

@endsection