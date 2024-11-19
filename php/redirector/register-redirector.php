<?php
	require_once '../../bootstrap.php';
		
	$templateParams["title"] = "GazeTracker - Registrazione";
	$templateParams["pageName"] = "register.php";
	$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../../js/utils/alert.js", "../../js/register.js", "../../js/lib/sha512.js");
	$templateParams["css"] = array("../../css/main");

	require '../template/accessBase.php';