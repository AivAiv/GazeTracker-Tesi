<?php
	require_once '../../bootstrap.php';
		
	$templateParams["title"] = "GazeTracker - Home";
	$templateParams["pageName"] = "home.php";
	$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", 
									"https://cdnjs.cloudflare.com/ajax/libs/heatmap.js/2.0.0/heatmap.min.js", 
		"../../js/navigation.js", "../../js/home.js");
	$templateParams["css"] = array("main");

	$templateParams["navigationButtons"] = array("home"=>false, 
												"logout"=>true,   
												"forward"=>false, 
												"backward"=>false);

	require '../template/base.php';
?>