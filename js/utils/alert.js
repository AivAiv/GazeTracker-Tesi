function showAlert(parent, message) {
    let alert = document.createElement("div");
    alert.id = "alert";
    alert.innerHTML = buildAlert(message);
    parent.prepend(alert);
    attachAlertListeners();
}

function buildAlert(message) {
    let error = `<button id="btn-close-alert">
                    <span class="material-symbols-rounded icon">close</span>
                </button>
                <strong>Attenzione!</strong>${message}`;
     return error;
}

function attachAlertListeners() {
    document.getElementById("btn-close-alert").addEventListener("click", function (event) {
        event.preventDefault();
        const alert = document.getElementById("alert");
        if (alert && alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    });
}