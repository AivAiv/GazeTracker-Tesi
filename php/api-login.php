<?php
	require_once '../bootstrap.php';

	$result["loginSuccess"] = false;
	$result["userType"] = "T";

	if(isset($_POST["email"]) && isset($_POST["password"])) {
		$login_result = $dbh->login($_POST["email"], $_POST["password"]);
		if(isset($login_result) && (count($login_result) != 0)) {
			$result["loginSuccess"] = true;
			$result["userType"] = $login_result[0]["type"];
		}
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>