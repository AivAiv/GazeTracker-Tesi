<?php
	require_once '../../bootstrap.php';
	$imgDir = "../../img/";

	$result["editSuccess"] = false;
	$result["addedPage"] = false;

	if(isset($_POST["testId"]) && isset($_POST["name"])) {
		$result["editSuccess"] = $dbh->modifyTestName($_POST["testId"], $_POST["name"]);
	}

	if(isset($_POST["testId"]) && isset($_POST["testQuestionnaire"])) {
		$result["editSuccess"] = $dbh->modifyTestQuestionnaire($_POST["testId"], $_POST["testQuestionnaire"]);
	}

	if(isset($_POST["testId"]) && isset($_POST["testPassword"])) {
		$result["editSuccess"] = $dbh->modifyTestPassword($_POST["testId"], $_POST["testPassword"]);
	}

	if(isset($_POST["testId"]) && isset($_POST["pagesRemaining"])) {
		$dbPages = $dbh->getTestPages($_POST["testId"]);
		$remainingPages = json_decode($_POST["pagesRemaining"], true);
		foreach ($dbPages as $dbPage) {
			$key = array_search($dbPage["id"], array_column($remainingPages, 'id'));
			if ($key === false) {
				$dbh->removeTestPage($dbPage["id"]);
			}
		}
		$result["editSuccess"] = true;
	}
		
	if(isset($_POST["testId"]) && isset($_POST["pagesToAdd"])) {
		$pagesToAdd = json_decode($_POST["pagesToAdd"], true);
		foreach ($pagesToAdd as $page) {
			if (!isset($page["maxTime"])) {
				$page["maxTime"] = "10:00:00";
			}
			$result["page"] = $page;
			if (isset($page["image"]) && isset($_FILES["imgsToAdd"])) { // Add image page
				$result["files"] = $_FILES["imgsToAdd"];
				$pageId = $dbh->addTestPage($page["name"], $_POST["testId"], $page["link"], "missing file", $page["text"], $page["maxTime"]);
				$extension = strtolower(pathinfo($_FILES["imgsToAdd"]["name"][$page["listId"]], PATHINFO_EXTENSION));
				$pageName = $_SESSION['id'] . "_" . $_POST["testId"] . "_" . $pageId . "." . $extension;
				$dbh->updateImageName($pageId, $pageName);
				$pathCompleta = $imgDir . $pageName;
				move_uploaded_file($_FILES["imgsToAdd"]["tmp_name"][$page["listId"]], $pathCompleta);
			} else { // Add link or text page
				$pageId = $dbh->addTestPage($page["name"], $_POST["testId"], $page["link"], $page["image"], $page["text"], $page["maxTime"]);
			}
		}
		$result["addedPages"] = true;
	}

	if(isset($_POST["testId"]) && isset($_POST["state"])) {
		$result["editSuccess"] = $dbh->updateTestState($_POST["testId"], $_POST["state"]);
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>