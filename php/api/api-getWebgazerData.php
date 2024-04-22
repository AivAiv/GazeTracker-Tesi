<?php
    require_once '../../bootstrap.php';

    if (isset($_POST['pageId'], $_POST['anonymUserId'])) {
        $registrazioni = $dbh->get_registrazioni_test($_POST['pageId'], $_POST['anonymUserId']);
        echo json_encode($registrazioni);
    }
?>