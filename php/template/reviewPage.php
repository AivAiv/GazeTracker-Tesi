<section class="base-container review-page">
    <section class="firstLine">
        <div>Pagina: <span id="pageName"></span></div>
        <div>ID utente: <span id="userId"></span></div>
        <div>Tempo impiegato: <span id="tmrDuration">00:01:00</span></div>
        <button id="btnHeatmap">DOT</button>
    </section>
    <section class="pageContent">
        <section id="testStage"></section>
        <section style="width: 100%; height: 200px; position: absolute;" id="heatmap"></section>
        <canvas id="heatmap-canvas"></canvas>
    </section>
</section>