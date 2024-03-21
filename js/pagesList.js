class PagesList {

    #domId = ""; // ID of the DOM container
    #domList; // Container in DOM
    #pagesHolder; // Pages

    constructor(domId, pHolder) {
      this.#domId = domId;
      this.#domList = document.querySelector(this.#domId);
      this.#pagesHolder = pHolder;
    }

    updateTestPages() {
        this.#domList.innerHTML = this.#generatePages();
        this.#attachPageListeners();
    }

    #generatePages() {
        let result = "<legend>Pagine attuali</legend>";
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
            btnDel.addEventListener("click",  function (event) {
                event.preventDefault();
                if (confirm("Stai eliminando una, sei sicuro?")) {
                    event.currentTarget.pHolder.deletePage(i);
                    console.log("[LOG] : deleted page - " + i);
                    event.currentTarget.caller.updateTestPages();
                }
            });
        }
    }
}