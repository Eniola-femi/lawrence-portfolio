
/*
 * ======================================
 * EASY WEBSITE CUSTOMIZATION
 * ======================================
 */

const siteConfig = {
  profileImage: "IMG-20261110-WA0026.jpg",
  email: "onahlawrence25@gmail.com",
  phone: "09131989106",
  whatsapp: "09131989106",
  tiktok: "ai.toldme"
};

const portfolioVideos = [
  {
    category: "ADS",
    title: "Bringing Brands to Life",
    description: "Creative advertisements designed to showcase products, capture attention, and connect brands with their target audience.",
    thumbnail: "assets/images/ads-thumbnail.svg",
    videoUrl: "ads video.MOV"
  },
  {
    category: "UGC VIDEOS",
    title: "Content That Connects",
    description: "Engaging user-generated-style content designed to feel relatable, authentic, and engaging.",
    thumbnail: "assets/images/ugc-thumbnail.svg",
    videoUrl: "IMG_2865.MOV"
  },
  {
    category: "SHORT FILMS",
    title: "Stories Through Motion",
    description: "Creative short-form visual storytelling that combines cinematic scenes, editing, and compelling narratives.",
    thumbnail: "assets/images/short-film-thumbnail.svg",
    videoUrl: "story telling.MOV"
  }
];

const qs = (selector, parent = document) =>
  parent.querySelector(selector);

const qsa = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


/* CONTACT DETAILS */

function setContactDetails() {
  const emailLink = qs("#email-link");
  const phoneLink = qs("#phone-link");
  const tiktokLink = qs("#tiktok-link");
  const whatsappLink = qs("#whatsapp-link");
  const footerEmail = qs("#footer-email");
  

  qs("#email-value").textContent = siteConfig.email;
  qs("#phone-value").textContent = siteConfig.phone;
  qs("#tiktok-value").textContent = siteConfig.tiktok;

  emailLink.href = `mailto:${siteConfig.email}`;
  phoneLink.href = `tel:${siteConfig.phone}`;
  tiktokLink.href = `https://tiktok.com/@aitold.me`;
  whatsappLink.href = `https://wa.me/${siteConfig.whatsapp}`;

  footerEmail.href = `mailto:${siteConfig.email}`;
 

  const profileImage = qs("#profile-image");

  profileImage.src = siteConfig.profileImage;

  profileImage.addEventListener("error", () => {
    profileImage.src =
      "assets/images/onah-lawrence-placeholder.svg";
  });
}


/* CREATE PORTFOLIO VIDEO CARDS */

function createPortfolioCard(video, index) {
  const card = document.createElement("article");

  card.className =
    `portfolio-card reveal reveal-delay-${Math.min(index, 2)}`;

  card.innerHTML = `
    <div class="video-thumbnail">

      <video
        class="portfolio-video"
        src="${video.videoUrl}"
        muted
        loop
        playsinline
        preload="metadata"
        aria-label="${video.title}"
      ></video>

      <span class="category-tag">
        ${video.category}
      </span>

    </div>

    <div class="portfolio-info">

      <div class="portfolio-title-row">
        <h3>${video.title}</h3>
        <span class="portfolio-arrow">↗</span>
      </div>

      <p>${video.description}</p>

    </div>
  `;

  return card;
}


/* DISPLAY PORTFOLIO VIDEOS */

function renderPortfolio() {
  const grid = qs("#portfolio-grid");

  portfolioVideos.forEach((video, index) => {
    grid.appendChild(
      createPortfolioCard(video, index)
    );
  });

  setupPortfolioVideoPlayback();
}


/*
 * VIDEOS AUTOPLAY SILENTLY WHEN VISIBLE.
 * THEY PAUSE WHEN THEY LEAVE THE SCREEN.
 * CLICKING A VIDEO ENABLES SOUND AND CONTROLS.
 */

function setupPortfolioVideoPlayback() {
  const videos = qsa(".portfolio-video");

  videos.forEach((video) => {

    video.addEventListener("click", async () => {

      // Enable sound after the user clicks.
      video.muted = false;

      // Show the browser's video controls.
      video.controls = true;

      try {
        await video.play();
      } catch (error) {
        console.warn(
          "The video could not start playing:",
          error
        );
      }

    });

    video.addEventListener("volumechange", () => {

      if (!video.muted) {
        video.controls = true;
      }

    });

  });


  // Fallback for browsers without IntersectionObserver.
  if (!("IntersectionObserver" in window)) {

    videos.forEach((video) => {
      video.muted = true;
      video.play().catch(() => {});
    });

    return;
  }


  // Detect when videos enter or leave the screen.
  const videoObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        const video = entry.target;

        if (entry.isIntersecting) {

          // Pause other videos so only one plays at a time.
          videos.forEach((otherVideo) => {

            if (otherVideo !== video) {
              otherVideo.pause();
            }

          });

          // Automatically play the visible video.
          if (video.paused) {

            video.muted = true;

            video.play().catch(() => {
              // Browser may block autoplay.
            });

          }

        } else {

          // Pause video when it leaves the screen.
          video.pause();

        }

      });

    },
    {
      threshold: 0.5
    }
  );


  videos.forEach((video) => {
    videoObserver.observe(video);
  });

}


/* NAVIGATION MENU */

function setupNavigation() {

  const header = qs(".site-header");
  const menuToggle = qs(".menu-toggle");
  const navMenu = qs(".nav-menu");

  const updateHeader = () => {

    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 18
    );

  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  const closeMenu = () => {

    menuToggle.classList.remove("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    navMenu.classList.remove("is-open");

    document.body.classList.remove("menu-open");

  };


  menuToggle.addEventListener("click", () => {

    const isOpen =
      navMenu.classList.toggle("is-open");

    menuToggle.classList.toggle(
      "is-open",
      isOpen
    );

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );

  });


  qsa(".nav-menu a").forEach((link) => {

    link.addEventListener("click", closeMenu);

  });


  window.addEventListener("resize", () => {

    if (window.innerWidth > 760) {
      closeMenu();
    }

  });

}


/* SCROLL REVEAL ANIMATIONS */

function setupReveals() {

  const revealItems = qsa(".reveal");

  if (!("IntersectionObserver" in window)) {

    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

    return;
  }


  const observer = new IntersectionObserver(
    (entries, currentObserver) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("is-visible");

          currentObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px"
    }
  );


  revealItems.forEach((item) => {
    observer.observe(item);
  });

}


/* RUN WEBSITE FUNCTIONS */

setContactDetails();

renderPortfolio();

setupNavigation();

setupReveals();
