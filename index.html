// ===== KONFIGURASI =====
const SS_ID = '18XyDsxNaO9UCokjxUUf8V5kMv8SRZAXnDNA1o9cNZ_M';
const SHEET_NAME = 'data base kumpul'; 
const FOLDER_SERTIFIKAT_ID = '1pKiqCRRgGZd7gkf0ZeDBjUZjZAaBOUri';
const FORM_UPLOAD_URL = 'https://forms.gle/linkFormUploadBuktiBayar';
// =======================

// ROUTING HALAMAN
function doGet(e) {
  let htmlOutput;
  
  if (e.parameter.page === 'dashboard') {
    htmlOutput = HtmlService.createTemplateFromFile('dashboard')
     .evaluate()
     .setTitle('Dashboard PGM KBB');
  } else {
    htmlOutput = HtmlService.createTemplateFromFile('index')
     .evaluate()
     .setTitle('Portal PGM Indonesia KBB');
  }
  
  return htmlOutput
   .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
   .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// LOGIN
function loginUser(nik, password) {
  try {
    const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      const rowNik = data[i][0]? data[i][0].toString().trim() : ''; // A
      const rowPass = data[i][15]? data[i][15].toString().trim() : ''; // P
      const rowRole = data[i][14]? data[i][14].toString().trim() : 'user'; // O

      if (rowNik === nik.toString().trim() && rowPass === password.toString().trim()) {
        return {
          success: true,
          nik: rowNik,
          role: rowRole.toLowerCase()
        };
      }
    }
    return { success: false, message: 'NIK atau Password salah' };
  } catch (err) {
    return { success: false, message: 'Error server: ' + err.message };
  }
}

// AMBIL DATA USER
function getUserData(nik) {
  try {
    const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] && data[i][0].toString().trim() === nik.toString().trim()) {
        return {
          nik: data[i][0], // A
          foto: data[i][1] || 'https://via.placeholder.com/50', // B
          nama: data[i][2] || '-', // C
          noKta: data[i][3] || '-', // D
          wilayah: data[i][5] || '-', // F
          tahunGabung: data[i][6] || '-', // G
          statusAktif: data[i][7] || '-', // H
          bayar: data[i][11] || '', // L
          statusValidasi: data[i][12] || '', // M
          linkSertifikat: data[i][13] || '', // N
          formBayar: FORM_UPLOAD_URL
        };
      }
    }
    return null;
  } catch (err) {
    throw new Error('Gagal ambil data: ' + err.message);
  }
}

// TRIGGER FORM
function updatePembayaran(e) {
  try {
    const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const nikForm = e.namedValues['NIK']? e.namedValues['NIK'][0].toString().trim() : '';

    if (!nikForm) return;

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] && data[i][0].toString().trim() === nikForm) {
        sheet.getRange(i + 1, 12).setValue('sudah'); // L
        sheet.getRange(i + 1, 13).setValue('menunggu validasi'); // M
        break;
      }
    }
  } catch (err) {
    console.error('updatePembayaran error: ' + err.message);
  }
}

// GENERATE LINK PDF
function generateLinkPDF() {
  try {
    const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const folder = DriveApp.getFolderById(FOLDER_SERTIFIKAT_ID);

    for (let i = 1; i < data.length; i++) {
      const status = data[i][12]? data[i][12].toString().toLowerCase().trim() : ''; // M
      const nik = data[i][0]? data[i][0].toString().trim() : ''; // A
      const linkKosong =!data[i][13] || data[i][13].toString().trim() === ''; // N

      if (status === 'valid' && linkKosong && nik) {
        const files = folder.getFilesByName(nik + '.pdf');
        if (files.hasNext()) {
          const file = files.next();
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          const url = file.getUrl();
          sheet.getRange(i + 1, 14).setValue(url); // N
        }
      }
    }
  } catch (err) {
    console.error('generateLinkPDF error: ' + err.message);
  }
}

// TEST
function testLogin() {
  const hasil = loginUser('32171107048', '830018');
  Logger.log(hasil);
}
