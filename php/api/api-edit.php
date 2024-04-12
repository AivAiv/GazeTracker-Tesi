<?php
	require_once '../../bootstrap.php';

	$result["editSuccess"] = false;
	$result["addedPage"] = false;

	if(isset($_POST["testId"]) && isset($_POST["name"])) {
		$result["editSuccess"] = $dbh->modifyTest($_POST["testId"], $_POST["name"]);
	}

	if(isset($_POST["testId"]) && isset($_POST["page"])) { //TODO: Forse potrei farlo direttamente nel databaseHelper
		$page = json_decode($_POST["page"], true);
		$dbPages = $dbh->getTestPages($_POST["testId"]);


		$oldPage;
			if (!isset($page["id"])) {
				createPage();
			} else {
				$oldPage = $page;

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
		$result["old"] = $oldPage;


		$result["addedPage"] = true;
	}

	/*if(isset($_POST["testId"]) && isset($_POST["name"]) && isset($_POST["pages"])) {
		$result["editSuccess"] = $dbh->modifyTest($_POST["testId"], $_POST["name"]);
		$pages = json_decode($_POST["pages"], true);
		$dbPages = $dbh->getTestPages($_POST["testId"]);

		// Add new pages
		$oldPages = Array();
		for ($i = 0; $i < count($pages); $i++) {
			if (!isset($pages[$i]["id"])) {
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
	}*/

	if(isset($_POST["testId"]) && isset($_POST["state"])) {
		$result["editSuccess"] = $dbh->updateTestState($_POST["testId"], $_POST["state"]);
	}

	header('Content-Type: application/json');
	echo json_encode($result);

	function createPage() {//FIXME: Duplicated code
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
	}
?>