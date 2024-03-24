if (document.querySelector("#btnLogout") != null) {
    document.querySelector("#btnLogout").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = '../../index.php';
    });
}

if (document.querySelector("#btnHome") != null) {
    document.querySelector("#btnHome").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = './home-redirector.php';
    });
}