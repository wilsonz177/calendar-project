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
        
        $shareCalendarToThisUser = (string) $_POST["shared"];
        $username = (string) $_SESSION["username"];
        $shared = false;
        
         if($shareCalendarToThisUser == ""){ //change this
                header('Location: Mod5Login.php');
                exit;
        }
        
        $stmt = $mysqli->prepare("select username from users where username=?");
        if(!$stmt){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt->bind_param('s', $shareCalendarToThisUser);
        $stmt->execute();
        $stmt->bind_result($sql_username);
        
        
        while($stmt->fetch()){
           
            //check to see if there is a user that can be shared to
            if ($sql_username == $shareCalendarToThisUser) {
                    $shared = true;
                }    
        }
        
        
        $stmt->close();
        
        if($shared){
            $makeConnection = $mysqli->prepare("insert into shares (this_user_shared_to, this_second_user) values (?,?)");
            if(!$makeConnection){
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
            $makeConnection->bind_param('ss', $username, $shareCalendarToThisUser);
            $makeConnection->execute();
            
            $arr = ["success" => true];
            header('Content-type: application/json');
            echo json_encode( $arr );
            $makeConnection->close();
            exit;
        }
        
         $arr = ["success" => false, "message" => "Incorrect Username or Password"];
                    header('Content-type: application/json');
                    echo json_encode( $arr );
                    exit;
?>