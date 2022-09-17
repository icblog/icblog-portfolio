<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class ResetPassController extends BaseController{
  //METHODS USED FROM HELPER TRAIT FROM BASE CONTROLLER CLASS WHICH THIS CLASS EXTENDS
 // returnGenericSystemErrMsg
 //returnLinkErrMsg

//METHODS USED FROM TOKEN TRAIT FROM BASE CONTROLLER CLASS WHICH THIS CLASS EXTENDS
//genarateToken
//deCorded
    public function index(){
        $pageIntro = "Reset password";
        return view('/reset-pass.index', ["pageIntro"=>$pageIntro]);
    }// end index
  
    public function update(Request $request){
      //Check if the hidden recaptcha input is filled in,
        //if so it a human that filled it in, throw an error.
        if($request->recaptcha != ""){
          return response()->json([
            'error' => $this->returnGenericSystemErrMsg()
            ]);
          die();
         }

        if($request->action == "reset_password"){
      
                //Custom attribute names
           $attributeNames = array('pwd' => 'password',);
      
           $validator = Validator::make($request->all(), [
              'pwd'=>'required|string|min:8',
      
          ]); 
      
           $validator->setAttributeNames($attributeNames);
           if ($validator->fails()) {
             return response()->json([
                 'error' => $validator->errors()->all(),
                 'action'=>''
             ]);
             die();
          }//end if validation
      
           //DECODE AND VERIFY THE TOKEN
          $verifyResErr = $this->decodeToken();
      
        if($verifyResErr["msg"] == "Good"){
             //Get email data from token 
           $email = $verifyResErr["data"]->email;
              //Hash and update password
           $hashPassword = Hash::make($request->pwd);
           try {
             $user = User::where('email', $email)->update(['password' => $hashPassword,'what_was_change' => 'Password', 'token_status'=>'yes']);
             
             return response()->json([
                'error' => "",
                'action'=>''
                
            ]);
         } catch (\Exception $e) {
      
             return response()->json([
                'error' => $this->returnGenericSystemErrMsg(),
                'action'=>''
            ]);
      
         }
     }else if($verifyResErr["msg"] == "Invalid"){
        return response()->json([
           'error' => $this->returnLinkErrMsg(),
           'action'=> $request->action
       ]);
      }else{
         return response()->json([
            'error' => [$this->returnGenericSystemErrMsg()],
            'action'=> $request->action
        ]);
      }
      
 }//End if request new action
        
}//End update


 




   
}//end class
