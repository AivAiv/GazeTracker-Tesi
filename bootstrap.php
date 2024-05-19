<?php
    session_start();
    //define("UPLOAD_DIR", "./upload/");
    //define("DEFAULT_DIR", "");
    require_once("db/database.php");
    $dbh = new DatabaseHelper("localhost", "root", "", "gazetrackerdb", 3306);
?>