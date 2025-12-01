// script.js
document.addEventListener("DOMContentLoaded", function () {
  /* ---------- YEAR IN FOOTER ---------- */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ---------- THEME TOGGLE (LIGHT / DARK) ---------- */
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");

  function applyTheme(mode) {
    if (mode === "dark") {
      root.classList.add("dark-theme");
      if (themeIcon) themeIcon.textContent = "🌙";
    } else {
      root.classList.remove("dark-theme");
      if (themeIcon) themeIcon.textContent = "☀️";
    }
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDarkNow = root.classList.toggle("dark-theme");
      const mode = isDarkNow ? "dark" : "light";
      localStorage.setItem("theme", mode);
      if (themeIcon) themeIcon.textContent = isDarkNow ? "🌙" : "☀️";
    });
  }

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-links");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");
      navToggle.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.classList.remove("active");
      });
    });
  }

  /* ---------- SIMPLE FADE-IN ON SCROLL ---------- */
  const fadeEls = document.querySelectorAll(".fade-section, .card, .hero-main");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // fallback
    fadeEls.forEach((el) => el.classList.add("visible"));
  }
});
