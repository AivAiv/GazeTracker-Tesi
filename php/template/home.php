<?php if(isset($_SESSION["userType"]) && $_SESSION["userType"] == "T"): ?>
    <section class="base-container homeTester">
        <h1>PARTECIPA AD UN TEST!</h1>
        <section id="testContainer"></section>
    </section>
<?php else: ?>
    <section class="base-container homeCreator">
        <section class="firstLine">
            <h1>I TUOI TEST</h1>
            <button id="btnEdit">Gestisci test</button>
        </section>
        <section id="testContainer"></section>
    </section>
<?php endif; ?>