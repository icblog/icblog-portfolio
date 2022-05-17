<?php
namespace App\Traits;
use App\Models\User;
use App\Models\Review;


trait HelperTrait{

public function returnGenericSystemErrMsg(){
	return "Sorry system error, were unable to process your request please try again later thank you";
}//End returnGenericSystemErrMsg

public function checkIfUserExist($fieldTocheck,$fieldValue){
  $outComeArray = array("msg"=>"", "data"=>"", "user"=>"");

try {

   $user = User::where($fieldTocheck, $fieldValue)->first();

if($user && $user->count() > 0) {
    $outComeArray["msg"] = "";
	$outComeArray["data"] = true;
    $outComeArray["user"] = $user;
     
    }else{
      $outComeArray["msg"] = "";
	  $outComeArray["data"] = false;
   }

   return $outComeArray;


} catch (\Exception $e) { // Also tried JwtException
    $outComeArray["msg"] = $this->returnGenericSystemErrMsg();
    $outComeArray["data"] = 'error';
    return $outComeArray;
}
 
}//End check if user exist

public function checkIfReviewExist($fieldValue){
  $outComeArray = array("msg"=>"", "data"=>"", "userReview"=>"");

try {

   $userReview =  Review::select('id','star','comment')->where('review_by',$fieldValue)->first();

if($userReview && $userReview->count() > 0) {
    //Remove some review Data


    $outComeArray["msg"] = "";
    $outComeArray["data"] = true;
    $outComeArray["userReview"] = $userReview;
     
    }else{
      $outComeArray["msg"] = "";
      $outComeArray["data"] = false;
   }

   return $outComeArray;


} catch (\Exception $e) { // Also tried JwtException

    $outComeArray["msg"] = $this->returnGenericSystemErrMsg();
    $outComeArray["data"] = 'error';
    return $outComeArray;
}
 
}//End check if user exist

}// END CLASS