document.addEventListener("DOMContentLoaded", () => {
  const doors = document.getElementById("doors");
  const openBtn = document.getElementById("openBtn");
  const site = document.getElementById("site");

  const music = document.getElementById("music");
  const musicBtn = document.getElementById("musicBtn");
  const musicLabel = document.getElementById("musicLabel");

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  const invitationModal = document.getElementById("invitationModal");
  const invitationToggle = document.getElementById("invitationToggle");
  const closeInvitation = document.getElementById("closeInvitation");

  const petalLayer = document.getElementById("petalLayer");
  const dustLayer = document.getElementById("dustLayer");

  // Always begin at the opening doors.
  if (window.location.hash && window.location.hash !== "#invitationModal") {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);

  // Split-door opening.
  if (openBtn && doors) {
    openBtn.addEventListener("click", async () => {
      doors.classList.add("open");
      document.body.classList.remove("locked");
      history.replaceState(null, "", window.location.pathname + window.location.search);
      window.scrollTo(0, 0);

      if (site && typeof site.animate === "function") {
        site.animate(
          [
            { opacity: 0, transform: "translateY(34px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          {
            duration: 900,
            easing: "cubic-bezier(.2,.7,.2,1)",
            fill: "both"
          }
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

      window.setTimeout(() => {
        doors.classList.add("hidden");
      }, 1350);
    });
  }

  // Music control.
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

  // Mobile navigation.
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  // Invitation modal. CSS :target remains as a fallback.
  function syncInvitationModal() {
    const isOpen = window.location.hash === "#invitationModal";
    invitationModal?.classList.toggle("open", isOpen);
    invitationModal?.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("modal-open", isOpen);
  }

  invitationToggle?.addEventListener("click", () => {
    window.setTimeout(syncInvitationModal, 0);
  });

  closeInvitation?.addEventListener("click", () => {
    document.body.classList.remove("modal-open");
  });

  document.querySelectorAll("[data-close-invitation]").forEach(element => {
    element.addEventListener("click", () => {
      document.body.classList.remove("modal-open");
    });
  });

  window.addEventListener("hashchange", syncInvitationModal);
  syncInvitationModal();

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && window.location.hash === "#invitationModal") {
      window.location.hash = "home";
    }
  });

  // Countdown.
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
  window.setInterval(updateCountdown, 1000);

  // Lightweight petals and gold dust, capped for performance.
  function addPetal() {
    if (!petalLayer || document.hidden || petalLayer.childElementCount >= 10) return;

    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 220}px`);
    petal.style.animationDuration = `${9 + Math.random() * 6}s`;
    petal.style.transform = `scale(${0.55 + Math.random() * 0.8})`;

    petalLayer.appendChild(petal);
    window.setTimeout(() => petal.remove(), 16000);
  }

  function addDust() {
    if (!dustLayer || document.hidden || dustLayer.childElementCount >= 14) return;

    const dust = document.createElement("span");
    dust.className = "gold-dust";
    dust.style.left = `${Math.random() * 100}vw`;
    dust.style.animationDuration = `${5 + Math.random() * 5}s`;
    dust.style.transform = `scale(${0.6 + Math.random()})`;

    dustLayer.appendChild(dust);
    window.setTimeout(() => dust.remove(), 11000);
  }

  window.setInterval(addPetal, 1500);
  window.setInterval(addDust, 850);
});
