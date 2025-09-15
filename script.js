// ============================
// Navbar Scroll Effect
// ============================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

// ============================
// Navbar Mobile Menu Toggle
// ============================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu on link click (better UX on mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// ============================
// Hero Section Fade-in on Load
// ============================
window.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    setTimeout(() => {
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }, 400);
  }
});

// ============================
// Smooth Scroll for Anchor Links
// ============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.startsWith("#") && targetId.length > 1) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// ============================
// Initialize AOS (Animate on Scroll)
// ============================
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1200,
    once: true,
  });
}

// ============================
// About Section Animations
// ============================
window.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector("#about");
  const tagline = document.querySelector(".about-tagline");

  if (aboutSection && tagline) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tagline.classList.add("show");
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(aboutSection);
  }
});
