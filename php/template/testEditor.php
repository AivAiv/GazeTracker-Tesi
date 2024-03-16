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
                <legend>Aggiungi pagina</legend>
                <button class="btnAddImage">Aggiungi immagine</button>
                <button class="btnAddLink">Aggiungi link</button>
                <button class="btnAddText">Aggiungi testo</button>
            </fieldset>
            <fieldset id="lstPages">
                <legend>Pagine attuali</legend>
            </fieldset>
            <input type="reset" name="btnDiscard" value="Scarta"/>
            <input type="submit" name="btnCreate" value="Crea"/>
        </form>
    </section>

    <section id="modifyTab">
        <div>MODIFICA TEST</div>
        <form action="#" method="POST" name="Modify">
            <label>Nome test
                <input type="text" name="txtName" required autofocus/>
            </label>
            <fieldset>
                <legend>Aggiungi pagina</legend>
                <button class="btnAddImage">Aggiungi immagine</button>
                <button class="btnAddLink">Aggiungi link</button>
                <button class="btnAddText">Aggiungi testo</button>
            </fieldset>
            <fieldset id="lstPages">
                <legend>Pagine attuali</legend>
            </fieldset>
            <input type="reset" name="btnDiscard" value="Scarta le modifiche"/>
            <input type="submit" name="btnSave" value="Salva"/>
        </form>
    </section>
</section>

<section id="textPopup"></section>