@extends("layouts.layout")
@section("content")
@section('title', 'home')

<div class="container">
	<div class="content-wrapper row">
	 <div class="col-md-9 mx-auto">
	  <div class="row">
	    <div class="col-md-5">
			<h1 class="h1-intro">Hi, I'm Isaac Cobbinah.</h1>
	     </div>
		   <div class="col-md-7">
			<p> Highly motivated, self-taught full-stack php web developer with a focus on responsive design and accessibility
			seeking to kick start a career in web development and services.</p> <a

			href="{{route('about.index')}}"
			class="more-about-me-link-home-page">
			More about me</a><span class="more-about-me-arrow"> >></span></p>
        </div>
	</div><!-- End row div --> 	
 </div><!-- End col-md-8 div --> 
</div><!-- End content-wrapper row div--> 
</div><!-- End container div -->



@endsection


