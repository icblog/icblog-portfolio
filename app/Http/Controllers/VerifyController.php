<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\TokenTrait;
use App\Traits\HelperTrait;

class VerifyController extends Controller{
    use TokenTrait;
    use HelperTrait;
    public function index(){

        return view('verify/index');
         
    }

    public function verifyToken(Request $request){
       //check if action matches what we are looking for.
    //Send error if it does not match
        $action = $request->action;
        
    if ($action != "register" && $action != "forgotten_pass" && $action != "reset_password"){
        return response()->json([
          'error' => "Sorry the link has expired or Invalid, please request a new one thank you.",
          'action'=>$action
         ]);
    }

      //DECODE AND VERIFY THE TOKEN
      $verifyResErr = $this->decodeToken();

       if($verifyResErr["msg"] == "Good"){
        if($action =="register"){
            $email = $verifyResErr["data"]->email;
          return response()->json([
          'error' => '',
          'action'=>$action,
          'email'=> $email
         ]);
        }
       return response()->json([
          'error' => '',
          'action'=>$action
         ]);
     
     }else if($verifyResErr["msg"] == "Invalid"){
          return response()->json([
           'error' => "Sorry the link has expired or Invalid, please request a new one thank you.",
          'action'=>$action
         ]);
    }else{
         return response()->json([
          'error' => $this->returnGenericSystemErrMsg(),
          'action'=>$action
         ]);
    }


    }
}
