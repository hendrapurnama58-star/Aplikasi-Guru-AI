# 🚀 Panduan Ekstrak & Instalasi Aplikasi di Laptop / Komputer (Localhost)

Aplikasi **Administrasi Guru Digital** ini dirancang full-stack (React + Express + Firebase + Gemini AI) dan siap dijalankan secara mandiri pada komputer/laptop lokal (`http://localhost:3000`).

---

## 📥 Langkah 1: Download / Ekstrak Kode Sumber Aplikasi
1. Di layar Google AI Studio / Web App ini, buka menu **Settings** atau tombol **Export / Download Code** di pojok kanan atas.
2. Pilih **Download ZIP** atau **Export to GitHub**.
3. Jika berupa file **ZIP**, ekstrak (unzip) file tersebut ke folder di komputer Anda (misalnya: `D:\AplikasiGuru` atau `C:\Users\NamaUser\AplikasiGuru`).

---

## 💻 Langkah 2: Persyaratan Sistem (Prerequisites)
Pastikan komputer / laptop Anda telah terinstall **Node.js**:
- Unduh dan Install **Node.js (LTS Version)** dari website resmi: [https://nodejs.org/](https://nodejs.org/)
- Verifikasi instalasi dengan membuka Command Prompt (cmd) atau Terminal dan ketik:
  ```bash
  node -v
  npm -v
  ```

---

## ⚡ Langkah 3: Cara Menjalankan Aplikasi (Sangat Mudah)

### 🔹 Metode A: Pengguna Windows (Otomatis Sekali Klik)
1. Buka folder hasil ekstrak aplikasi.
2. Klik ganda (double-click) pada file **`start-localhost.bat`**.
3. Script otomatis akan:
   - Memeriksa instalasi Node.js.
   - Mengunduh semua pustaka (*dependencies*) secara otomatis saat pertama kali dijalankan.
   - Membuka browser secara otomatis ke alamat **`http://localhost:3000`**.

---

### 🔹 Metode B: Pengguna Mac / Linux / Terminal
1. Buka Terminal dan masuk ke direktori folder aplikasi:
   ```bash
   cd /path/ke/folder/aplikasi
   ```
2. Jalankan script otomatis:
   ```bash
   chmod +x start-localhost.sh
   ./start-localhost.sh
   ```
   *Atau jalankan perintah manual di bawah ini:*
   ```bash
   npm install
   npm run dev
   ```
3. Buka browser Anda dan akses: **`http://localhost:3000`**

---

## 🔑 Hak Akses & Konfigurasi Login Default

- **URL Akses Localhost**: `http://localhost:3000`
- **Username Default**: `Admin`
- **Password Default**: `123456`

> **Catatan Pengaturan**: Username & Password dapat diganti kapan saja melalui menu **Pengaturan Profil & Kop** di dalam aplikasi.

---

## 🌐 Fitur Tambahan & Gemini AI (Opsional)
- Untuk mengaktifkan fitur kecerdasan buatan Generator Perangkat Ajar AI, Modul Ajar AI, dan Asisten AI secara lokal:
  1. Buka file `.env` di folder utama aplikasi.
  2. Isi variabel `GEMINI_API_KEY` dengan API Key Gemini Anda dari [Google AI Studio](https://aistudio.google.com/):
     ```env
     GEMINI_API_KEY="AIzaSyYourActualApiKeyHere"
     ```

---

## 🛠️ Garansi Bebas Error Instalasi (Troubleshooting)
1. **Error `port 3000 in use`**:
   Jika port 3000 terpakai program lain, Anda bisa mengganti port di file `.env`:
   ```env
   PORT=8080
   ```
2. **Bersihkan Instalasi**:
   Jika ingin menginstall ulang dari awal, hapus folder `node_modules` lalu jalankan kembali `npm install`.
