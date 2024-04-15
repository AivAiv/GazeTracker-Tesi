<?php
	require_once '../../bootstrap.php';

	$result["executionsRetrieved"] = false;

	if(isset($_POST["pageId"])) {
		$result["executionsList"] = array("Utente1", "Utente2", "Utente3");
		$result["executionsRetrieved"] = true;
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>