const STORAGE_KEY = "ta_theme";

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    const btn = document.getElementById("themeBtn");
    if (btn) {
        // If dark mode, show Sun (to switch to light)
        // If light mode, show Moon (to switch to dark)
        btn.textContent = theme === "dark" ? "☀️" : "🌙";
    }
}

function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || "dark";
}

function initTheme() {
    setTheme(getTheme());
    const btn = document.getElementById("themeBtn");
    btn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        setTheme(next);
    });
}

function initYear() {
    document.getElementById("year").textContent = String(new Date().getFullYear());
}

async function initCopyEmail() {
    const btn = document.getElementById("copyEmailBtn");
    const status = document.getElementById("copyStatus");
    const email = "tiffanyoarnold@gmail.com";

    btn.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(email);
            status.textContent = "Copied!";
            setTimeout(() => (status.textContent = ""), 1200);
        } catch {
            status.textContent = "Copy failed. Please copy manually.";
            setTimeout(() => (status.textContent = ""), 1600);
        }
    });
}

function initScrollSpy() {
    const links = Array.from(document.querySelectorAll(".nav-link"));
    const sections = links
        .map((a) => document.querySelector(a.getAttribute("href")))
        .filter(Boolean);

    const obs = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) return;

            links.forEach((a) => a.classList.remove("active"));
            const active = links.find((a) => a.getAttribute("href") === `#${visible.target.id}`);
            if (active) active.classList.add("active");
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.2, 0.3] }
    );

    sections.forEach((s) => obs.observe(s));
}

initTheme();
initYear();
initCopyEmail();
initScrollSpy();
