class PopUp {

    #domId = "";
    #domPopUp;
    #pagesHolder;

    constructor(domId, pHolder) {
      this.#domId = domId;
      this.#domPopUp = document.getElementById(this.#domId);
      this.#pagesHolder = pHolder;
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
                <input type="text" name="txtText" required/>
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
            event.currentTarget.caller.updateTestPages(event.currentTarget.pHolder.getPages(), "createTab");
        });
        
        form.addEventListener("reset", function (event) { this.closePopUp(); });
    }
    //#endregion

    populatePopUp() {

    }

    //FIXME: duplicate kinda
    generatePages(pages) {
        let result = "";
        for(let i= 0; i < pages.length; i++){
            let page = `
            <div id="unsavedPage_${i}">
                <p>${pages[i]["name"]}</p>
                <button class="btnDelete">x</button>
            </div>`; // different
            result += page;
        }
        return result;
    }

    //FIXME: duplicate
    updateTestPages(pages, tabName) {
        document.querySelector("#" + tabName + " #lstPages").innerHTML = "<legend>Pagine attuali</legend>" + generatePages(pages);
        //TODO:attach event listeners()
    }

}