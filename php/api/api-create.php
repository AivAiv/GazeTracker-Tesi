<?php
	require_once '../../bootstrap.php';
	$imgDir = "../../img/";

	$result["testCreated"] = false;
	$result["addedPage"] = false;

	if(isset($_POST["testName"])) {
		$result["testId"] = $dbh->createTest($_POST["testName"], $_SESSION["id"]);
		$result["testCreated"] = true;
	}

	if(isset($_POST["testId"]) && isset($_POST["page"])) { //TODO: Potrei farlo direttamente nel databaseHelper
		$page = json_decode($_POST["page"], true);
		if (isset($_FILES["imgFile"])) { // Add image page
			/*$pageId = $dbh->addTestPage($page["name"], $_POST["testId"], $page["link"], "missing file", $page["text"], $page["maxTime"]);
            $extension = strtolower(pathinfo($_POST["imgFile"]["name"], PATHINFO_EXTENSION));
            $pageName = $_SESSION['id'] . "_" . $_POST["testId"] . "_" . $pageId . "." . $extension;
			$dbh->updateImageName($pageId, $pageName);
            $pathCompleta = $imgDir . $pageName;
			move_uploaded_file($_FILES["imgFile"]["tmp_name"], $pathCompleta);

			$result["newName"] = $pageName;
			$result["ext"] = $extension;
			$result["oldName"] = $_POST["imgFile"]["name"];*/
		} else { // Add link or text page
			$pageId = $dbh->addTestPage($page["name"], $_POST["testId"], $page["link"], $page["image"], $page["text"], $page["maxTime"]);
		}
		$result["addedPage"] = true;
	}

	// --------------
	/*if(isset($_POST["testName"]) && isset($_POST["pages"])) {
		$testId = $dbh->createTest($_POST["testName"], $_SESSION["id"]);
		$pages = json_decode($_POST["pages"], true);
		foreach ($pages as $page) {
			if ($page["image"] != null) {
				$location ="ciaone.jpg";
            	$pathCompleta = "../../img/" . $location;
                move_uploaded_file($_FILES["thing"]["tmp_name"], $pathCompleta);
				$result["immagine"] = $pathCompleta;
				$result["files"] = $_FILES;
				$result["f"] = $_SESSION;
			}
			$result["creationSuccess"] = $dbh->addTestPage($page["name"], $testId, $page["link"], $page["image"], $page["text"], $page["maxTime"]);
			if (!$result["creationSuccess"]) { return; }
		}
		if (count($pages) == 0) { $result["creationSuccess"] = true; }
	}*/
	//-----------------

	header('Content-Type: application/json');
	echo json_encode($result);
?>