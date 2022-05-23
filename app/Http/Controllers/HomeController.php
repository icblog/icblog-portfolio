<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\WorkTrait;
use App\Traits\ReviewTrait;
class HomeController extends Controller{

    use WorkTrait;
    use ReviewTrait;
    
    public function index(){
        $paginate = false;
        $resPerPage = 8;
        $isAdminPage = false;
        $workData = $this->getWorks($resPerPage,$paginate);
        $reviewDataRes = $this->getReviews($resPerPage, $paginate,$isAdminPage);
          $reviewData = $this->sortReviewData($reviewDataRes);
        return view('/home.index', ["workData"=> $workData,"reviewData"=>$reviewData]);
        
    }

    
}
