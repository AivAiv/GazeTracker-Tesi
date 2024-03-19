<?php
	require_once '../../bootstrap.php';

	$result["creationSuccess"] = false;

	if(isset($_POST["testName"]) && isset($_POST["pages"])) {
		$testId = $dbh->createTest($_POST["testName"], $_SESSION["id"]);
		$pages = json_decode($_POST["pages"], true);
		foreach ($pages as $page) {
			$result["creationSuccess"] = $dbh->addTestPage($page["name"], $testId, $page["link"], $page["image"], $page["text"], $page["maxTime"]);
			if (!$result["creationSuccess"]) { return; }
		}
		if (count($pages) == 0) { $result["creationSuccess"] = true; }
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>