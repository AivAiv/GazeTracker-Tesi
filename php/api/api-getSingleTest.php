<?php
    require_once '../../bootstrap.php';

    $result["testRetrieved"] = false;

    if (isset($_POST["id"])) {
        $result["test"] = $dbh->getTest($_POST["id"])[0];
        if (!empty($result["test"])) {
            $result["testRetrieved"] = true;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($result);
?>