<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Postimage;
use App\Models\PostsXCategory;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


//METHODS USED FROM BASE CONTROLLER CLASS WHICH THIS CLASS EXTENDS
// ajaxPaginationInstance
// cloudinaryInstance

//METHODS USED FROM HELPER TRIAT FROM BASE CONTROLLER CLASS WHICH THIS CLASS EXTENDS
//returnReplacedStr
//checkExactMatchOfString
//returnGenericSystemErrMsg
class AdminPostController extends BaseController{
  private $initialPageNumber = 1;
  private $resultPerPage = 10;

  public function showAddPostIndex(){
      $categoriesResult = Category::fetchCategories();
      $dataToView = array(
        "pageIntro"=>"Admin Addpost",
        "categoriesResult"=>$categoriesResult
      );
      return view('/admin.post.add-post-index',$dataToView);
    }



 public function showEditPostIndex(Request $request){
      $categoriesResult = Category::fetchCategories();
      $singlePostResult = Post::fetchSinglePost(true,"id", $request->postId);
       // dd($singlePostResult["error"]);
     if($singlePostResult["postResult"] !=""){

        //REMOVE DUPLICATE string form result
        //$singlePostResult["postResult"]->catIds = implode(',', array_unique(explode(',', $singlePostResult["postResult"]->catIds)));
     
         //Covert to json for js
        $singlePostResult["postResult"]->catIds = json_encode(explode(",",$singlePostResult["postResult"]->catIds));
        $singlePostResult["postResult"]->catNames = explode(",",$singlePostResult["postResult"]->catNames);

        if($singlePostResult["postResult"]->imgUrls != ""){
          
          $singlePostResult["postResult"]->imgUrls = json_encode(explode(",",$singlePostResult["postResult"]->imgUrls));
          $singlePostResult["postResult"]->imgPublicIds = json_encode(explode(",",$singlePostResult["postResult"]->imgPublicIds));
        }//End post result imgUrls is not empty

       }//End post result is not empty
  
       $dataToView = array(
        "pageIntro"=>"Admin Editpost",
        "categoriesResult"=>$categoriesResult,
        "singlePostResult"=>$singlePostResult["postResult"]
      );
      return view('/admin.post.edit-post-index',$dataToView);
    }

    

  public function update(Request $request){
        //Custom validation attribute names
       // dd(count($res));   
        $attributeNames = array(
        'selectedCategories' => 'category',
        'saveorpublish' => 'save or publish',
        );
      $validator = Validator::make($request->all(), [
        'title' => 'required|string',
        'selectedCategories' => 'required|array',
        'postbody' => 'required|string',
        'saveorpublish' => 'required|string',
      ]);
       
      $validator->setAttributeNames($attributeNames);
        if ($validator->fails()) {
          return response()->json([
              'error' => $validator->errors()->all()
          ]);
          die();
        }//end if validation


      $postFieldToUpdate = array(
          "body"=>$request->postbody,
          "updated_by" => Auth::User()->id,
          "status" => $request->saveorpublish,
        );

      $oldSlug  = $this->returnReplacedStr($request->previousTitle," ","-");
      $newSlug = $this->returnReplacedStr($request->title," ","-");
     try {
    //If post has images previously, update DB AND CLOUDINARY records
     if($request->posthasImages == "yes"){
         if($request->totalPreloadedFilesToBeDeleted > 0){
         //select all images where post id is the post to be updated
           $postImages = Postimage::where('post_id', $request->postid)->get();
          
          //Loop and delete all images related to the post from cloudinary 
          //if the public id is in the $request->preloadedFilesToBeDeleted array from frontend
          foreach($postImages as $postImage){
           
            if($this->checkExactMatchOfString($request->preloadedFilesToBeDeleted[0],$postImage->public_id)){
              //dd($postImage->public_id);
           
              $this->cloudinaryInstance()::destroy($postImage->public_id);
                //Delete all images related to the post from DB if not found in $pIdArray 
                 Postimage::where('public_id', $postImage->public_id)->delete(); 
                }
          }
      }//End if $request->totalPreloadedFilesToBeDeleted
    }//end if post has images


   if($request->totalNewFiles > 0){
   // Add to post field to update array
    $postFieldToUpdate["has_images"] = "yes";
    $postFieldToUpdate["cloudinary_folder_name"] = $oldSlug;
    //store Image In Db And Cloudinary
    //Find this method at the bottom of this class
    $this->storeImageInDbAndCloudinary($request,$oldSlug,$request->postid,$request->totalNewFiles);
    }//End if total files is greater than zero
    
    //Set has_images field to no, if totalNewFiles & count($request->old) are == 0
     $preloadedImagLen = 0;
     if ($request->has('old')) {
      $preloadedImagLen = count($request->old);
      }

    if($request->totalNewFiles == 0 && $preloadedImagLen == 0){
      $postFieldToUpdate["has_images"] = "no";
    }


    //Check if post title has been change, if it has check to ensure is unique.
    if($request->title != $request->previousTitle){
      // Check if post exist
         $postOutCome = Post::checkIfPostExist($newSlug);
         if($postOutCome["error"]){
            return response()->json([
            'error' => $this->returnGenericSystemErrMsg()
          ]);
         die();
      }//End if out come error
         if($postOutCome["success"]){
           return response()->json([
             'error' => "Sorry post title (".$request->title.") already exist, please choose another name."
           ]);
       die();
      }//End if out come success
       //Add to Field to update
        $postFieldToUpdate["title"] = $request->title;
        $postFieldToUpdate["slug"] = $newSlug;
}// end if post title has change

      //Update post data in DB
      Post::where('id', $request->postid)->update($postFieldToUpdate);
      //Update post and category join table
      PostsXCategory::where('post_id', $request->postid)->delete(); 
      //Store post and catgory id in join table
      //Find this method at the bottom of this class
   $this->updatePostAndCategoryJoinTable($request, $request->postid);

      return response()->json([
            'error' => "",
            "outcome" => true,
        ]);
  } catch (\Exception $e) {

      return response()->json([
        'error' => $this->returnGenericSystemErrMsg(),
        "outcome" => $e
      ]);
  }

  }//End update post method



