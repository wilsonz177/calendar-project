<!DOCTYPE html>
<html>
    <head></head>
        <body>
            
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
    
                    echo "correct password";
                    session_start();
                    $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
                    $_SESSION['username'] = $username;
                    //go to news
                    header("Location: Mod5Calendar.php");
                    exit;
                }
            } 
        }
        $stmt->close();
        
        header("Location: Mod5Login.php?wronginput=yes");
        ?>
        </body>
</html>