@extends("layouts.layout")
@section("content")
@section('title', '404')
<div class="container-fluid">
	<div class="row">
		<div class="pt-5 col-md-12">
			<h2 class="pb-3 text-center">Page not found</h2>
			<p class="text-center lead">
				Sorry! the page you're looking for can't be found,
				try the home page or contact me for help.
			</p>
		</div>

		<div class="pt-3 pb-3 text-center col-md-12">
            <a href="{{route('home.index')}}" class="primary-btn d-inline-block mr-3">Home page</a>  <a href="{{route('resume.index')}}" class="contact-link primary-btn d-inline-block ml-3">Contact</a>
        </div><!-- end col-md-12 div -->
	</div>
</div>
@endsection