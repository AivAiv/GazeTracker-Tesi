<?php
	require_once '../../bootstrap.php';
		
	$templateParams["title"] = "GazeTracker";
	$templateParams["pageName"] = "home.php";
	$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", 
									"https://cdnjs.cloudflare.com/ajax/libs/heatmap.js/2.0.0/heatmap.min.js", 
		"../../js/navigation.js", "../../js/testRetriever.js");
	$templateParams["css"] = array();//"light-background", "register-login", "register");

	$templateParams["navigationButtons"] = array("home"=>false, 
												"logout"=>true,   
												"forward"=>false, 
												"backward"=>false);

	require '../template/base.php';
?>