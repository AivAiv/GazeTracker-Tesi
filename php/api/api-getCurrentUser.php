<?php
	require_once '../../bootstrap.php';

    $result["isUserLogged"] = false;
    if(isset($_SESSION["id"])) {
        $result["userId"] = $_SESSION["id"];
        $result["isUserLogged"] = true;
    }

	header('Content-Type: application/json');
	echo json_encode($result);
?>