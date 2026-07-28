const doors = document.getElementById("doors");
const openBtn = document.getElementById("openBtn");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const site = document.getElementById("site");

const invitationToggle = document.getElementById("invitationToggle");
const invitationModal = document.getElementById("invitationModal");
const closeInvitation = document.getElementById("closeInvitation");

const petalLayer = document.getElementById("petalLayer");
const dustLayer = document.getElementById("dustLayer");

if (openBtn && doors) {
  openBtn.addEventListener("click", async () => {
    doors.classList.add("open");
    document.body.classList.remove("locked");

    if (site && typeof site.animate === "function") {
      site.animate(
        [
          { opacity: 0, transform: "translateY(34px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 900, easing: "ease", fill: "both" }
      );
    }

    try {
      if (music) {
        await music.play();
        if (musicBtn) musicBtn.textContent = "Ⅱ";
        if (musicLabel) musicLabel.textContent = "Playing";
      }
    } catch {
      if (musicLabel) musicLabel.textContent = "Tap to play";
    }

    setTimeout(() => {
      doors.classList.add("hidden");
    }, 1350);
  });
}

if (musicBtn && music) {
  musicBtn.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        musicBtn.textContent = "Ⅱ";
        if (musicLabel) musicLabel.textContent = "Playing";
      } catch {
        if (musicLabel) musicLabel.textContent = "Tap again";
      }
    } else {
      music.pause();
      musicBtn.textContent = "♪";
      if (musicLabel) musicLabel.textContent = "Paused";
    }
  });
}

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

function openInvitationModal() {
  if (!invitationModal) return;
  invitationModal.classList.add("open");
  invitationModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeInvitationModal() {
  if (!invitationModal) return;
  invitationModal.classList.remove("open");
  invitationModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

if (invitationToggle) {
  invitationToggle.addEventListener("click", openInvitationModal);
}

if (closeInvitation) {
  closeInvitation.addEventListener("click", closeInvitationModal);
}

document.querySelectorAll("[data-close-invitation]").forEach(element => {
  element.addEventListener("click", closeInvitationModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeInvitationModal();
});

const target = new Date("2026-08-15T19:30:00+05:30").getTime();

function updateCountdown() {
  const remaining = target - Date.now();
  if (remaining <= 0) return;

  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };

  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = String(value).padStart(2, "0");
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

function addPetal() {
  if (!petalLayer || document.hidden || petalLayer.childElementCount >= 10) return;

  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 220}px`);
  petal.style.animationDuration = `${9 + Math.random() * 6}s`;
  petal.style.transform = `scale(${0.55 + Math.random() * 0.8})`;

  petalLayer.appendChild(petal);
  setTimeout(() => petal.remove(), 16000);
}

function addDust() {
  if (!dustLayer || document.hidden || dustLayer.childElementCount >= 14) return;

  const dust = document.createElement("span");
  dust.className = "gold-dust";
  dust.style.left = `${Math.random() * 100}vw`;
  dust.style.animationDuration = `${5 + Math.random() * 5}s`;
  dust.style.transform = `scale(${0.6 + Math.random()})`;

  dustLayer.appendChild(dust);
  setTimeout(() => dust.remove(), 11000);
}

setInterval(addPetal, 1500);
setInterval(addDust, 850);
