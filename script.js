document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  // theme: default light, but respect saved preference
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
  updateThemeIcon();

  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    const span = document.querySelector(".theme-icon");
    if (!span) return;
    span.textContent = document.body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";
  }

  // mobile menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  // Fade-in animation
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

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  // Gentle parallax only on desktop (no overlap on mobile)
  const heroRight = document.querySelector(".hero-right");
  function handleScroll() {
    if (!heroRight) return;
    if (window.innerWidth < 768) {
      heroRight.style.transform = "translateY(0px)";
      return;
    }
    const offset = window.scrollY * 0.06;
    heroRight.style.transform = `translateY(${offset}px)`;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
});
