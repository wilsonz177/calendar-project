<?php
        require 'Mod5Database.php';
        
        $username = (string) $_POST["username"];
        $password = (string) $_POST["password"];
        $loggedin = false;
        
         if($username == "" || $password == ""){
                header('Location: Mod5Login.php');
                exit;
        }
        
        $stmt = $mysqli->prepare("select username, password from users where username=?");
        if(!$stmt){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $stmt->bind_result($sql_username, $sql_password);
        
        
        while($stmt->fetch()){
           
            //check to see if there is a user and check to see if the password is correct
            if ($sql_username == $username) {
                
                if(password_verify($password, $sql_password)) {
                        
                    $loggedin = true;
                    $arr = ["success" => true];
                    header('Content-type: application/json');
                    echo json_encode( $arr );
                    
                    ini_set("session.cookie_httponly", 1); //disables cookies
                    session_start();
                    $previous_ua = @$_SESSION['useragent']; //user agent consistency
                    $current_ua = $_SERVER['HTTP_USER_AGENT'];  
                    if(isset($_SESSION['useragent']) && $previous_ua !== $current_ua){
                        die("Session hijack detected");
                    }else{
                        $_SESSION['useragent'] = $current_ua;
                    }
                    
                    $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
                    $_SESSION['username'] = $username;
                    
                } else {
                    $arr = ["success" => false, "message" => "Incorrect Username or Password"];
                    header('Content-type: application/json');
                    echo json_encode( $arr );
                    exit;
                }   
            }
        }
        $stmt->close();
        
        if($loggedin){ //set up all available calendars
                $getAllCalendars = $mysqli->prepare("select this_user_shared_to from shares where this_second_user=?");
                if(!$getAllCalendars){
                    printf("Query Prep Failed: %s\n", $mysqli->error);
                    exit;
                }
                $getAllCalendars->bind_param('s', $username);
                $getAllCalendars->execute();
                $getAllCalendars->bind_result($sql_shared_user);
                $allCalendars = array();
                while($getAllCalendars->fetch()){
                        array_push($allCalendars, $sql_shared_user);
                }
                $_SESSION['sharedcalendars'] = $allCalendars;
                $getAllCalendars->close();
                exit;
        }
        
         $arr = ["success" => false, "message" => "Incorrect Username or Password"];
                    header('Content-type: application/json');
                    echo json_encode( $arr );
                    exit;
?>