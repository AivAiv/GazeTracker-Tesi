function generateTests(tests) {
    let result = "";
    for(let i= 0; i < tests.length; i++){
        let test = `
        <div id="testEditor_${tests[i]["id"]}">
            <p>${tests[i]["name"]}</p>
            <section>
                <button class="btnDelete">Elimina</button>
                <button class="btnModify">Modifica</button>
            </section>
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

function createTest(testInfo) {
    // Create empty test
    const testData = new FormData();
    var testId;
    testData.append('testName', testInfo.name);
    testData.append('testquestionnaire', testInfo.questionnaireLink);
    testData.append('testPassword', testInfo.password);
    testData.append('anonymUser', testInfo.anonymUser);
    axios.post('../api/api-create.php', testData).then(response => {
        console.log(response.data);
        if (response.data["testCreated"]) {
            testId = response.data["testId"];
            console.log(pagesHolder.getPages());
            // Fill the test with pages
            pagesHolder.getPages().forEach(page => {
                let pageData = new FormData();
                pageData.append('testId', testId);
                pageData.append('page', JSON.stringify(page));
                if (page["image"] != null) { pageData.append('imgFile', page["image"]); }
                axios.post('../api/api-create.php', pageData).then(response => {
                    console.log("[LOG] : Created test - " + testInfo.name);
                });
            });
            updateTestList();
            resetCreateTab();
        }
    });
}

function modifyTest(testId, testInfo) {
    const testData = new FormData();
    testData.append('testId', testId);
    testData.append('name', testInfo.name);
    testData.append('testQuestionnaire', testInfo.questionnaireLink);
    testData.append('testPassword', testInfo.password);
    testData.append('anonymUser', testInfo.anonymUser);
    axios.post('../api/api-edit.php', testData).then(response => {  // Update test informations
        console.log(response.data);
        if (response.data["editSuccess"]) {
            var pagesToAdd = pagesHolder.getPages().filter(p=>{return p["id"] == null});
            var pagesRemaining = pagesHolder.getPages().filter(p=>{return p["id"] != null});
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
    document.getElementById("createTab").style.display = "flex";
    document.getElementById("modifyTab").style.display = "none";
    resetCreateTab();
    resetModifyTab();
}

function openModifyTab(test) {
    currentSelectedTestId = test["id"];
    document.getElementById("createTab").style.display = "none";
    document.getElementById("modifyTab").style.display = "flex";
    resetCreateTab();
    showTestContent(test);
}

function showTestContent(test) {
    document.querySelector("#modifyTab input[name=txtName]").value = test["name"];
    document.querySelector("#modifyTab input[name=txtQuestionnaire]").value = test["questionnaire_link"];
    document.querySelector("#modifyTab input[name=txtTestPassword]").value = test["password"];
    document.querySelector("#modifyTab input[name=chkAnonymResults]").checked = test["anonym_user"];
    pagesHolder.overridePages(test["pages"]);
    modifyPagesList.updateTestPages();
}

function resetCreateTab() {
    document.querySelector("#createTab input[name=txtName]").value = "";
    document.querySelector("#createTab input[name=txtQuestionnaire]").value = "";
    document.querySelector("#createTab input[name=txtTestPassword]").value = "";
    document.querySelector("#createTab input[name=chkAnonymResults]").checked = false;
    pagesHolder.resetList();
    createPagesList.updateTestPages();
    pagesPopUp.closePopUp();
}

function resetModifyTab() {
    document.querySelector("#modifyTab input[name=txtName]").value = "";
    document.querySelector("#modifyTab input[name=txtQuestionnaire]").value = "";
    document.querySelector("#modifyTab input[name=txtTestPassword]").value = "";
    document.querySelector("#modifyTab input[name=chkAnonymResults]").checked = false;
    pagesHolder.resetList();
    modifyPagesList.updateTestPages();
    pagesPopUp.closePopUp();
}

function attachEventListeners(tests) {
    for (i = 0; i < tests.length; i++) {
        testChildren = document.getElementById("testEditor_" + tests[i]["id"]).children;
        testChildren[1].children[0].test = tests[i];
        testChildren[1].children[0].addEventListener("click", async function (event) {
            event.preventDefault();
            let testId = event.currentTarget.test["id"];
            const userConfirmed = await askConfirmation("Stai eliminando un test, sei sicuro di voler proseguire?");
            if (userConfirmed) {
                deleteTest(testId);
            }
        });
        testChildren[1].children[1].test = tests[i];
        testChildren[1].children[1].addEventListener("click", function (event) {
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
    let testInfo = {
        name : document.querySelector("#createTab input[name=txtName]").value,
        questionnaireLink : document.querySelector("#createTab input[name=txtQuestionnaire]").value,
        password : document.querySelector("#createTab input[name=txtTestPassword]").value,
        anonymUser : document.querySelector("#createTab input[name=chkAnonymResults]").checked
    };
    console.log(testInfo);
    createTest(testInfo);
});

document.querySelector("#modifyTab form").addEventListener("submit", function (event) {
    event.preventDefault();
    let testInfo = {
        name : document.querySelector("#modifyTab input[name=txtName]").value,
        questionnaireLink : document.querySelector("#modifyTab input[name=txtQuestionnaire]").value,
        password : document.querySelector("#modifyTab input[name=txtTestPassword]").value,
        anonymUser : document.querySelector("#modifyTab input[name=chkAnonymResults]").checked
    };
    modifyTest(currentSelectedTestId, testInfo);
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