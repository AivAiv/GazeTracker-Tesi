class PagesList {

    #domId = ""; // ID of the DOM container
    #domList; // Container in DOM
    #pagesHolder; // Pages

    constructor(domId, pHolder) {
      this.#domId = domId;
      this.#domList = document.querySelector(this.#domId);
      this.#pagesHolder = pHolder;
    }

    // Generates the page cards in editor
    updateTestPages() {
        this.#domList.innerHTML = this.#generatePages();
        this.#attachPageListeners();
    }

    #generatePages() {
        let result = "";
        for (let i= 0; i < this.#pagesHolder.getPages().length; i++) {
            let page = `
            <div id="page_${i}">
                <p>${this.#pagesHolder.getPages()[i]["name"]}</p>
                <button class="btnDelete">x</button>
            </div>`;
            result += page;
        }
        return result;
    }

    #attachPageListeners() {
        for (let i = 0; i < this.#pagesHolder.getPages().length; i++) {
            let btnDel = document.querySelector(this.#domId + " #page_" + i + " .btnDelete");
            btnDel.pHolder = this.#pagesHolder;
            btnDel.caller = this;
            btnDel.addEventListener("click",  async function (event) {
                event.preventDefault();
                let pagesHolder = event.currentTarget.pHolder;
                let caller = event.currentTarget.caller;
                const userConfirmed = await askConfirmation("Stai eliminando una pagina, sei sicuro?");
                if (userConfirmed) {
                    pagesHolder.deletePage(i);
                    console.log("[LOG] : deleted page - " + i);
                    caller.updateTestPages();
                }
            });
        }
    }
}