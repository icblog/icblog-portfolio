<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\WorkTrait;

class WorkController extends Controller{

    use WorkTrait;

public function index(){
   $pageIntro = "Our Work";
   $workData = $this->getWork(16);
   //dd($workData);
  
   return view('/work.index', ["pageIntro"=>$pageIntro,"workData"=> $workData]);
  }
}
