<?php
	require_once '../../bootstrap.php';
		
	$templateParams["title"] = "GazeTracker";
	$templateParams["pageName"] = "test.php";
	$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", 
									"../../js/navigation.js", 
									"../../js/lib/webgazer.js", 
									"../../js/executeTest.js");
	$templateParams["css"] = array("main");

	$templateParams["navigationButtons"] = array("home"=>true, 
												"logout"=>false,   
												"forward"=>true, 
												"backward"=>false);

	require '../template/base.php';
?>