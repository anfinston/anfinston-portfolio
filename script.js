// script.js

document.addEventListener("DOMContentLoaded", () => {
  /* ==== DARK MODE TOGGLE ==== */
  const body = document.body;
  const toggleBtn = document.getElementById("theme-toggle");
  const toggleIcon = document.querySelector(".theme-icon");

  function applyTheme(dark) {
    body.classList.toggle("dark-mode", dark);
    if (toggleIcon) {
      toggleIcon.textContent = dark ? "☀️" : "🌙";
    }
  }

  // Default is LIGHT mode unless user previously selected dark
  const storedTheme = localStorage.getItem("theme");
  let dark = storedTheme ? storedTheme === "dark" : false;
  applyTheme(dark);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      dark = !dark;
      applyTheme(dark);
      localStorage.setItem("theme", dark ? "dark" : "light");
    });
  }

  /* ==== FADE-IN ON SCROLL ==== */
  const fadeEls = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window && fadeEls.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add("visible"));
  }

  /* ==== PARALLAX ON DESKTOP ONLY ==== */
  const heroRight = document.querySelector(".hero-right");
  const strength = 0.12; // parallax intensity
  const maxShift = 80; // px

  function parallaxEnabled() {
    return window.innerWidth >= 992; // desktop only
  }

  function updateParallax() {
    if (!heroRight) return;
    if (!parallaxEnabled()) {
      heroRight.style.transform = "translateY(0)";
      return;
    }
    const offset = Math.min(window.scrollY * strength, maxShift);
    heroRight.style.transform = `translateY(${offset}px)`;
  }

  if (heroRight) {
    window.addEventListener("scroll", updateParallax);
    window.addEventListener("resize", updateParallax);
    updateParallax();
  }
});
