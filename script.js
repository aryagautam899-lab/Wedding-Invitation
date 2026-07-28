const body = document.body;
const preloader = document.getElementById("preloader");
const gate = document.getElementById("royalGate");
const openButton = document.getElementById("openInvitation");
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicToggle");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

window.addEventListener("load", () => {
  setTimeout(() => preloader.classList.add("hide"), 650);
});

openButton.addEventListener("click", async () => {
  gate.classList.add("opened");
  body.classList.remove("is-locked");

  try {
    await music.play();
    musicButton.classList.add("is-playing");
    musicButton.querySelector(".music-icon").textContent = "♫";
  } catch {
    // The website still works without a music file.
  }

  setTimeout(() => gate.remove(), 1500);
});

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.classList.add("is-playing");
      musicButton.querySelector(".music-icon").textContent = "♫";
    } catch {
      alert("Add your song as assets/music.mp3 first.");
    }
  } else {
    music.pause();
    musicButton.classList.remove("is-playing");
    musicButton.querySelector(".music-icon").textContent = "♪";
  }
});

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const target = new Date("2026-08-15T19:30:00+05:30").getTime();

function updateCountdown() {
  const remaining = target - Date.now();

  if (remaining <= 0) {
    document.getElementById("countdown").innerHTML =
      '<div class="count-box" style="min-width:min(90vw,620px)"><strong>Welcome</strong><span>It is celebration time</span></div>';
    return;
  }

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.animationDuration = `${8 + Math.random() * 7}s`;
  petal.style.transform = `scale(${0.55 + Math.random() * 0.9})`;
  petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 220}px`);
  document.getElementById("petalLayer").appendChild(petal);
  setTimeout(() => petal.remove(), 16000);
}
setInterval(createPetal, 850);

const cursorGlow = document.getElementById("cursorGlow");
window.addEventListener("pointermove", event => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

document.getElementById("rsvpForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const guests = document.getElementById("guestCount").value;
  const attendance = document.getElementById("attendance").value;
  const eventChoice = document.getElementById("eventChoice").value;
  const message = document.getElementById("guestMessage").value.trim();

  const text =
`Wedding RSVP — Bhavini & Tanveer

Guest: ${name}
Response: ${attendance}
Number of guests: ${guests}
Event(s): ${eventChoice}
Message: ${message || "No additional message"}`;

  const whatsappNumber = "917986503806";
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".gallery-tile").forEach(tile => {
  tile.addEventListener("click", () => {
    const img = tile.querySelector("img");
    if (!img || img.style.display === "none" || !img.complete || img.naturalWidth === 0) return;

    lightboxImage.src = tile.dataset.image;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeGallery() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}
closeLightbox.addEventListener("click", closeGallery);
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeGallery();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeGallery();
});


// Royal scroll invitation
const scrollButton = document.getElementById("openScroll");
const invitationScroll = document.getElementById("invitationScroll");
if (scrollButton && invitationScroll) {
  scrollButton.addEventListener("click", () => {
    const open = invitationScroll.classList.toggle("open");
    scrollButton.textContent = open ? "Close the Royal Invitation" : "Read the Royal Invitation";
  });
}

// Animate countdown digits when values change
["days","hours","minutes","seconds"].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  const observer = new MutationObserver(() => {
    el.classList.remove("flip");
    void el.offsetWidth;
    el.classList.add("flip");
  });
  observer.observe(el, { childList: true, characterData: true, subtree: true });
});

// Upgrade music player state
const musicPlayer = document.getElementById("musicPlayer");
if (music && musicPlayer) {
  music.addEventListener("play", () => musicPlayer.classList.add("playing"));
  music.addEventListener("pause", () => musicPlayer.classList.remove("playing"));
}

// Floating blessing message
const blessingToast = document.getElementById("blessingToast");
if (blessingToast) {
  setTimeout(() => {
    blessingToast.classList.add("show");
    setTimeout(() => blessingToast.classList.remove("show"), 5000);
  }, 9000);
}

// Natural sparkles and finale celebration
const sparkleLayer = document.getElementById("sparkleLayer");
function createSparkle(intense = false) {
  if (!sparkleLayer) return;
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.style.left = `${Math.random() * 100}vw`;
  sparkle.style.bottom = `${-5 + Math.random() * 12}vh`;
  sparkle.style.animationDuration = `${4 + Math.random() * 5}s`;
  sparkle.style.opacity = `${.25 + Math.random() * .7}`;
  sparkle.style.transform = `scale(${.5 + Math.random() * 1.4})`;
  sparkleLayer.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 10000);
  if (intense && Math.random() > .45) setTimeout(() => createSparkle(false), 100);
}
setInterval(() => createSparkle(false), 900);

const finale = document.getElementById("finale");
let finaleTriggered = false;
if (finale) {
  const finaleObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !finaleTriggered) {
      finaleTriggered = true;
      for (let i = 0; i < 32; i++) setTimeout(() => createSparkle(true), i * 75);
      for (let i = 0; i < 18; i++) setTimeout(createPetal, i * 120);
    }
  }, { threshold: .35 });
  finaleObserver.observe(finale);
}

// Improve petal variety
const originalCreatePetal = createPetal;
createPetal = function() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.animationDuration = `${8 + Math.random() * 8}s`;
  petal.style.setProperty("--drift", `${(Math.random() - .5) * 260}px`);
  petal.style.setProperty("--scale", `${.45 + Math.random() * 1.15}`);
  petal.style.opacity = `${.18 + Math.random() * .55}`;
  document.getElementById("petalLayer").appendChild(petal);
  setTimeout(() => petal.remove(), 17000);
};
