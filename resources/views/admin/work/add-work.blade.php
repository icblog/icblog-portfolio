@extends("layouts.layout")
@section("content")
@section('title', 'admin dashboard')


<section class="add-work">
  <div class="container-fluid">
    @include('layouts.page-intro')
    <div class="row">
      <div id="add-work-form-wrapper" class="col-md-10 mx-auto mb-5 mt-2">

        <form method="POST" id="add-work-form" enctype="multipart/form-data">
        <label class="active">Work Photos</label>
            <div class="mb-4 input-images"></div>
            <div class="err-div"></div>
            <div class="text-center">

          <button type="submit" id="add-work-submit-btn" class="add-work-submit-btn primary-btn">Submit</button>
          </div>
       </form>
     </div>
   </div>
</section>

@endsection