<?php
	require_once '../../bootstrap.php';
		
	$templateParams["title"] = "GazeTracker - Registrazione";
	$templateParams["pageName"] = "register.php";
	$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../../js/register.js", "../../js/sha512.js");
	$templateParams["css"] = array();//"light-background", "register-login", "register");

	require '../template/accessBase.php';
?>