<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppMail;

class ContactController extends BaseController{
//METHODS USED FROM HELPER TRAIT FROM BASE CONTROLLER CLASS WHICH THIS CLASS EXTENDS
//returnGenericSystemErrMsg
   
    public function index(Request $request){
           //Check if the hidden recaptcha input is filled in,
        //is a bot that filled the form in, throw an error.
        if($request->recaptcha != ""){
            return response()->json([
              'error' => $this->returnGenericSystemErrMsg()
              ]);
            die();
           }

       $validator = Validator::make($request->all(), [
          'name'=>'required|string',
          'email' => 'required|string|regex:/(.+)@(.+)\.(.+)/i',
          'phone'=>'required|numeric|min:11',
          'message'=>'required|string',
      ]);

       if ($validator->fails()) {
         return response()->json([
             'error' => $validator->errors()->all()
         ]);
         die();
    }//end if validation

     $dataArray = array(
         "name"=>"Admin",
         "c_name"=>$request->name,
         "c_email"=>$request->email,
         "c_phone"=>$request->phone,
         "c_message"=>$request->message
     );
      //convert data array into data object for blade view
     $dataObj = (object)$dataArray;
     $subject = "Message from icBlog";
     $emailTemplate = "mail.new-contact";

      
     try {

         Mail::to(env('APP_ADMIN_EMAIL'))->send(new AppMail($subject,$emailTemplate,$dataObj));

         return ["error"=>"","outcome" => true];

     } catch (\Exception $e) { 
      return [
        'error' => $this->returnGenericSystemErrMsg(),
        "outcome" => false
    ];
   }


    }//End method index
}
