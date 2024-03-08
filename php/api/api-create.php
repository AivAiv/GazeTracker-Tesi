<?php
	require_once '../../bootstrap.php';

	$result["creationSuccess"] = false;

	if(isset($_POST["name"]) && isset($_POST["codCreator"])) {
		$result["creationSuccess"] = $dbh->createTest($_POST["name"], $_POST["codCreator"]);
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>