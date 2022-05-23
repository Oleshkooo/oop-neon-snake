const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}