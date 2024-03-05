<?php if(isset($_SESSION["userType"]) && $_SESSION["userType"] == "T"): ?>
    <div>PARTECIPA AD UN TEST!</div>
<?php else: ?>
    <div>I TUOI TEST</div>
    <button>Gestisci test</button>
<?php endif; ?>
<section id="testContainer">
    yay
</section>