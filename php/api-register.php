<?php
    require_once '../bootstrap.php';

    $result["registrationSuccess"] = false;

    if(isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["userType"])) {
        if (!$dbh->isEmailPresent($_POST["email"])) {
            $random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
            $password = hash('sha512', $_POST["password"] . $random_salt);
            $result["registrationSuccess"] = $dbh->register($_POST["email"], $password, $_POST["userType"], $random_salt);
        }
    }

    header('Content-Type: application/json');
    echo json_encode($result);
?>