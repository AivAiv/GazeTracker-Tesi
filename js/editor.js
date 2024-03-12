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

//unused
function generateModifyTab(test) {
    let result = `
    <form action="#" method="POST" name="Create">
        <label>Nome test
            <input type="text" name="txtName" required autofocus/>
        </label>
        <fieldset>
            <legend>Aggiunta pagine</legend>
            <button>Aggiungi immagine</button>
            <button>Aggiungi link</button>
            <button>Aggiungi testo</button>
        </fieldset>
        <section id="pagesList">pages List</section>
        <input type="reset" name="btnDiscard" value="Scarta"/>
        <input type="submit" name="btnCreate" value="Crea"/>
    </form>`;
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

function openModifyTab(test) {
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
            if (confirm("Stai eliminando un test, sei sicuro di voler proseguire?")) {
                deleteTest(event.currentTarget.test["id"]);
            }
        });
        testChildren[2].test = tests[i];
        testChildren[2].addEventListener("click", function (event) {
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

updateTestList();
openCreateTab();

document.querySelector("#btnOpenCreate").addEventListener("click", function (event) {
    event.preventDefault();
    openCreateTab();
});

document.querySelector("#createTab form").addEventListener("submit", function (event) {
	event.preventDefault();
    console.log("CREA!");
	let name = document.querySelector("#createTab input[name=txtName]").value;
    createTest(name);
});