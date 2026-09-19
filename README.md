# Faelo AI Fullstack (Google Sheets Version)

Proyek ini telah diperbarui untuk menggunakan Google Sheets sebagai database dan siap untuk di-deploy ke Vercel.

## Perubahan Penting:
1. **Dihapus:** Folder `database/`, file `setup-database.js`, dan konfigurasi SQL.
2. **Ditambahkan:** `vercel.json` untuk routing di Vercel.
3. **Ditambahkan:** `src/config/sheets.js` untuk koneksi ke Google Sheets.
4. **Diperbarui:** `demoRequestRepository.js` sekarang menulis data langsung ke Google Sheets menggunakan package `google-spreadsheet`.

## Cara Setup:
1. Jalankan `npm install` untuk menginstal dependencies (termasuk `google-spreadsheet`).
2. Copy `.env.example` menjadi `.env`.
3. Isi variabel `SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, dan `GOOGLE_PRIVATE_KEY`.
4. Jalankan server dengan `npm start`.
