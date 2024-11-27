const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);

document.querySelector("main form").addEventListener("submit", function (event) {
    event.preventDefault();
    const password = document.querySelector("input[name=txtPassword]").value;
    if (searchParams.has("id")) {
        checkPassword(searchParams.get("id"), password);
    }
});

function checkPassword(id, password) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('password', password);
    axios.post('../api/api-getSingleTest.php', formData).then(response => {
        if(response.data["testRetrieved"]) {
            if (response.data["test"]["password"] == password) {
                const nickname = document.querySelector("input[name=txtNickname]").value;
                sessionStorage.clear();
                sessionStorage.setItem("test", JSON.stringify(response.data["test"]));
                sessionStorage.setItem("nickname", nickname);
                window.location.href = './executeTest-redirector.php';
            } else {
                let parent = document.querySelector(".base-container");
                showAlert(parent, "Password non valida.");
            }
		} else {
            let parent = document.querySelector(".base-container");
            showAlert(parent, "Il test richiesto non esiste.");
        }
    });
}
