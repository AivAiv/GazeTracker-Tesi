<?php
	require_once '../../bootstrap.php';

	$result["editSuccess"] = false;

	if(isset($_POST["testId"]) && isset($_POST["name"]) && isset($_POST["pages"])) {
		$result["editSuccess"] = $dbh->modifyTest($_POST["testId"], $_POST["name"]);
		//per ogni pagina POSTata
			//se non ha id -> aggiungi e togli da lista
		//chiedi al db le pagine
		//per ogni pagina in db
			//se non c'è nella lista POSTata -> cancella
	}

	if(isset($_POST["testId"]) && isset($_POST["state"])) {
		$result["editSuccess"] = $dbh->updateTestState($_POST["testId"], $_POST["state"]);
	}

	header('Content-Type: application/json');
	echo json_encode($result);
?>