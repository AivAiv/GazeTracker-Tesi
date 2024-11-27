const executions = JSON.parse(sessionStorage.getItem("executions"));
const currentPage = JSON.parse(sessionStorage.getItem("page"));
const lblPageName = document.getElementById("pageName");
const lblUserId = document.getElementById("userId");
const pageContainer = document.getElementById("testStage");
const heatmapContainer = document.getElementById("heatmap");
const linemapContainer = document.getElementById("heatmap-canvas");
const btnHeatmap = document.getElementById("btnHeatmap");

let currentExecIndex = sessionStorage.getItem("currentExecIndex");

setForwardButton();
setBackwardButton();
loadPageInformations();

btnHeatmap.addEventListener("click", function (event) {
    event.preventDefault;
    if (event.currentTarget.innerHTML == "DOT") {
        event.currentTarget.innerHTML = "LINE";
        loadHeatMap();
    }
    else {
        event.currentTarget.innerHTML = "DOT";
        loadLineMap();
    }
});

function drawPage(page) {
    if (page["image"] != null) {
        pageContainer.innerHTML = `<img src="../../img/` + page["image"] + `"/>`;
    } else if (page["link"] != null) {
        pageContainer.innerHTML = `<iframe scrolling='no' src = "` + page["link"] + `"></iframe>`;
    } else {
        pageContainer.innerHTML = `<div>` + page["text"] + `</div>`;
    }
}

function loadPageInformations() {
    lblPageName.innerHTML = currentPage["name"];
    lblUserId.innerHTML = executions[currentExecIndex];
    drawPage(currentPage);
    btnHeatmap.innerHTML = "LINE";
    loadHeatMap();
}

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
    if (currentExecIndex == (executions.length - 1)) {
        currentExecIndex = (executions.length - 1);
    } else {
        currentExecIndex ++;
    }
    console.log(currentExecIndex);
    loadPageInformations();
}

function PreviousPage() {
    if (currentExecIndex <= 0) {
        currentExecIndex = 0;
    } else {
        currentExecIndex --;
    }
    console.log(currentExecIndex);
    loadPageInformations();
}

function onloadIframeEsegui(e) {
    e.style.height = e.contentWindow.document.body.scrollHeight + 'px';
    document.getElementById("testStage").style.height = e.style.height;
}

function loadHeatMap() {
    linemapContainer.style.display = "none";
    heatmapContainer.style.display = "inline-block";
    heatmapContainer.style.position = "absolute";

    heatmapContainer.innerHTML = "";
    heatmapInstance = h337.create({container: heatmapContainer}); // only container is required, the rest will be defaults
    
    const formData = new FormData();
    formData.append("pageId", currentPage["id"]);
    formData.append("anonymUserId", executions[currentExecIndex]);
    axios.post("../api/api-getWebgazerData.php", formData).then(response => {
        var points = [];
        let registrazione = response.data;
        registrazione.forEach(coordianta => {
            RealCoordiante = trasformaFromPercentuale(coordianta.x, coordianta.y, heatmapInstance._renderer.canvas);
            var point = {
                x: RealCoordiante.x,
                y: RealCoordiante.y,
                value: 10,
                radius: 10
            };
            points.push(point);
        });
        var data = {
            max: 10,
            data: points
        };
        heatmapInstance.setData(data);
    });
}

function loadLineMap() {
    heatmapContainer.style.display = "none";
    linemapContainer.style.display = "block";
    const ctx = linemapContainer.getContext('2d');
    ctx.clearRect(0, 0, document.getElementById("heatmap-canvas").width, document.getElementById("heatmap-canvas").height);
    fix_dpi();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    const formData = new FormData();
    formData.append("pageId", currentPage["id"]);
    formData.append("anonymUserId", executions[currentExecIndex]);
    axios.post("../api/api-getWebgazerData.php", formData).then(response => {
        ctx.beginPath();

        let registrazione = response.data;
        registrazione.forEach(coordianta => {
            RealCoordiante = trasformaFromPercentuale(coordianta.x, coordianta.y, document.getElementById("heatmap-canvas"));
            ctx.lineTo(RealCoordiante.x, RealCoordiante.y);
        });

        ctx.stroke();
    });
}

function fix_dpi() {
    let dpi = window.devicePixelRatio;
    let style_height = +getComputedStyle(linemapContainer).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(linemapContainer).getPropertyValue("width").slice(0, -2);
    linemapContainer.setAttribute('height', style_height * dpi);
    linemapContainer.setAttribute('width', style_width * dpi);
}

function trasformaFromPercentuale(x, y, rect) {
    xReal = (x * parseFloat(rect.width)) / 100;
    yReal = (y * parseFloat(rect.height)) / 100;
    return { x: xReal, y: yReal };
}