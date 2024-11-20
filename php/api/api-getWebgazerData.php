<?php
    require_once '../../bootstrap.php';

    if (isset($_POST['pageId'], $_POST['anonymUserId'])) {
        $registrazioni = $dbh->getCollectedData($_POST['pageId'], $_POST['anonymUserId']);
        echo json_encode($registrazioni);
    }
?>