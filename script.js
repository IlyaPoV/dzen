// ==================== SWIPER SLIDERS ====================
(function () {
  if (typeof Swiper === "undefined") return;

  /* Project Hero Slider */
  const heroSlider = document.querySelector(".js-project-hero-slider");
  if (heroSlider) {
    new Swiper(heroSlider, {
      loop: true,
      speed: 900,
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: ".project-hero__slider .arrow--next",
        prevEl: ".project-hero__slider .arrow--prev"
      }
    });
  }

  /* Project Gallery Sliders */
  const galleryConfigs = [
    { selector: ".js-project-gallery-ext", nav: ".project-gallery__panel[data-panel='ext'] .project-gallery__nav" },
    { selector: ".js-project-gallery-int", nav: ".project-gallery__panel[data-panel='int'] .project-gallery__nav" }
  ];

  galleryConfigs.forEach(config => {
    const slider = document.querySelector(config.selector);
    if (!slider) return;

    new Swiper(slider, {
      loop: true,
      speed: 900,
      slidesPerView: 1,
      spaceBetween: 0,
      grabCursor: true,
      navigation: {
        nextEl: config.nav + " .arrow--next",
        prevEl: config.nav + " .arrow--prev"
      }
    });
  });

  /* Projects Slider (главная страница) */
  const projectsSlider = document.querySelector(".projects-swiper");
  if (projectsSlider) {
    new Swiper(projectsSlider, {
      loop: true,
      speed: 700,
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: ".projects__outer .arrow--next",
        prevEl: ".projects__outer .arrow--prev"
      },
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 14 },
        768: { slidesPerView: 2, spaceBetween: 18 },
        1200: { slidesPerView: 3, spaceBetween: 24 }
      }
    });
  }
})();

// ==================== ОСТАЛЬНОЙ КОД (без изменений) ====================
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

// Hero track (главная страница)
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

// Services tabs
(function () {
  const tabs = document.querySelectorAll(".services__tab");
  const panels = document.querySelectorAll(".services__panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach((item) => item.classList.remove("is-active"));
      panels.forEach((panel) => panel.classList.remove("is-active"));
      tab.classList.add("is-active");
      const currentPanel = document.querySelector(`.services__panel[data-panel="${target}"]`);
      if (currentPanel) currentPanel.classList.add("is-active");
    });
  });
})();

// Mobile menu
(function () {
  const burger = document.querySelector(".header__burger");
  const closeBtn = document.querySelector(".header__drawer-close");
  const backdrop = document.querySelector(".header__backdrop");
  const drawerLinks = document.querySelectorAll(".header__drawer a");

  if (burger) burger.addEventListener("click", () => document.body.classList.add("menu-open"));
  const closeMenu = () => document.body.classList.remove("menu-open");

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  drawerLinks.forEach(link => link.addEventListener("click", closeMenu));
})();

// Services mobile select
(function () {
  const mobileSelect = document.querySelector(".services__mobile-select");
  if (!mobileSelect) return;
  // ... (весь код мобильного селекта остаётся без изменений)
})();

// Callback modal
(function () {
  const modal = document.getElementById("callbackModal");
  if (!modal) return;
  // ... (весь код модального окна остаётся без изменений)
})();

// Gallery tabs
(function () {
  const tabs = document.querySelectorAll(".project-gallery__tab");
  const panels = document.querySelectorAll(".project-gallery__panel");
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const current = tab.dataset.tab;
      tabs.forEach(item => item.classList.remove("is-active"));
      panels.forEach(panel => panel.classList.remove("is-active"));
      tab.classList.add("is-active");
      const target = document.querySelector(`[data-panel="${current}"]`);
      if (target) target.classList.add("is-active");
    });
  });
})();

// Format more button
(function () {
  document.querySelectorAll(".project-format__more").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".project-format__card");
      if (card) card.classList.toggle("is-open");
    });
  });
})();

// Plan lightbox
(function () {
  const planItems = [
    { src: "./assets/images/project-plan1.png", alt: "Планировка без мебели" },
    { src: "./assets/images/project-plan2.png", alt: "Планировка с мебелью" }
  ];

  const planButtons = document.querySelectorAll(".project-plan__button");
  const lightbox = document.getElementById("planLightbox");
  const image = document.getElementById("planLightboxImage");
  const prev = document.querySelector(".plan-lightbox__arrow--prev");
  const next = document.querySelector(".plan-lightbox__arrow--next");
  const closeButtons = document.querySelectorAll("[data-plan-close]");

  if (!planButtons.length || !lightbox || !image) return;

  let currentIndex = 0;

  const render = (index) => {
    const item = planItems[index];
    if (!item) return;
    image.src = item.src;
    image.alt = item.alt;
    currentIndex = index;
  };

  const open = (index) => {
    render(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = document.body.classList.contains("modal-open") ? "hidden" : "";
  };

  const showPrev = () => render(currentIndex === 0 ? planItems.length - 1 : currentIndex - 1);
  const showNext = () => render(currentIndex === planItems.length - 1 ? 0 : currentIndex + 1);

  planButtons.forEach(button => {
    button.addEventListener("click", () => open(Number(button.dataset.planIndex || 0)));
  });

  if (prev) prev.addEventListener("click", showPrev);
  if (next) next.addEventListener("click", showNext);

  closeButtons.forEach(btn => btn.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });
})();