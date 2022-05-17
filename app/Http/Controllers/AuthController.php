<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Mail\AppMail;
use App\Traits\TokenTrait;
use App\Traits\HelperTrait;




class AuthController extends Controller
{
  use TokenTrait;
  use HelperTrait;

  private function sendAlinkToUser($email,$action,$subject,$emailTemplate){

     //Generate token
    $tokenData = array('email' => $email);
     $tk = $this->genarateToken(18000,$tokenData);//expire time in seconds(30mins)
     $verifyLink = env('APP_URL', '')."/verify/".$tk."/".$action;
     
     $dataArray = array(
         "name"=>"",
         "link"=>$verifyLink
     );
      //convert data array into data object for blade view
     $dataObj = (object)$dataArray;
     try {

         Mail::to($email)->send(new AppMail($subject,$emailTemplate,$dataObj));

         return ["error"=>"","outcome" => true];

     } catch (\Exception $e) { 
      return [
        'error' => $this->returnGenericSystemErrMsg(),
        "outcome" => false
    ];
}


    }// End sendAlinkToUser


    public function index(Request $request){
       $validator = Validator::make($request->all(), [
           'email' => 'required|string|regex:/(.+)@(.+)\.(.+)/i'
       ]);

       if ($validator->fails()) {

          return response()->json([

            'error' => $validator->errors()->all()

        ]);
          die();
      }

       //Check if user exist if so send the a link to reset their password if not send a link to verify email and feedback to ajax.

      $userOutCome = $this->checkIfUserExist('email',$request->email);
      if($userOutCome["msg"] == "error"){
          return response()->json([
             'error' => $userOutCome["data"]
         ]);
          die();

     }//End if out come error

    //Check the post action
     if($request->action == "register"){

       //Check if outcome data is true
       if($userOutCome["data"] && $userOutCome["msg"] == ""){
        //we have user, refuse to re-register send email to reset password.
          $subject ="About your account";
          $emailTemplate = "mail.reg-email-exist";
          $sendLinkOutCome = $this->sendAlinkToUser($request->email,$request->action,$subject,$emailTemplate);
          return response()->json($sendLinkOutCome);
   }//End Check if outcome data is true

       //Check if outcome data is false
   if(!$userOutCome["data"] && $userOutCome["msg"] == ""){

    $subject ="About your registration";
    $emailTemplate = "mail.new-account";
    $sendLinkOutCome = $this->sendAlinkToUser($request->email,$request->action,$subject,$emailTemplate);
    return response()->json($sendLinkOutCome);
    
   }//End Check if outcome data is false

}else if($request->action == "forgotten_pass"){

    if($userOutCome["data"] && $userOutCome["msg"] == ""){
        //we have user, send email to reset password.
      $subject ="About your account";
      $emailTemplate = "mail.reg-email-exist";
      $sendLinkOutCome = $this->sendAlinkToUser($request->email,$request->action,$subject,$emailTemplate);
      return response()->json($sendLinkOutCome);
  }else{
        //No user return the success reponds regardless
    return response()->json([
        'error' => "",
        "outcome" => true
    ]);
     }//End Check if outcome data is true

 }else{
         //Else if action does not match above issue error
    return response()->json([
      'error' => [$this->returnGenericSystemErrMsg()],
      "outcome" => false
  ]);
}//END IF ACTION


}//End index



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
       $user = User::where('email', $email)->update(['password' => $hashPassword,'what_was_change' => 'Password']);
       
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
     'error' => ["Sorry the link has expired or Invalid, please request a new one thank you."],
     'action'=>$request->$action
 ]);
}else{
   return response()->json([
      'error' => [$this->returnGenericSystemErrMsg()],
      'action'=>$request->$action
  ]);
}


  }//End if request new action
  
  
}//End update

public function store(Request $request){

   //Custom attribute names
 $attributeNames = array(
    'fname' => 'first name',
    'lname' => 'last name',
    'pwd' => 'password',

);

 $validator = Validator::make($request->all(), [
    'email' => 'required|string|regex:/(.+)@(.+)\.(.+)/i',
    'title'=>'required|string',
    'fname'=>'required|string',
    'lname'=>'required|string',
    'pwd'=>'required|string|min:8',

]); 

 $validator->setAttributeNames($attributeNames);
 if ($validator->fails()) {
   return response()->json([
       'error' => $validator->errors()->all()
   ]);
   die();
    }//end if validation

    //Check if user exist if so send the a link to reset their password if not save the data and feedback to ajax.

    $userOutCome = $this->checkIfUserExist('email',$request->email);
    if($userOutCome["data"] == "error"){
      return response()->json([
         'error' => $userOutCome["msg"]
     ]);
      die();

     }//End if out come error

     //Check if outcome data is true
     if($userOutCome["data"] && $userOutCome["msg"] == ""){
        //we have user, refuse to re-register send email to reset password.
      $subject ="About your account";
      $emailTemplate = "mail.reg-email-exist";
      $sendLinkOutCome = $this->sendAlinkToUser($request->email,"forgotten_pass",$subject,$emailTemplate);
      return response()->json($sendLinkOutCome);
   }//End Check if outcome data is true

       //Check if outcome data is false
   if(!$userOutCome["data"] && $userOutCome["msg"] == ""){

         //Save user data in Db
    try {

      $user = new User();
      $user->title = $request->title;
      $user->email = $request->email;
      $user->first_name = $request->fname;
      $user->last_name = $request->lname;
      $user->password = Hash::make($request->pwd);
      $user->uip = $request->ip();
      $user->save();

      return response()->json([
          "error"=>"",
          "outcome" => true
      ]);
  } catch (\Exception $e) {

   return response()->json([
      'error' => [$this->returnGenericSystemErrMsg()],
      "outcome" => false
  ]);

}
 }//End Check if outcome data is false


}//End method store


public function login(Request $request){

 
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
          $isAdmin =  false;
          if(Auth::user()->role == "a_admin"){
           $isAdmin =  true;
          }

          return response()->json([
          'error' => "",
          "outcome" => true,
          "isAdmin"=> $isAdmin
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

}//End Login

public function logout(Request $request){

     try {

      Auth::logout();
 
    $request->session()->invalidate();
 
    $request->session()->regenerateToken();

    return response()->json([
          'error' => "",
          "outcome" => true
      ]);
    
 } catch (\Exception $e) {
   
   return response($e)->json([
      'error' => ["Sorry system error, please clear your browser history and close your browser and your session should be destroyed thank you."],
      "outcome" => false
  ]);

}
   
   
}

}//End class
