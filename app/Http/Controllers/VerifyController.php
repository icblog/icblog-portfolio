<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\TokenTrait;
use App\Traits\HelperTrait;
use App\Models\User;

class VerifyController extends Controller{
    use TokenTrait;
    use HelperTrait;

     //METHODS USED FROM TokenTrait
      //genarateToken,  decodeToken

     //METHODS USED FROM HelperTrait
     //returnGenericSystemErrMsg, returnLinkErrMsg, checkIsEmail
    public function index(){

        return view('verify/index');
         
    }

    public function verifyToken(Request $request){
       //check if action matches what we are looking for.
     //Send error if it does not match
        $action = $request->action;
        
        if ($action != "register" && $action != "forgotten_pass"){
         return response()->json([
          'error' => $this->returnLinkErrMsg(),
          'action'=>$action
         ]);
        }

      //DECODE AND VERIFY THE TOKEN
      $verifyResErr = $this->decodeToken();

       if($verifyResErr["msg"] == "Good"){
            if($action == "register" || $action == "forgotten_pass"){
              $email = $verifyResErr["data"]->email;
             //Check to unsure is email
               if (!$this->checkIsEmail($email)) {
                  return response()->json([
                    'error' => $this->returnLinkErrMsg(),
                   'action'=>$action
                  ]);
             
                 die();
                }
               //check if link has already been used in DB.
               $userOutCome = User::checkIfUserExist('email',$email);
               //check if the user outcome is error
               if($userOutCome["error"]){
                 return response()->json([
                    'error' => $this->returnLinkErrMsg(),
                   'action'=>$action
                  ]);
                  die();
                }//End if out come error

                if($userOutCome["user"] != ""){
                   //Check the value of token status
                   $userRes =  $userOutCome["user"];
                    if($userRes->token_status == "no"){
                       //All good
                      return response()->json([
                        'error' => '',
                        'action'=>$action
                       ]);
                 
                    }else{
                     //Token already used 
                      return response()->json([
                        'error' => $this->returnLinkErrMsg(),
                       'action'=>$action
                      ]);
                     die();
                    }// end  if $userRes->token_status != "yes"
             
                }else{

                   //if user is empty a new registration(new user)
                   //All good
                     return response()->json([
                    'error' => '',
                    'action'=>$action
                   ]); 
                
                }//End if useroutcome is not empty

            }else{
                return response()->json([
                    'error' => $this->returnLinkErrMsg(),
                   'action'=>$action
                  ]);  
                
            }//End $action == "register" || $action == "forgotten_pass"
       
     
        }else if($verifyResErr["msg"] == "Invalid"){
          return response()->json([
           'error' => $this->returnLinkErrMsg(),
          'action'=>$action
         ]);
        }else{
         return response()->json([
          'error' => $this->returnGenericSystemErrMsg(),
          'action'=>$action
         ]);
        }


    }// end mothod verifyToken

}//end class
