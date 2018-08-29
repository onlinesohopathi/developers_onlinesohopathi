<?php

require_once '../include/DbHandler.php';
require_once '../include/PassHash.php';
require '.././libs/Slim/Slim.php';
require_once __DIR__.'/src/Facebook/autoload.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();


$user_id = NULL;

$app->post('/uploadadcounter', function() use ($app)  {
    
  $publisherid=$app->request->post('publisher_id');
  $ipaddress=$app->request->post('ip_address');
	
		
  $conn = new mysqli("localhost", "root", "aquarium201", "online_sohopathi");
  $publisherid=mysqli_real_escape_string($conn,$publisherid);
	$ipaddress=mysqli_real_escape_string($conn,$ipaddress);
  $strings="INSERT INTO adcounter(publisher_id,ip_address) VALUES (" . "'". $publisherid . "'". "," . "'". $ipaddress . "'".  ")";
  
  
  
  $result = $conn->query($strings);
  
  echoRespnse(201,$strings);  
    
     
});

function echoRespnse($status_code, $response)
{
    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);

    // setting response content type to json
    $app->contentType('application/json');

    echo json_encode($response);
}

$app->run();
?>