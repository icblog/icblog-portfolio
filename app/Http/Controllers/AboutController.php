<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AboutController extends Controller{
      public function index(){
        $pageIntro = "About me";
        return view('/about.index', ["pageIntro"=>$pageIntro]);
        
    }
}
