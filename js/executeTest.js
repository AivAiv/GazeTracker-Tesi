const buttonContainer = document.getElementById("allButtons");
const pageContainer = document.getElementById("testStage");
const remainingTimeCounter = document.getElementById("tmrDuration");
let test = JSON.parse(sessionStorage.getItem("test"));
//const url = new URL(window.location.href);
//const searchParams = new URLSearchParams(url.search);
//console.log(searchParams.get("id"));

let calibrationButtons = Array.from(buttonContainer.children);
calibrationButtons.splice(4,1);
let calibrationClicks = [5,5,5,5];
let currentPageIndex = 0;
let calibrationEnded = false;
let startingTimes = [];

// Simone
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
    //const formData = new FormData();
    //formData.append("id", searchParams.get("id"));
    //axios.post('../api/api-getSingleTest.php', formData).then(response => { // Send password
        //console.log(response.data);
        //if (response.data["testRetrieved"]) {
        //    test = response.data["test"];
        //}
        
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
    //});

    
});
//---


console.log(JSON.parse(sessionStorage.getItem("test")));
console.log(calibrationButtons);
console.log(calibrationClicks);

remainingTimeCounter.parentNode.style.display = "none";

calibrationButtons.forEach(btn => {
    btn.caller = btn;
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        let btnId = this.classList["value"].substr(-1);
        if (calibrationClicks[btnId-1] > 1) {
            calibrationClicks[btnId-1]--;
            //console.log(btnId + " - " + calibrationClicks[btnId-1]);
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
        pageContainer.innerHTML = `<div>In questo test non ci sono pagine!</div>`;//FIXME: gestire meglio con errore e/o bottone?
    } else if (test["pages"][currentPageIndex] != null) {
        drawPage(test["pages"][currentPageIndex]);
    } else if (currentPageIndex == test["pages"].length) {
        pageContainer.innerHTML = `<div>TEST TERMINATO!<a href="${test['questionnaire_link']}">Vai al questionario</a></div>`;
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
        //pageContainer.innerHTML = `<iframe scrolling = 'no' onload='onloadIframeEsegui(this)' frameborder = '0' src = "` + page["link"] + `"></iframe>`;
        pageContainer.innerHTML = `<iframe src = "` + page["link"] + `"></iframe>`;
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

// Simone
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

// Simone
function initWebGazer() {
    webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) { return; }
        
        var x = data.x; //these x coordinates are relative to the viewport
        var y = data.y; //these y coordinates are relative to the viewport
        eyeTrackerRect = eyeTracker.getBoundingClientRect();
        
        if(calibrationEnded && (currentPageIndex != test["pages"].length)){
            if (startingTimes[currentPageIndex] == 0) {
                startingTimes[currentPageIndex] = elapsedTime;
            }

            if (x >= eyeTrackerRect.left && x <= eyeTrackerRect.left + eyeTrackerRect.width &&
                y >= eyeTrackerRect.top && y <= eyeTrackerRect.top + eyeTrackerRect.height) {
                coords = trasformaPercentuale(x - eyeTrackerRect.left, y - eyeTrackerRect.top);
                //console.log(coords.x);
                console.log("SENDING: " + currentPageIndex);
                const formData = new FormData();
                formData.append("coord_x", coords.x);
                formData.append("coord_y", coords.y);
                formData.append("idPage", test["pages"][currentPageIndex]["id"]);
                formData.append("uuid", uuid);
                axios.post("../api/api-addCoordinate.php", formData
                ).then(response => {
                    //console.log(response.data);
                 });
            } else {
                // Il tracciamento è fuori dal quadrato, nascondi il punto di tracciamento degli occhi
                //console.log('nothing');
            }

            checkMaxTimeReached(elapsedTime);
        }
    }).begin();
    webgazer.applyKalmanFilter(webgazer.params.applyKalmanFilter);
}

// Simone
function onloadIframeEsegui(e) {
    e.style.height = e.contentWindow.document.body.scrollHeight + 'px';
    document.getElementById("preview").style.height = e.style.height;
}

// Simone
function trasformaPercentuale(x, y) {
    xPerc = (x * 100) / eyeTrackerRect.width;
    yPerc = (y * 100) / eyeTrackerRect.height;
    //console.log('x:', xPerc, 'y:', yPerc);
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
    
    //console.log(maxPageTime, elapsedTime, (elapsedTime - startingTimes[currentPageIndex]));
    if ((elapsedTime - startingTimes[currentPageIndex]) >= maxPageTime) {
        console.log("Time Reached");
        let btnForward = document.getElementById("btnForward");
        if (btnForward != null) {
            btnForward.click();
        }
    }
}