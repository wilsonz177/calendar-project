
<?php

    require 'Mod5Database.php';
    session_start();
	$username = $_SESSION['username'];
    $month = (int)$_POST['month'];
    $day = (int)$_POST['day'];
    $year = (int)$_POST['year'];
	$filterTag = (string)$_POST['filterTag'];
	
	
    
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
    
    //get the day's events
	
	if($filterTag === ""){
		$stmt = $mysqli->prepare("select title, hour, minute, event_id, tag from events where user_id=? and month=? and day=? and year=? order by hour, minute");
		if(!$stmt){
			printf("Query Prep Failed: %s\n", $mysqli->error);
			exit;
		}
		$stmt->bind_param('iiii', $user_id, $month, $day, $year);
	}else{
		$stmt = $mysqli->prepare("select title, hour, minute, event_id, tag from events where user_id=? and month=? and day=? and year=? and tag=? order by hour, minute");
		if(!$stmt){
			printf("Query Prep Failed: %s\n", $mysqli->error);
			exit;
		}
		$stmt->bind_param('iiiis', $user_id, $month, $day, $year, $filterTag);
	}
	
    $stmt->execute();
    $stmt->bind_result($title, $hour, $minute, $event_id, $tag);
    
    $result = array();
	
	//SEND THEM IN JSON
	//also send the count 
    $i = 1;
    array_push($result, array());
    $result[0]['count'] = 0;
    while($stmt->fetch()){
        //$temp = "index".$i;
        //$result[$i] = array();
        array_push($result, array());
        $result[$i]['title'] = htmlentities($title); //prevents against Persistent XSS
        $result[$i]['hour'] = $hour;
        $result[$i]['minute'] = $minute;
		$result[$i]['event_id'] = $event_id;
		$result[$i]['tag'] = $tag;
        $result[0]['count'] = $i;
        $i++;
    }
    
    $stmt->close();
    echo json_encode($result);
?>