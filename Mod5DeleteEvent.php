<?php

	require 'Mod5Database.php';
    ini_set("session.cookie_httponly", 1); //disables cookies
	session_start();
	
	$previous_ua = @$_SESSION['useragent']; //user agent consistency
    $current_ua = $_SERVER['HTTP_USER_AGENT'];                     
    if(isset($_SESSION['useragent']) && $previous_ua !== $current_ua){
        die("Session hijack detected");
    }else{
        $_SESSION['useragent'] = $current_ua;
    }
	
    $username = (string)$_SESSION['username'];
    $event = (int)$_POST['event_id'];

    //GET THE USER ID
    $stmt = $mysqli->prepare("select id from users where username=?");
	if(!$stmt){
		printf("Query Prep Failed: %s\n", $mysqli->error);
		$arr = ["success" => false, "message" => "Couldn't delete event."];
        header('Content-type: application/json');
        echo json_encode( $arr );        
		exit;
	}
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->bind_result($id_user);
    $stmt->fetch();
    $stmt->close();
    
    //delete the event
    $stmt = $mysqli->prepare("delete from events where user_id=? and event_id=?");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        $arr = ["success" => false, "message" => "Couldn't delete event."];
        header('Content-type: application/json');
        echo json_encode( $arr );
        exit;
    }
	
	
    $stmt->bind_param('si', $id_user, $event);
    $stmt->execute();
    $stmt->close();
	
	$arr = ["success" => true];
    header('Content-type: application/json');
    echo json_encode( $arr );
	exit;
?>