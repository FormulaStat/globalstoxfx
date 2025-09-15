// ============================
// Navbar Script
// ============================

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("open");
});

// Highlight active link on click
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navItems.forEach((el) => el.classList.remove("active"));
    link.classList.add("active");

    // Close menu after click (for mobile)
    navLinks.classList.remove("active");
    menuToggle.classList.remove("open");
  });
});

// Highlight link on scroll
window.addEventListener("scroll", () => {
  let current = "";

  document.querySelectorAll("section[id]").forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href").includes(current)) {
      a.classList.add("active");
    }
  });
});

// ============================
// Hero Section Script
// ============================

// Ensure hero video fallback works
const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {
  heroVideo.addEventListener("error", () => {
    console.warn("Hero video failed to load, showing poster instead.");
    heroVideo.style.display = "none";
  });
}

// Smooth scroll for hero buttons
document.querySelectorAll(".hero-actions a").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = btn.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70, // adjust for navbar height
        behavior: "smooth",
      });
    }
  });
});                              

// ============================
// About Section Script
// ============================

// AOS (Animate On Scroll) initialization
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
  });
}

// Optional: Scroll reveal for About section elements
const aboutSection = document.getElementById("about");
if (aboutSection) {
  window.addEventListener("scroll", () => {
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      aboutSection.classList.add("show");
    }
  });
}
