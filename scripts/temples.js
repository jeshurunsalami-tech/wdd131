console.log("JavaScript fonctionne !");

const currentYear = new Date().getFullYear();

document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").textContent = document.lastModified;


const menuButton = document.getElementById("menu-button");
const nav = document.querySelector("nav");
const siteTitle = document.querySelector(".site-title");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");

    if (nav.classList.contains("open")) {
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close navigation menu");
        siteTitle.style.display = "none";
    }

    else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
        siteTitle.style.display = "block";
    }
});