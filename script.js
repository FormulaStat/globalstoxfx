/* =========================
   Navbar Interactions
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const nav = document.querySelector(".navbar");

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu on link click (mobile)
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // Change navbar background on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
});

/* =========================
   Floating WhatsApp Chat
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.getElementById("chat-toggle");
  const chatBox = document.getElementById("chat-box");
  const chatClose = document.getElementById("chat-close");

  // Open chat
  chatToggle.addEventListener("click", () => {
    const isHidden = chatBox.getAttribute("aria-hidden") === "true";
    chatBox.setAttribute("aria-hidden", isHidden ? "false" : "true");
  });

  // Close chat
  chatClose.addEventListener("click", () => {
    chatBox.setAttribute("aria-hidden", "true");
  });
});

/* =========================
   Hero Video Control
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const heroVideo = document.querySelector(".hero-video");
  
  if (heroVideo) {
    heroVideo.addEventListener("error", () => {
      console.warn("Hero video failed to load, fallback to poster.");
      heroVideo.poster = "/images/hero-poster.jpg";
    });
  }
});

/* =========================
   AOS Init
========================= */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1200,  // smooth fade speed
      once: true,      // animation runs once
      offset: 80       // trigger a bit earlier
    });
  }
});

// Stats Counter Animation
function animateCounter(id, target, duration = 5000) {
  const el = document.getElementById(id);
  let start = 0;
  const steps = Math.ceil(duration / 30); // smooth steps
  const increment = target / steps;

  el.textContent = "0"; // reset before animating

  let count = 0;
  const timer = setInterval(() => {
    start += increment;
    count++;
    if (count >= steps) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString();
    }
  }, 30);
}

// Observer to restart counters each time section enters view
document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.getElementById("stats");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter("users", 12500, 5000);
          animateCounter("power", 87650, 5000);
          animateCounter("withdrawals", 1543200, 5000);
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(statsSection);
});
