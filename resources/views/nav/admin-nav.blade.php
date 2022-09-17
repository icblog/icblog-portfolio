<li>
    <a
    href="{{route('admin.dashboard')}}"
    class="header-nav-link {{ Route::currentRouteNamed('admin.dashboard') ? 'active' : '' }}"
    >
    Admin dashboard
</a>
</li>
<li>
    <a
    href="{{ URL::route('blog.index', ['post','latest']) }}"
    class="header-nav-link {{ Route::currentRouteNamed('blog.index') ? 'active' : '' }}"
    >
    Blog home
</a>
</li>
<li>
    <a
    href="{{route('home.index')}}"
    class="header-nav-link {{ Route::currentRouteNamed('home.index') ? 'active' : '' }}"
    >
    Site home
</a>
</li>

