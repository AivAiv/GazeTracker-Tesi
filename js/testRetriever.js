function generateTesterTests(tests) {
    let result = "";
    for (let i= 0; i < tests.length; i++) {
        if (tests[i]["active"] == 1) {
            let test = `<button id="testHome_${tests[i]["id"]}">${tests[i]["name"]}</button>`;
            result += test;
        }
    }
    return result;
}

function generateCreatorTests(tests) {
    let result = "";
    for (let i= 0; i < tests.length; i++) {
        let test = `
        <div id="testHome_${tests[i]["id"]}">
            <p>${tests[i]["name"]}</p>
            <button class="btnStatus">`;
            if (tests[i]["active"] == 1) {
                test += `Attivo`;
            } else {
                test += `Non attivo`;
            }
            test += `</button>
            <button class="btnResults">Guarda risultati</button>
        </div>`;
        result += test;
    }
    return result;
}

function updateState(testId, state) {
    const formData = new FormData();
    formData.append('testId', testId);
    formData.append('state', state);
    axios.post('../api/api-edit.php', formData).then(response => {
        if (response.data["editSuccess"]) {
            console.log("[LOG] : Changed state of test - " + testId);
            populateHome();
        }
    });
}

function attachCreatorEventListeners(tests) {
    for (let i = 0; i < tests.length; i++) {
        testChildren = document.getElementById("testHome_" + tests[i]["id"]).children;
        testChildren[1].test = tests[i];
        testChildren[1].addEventListener("click", function (event) {
            event.preventDefault();
            if (event.currentTarget.test["active"] == 1) {
                updateState(event.currentTarget.test["id"], 0);
            } else {
                updateState(event.currentTarget.test["id"], 1);
            }
        });
        testChildren[2].test = tests[i];
        testChildren[2].addEventListener("click", function (event) {
            event.preventDefault();
            console.log("Change page to results of test: " + event.currentTarget.test["id"]);//TODO: change to new page
        });
    }
}

function populateHome() {
    axios.get('../api/api-testRetrieve.php').then(response => {
        console.log(response.data);
        if (response.data["testsRetrieved"] && response.data["userType"] == "T") {
            let tests = generateTesterTests(response.data["tests"]);
            const main = document.getElementById("testContainer");
            main.innerHTML = tests;
            //TODO:attachEventListener();
        } else if (response.data["testsRetrieved"] && response.data["userType"] == "C") {
            let tests = generateCreatorTests(response.data["tests"]);
            const main = document.getElementById("testContainer");
            main.innerHTML = tests;
            attachCreatorEventListeners(response.data["tests"]);
        }
    });
}

populateHome();

if (document.querySelector("#btnEdit") != null) {
    document.querySelector("#btnEdit").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = './testEditor-redirector.php';
    });
}