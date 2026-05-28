// ===== KONFIGURASI =====
const SS_ID = '18XyDsxNaO9UCokjxUUf8V5kMv8SRZAXnDNA1o9cNZ_M';
const SHEET_NAME = 'data base kumpul';
const FOLDER_SERTIFIKAT_ID = '1pKiqCRRgGZd7gkf0ZeDBjUZjZAaBOUri';
const FORM_UPLOAD_URL = 'https://forms.gle/linkFormUploadBuktiBayar';
const FORM_DAFTAR_URL = 'https://forms.gle/FormPendataanAnggota';
const FORM_DONASI_URL = 'https://forms.gle/formDonasi';
const WA_ADMIN = '62812xxxxxxx';
// =======================

function doGet(e) {
  let htmlOutput;
  if (e.parameter.page === 'dashboard') {
    htmlOutput = HtmlService.createTemplateFromFile('dashboard').evaluate().setTitle('Dashboard PGM KBB');
  } else {
    htmlOutput = HtmlService.createTemplateFromFile('index').evaluate().setTitle('Portal PGM Indonesia KBB');
  }
  return htmlOutput
.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// FIX: Include yang bener buat clasp
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function loginUser(nik, password) {
  try {
    console.log('Login:', nik);
    const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Sheet "data base kumpul" tidak ditemukan');

    const data = sheet.getDataRange().getValues();
    console.log('Rows:', data.length);

    for (let i = 1; i < data.length; i++) {
      const rowNik = data[i][0]? data[i][0].toString().trim() : '';
      const rowPass = data[i][15]? data[i][15].toString().trim() : '';
      const rowRole = data[i][14]? data[i][14].toString().trim() : 'user';

      if (rowNik === nik.toString().trim() && rowPass === password.toString().trim()) {
        console.log('Login OK');
        return { success: true, nik: rowNik, role: rowRole.toLowerCase() };
      }
    }
    console.log('Login FAIL');
    return { success: false, message: 'NIK atau Password salah' };
  } catch (err) {
    console.error('Error:', err.message);
    throw new Error('Error server: ' + err.message);
  }
}

function getUserData(nik) {
  try {
    const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] && data[i][0].toString().trim() === nik.toString().trim()) {
        return {
          nik: data[i][0], foto: data[i][1] || 'https://via.placeholder.com/50',
          nama: data[i][2] || '-', noKta: data[i][3] || '-', wilayah: data[i][5] || '-',
          tahunGabung: data[i][6] || '-', statusAktif: data[i][7] || '-',
          bayar: data[i][11] || '', statusValidasi: data[i][12] || '',
          linkSertifikat: data[i][13] || '', formBayar: FORM_UPLOAD_URL,
          formDaftar: FORM_DAFTAR_URL, formDonasi: FORM_DONASI_URL, waAdmin: WA_ADMIN
        };
      }
    }
    return null;
  } catch (err) {
    throw new Error('Gagal ambil data: ' + err.message);
  }
}
