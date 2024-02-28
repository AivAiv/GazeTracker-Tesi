document.querySelector("main form").addEventListener("submit", function (event) {
	event.preventDefault();
	const email = document.querySelector("input[name=txtEmail]").value;
	const password = document.querySelector("input[name=txtPassword]").value;
	login(email, password);
});

function login(email, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    axios.post('php/api-login.php', formData).then(response => {
		if(response.data["loginSuccess"]) {
            console.log("Success");
			//window.location.pathname = './ProgettoWeb-WeFit/src/profile-redirector.php';
		} else {
            console.log("not found?");
        }
    });
}