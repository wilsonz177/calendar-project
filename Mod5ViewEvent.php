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
	
	$userloggedin = $_SESSION['username'];
	$user = (string)$_POST['whosecalendar'];
    $month = (int)$_POST['month'];
    $day = (int)$_POST['day'];
    $year = (int)$_POST['year'];
	$original = true;
	$result = array();
	
	
    if ($user !== $userloggedin){
		$original = false;
		$result[0]['showAll'] = false;
	}else{
		$result[0]['showAll'] = true;
	}
    //GET THE USER ID
    $stmt = $mysqli->prepare("select id from users where username=?");
	if(!$stmt){
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}
    $stmt->bind_param('s', $user);
    $stmt->execute();
    $stmt->bind_result($user_id);
    $stmt->fetch();
    $stmt->close();
    
    //get the day's events
    $stmt = $mysqli->prepare("select title, hour, minute, event_id from events where user_id=? and month=? and day=? and year=? order by hour");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('iiii', $user_id, $month, $day, $year);
    $stmt->execute();
    $stmt->bind_result($title, $hour, $minute, $event_id);
    
    
	
	//SEND THEM IN JSON
	//also send the count 
    $i = 1;
    array_push($result, array());
    $result[0]['count'] = 0;
    while($stmt->fetch()){
        array_push($result, array());
        $result[$i]['title'] = htmlentities($title); //prevents against Persistent XSS
        $result[$i]['hour'] = $hour;
        $result[$i]['minute'] = $minute;
		$result[$i]['event_id'] = $event_id;
        $result[0]['count'] = $i;
        $i++;
    }
    
    $stmt->close();
    echo json_encode($result);
?>