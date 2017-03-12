<!DOCTYPE html>
<html>
    <head>
        <title>Calendar Log In</title>
    </head>
    
    <body>
        <h2> Welcome to Janky Calendar </h2>
        <h4> Please enter your login information below</h4>
        <?php
            session_start();
            if(isset($_GET['wronginput'])){
                $wronginput = (string) $_GET['wronginput'];
                if($wronginput = "yes"){
                    echo "You have inputted the wrong username and/or password<br><br>";
                }
            }
            if(isset($_SESSION['logout'])){
                $logout = (string) $_SESSION['logout'];
                if($logout = 'yes'){
                    echo "You have successfully logged out<br><br>";
                    session_destroy();
                }
            }
        ?>
        <form name="input" action="Mod5CheckUser.php" method="POST">
            Username: <input type="text" name="username"/>
            Password: <input type="password" name="password"/>
                      <input type="submit" value="Submit"/>
        </form>
        
        Or create a new user
        <form name="input" action="Mod5NewUser.php" method="POST">
            New Username: <input type="text" name="username"/>
            New Password: <input type="password" name="password"/>
                          <input type="submit" value="Submit"/>
        </form>
        
        Or continue as a guest. Note that you won't be able to create your own posts or comment on anything.
        <form name="input" action="Mod5Calendar.php" method="POST">
                    <input type="hidden" name="username" value="<?php echo session_start();
                    $_SESSION['username'] = "Guest"; ?>"/>
                    <input type="submit" value="Continue as Guest"/>
        </form>
    </body>
</html>