// Splash 2 detik
window.onload = () => {
  if(document.getElementById('splash')) {
    setTimeout(() => {
      document.getElementById('splash').style.display = 'none';
      document.getElementById('loginPage').style.display = 'block';
    }, 2000);
  }

  // Kalau di dashboard, load data
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

function handleLogin() {
  const nik = document.getElementById('nik').value;
  const pass = document.getElementById('password').value;

  google.script.run.withSuccessHandler(res => {
    if(res.success) {
      sessionStorage.setItem('nik', res.nik);
      if(res.role === 'admin') {
        alert('Dashboard Admin belum dibuat di versi ini');
      } else {
        window.location.href = 'dashboard.html';
      }
    } else {
      alert(res.message);
    }
  }).loginUser(nik, pass);
}

function loadDashboard(nik) {
  google.script.run.withSuccessHandler(data => {
    document.getElementById('namaUser').innerText = data.nama;
    document.getElementById('fotoUser').src = data.foto || 'https://via.placeholder.com/50';
    document.getElementById('noKta').innerText = data.noKta;
    document.getElementById('statusAktif').innerText = data.statusAktif;
    document.getElementById('tahunGabung').innerText = data.tahunGabung;
    document.getElementById('wilayah').innerText = data.wilayah;

    // Status validasi
    const badge = document.getElementById('badgeStatus');
    const btnDownload = document.getElementById('btnDownload');
    const status = (data.statusValidasi || '').toLowerCase();

    if(!status) {
      badge.innerText = 'Belum Upload';
      badge.className = 'badge abu';
    } else if(status === 'menunggu validasi') {
      badge.innerText = 'Menunggu Validasi';
      badge.className = 'badge kuning';
    } else if(status === 'valid') {
      badge.innerText = 'Valid';
      badge.className = 'badge hijau';
      btnDownload.disabled = false;
      btnDownload.onclick = () => window.open(data.linkSertifikat, '_blank');
    } else if(status === 'ditolak') {
      badge.innerText = 'Ditolak';
      badge.className = 'badge merah';
      document.getElementById('warningDitolak').style.display = 'block';
    }

    document.getElementById('btnBayar').onclick = () => window.open(data.formBayar, '_blank');

  }).getUserData(nik);
}