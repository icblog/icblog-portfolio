<?php
namespace App\Traits;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppMail;

trait HelperTrait{
  
public function returnGenericSystemErrMsg(){
	return "Sorry system error, your request can not be processed please try again later thank you";
}//End returnGenericSystemErrMsg

public function returnLinkErrMsg(){
	return "Sorry the link has expired or Invalid,  you will be redirected to create a new one thank you.";
}//End returnGenericSystemErrMsg

public function sendAlinkToUser($token,$email,$action,$subject,$emailTemplate){
  $outComeArray = array("error"=>"", "outcome"=>"");
 
  $verifyLink = env('APP_URL')."/verify/".$token."/".$action;
  
  $dataArray = array(
      "name"=>"",
      "link"=>$verifyLink
  );
   //convert data array into data object for blade view
  $dataObj = (object)$dataArray;
  try {

      Mail::to($email)->send(new AppMail($subject,$emailTemplate,$dataObj));
      $outComeArray["outcome"] = true; 
      return $outComeArray;

  } catch (\Exception $e) { 
    $outComeArray["error"] = true; 
    return $outComeArray;
  }

}// End sendAlinkToUser

public function checkIsEmail($email){
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
     return false;
  }else{
    return true;
  }
}

}// END CLASS
