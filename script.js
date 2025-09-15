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

// ============================
// Stats Section Counter Animation (5s, repeat on scroll)
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const counters = [
    { id: "users", target: 15230 },
    { id: "power", target: 4870 },
    { id: "withdrawals", target: 2340000 },
  ];
  const duration = 5000; // 5 seconds for all counters
  const statsSection = document.querySelector("#stats");
  const statsHeader = document.querySelector(".stats-header");
  let hasAnimated = false;

  function animateCounters() {
    counters.forEach(counter => {
      const el = document.getElementById(counter.id);
      let startTime = null;

      function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        el.textContent = Math.floor(progress * counter.target).toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }
      requestAnimationFrame(updateCounter);
    });

    // Animate the title + subtitle
    statsHeader.classList.add("show");
  }

  // Observer to trigger animation on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        hasAnimated = true;
      } else {
        // Reset when scrolling out so it repeats
        hasAnimated = false;
        statsHeader.classList.remove("show");
        counters.forEach(c => {
          document.getElementById(c.id).textContent = "0";
        });
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
});

// ============================
// Crypto ticker-list
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const tickerList = document.getElementById("ticker-list");
  const apiKey = "5cca0528-f4b7-4ea6-aebf-c8c6f441406d"; // your key
  const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10";

  // Fetch crypto data
  async function fetchCrypto() {
    try {
      const response = await fetch(url, {
        headers: { "X-CMC_PRO_API_KEY": apiKey },
      });
      const data = await response.json();

      // Clear existing list
      tickerList.innerHTML = "";

      // Add top 10 cryptos
      data.data.forEach(coin => {
        const li = document.createElement("li");
        const price = coin.quote.USD.price.toFixed(2);
        const change = coin.quote.USD.percent_change_24h.toFixed(2);
        const changeClass = change >= 0 ? "up" : "down";

        li.innerHTML = `
          <span class="coin">${coin.symbol}</span> 
          <span class="price">$${price}</span> 
          <span class="change ${changeClass}">${change}%</span>
        `;
        tickerList.appendChild(li);
      });

      // Duplicate list for smooth infinite scroll
      const clone = tickerList.cloneNode(true);
      tickerList.parentElement.appendChild(clone);

    } catch (error) {
      console.error("Error fetching crypto data:", error);
      tickerList.innerHTML = "<li>Unable to load live prices...</li>";
    }
  }

  // Initial fetch
  fetchCrypto();

  // Update every 60 seconds
  setInterval(fetchCrypto, 60000);
});
