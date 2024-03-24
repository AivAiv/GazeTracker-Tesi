if (document.querySelector("#btnLogout") != null) {
    document.querySelector("#btnLogout").addEventListener("click", function (event) {
        event.preventDefault();
        sessionStorage.clear();
        window.location.replace('../../index.php');
    });
}

if (document.querySelector("#btnHome") != null) {
    document.querySelector("#btnHome").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.replace('./home-redirector.php');
    });
}