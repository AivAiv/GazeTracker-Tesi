<?php
    session_start();
    define("UPLOAD_DIR", "../../img/");
    require_once("db/database.php");
    $dbh = new DatabaseHelper("localhost", "root", "", "gazetrackerdb", 3306);
?>