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
        item.classList.toggle("is-open");
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

(function () {
  const burger = document.querySelector(".header__burger");
  const closeBtn = document.querySelector(".header__drawer-close");
  const backdrop = document.querySelector(".header__backdrop");
  const drawerLinks = document.querySelectorAll(".header__drawer a");

  if (burger) {
    burger.addEventListener("click", () => {
      document.body.classList.add("menu-open");
    });
  }

  const closeMenu = () => document.body.classList.remove("menu-open");

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  drawerLinks.forEach((link) => link.addEventListener("click", closeMenu));
})();

(function () {
  const mobileSelect = document.querySelector(".services__mobile-select");
  const trigger = document.querySelector(".services__mobile-trigger");
  const triggerText = document.querySelector(".services__mobile-trigger-text");
  const options = document.querySelectorAll(".services__mobile-option");
  const tabs = document.querySelectorAll(".services__tab");
  const panels = document.querySelectorAll(".services__panel");

  if (!mobileSelect || !trigger || !triggerText || !options.length) return;

  trigger.addEventListener("click", () => {
    mobileSelect.classList.toggle("is-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const target = option.dataset.tab;
      triggerText.textContent = option.textContent.trim();

      options.forEach((item) => item.classList.remove("is-active"));
      option.classList.add("is-active");
      mobileSelect.classList.remove("is-open");

      tabs.forEach((item) => {
        item.classList.toggle("is-active", item.dataset.tab === target);
      });

      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.panel === target);
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (!mobileSelect.contains(event.target)) {
      mobileSelect.classList.remove("is-open");
    }
  });
})();