<?php
namespace App\Traits;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppMail;

trait HelperTrait{

public function replaceFirstOccuranceOfChar($search, $replace, $subject){

  $pos = strpos($subject, $search);
  if ($pos !== false) {
      return substr_replace($subject, $replace, $pos, strlen($search));
  }
  return $subject;
}
  
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

public function returnReplacedStr($str,$findWhat,$replaceWith){
	$str = trim($str);
  $str1 = strtolower(str_replace($findWhat,$replaceWith,$str));	
  return $str1;	
}

public function cleanData($data){
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}// end CleanData

public function randomNumber($length = 6){
      $chars = "0123456789";
      $string = substr( str_shuffle( $chars ), 0, $length );
      return $string;
  } 
  
  public function randomString( $length = 6 ){
      $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      $string = substr( str_shuffle( $chars ), 0, $length );
      return $string;
  }
  
  public function encodeUserData($userData){
    $salt = env('APP_KEY', '');
    $encryptedUserData = base64_encode($userData . $salt);
    return $encryptedUserData;
   
 }// function encodeUserData
 
 public function decodeUserData($encryptedUserData){
   $salt = env('APP_KEY', '');
   $decryptedUserDataRaw = base64_decode($encryptedUserData);
   $decryptedUserData = preg_replace(sprintf('/%s/', $salt), '', $decryptedUserDataRaw);
   return  $decryptedUserData;
   
 }// function decodeUsertData

   public function returnTimeStamp(){
    return date("Y-m-d H:i:s");
   }

   public function checkExactMatchOfString($str,$needle){
    if (preg_match("~\b$needle\b~", $str)) {
      return true;
     }else{
      return false;
     }
   }

   public function datetimeToText($datetime=""){
	  $unixdatetime = strtotime($datetime); 
	  return strftime("%B %d, %Y at %I:%M %p", $unixdatetime);
    }
 }// END CLASS
