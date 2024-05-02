<section class="base-container edit">
    <section id="testsContainer">
        <section id="testsList">Non ci sono test, creane uno!</section>
        <button id="btnOpenCreate">Crea nuovo test</button>
    </section>
    <hr>
    <section id="testsEdit">
        <section id="createTab">
            <h3>CREA UN NUOVO TEST</h3>
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
                <div id="lstPages">
                    <legend>Pagine attuali</legend>
                </div>
                <section>
                    <input type="reset" name="btnDiscard" value="Scarta"/>
                    <input type="submit" name="btnCreate" value="Crea"/>
                </section>
            </form>
        </section>

        <section id="modifyTab">
            <h3>MODIFICA TEST</h3>
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
                <div id="lstPages">
                    <legend>Pagine attuali</legend>
                </div>
                <section>
                    <input type="reset" name="btnDiscard" value="Scarta le modifiche"/>
                    <input type="submit" name="btnSave" value="Salva"/>
                </section>
            </form>
        </section>
    </section>
    
    <section class="scrim">
        <section id="popUp"></section>
    </section>
</section>