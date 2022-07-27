<?php

namespace App\Http\Controllers;

use App\Traits\HelperTrait;
use App\Models\User;

class BaseController extends Controller{
   
    use HelperTrait;
     //METHODS USED FROM HelperTrait
     //sendAlinkToUser

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
