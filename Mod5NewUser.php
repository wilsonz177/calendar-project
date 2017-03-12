<!DOCTYPE html>
<html>
    <head><title>Results</title></head>
        <body>
        <?php
            require 'Mod5Database.php';
            
            
            $username = (string)$_POST['username'];
            $password = (string)$_POST['password'];
            
            //printf("this is the username: %s", $username);
            //printf("this is the password: %s", $password);
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
                printf("\t<li>%s %s</li>\n",
                    htmlspecialchars( $row["username"] ),
                    htmlspecialchars( $row["password"] )
                );
            
                //check to see if there is a user and check to see if the password is correct
                if ($row["username"] == $username) {
                    echo "That username is taken.";
                    header('Location: Mod5Login.php');
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
            
            //creates a new session and token
            session_start();
            $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
            $_SESSION['username'] = $username;
            
            //go to calendar
             header('Location: Mod5Calendar.php'); 
        ?>
        </body>
</html>