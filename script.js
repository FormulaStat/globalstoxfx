/* =========================
   Navbar Menu Toggle
========================= */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* =========================
   Read More Toggle
========================= */
document.querySelectorAll(".what-card .toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const longText = btn.previousElementSibling;
    if (longText.style.display === "block") {
      longText.style.display = "none";
      btn.textContent = "Read More";
    } else {
      longText.style.display = "block";
      btn.textContent = "Read Less";
    }
  });
});

/* =========================
   WhatsApp Chat Toggle
========================= */
const chatToggle = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-box");
const chatClose = document.getElementById("chat-close");

chatToggle.addEventListener("click", () => {
  chatBox.style.display =
    chatBox.style.display === "block" ? "none" : "block";
});

chatClose.addEventListener("click", () => {
  chatBox.style.display = "none";
});

/* =========================
   Stats Counter Animation
========================= */
function animateValue(id, start, end, duration) {
  let obj = document.getElementById(id);
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let timer = setInterval(() => {
    current += increment;
    obj.textContent = current.toLocaleString();
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Example animated stats
window.addEventListener("load", () => {
  animateValue("users", 0, 50000, 2000);
  animateValue("power", 0, 12000, 2500);
  animateValue("withdrawals", 0, 3500000, 3000);
});

/* =========================
   Crypto Ticker (CoinMarketCap API)
========================= */
const apiKey = "5cca0528-f4b7-4ea6-aebf-c8c6f441406d";
const tickerList = document.getElementById("ticker-list");

async function fetchCryptoData() {
  try {
    const res = await fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10",
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
      }
    );
    const data = await res.json();
    tickerList.innerHTML = "";
    data.data.forEach((coin) => {
      const li = document.createElement("li");
      li.textContent = `${coin.name} (${coin.symbol}): $${coin.quote.USD.price.toFixed(
        2
      )}`;
      tickerList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    tickerList.innerHTML =
      "<li>Unable to load live prices at the moment.</li>";
  }
}

// Fetch on load + refresh every 60s
fetchCryptoData();
setInterval(fetchCryptoData, 60000);
