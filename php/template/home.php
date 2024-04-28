<section class="base-container home">
    <?php if(isset($_SESSION["userType"]) && $_SESSION["userType"] == "T"): ?>
        <h1>PARTECIPA AD UN TEST!</h1>
    <?php else: ?>
        <h1>I TUOI TEST</h1>
        <button id="btnEdit">Gestisci test</button>
    <?php endif; ?>
    <section id="testContainer"></section>
</section>