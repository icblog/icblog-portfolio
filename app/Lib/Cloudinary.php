<?php

namespace App\Lib;

// Use the Configuration class 
use Cloudinary\Configuration\Configuration;

// Use the UploadApi class for uploading assets
use Cloudinary\Api\Upload\UploadApi;

// Use the AdminApi class for managing assets
use Cloudinary\Api\Admin\AdminApi;

class Cloudinary{
   
    public function __construct(){
     // Configure an instance of your Cloudinary cloud
        Configuration::instance(env("CLOUDINARY_URL"));
       
       // $this->admin = new AdminApi();
    }

    public static function upload($fileToUpload,$arrayOfOptions){
       $res = (new UploadApi())->upload($fileToUpload,$arrayOfOptions);
       return $res;
    }

    public static function destroy($publicId){
       $res = (new UploadApi())->destroy($publicId);
        return $res;
     }

     public static function deleteFolder($path){
        $res = (new AdminApi())->deleteFolder($path);
         return $res;
      }


     
      
}
