<?php
    require_once 'bootstrap.php';
    session_unset();

    //Base Template
    $templateParams["title"] = "GazeTracker - Accesso";
    $templateParams["pageName"] = "login.php";
    $templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "js/login.js", "js/sha512.js");
    $templateParams["css"] = array();//"light-background", "register-login", "login");

    require 'php/template/accessBase.php';
?>