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
  const steps = Math.ceil(duration / 30);
  const increment = target / steps;

  el.textContent = "0";
  el.style.transition = "transform 0.3s ease";

  let count = 0;
  const timer = setInterval(() => {
    start += increment;
    count++;
    el.style.transform = "rotateX(20deg)"; // flip effect
    setTimeout(() => {
      el.style.transform = "rotateX(0deg)";
    }, 150);

    if (count >= steps) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString();
    }
  }, 30);
}

// Observer: restart counters on scroll
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

// Crypto Ticker Live Data
document.addEventListener('DOMContentLoaded', () => {
  const tickerList = document.getElementById('ticker-list');
  const wrapper = document.getElementById('ticker-wrapper');
  const apiKey = '5cca0528-f4b7-4ea6-aebf-c8c6f441406d';
  let lastPrices = {};

  async function fetchPrices() {
    try {
      const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20&convert=USD', {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();

      tickerList.innerHTML = '';

      data.data.forEach(coin => {
        const li = document.createElement('li');
        const price = coin.quote.USD.price.toFixed(2);

        if (lastPrices[coin.symbol]) {
          if (price > lastPrices[coin.symbol]) li.style.color = 'limegreen';
          else if (price < lastPrices[coin.symbol]) li.style.color = 'red';
          else li.style.color = '#fff';
        }

        li.textContent = `${coin.symbol}: $${price}`;
        tickerList.appendChild(li);

        lastPrices[coin.symbol] = price;
      });

      // Duplicate for continuous scrolling
      if (!document.querySelector('#ticker-list-clone')) {
        const clone = tickerList.cloneNode(true);
        clone.id = 'ticker-list-clone';
        wrapper.appendChild(clone);
      }

      startScroll();

    } catch (err) {
      console.error(err);
      tickerList.innerHTML = '<li>Failed to load prices.</li>';
    }
  }

  function startScroll() {
    wrapper.style.animation = 'ticker-scroll 30s linear infinite';
  }

  fetchPrices();
  setInterval(fetchPrices, 10000);
});


// What We Do: expandable cards (smooth animations, single open at a time, accessible)
document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.what-card'));

  if (!cards.length) return;

  // initialize aria attributes
  cards.forEach(card => {
    const longText = card.querySelector('.long-text');
    const btn = card.querySelector('.toggle-btn');
    if (!longText || !btn) return;
    longText.style.display = 'none';
    longText.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('type', 'button');
  });

  // helpers
  function openCard(card) {
    const longText = card.querySelector('.long-text');
    const btn = card.querySelector('.toggle-btn');
    if (!longText || !btn) return;

    // close others
    cards.forEach(c => { if (c !== card) closeCard(c); });

    // reveal
    longText.style.display = 'block';              // enable measuring
    const fullHeight = longText.scrollHeight + 'px';
    // force reflow for reliable transition
    longText.style.maxHeight = '0px';
    window.getComputedStyle(longText).maxHeight;
    longText.style.opacity = '1';
    longText.style.maxHeight = fullHeight;
    card.classList.add('open');
    longText.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = 'Read Less';
  }

  function closeCard(card) {
    const longText = card.querySelector('.long-text');
    const btn = card.querySelector('.toggle-btn');
    if (!longText || !btn) return;
    // smoothly collapse
    longText.style.maxHeight = longText.scrollHeight + 'px';
    window.getComputedStyle(longText).maxHeight;
    longText.style.opacity = '0';
    longText.style.maxHeight = '0px';
    // after transition, hide
    const handler = (e) => {
      if (e.propertyName === 'max-height') {
        longText.style.display = 'none';
        longText.removeEventListener('transitionend', handler);
      }
    };
    longText.addEventListener('transitionend', handler);
    card.classList.remove('open');
    longText.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Read More';
  }

  // attach handlers
  cards.forEach(card => {
    const btn = card.querySelector('.toggle-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (card.classList.contains('open')) {
        closeCard(card);
      } else {
        openCard(card);
      }
    });

    // accessibility: open with Enter/Space when focused
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
});
