<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AboutController extends Controller{
      public function index(){
        $pageIntro = "About us";
        return view('/about.index', ["pageIntro"=>$pageIntro]);
        
    }
}
