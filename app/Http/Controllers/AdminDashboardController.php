<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminDashboardController extends Controller{
    public function index(){
      $pageIntro = "Admin dashboard";
      return view('/admin.dashboard.index', ["pageIntro"=>$pageIntro]);
    }
}
