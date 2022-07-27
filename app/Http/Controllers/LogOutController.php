<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LogOutController extends Controller{

    public function index(Request $request){
       
        try {

            Auth::logout();
       
          $request->session()->invalidate();
       
          $request->session()->regenerateToken();
      
          return response()->json([
                'error' => "",
                "outcome" => true
            ]);
          
       } catch (\Exception $e) {
         
         return response($e)->json([
            'error' => ["Sorry system error, please clear your browser history or close your browser and your session should be destroyed thank you."],
            "outcome" => false
        ]);
      
      }
        
    }

    
}
