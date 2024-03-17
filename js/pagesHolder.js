class PagesHolder {

    #pagesList = [];

    constructor() {}

    addPage(page) { this.#pagesList.push(page); }
    getPages() { return this.#pagesList; }
    resetList() { this.#pagesList = [] }
}