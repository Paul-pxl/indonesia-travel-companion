if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));}

(function(){
  let startX=0, startY=0, endX=0;
  const threshold=70;
  document.addEventListener('touchstart', function(e){
    if(!e.touches || e.touches.length!==1) return;
    startX=e.touches[0].clientX; startY=e.touches[0].clientY;
  }, {passive:true});
  document.addEventListener('touchend', function(e){
    if(!startX) return;
    const t=e.changedTouches[0]; endX=t.clientX;
    const dx=endX-startX; const dy=t.clientY-startY;
    if(Math.abs(dx)>threshold && Math.abs(dx)>Math.abs(dy)*1.5){
      const prev=document.body.dataset.prev;
      const next=document.body.dataset.next;
      if(dx>0 && prev){ window.location.href=prev; }
      if(dx<0 && next){ window.location.href=next; }
    }
    startX=0; startY=0;
  }, {passive:true});
})();
