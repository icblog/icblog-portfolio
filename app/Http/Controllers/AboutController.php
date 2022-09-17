<?php

namespace App\Http\Controllers;

class AboutController extends Controller{
      public function index(){
        $pageIntro = "About me";
        return view('/about.index', ["pageIntro"=>$pageIntro]);
        
    }
}
