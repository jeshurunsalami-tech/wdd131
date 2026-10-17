// Togo Explorer - Main JavaScript

// 1. Mobile Navigation Menu

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("header nav");

if (menuButton && navigation) {
    function closeMobileMenu() {
        navigation.classList.remove("open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");

        if (window.innerWidth <= 700) {
            navigation.style.display = "none";
        }
    }

    function openMobileMenu() {
        navigation.classList.add("open");
        navigation.style.display = "flex";
        navigation.style.flexDirection = "column";
        navigation.style.width = "100%";

        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close navigation menu");
    }

    function updateNavigation() {
        if (window.innerWidth <= 700) {
            if (menuButton.getAttribute("aria-expanded") === "true") {
                openMobileMenu();
            } else {
                closeMobileMenu();
            }

            menuButton.style.display = "block";
        } else {
            navigation.style.display = "";
            navigation.style.flexDirection = "";
            navigation.style.width = "";
            navigation.classList.remove("open");

            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.style.display = "none";
        }
    }

    menuButton.addEventListener("click", function () {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 700) {
                closeMobileMenu();
            }
        });
    });

    window.addEventListener("resize", updateNavigation);

    updateNavigation();
}


// 2. Hero Image Slideshow

const heroImages = document.querySelectorAll(".hero-image");
const heroIndicators = document.querySelectorAll(".hero-indicators span");

if (heroImages.length > 0) {
    let currentImage = 0;

    function showHeroImage(index) {
        heroImages[currentImage].classList.remove("active");
        heroIndicators[currentImage]?.classList.remove("active");

        currentImage = index;

        heroImages[currentImage].classList.add("active");
        heroIndicators[currentImage]?.classList.add("active");
    }

    if (heroImages.length > 1) {
        setInterval(function () {
            const nextImage = (currentImage + 1) % heroImages.length;
            showHeroImage(nextImage);
        }, 5000);
    }

    heroIndicators.forEach(function (indicator, index) {
        indicator.addEventListener("click", function () {
            showHeroImage(index);
        });
    });
}


// 3. Featured Destinations

const destinations = [
    {
        name: "Lomé Beach",
        image: "images/lomé-beach.jpg",
        alt: "Lomé Beach in Togo",
        description: "Culture · History · Tradition",
        link: "destinations.html#lome-beach"
    },
    {
        name: "Koutammakou",
        image: "images/koutamakou.jpg",
        alt: "Koutammakou in Togo",
        description: "Culture · History · Tradition",
        link: "destinations.html#koutammakou"
    },
    {
        name: "Mont Agou",
        image: "images/mont-agou.jpg",
        alt: "Green mountain landscape of Mont Agou",
        description: "Nature · Hiking · Adventure",
        link: "destinations.html#mont-agou"
    },
    {
        name: "Historical Site",
        image: "images/independance-site.jpg",
        alt: "Historical site in Togo",
        description: "History · Culture · Tradition",
        link: "destinations.html#historical-site"
    }
];

const featuredGrid = document.querySelector(".featured .destination-grid");

if (featuredGrid) {
    featuredGrid.innerHTML = "";

    destinations.forEach(function (destination) {
        const card = document.createElement("article");
        card.classList.add("destination-card");

        const link = document.createElement("a");
        link.href = destination.link;

        const image = document.createElement("img");
        image.src = destination.image;
        image.alt = destination.alt;
        image.loading = "lazy";

        const information = document.createElement("div");
        information.classList.add("destination-info");

        const title = document.createElement("h3");
        title.textContent = destination.name;

        const description = document.createElement("p");
        description.textContent = destination.description;

        information.appendChild(title);
        information.appendChild(description);

        link.appendChild(image);
        link.appendChild(information);

        card.appendChild(link);
        featuredGrid.appendChild(card);
    });
}


// 4. Footer: Copyright Year

const copyrightYear = document.querySelector("#copyright-year");

if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
}


// 5. Footer: Last Modified Date and Time

const lastModified = document.querySelector("#last-modified");

if (lastModified) {
    const modificationDate = new Date(document.lastModified);

    lastModified.textContent = modificationDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}


// 6. Trip Form Validation and GET Submission

const tripForm = document.querySelector("#trip-form");

if (tripForm) {
    const arrivalDate = document.querySelector("#arrival-date");
    const travelers = document.querySelector("#travelers");
    const formMessage = document.querySelector("#form-message");
    const submitButton = tripForm.querySelector('button[type="submit"]');

    // Set today's date as the earliest arrival date.

    if (arrivalDate) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        arrivalDate.min = `${year}-${month}-${day}`;
    }

    tripForm.addEventListener("submit", function (event) {
        event.preventDefault();

        formMessage.textContent = "";

        // Check that the form is valid.

        if (!tripForm.checkValidity()) {
            tripForm.reportValidity();
            return;
        }

        // Check the arrival date.

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const todayString = `${year}-${month}-${day}`;

        if (arrivalDate.value < todayString) {
            formMessage.textContent =
                "Please select today or a future arrival date.";
            arrivalDate.focus();
            return;
        }

        // Check the number of travelers.

        if (Number(travelers.value) < 1) {
            formMessage.textContent =
                "The number of travelers must be at least one.";
            travelers.focus();
            return;
        }

        // Count only valid submissions.

        let submissionCount =
            Number(localStorage.getItem("tripSubmissionCount")) || 0;

        submissionCount++;

        localStorage.setItem(
            "tripSubmissionCount",
            submissionCount
        );

        // Prevent repeated submissions while redirecting.

        submitButton.disabled = true;

        // Send the form data using GET.

        tripForm.submit();
    });
}


// 7. Display the Trip Submission Counter

const submissionCounter = document.querySelector("#submission-count");

if (submissionCounter) {
    const submissionCount =
        Number(localStorage.getItem("tripSubmissionCount")) || 0;

    submissionCounter.textContent = submissionCount;
}