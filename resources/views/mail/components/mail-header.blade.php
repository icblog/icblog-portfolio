<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <style>
    body {
     color: #373a3d;
     background-color: #f1f1f1;
     padding-top: 60px;
     padding-bottom: 60px;
   }
   .logo{
    text-decoration: none;
           font-weight: bold;
           margin-top: 1.5rem;
           color: #000000;
           padding: 0;
          font-size: 1.2rem;
          display: block;
   }
   .content-wrapper{
    background-color: #ffffff; 
             border: 1px solid #e9e9e9; 
             width: 70%; 
             padding: 15px; 
             font-size: 1.2rem;
             margin: 0 auto; 
             max-width: 800px;
    }

   .lmt{
       margin-top: 1.8rem;
   }

 </style>
</head>
<body>
<div class="content-wrapper">
   <a class="logo" href="{{route('home.index')}}" target="_blank">
      ADOM<span><img src="https://res.cloudinary.com/adomb/image/upload/v1648977490/imgs/logo-icon_uaw2yr.png" /></span>
       BALLOONS
  </a>

  @if($dataObj->name == "")
    <h6 class="lmt">Hello,</h6>
@else
    <h6 class="lmt">Hello, {{$dataObj->name}}</h6>
@endif
  



