<!DOCTYPE html>
<html>
    <head>
        <title>Calendar Log In</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> <!-- load JQuery -->
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.7/jquery.validate.min.js"></script>
        <script type="text/javascript" src="Login3.js"></script> <!-- load the JavaScript file -->
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
        
        
        <form name="input" id="login-form" method="POST">
            Username: <input type="text" name="username" id="username"/>
            Password: <input type="password" name="password" id="password"/>
                      <input type="button" id="submitLogin" value="Login"/>
        </form>
        
        Or create a new user
        <form name="input" id="new-user-form" method="POST">
            New Username: <input type="text" name="username" id="username"/>
            New Password: <input type="password" name="password" id="password"/>
                          <input type="button" id="submitNewUser"value="Submit"/>
        </form>
        
        Or continue as a guest. Note that you won't be able to create your own posts or comment on anything.
        <form name="input" action="Mod5Calendar.php" method="POST">
                    <input type="hidden" name="username" value="<?php echo session_start();
                    $_SESSION['username'] = "Guest"; ?>"/>
                    <input type="button" id="submitGuest" value="Continue as Guest"/>
        </form>
        
        <div id="error">
        <!-- error will be shown here ! -->
        </div>
    </body>
</html>