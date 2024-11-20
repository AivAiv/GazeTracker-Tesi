<?php
	require_once '../../bootstrap.php';
		
	$templateParams["title"] = "GazeTracker";
	$templateParams["pageName"] = "testEditor.php";
	$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", 
									"https://cdnjs.cloudflare.com/ajax/libs/heatmap.js/2.0.0/heatmap.min.js", 
									"../../js/navigation.js", 
									"../../js/utils/alert.js", 
									"../../js/utils/pagesHolder.js", 
									"../../js/utils/pagesList.js" , 
									"../../js/utils/popUp.js", 
									"../../js/editor.js");
	$templateParams["css"] = array("main");

	$templateParams["navigationButtons"] = array("home"=>true, 
												"logout"=>false,   
												"forward"=>false, 
												"backward"=>false);

	if (!isset($_SESSION["userType"])) {
		header("Location: ../../index.php");
		die();
	}

	require '../template/base.php';
?>