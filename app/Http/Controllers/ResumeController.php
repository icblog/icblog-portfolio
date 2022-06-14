<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ResumeController extends Controller
{
       public function index(){
        $pageIntro = "Resume";
        return view('/resume.index', ["pageIntro"=>$pageIntro]);
        
    }
}
