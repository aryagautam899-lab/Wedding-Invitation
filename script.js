document.addEventListener("DOMContentLoaded",()=>{
  const gate=document.getElementById("gate"),openGate=document.getElementById("openGate");
  const music=document.getElementById("music"),musicBtn=document.getElementById("musicBtn"),musicText=document.getElementById("musicText");
  const scrollStage=document.querySelector(".scroll-stage"),scrollToggle=document.getElementById("scrollToggle"),scrollClose=document.getElementById("scrollClose"),scrollLabel=document.getElementById("scrollLabel");
  const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("nav");

  openGate.addEventListener("click",async()=>{
    gate.classList.add("open");
    document.body.classList.remove("locked");
    try{await music.play();musicBtn.textContent="Ⅱ";musicText.textContent="Playing"}catch{}
    setTimeout(()=>gate.classList.add("done"),1300);
  });

  function setScroll(open){
    scrollStage.classList.toggle("open",open);
    scrollToggle.setAttribute("aria-expanded",String(open));
    scrollLabel.textContent=open?"Tap to roll the scroll closed":"Tap the scroll to open";
  }
  scrollToggle.addEventListener("click",()=>setScroll(!scrollStage.classList.contains("open")));
  scrollClose.addEventListener("click",()=>setScroll(false));

  musicBtn.addEventListener("click",async()=>{
    if(music.paused){try{await music.play();musicBtn.textContent="Ⅱ";musicText.textContent="Playing"}catch{}}
    else{music.pause();musicBtn.textContent="♪";musicText.textContent="Paused"}
  });

  menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  const target=new Date("2026-08-15T19:30:00+05:30").getTime();
  function tick(){
    let d=target-Date.now(); if(d<0)d=0;
    const vals={days:Math.floor(d/86400000),hours:Math.floor((d%86400000)/3600000),minutes:Math.floor((d%3600000)/60000),seconds:Math.floor((d%60000)/1000)};
    for(const [id,v] of Object.entries(vals))document.getElementById(id).textContent=String(v).padStart(2,"0");
  }
  tick();setInterval(tick,1000);

  function petal(){
    if(document.hidden||document.querySelectorAll(".petal").length>22)return;
    const p=document.createElement("span");p.className="petal";
    p.style.left=Math.random()*100+"vw";p.style.setProperty("--drift",(Math.random()-.5)*280+"px");
    p.style.animationDuration=7+Math.random()*6+"s";document.getElementById("petals").appendChild(p);
    setTimeout(()=>p.remove(),14000);
  }
  function spark(){
    if(document.hidden||document.querySelectorAll(".spark").length>22)return;
    const s=document.createElement("span");s.className="spark";s.style.left=Math.random()*100+"vw";s.style.animationDuration=5+Math.random()*5+"s";document.getElementById("dust").appendChild(s);setTimeout(()=>s.remove(),11000);
  }
  setInterval(petal,650);setInterval(spark,620);
});