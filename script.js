const projectsSwiper = new Swiper(".projects-swiper", {
    loop: true,
    speed: 700,
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 24,
    navigation: {
        nextEl: ".projects__arrow--next",
        prevEl: ".projects__arrow--prev"
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 14
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 18
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 24
        }
    }
});
document.querySelectorAll(".faq-item__head").forEach((button) => {
    button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        const icon = button.querySelector(".faq-item__icon");
        const isOpen = item.classList.contains("is-open");

        item.classList.toggle("is-open");

        if (icon) {
            icon.textContent = isOpen ? "+" : "−";
        }
    });
});
const siteHeader = document.getElementById("site-header");

const toggleHeaderState = () => {
    if (!siteHeader) return;
    siteHeader.classList.toggle("header--scrolled", window.scrollY > 12);
};

toggleHeaderState();
window.addEventListener("scroll", toggleHeaderState, { passive: true });

(function () {
    const track = document.querySelector(".hero__track");
    const slides = document.querySelectorAll(".hero__track .hero__slide");

    if (!track || !slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        track.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;
    }, 10000);
})();

(function () {
    const tabs = document.querySelectorAll(".services__tab");
    const panels = document.querySelectorAll(".services__panel");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;

            tabs.forEach((item) => item.classList.remove("is-active"));
            panels.forEach((panel) => panel.classList.remove("is-active"));

            tab.classList.add("is-active");

            const currentPanel = document.querySelector(
                `.services__panel[data-panel="${target}"]`
            );

            if (currentPanel) {
                currentPanel.classList.add("is-active");
            }
        });
    });
})();