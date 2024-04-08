<?php
    require_once '../../bootstrap.php';
    
    if (isset($_POST['idPage'])) {
        $users = $dbh->get_all_anonymous_users($_POST['idPage']);
        echo json_encode($users);
    }
?>