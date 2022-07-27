<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

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
