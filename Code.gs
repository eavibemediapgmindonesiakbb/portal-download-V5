const SS_ID = '18XyDsxNaO9UCokjxUUf8V5kMv8SRZAXnDNA1o9cNZ_M'; // Ganti
const SHEET_NAME = 'data base kumpul';
const FOLDER_SERTIFIKAT_ID = '1pKiqCRRgGZd7gkf0ZeDBjUZjZAaBOUri';
const FORM_UPLOAD_URL = 'https://forms.gle/linkFormUploadBuktiBayar';

function doGet(e) {
  if (e.parameter.page === 'dashboard') {
    return HtmlService.createTemplateFromFile('dashboard')
    .evaluate()
    .setTitle('Dashboard PGM KBB')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } else {
    return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Portal PGM Indonesia KBB')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// LOGIN: NIK = Kolom A, PASSWORD = Kolom P, ROLE = Kolom O
function loginUser(nik, password) {
  const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  for(let i = 1; i < data.length; i++) {
    const rowNik = data[i][0].toString(); // A
    const rowPass = data[i][15].toString(); // P
    const rowRole = data[i][14].toString(); // O

    if(rowNik === nik && rowPass === password) {
      return {
        success: true,
        nik: rowNik,
        role: rowRole.toLowerCase()
      };
    }
  }
  return {success: false, message: 'NIK atau Password salah'};
}

// GET DATA: Mapping sesuai kolom real
function getUserData(nik) {
  const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  for(let i = 1; i < data.length; i++) {
    if(data[i][0].toString() === nik) {
      return {
        nik: data[i][0], // A
        foto: data[i][1], // B
        nama: data[i][2], // C
        noKta: data[i][3], // D
        wilayah: data[i][5], // F = WILAYAH_PC_PGM
        tahunGabung: data[i][6], // G
        statusAktif: data[i][7], // H
        bayar: data[i][11], // L = Bayar
        statusValidasi: data[i][12], // M = Status
        linkSertifikat: data[i][13], // N = Link Sertifikat
        formBayar: FORM_UPLOAD_URL
      };
    }
  }
  return null;
}

// Trigger Form: Update kolom L dan M
function updatePembayaran(e) {
  const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const nikForm = e.namedValues['NIK'][0];

  for(let i = 1; i < data.length; i++) {
    if(data[i][0].toString() === nikForm) {
      sheet.getRange(i+1, 12).setValue('sudah'); // L
      sheet.getRange(i+1, 13).setValue('menunggu validasi'); // M
      break;
    }
  }
}

// Generate link PDF dari NIK.pdf di Drive
function generateLinkPDF() {
  const sheet = SpreadsheetApp.openById(SS_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const folder = DriveApp.getFolderById(FOLDER_SERTIFIKAT_ID);

  for(let i = 1; i < data.length; i++) {
    const status = data[i][12].toString().toLowerCase(); // M
    const nik = data[i][0].toString(); // A
    const linkKosong =!data[i][13]; // N

    if(status === 'valid' && linkKosong) {
      const files = folder.getFilesByName(nik + '.pdf');
      if(files.hasNext()) {
        const file = files.next();
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        const url = file.getUrl();
        sheet.getRange(i+1, 14).setValue(url); // N
      }
    }
  }
}
