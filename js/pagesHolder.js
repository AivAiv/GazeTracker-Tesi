class PagesHolder {

    #pagesList = [];

    constructor() {}

    addPage(page) { this.#pagesList.push(page); }
    deletePage(id) { this.#pagesList.splice(id, 1); }
    overridePages(pages) { this.#pagesList = JSON.parse(JSON.stringify(pages)); }
    getPages() { return this.#pagesList; }
    resetList() { this.#pagesList = [] }
}