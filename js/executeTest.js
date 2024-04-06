const buttonContainer = document.getElementById("calibrationPage");
const pageContainer = document.getElementById("testStage");
const test = JSON.parse(sessionStorage.getItem("test"));

let calibrationButtons = Array.from(buttonContainer.children);
calibrationButtons.splice(4,1);
let calibrationClicks = [5,5,5,5];
let currentPageIndex = 0;
let calibrationEnded = false;


//---
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
    //document.getElementById("div_console").disabled = false;
    webgazer.pause();
    if (test["pages"].length === 0) {
        pageContainer.innerHTML = `<div>In questo test non ci sono pagine!</div>`;//FIXME: gestire meglio con errore e/o bottone?
    } else if (test["pages"][currentPageIndex] != null) {
        drawPage(test["pages"][currentPageIndex]);
    } else if (currentPageIndex == test["pages"].length) {
        pageContainer.innerHTML = `<div>QUESTIONARIO!</div>`;//TODO: inserire pagina questionario
    }
    webgazer.resume();
}

function drawPage(page) {
    console.log(document.getElementById("btnForward"));
    if (page["image"] != null) {
        pageContainer.innerHTML = `<div> immagine </div>`;//`<img src="#"/>`;
    } else if (page["link"] != null) {
        pageContainer.innerHTML = `<div> link </div>`;//`<iframe scrolling = 'no' onload='onloadIframeEsegui(this)' frameborder = '0' src = " + pagine[indexPag].link + "></iframe>`;
    } else {
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

// ---------------• ↓↓ SIMONE ↓↓ •---------------

/*var xPerc;
var yPerc;
var eyeTracker = document.getElementById('testStage');
var eyeTrackerRect = eyeTracker.getBoundingClientRect();
var uuid;
let webgazer;

var calibrazioneFinita= false;*/
/*
function calibrazione(e){
    let val = + e.innerHTML;
    if(val <= 1){
        e.classList.remove("btn-secondary");
        e.classList.add("btn-success");
        e.innerHTML = "";
        checkConf();
    }else{
        val = val-1;
        e.innerHTML = val;
    }
}

function checkConf(){
    var bottoni = document.querySelectorAll(".btnConf");
    ok = true;
    bottoni.forEach(function(btn) {
        if(btn.classList.contains("btn-secondary")){
            ok = false;
        }
    });
    if(ok){
        console.log("carico la pagina");
        document.getElementById("div_console").disabled = false;
        webgazer.pause();
        if (pagine[indexPag].Photo != null) {
            document.getElementById("preview").innerHTML = "<img class= 'mx-auto d-block responsive col-12' src=../../img/" + pagine[indexPag].Photo + ">";
        } else {
            document.getElementById("preview").innerHTML = "<iframe class= 'mx-auto d-block responsive col-12' scrolling = 'no' onload='onloadIframeEsegui(this)' frameborder = '0' src = " + pagine[indexPag].link + "></iframe>";
        }
        webgazer.resume();
        calibrazioneFinita= true;
    }
}

*/


function generateUUID() {

    uuid = 'xxxxxxxx-xxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    /*const formData = new FormData();
    formData.append("idPage", pagine[indexPag].ID);
    axios.post("../api/api_get_anonymous_user.php", formData
    ).then(response => {
        do {
            uuid = 'xxxxxxxx-xxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        while (response.data.some(item => item.IndexUtenteAnonimo === uuid));
    });*/

}


/*document.addEventListener('DOMContentLoaded', function () {
    console.log("CARICAMENTO utente");
    generateUUID();
    console.log(uuid);
    if(test["pages"]){
        console.log("inizio webgazer");
        initWebGazer();
    }else{
        console.log("pagine non caricate");
    }
    
});*/

function initWebGazer() {
    webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) {
            return;
        }
        var x = data.x; //these x coordinates are relative to the viewport
        var y = data.y; //these y coordinates are relative to the viewport

        eyeTrackerRect = eyeTracker.getBoundingClientRect();

        if(calibrationEnded){
            if (x >= eyeTrackerRect.left && x <= eyeTrackerRect.left + eyeTrackerRect.width &&
                y >= eyeTrackerRect.top && y <= eyeTrackerRect.top + eyeTrackerRect.height) {
                coords = trasformaPercentuale(x - eyeTrackerRect.left, y - eyeTrackerRect.top);
                //console.log(coords.x);
                /*const formData = new FormData();
                formData.append("coord_x", coords.x);
                formData.append("coord_y", coords.y);
                formData.append("idPage", pagine[indexPag].ID);
                formData.append("uuid", uuid);
                axios.post("../api/api_add_coordinate.php", formData
                ).then(response => {
                    console.log(response.data);
                 });*/
            } else {
                // Il tracciamento è fuori dal quadrato, nascondi il punto di tracciamento degli occhi
                console.log('nothing');
            }
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
    //console.log('x:', xPerc, 'y:', yPerc);
    return { x: xPerc, y: yPerc };
}


/*
function forward() {
    if (pagine.length > indexPag + 1) {
        webgazer.pause();
        indexPag++;
        if (pagine[indexPag].Photo != null) {
            document.getElementById("preview").innerHTML = "<img class= 'mx-auto d-block responsive col-12' src=../../img/" + pagine[indexPag].Photo + ">";
        } else {
            document.getElementById("preview").innerHTML = "<iframe class= 'mx-auto d-block responsive col-12' scrolling = 'no' onload='onloadIframeEsegui(this)' frameborder = '0' src = " + pagine[indexPag].link + "></iframe>";
        }
        webgazer.resume();
    }else{
        window.location.assign("../api/api_ultimaPagina.php");
    }
}

function backward() {
    if (indexPag - 1 >= 0) {
        webgazer.pause();
        indexPag--;
        if (pagine[indexPag].Photo != null) {
            document.getElementById("preview").innerHTML = "<img class= 'mx-auto d-block responsive col-12' src=../../img/" + pagine[indexPag].Photo + ">";
        } else {
            document.getElementById("preview").innerHTML = "<iframe class= 'mx-auto d-block responsive col-12' scrolling = 'no' onload='onloadIframeEsegui(this)' frameborder = '0' src = " + pagine[indexPag].link + "></iframe>";
        }
        webgazer.resume();
    }
}*/