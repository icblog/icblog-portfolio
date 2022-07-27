<li>
    <a
    href="{{route('home.index')}}"
    class="header-nav-link {{ Route::currentRouteNamed('home.index') ? 'active' : '' }}"
    >
    Site home
</a>
</li>

<li>
    <a href="{{ route('admin.index') }}" class="header-nav-link {{ Route::currentRouteNamed('admin.index') ? 'active' : '' }}">
     Dashboard
 </a>
</li>


<li>
    <a href="{{route('admin.addwork')}}" class="header-nav-link {{ Route::currentRouteNamed('admin.addwork') ? 'active' : '' }}">
     Add work
 </a>
</li>
<li>
    <a href="{{route('admin.allwork')}}"
    class="header-nav-link {{ Route::currentRouteNamed('admin.allwork') ? 'active' : '' }}"
    >
    All work
</a>
</li>
<li>
    <a

    href="{{route('admin.allreviews')}}"
    class="header-nav-link {{ Route::currentRouteNamed('admin.allreviews') ? 'active' : '' }}"
    >
    All Reviews
</a>
</li>

<!-- <li>
    <a

    href="/admin/contact-user"
    class="header-nav-link"
    >
    Contact user
</a>
</li> -->