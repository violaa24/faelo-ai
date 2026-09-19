const doc = require('../config/sheets');

async function saveDemoRequest(data) {
  try {
    // Load info dokumen
    await doc.loadInfo();
    
    // Ambil sheet pertama (index 0)
    const sheet = doc.sheetsByIndex[0]; 
    
    // Tambahkan baris baru ke sheet
    // Pastikan header di Google Sheets Anda cocok dengan kunci objek ini (Name, Email, Company, dll)
    const newRow = await sheet.addRow({
      Name: data.name,
      Email: data.email,
      Company: data.company,
      Message: data.message || '',
      Date: new Date().toISOString()
    });
    
    return newRow;
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
}

module.exports = { saveDemoRequest };
