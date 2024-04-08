<?php
    require_once '../../bootstrap.php';
    
    if (isset($_POST['idPage'])) {
        $users = $dbh->getAllAnonymousUsers($_POST['idPage']);
        echo json_encode($users);
    }
?>