<?php

require_once '../include/DbHandler.php';
require_once '../include/PassHash.php';
require '.././libs/Slim/Slim.php';
require_once __DIR__.'/src/Facebook/autoload.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();


$user_id = NULL;


function authenticate(\Slim\Route $route)
{
    // Getting request headers
    $headers = apache_request_headers();
    $response = array();
    $app = \Slim\Slim::getInstance();

    // Verifying Authorization Header
    if (isset($headers['Authorization'])) {
        $db = new DbHandler();

        // get the api key
        $api_key = $headers['Authorization'];
        // validating api key
        if (!$db->isValidApiKey($api_key)) {
            // api key is not present in users table
            $response["error"] = true;
            $response["message"] = "Access Denied. Invalid Api key";
            echoRespnse(401, $response);
            $app->stop();
        } else {
            global $user_id;
            // get user primary key id
            $user_id = $db->getUserId($api_key);
        }
    } else {
        // api key is missing in header
        $response["error"] = true;
        $response["message"] = "Api key is misssing";
        echoRespnse(400, $response);
        $app->stop();
    }
}



$app->post('/uploadquestion', function() use ($app)  {
    
	$title=$app->request->post('title');
	$username=$app->request->post('username');
	$question=$app->request->post('question');
	$category=$app->request->post('category');
	$notifications=$app->request->post('notifications');
	$imagecount=$app->request->post('imagecount');
	$tags=$app->request->post('tag');
	$fbpic=$app->request->post('fbpics');
	$imagenames="";
	
	$image=$username;
	for($i=1;$i<=$imagecount;$i++)
	{
	  $image=$username.$i;
	  $imgmap= $app->request->post($image);
	  $path=$image.".png";
       
		while(file_exists($path))
           {
              $image=$image."1";
              $path=$image.".png";
              
           }
		   
		   $imagenames=$imagenames.$path;
		   $imagenames=$imagenames.",";
		   

    file_put_contents($path,base64_decode($imgmap));
	
	}
	
	
	

  $conn = new mysqli("localhost", "root", "aquarium201", "online_sohopathi");
  $strings="INSERT INTO questions(title,username,question,category,notification,image,tags,userpic) VALUES (" . "'". $title . "'". "," . "'". $username . "'". "," . "'". $question . "'". "," . "'". $category. "'" ."," ."'" . $notifications . "'" . "," . "'". $imagenames. "'" . ",". "'". $tags . "'". "," . "'". $fbpic . "'".  ")";
  $str= "INSERT INTO questions(username,question,category,notification,image) VALUES ( ";
  
  
  $result = $conn->query($strings);
  
  echoRespnse(201,$strings);  
  //echoRespnse(201,$strings);  
	
	
   
  
     
});

$app->post('/viewallquestions', function() use ($app)  {
    
	//$filter=$_GET["filter"];
  $filter = $app->request->post('filter');
  $quesids= $app->request->post('lastq');
  //echoRespnse(201,$filter); 
  
$conn = new mysqli("localhost", "root", "aquarium201", "online_sohopathi");
    if($filter=="0")
        $strings="SELECT * FROM questions order by id desc limit 10";
	else if($filter=="1")
        $strings="SELECT * FROM questions where id<". "'".$quesids."'".  " order by id desc limit 10";
	
	
	else{
         $strings="SELECT * FROM questions where category=". "'".$filter."'". "order by id desc limit 10";
    }
    
    
  $result = $conn->prepare($strings);
       
        
  $result->execute();
  $result->bind_result($id,$title,$username,$question,$category,$notification,$anonymous,$image,$tags,$upvote,$downvote,$fbpic);
  $qanda=array();
  $posts = array();
  
  while($result->fetch()) {
           
           $tmp = array();
           
           
           
           $tmp["id"] = $id;
		   $tmp["title"] = $title;
           $tmp["username"] = $username;
           $tmp["question"] = $question;
           $tmp["category"] = $category;
		   $tmp["anonymous"] = $anonymous;
		   $tmp["image"] = $image;
		   $tmp["upvote"] = $upvote;
		   $tmp["downvote"] = $downvote;
		   $tmp["tags"]=$tags;
		   $tmp["fbpics"]=$fbpic;
		   $tmp["answers"]=viewtheanswers($id);
		   
		   
           array_push($posts, $tmp);
       }
	   //array_push($qanda,$posts);
	   
	   $result->close();
        echoRespnse(201,$posts);
        
        
  
	
	
});

