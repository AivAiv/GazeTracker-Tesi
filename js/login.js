const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
if (searchParams.has("id")) {
    window.location.href = './php/redirector/noAuthAccess-redirector.php?id=' + searchParams.get("id");
}

document.querySelector("main form").addEventListener("submit", function (event) {
	event.preventDefault();
	const email = document.querySelector("input[name=txtEmail]").value;
	const password = document.querySelector("input[name=txtPassword]").value;
	login(email, password);
});

function login(email, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', hex_sha512(password));
    axios.post('php/api/api-login.php', formData).then(response => {
		if(response.data["loginSuccess"]) {
            window.location.href = './php/redirector/home-redirector.php';
		} else {
            console.log("Not registered or wrong password");
        }
    });
}

document.querySelector("#btnSwitchToRegister").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = './php/redirector/register-redirector.php';
});