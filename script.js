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
(function () {
  if (typeof Swiper === "undefined") return;

  const projectsSlider = document.querySelector(".projects-swiper");
  if (!projectsSlider) return;

  new Swiper(projectsSlider, {
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
      0: { slidesPerView: 1, spaceBetween: 14 },
      768: { slidesPerView: 2, spaceBetween: 18 },
      1200: { slidesPerView: 3, spaceBetween: 24 }
    }
  });
})();

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

(function () {
  const modal = document.getElementById("callbackModal");
  if (!modal) return;

  const openSelectors = [
    "[data-open-callback]",
    ".header__button",
    ".header__drawer-button",
    ".site-footer__button"
  ];

  const openButtons = document.querySelectorAll(openSelectors.join(","));
  const closeButtons = modal.querySelectorAll("[data-modal-close]");
  const dialog = modal.querySelector(".callback-modal__dialog");

  const openModal = () => {
    document.body.classList.remove("menu-open");
    document.body.classList.add("modal-open");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (event) => {
    if (!dialog.contains(event.target)) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
})();

(function () {
  if (typeof Swiper === "undefined") return;

  const heroSlider = document.querySelector(".js-project-hero-slider");
  if (heroSlider) {
    new Swiper(heroSlider, {
      loop: true,
      speed: 900,
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: ".project-hero__arrow--next",
        prevEl: ".project-hero__arrow--prev"
      }
    });
  }

  [
    {
      selector: ".js-project-gallery-ext",
      next: ".project-gallery__arrow--next-ext",
      prev: ".project-gallery__arrow--prev-ext"
    },
    {
      selector: ".js-project-gallery-int",
      next: ".project-gallery__arrow--next-int",
      prev: ".project-gallery__arrow--prev-int"
    }
  ].forEach((gallery) => {
    const slider = document.querySelector(gallery.selector);
    if (!slider) return;

    new Swiper(slider, {
      loop: true,
      speed: 900,
      slidesPerView: 1,
      spaceBetween: 0,
      grabCursor: true,
      navigation: {
        nextEl: gallery.next,
        prevEl: gallery.prev
      }
    });
  });
})();

(function () {
  const tabs = document.querySelectorAll(".project-gallery__tab");
  const panels = document.querySelectorAll(".project-gallery__panel");
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const current = tab.dataset.tab;

      tabs.forEach((item) => item.classList.remove("is-active"));
      panels.forEach((panel) => panel.classList.remove("is-active"));

      tab.classList.add("is-active");

      const target = document.querySelector(`[data-panel="${current}"]`);
      if (target) target.classList.add("is-active");
    });
  });
})();

(function () {
  document.querySelectorAll(".project-format__more").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".project-format__card");
      if (card) card.classList.toggle("is-open");
    });
  });
})();

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

  planButtons.forEach((button) => {
    button.addEventListener("click", () => open(Number(button.dataset.planIndex || 0)));
  });

  if (prev) prev.addEventListener("click", showPrev);
  if (next) next.addEventListener("click", showNext);

  closeButtons.forEach((button) => button.addEventListener("click", close));

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") showPrev();
    if (event.key === "ArrowRight") showNext();
  });
})();

