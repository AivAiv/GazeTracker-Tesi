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
            </div>`; // different
            result += page;
        }
        return result;
    }

    #attachPageListeners() {
        for (let i = 0; i < this.#pagesHolder.getPages().length; i++) {
            document.querySelector(this.#domId + " #page_" + i + " .btnDelete").addEventListener("click",  function (event) {
                event.preventDefault();
                if (confirm("Stai eliminando una, sei sicuro?")) {
                    console.log("----");
                    //console.log(this.#pagesHolder.getPages());
                    console.log("eliminata pagina " + i);
                    //console.log(this.#pagesHolder.getPages());
                    console.log("----");
                }
            });
        }
    }
}