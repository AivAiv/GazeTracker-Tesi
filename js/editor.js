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

function generatePages(pages) {
    let result = "";
    for(let i= 0; i < pages.length; i++){
        let page = `
        <div id="page_${pages[i]["id"]}">
            <p>${pages[i]["name"]}</p>
            <button class="btnDelete">x</button>
        </div>`;
        result += page;
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
    });
}

function createTest(testName, pages) {
    const formData = new FormData();
    formData.append('testName', testName);
    formData.append('pages', JSON.stringify(pages));
    axios.post('../api/api-create.php', formData).then(response => {
        if (response.data["creationSuccess"]) {
            console.log("[LOG] : Created test - " + testName);
            updateTestList();
        }
    });
}

function modifyTest(testId, name) {
    const formData = new FormData();
    formData.append('testId', testId);
    formData.append('name', name);
    axios.post('../api/api-edit.php', formData).then(response => {
        if (response.data["editSuccess"]) {
            console.log("[LOG] : Modified test - " + testId);
            updateTestList();
        }
    });
}

function openCreateTab() {
    document.getElementById("createTab").style.display = "block";
    document.getElementById("modifyTab").style.display = "none";
    pagesPopUp.closePopUp();
}

function openModifyTab(test) {
    currentSelectedTestId = test["id"];
    document.getElementById("createTab").style.display = "none";
    document.getElementById("modifyTab").style.display = "block";
    showTestContent(test);
    pagesPopUp.closePopUp();
}

function showTestContent(test) {
    document.querySelector("#modifyTab input[name=txtName]").value = test["name"];
    updateTestPages(test["pages"], "modifyTab");
}

function updateTestPages(pages, tabName) {
    document.querySelector("#" + tabName + " #lstPages").innerHTML = "<legend>Pagine attuali</legend>" + generatePages(pages);
    //TODO:attach event listeners()
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

let pagesHolder = new PagesHolder();
let pagesPopUp = new PopUp("popUp", pagesHolder);
let currentSelectedTestId = 0;

updateTestList();
openCreateTab();
pagesPopUp.closePopUp();

let btnOpenCreateTest = document.querySelector("#btnOpenCreate");
btnOpenCreateTest.holder = pagesHolder;
btnOpenCreateTest.addEventListener("click", function (event) {
    event.preventDefault();
    event.currentTarget.holder.resetList();
    openCreateTab();
});

let btnCreateTest = document.querySelector("#createTab form");
btnCreateTest.holder = pagesHolder;
btnCreateTest.addEventListener("submit", function (event) {
    event.preventDefault();
	let name = document.querySelector("#createTab input[name=txtName]").value;
    console.log(event.currentTarget.holder.getPages());
    createTest(name, event.currentTarget.holder.getPages());
    event.currentTarget.holder.resetList();
});

let btnModifyTest = document.querySelector("#modifyTab form");
btnModifyTest.holder = pagesHolder;
btnModifyTest.addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.querySelector("#modifyTab input[name=txtName]").value;
    event.currentTarget.holder.resetList();
    modifyTest(currentSelectedTestId, name);
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