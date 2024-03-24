<?php
	require_once '../../bootstrap.php';
		
	$templateParams["title"] = "GazeTracker";
	$templateParams["pageName"] = "testEditor.php";
	$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", 
									"https://cdnjs.cloudflare.com/ajax/libs/heatmap.js/2.0.0/heatmap.min.js", 
		"../../js/navigation.js", "../../js/pagesHolder.js", "../../js/pagesList.js" , "../../js/popUp.js", "../../js/editor.js");
	$templateParams["css"] = array();//"light-background", "register-login", "register");

	require '../template/base.php';
?>