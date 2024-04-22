const pagesContainer = document.getElementById("pagesList");
const executionsContainer = document.getElementById("executionsList");
const test = JSON.parse(sessionStorage.getItem("test"));

let currentPage;

document.getElementById("testTitle").innerHTML = test["name"];
loadPages();

function loadPages() {
    let pages = "";
    for (let i= 0; i < test["pages"].length; i++) {
        let page = `<button id="btnPage_${i}">${test["pages"][i]["name"]}</button>`;
        pages += page;
    }
    pagesContainer.innerHTML = pages;
    for (let i = 0; i < test["pages"].length; i++) {
        let btnPage = document.getElementById("btnPage_" + i);
        btnPage.page = test["pages"][i];
        btnPage.addEventListener("click",  function (event) {
            event.preventDefault();
            currentPage = event.currentTarget.page;
            loadExecutions(event.currentTarget.page);
        });
    }
}

function loadExecutions(page) {
    console.log(page);
    const formData = new FormData();
    formData.append('pageId', page["id"]);
    axios.post('../api/api-retrieveExecutions.php', formData).then(response => {
		if(response.data["executionsRetrieved"] && response.data["executionsList"]) {
            drawExecutions(response.data["executionsList"].map(exec => {return exec["anonym_user_index"]}));
		} else {
            executionsContainer.innerHTML = "No executions done yet.";
        }
    });
}

function drawExecutions(executionsList) {
    let executions = "";
    for (let i= 0; i < executionsList.length; i++) {
        let exec = `<button id="btnExec_${i}">${executionsList[i]}</button>`;
        executions += exec;
    }
    executionsContainer.innerHTML = executions;
    for (let i = 0; i < executionsList.length; i++) {
        let btnExec = document.getElementById("btnExec_" + i);
        btnExec.execs = executionsList;
        btnExec.execIndex = i;
        btnExec.addEventListener("click",  function (event) {
            event.preventDefault();
            console.log(event.currentTarget.execs);
            sessionStorage.clear();
            sessionStorage.setItem("executions", JSON.stringify(event.currentTarget.execs));
            sessionStorage.setItem("page", JSON.stringify(currentPage));
            sessionStorage.setItem("currentExecIndex", event.currentTarget.execIndex);
            window.location.href = './reviewPage-redirector.php';
        });
    }
}