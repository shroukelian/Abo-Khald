document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");
    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");
    const backTop = document.getElementById("backTop");
    const year = document.getElementById("year");


    /* =========================================
       Loader
    ========================================= */

    document.body.classList.add("loading");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");
            document.body.classList.remove("loading");

            document.querySelectorAll(".hero .reveal").forEach((element, index) => {

                setTimeout(() => {
                    element.classList.add("active");
                }, index * 150);

            });

        }, 700);

    });


    /* =========================================
       Header On Scroll
    ========================================= */

    function handleHeader() {

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =========================================
       Mobile Menu
    ========================================= */

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("open");

        const spans = menuBtn.querySelectorAll("span");

        if (nav.classList.contains("open")) {

            spans[0].style.transform = "rotate(45deg) translate(4px, 4px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(4px, -4px)";

        } else {

            spans[0].style.transform = "";
            spans[1].style.opacity = "";
            spans[2].style.transform = "";

        }

    });


    /* Close mobile menu after clicking */
    document.querySelectorAll(".nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            const spans = menuBtn.querySelectorAll("span");

            spans[0].style.transform = "";
            spans[1].style.opacity = "";
            spans[2].style.transform = "";

        });

    });


    /* =========================================
       Reveal Animations
    ========================================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        if (!element.closest(".hero")) {
            revealObserver.observe(element);
        }

    });


    /* =========================================
       Back To Top
    ========================================= */

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =========================================
       Current Year
    ========================================= */

    year.textContent = new Date().getFullYear();


    /* =========================================
       Smooth Scroll
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       Phone Number Protection / Direction
    ========================================= */

    document.querySelectorAll(".big-phone, .footer-phone, .nav-call b").forEach(number => {
        number.style.direction = "ltr";
        number.style.unicodeBidi = "plaintext";
    });


    /* =========================================
       Small Parallax Effect
    ========================================= */

    const hero = document.querySelector(".hero");

    if (hero && window.innerWidth > 900) {

        window.addEventListener("mousemove", (event) => {

            const x = (event.clientX / window.innerWidth - 0.5) * 10;
            const y = (event.clientY / window.innerHeight - 0.5) * 10;

            const card = document.querySelector(".hero-card");

            if (card) {
                card.style.transform =
                    `translate3d(${x * -0.35}px, ${y * -0.35}px, 0)`;
            }

        });

    }


    /* =========================================
       Service Cards Stagger
    ========================================= */

    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 50}ms`;

    });


    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.style.display = "none";
            image.parentElement.style.background =
                "linear-gradient(135deg, #222, #555)";

        });

    });

});