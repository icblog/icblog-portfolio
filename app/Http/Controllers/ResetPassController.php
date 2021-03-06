<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Traits\TokenTrait;
use App\Traits\HelperTrait;

class ResetPassController extends Controller{
    use TokenTrait;
    use HelperTrait;
      //METHODS USED FROM TokenTrait
      //genarateToken
      //deCorded

     //METHODS USED FROM HelperTrait
     // returnGenericSystemErrMsg
     //returnLinkErrMsg

    
    public function index(){
        $pageIntro = "Reset password";
        return view('/reset-pass.index', ["pageIntro"=>$pageIntro]);
    }// end index
    public function showCompleteRegisterForm(){
        $pageIntro = "Complete Registeration";
        return view('/register.complete-register', ["pageIntro"=>$pageIntro]);
        
    }// end showCompleteRegisterForm
    public function update(Request $request){

        if($request->action == "reset_password"){
      
                //Custom attribute names
           $attributeNames = array(
             'pwd' => 'password',
      
         );
      
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
