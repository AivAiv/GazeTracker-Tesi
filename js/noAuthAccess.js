const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);

document.querySelector("main form").addEventListener("submit", function (event) {
    event.preventDefault();
    const password = document.querySelector("input[name=txtPassword]").value;
    if (searchParams.has("id")) {
        checkPassword(searchParams.get("id"), password);
    } else {
        console.log("Test id not found");
    }
});

function checkPassword(id, password) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('password', password);
    axios.post('../api/api-getSingleTest.php', formData).then(response => {
        if(response.data["testRetrieved"]) {
            console.log(response.data["test"]); //TODO: Remove
            if (response.data["test"]["password"] == password) {
                const nickname = document.querySelector("input[name=txtNickname]").value;
                sessionStorage.clear();
                sessionStorage.setItem("test", JSON.stringify(response.data["test"]));
                sessionStorage.setItem("nickname", nickname);
                window.location.href = './executeTest-redirector.php';//?id=' + searchParams.get("id")
                                                                      //  + '&nickname=' + nickname;
            } else { console.log("Wrong password"); }
		} else { console.log("Test not found"); }
    });
}
