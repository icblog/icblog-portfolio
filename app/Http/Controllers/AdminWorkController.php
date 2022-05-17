<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Traits\HelperTrait;
use App\Models\Work;


class AdminWorkController extends Controller{
  use HelperTrait;
  

  public function index(){
   $pageIntro = "Admin All Work";
   $workData = Work::orderBy('id', 'desc')->paginate(16);
   return view('/admin.work.index', ["pageIntro"=>$pageIntro,"workData"=>$workData]);
}

public function addWork(){
   $pageIntro = "Admin Add Work";
   return view('/admin.work.add-work', ["pageIntro"=>$pageIntro]);
}

public function store(Request $request){

   $validator = Validator::make($request->all(), [
     'files' => 'required',
     'files.*' => 'mimes:jpg,jpeg,png,svg,gif|max:2048'
  ]);

   if ($validator->fails()) {

      return response()->json([
         'error' => $validator->errors()->all()
      ]);
      die();
   }

   try {

    if($request->totalFiles > 0){
     for ($x = 0; $x < $request->totalFiles; $x++){
        $response = cloudinary()->upload($request->file('files'.$x)->getRealPath(),["folder" => "work/","resource_type" => "image","quality" => "70", "width" => 1500, "height" => 880, "crop" => "limit"]);
        $work = new Work();
        $work->publicId = $response->getPublicId();;
        $work->imgUrl = $response->getSecurePath();
        $work->createdByUser = Auth::user()->id;
        $work->save();

       }//End for loop

        return response()->json([
        'error' => "",
        "outcome" => true
    ]);

}//End if total files is greater than zero


} catch (\Exception $e) {

  return response()->json([
     'error' => [$this->returnGenericSystemErrMsg()],
     'action'=>''
  ]);

}

}//end store 


public function deleteWork(Request $request){


   if ($request->workId == "" || $request->publicId == "") {

      return response()->json([
        'error' => [$this->returnGenericSystemErrMsg()],
        'action'=>''
     ]);
      die();
    }// end if request is empty

    //If no errors delete work image from cloudinary and details from database.
      try {
       cloudinary()->destroy($request->publicId);
       Work::where('id', $request->workId)->delete();
        return response()->json([
        'error' => "",
        "outcome" => true
      ]);
    } catch (\Exception $e) {

     return response()->json([
     'error' => [$this->returnGenericSystemErrMsg()],
     'action'=>''
    ]);

}

}//End delete

}


   //USE BELOW METHOD FOR IF STORE LOCALLLY

 // public function storeMultiFile(Request $request)
 //    {

 //       $validatedData = $request->validate([
 //        'files' => 'required',
 //        'files.*' => 'mimes:csv,txt,xlx,xls,pdf'
 //        ]);

 //        if($request->TotalFiles > 0)
 //        {

 //           for ($x = 0; $x < $request->TotalFiles; $x++) 
 //           {

 //               if ($request->hasFile('files'.$x)) 
 //                {
 //                    $file      = $request->file('files'.$x);

 //                    $path = $file->store('public/files');
 //                    $name = $file->getClientOriginalName();

 //                    $insert[$x]['name'] = $name;
 //                    $insert[$x]['path'] = $path;
 //                }
 //           }

 //            File::insert($insert);

 //            return response()->json(['success'=>'Ajax Multiple fIle has been uploaded']);


 //        }
 //        else
 //        {
 //           return response()->json(["message" => "Please try again."]);
 //        }

 //    }