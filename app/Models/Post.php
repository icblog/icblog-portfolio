<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Post extends Model{
    use HasFactory;

    public static function checkIfPostExist($whereValue,$whereColumn="slug"){
        $outComeArray = array("error"=>false, "success"=> false);
      
      try {
      
         $post = DB::table('posts')->where($whereColumn,$whereValue)->first();
      
         if(!is_null($post)) {
            $outComeArray["success"] = true;
         }
      
         return $outComeArray;
      
        } catch (\Exception $e) { 
          $outComeArray["error"] = true;
          return $outComeArray;
        }
       
       }//End check if post exist

  public static function countPost($whereColumn="", $equalToValue=""){
        $outComeArray = array("error"=>false, "postCount"=> 0);
      
      try {

          if($equalToValue ==""){
            $outComeArray["postCount"] = DB::table('posts')->count();
            }else{
              $outComeArray["postCount"] = DB::table('posts')->where($whereColumn, $equalToValue)->count();
          }
           return $outComeArray;
      
        } catch (\Exception $e) { 
          $outComeArray["error"] = true;
          return $outComeArray;
        }
       
    }//End check count post

    public static function fetchPost($offset=0,$resultPerPage=0,$isAdmin=false,$whereColumn="", $equalToValue=""){
      $outComeArray = array("error"=>false, "postResult"=> []);
    
    try {

         if($isAdmin){
               //if admin fetch extra columns
               if($equalToValue ==""){

                $outComeArray["postResult"] =  DB::table('posts')
                ->leftjoin('users AS A', 'A.id', '=', 'posts.created_by')
                ->leftjoin('users AS B', 'B.id', '=', 'posts.updated_by')
                ->select('posts.id','posts.title','posts.status','posts.has_images','posts.cloudinary_folder_name','posts.created_at','posts.updated_at','A.username as createdby_name','B.username as updatedby_name')
                ->orderBy('posts.id', 'desc')
                ->offset($offset)
                ->limit($resultPerPage)
                ->get();

               }else{
                   //Add where condition
                   $outComeArray["postResult"] =  DB::table('posts')
                  ->leftjoin('users AS A', 'A.id', '=', 'posts.created_by')
                  ->leftjoin('users AS B', 'B.id', '=', 'posts.updated_by')
                  ->select('posts.id','posts.title','posts.status','posts.has_images','posts.created_at','posts.updated_at','A.username as createdby_name','B.username as updatedby_name')
                  ->where($whereColumn, $equalToValue)
                  ->orderBy('posts.id', 'desc')
                  ->offset($offset)
                  ->limit($resultPerPage)
                  ->get();
              }//end if equal to value empty

            }else{
               //if not admin fetch limited columns
              if($equalToValue ==""){

                 }else{

              }//end if equal to value empty

         }//End if isAdmin

        return $outComeArray;
    
      } catch (\Exception $e) { 
        $outComeArray["error"] = true;
        return $outComeArray;
      }
     
  }//End fetchPost

  public static function fetchSinglePost($isAdmin=false,$whereColumn="", $equalToValue=""){
    $outComeArray = array("error"=>false, "postResult"=> null);
  
  try {

       if($isAdmin){
             //if admin fetch extra columns
               //Add where condition
                 $outComeArray["postResult"] =  DB::table('posts')
                 //->select('posts.id','posts.title','posts.status','posts.created_at','posts.updated_at')
                ->select('posts.id','posts.title','posts.status','posts.has_images','posts.cloudinary_folder_name','posts.created_at','posts.updated_at','posts.body','A.username as createdby_name','B.username as updatedby_name',DB::raw('group_concat(DISTINCT C.id) as catIds, group_concat(DISTINCT C.name) as catNames, group_concat(DISTINCT I.img_url) as imgUrls, group_concat(DISTINCT I.public_id) as imgPublicIds'))
                ->leftjoin('users AS A', 'A.id', '=', 'posts.created_by')
                ->leftjoin('users AS B', 'B.id', '=', 'posts.updated_by')
                ->join('posts_x_categories AS X', 'posts.id', '=', 'X.post_id')
                ->join('categories AS C', 'C.id', '=', 'X.category_id')
                ->leftjoin('postimages AS I', 'I.post_id', '=', 'posts.id')
                ->groupBy('posts.id')
                ->where('posts.'.$whereColumn, $equalToValue)
                ->first();
              
               }else{

                $outComeArray["postResult"] =  DB::table('posts')
                ->select('posts.id','posts.title','posts.body','posts.views','posts.created_at','A.username as createdby_name',DB::raw('group_concat(DISTINCT C.slug) as catSlugs, group_concat(DISTINCT C.name) as catNames'))
                ->join('users AS A', 'A.id', '=', 'posts.created_by')
                ->join('posts_x_categories AS X', 'posts.id', '=', 'X.post_id')
                ->join('categories AS C', 'C.id', '=', 'X.category_id')
                ->where('posts.'.$whereColumn, $equalToValue)
                ->groupBy('posts.id')
                ->first();
        }//End if isAdmin

      return $outComeArray;
  
    } catch (\Exception $e) { 
      $outComeArray["error"] = true;
      return $outComeArray;
    }
   
}//End fetch single Post


public static function fetchLatestPost($resultPerPage=4, $paginate=false){
  $outComeArray = array("error"=>false, "postResult"=> []);

try {

  $query =  DB::table('posts')
                ->select('posts.slug','posts.title','posts.views','posts.created_at','A.username as createdby_name',DB::raw('group_concat(DISTINCT C.slug) as catSlugs, group_concat(DISTINCT C.name) as catNames, group_concat(DISTINCT I.img_url) as imgUrls'))
                ->join('users AS A', 'A.id', '=', 'posts.created_by')
                ->join('posts_x_categories AS X', 'posts.id', '=', 'X.post_id')
                ->join('categories AS C', 'C.id', '=', 'X.category_id')
                ->leftjoin('postimages AS I', function($join){
                  $join->on('I.post_id', '=', 'posts.id')
                        ->where('I.img_type','=','main');
                })
                ->where('posts.status', 'published')
                ->groupBy('posts.id')
                ->orderBy('posts.id', 'desc');
                if($paginate){
                  $outComeArray["postResult"] = $query->paginate($resultPerPage);
                }else{
                  $outComeArray["postResult"] = $query->limit($resultPerPage)
                  ->get();
                }

    return $outComeArray;

  } catch (\Exception $e) { 
    $outComeArray["error"] = true;
    return $outComeArray;
  }
 
}//End fetchLatestPost


public static function fetchPopularPost($resultPerPage=4, $paginate=false){
  $outComeArray = array("error"=>false, "postResult"=> []);

try {
        $query = DB::table('posts')
                ->select('posts.slug','posts.title','posts.views','posts.created_at','A.username as createdby_name',DB::raw('group_concat(DISTINCT C.slug) as catSlugs, group_concat(DISTINCT C.name) as catNames, group_concat(DISTINCT I.img_url) as imgUrls'))
                ->join('users AS A', 'A.id', '=', 'posts.created_by')
                ->join('posts_x_categories AS X', 'posts.id', '=', 'X.post_id')
                ->join('categories AS C', 'C.id', '=', 'X.category_id')
                ->leftjoin('postimages AS I', function($join){
                  $join->on('I.post_id', '=', 'posts.id')
                        ->where('I.img_type','=','main');
                })
                ->where('posts.status', 'published')
                ->groupBy('posts.id')
                ->orderBy('posts.views', 'desc');
                
                if($paginate){
                  $outComeArray["postResult"] = $query->paginate($resultPerPage);
                }else{
                  $outComeArray["postResult"] = $query->limit($resultPerPage)
                  ->get();
                }
               

    return $outComeArray;

  } catch (\Exception $e) { 
    $outComeArray["error"] = true;
    return $outComeArray;
  }
 
}//End fetchPopularPost




public static function fetchPostWithCategorySlug($resultPerPage=8,$categorySlug){
  $outComeArray = array("error"=>false, "postResult"=> []);

try {
  $outComeArray["postResult"] = DB::table('posts')
                ->select('posts.slug','posts.title','posts.views','posts.created_at','A.username as createdby_name',DB::raw('group_concat(DISTINCT C.slug) as catSlugs, group_concat(DISTINCT C.name) as catNames, group_concat(DISTINCT I.img_url) as imgUrls'))
                ->join('users AS A', 'A.id', '=', 'posts.created_by')
                ->join('posts_x_categories AS X', 'posts.id', '=', 'X.post_id')
                ->join('categories AS C', 'C.id', '=', 'X.category_id')
                ->leftjoin('postimages AS I', function($join){
                  $join->on('I.post_id', '=', 'posts.id')
                        ->where('I.img_type','=','main');
                })
                ->where('posts.status', 'published')
                ->where('C.slug', $categorySlug)
                ->groupBy('posts.id')
                ->orderBy('posts.id', 'desc')
                ->paginate($resultPerPage);

    return $outComeArray;

  } catch (\Exception $e) { 
    $outComeArray["error"] = true;
    return $outComeArray;
  }
 
}//End fetchPostWithCategorySlug


public static function fetchNextOrPreviousPost($currentPostId,$action){
  $outComeArray = array("error"=>false, "postResult"=> null);

try {
          $operator = "";
         if($action == "previous"){
           $operator = "<";
          }else if($action == "next"){
            $operator = ">";
         }
  $outComeArray["postResult"] = DB::table('posts')
                ->select('slug','title')
                ->where('status', 'published')
                ->where('id', $operator, $currentPostId)
                ->first();

    return $outComeArray;

  } catch (\Exception $e) { 
    $outComeArray["error"] = true;
    return $outComeArray;
  }
 
}//End fetchNextOrPreviousPost

public static function searchPost($searchedWord){
  $outComeArray = array("error"=>false, "searchResult"=> []);

try {
       
  $outComeArray["searchResult"] = DB::table('posts')
                ->select('slug','title')
                ->where([
                  ['title', 'LIKE', "%{$searchedWord}%"],
                  ['status', '=', 'published'],
                ])
                ->orWhere([
                  ['body', 'LIKE', "%{$searchedWord}%"],
                  ['status', '=', 'published'],
                ])
               ->limit(10)
               ->get();

    return $outComeArray;

  } catch (\Exception $e) { 
    $outComeArray["error"] = true;
    return $outComeArray;
  }
 
}//End searchPost

}//End class
