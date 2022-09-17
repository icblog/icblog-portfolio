<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class LoginController extends BaseController{
//METHODS USED FROM HELPER TRAIT FROM BASE CONTROLLER CLASS WHICH THIS CLASS EXTENDS
//returnGenericSystemErrMsg
  
public function index(){
        $pageIntro = "Log in securely";
        return view('/login.index', ["pageIntro"=>$pageIntro]);
        
    }

    public function handleLoginForm(Request $request){
        //Check if the hidden recaptcha input is filled in,
        //is a bot that filled the form in, throw an error.
        if($request->recaptcha != ""){
            return response()->json([
              'error' => $this->returnGenericSystemErrMsg()
              ]);
            die();
           }
        $validator = Validator::make($request->all(), [
           'email' => 'required|string|regex:/(.+)@(.+)\.(.+)/i',
           'password'=>'required|string',
       ]); 
       
        if ($validator->fails()) {
          return response()->json([
              'error' => $validator->errors()->all()
          ]);
          die();
        }//end if validation
       
       
               //Log in user if validation pass
           try {
             $credentials = $request->only('email', 'password');
             if (Auth::attempt($credentials)) {
                 User::updateLastLoginDate();
               $request->session()->regenerate();
                
               $defaultUrl = route("blog.index",["post","latest"],false);//route name
                 if(Auth::user()->role == "a_admin"){
                  $defaultUrl = route("admin.dashboard",[],false);
                 }
                 //Intended url is stored in session by admin middleware located in the middleware folder 
                 $defaultUrl = $this->replaceFirstOccuranceOfChar("/","",$defaultUrl);
                 $intendedUrl =  $request->session()->pull('intendedUrl', $defaultUrl);

              return response()->json([
                 "error" => "",
                 "outcome" => true,
                 "redirectUrl" => $intendedUrl

             ]);
            }else{
                return response()->json([
                   'error' => ["The provided credentials do not match our records, please try again."],
                 "outcome" => false
             ]);
            }
        } catch (\Exception $e) {
          
          return response($e)->json([
             'error' => [$this->returnGenericSystemErrMsg()],
             "outcome" => false
         ]);
       
       }
       
    }//End handleLoginForm

    
}
