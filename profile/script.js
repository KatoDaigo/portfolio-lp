"use strict";

document.body.classList.add("loading");

const pageLoader = document.getElementById("pageLoader");
const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

window.addEventListener("load", () => {
  setTimeout(() => {
    pageLoader.classList.add("hide");
    document.body.classList.remove("loading");
  }, 650);
});

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuButton.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuButton.classList.remove("open");
  });
});

const handleScroll = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;

  if (scrollTop > 60) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }

  if (scrollTop > 600) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
};

window.addEventListener("scroll", handleScroll);
handleScroll();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const hero = document.querySelector(".hero");

window.addEventListener("mousemove", (event) => {
  if (!hero) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 16;
  const y = (event.clientY / window.innerHeight - 0.5) * 16;

  hero.style.setProperty("--move-x", `${x}px`);
  hero.style.setProperty("--move-y", `${y}px`);
});

const cards = document.querySelectorAll(
  ".promise-card, .service-card, .flow-card, .recommend-item"
);

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.willChange = "transform";
  });

  card.addEventListener("mouseleave", () => {
    card.style.willChange = "auto";
  });
});