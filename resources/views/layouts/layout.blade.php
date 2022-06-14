@include('layouts.header')
       
<div class="container">
  <div class="row">
   <div class="text-center col-md-12">
    <h1>@yield('intro')</h1>
    </div>
    </div>
    </div>
<div class="content-wrapper-layout">
  @yield("content")
</div>
@include('layouts.footer')

