const opening=document.getElementById("opening");
const enterBtn=document.getElementById("enterBtn");
const music=document.getElementById("music");
const musicButton=document.getElementById("musicButton");
const musicState=document.getElementById("musicState");
const menuButton=document.getElementById("menuButton");
const nav=document.getElementById("nav");

enterBtn.addEventListener("click",async()=>{
  opening.classList.add("hide");
  document.body.classList.remove("locked");
  try{
    await music.play();
    musicButton.textContent="Ⅱ";
    musicState.textContent="Playing";
  }catch{
    musicState.textContent="Tap to play";
  }
});

musicButton.addEventListener("click",async()=>{
  if(music.paused){
    try{
      await music.play();
      musicButton.textContent="Ⅱ";
      musicState.textContent="Playing";
    }catch{
      musicState.textContent="Tap again";
    }
  }else{
    music.pause();
    musicButton.textContent="♪";
    musicState.textContent="Paused";
  }
});

menuButton.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(open));
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const target=new Date("2026-08-15T19:30:00+05:30").getTime();
function tick(){
  const d=target-Date.now();
  if(d<=0)return;
  const vals={
    days:Math.floor(d/86400000),
    hours:Math.floor((d%86400000)/3600000),
    minutes:Math.floor((d%3600000)/60000),
    seconds:Math.floor((d%60000)/1000)
  };
  for(const [id,val] of Object.entries(vals)){
    const el=document.getElementById(id);
    if(el)el.textContent=String(val).padStart(2,"0");
  }
}
tick();
setInterval(tick,1000);