function viewtheanswers($titles)
{   
  $conn = new mysqli("localhost", "root", "aquarium201", "online_sohopathi");
  //$tile=(string)$titles;
  //echoRespnse(201,$titles);
  $strings= "SELECT  *FROM answers where question_id= $titles order by answer_id";
  //$strings="SELECT  *FROM answers where question_id=". "'".$tile."'". "order by answer_id";
  
  $result = $conn->prepare($strings);
  
       
        
  $result->execute();
  
  $result->bind_result($answer_id,$question_id,$username,$image,$string,$upvote,$downvote,$anonymous,$isright);
  $posta = array();
  
  
  while($result->fetch()) {
           
           $tmp = array();
           
           
           
           $tmp["answer_id"] = $answer_id;
      $tmp["question_id"] = $question_id;
           $tmp["username"] = $username;
             $tmp["string"] = $string;
		   $tmp["anonymous"] = $anonymous;
		   $tmp["image"] = $image;
		   $tmp["upvote"] = $upvote;
		   $tmp["downvote"] = $downvote;
         $tmp["isright"] = $isright;
		   
		   
           array_push($posta, $tmp);
       }
	   $result->close();
	   //echoRespnse(201,$posta);
	   
	   return $posta;
        
}

function viewthecomments($titles)
{   
  $conn = new mysqli("localhost", "root", "aquarium201", "online_sohopathi");
  //$tile=(string)$titles;
  //echoRespnse(201,$titles);
  $strings= "SELECT  *FROM blog_comment where blog_id= $titles order by blog_comment_id";
  //$strings="SELECT  *FROM answers where question_id=". "'".$tile."'". "order by answer_id";
  
  $result = $conn->prepare($strings);
  
       
        
  $result->execute();
  
  $result->bind_result($blog_comment_id,$blog_id,$username,$content,$image,$anonymous);
  $posta = array();
  
  
  while($result->fetch()) {
           
           $tmp = array();
           
           
           
           $tmp["blog_comment_id"] = $blog_comment_id;
      $tmp["blog_id"] = $blog_id;
           $tmp["username"] = $username;
             $tmp["content"] = $content;
       $tmp["anonymous"] = $anonymous;
       $tmp["image"] = $image;
       
       
       
           array_push($posta, $tmp);
       }
     $result->close();
     //echoRespnse(201,$posta);
     
     return $posta;
        
}



$app->post('/uploadanswers', function() use ($app)  {
    
  
  
  $imagenames="";
  

    $username = $app->request->post('username');
    $string = $app->request->post('string');
    $upvote = $app->request->post('upvote');
    $downvote = $app->request->post('downvote');
    $anonymous = $app->request->post('anonymous');
    $isright = $app->request->post('isright');
    
    $question_id = $app->request->post('question_id');
  
    $imagecount=$app->request->post('imagecount');
	$imagenames="";
	$imgmap="JJ";
	
	$image=$username;
	
  for($i=1;$i<=$imagecount;$i++)
	{
	  $image=$username.$i;
	  $imgmap= $app->request->post($image);
	  echoRespnse(201,$image); 
	  
    $path=$image.".png";
       
		while(file_exists($path))
           {
              $image=$image."1";
              $path=$image.".png";
              
           }
		   
		   $imagenames=$imagenames.$path;
		   $imagenames=$imagenames.",";
		   

    file_put_contents($path,base64_decode($imgmap));
	
	}


  $conn = new mysqli("localhost", "root", "aquarium201", "online_sohopathi");
  $strings="INSERT INTO answers(question_id, username, image, string, upvote, downvote, anonymous, isright) VALUES (" . "'". $question_id . "'". "," . "'". $username . "'". "," . "'". $imagenames. "'" ."," ."'" . $string . "'" . "," . "'". $upvote. "'" . "," . "'".$downvote. "'" . "," . "'". $anonymous. "'" . "," . "'". $isright . "'" . ")";
  $str= "INSERT INTO answers(question_id,username,image, string, upvote, downvote, anonymous, isright) VALUES ( ";
  
  
  $result = $conn->query($strings);
  
  //echoRespnse(201,$imgmap);  
  
  
   
  
     
});


