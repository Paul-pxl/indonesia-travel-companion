let deferredPrompt=null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt=e;
  const banner=document.getElementById('installBanner');
  if(banner) banner.style.display='grid';
});
async function installPWA(){
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt=null;
  const banner=document.getElementById('installBanner');
  if(banner) banner.style.display='none';
}
if('serviceWorker' in navigator){
  window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js'));
}
