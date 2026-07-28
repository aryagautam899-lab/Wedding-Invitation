const doors=document.getElementById("doors");
const openBtn=document.getElementById("openBtn");
const music=document.getElementById("music");
const musicBtn=document.getElementById("musicBtn");
const musicLabel=document.getElementById("musicLabel");
const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("nav");
const site=document.getElementById("site");

openBtn.addEventListener("click",async()=>{
  doors.classList.add("open");
  document.body.classList.remove("locked");
  site.animate(
    [{opacity:0,transform:"translateY(34px)"},{opacity:1,transform:"translateY(0)"}],
    {duration:900,easing:"ease",fill:"both"}
  );
  try{
    await music.play();
    musicBtn.textContent="Ⅱ";
    musicLabel.textContent="Playing";
  }catch{
    musicLabel.textContent="Tap to play";
  }
  setTimeout(()=>{
    doors.classList.add("hidden");
  },1350);
});

musicBtn.addEventListener("click",async()=>{
  if(music.paused){
    try{
      await music.play();
      musicBtn.textContent="Ⅱ";
      musicLabel.textContent="Playing";
    }catch{
      musicLabel.textContent="Tap again";
    }
  }else{
    music.pause();
    musicBtn.textContent="♪";
    musicLabel.textContent="Paused";
  }
});

menuBtn.addEventListener("click",()=>{
  nav.classList.toggle("open");
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const target=new Date("2026-08-15T19:30:00+05:30").getTime();
function updateCountdown(){
  const d=target-Date.now();
  if(d<=0)return;
  const values={
    days:Math.floor(d/86400000),
    hours:Math.floor((d%86400000)/3600000),
    minutes:Math.floor((d%3600000)/60000),
    seconds:Math.floor((d%60000)/1000)
  };
  Object.entries(values).forEach(([id,val])=>{
    const el=document.getElementById(id);
    if(el)el.textContent=String(val).padStart(2,"0");
  });
}
updateCountdown();
setInterval(updateCountdown,1000);
