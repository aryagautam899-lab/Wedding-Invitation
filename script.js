const intro = document.getElementById("intro");
const openInvite = document.getElementById("openInvite");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

document.body.classList.add("locked");

openInvite.addEventListener("click", async () => {
  intro.classList.add("hide");
  document.body.classList.remove("locked");

  try {
    if (music.querySelector("source")?.getAttribute("src")) {
      await music.play();
      musicToggle.classList.add("playing");
      musicToggle.textContent = "♫";
    }
  } catch {
    // Browsers may block autoplay if no music file exists or permission is denied.
  }

  setTimeout(() => intro.remove(), 1100);
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add("playing");
      musicToggle.textContent = "♫";
    } catch {
      alert("Add your music file as assets/music.mp3 first.");
    }
  } else {
    music.pause();
    musicToggle.classList.remove("playing");
    musicToggle.textContent = "♪";
  }
});

menuBtn.addEventListener("click", () => navMenu.classList.toggle("open"));
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

const targetDate = new Date("2026-08-15T19:30:00+05:30").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML =
      "<div style='grid-column:1/-1'><strong>It’s Celebration Time!</strong><span>Welcome</span></div>";
    return;
  }

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.opacity = (0.25 + Math.random() * 0.55).toFixed(2);
  petal.style.animationDuration = (7 + Math.random() * 7) + "s";
  petal.style.setProperty("--drift", ((Math.random() - 0.5) * 180) + "px");
  document.getElementById("petals").appendChild(petal);
  setTimeout(() => petal.remove(), 15000);
}

setInterval(createPetal, 850);

document.getElementById("rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const count = document.getElementById("guestCount").value;
  const eventChoice = document.getElementById("eventChoice").value;
  const message = document.getElementById("guestMessage").value.trim();

  const rsvpText =
`Wedding RSVP
Guest: ${name}
Number of guests: ${count}
Attending: ${eventChoice}
Message: ${message || "No additional message"}`;

  // Replace this number if you want RSVPs to go to a different WhatsApp number.
  const whatsappNumber = "917986503806";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rsvpText)}`;
  window.open(url, "_blank", "noopener");
});
