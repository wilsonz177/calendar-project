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
    $month = (int)$_POST['month'];
    $day = (int)$_POST['day'];
    $year = (int)$_POST['year'];
    $hour = (int)$_POST['hour'];
    $minute = (int)$_POST['minute'];
    
    $stmt = $mysqli->prepare("insert into events (title, user_id, month, day, year, hour, minute)
                             select ?, id, ?, ?, ?, ?, ? from users where username=?");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('siiiiis', $title, $month, $day, $year, $hour, $minute, $username);
    $stmt->execute();
    $stmt->close();
?>