function sendNotificationFb($username, $string){
  $fb = new Facebook\Facebook([
  'app_id' => '179014802653918',
  'app_secret' => '62b225675f7b88c21f8b4214f4ebdd65',
  'default_graph_version' => 'v2.11',
]);


  try {
  // Returns a `FacebookFacebookResponse` object
  $response = $fb->post(
    '/'.$username.'/notifications',
    array (
      'href' => '?true=43',
      'template' => $string
    ),
    '179014802653918|9l61E_wTOpOyI8ZcvIGQuPKiRe4'
  );
} catch(FacebookExceptionsFacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(FacebookExceptionsFacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
 }


$app->get('/viewallanswers', function() use ($app)  {
	
$conn = new mysqli("localhost", "root", "aquarium201", "online_sohopathi");
  $strings="SELECT  *FROM answers where question_id=123 order by answer_id";
  $result = $conn->prepare($strings);
       
        
  $result->execute();
  $result->bind_result($answer_id,$question_id,$username,$image,$string,$upvote,$downvote,$anonymous,$isright);
  $posts = array();
  
  while($result->fetch()) {
           
           $tmp = array();
           
           
           
           $tmp["answer_id"] = $answer_id;
      $tmp["question_id"] = $question_id;
           $tmp["username"] = $username;
             $tmp["string"] = $string;
		   $tmp["anonymous"] = $anonymous;
		   $tmp["image"] = $image;
		   $tmp["upvote"] = $upvote;
		   $tmp["downvote"] = $downvote;
         $tmp["isright"] = $isright;
		   
		   
           array_push($posts, $tmp);
       }
	   $result->close();
        
        
  echoRespnse(201,$posts);  
	
	
});


$app->post('/viewmyquestions', function() use ($app)  {
    
	//$filter=$_GET["filter"];
  $filter = $app->request->post('filter');
  //echoRespnse(201,$filter); 
$conn = new mysqli("localhost", "root", "aquarium201", "online_sohopathi");
    if($filter!="0"){
         $strings="SELECT * FROM questions where category=". "'".$filter."'"."AND username='shadman'". "order by id desc limit 10";
    }
    
    else
        $strings="SELECT * FROM questions order by id desc limit 10";
  $result = $conn->prepare($strings);
       
        
  $result->execute();
  $result->bind_result($id,$username,$question,$category,$notification,$anonymous,$image,$upvote,$downvote);
  $posts = array();
  
  while($result->fetch()) {
           
           $tmp = array();
           
           
           
           $tmp["id"] = $id;
           $tmp["username"] = $username;
           $tmp["question"] = $question;
           $tmp["category"] = $category;
		   $tmp["anonymous"] = $anonymous;
		   $tmp["image"] = $image;
		   $tmp["upvote"] = $upvote;
		   $tmp["downvote"] = $downvote;
		   
		   
           array_push($posts, $tmp);
       }
	   $result->close();
        
        
        
  echoRespnse(201,$posts);  
	
	
});


$app->post('/uploadmyanswers', function() use ($app)  {
    
  
  // $username=$app->request->post('username');
  // $question=$app->request->post('question');
  // $category=$app->request->post('category');
  // $notifications=$app->request->post('notifications');
  // $imagecount=$app->request->post('imagecount');
  $imagenames="";
  

    $username = $app->request->post('username');
    $string = $app->request->post('string');
    $upvote = $app->request->post('upvote');
    $downvote = $app->request->post('downvote');
    $anonymous = $app->request->post('anonymous');
    $isright = $app->request->post('isright');
    
    $question_id = $app->request->post('question_id');
  
    $imagecount=$app->request->post('imagecount');
	$imagenames="";
	
	$image=$username;
	
  for($i=1;$i<=$imagecount;$i++)
	{
	  $image=$username.$i;
	  $imgmap= $app->request->post($image);
	  
    $path=$image.".png";
       
		while(file_exists($path))
           {
              $image=$image."1";
              $path=$image.".png";
              
           }
		   
		   $imagenames=$imagenames.$path;
		   $imagenames=$imagenames.",";
		   

    file_put_contents($path,base64_decode($imgmap));
	
	}
 // echoRespnse(201,$imgmap);
    
    
 
  
  
  // data.append('username',username);
  // data.append('string',answer);
  // data.append('upvote',upvote);
  // data.append('downvote',downvote);
  //   data.append('anonymous',anonymous);
  // data.append('isright',isright);
  // data.append('image',image);
  //   data.append('question_id',question_id);

  $conn = new mysqli("localhost", "root", "aquarium201", "online_sohopathi");
  $strings="INSERT INTO answers(question_id, username, image, string, upvote, downvote, anonymous, isright) VALUES (" . "'". $question_id . "'". "," . "'". $username . "'". "," . "'". $imagenames. "'" ."," ."'" . $string . "'" . "," . "'". $upvote. "'" . "," . "'".$downvote. "'" . "," . "'". $anonymous. "'" . "," . "'". $isright . "'" . ")";
  $str= "INSERT INTO answers(question_id,username,image, string, upvote, downvote, anonymous, isright) VALUES ( ";
  
  
  $result = $conn->query($strings);
  
  //echoRespnse(201,$strings);  
  
  
   
  
     
});



$app->get('/viewmyanswers', function() use ($app)  {
	
$conn = new mysqli("localhost", "root", "aquarium201", "online_sohopathi");
  $strings="SELECT  *FROM answers where question_id=203 order by answer_id";
  $result = $conn->prepare($strings);
       
        
  $result->execute();
  $result->bind_result($answer_id,$question_id,$username,$image,$string,$upvote,$downvote,$anonymous,$isright);
  $posts = array();
  
  while($result->fetch()) {
           
           $tmp = array();
           
           
           
           $tmp["answer_id"] = $answer_id;
      $tmp["question_id"] = $question_id;
           $tmp["username"] = $username;
             $tmp["string"] = $string;
		   $tmp["anonymous"] = $anonymous;
		   $tmp["image"] = $image;
		   $tmp["upvote"] = $upvote;
		   $tmp["downvote"] = $downvote;
         $tmp["isright"] = $isright;
		   
		   
           array_push($posts, $tmp);
       }
	   $result->close();
        
        
        
  echoRespnse(201,$posts);  
	
	
});



 
    $app->post('/viewonequestion', function() use ($app)  {
    
	//$filter=$_GET["filter"];
  $onequestion = $app->request->post('onequestion');
  //echoRespnse(201,$filter); 
$conn = new mysqli("localhost", "root", "aquarium201", "online_sohopathi");

        $strings="SELECT * FROM questions where id=". "'".$onequestion."'"."";
      $result = $conn->prepare($strings);
       
        
  $result->execute();
  $result->bind_result($id,$title,$username,$question,$category,$notification,$anonymous,$image,$tags,$upvote,$downvote);
  $posts = array();
  
  while($result->fetch()) {
           
           $tmp = array();
          $tmp["id"] = $id;
		   $tmp["title"] = $title;
           $tmp["username"] = $username;
           $tmp["question"] = $question;
           $tmp["category"] = $category;
		   $tmp["anonymous"] = $anonymous;
		   $tmp["image"] = $image;
		   $tmp["upvote"] = $upvote;
		   $tmp["downvote"] = $downvote;
		   $tmp["tags"]=$tags;
		   $tmp["answers"]=viewtheanswers($id);
		   
		   
           array_push($posts, $tmp);
       }
	   $result->close();
        
        
        
  echoRespnse(201,$posts);  
	
	
});

//modified by hridoy...

$app->post('/viewoneblog', function() use ($app)  {
    
  //$filter=$_GET["filter"];
  $oneblog = $app->request->post('oneblog');
  //echoRespnse(201,$filter); 
$conn = new mysqli("localhost", "root", "aquarium201", "online_sohopathi");

        $strings="SELECT * FROM blog where id=". "'".$oneblog."'"."";
      $result = $conn->prepare($strings);
       
        
  $result->execute();
  $result->bind_result($id,$title,$username,$content,$type,$image,$likes);
  $posts = array();
  
  while($result->fetch()) {
           
           $tmp = array();
          $tmp["id"] = $id;
       $tmp["title"] = $title;
           $tmp["username"] = $username;
           $tmp["content"] = $content;
           $tmp["type"] = $type;
       //$tmp["anonymous"] = $anonymous;
       $tmp["image"] = $image;
       $tmp["likes"] = $likes;
       $tmp["comments"]=viewthecomments($id);
       
       
           array_push($posts, $tmp);
       }
     $result->close();
        
        
        
  echoRespnse(201,$posts);  
  
  
});



$app->get('/notesfull/:id', function ($id) {

    $response = array();
    $db = new DbHandler();

    // fetching all user tasks
    $result = $db->getAllUserNotsfull($id);

    $response["error"] = false;
    $response["notices"] = array();
    $response["notices"] = $result;

    // looping through result and preparing tasks array
   // while ($task = $result->fetch_assoc()) {
     //   $tmp = array();
      //  $tmp["name"] = $task["name"];
      //  $tmp["username"] = $task["username"];
      //  $tmp["location"] = $task["location"];
      //  $tmp["bigimage"] = $task["bigimage"];
      //  $tmp["age"] = $task["age"];
     //   $tmp["gender"] = $task["gender"];
      //  $tmp["id"] = $task["id"];
      //  $tmp["date of incident"] = $task["date"];

      //  $tmp["occupation"] = $task["occupation"];
      //  $tmp["appearance"] = $task["appearance"];
      //  $tmp["contact"] = $task["contact"];
       // $tmp["description"] = $task["addition"];
      //  array_push($response["notices"], $tmp);
  //   }

    echoRespnse(200, $response);
});




function verifyRequiredParams($required_fields)
{
    $error = false;
    $error_fields = "";
    $request_params = array();
    $request_params = $_REQUEST;
    // Handling PUT request params
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $app = \Slim\Slim::getInstance();
        parse_str($app->request()->getBody(), $request_params);
    }
    foreach ($required_fields as $field) {
        if (!isset($request_params[$field]) || strlen(trim($request_params[$field])) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }

    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["error"] = true;
        $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
        echoRespnse(400, $response);
        $app->stop();
    }
}


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