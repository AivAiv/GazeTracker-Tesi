<?php
	require_once '../../bootstrap.php';
		
	$templateParams["title"] = "GazeTracker";
	$templateParams["pageName"] = "reviewPage.php";
	$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
									"https://cdnjs.cloudflare.com/ajax/libs/heatmap.js/2.0.0/heatmap.min.js", 
									"../../js/navigation.js", 
									"../../js/reviewPage.js");
	$templateParams["css"] = array("main");

	$templateParams["navigationButtons"] = array("home"=>true, 
												"logout"=>false,   
												"forward"=>true, 
												"backward"=>true);

	require '../template/base.php';
?>