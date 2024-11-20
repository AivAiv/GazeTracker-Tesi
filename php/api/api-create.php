<?php
	require_once '../../bootstrap.php';

	$result["testCreated"] = false;
	$result["addedPage"] = false;

	// Test setup
	if(isset($_POST["testName"])) { // TODO: Controlla che non passi null o dia problemi
		$anonym = ($_POST["anonymUser"] == "true") ? 1 : 0;
		$result["testId"] = $dbh->createTest($_POST["testName"],$_POST["testquestionnaire"], $_POST["testPassword"], $anonym, $_SESSION["id"]);
		$result["testCreated"] = true;
	}

	// Upload test page
	if(isset($_POST["testId"]) && isset($_POST["page"])) {
		$page = json_decode($_POST["page"], true);
		if (!isset($page["maxTime"])) {
			$page["maxTime"] = "10:00:00";
		}
		if (isset($_FILES["imgFile"])) { // Add image page
			$pageId = $dbh->addTestPage($page["name"], $_POST["testId"], $page["link"], "missing file", $page["text"], $page["maxTime"]);
            $extension = strtolower(pathinfo($_FILES["imgFile"]["name"], PATHINFO_EXTENSION));
            $pageName = $_SESSION['id'] . "_" . $_POST["testId"] . "_" . $pageId . "." . $extension;
			$dbh->updateImageName($pageId, $pageName);
            $pathCompleta = UPLOAD_DIR . $pageName;
			move_uploaded_file($_FILES["imgFile"]["tmp_name"], $pathCompleta);
		} else { // Add link or text page
			$pageId = $dbh->addTestPage($page["name"], $_POST["testId"], $page["link"], $page["image"], $page["text"], $page["maxTime"]);
		}
		$result["addedPage"] = true;
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>