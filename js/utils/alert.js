function showAlert(parent, message) {
    if (document.getElementById("alert")) {
        closeAlert();
    }
    
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
        closeAlert();
    });
}

function closeAlert() {
    const alert = document.getElementById("alert");
    if (alert && alert.parentNode) {
        alert.parentNode.removeChild(alert);
    }
}

function askConfirmation(message) {
    return new Promise((resolve) => {
        const modal = document.createElement("div");
        modal.id = "modal-scrim";

        const alertBox = document.createElement("div");
        alertBox.id = "modal";

        const messageText = document.createElement("p");
        messageText.textContent = message;
        
        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Conferma";
        confirmButton.addEventListener("click", () => {
            modal.remove();
            resolve(true);
        });
        
        const discardButton = document.createElement("button");
        discardButton.textContent = "Indietro";
        discardButton.addEventListener("click", () => {
            modal.remove();
            resolve(false);
        });
        
        alertBox.appendChild(messageText);
        alertBox.appendChild(discardButton);
        alertBox.appendChild(confirmButton);
        modal.appendChild(alertBox);
        document.body.appendChild(modal);
    });
}
