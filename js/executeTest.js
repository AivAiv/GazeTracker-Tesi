const buttonContainer = document.getElementById("allButtons");
const pageContainer = document.getElementById("testStage");
const remainingTimeCounter = document.getElementById("tmrDuration");
let test = JSON.parse(sessionStorage.getItem("test"));
let calibrationButtons = Array.from(buttonContainer.children);
calibrationButtons.splice(4,1);
let calibrationClicks = [5,5,5,5];
let currentPageIndex = 0;
let calibrationEnded = false;
let startingTimes = [];
var xPerc;
var yPerc;
var eyeTracker = document.getElementById('testStage');
var eyeTrackerRect = eyeTracker.getBoundingClientRect();
var uuid;
var webgazer;
var calibrazioneFinita= false;

if (test == null) {
    window.location.href = './home-redirector.php';
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("CARICAMENTO utente");
    generateUUID();
    console.log(test["anonym_user"]);
    if (test["anonym_user"] !== 1) {
        axios.get("../api/api-getCurrentUser.php").then(response => {
            console.log(response.data);
            if (response.data["isUserLogged"]) {
                uuid = uuid.concat(":", response.data["userId"].toString());
            } else {
                uuid = uuid.concat(":", sessionStorage.getItem("nickname"));
            }
            });
    }
    console.log(uuid);
    if (!!test["pages"]) {
        for(let page in test["pages"]) { startingTimes.push(0); }
        console.log("inizio webgazer");
        initWebGazer();
    } else {
        console.log("pagine non caricate");
        window.location.href = './home-redirector.php';
    }
});

remainingTimeCounter.parentNode.style.display = "none";

calibrationButtons.forEach(btn => {
    btn.caller = btn;
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        let btnId = this.classList["value"].substr(-1);
        if (calibrationClicks[btnId-1] > 1) {
            calibrationClicks[btnId-1]--;
        } else {
            calibrationClicks[btnId-1] = "✓";
            btn.style.background = "#009900";
            if (isCalibrationEnded()) {
                setForwardButton();
                loadCurrentPage();
                calibrationEnded = true;
            }
        }
        btn.innerHTML = calibrationClicks[btnId-1];
    });
});

function isCalibrationEnded() { return calibrationClicks.every(btn => btn == "✓"); }

function loadCurrentPage() {
    console.log("carico la pagina");
    console.log(test["pages"]);
    webgazer.pause();
    if (test["pages"].length === 0) {
        pageContainer.innerHTML = `<div id="final-page">In questo test non ci sono pagine!
                                        <button id="final-home">Torna alla home</button>
                                    </div>`;
        attachFinalPageListeners();
    } else if (test["pages"][currentPageIndex] != null) {
        drawPage(test["pages"][currentPageIndex]);
    } else if (currentPageIndex == test["pages"].length) {
        pageContainer.innerHTML = getQuestionnaireForm();
        attachFinalPageListeners();
        document.getElementById("tmrDuration").parentNode.style.display = "none";
    }
}

function drawPage(page) {
    console.log(document.getElementById("btnForward"));
    if (page["image"] != null) {
        remainingTimeCounter.parentNode.style.display = "flex";
        pageContainer.innerHTML = `<img src="../../img/` + page["image"] + `"/>`;
        webgazer.resume();
    } else if (page["link"] != null) {
        remainingTimeCounter.parentNode.style.display = "flex";
        pageContainer.innerHTML = `<iframe scrolling='no' src = "` + page["link"] + `"></iframe>`;
        webgazer.resume();
    } else {
        remainingTimeCounter.parentNode.style.display = "none";
        pageContainer.innerHTML = `<div>` + page["text"] + `</div>`;
    }
}

function setForwardButton() {
    let btnForward = document.getElementById("btnForward");
    if (btnForward != null) {
        btnForward.addEventListener("click", nextPage);
    }
}

