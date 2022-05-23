<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller{

    public function index(Request $request){

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


    }//End method index
}
