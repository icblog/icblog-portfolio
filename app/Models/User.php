<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable{
    

 public static function updateLastLoginDate(){
  if (Auth::check()){
    DB::table('users')->where('id', Auth::User()->id)->update(['last_login_date' => \Carbon\Carbon::now()->toDateTimeString()]);
  }
}


public static function checkIfUserExist($fieldTocheck,$fieldValue){
    $outComeArray = array("error" => "", "user" => "");
  
  try {
  
     $user = DB::table('users')->where($fieldTocheck, $fieldValue)->first();
  
     if(!is_null($user)) {
        $outComeArray["user"] = $user;
     }
  
     return $outComeArray;
  
    } catch (\Exception $e) { 
      $outComeArray["error"] = true;
      return $outComeArray;
    }
   
}//End check if user exist




}
