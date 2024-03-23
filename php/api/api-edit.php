<?php
	require_once '../../bootstrap.php';

	$result["editSuccess"] = false;

	if(isset($_POST["testId"]) && isset($_POST["name"]) && isset($_POST["pages"])) {
		$result["editSuccess"] = $dbh->modifyTest($_POST["testId"], $_POST["name"]);
		$pages = json_decode($_POST["pages"], true);
		$dbPages = $dbh->getTestPages($_POST["testId"]);

		// Add new pages
		$oldPages = Array();
		for ($i = 0; $i < count($pages); $i++) {
			if (!isset($pages[$i]["id"])) {
				$dbh->addTestPage($pages[$i]["name"], $_POST["testId"], $pages[$i]["link"], $pages[$i]["image"], $pages[$i]["text"], $pages[$i]["maxTime"]);
			} else {
				array_push($oldPages, $pages[$i]);
			}
		}
		$result["old"] = $oldPages;

		// Delete deleted pages
		$result["db"] = $dbPages;
		$result["if"] = Array();
		foreach ($dbPages as $dbPage) {
			$key = array_search($dbPage["id"], array_column($oldPages, 'id'));
			array_push($result["if"], $key);
			if ($key === false) {
				$dbh->removeTestPage($dbPage["id"]);
			}
		}
	}

	if(isset($_POST["testId"]) && isset($_POST["state"])) {
		$result["editSuccess"] = $dbh->updateTestState($_POST["testId"], $_POST["state"]);
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>