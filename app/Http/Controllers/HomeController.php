<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\WorkTrait;
class HomeController extends Controller{

    use WorkTrait;
    
    public function index(){
        
        $workData = $this->getWork(8);
        return view('/home.index', ["workData"=> $workData]);
        
    }

    
}
