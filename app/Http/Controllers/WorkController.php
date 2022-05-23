<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\WorkTrait;

class WorkController extends Controller{

    use WorkTrait;

public function index(){
   $pageIntro = "Our Work";
   $paginate = true;
   $resPerPage = 16;
   $workData = $this->getWorks($resPerPage,$paginate);
  return view('/work.index', ["pageIntro"=>$pageIntro,"workData"=> $workData]);
  }
}
