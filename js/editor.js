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
        console.log("Deleted test: " + testId);
        if (response.data["deletionSuccess"]) {
            console.log("Deleted test: " + testId);
        }
    });
}

function attachEventListeners(tests) {
    for (i = 0; i < tests.length; i++) {
        testChildren = document.getElementById("testEditor_" + tests[i]["id"]).children;
        testChildren[1].test = tests[i];
        testChildren[1].addEventListener("click", function (event) {
            if (confirm("Stai cancellando un test, vuoi proseguire?")) {
                deleteTest(event.currentTarget.test["id"]);
            }
        });
        testChildren[2].addEventListener("click", function (event) {
            console.log("modify");
         });
    }
}

axios.get('../api/api-testRetrieve.php').then(response => {
    if (response.data["testsRetrieved"]) {
        let tests = generateTests(response.data["tests"]);
        const main = document.getElementById("testsList");
        main.innerHTML = tests;
        attachEventListeners(response.data["tests"]);
    }
});

document.querySelector("#btnOpenCreate").addEventListener("click", function (event) {
    event.preventDefault();
});