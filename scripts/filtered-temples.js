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



const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 53997,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-27491.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
    },
    {
        templeName: "London England",
        location: "Newchapel, Surrey, England, United Kingdom",
        dedicated: "1958, September, 7",
        area: 42652,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/london-england-temple/london-england-temple-56886-main.jpg"
    },
];


const templeGrid = document.querySelector(".temple-grid");

function displayTemples(templeList) {
    templeGrid.innerHTML = "";

    templeList.forEach((temple) => {
        const figure = document.createElement("figure");

        const name = document.createElement("h2");
        name.textContent = temple.templeName;
        figure.appendChild(name);

        const location = document.createElement("p");
        location.textContent = `Location: ${temple.location}`;
        figure.appendChild(location);

        const dedicated = document.createElement("p");
        dedicated.textContent = `Dedicated: ${temple.dedicated}`;
        figure.appendChild(dedicated);

        const size = document.createElement("p");
        size.textContent = `Size: ${temple.area} sq ft`;
        figure.appendChild(size);

        const image = document.createElement("img");
        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = "lazy";
        figure.appendChild(image);

        templeGrid.appendChild(figure);
    });
}


displayTemples(temples);


const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const filter = link.textContent;

        if (filter === "Home") {
            displayTemples(temples);
        }

        else if (filter === "Old") {
            const oldTemples = temples.filter((temple) => {
                const year = parseInt(temple.dedicated);
                return year < 1900;
            });

            displayTemples(oldTemples);
        }

        else if (filter === "New") {
            const newTemples = temples.filter((temple) => {
                const year = parseInt(temple.dedicated);
                return year > 2000;
            });

            displayTemples(newTemples);
        }

        else if (filter === "Large") {
            const largeTemples = temples.filter((temple) => {
                return temple.area > 90000;
            });

            displayTemples(largeTemples);
        }

        else if (filter === "Small") {
            const smallTemples = temples.filter((temple) => {
                return temple.area < 10000;
            });

            displayTemples(smallTemples);
        }

        document.querySelector("main h1").textContent = filter;
    });
});