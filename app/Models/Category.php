<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Category extends Model{
     
    use HasFactory;
    
    public static function checkIfCategoryExist($slug){
        $outComeArray = array("error"=>false, "success"=> false);
      
      try {
      
         $category = DB::table('categories')->where("slug", $slug)->first();
      
         if($category) {
            $outComeArray["success"] = true;
         }
      
         return $outComeArray;
      
        } catch (\Exception $e) { 
          $outComeArray["error"] = true;
          return $outComeArray;
        }
       
       }//End check if category exist

    public static function fetchCategories($offset=0, $resultPerPage=0, $isAdmin=false){
      $categories = array();
      if($isAdmin){
       // $categories = DB::table('categories')->select('categories.id','categories.name','categories.updated_by','categories.created_at','categories.updated_at','users.first_name')->join('users', 'users.id', '=', 'categories.created_by')->orderBy('categories.id', 'desc')->offset($offset)->limit($resultPerPage)->get();
       $categories =  DB::table('categories')
        ->leftjoin('users AS A', 'A.id', '=', 'categories.created_by')
        ->leftjoin('users AS B', 'B.id', '=', 'categories.updated_by')
        ->select('categories.id','categories.name','categories.created_at','categories.updated_at','A.first_name as createdby_name','B.first_name as updatedby_name')
        ->orderBy('categories.id', 'desc')
        ->offset($offset)
        ->limit($resultPerPage)
        ->get();
       
      
      }else{
          $categories = DB::table('categories')->select('id','name')->orderBy('categories.id', 'desc')->get();
     }
      
      return $categories;
    }//End fetchCategories

    
    public static function fetchCategoriesWithCount(){

      $outComeArray = array("error"=>false, "result"=> []);
      
      try {
        $outComeArray["result"] =  DB::table('categories')
        ->leftjoin('posts_x_categories AS X', 'X.category_id', '=', 'categories.id')
        ->select('categories.id','categories.name',DB::raw('count(X.category_id) as categoryPostTotal'))
        ->orderBy('categories.id', 'desc')
        ->groupBy('categories.id')
        ->get();
       
         return $outComeArray;
      
        } catch (\Exception $e) { 
          $outComeArray["error"] = true;
          return $outComeArray;
        }

    }//End fetchCategoriesWithCount

       


       
}


