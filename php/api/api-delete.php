<?php
	require_once '../../bootstrap.php';

	$result["deletionSuccess"] = false;
	
	if(isset($_POST["testId"])) {
		$result["deletionSuccess"] = $dbh->deleteTest($_POST["testId"]);
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>