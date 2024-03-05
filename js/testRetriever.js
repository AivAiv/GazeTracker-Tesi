function generateTesterTests(tests){
    let result = "";
    for(let i= 0; i < tests.length; i++){
        if (tests[i]["active"] == 1) {
            let test = `<button id="btnTest_${tests[i]["id"]}">${tests[i]["name"]}</button>`;
            result += test;
        }
    }
    return result;
}

function generateCreatorTests(tests){
    let result = "";
    for(let i= 0; i < tests.length; i++){
        let test = `<button id="btnTest_${tests[i]["id"]}">${tests[i]["name"]}</button>`;
        result += test;
    }
    return result;
}

axios.get('../api/api-testRetrieve.php').then(response => {
    console.log(response.data);
    if (response.data["testsRetrieved"] && response.data["userType"] == "T") {
        let tests = generateTesterTests(response.data["tests"]);
        const main = document.getElementById("testContainer");
        main.innerHTML = tests;
        //attachEventListener();
    } else if (response.data["testsRetrieved"] && response.data["userType"] == "C") {
        let tests = generateCreatorTests(response.data["tests"]);
        const main = document.getElementById("testContainer");
        main.innerHTML = tests;
        //attachEventListener();
    }
});