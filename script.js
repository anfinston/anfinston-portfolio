// script.js

document.addEventListener("DOMContentLoaded", () => {
  /* ==== DARK MODE TOGGLE ==== */
  const body = document.body;
  const toggleBtn = document.getElementById("theme-toggle");
  const toggleIcon = document.querySelector(".theme-icon");

  function applyTheme(dark) {
    body.classList.toggle("dark-mode", dark);
    if (dark) {
      toggleIcon.textContent = "☀️";
    } else {
      toggleIcon.textContent = "🌙";
    }
  }

  // Load preference
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  let dark = storedTheme
    ? storedTheme === "dark"
    : prefersDark;

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
      {
        threshold: 0.15,
      }
    );
    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    fadeEls.forEach(el => el.classList.add("visible"));
  }

  /* ==== SIMPLE PARALLAX FOR HERO RIGHT PANEL ==== */
  const heroRight = document.querySelector(".hero-right");
  const parallaxStrength = 0.15; // smaller = subtle

  if (heroRight) {
    window.addEventListener("scroll", () => {
      const offset = window.scrollY * parallaxStrength;
      heroRight.style.transform = `translateY(${offset}px)`;
    });
  }
});
