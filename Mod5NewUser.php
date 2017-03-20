<?php
            require 'Mod5Database.php';
            
            $username = (string)$_POST['username'];
            $password = (string)$_POST['password'];

            if($username == "" || $password == ""){
                header('Location: Mod5Login.php');
                exit;
            }

            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
 
            $stmt = $mysqli->prepare("select username, password from users order by username");
            if(!$stmt){
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
            
            $stmt->execute();
            $result = $stmt->get_result();
            
            while($row = $result->fetch_assoc()){
            
                //check to see if there is a user
                if ($row["username"] == $username) {
                    
                    $arr = ["success" => false, "message" => "Incorrect Username or Password"];
                    header('Content-type: application/json');
                    echo json_encode( $arr );
                    exit;
                } 
            }
            
            $stmt->close();
            
            
            //insert new user and password into database
            $stmt = $mysqli->prepare("insert into users (username, password) values (?, ?)");
            if(!$stmt){
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
             
            $stmt->bind_param('ss', $username, $hashed_password);
            $stmt->execute();
            $stmt->close();
            
            $arr = ["success" => true];
            header('Content-type: application/json');
            echo json_encode( $arr );

               
            //creates a new session and token
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
            exit;
?>