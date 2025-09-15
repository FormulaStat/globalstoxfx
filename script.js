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
