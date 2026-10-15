const hamburgerBtn = document.getElementById("hamburgerBtn");
const menu = document.getElementById("menu");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

function setTheme(theme) {
    const isDark = theme === "dark";
    body.classList.toggle("dark", isDark);
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Activer le thème clair" : "Activer le thème sombre"
    );
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") {
    setTheme(savedTheme);
}

themeToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark") ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
});

function closeMenu(restoreFocus = false) {
    menu.hidden = true;
    menu.inert = true;
    menu.setAttribute("aria-hidden", "true");
    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Ouvrir le menu");

    if (restoreFocus) {
        hamburgerBtn.focus();
    }
}

hamburgerBtn.addEventListener("click", () => {
    const isOpening = menu.hidden;

    if (isOpening) {
        menu.hidden = false;
        menu.inert = false;
        menu.setAttribute("aria-hidden", "false");
    } else {
        closeMenu();
    }

    hamburgerBtn.classList.toggle("active", isOpening);
    hamburgerBtn.setAttribute("aria-expanded", String(isOpening));
    hamburgerBtn.setAttribute(
        "aria-label",
        isOpening ? "Fermer le menu" : "Ouvrir le menu"
    );
});

menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
        closeMenu(true);
    }
});

document.addEventListener("click", (event) => {
    if (
        !menu.hidden &&
        !menu.contains(event.target) &&
        !hamburgerBtn.contains(event.target)
    ) {
        closeMenu();
    }
});

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealTargets = document.querySelectorAll("[data-reveal]");
    body.classList.add("reveal-enabled");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealTargets.forEach((element, index) => {
        element.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);
        revealObserver.observe(element);
    });
}
