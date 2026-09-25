/* filepath: script.js */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const menuToggle = document.querySelector("#menu-toggle");
    const navLinks = document.querySelector("#nav-links");
    const heroText = document.querySelector(".hero-text");
    const cards = document.querySelector(".cards");
    const revealButton = document.querySelector("#reveal-button");
    const destructionButton = document.querySelector("#visual-destruction");
    const destructionStatus = document.querySelector("#destruction-status");
    const backToTop = document.querySelector("#back-to-top");

    /* Crea el botón de cambio de tema */
    const themeToggle = document.createElement("button");
    themeToggle.className = "theme-toggle";
    themeToggle.type = "button";
    themeToggle.setAttribute("aria-label", "Cambiar tema");
    document.querySelector(".navbar").appendChild(themeToggle);

    const savedTheme = localStorage.getItem("theme") || "dark";
    body.dataset.theme = savedTheme;

    function updateThemeButton() {
        themeToggle.textContent = body.dataset.theme === "dark" ? "☀️" : "🌙";
    }

    updateThemeButton();

    themeToggle.addEventListener("click", () => {
        const newTheme = body.dataset.theme === "dark" ? "light" : "dark";

        body.dataset.theme = newTheme;
        localStorage.setItem("theme", newTheme);
        updateThemeButton();
    });

    /* Selector de paleta */
    const paletteButtons = document.querySelectorAll(".palette-button");
    const savedPalette = localStorage.getItem("palette") || "ocean";

    body.dataset.palette = savedPalette;
    paletteButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.palette === savedPalette);

        button.addEventListener("click", () => {
            const selectedPalette = button.dataset.palette;

            body.dataset.palette = selectedPalette;
            localStorage.setItem("palette", selectedPalette);
            paletteButtons.forEach((paletteButton) => {
                paletteButton.classList.toggle("active", paletteButton === button);
            });
        });
    });

    /* Destrucción visual temporal */
    if (destructionButton && destructionStatus) {
        destructionButton.addEventListener("click", () => {
            let secondsRemaining = 5;

            body.classList.add("visual-destruction");
            destructionButton.disabled = true;
            destructionStatus.hidden = false;
            destructionStatus.textContent = `La página volverá a la normalidad en ${secondsRemaining} s`;

            const countdown = window.setInterval(() => {
                secondsRemaining--;

                if (secondsRemaining === 0) {
                    window.clearInterval(countdown);
                    body.classList.remove("visual-destruction");
                    destructionButton.disabled = false;
                    destructionStatus.hidden = true;
                    return;
                }

                destructionStatus.textContent = `La página volverá a la normalidad en ${secondsRemaining} s`;
            }, 1000);
        });
    }

    /* Botón para volver arriba */
    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.hidden = window.scrollY < 400;
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* Menú responsive */
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* Efecto máquina de escribir */
    if (heroText) {
        const originalText = heroText.textContent.trim();
        let characterIndex = 0;

        heroText.textContent = "";
        heroText.classList.add("typing");

        function typeText() {
            if (characterIndex < originalText.length) {
                heroText.textContent += originalText.charAt(characterIndex);
                characterIndex++;
                setTimeout(typeText, 35);
            } else {
                heroText.classList.remove("typing");
            }
        }

        typeText();
    }

    /* Contador y despliegue de las cosas realizadas */
    if (cards && revealButton) {
        const cardCount = cards.querySelectorAll(".card").length;

        cards.classList.add("collapsed");

        revealButton.addEventListener("click", () => {
            const isCollapsed = cards.classList.toggle("collapsed");
            const isExpanded = !isCollapsed;

            revealButton.textContent = isExpanded
                ? "Ocultar mis logros"
                : "Mostrar mis logros";

            revealButton.setAttribute("aria-expanded", String(isExpanded));
        });
    }

    /* Filtros de intereses */
    const filterButtons = document.querySelectorAll(".filter-button");
    const interests = document.querySelectorAll("#interest-list [data-category]");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((filterButton) => {
                filterButton.classList.toggle("active", filterButton === button);
            });

            interests.forEach((interest) => {
                const isVisible = selectedFilter === "todos"
                    || interest.dataset.category === selectedFilter;

                interest.hidden = !isVisible;
            });
        });
    });

    /* Fondo de partículas */
    const canvas = document.createElement("canvas");
    canvas.id = "particles-canvas";
    document.body.prepend(canvas);

    const context = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        const amount = Math.min(70, Math.floor(window.innerWidth / 18));

        particles = Array.from({ length: amount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.25,
            speedY: (Math.random() - 0.5) * 0.25
        }));
    }

    function animateParticles() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#55b5ff";

        particles.forEach((particle) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }

            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }

            context.beginPath();
            context.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );
            context.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener("resize", () => {
        resizeCanvas();
        createParticles();
    });

    /* Año automático del pie de página */
    const year = document.querySelector("#year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }
});