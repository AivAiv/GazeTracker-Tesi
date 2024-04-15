<?php
	require_once '../../bootstrap.php';
		
	$templateParams["title"] = "GazeTracker";
	$templateParams["pageName"] = "testReview.php";
	$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", 
									"https://cdnjs.cloudflare.com/ajax/libs/heatmap.js/2.0.0/heatmap.min.js", 
		"../../js/navigation.js", "../../js/reviewTest.js");
	$templateParams["css"] = array();//"light-background", "register-login", "register");

	$templateParams["navigationButtons"] = array("home"=>true, 
												"logout"=>false,   
												"forward"=>false, 
												"backward"=>false);

	require '../template/base.php';
?>