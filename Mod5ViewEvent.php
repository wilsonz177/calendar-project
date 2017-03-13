
<?php

    require 'Mod5Database.php';
    
    $username = (string)$_POST['username'];
    $month = (int)$_POST['month'];
    $day = (int)$_POST['day'];
    $year = (int)$_POST['year'];
    
    
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
    
    
    $stmt = $mysqli->prepare("select title, hour, minute from events where user_id=? and month=? and day=? and year=? order by hour");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('iiii', $user_id, $month, $day, $year);
    $stmt->execute();
    $stmt->bind_result($title, $hour, $minute);
    
    $result = array();
    $i = 1;
    array_push($result, array());
    $result[0]['count'] = 0;
    while($stmt->fetch()){
        //$temp = "index".$i;
        //$result[$i] = array();
        array_push($result, array());
        $result[$i]['title'] = $title;
        $result[$i]['hour'] = $hour;
        $result[$i]['minute'] = $minute;
        $result[0]['count'] = $i;
        $i++;
    }
    
    $stmt->close();
    echo json_encode($result);
?>