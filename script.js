const body = document.body;
const entry = document.getElementById("entry");
const openInvitation = document.getElementById("openInvitation");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicStatus = document.getElementById("musicStatus");
const menuButton = document.getElementById("menuButton");
const siteNav = document.getElementById("siteNav");

openInvitation.addEventListener("click", async () => {
  entry.classList.add("hide");
  body.classList.remove("locked");
  try {
    await music.play();
    musicToggle.textContent = "Ⅱ";
    musicStatus.textContent = "Playing";
  } catch {
    musicStatus.textContent = "Tap to play";
  }
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "Ⅱ";
      musicStatus.textContent = "Playing";
    } catch {
      musicStatus.textContent = "Unable to play";
    }
  } else {
    music.pause();
    musicToggle.textContent = "♪";
    musicStatus.textContent = "Paused";
  }
});

menuButton.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

siteNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const target = new Date("2026-08-15T19:30:00+05:30").getTime();

function updateCountdown() {
  const distance = target - Date.now();
  if (distance <= 0) {
    document.querySelector(".countdown").innerHTML =
      "<div style='grid-column:1/-1'><strong>Welcome</strong><span>It is celebration time</span></div>";
    return;
  }

  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000)
  };

  for (const [id, value] of Object.entries(values)) {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);