  public function store(Request $request){
    //Custom validation attribute names
    $attributeNames = array(
    'selectedCategories' => 'category',
    'saveorpublish' => 'save or publish',
    );
  $validator = Validator::make($request->all(), [
    'title' => 'required|string',
    'selectedCategories' => 'required|array',
    'postbody' => 'required|string',
    'saveorpublish' => 'required|string',
  ]);
   
  $validator->setAttributeNames($attributeNames);
    if ($validator->fails()) {
      return response()->json([
          'error' => $validator->errors()->all()
      ]);
      die();
    }//end if validation
//Generate slug from the title
$slug  = $this->returnReplacedStr($request->title," ","-");

      // Check if post exist
$postOutCome = Post::checkIfPostExist($slug);

if($postOutCome["error"]){
  return response()->json([
      'error' => $this->returnGenericSystemErrMsg()
  ]);
die();
}//End if out come error

if($postOutCome["success"]){
return response()->json([
    'error' => "Sorry post title (".$request->title.") already exist, please choose another name."
]);
die();
}//End if out come success

try {
  //Initialize post Model
  $post = new Post();
    
if($request->totalFiles > 0){
    $post->has_images = "yes";
    $post->cloudinary_folder_name = $slug;

}//End if total files is greater than zero
  
//Save data in DB
  $post->created_by = Auth::User()->id;
  $post->title = $request->title;
  $post->slug = $slug;
  $post->body = $request->postbody;
  $post->status = $request->saveorpublish;
  $post->save();

  if($request->totalFiles > 0){
    //store Image In Db And Cloudinary
    //Find this method at the bottom of this class
     $this->storeImageInDbAndCloudinary($request,$slug,$post->id,$request->totalFiles);
  }//End if total files is greater than zero

      //Store post and catgory id in join table
      //Find this method at the bottom of this class
   $this->updatePostAndCategoryJoinTable($request,$post->id);
  
  return response()->json([
        'error' => "",
        "outcome" => true,
    ]);
} catch (\Exception $e) {

  return response()->json([
    'error' => $e,
    "outcome" => false
  ]);
}

}

