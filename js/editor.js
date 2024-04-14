function generateTests(tests) {
    let result = "";
    for(let i= 0; i < tests.length; i++){
        let test = `
        <div id="testEditor_${tests[i]["id"]}">
            <p>${tests[i]["name"]}</p>
            <button class="btnDelete">Elimina</button>
            <button class="btnModify">Modifica</button>
        </div>`;
        result += test;
    }
    return result;
}

function deleteTest(testId) {
    const formData = new FormData();
    formData.append('testId', testId);
    axios.post('../api/api-delete.php', formData).then(response => {
        if (response.data["deletionSuccess"]) {
            console.log("[LOG] : Deleted test - " + testId);
            updateTestList();
        }
        openCreateTab();
    });
}

function createTest(testName) {//TODO: Update with all the page sending
    // Create empty test
    const testData = new FormData();
    var testId;
    testData.append('testName', testName);
    axios.post('../api/api-create.php', testData).then(response => {
        if (response.data["testCreated"]) {
            testId = response.data["testId"];
            console.log(pagesHolder.getPages());
            // Fill the test with pages //TODO: Attualmente nessun controllo sul corretto upload delle pagine
            pagesHolder.getPages().forEach(page => {
                let pageData = new FormData();
                pageData.append('testId', testId);
                pageData.append('page', JSON.stringify(page));
                if (page["image"] != null) { pageData.append('imgFile', page["image"]); }
                axios.post('../api/api-create.php', pageData).then(response => {
                    //if (response.data["addedPage"]) {
                    //}
                    console.log("[LOG] : Created test - " + testName);
                    updateTestList();
                    resetCreateTab();
                });
            });
        }
    });
}

function modifyTest(testId, name) {
    const testData = new FormData();
    var testId;
    testData.append('testId', testId);
    testData.append('name', name);
    axios.post('../api/api-edit.php', testData).then(response => {  // Update test name
        if (response.data["editSuccess"]) {
            var pagesToAdd = pagesHolder.getPages().filter(p=>{return p["id"] == null});
            var pagesRemaining = pagesHolder.getPages().filter(p=>{return p["id"] != null});
            //--------
            console.log("TO ADD:");
            console.log(pagesToAdd);
            console.log("REMAINING:");
            console.log(pagesRemaining);
            //--------
            let formData = new FormData();
            formData.append('testId', testId);
            formData.append('pagesRemaining', JSON.stringify(pagesRemaining));
            axios.post('../api/api-edit.php', formData).then(response => {  // Remove deleted pages
                if (response.data["editSuccess"]) {
                    let pageData = new FormData();
                    pageData.append('testId', testId);
                    pagesToAdd.forEach(page => {  // Add new pages
                        if (page["image"] != null) {
                            pageData.append('imgsToAdd[]', page["image"]);
                            page["listId"] = pageData.getAll("imgsToAdd[]").length - 1;
                        }
                    });
                    pageData.append('pagesToAdd', JSON.stringify(pagesToAdd));
                    axios.post('../api/api-edit.php', pageData).then(response => {
                        if (response.data["addedPages"]) {
                            console.log("[LOG] : Modified test - " + testId);
                            updateTestList();
                            openCreateTab();
                        }
                    }); 
                }
            });
        }
    });
}

function openCreateTab() {
    document.getElementById("createTab").style.display = "block";
    document.getElementById("modifyTab").style.display = "none";
    resetCreateTab();
    resetModifyTab();
}

function openModifyTab(test) {
    currentSelectedTestId = test["id"];
    document.getElementById("createTab").style.display = "none";
    document.getElementById("modifyTab").style.display = "block";
    resetCreateTab();
    showTestContent(test);
}

function showTestContent(test) {
    document.querySelector("#modifyTab input[name=txtName]").value = test["name"];
    pagesHolder.overridePages(test["pages"]);
    modifyPagesList.updateTestPages();
}

function resetCreateTab() {
    document.querySelector("#createTab input[name=txtName]").value = "";
    pagesHolder.resetList();
    createPagesList.updateTestPages();
    pagesPopUp.closePopUp();
}

function resetModifyTab() {
    document.querySelector("#modifyTab input[name=txtName]").value = "";
    pagesHolder.resetList();
    modifyPagesList.updateTestPages();
    pagesPopUp.closePopUp();
}

function attachEventListeners(tests) {
    for (i = 0; i < tests.length; i++) {
        testChildren = document.getElementById("testEditor_" + tests[i]["id"]).children;
        testChildren[1].test = tests[i];
        testChildren[1].addEventListener("click", function (event) {
            event.preventDefault();
            if (confirm("Stai eliminando un test, sei sicuro di voler proseguire?")) {
                deleteTest(event.currentTarget.test["id"]);
            }
        });
        testChildren[2].test = tests[i];
        testChildren[2].addEventListener("click", function (event) {
            event.preventDefault();
            openModifyTab(event.currentTarget.test);
        });
    }
}

function updateTestList() {
    axios.get('../api/api-testRetrieve.php').then(response => {
        if (response.data["testsRetrieved"]) {
            let tests = generateTests(response.data["tests"]);
            const main = document.getElementById("testsList");
            main.innerHTML = tests;
            attachEventListeners(response.data["tests"]);
        }
    });
}

const pagesHolder = new PagesHolder();
const modifyPagesList = new PagesList("#modifyTab #lstPages", pagesHolder);
const createPagesList = new PagesList("#createTab #lstPages", pagesHolder);
const pagesPopUp = new PopUp("popUp", pagesHolder, modifyPagesList, createPagesList);

let currentSelectedTestId = 0;

updateTestList();
openCreateTab();
pagesPopUp.closePopUp();

document.querySelector("#btnOpenCreate").addEventListener("click", function (event) {
    event.preventDefault();
    openCreateTab();
});

document.querySelector("#createTab form").addEventListener("submit", function (event) {
    event.preventDefault();
	let name = document.querySelector("#createTab input[name=txtName]").value;
    createTest(name);
});

document.querySelector("#modifyTab form").addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.querySelector("#modifyTab input[name=txtName]").value;
    modifyTest(currentSelectedTestId, name);
});

document.querySelector("#createTab form").addEventListener("reset", function (event) {
	resetCreateTab();
});

document.querySelector("#modifyTab form").addEventListener("reset", function (event) {
    openCreateTab();
});

//#region Link, images and text buttons action listeners
// Image pages
document.querySelector("#createTab .btnAddImage").addEventListener("click", function (event) {
	event.preventDefault();
    pagesPopUp.generateImagePopUp();
});

document.querySelector("#modifyTab .btnAddImage").addEventListener("click", function (event) {
	event.preventDefault();
    pagesPopUp.generateImagePopUp();
});

// link pages
document.querySelector("#createTab .btnAddLink").addEventListener("click", function (event) {
	event.preventDefault();
    pagesPopUp.generateLinkPopUp();
});

document.querySelector("#modifyTab .btnAddLink").addEventListener("click", function (event) {
	event.preventDefault();
    pagesPopUp.generateLinkPopUp();
});

// text Pages
document.querySelector("#createTab .btnAddText").addEventListener("click", function (event) {
	event.preventDefault();
    pagesPopUp.generateTextPopUp();
});

document.querySelector("#modifyTab .btnAddText").addEventListener("click", function (event) {
	event.preventDefault();
    pagesPopUp.generateTextPopUp();
});
//#endregion