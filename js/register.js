document.querySelector("main form").addEventListener("submit", function (event) {
	event.preventDefault();
	const email = document.querySelector("input[name=txtEmail]").value;
    const emailRepeat = document.querySelector("input[name=txtEmailRepeat]").value;
	const password = document.querySelector("input[name=txtPassword]").value;
    const userType = document.querySelector("input[name=rdbUserType]:checked").value;
    console.log(userType);
	register(email, emailRepeat, password, userType);
});

function register(email, emailRepeat, password, userType) {
    if (email != emailRepeat) {
        console.log("different email");
        return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('userType', userType);
    axios.post('../api-register.php', formData).then(response => {
        if (response.data["registrationSuccess"]) {
            window.location.href = '../../index.php';
        } else {
            console.log("email already existent");
        }
    });
}

document.querySelector("#btnSwitchToLogin").addEventListener("click", function (event) {
	event.preventDefault();
	window.location.href = '../../index.php';
});