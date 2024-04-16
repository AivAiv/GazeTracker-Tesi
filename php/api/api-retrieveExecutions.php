<?php
	require_once '../../bootstrap.php';

	$result["executionsRetrieved"] = false;

	if(isset($_POST["pageId"])) {
		$tmpResult = $dbh->getAllAnonymousUsers($_POST['pageId']); //FIXME: uguale a api-getAnonymousUser
		if (!empty($tmpResult)) {$result["executionsList"] = $tmpResult;}
		$result["executionsRetrieved"] = true;
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>