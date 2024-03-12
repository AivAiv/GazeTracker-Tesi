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
            console.log("Deleted test: " + testId);
            updateTestList();
        }
    });
}

function createTest(testName) {
    const formData = new FormData();
    formData.append('testName', testName);
    axios.post('../api/api-create.php', formData).then(response => {
        if (response.data["creationSuccess"]) {
            console.log("Created test: " + testName);
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
            console.log("Modified test: " + testId);
            updateTestList();
        }
    });
}

function openModifyTab(test) {
    currentSelectedTestId = test["id"];
    document.getElementById("createTab").style.display = "none";
    document.getElementById("modifyTab").style.display = "block";
    showTestContent(test);
}

function showTestContent(test) {
    document.querySelector("#modifyTab input[name=txtName]").value = test["name"];
}

function openCreateTab() {
    document.getElementById("createTab").style.display = "block";
    document.getElementById("modifyTab").style.display = "none";
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

let currentSelectedTestId = 0;

updateTestList();
openCreateTab();

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