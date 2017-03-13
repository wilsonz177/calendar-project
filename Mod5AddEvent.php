<html>
<?php
    require 'Mod5Database.php';
    
    //header("Content-Type: application/json");
    
    $username = (string)$_POST['username'];
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
        echo $username;
        exit;
    }
    $stmt->bind_param('siiiiis', $title, $month, $day, $year, $hour, $minute, $username);
    $stmt->execute();
    $stmt->close();
    
    
//    echo json_encode(array(
//		"success" => true
//	));
//	exit;

    
?>
</html>