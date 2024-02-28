<?php
	require_once '../bootstrap.php';

	$result["loginSuccess"] = false;
	$result["userType"] = "T";

	if(isset($_POST["email"]) && isset($_POST["password"])) {
		$login_result = $dbh->login($_POST["email"], $_POST["password"]);
		if(count($login_result)!=0) {
			$result["loginSuccess"] = true;
			$result["userType"] = $login_result[0]["type"];
			//$_SESSION["email"] = $login_result[0]["email"];
            //$_SESSION["password"] = $login_result[0]["password"];
		}
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>