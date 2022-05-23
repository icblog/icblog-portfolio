<?php

namespace App\Traits;
use App\Models\Review;
trait ReviewTrait{
    /**
    * Create regular or static methods here
    */
    public function getReviews($resPerPage, $paginate = false,$isAdminPage = false){
     $reviewData = array();
     if($isAdminPage){
       $reviewData = Review::select('users.first_name','reviews.id','reviews.star','reviews.comment','reviews.created_at','reviews.status')->orderBy('reviews.id', 'desc')->where(["parent_id"=>null])->join('users', 'users.id', '=', 'reviews.review_by')->paginate($resPerPage);
    }else{

      if($paginate){
          $reviewData = Review::select('users.first_name','reviews.id','reviews.star','reviews.comment','reviews.created_at','reviews.parent_id')->orderBy('reviews.id', 'desc')->where(["status"=>'Approved'])->join('users', 'users.id', '=', 'reviews.review_by')->paginate($resPerPage);

        }else{
          $reviewData = Review::select('users.first_name','reviews.id','reviews.star','reviews.comment','reviews.created_at','reviews.parent_id')->orderBy('reviews.id', 'desc')->where(["status"=>'Approved'])->join('users', 'users.id', '=', 'reviews.review_by')->limit($resPerPage)->get();
          

        }//End if paginate

      }//End if isAdminPage

      return $reviewData;

   }//End method getReviews

 public function sortReviewData($comments){

  // loop through each comment
foreach ($comments as $comment_key => $comment){
    // initialize replies array for each comment
    $replies = array();
 
    // check if it is a comment, not a reply to comment
    if ($comment->parent_id == null){
        // loop through all comments again
        foreach ($comments as $reply_key => $reply){
            // check if comment is a reply
            if ($reply->parent_id == $comment->id){
                // add in replies array
                array_push($replies, $reply);
 
                // remove from comments array
                unset($comments[$reply_key]);
            }
        }
    }
 
    // assign replies to comments object
    $comment->replies = $replies;
   }

   return $comments;
 }//End method sortReviewData

}//End class
