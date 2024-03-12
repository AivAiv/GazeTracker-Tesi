<?php
	require_once '../../bootstrap.php';

	$result["creationSuccess"] = false;

	if(isset($_POST["testName"])) {
		$result["creationSuccess"] = $dbh->createTest($_POST["testName"], $_SESSION["id"]);
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>