<?php
    require_once 'bootstrap.php';
    session_unset();

    $templateParams["title"] = "GazeTracker - Accesso";
    $templateParams["pageName"] = "login.php";
    $templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", 
                                    "js/utils/alert.js", 
                                    "js/login.js", 
                                    "js/lib/sha512.js");
    $templateParams["css"] = array("./css/main");

    require 'php/template/accessBase.php';
?>