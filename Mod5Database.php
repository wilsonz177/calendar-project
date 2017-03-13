<?php
		$mysqli = new mysqli('localhost', 'module5', 'cse330', 'mod5');
 
		if($mysqli->connect_errno) {
		printf("Connection Failed: %s\n", $mysqli->connect_error);
		exit;
		}
?>