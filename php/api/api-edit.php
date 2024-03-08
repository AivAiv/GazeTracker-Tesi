<?php
	require_once '../../bootstrap.php';

	$result["editSuccess"] = false;

	if(isset($_POST["testId"]) && isset($_POST["name"])) {
		$result["editSuccess"] = $dbh->modifyTest($_POST["testId"], $_POST["name"]);
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>