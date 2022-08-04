<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\TokenTrait;
use App\Traits\HelperTrait;
use App\Models\User;

class ForgottenPassController extends BaseController{
    use TokenTrait;
    use HelperTrait;
      //METHODS USED FROM TokenTrait
      //genarateToken

     //METHODS USED FROM HelperTrait
     //returnGenericSystemErrMsg
     

     public function index(){
        $pageIntro = "Forgotten pass";
        return view('/forgotten-pass.index', ["pageIntro"=>$pageIntro]);
        
    }

    public function handleForgottenPassForm(Request $request){
           //Check if the hidden recaptcha input is filled in,
        //is a bot that filled the form in, throw an error.
        if($request->recaptcha != ""){
            return response()->json([
              'error' => $this->returnGenericSystemErrMsg()
              ]);
            die();
           }

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|regex:/(.+)@(.+)\.(.+)/i'
        ]);

        if ($validator->fails()) {

            return response()->json(['error' => $validator->errors()->all()]);
              die();
          }

          //Check if user exist if so send the a link to reset their password.
      
            $userOutCome = User::checkIfUserExist('email',$request->email);
            //check if the user outcome is error
            if($userOutCome["error"]){
            return response()->json([
                'error' => $this->returnGenericSystemErrMsg()
            ]);
            die();
            }//End if out come error


             //Generate token
        $tokenData = array('email' => $request->email);
        $token = $this->genarateToken($this->linkExpireTime,$tokenData);//expire time in seconds(10mins)

        //if user exist, send a password reset link.
      //if not send verify link to user email.
            
      $sendLinkOutCome = $this->sendPasswordWordResetLink($token, $request->email);
            
      if($sendLinkOutCome["error"]){
        return response()->json([
            'error' => $this->returnGenericSystemErrMsg()
        ]);
       die();
       }//End if out come error
    
       //No user return the success reponds regardless
       return response()->json([
        'error' => "",
        "outcome" => true
        ]);

    }

    
}
