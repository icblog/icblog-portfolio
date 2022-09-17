@if(Route::currentRouteName() == 'blog.index')
    @if(!Auth::check())
    <li>
        <a href="{{ route('login.index') }}" class="header-nav-link">
            Login/Register
        </a>
    </li>
    @endif
@endif



@if(Route::currentRouteName() != 'blog.index')
    <li>
        <a href="{{ URL::route('blog.index', ['post','latest']) }}" class="header-nav-link">
            Blog
        </a>
    </li>
@endif


<li>
    <a href="/contact" class="contact-link header-nav-link">
        Contact
    </a>
</li>

@if(Route::currentRouteName() != 'resume.index')
    <li>
        <a href="{{ route('resume.index') }}" class="header-nav-link">
            Resume
        </a>
    </li>
@endif


@if(Route::currentRouteName() != 'about.index')
    <li>
        <a href="{{ route('about.index') }}" class="header-nav-link">
            About
        </a>
    </li>
@endif
