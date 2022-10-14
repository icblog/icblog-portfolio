<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RegisterController extends BaseController{

//METHODS USED FROM HELPER TRAIT FROM BASE CONTROLLER CLASS WHICH THIS CLASS EXTENDS
//returnGenericSystemErrMsg

//METHODS USED FROM TOKEN TRAIT FROM BASE CONTROLLER CLASS WHICH THIS CLASS EXTENDS
//genarateToken
    
    public function index(){
        $pageIntro = "Register";
        return view('/register.index', ["pageIntro"=>$pageIntro]);
        
    }// end index


  public function showCompleteRegisterForm(){
      $pageIntro = "Complete Registeration";
      return view('/register.complete-register', ["pageIntro"=>$pageIntro]);
      
  }// end index

    public function handleInitialRegister(Request $request){
        //Check if the hidden recaptcha input is filled in,
        //is a bot that filled the form in, throw an error.
        if($request->recaptcha != ""){
          return response()->json([
            'error' => $this->returnGenericSystemErrMsg()
            ]);
          die();
         }

        $action = "";
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|regex:/(.+)@(.+)\.(.+)/i'
        ]);

        if ($validator->fails()) {

          return response()->json(['error' => $validator->errors()->all()]);
            die();
        }

      //Check if user exist if so send the a link to reset their password if not send a link to verify email and feedback to ajax.
      
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
        $token = $this->genarateToken($this->linkExpireTime,$tokenData);

        //if user exist, send a password reset link.
      //if not send verify link to user email.

      if($userOutCome["user"] == ""){
            $action = "register";
            $subject ="About your registration";
            $emailTemplate = "mail.new-account";
            $sendLinkOutCome = $this->sendAlinkToUser($token,$request->email,$action,$subject,$emailTemplate);
        
     }else{
         
            $sendLinkOutCome = $this->sendPasswordWordResetLink($token, $request->email);
           
     }//End if user is empty

       if($sendLinkOutCome["error"]){
        return response()->json([
            'error' => $this->returnGenericSystemErrMsg()
        ]);
       die();
       }//End if out come error
    
    return response()->json($sendLinkOutCome["outcome"]); 

         
}// end initialRegister

public function store(Request $request){
  //Check if the hidden recaptcha input is filled in,
        //is a bot that filled the form in, throw an error.
        if($request->recaptcha != ""){
          return response()->json([
            'error' => $this->returnGenericSystemErrMsg()
            ]);
          die();
         }

  //Custom attribute names
// $attributeNames = array(
//    'fname' => 'first name',
//    'lname' => 'last name'
 

// );

$validator = Validator::make($request->all(), [
   'email' => 'required|string|regex:/(.+)@(.+)\.(.+)/i',
   'username'=>'required|string',
   'password'=>'required|string|min:8',

]); 

//$validator->setAttributeNames($attributeNames);
if ($validator->fails()) {
  return response()->json([
      'error' => $validator->errors()->all()
  ]);
  die();
   }//end if validation

 

   //Check if user exist if so send the a link to reset their password if not save the data and feedback to ajax.

   $userOutCome = User::checkIfUserExist('email',$request->email);
   
   //Check If the query resulted in error
   if($userOutCome["error"]){
      return response()->json([
        'error' => $this->returnGenericSystemErrMsg()
      ]);
     die();
   }//End if out come error

   //Check if user was not found by te email, 
   //if user was found, send password reset link to their email
 if($userOutCome["user"] == ""){

     //Check if username already taken.
    $userOutCome = User::checkIfUserExist('username',$request->username);
     
    //Check If the query resulted in error
    if($userOutCome["error"]){
     return response()->json([
         'error' => $this->returnGenericSystemErrMsg()
     ]);
    die();
  }//End if out come error

   //If no error check if the query returned a user
   //if it did send no duplicate username message
   if($userOutCome["user"] != ""){
    return response()->json([
        'error' => "Username has already been taken, try a different one thank you."
    ]);
   die();
 }//End if out come error
     
  try {

    $user = new User();
    $user->email = $request->email;
    $user->username = $request->username;
    $user->token_status = "yes";
    $user->password = Hash::make($request->password);
    $user->uip = $request->ip();
    $user->save();

    //Login the user after registration

    $credentials = $request->only('email', 'password');
    Auth::attempt($credentials);
    User::updateLastLoginDate();
    $request->session()->regenerate();
    $isAdmin =  false;
      if(Auth::user()->role == "a_admin"){
         $isAdmin =  true;
      } 
      $redirectUrl = route("blog.index",["post","latest"],false);//route name
      $redirectUrl = $this->replaceFirstOccuranceOfChar("/","",$redirectUrl);
       return response()->json([
          'error' => "",
          "outcome" => true,
          "isAdmin"=> $isAdmin,
          "redirectUrl" => $redirectUrl
      ]);

   
} catch (\Exception $e) {

 return response()->json([
    'error' => [$this->returnGenericSystemErrMsg()],
    "outcome" => false
]);

}
  
}else{
      //Generate token
      $tokenData = array('email' => $request->email);
      $token = $this->genarateToken($this->linkExpireTime,$tokenData);//expire time in seconds(10mins)
      $sendLinkOutCome = $this->sendPasswordWordResetLink($token, $request->email);
      if($sendLinkOutCome["error"]){
        return response()->json([
            'error' => $this->returnGenericSystemErrMsg()
        ]);
       die();
       }//End if out come error
    
    return response()->json($sendLinkOutCome["outcome"]);
}//End if user is empty

}//End method store 
   
}//end class
