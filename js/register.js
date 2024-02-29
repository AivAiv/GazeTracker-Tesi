document.querySelector("main form").addEventListener("submit", function (event) {
	event.preventDefault();
	const email = document.querySelector("input[name=txtEmail]").value;
    const emailRepeat = document.querySelector("input[name=txtEmailRepeat]").value;
	const password = document.querySelector("input[name=txtPassword]").value;
    const userType = document.querySelector("input[name=rdbUserType]").value;
	register(email, emailRepeat, password, userType);
});

function register(email, emailRepeat, password, userType) {
    if (email != emailRepeat) {
        console.log("different email");
        return;
    }
    console.log("register!");

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('userType', userType);
    /*axios.post('api-register.php', formData).then(response => {
        if (response.data["error"]) {
            //document.getElementById("error").style.display = "block";
            console.log("no");
        } else {
            //window.location.pathname = './ProgettoWeb-WeFit/src/index.php';
            console.log("yes");
        }
    });*/
}

document.querySelector("#btnSwitchToLogin").addEventListener("click", function (event) {
	event.preventDefault();
	window.location.href = '../../index.php';
});