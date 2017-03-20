<html>
<?php
    require 'Mod5Database.php';
    
    //header("Content-Type: application/json");
    session_start();
    
    $username = $_SESSION['username'];
    $title = (string)$_POST['title'];
    $month = (int)$_POST['month'];
    $day = (int)$_POST['day'];
    $year = (int)$_POST['year'];
    $hour = (int)$_POST['hour'];
    $minute = (int)$_POST['minute'];
    $tag = (string)$_POST['tag'];
    
    
    
    
    
    $stmt = $mysqli->prepare("insert into events (title, user_id, month, day, year, hour, minute, tag)
                             select ?, id, ?, ?, ?, ?, ?, ? from users where username=?");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        echo $username;
        exit;
    }
    $stmt->bind_param('siiiiiss', $title, $month, $day, $year, $hour, $minute, $tag, $username);
    $stmt->execute();
    $stmt->close();
    
    
//    echo json_encode(array(
//		"success" => true
//	));
//	exit;

    
?>
</html>