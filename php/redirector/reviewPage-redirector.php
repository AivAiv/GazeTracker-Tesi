<?php
	require_once '../../bootstrap.php';
		
	$templateParams["title"] = "GazeTracker";
	$templateParams["pageName"] = "reviewTest.php";
	$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../../js/navigation.js", "../../js/reviewPage.js");
	$templateParams["css"] = array();//"light-background", "register-login", "register");

	$templateParams["navigationButtons"] = array("home"=>true, 
												"logout"=>false,   
												"forward"=>true, 
												"backward"=>true);

	require '../template/base.php';
?>