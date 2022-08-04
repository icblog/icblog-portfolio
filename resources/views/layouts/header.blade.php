<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <title>icblog | @yield('title')</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- BOOTSTRAP 4 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

    <!-- MAIN CSS -->
    <link rel="stylesheet" href="{{ asset('css/main.css?v='.rand(1,99)) }}">
</head>

<body>

    <header id="main-header">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-content-wrapper">
                        <div class="left-content-wrapper">
                            @include('layouts.logo')
                        </div><!-- End left-content-wrapper -->
                        <div class="middle-content-wrapper">
                            <ul>
                                <li>
                                    <button type="button" title="Close menu" class="show-on-mobile hide-on-desktop"
                                        id="small-screen-close-menu-btn">
                                        <spa><i class="fas fa-times"></i></span>
                                    </button>
                                </li>

                                @include('nav.user-nav')



                            </ul>
                        </div><!-- End middle-content-wrapper -->
                        <div class="right-content-wrapper">
                            <ul>
                                <li>
                                    <button type="button" title="Open menu"
                                        class="menu-btn show-on-mobile hide-on-desktop" id="small-screen-open-menu-btn">
                                        <span><i class="fa fa-bars"></i></span>
                                    </button>
                                </li>
                                @if(Auth::check())
                                    <li>
                                        <span class="account-link">

                                            <div class="dropdown">
                                                <a href="/user/profile" title="Account" class="hello-user">
                                                    <i class="fa fa-user"></i>
                                                </a>
                                                <div class="dropdown-content">

                                                    <span class="span-user-name hello-user">Hi,
                                                        {{ Auth::user()->first_name }}</span>


                                                   @if (Auth::user()->role == "a_admin")
                                                        <a href="/admin/dashboard">
                                                            Admin
                                                        </a>

                                                    @else
                                                        <a href="/user/profile">
                                                            Account
                                                        </a>
                                                    @endif
                                                    <a id="logout-link" href="/logout">
                                                        Log Out
                                                    </a>

                                                </div>

                                            </div>
                                        </span>
                                    </li>
                                @endif

                            </ul>
                        </div> <!-- End right-content-wrapper -->
                    </div><!-- END COL-MD-12 -->
                </div><!-- END HEADER CONTENT WRAPPER -->
            </div><!-- END ROW -->
        </div><!-- END CONTAINER FLUID -->
    </header>
    
    <!-- include Contact modal -->
    @include('contact.contact-modal')
    <!-- include Logout modal -->
    @include('logout.logout-modal')
    <!-- include Verify modal -->
    @include('verify.verify-modal')
