<section>
    <section id="testsList">Non ci sono test, creane uno!</section>
    <button id="btnOpenCreate">Crea nuovo test</button>
</section>
<br>
<hr>
<br>
<section id="testsEdit">
    <section id="createTab">
        <div>CREA UN NUOVO TEST</div>
        <form action="#" method="POST" name="Create">
            <label>Nome test
                <input type="text" name="txtName" required autofocus/>
            </label>
            <fieldset>
                <legend>Aggiunta pagine</legend>
                <button>Aggiungi immagine</button>
                <button>Aggiungi link</button>
                <button>Aggiungi testo</button>
            </fieldset>
            <section id="pagesList">pages List</section>
            <input type="reset" name="btnDiscard" value="Scarta"/>
            <input type="submit" name="btnCreate" value="Crea"/>
        </form>
    </section>

    <section id="modifyTab">
    <div>MODIFICA TEST</div>
    </section>
</section>