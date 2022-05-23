<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;
use App\Traits\ReviewTrait;

class AdminReviewController extends Controller{
    
     use ReviewTrait;
 public function index(){
       $pageIntro = "Admin All Review";
       $isAdminPage = true;
       $paginate = true;
       $resPerPage = 16;
       $reviewData = $this->getReviews($resPerPage, $paginate,$isAdminPage);
      
 return view('/admin.review.index', ["pageIntro"=>$pageIntro,"reviewData"=>$reviewData]);

   }//End index method


public function storeReviewReply(Request $request){
     $validator = Validator::make($request->all(), [
        'status' => 'required|string',
        'comment'=>'required|string|max:6000'
    ]);

     if ($validator->fails()) {
         return response()->json([
             'error' => $validator->errors()->all()
         ]);
         die();
      }//end if validation
        try{

         Review::where('id', $request->reviewId)->update(['status' => $request->status]);
         //Insert a new review as reply
             $reply = new Review();
              $reply->star = 0;
              $reply->comment = $request->comment;
              $reply->parent_id = $request->reviewId;
              $reply->status = "Approved";
              $reply->review_by = Auth::user()->id;
              $reply->save();
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
      

   }//End index method

}//End class
