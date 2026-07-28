document.addEventListener("DOMContentLoaded", () => {
  const doorToggle = document.getElementById("doorToggle");
  const openLabel = document.getElementById("openBtn");

  const music = document.getElementById("music");
  const musicBtn = document.getElementById("musicBtn");
  const musicLabel = document.getElementById("musicLabel");

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  const invitationModal = document.getElementById("invitationModal");
  const invitationToggle = document.getElementById("invitationToggle");

  const petalLayer = document.getElementById("petalLayer");
  const dustLayer = document.getElementById("dustLayer");

  window.scrollTo(0, 0);

  // Keyboard accessibility for the label.
  openLabel?.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      doorToggle.checked = true;
      doorToggle.dispatchEvent(new Event("change"));
    }
  });

  // Music is the only enhancement attached to opening.
  doorToggle?.addEventListener("change", async () => {
    if (!doorToggle.checked) return;

    document.body.classList.remove("locked");
    window.scrollTo(0, 0);

    try {
      await music?.play();
      if (musicBtn) musicBtn.textContent = "Ⅱ";
      if (musicLabel) musicLabel.textContent = "Playing";
    } catch {
      if (musicLabel) musicLabel.textContent = "Tap to play";
    }
  });

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
    menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  // Invitation modal uses CSS :target, so it also works without JS.
  function syncModal() {
    const open = window.location.hash === "#invitationModal";
    invitationModal?.classList.toggle("open", open);
    invitationModal?.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("modal-open", open);
  }

  invitationToggle?.addEventListener("click", () => {
    window.setTimeout(syncModal, 0);
  });
  window.addEventListener("hashchange", syncModal);
  syncModal();

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && window.location.hash === "#invitationModal") {
      window.location.hash = "home";
    }
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
      const el = document.getElementById(id);
      if (el) el.textContent = String(value).padStart(2, "0");
    });
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  function addPetal() {
    if (!petalLayer || document.hidden || petalLayer.childElementCount >= 10) return;
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.setProperty("--drift", `${(Math.random() - .5) * 220}px`);
    petal.style.animationDuration = `${9 + Math.random() * 6}s`;
    petalLayer.appendChild(petal);
    window.setTimeout(() => petal.remove(), 16000);
  }

  function addDust() {
    if (!dustLayer || document.hidden || dustLayer.childElementCount >= 14) return;
    const dust = document.createElement("span");
    dust.className = "gold-dust";
    dust.style.left = `${Math.random() * 100}vw`;
    dust.style.animationDuration = `${5 + Math.random() * 5}s`;
    dustLayer.appendChild(dust);
    window.setTimeout(() => dust.remove(), 11000);
  }

  window.setInterval(addPetal, 1500);
  window.setInterval(addDust, 850);
});
