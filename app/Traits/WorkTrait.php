<?php

namespace App\Traits;
use App\Models\Work;
trait WorkTrait{
    /**
    * Create regular or static methods here
    */
    public function getWorks($resPerPage, $paginate = false){
        if($paginate){
             $workData = Work::orderBy('id', 'desc')->paginate($resPerPage);
         }else{
          $workData = Work::orderBy('id', 'desc')->limit($resPerPage)->get();

        }
       
        return $workData;
    }
}
