<?php
	require_once '../../bootstrap.php';
	$imgDir = "../../img/";

	$result["testCreated"] = false;
	$result["addedPage"] = false;

	if(isset($_POST["testName"])) {
		$result["testId"] = $dbh->createTest($_POST["testName"], $_SESSION["id"]);
		$result["testCreated"] = true;
	}

	if(isset($_POST["testId"]) && isset($_POST["page"])) { //TODO: Forse otrei farlo direttamente nel databaseHelper
		$page = json_decode($_POST["page"], true);
		if (isset($_FILES["imgFile"])) { // Add image page
			$pageId = $dbh->addTestPage($page["name"], $_POST["testId"], $page["link"], "missing file", $page["text"], $page["maxTime"]);
            $extension = strtolower(pathinfo($_FILES["imgFile"]["name"], PATHINFO_EXTENSION));
            $pageName = $_SESSION['id'] . "_" . $_POST["testId"] . "_" . $pageId . "." . $extension;
			$dbh->updateImageName($pageId, $pageName);
            $pathCompleta = $imgDir . $pageName;
			move_uploaded_file($_FILES["imgFile"]["tmp_name"], $pathCompleta);
		} else { // Add link or text page
			$pageId = $dbh->addTestPage($page["name"], $_POST["testId"], $page["link"], $page["image"], $page["text"], $page["maxTime"]);
		}
		$result["addedPage"] = true;
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>