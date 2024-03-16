class PopUp {

    #domId;
    #domPopUp;

    constructor(domId) {
      this.#domId = domId;
      this.#domPopUp = document.getElementById(this.#domId);
    }

    openPopUp() { this.#domPopUp.style.display = "block"; }
    closePopUp() { this.#domPopUp.style.display = "none"; }

    generateImagePopUp() {
        let img = `<div>AGGIUNGI PAGINA IMMAGINE</div>
        <form action="#" method="POST" name="Modify">
            <label>Nome pagina
                <input type="text" name="txtName" required autofocus/>
            </label>
            <label>Contenuto
                <input type="text" name="txtText" required autofocus/>
            </label>
            <label>Tempo di visualizzazione massimo
                <input type="time" name="tmeMaxTimer" min="00:01" max="01:30" value="00:10" step="30">
            </label>
            <input type="reset" name="btnDiscard" value="Scarta"/>
            <input type="submit" name="btnAdd" value="Aggiungi"/>
        </form>`;
        this.#domPopUp.innerHTML = img;
        this.#attachImageListeners();
        this.openPopUp();
    }

    generateLinkPopUp() {
        let link = `<div>AGGIUNGI PAGINA WEB</div>
        <form action="#" method="POST" name="Modify">
            <label>Nome pagina
                <input type="text" name="txtName" required autofocus/>
            </label>
            <label>Contenuto
                <input type="text" name="txtText" required autofocus/>
            </label>
            <label>Tempo di visualizzazione massimo
                <input type="time" name="tmeMaxTimer" min="00:01" max="01:30" value="00:10" step="30">
            </label>
            <input type="reset" name="btnDiscard" value="Scarta"/>
            <input type="submit" name="btnAdd" value="Aggiungi"/>
        </form>`;
        this.#domPopUp.innerHTML = link;
        this.#attachLinkListeners();
        this.openPopUp();
    }

    generateTextPopUp() {
        let text = `<div>AGGIUNGI PAGINA DI TESTO</div>
        <form action="#" method="POST" name="Modify">
            <label>Nome pagina
                <input type="text" name="txtName" required autofocus/>
            </label>
            <label>Contenuto
                <textarea name="txtText" rows="4" cols="50"></textarea>
            </label>
            <label>Tempo di visualizzazione massimo
                <input type="time" name="tmeMaxTimer" min="00:01" max="01:30" value="00:10" step="30">
            </label>
            <input type="reset" name="btnDiscard" value="Scarta"/>
            <input type="submit" name="btnAdd" value="Aggiungi"/>
        </form>`;
        this.#domPopUp.innerHTML = text;
        this.#attachTextListeners();
        this.openPopUp();
    }

    #attachImageListeners() {
        
    }

    #attachLinkListeners() {
        
    }

    #attachTextListeners() {
        
    }

    populatePopUp() {

    }

}