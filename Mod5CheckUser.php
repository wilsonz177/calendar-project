<?php
        require 'Mod5Database.php';
        
        $username = (string) $_POST["username"];
        $password = (string) $_POST["password"];
        
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
                    $arr = ["success" => true];
                    header('Content-type: application/json');
                    echo json_encode( $arr );
                    
                    session_start();
                    $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
                    $_SESSION['username'] = $username;
                    //go to news
                    exit;
                } else {
                    $arr = ["success" => false, "message" => "Incorrect Username or Password"];
                    header('Content-type: application/json');
                    echo json_encode( $arr );
                    exit;
                    
                }
                
            }
        }
        $stmt->close();
        
         $arr = ["success" => false, "message" => "Incorrect Username or Password"];
                    header('Content-type: application/json');
                    echo json_encode( $arr );
                    exit;
?>