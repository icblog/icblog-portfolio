<?php

namespace App\Traits;
use App\Models\Work;
trait WorkTrait{
    /**
    * Create regular or static methods here
    */
    public function getWork($resPerPage){
        $workData = Work::orderBy('id', 'desc')->paginate($resPerPage);
        return $workData;
    }
}
