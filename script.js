document.addEventListener("DOMContentLoaded",()=>{
  const scrollWindow=document.getElementById("scrollWindow");
  const scrollButton=document.getElementById("scrollButton");
  const scrollClose=document.getElementById("scrollClose");
  const promptText=document.getElementById("scrollPromptText");
  const music=document.getElementById("music");
  const musicButton=document.getElementById("musicButton");
  const musicStatus=document.getElementById("musicStatus");
  const menuBtn=document.getElementById("menuBtn");
  const nav=document.getElementById("nav");

  function openScroll(){
    scrollWindow.classList.remove("closing");
    scrollWindow.classList.add("open");
    scrollButton.setAttribute("aria-expanded","true");
    promptText.textContent="Tap to roll the scroll closed";
  }
  function closeScroll(){
    scrollWindow.classList.add("closing");
    scrollWindow.classList.remove("open");
    scrollButton.setAttribute("aria-expanded","false");
    promptText.textContent="Tap the scroll to open";
    setTimeout(()=>scrollWindow.classList.remove("closing"),950);
  }
  scrollButton.addEventListener("click",()=>scrollWindow.classList.contains("open")?closeScroll():openScroll());
  scrollClose.addEventListener("click",closeScroll);

  musicButton.addEventListener("click",async()=>{
    if(music.paused){
      try{await music.play();musicButton.textContent="Ⅱ";musicStatus.textContent="Playing"}catch{}
    }else{
      music.pause();musicButton.textContent="♪";musicStatus.textContent="Paused";
    }
  });

  menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  const target=new Date("2026-08-15T19:30:00+05:30").getTime();
  function tick(){
    let d=target-Date.now(); if(d<0)d=0;
    const vals={days:Math.floor(d/86400000),hours:Math.floor((d%86400000)/3600000),minutes:Math.floor((d%3600000)/60000),seconds:Math.floor((d%60000)/1000)};
    Object.entries(vals).forEach(([id,v])=>document.getElementById(id).textContent=String(v).padStart(2,"0"));
  }
  tick();setInterval(tick,1000);

  function addPetal(){
    if(document.hidden||document.querySelectorAll(".petal").length>22)return;
    const p=document.createElement("span");p.className="petal";
    p.style.left=Math.random()*100+"vw";p.style.setProperty("--drift",(Math.random()-.5)*280+"px");
    p.style.animationDuration=7+Math.random()*6+"s";document.getElementById("petals").appendChild(p);
    setTimeout(()=>p.remove(),14000);
  }
  function addSpark(){
    if(document.hidden||document.querySelectorAll(".spark").length>22)return;
    const s=document.createElement("span");s.className="spark";s.style.left=Math.random()*100+"vw";
    s.style.animationDuration=5+Math.random()*5+"s";document.getElementById("dust").appendChild(s);setTimeout(()=>s.remove(),11000);
  }
  setInterval(addPetal,650);setInterval(addSpark,620);


  const openingGate = document.getElementById("openingGate");
  const openingButton = document.getElementById("openingButton");
  const openingBurst = document.getElementById("openingBurst");

  function createOpeningBurst() {
    if (!openingBurst) return;
    openingBurst.innerHTML = "";

    for (let i = 0; i < 24; i++) {
      const petal = document.createElement("span");
      petal.className = "opening-burst-petal";

      const angle = (Math.PI * 2 * i) / 24 + Math.random() * .24;
      const distance = 120 + Math.random() * 280;

      petal.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
      petal.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
      petal.style.setProperty("--r", `${Math.random() * 760 - 380}deg`);
      petal.style.animationDelay = `${Math.random() * .12}s`;

      openingBurst.appendChild(petal);
    }

    window.setTimeout(() => {
      openingBurst.innerHTML = "";
    }, 1800);
  }

  openingButton?.addEventListener("click", async () => {
    if (!openingGate || openingGate.classList.contains("is-opening")) return;

    openingGate.classList.add("is-opening");
    document.body.classList.remove("opening-locked");
    createOpeningBurst();

    try {
      if (music && music.paused) {
        await music.play();
        musicButton.textContent = "Ⅱ";
        musicStatus.textContent = "Playing";
      }
    } catch {}

    window.setTimeout(() => {
      openingGate.classList.add("is-open");
    }, 1550);
  });

});