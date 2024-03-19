<?php
	require_once '../../bootstrap.php';
		
	$templateParams["title"] = "WebGazer";
	$templateParams["pageName"] = "testEditor.php";
	$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../../js/navigation.js", "../../js/pagesHolder.js", "../../js/pagesList.js" , "../../js/popUp.js", "../../js/editor.js");
	$templateParams["css"] = array();//"light-background", "register-login", "register");

	require '../template/base.php';
?>