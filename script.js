// Az aktuális oldal alapján beállítjuk az aktív menüpontot
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop(); // Az aktuális fájlnév
    const menuLinks = document.querySelectorAll("nav ul li a");

    menuLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});
