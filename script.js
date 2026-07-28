const body = document.body;
const gate = document.getElementById("royalGate");
const openButton = document.getElementById("openInvitation");
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicToggle");
const musicPlayer = document.getElementById("musicPlayer");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const scrollButton = document.getElementById("openScroll");
const invitationScroll = document.getElementById("invitationScroll");

if (openButton && gate) {
  openButton.addEventListener("click", async () => {
    gate.classList.add("opened");
    body.classList.remove("is-locked");

    try {
      if (music) {
        await music.play();
        musicButton?.classList.add("is-playing");
        musicPlayer?.classList.add("playing");
        const icon = musicButton?.querySelector(".music-icon");
        if (icon) icon.textContent = "♫";
      }
    } catch {
      // Music can still be started manually.
    }

    setTimeout(() => gate.remove(), 450);
  });
}

if (musicButton && music) {
  musicButton.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        musicButton.classList.add("is-playing");
        musicPlayer?.classList.add("playing");
        const icon = musicButton.querySelector(".music-icon");
        if (icon) icon.textContent = "♫";
      } catch {
        alert("The browser blocked audio. Tap the music button once more.");
      }
    } else {
      music.pause();
      musicButton.classList.remove("is-playing");
      musicPlayer?.classList.remove("playing");
      const icon = musicButton.querySelector(".music-icon");
      if (icon) icon.textContent = "♪";
    }
  });
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (scrollButton && invitationScroll) {
  scrollButton.addEventListener("click", () => {
    const open = invitationScroll.classList.toggle("open");
    scrollButton.textContent = open ? "Close the Invitation" : "Read the Invitation";
  });
}

const target = new Date("2026-08-15T19:30:00+05:30").getTime();

function updateCountdown() {
  const countdown = document.getElementById("countdown");
  if (!countdown) return;

  const remaining = target - Date.now();

  if (remaining <= 0) {
    countdown.innerHTML =
      '<div class="count-box" style="min-width:min(90vw,620px)"><strong>Welcome</strong><span>It is celebration time</span></div>';
    return;
  }

  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };

  for (const [id, value] of Object.entries(values)) {
    const element = document.getElementById(id);
    if (element) element.textContent = String(value).padStart(2, "0");
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.querySelectorAll(".reveal").forEach(element => {
  element.classList.add("visible");
});