  public function showAllpostIndex(){
    $dataToView = array(
      "pageIntro"=>"Admin Allpost",
      'last' => 0,
      'pagenum' => $this->initialPageNumber,
      'totalCount' => 0,
      'resultPerPage'=> $this->resultPerPage,
      "postResult"=> []
    );
    
   //Fetch initial post records and pass it to the view
     
        $postCountResult = Post::countPost();
     
     
     if(!$postCountResult["error"] && $postCountResult["postCount"] > 0){
          $params = array(
            'pagenum' => $this->initialPageNumber,
            'pageRows' => $this->resultPerPage,
            'totalRows' => $postCountResult["postCount"]
           );
          
           $ajaxPagination =  $this->ajaxPaginationInstance($params);
           $offset = $ajaxPagination->returnOffset();
           $last = $ajaxPagination->returnLast();
           $postResult = Post::fetchPost($offset,$this->resultPerPage,true,"","");
             
           if(!$postResult["error"]){
              $dataToView["last"] = $last;
              $dataToView["totalCount"] = $postCountResult["postCount"];
              $dataToView["postResult"] = $postResult["postResult"];
           }// if no error

     }// End if no error or total count is > 0

    return view('/admin.post.all-post-index',$dataToView);
  }


 
 public function loadMorePostDataAjax(Request $request){
   
   $pagenum  = $request->pageNumber;
   $resultPerPage = $this->resultPerPage;
   $totalCount = $request->totalResultCount;
   $params = array(
     'pagenum' => $pagenum,
     'pageRows' => $resultPerPage,
     'totalRows' => $totalCount
    );
 
    $ajaxPagination =  $this->ajaxPaginationInstance($params);
    $offset = $ajaxPagination->returnOffset();
    
    try {
      $postResult = Post::fetchPost($offset,$this->resultPerPage,true,"","");
  
      return response()->json([
          'error' => "",
          "res" => $postResult["postResult"],
          'resultPerPage'=> $this->resultPerPage,
       ]);
    } catch (\Exception $e) {
      return response()->json([
     'error' => $this->returnGenericSystemErrMsg(),
     'resultPerPage'=> $this->resultPerPage,
    ]);
 
 }
 }//End LoadMorePostData

 public function delete(Request $request){
    
  //Check post id is not empty
     if($request->postId == "") {
        return response()->json([
        'error' => $this->returnGenericSystemErrMsg(),
        ]);
       die();
     }//end if id is empty validation

  // Check if post exist
     $postOutCome = Post::checkIfPostExist($request->postId,"id");
     if($postOutCome["error"]){
      return response()->json([
          'error' => $this->returnGenericSystemErrMsg()
      ]);
       die();
  }//End if out come error

  if($postOutCome["success"]){
    try {

  //delete post
    Post::where('id',$request->postId)->delete();
  //delete post ids from post and category join table
   PostsXCategory::where('post_id', $request->postId)->delete(); 
 
   //delete cloudinary post images and folder from cloudinary if post has images
    if($request->postHasImages == "yes"){
      //select all images where post id is the post to be deleted
      $postImages = Postimage::where('post_id', $request->postId)->get();
       //Loop and delete all images related to the post from cloudinary
      
      foreach($postImages as $postImage){
        $this->cloudinaryInstance()::destroy($postImage->public_id);
        }
      //Delete all images related to the post from DB
      Postimage::where('post_id', $request->postId)->delete(); 
      //Delete folder from Cloudinary
      $this->cloudinaryInstance()::deleteFolder("/icblog/postimgs/".$request->cloudinaryFolderName);
    }//End if request has post images
   

return response()->json([
      'error' => "",
      "outcome" => true,
   ]);
} catch (\Exception $e) {

return response()->json([
  'error' => $this->returnGenericSystemErrMsg(),
 
]);
}

}//End if out come success

}//End method delete Post

private function storeImageInDbAndCloudinary($request,$folderName,$postId,$totalNumberOfFiles){
    
    $uploadOptions = array(
      "folder" => "/icblog/postimgs/".$folderName."/",
      "resource_type" => "image",
      "quality" => "80", 
      "width" => 768, 
      "height" => 432, 
      "crop" => "limit"
    );
   

  for ($x = 0; $x < $totalNumberOfFiles; $x++){
    $postImage = new Postimage(); 
    $response = $this->cloudinaryInstance()::upload($request->file('files'.$x)->getRealPath(),$uploadOptions);
    $original_file_name = $request->file('files'.$x)->getClientOriginalName();
    //dd($response);
    $postImage->post_id = $postId;
    $postImage->public_id = $response['public_id'];
    $postImage->img_url = $response['secure_url'];
    if(Str::contains($original_file_name, 'main')){
      $postImage->img_type = "main";
    }
    $postImage->save();
  }//End for loop

}//End method storeImageInDbAndCloudinary

private function updatePostAndCategoryJoinTable($request,$postId){
  
  foreach($request->selectedCategories AS $category_id ){
    $posts_x_category = new PostsXCategory();
    $posts_x_category->post_id = $postId;
    $posts_x_category->category_id  = $category_id;
    $posts_x_category->save();
  }
 
 }//End method Update post and category join table

}//End Admin Post