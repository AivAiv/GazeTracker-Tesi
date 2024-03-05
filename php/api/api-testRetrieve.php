<?php
    require_once '../../bootstrap.php';

    $result["testsRetrieved"] = false;
    $result["userType"] = $_SESSION["userType"];

    if (isset($_SESSION["userType"]) && $_SESSION["userType"] == "T") {
        $result["tests"] = $dbh->getAllTests();
        if (!empty($result["tests"])) {
            $result["testsRetrieved"] = true;
        }
    } elseif (isset($_SESSION["email"]) && isset($_SESSION["userType"]) && $_SESSION["userType"] == "C") {
        $result["tests"] = $dbh->getCreatorTests($_SESSION["email"]);
        if (!empty($result["tests"])) {
            $result["testsRetrieved"] = true;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($result);
?>