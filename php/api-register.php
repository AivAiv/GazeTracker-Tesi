<?php
    require_once '../bootstrap.php';

    $result["registrationSuccess"] = false;

    if(isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["userType"])) {
        $result["registrationSuccess"] = $dbh->register($_POST["email"], $_POST["password"], $_POST["userType"]);
    }

    header('Content-Type: application/json');
    echo json_encode($result);
?>