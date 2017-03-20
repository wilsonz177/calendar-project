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
	
    $username = $_SESSION['username'];
    $title = (string)$_POST['title'];
    $hour = (int)$_POST['hour'];
    $minute = (int)$_POST['minute'];
	$event_id = (int)$_POST['event_id'];
    
     
    //GET THE USER ID
    $stmt = $mysqli->prepare("select id from users where username=?");
	if(!$stmt){
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->bind_result($user_id);
    $stmt->fetch();
    $stmt->close();
    
    //edit the row containing the event
    $stmt = $mysqli->prepare("update events set title=?, hour=?, minute=? where user_id=? and event_id=?");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('siiii', $title, $hour, $minute, $user_id, $event_id);
    $stmt->execute();
    $stmt->close(); 
?>