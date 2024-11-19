document.querySelector("main form").addEventListener("submit", function (event) {
	event.preventDefault();
	const email = document.querySelector("input[name=txtEmail]").value;
	const password = document.querySelector("input[name=txtPassword]").value;
    const passwordRepeat = document.querySelector("input[name=txtPasswordRepeat]").value;
    const userType = document.querySelector("input[name=rdbUserType]:checked").value;
	register(email, password, passwordRepeat, userType);
});

function register(email, password, passwordRepeat, userType) {
    const parent = document.querySelector(".base-container");
    if (password != passwordRepeat) {
        showAlert(parent, "Le password inserite sono diverse.");
        return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', hex_sha512(password));
    formData.append('userType', userType);
    axios.post('../api/api-register.php', formData).then(response => {
        if (response.data["registrationSuccess"]) {
            window.location.href = '../../index.php';
        } else {
            showAlert(parent, "L'email inserita esiste già.");
        }
    });
}

document.querySelector("#btnSwitchToLogin").addEventListener("click", function (event) {
	event.preventDefault();
	window.location.href = '../../index.php';
});