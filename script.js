window.onload = () => {
  // SPLASH 2 DETIK LANGSUNG HILANG
  if(document.getElementById('splash')) {
    setTimeout(() => {
      document.getElementById('splash').style.opacity = '0';
      document.getElementById('splash').style.transition = '0.3s';
      setTimeout(() => {
        document.getElementById('splash').style.display = 'none';
        document.getElementById('loginPage').style.display = 'block';
      }, 300);
    }, 2000);
  }

  // DASHBOARD
  if(window.location.href.includes('dashboard')) {
    const nik = sessionStorage.getItem('nik');
    if(!nik) window.location.href = 'index.html';
    else loadDashboard(nik);
  }

  // PWA
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
}

// Sisanya sama kayak kode sebelumnya...
