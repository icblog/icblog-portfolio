<?php
namespace App\Traits;
use \Firebase\JWT\JWT;


trait TokenTrait{
  
  //GENERATE TOKEN
public function genarateToken($expireTime,$dataArray){
	   $secretKey = env('APP_KEY', '');
		$issuedAt  = time();
		$expire    = $issuedAt + $expireTime;
	    $serverName = env('APP_URL', '');

	$data = [
    'iat'  => $issuedAt,
    'iss'  => $serverName,                       
    'nbf'  => $issuedAt + 10,         
    'exp'  => $expire,                           
    "data" => $dataArray,     
     ];

return $jwt = JWT::encode($data, $secretKey,'HS512');

    }// End genarateToken


//DECODE TOKEN
public function decodeToken(){
    $outComeArray = array("msg"=>"", "data"=>"");
  	//Check if we have the token in ther header
    	if (! preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
         //header('HTTP/1.0 400 Bad Request');
    		$outComeArray["msg"] = "Invalid";
    		return $outComeArray;
    	}

    //Get token from $matches varible
    	$jwt = $matches[1];
    	if (! $jwt) {
    // No token was able to be extracted from the authorization header
    		$outComeArray["msg"] = "Invalid";
    		return $outComeArray;
    	}



 //Attempt to decode the token

    	try {
    $serverName = env('APP_URL','');
	$secretKey = env('APP_KEY', ''); 
	$token = JWT::decode($jwt, $secretKey, ['HS512']);

if ($token->iss !== $serverName ||
    $token->nbf > time() ||
    $token->exp < time()){
    $outComeArray["msg"] = "Invalid";
    return $outComeArray;
}else{
	$outComeArray["msg"] = "Good";
	$outComeArray["data"] = $token->data;
    return $outComeArray;
}
} catch (\Exception $e) { // Also tried JwtException
    $outComeArray["msg"] = "Invalid";
    return $outComeArray;
}

    	
	


}//End decodeToken

}// END CLASS