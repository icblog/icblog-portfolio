<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Traits\HelperTrait;
use App\Traits\TokenTrait;
use App\Models\User;
use App\Lib\AjaxPagination;
use App\Lib\Cloudinary;

class BaseController extends Controller{
   
    use HelperTrait;
    use TokenTrait;
     //METHODS USED FROM HelperTrait
     //sendAlinkToUser


   public function cloudinaryInstance(){
      $cloudinary = new Cloudinary();
      return  $cloudinary;
    }

    public function ajaxPaginationInstance($params){
      $ajaxPagination = new AjaxPagination($params);
      return  $ajaxPagination;
    }

  

    public $linkExpireTime = 1200;//(20mins)

     public function sendPasswordWordResetLink($token, $email){

     try {
            
       User::where('email', $email)->update(['token_status' => 'no','what_was_change' => 'Token status']);
       $action = "forgotten_pass";
       $subject ="About your account";
       $emailTemplate = "mail.reg-email-exist";
       return $this->sendAlinkToUser($token, $email, $action, $subject, $emailTemplate);
       
    } catch (\Exception $e) {
     
         return ["error" => true];
     
    }

    
 }
 

 
    
}
