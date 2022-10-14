<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class PingController extends Controller{

    public function index(Request $request){
        $result = array();
        $ip = "185.27.134.150";
        $fp = fSockOpen($ip,80,$errno,$errstr,1);
         if($fp) { $status='alive'; fclose($fp); } else { $status='dead'; }
          echo "The IP address, $ip, is  ".$status;
    }

    
}
