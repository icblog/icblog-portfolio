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

        //Custom attribute names
        $attributeNames = array(
          'email_username' => 'Username or email'
        );

        $validator = Validator::make($request->all(), [
           'email_username' => 'required|string',
           'password'=>'required|string',
       ]);
       
        //Use custom attributes names for error reporting
       $validator->setAttributeNames($attributeNames);
       
        if ($validator->fails()) {
          return response()->json([
              'error' => $validator->errors()->all()
          ]);
          die();
        }//end if validation
       
        //Attempt to Log in user if validation pass
           try {
             $user = false;
            //Try loging user in with username and password
             $credentials_1 = array(
                 "username" => $request->email_username,
                 "password" => $request->password
                );

               $user = Auth::attempt($credentials_1);

              if(!$user){
                //If first credentials failed try loging user in with email and password
                $credentials_2 = array(
                  "email" => $request->email_username,
                  "password" => $request->password
                 );
                $user = Auth::attempt($credentials_2);
              }


                 //If that failed too, send an error
              if(!$user){
                return response()->json([
                  'error' => ["The provided credentials do not match our records, please try again."],
                "outcome" => false
                ]);
              }

              //If all good log the user in and feedback ajax

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
            
        } catch (\Exception $e) {
          
          return response($e)->json([
             'error' => [$this->returnGenericSystemErrMsg()],
             "outcome" => false
         ]);
       
       }
       
    }//End handleLoginForm

    
}
