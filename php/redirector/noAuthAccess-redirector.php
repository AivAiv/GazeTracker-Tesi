<?php
    require_once '../../bootstrap.php';

    $templateParams["title"] = "GazeTracker";
    $templateParams["pageName"] = "noAuthAccess.php";
    $templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../../js/noAuthAccess.js");
    $templateParams["css"] = array("../../css/main");

    require '../template/accessBase.php';
?>