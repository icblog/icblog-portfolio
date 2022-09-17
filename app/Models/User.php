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
    $outComeArray = array("error"=>"", "user"=>"");
  
  try {
  
     $user = DB::table('users')->where($fieldTocheck, $fieldValue)->first();
  
  if($user) {
        $outComeArray["user"] = $user;
         }else{
        $outComeArray["user"] = "";
     }
  
     return $outComeArray;
  
    } catch (\Exception $e) { // Also tried JwtException
      $outComeArray["error"] = true;
      return $outComeArray;
    }
   
   }//End check if user exist

}
