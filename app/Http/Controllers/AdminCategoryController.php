<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;

//METHODS USED FROM BASE CONTROLLER CLASS WHICH THIS CLASS EXTENDS
// ajaxPaginationInstance


//METHODS USED FROM HELPER TRIAT FROM BASE CONTROLLER CLASS WHICH THIS CLASS EXTENDS
//returnReplacedStr
//returnGenericSystemErrMsg
//returnTimeStamp


class AdminCategoryController extends BaseController{

  private $resultPerPage = 10;

  public function index(){
  
      //Fetch initial category records and pass it to the view
      $pagenum  = 1;
      $totalCount = Category::count();
      $params = array(
        'pagenum' => $pagenum,
        'pageRows' => $this->resultPerPage,
        'totalRows' => $totalCount
       );

       $ajaxPagination =  $this->ajaxPaginationInstance($params);
       $offset = $ajaxPagination->returnOffset();
       $last = $ajaxPagination->returnLast();
       $categoriesResult = Category::fetchCategories($offset,$this->resultPerPage,true);
       $dataToView = array(
            "pageIntro"=>"Admin category",
            'last' => $last,
					  'pagenum' => $pagenum,
					  'totalCount' => $totalCount,
            'resultPerPage'=> $this->resultPerPage,
            "categoriesResult"=>$categoriesResult
          );
 
      return view('/admin.category.category-index', $dataToView);
  } 
  
  public function store(Request $request){
         
   $validator = Validator::make($request->all(), [
      'categoryname' => 'required|string',
     
    ]); 
  
   if ($validator->fails()) {
     return response()->json([
         'error' => $validator->errors()->all()
     ]);
     die();
   }//end if validation

  //Generate a slug
   $slug  = $this->returnReplacedStr($request->categoryname," ","-");


   // Check if category exist
   $categoryOutCome = Category::checkIfCategoryExist($slug);
  
   if($categoryOutCome["error"]){
    return response()->json([
        'error' => $this->returnGenericSystemErrMsg()
    ]);
   die();
 }//End if out come error

 if($categoryOutCome["success"]){
  return response()->json([
      'error' => "Sorry category name (".$request->categoryname.") already exist, please choose another name."
  ]);
 die();
}//End if out come success

 //Save data in DB

 try {

     $category = new Category();
      $category->created_by = Auth::User()->id;
       $category->name = $request->categoryname;
       $category->slug = $slug;
       $category->save();
      
          return response()->json([
              'error' => "",
              "outcome" => true,
          ]);
  } catch (\Exception $e) {

        return response()->json([
          'error' => [$this->returnGenericSystemErrMsg()],
          "outcome" => false
        ]);
 }

}

public function update(Request $request){

  $validator = Validator::make($request->all(), [
    'categoryId' => 'required|integer',
    'newCategoryname' => 'required|string',
    'defaultValue' => 'required|string'
   
  ]); 

 if ($validator->fails()) {
   return response()->json([
       'error' => $validator->errors()->all()
   ]);
   die();
 }//end if validation

   //Check if newCategoryname == defaultValue
   if($request->defaultValue == $request->newCategoryname){
    return response()->json([
      'error' => "Please make changes before saving"
    ]);
    die();
   }

   //Generate a slug
   $slug  = $this->returnReplacedStr($request->newCategoryname," ","-");


    // Check if category exist
    $categoryOutCome = Category::checkIfCategoryExist($slug);
  
    if($categoryOutCome["error"]){
     return response()->json([
         'error' => $this->returnGenericSystemErrMsg()
     ]);
    die();
  }//End if out come error
 
  if($categoryOutCome["success"]){
   return response()->json([
       'error' => "Sorry category name (".$request->newCategoryname.") already exist, please choose another name."
   ]);
  die();
 }//End if out come success

   //Update catgories Db records
   
   try {

   $category = Category::where('id', $request->categoryId)->update(['updated_by' => Auth::User()->first_name,'name' => $request->newCategoryname, 'slug'=>$slug]);
    
     return response()->json([
             'error' => "",
             "outcome" => true,
             "updated_at"=> $this->returnTimeStamp(),
             "updated_by"=> Auth::User()->id
         ]);
 } catch (\Exception $e) {

       return response()->json([
         'error' => [$this->returnGenericSystemErrMsg()],
         "outcome" => false
       ]);
}

}

public function delete(Request $request){
 if ($request->categoryId == "") {
      return response()->json([
       'error' => $this->returnGenericSystemErrMsg(),
     ]);
     die();
   }// end if request is empty

   //If no errors delete category
     try {
       Category::where('id', $request->categoryId)->delete();
       return response()->json([
       'error' => "",
       "outcome" => true
     ]);
   } catch (\Exception $e) {

    return response()->json([
    'error' => $this->returnGenericSystemErrMsg(),

   ]);

}

}//End delete

public function loadMoreCategoryDataAjax(Request $request){
  
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
    $categoriesResult = Category::fetchCategories($offset,$resultPerPage,true);
    return response()->json([
    'error' => "",
    "res" => $categoriesResult,
    'resultPerPage'=> $this->resultPerPage,
  ]);
   } catch (\Exception $e) {
     return response()->json([
    'error' => $this->returnGenericSystemErrMsg(),
    'resultPerPage'=> $this->resultPerPage,
   ]);

}
}//End LoadMoreCategoryData

  
}//End class