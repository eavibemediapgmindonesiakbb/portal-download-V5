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
function handleLogin() {
  const nik = document.getElementById('nik').value;
  const pass = document.getElementById('password').value;
  
  if(!nik || !pass) {
    alert('NIK dan Password wajib diisi');
    return;
  }

  document.querySelector('.btn-primary').innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';

  google.script.run.withSuccessHandler(res => {
    if(res.success) {
      sessionStorage.setItem('nik', res.nik);
      if(res.role === 'admin') {
        alert('Dashboard Admin belum dibuat di versi ini');
        document.querySelector('.btn-primary').innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Masuk';
      } else {
        // Ini yang bener buat Apps Script
        google.script.run.withSuccessHandler(html => {
          document.open();
          document.write(html);
          document.close();
        }).getDashboardPage();
      }
    } else {
      alert(res.message);
      document.querySelector('.btn-primary').innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Masuk';
    }
  }).withFailureHandler(err => {
    alert('Error: ' + err.message);
    document.querySelector('.btn-primary').innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Masuk';
  }).loginUser(nik, pass);
}

// Tambah fungsi ini di Code.gs
function getDashboardPage() {
  return HtmlService.createTemplateFromFile('dashboard').evaluate().getContent();
}
