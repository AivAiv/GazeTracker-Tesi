class PopUp {

    #domId = "";
    #domPopUp;
    #pagesHolder;
    #pagesListMod;
    #pagesListCre;

    constructor(domId, pHolder, pListM, pListC) {
      this.#domId = domId;
      this.#domPopUp = document.getElementById(this.#domId);
      this.#pagesHolder = pHolder;
      this.#pagesListMod = pListM;
      this.#pagesListCre = pListC;
    }

    openPopUp() { this.#domPopUp.style.display = "block"; }
    closePopUp() { this.#domPopUp.style.display = "none"; }

    //#region HTML genrators
    generateImagePopUp() {
        let img = `<div>AGGIUNGI PAGINA IMMAGINE</div>
        <form action="#" method="POST" name="Modify">
            <label>Nome pagina
                <input type="text" name="txtName" required autofocus/>
            </label>
            <label>Contenuto
                <input type="file" name="fleImage">
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
                <input type="url" name="urlLink" required/>
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
    //#endregion

    //#region Event listeners
    #attachImageListeners() {
        
    }

    #attachLinkListeners() {
        
    }

    #attachTextListeners() {
        let form = document.querySelector("#" + this.#domId + " form");
        form.domId = this.#domId;
        form.pHolder = this.#pagesHolder;
        form.pListM = this.#pagesListMod;
        form.pListC = this.#pagesListCre;
        form.caller = this;

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            event.currentTarget.pHolder.addPage({
                name : document.querySelector("#" + event.currentTarget.domId + " input[name=txtName]").value,
                link : null,
                image : null,
                text : document.querySelector("#" + event.currentTarget.domId + " textarea").value,
                maxTime : document.querySelector("#" + event.currentTarget.domId + " input[name=tmeMaxTimer]").value,
            });
            event.currentTarget.caller.closePopUp();
            event.currentTarget.pListM.updateTestPages();
            event.currentTarget.pListC.updateTestPages();
        });
        
    form.addEventListener("reset", function (event) { /*this.closePopUp();*/ }); //FIXME: funzioni bottoni reset
    }
    //#endregion

}