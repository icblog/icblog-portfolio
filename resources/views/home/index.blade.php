@extends("layouts.layout")
@section("content")
@section('title', 'home')

<div class="container homepage-container">
	<div class="content-wrapper row">
	 <div class="col-md-10 mx-auto text-center">
	     <h1 class="h1-intro">Hi, I'm Isaac Cobbinah.</h1>
	        <p> Highly motivated self-taught full-stack php web developer with a focus on responsive design and accessibility
			seeking to kick start a career in web development and services.</p> <a

			href="{{route('about.index')}}"
			class="more-about-me-link-home-page">
			More about me</a></p>
        
		
 </div><!-- End col-md-10 div --> 
</div><!-- End content-wrapper row div--> 
</div><!-- End container div -->



@endsection


