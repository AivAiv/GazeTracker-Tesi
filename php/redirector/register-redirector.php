<?php
	require_once '../../bootstrap.php';
		
	$templateParams["title"] = "GazeTracker";
	$templateParams["pageName"] = "register.php";
	$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../../js/register.js", "../../js/sha512.js");
	$templateParams["css"] = array();//"light-background", "register-login", "register");

	require '../template/accessBase.php';
?>