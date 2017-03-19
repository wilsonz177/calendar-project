<?php

require 'Mod5Database.php';
    session_start();
    $username = $_SESSION['username'];
    $title = (string)$_POST['title'];
    $month = (int)$_POST['month'];
    $day = (int)$_POST['day'];
    $year = (int)$_POST['year'];
    $hour = (int)$_POST['hour'];
    $minute = (int)$_POST['minute'];
    $oldHour = (int)$_POST['oldHour'];
    $oldMinute = (int)$_POST['oldMinute'];
    
     
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
    $stmt = $mysqli->prepare("update events set title=?, hour=?, minute=? where user_id=? and month=? and day=? and year =? and hour =? and minute=?");
                             
                             //insert into events (title, user_id, month, day, year, hour, minute)
                             //select ?, id, ?, ?, ?, ?, ? from users where username=?");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        echo $username;
        exit;
    }
    $stmt->bind_param('siiiiiiii', $title, $hour, $minute, $user_id, $month, $day, $year, $oldHour, $oldMinute);
    $stmt->execute();
    $stmt->close(); 
?>