function nextPage() {
    if (currentPageIndex == test["pages"].length) {
        currentPageIndex = test["pages"].length;
    } else {
        currentPageIndex ++;
    }
    console.log(currentPageIndex);
    loadCurrentPage();
}

function generateUUID() {
    
    uuid = 'xxxxxxxx-xxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    
    const formData = new FormData();
    formData.append("idPage", test["pages"][currentPageIndex]["id"]);
    axios.post("../api/api-getAnonymousUser.php", formData
    ).then(response => {
        do {
            uuid = 'xxxxxxxx-xxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        while (response.data.some(item => item.IndexUtenteAnonimo === uuid));
    });
    
}

function initWebGazer() {
    webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) { return; }
        
        var x = data.x; // x coordinates relative to the viewport
        var y = data.y; // y coordinates relative to the viewport
        eyeTrackerRect = eyeTracker.getBoundingClientRect();
        
        if(calibrationEnded && (currentPageIndex != test["pages"].length)){
            if (startingTimes[currentPageIndex] == 0) {
                startingTimes[currentPageIndex] = elapsedTime;
            }

            if (x >= eyeTrackerRect.left && x <= eyeTrackerRect.left + eyeTrackerRect.width &&
                y >= eyeTrackerRect.top && y <= eyeTrackerRect.top + eyeTrackerRect.height) {
                coords = trasformaPercentuale(x - eyeTrackerRect.left, y - eyeTrackerRect.top);
                console.log("SENDING: " + currentPageIndex);
                const formData = new FormData();
                formData.append("coord_x", coords.x);
                formData.append("coord_y", coords.y);
                formData.append("idPage", test["pages"][currentPageIndex]["id"]);
                formData.append("uuid", uuid);
                axios.post("../api/api-addCoordinate.php", formData);
            }

            checkMaxTimeReached(elapsedTime);
        }
    }).begin();
    webgazer.applyKalmanFilter(webgazer.params.applyKalmanFilter);
}

function onloadIframeEsegui(e) {
    e.style.height = e.contentWindow.document.body.scrollHeight + 'px';
    document.getElementById("preview").style.height = e.style.height;
}

function trasformaPercentuale(x, y) {
    xPerc = (x * 100) / eyeTrackerRect.width;
    yPerc = (y * 100) / eyeTrackerRect.height;
    return { x: xPerc, y: yPerc };
}

function checkMaxTimeReached(elapsedTime) {
    const toMilliseconds = (hrs,min,sec) => ((hrs*60*60)+(min*60)+sec)*1000;
    const toSeconds = (millis) => (millis/1000);
    let maxPageTime = test["pages"][currentPageIndex].max_time;
    let timeParts = maxPageTime.split(":");
    maxPageTime = toMilliseconds(Number(timeParts[0]), Number(timeParts[1]), Number(timeParts[2]));

    remaining = toSeconds(maxPageTime -(elapsedTime - startingTimes[currentPageIndex]))
    hours = Math.floor(remaining / 3600);
    remaining %= 3600;
    minutes = Math.floor(remaining / 60);
    seconds = Math.floor(remaining % 60);
    remainingTimeCounter.innerHTML = hours + ":" + minutes + ":" + seconds;
    
    if ((elapsedTime - startingTimes[currentPageIndex]) >= maxPageTime) {
        console.log("Time Reached");
        let btnForward = document.getElementById("btnForward");
        if (btnForward != null) {
            btnForward.click();
        }
    }
}

function getQuestionnaireForm() {
    if (test['questionnaire_link'] && test['questionnaire_link'] != "") {
        return `<div id="final-page">TEST TERMINATO!
                    <a id="final-questionnaire" href="${test['questionnaire_link']}">Vai al questionario</a>
                    <button id="final-home">Torna alla home</button>
                </div>`;
    } else {
        return `<div id="final-page">TEST TERMINATO!
                    <button id="final-home">Torna alla home</button>
                </div>`;
    }
}

function attachFinalPageListeners() {
    document.querySelector("#final-page button").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.replace('./home-redirector.php');
    });
}