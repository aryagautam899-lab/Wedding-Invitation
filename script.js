document.addEventListener("DOMContentLoaded",()=>{
  const doorToggle=document.getElementById("doorToggle");
  const openLabel=document.getElementById("openBtn");
  const music=document.getElementById("music");
  const musicBtn=document.getElementById("musicBtn");
  const musicLabel=document.getElementById("musicLabel");
  const menuBtn=document.getElementById("menuBtn");
  const nav=document.getElementById("nav");
  const petalLayer=document.getElementById("petalLayer");
  const dustLayer=document.getElementById("dustLayer");

  window.scrollTo(0,0);

  openLabel?.addEventListener("keydown",e=>{
    if(e.key==="Enter"||e.key===" "){
      e.preventDefault();
      doorToggle.checked=true;
      doorToggle.dispatchEvent(new Event("change"));
    }
  });

  doorToggle?.addEventListener("change",async()=>{
    if(!doorToggle.checked)return;
    document.body.classList.remove("locked");
    try{
      await music?.play();
      if(musicBtn)musicBtn.textContent="Ⅱ";
      if(musicLabel)musicLabel.textContent="Playing";
    }catch{
      if(musicLabel)musicLabel.textContent="Tap to play";
    }
  });

  musicBtn?.addEventListener("click",async()=>{
    if(!music)return;
    if(music.paused){
      try{
        await music.play();
        musicBtn.textContent="Ⅱ";
        musicLabel.textContent="Playing";
      }catch{musicLabel.textContent="Tap again"}
    }else{
      music.pause();
      musicBtn.textContent="♪";
      musicLabel.textContent="Paused";
    }
  });

  menuBtn?.addEventListener("click",()=>nav?.classList.toggle("open"));
  nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  const target=new Date("2026-08-15T19:30:00+05:30").getTime();
  function tick(){
    const d=target-Date.now();
    if(d<=0)return;
    const vals={days:Math.floor(d/86400000),hours:Math.floor((d%86400000)/3600000),minutes:Math.floor((d%3600000)/60000),seconds:Math.floor((d%60000)/1000)};
    Object.entries(vals).forEach(([id,val])=>{
      const el=document.getElementById(id);
      if(el)el.textContent=String(val).padStart(2,"0");
    });
  }
  tick();
  setInterval(tick,1000);

  function addPetal(){
    if(!petalLayer||document.hidden||petalLayer.childElementCount>=28)return;
    const p=document.createElement("span");
    p.className="petal";
    p.style.left=`${Math.random()*100}vw`;
    p.style.setProperty("--drift",`${(Math.random()-.5)*300}px`);
    p.style.animationDuration=`${7+Math.random()*6}s`;
    p.style.transform=`scale(${.85+Math.random()*1.1})`;
    petalLayer.appendChild(p);
    setTimeout(()=>p.remove(),14000);
  }
  function addDust(){
    if(!dustLayer||document.hidden||dustLayer.childElementCount>=26)return;
    const d=document.createElement("span");
    d.className="gold-dust";
    d.style.left=`${Math.random()*100}vw`;
    d.style.animationDuration=`${5+Math.random()*5}s`;
    dustLayer.appendChild(d);
    setTimeout(()=>d.remove(),11000);
  }
  setInterval(addPetal,520);
  setInterval(addDust,560);


  const bokehLayer = document.getElementById("bokehLayer");
  const openingBurst = document.getElementById("openingBurst");

  function burstPetals() {
    if (!openingBurst) return;
    openingBurst.innerHTML = "";
    for (let i = 0; i < 22; i++) {
      const p = document.createElement("span");
      p.className = "burst-petal";
      const angle = (Math.PI * 2 * i) / 22 + Math.random() * .28;
      const distance = 120 + Math.random() * 270;
      p.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
      p.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
      p.style.setProperty("--r", `${Math.random() * 760 - 380}deg`);
      p.style.animationDelay = `${Math.random() * .12}s`;
      openingBurst.appendChild(p);
    }
    window.setTimeout(() => { openingBurst.innerHTML = ""; }, 1800);
  }

  doorToggle?.addEventListener("change", () => {
    if (doorToggle.checked) burstPetals();
  });

  function addBokeh() {
    if (!bokehLayer || document.hidden || bokehLayer.childElementCount >= 18) return;
    const b = document.createElement("span");
    b.className = "bokeh";
    b.style.left = `${Math.random() * 100}vw`;
    b.style.setProperty("--drift", `${(Math.random() - .5) * 160}px`);
    b.style.animationDuration = `${7 + Math.random() * 7}s`;
    b.style.transform = `scale(${.55 + Math.random() * 1.3})`;
    bokehLayer.appendChild(b);
    window.setTimeout(() => b.remove(), 15000);
  }

  window.setInterval(addBokeh, 800);

  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }),
    { threshold: .12 }
  );

  document.querySelectorAll(".reveal-section").forEach(section => observer.observe(section));

  // Lightweight parallax on desktop only.
  if (window.matchMedia("(min-width: 901px)").matches) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      document.querySelectorAll(".hero-foreground").forEach((el, index) => {
        el.style.transform = `${index ? "scaleX(-1) " : ""}translateY(${Math.min(35, y * .06)}px)`;
      });
      const hero = document.querySelector(".hero");
      if (hero) hero.style.backgroundPosition = `center calc(46% + ${Math.min(40, y * .035)}px)`;
    }, { passive: true });
  }

});