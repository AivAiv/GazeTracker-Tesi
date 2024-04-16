/*const buttonContainer = document.getElementById("calibrationPage");
const pageContainer = document.getElementById("testStage");
const test = JSON.parse(sessionStorage.getItem("test"));

let calibrationButtons = Array.from(buttonContainer.children);
calibrationButtons.splice(4,1);
let calibrationClicks = [5,5,5,5];
let currentPageIndex = 0;
let calibrationEnded = false;


// Simone
var xPerc;
var yPerc;
var eyeTracker = document.getElementById('testStage');
var eyeTrackerRect = eyeTracker.getBoundingClientRect();
var uuid;
var webgazer;

var calibrazioneFinita= false;

document.addEventListener('DOMContentLoaded', function () {
    console.log("CARICAMENTO utente");
    generateUUID();
    console.log(uuid);
    if(test["pages"]){
        console.log("inizio webgazer");
        initWebGazer();
    }else{
        console.log("pagine non caricate");
    }
    
});
//---


console.log(JSON.parse(sessionStorage.getItem("test")));
console.log(calibrationButtons);
console.log(calibrationClicks);

document.getElementById("tmrDuration").parentNode.style.display = "none";

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
            if (isCalibrationEnded()) {
                loadCurrentPage();
                calibrationEnded = true;
            }
        }
        btn.innerHTML = calibrationClicks[btnId-1];
    });
});

setForwardButton();

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
        pageContainer.innerHTML = `<div>QUESTIONARIO!</div>`;//TODO: inserire pagina questionario
        document.getElementById("tmrDuration").parentNode.style.display = "none";
    }
    webgazer.resume();
}

function drawPage(page) {
    console.log(document.getElementById("btnForward"));
    if (page["image"] != null) {
        pageContainer.innerHTML = `<img src="../../img/` + test["pages"][currentPageIndex]["image"] + `"/>`;
    } else if (page["link"] != null) {
        pageContainer.innerHTML = `<iframe scrolling = 'no' onload='onloadIframeEsegui(this)' frameborder = '0' src = "` + test["pages"][currentPageIndex]["link"] + `"></iframe>`;
    } else {
        pageContainer.innerHTML = `<div>` + page["text"] + `</div>`;
    }
    document.getElementById("tmrDuration").innerHTML = page["max_time"];
    document.getElementById("tmrDuration").parentNode.style.display = "inline-block";
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
        if (data == null) {
            return;
        }
        var x = data.x; //these x coordinates are relative to the viewport
        var y = data.y; //these y coordinates are relative to the viewport

        eyeTrackerRect = eyeTracker.getBoundingClientRect();

        if(calibrationEnded && (currentPageIndex != test["pages"].length)){
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
}*/

const pages = JSON.parse(sessionStorage.getItem("pages"));
let currentPageIndex = 0;
setForwardButton();
setBackwardButton();

function setForwardButton() {
    let btnForward = document.getElementById("btnForward");
    if (btnForward != null) {
        btnForward.addEventListener("click", nextPage);
    }
}

function setBackwardButton() {
    let btnBackward = document.getElementById("btnBackward");
    if (btnBackward != null) {
        btnBackward.addEventListener("click", PreviousPage);
    }
}

function nextPage() {
    if (currentPageIndex == (pages.length - 1)) {
        currentPageIndex = (pages.length - 1);
    } else {
        currentPageIndex ++;
    }
    console.log(currentPageIndex);
    //loadCurrentPage();
}

function PreviousPage() { 
    if (currentPageIndex <= 0) {
        currentPageIndex = 0;
    } else {
        currentPageIndex --;
    }
    console.log(currentPageIndex);
    //loadCurrentPage();
}