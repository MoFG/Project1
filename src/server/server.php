<?php

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
        
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $username=$request->username;
        echo json_encode("Username is ".$username);

}
else
{
    echo "Not allowed";
}

?>
