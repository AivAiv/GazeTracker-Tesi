<?php
	require_once '../../bootstrap.php';

	$result["creationSuccess"] = false;

	if(isset($_POST["testName"]) && isset($_POST["pages"])) {
		$testId = $dbh->createTest($_POST["testName"], $_SESSION["id"]);
		$result["idk"] = json_decode($_POST["pages"], true);
		foreach ($result["idk"] as $page) {
			$result["creationSuccess"] = $dbh->addTestPage($page["name"], $testId, $page["link"], 
									$page["image"], $page["text"], $page["maxTime"]);
			if (!$result["creationSuccess"]) { return; }
		}
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>