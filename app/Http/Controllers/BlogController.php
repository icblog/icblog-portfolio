<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(){
        $pageIntro = "Latest Blog Post";
        return view('/blog.index', ["pageIntro"=>$pageIntro]);
        
    }
}
