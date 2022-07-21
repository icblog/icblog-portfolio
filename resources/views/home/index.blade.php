@extends("layouts.layout")
@section("content")
@section('title', 'home')

<div class="container">
	<div class="row">
		<div class="home-wrapper text-center col-md-8 mx-auto">
			<h1 class="h1-intro">Hi, I'm Isaac Cobbinah.</h1>
			<p> Highly motivated, self-taught full-stack php web developer with a focus on responsive design and accessibility
			seeking to kick start a career in web development and services.</p> <a

			href="{{route('about.index')}}"
			class="more-about-me-link-home-page">
			More about me</a><span class="more-about-me-arrow"> >></span></p>

	</div>
</div>
</div>



@endsection


