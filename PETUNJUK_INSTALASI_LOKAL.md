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

### 🔹 Metode A: Pengguna Windows (Peluncuran Seperti Aplikasi .EXE)
1. Buka folder hasil ekstrak aplikasi.
2. Klik ganda (double-click) **`Buat_Pintasan_Desktop.bat`** (cukup sekali di awal). Ini akan membuat ikon pintasan aplikasi di layar Desktop Windows Anda.
3. Untuk menjalankan aplikasi tanpa jendela hitam Command Prompt, Anda cukup klik ganda ikon **`Jalankan_Aplikasi_Guru.vbs`** atau ikon **Pintasan Desktop** yang dibuat tadi.
4. Aplikasi akan langsung berjalan secara seamless di background dan membuka halaman **`http://localhost:3000`**.

---

### 🔹 Metode B: Jalankan di XAMPP (`htdocs`)
Jika Anda biasa menggunakan XAMPP (Apache):
1. Ekstrak seluruh folder aplikasi ini ke direktori **`C:\xampp\htdocs\aplikasi-guru`** (atau nama folder sesuai keinginan Anda).
2. Buka folder tersebut dan klik ganda file **`jalankan-xampp.bat`**.
3. Script otomatis akan mengunduh paket dependencies, membangun build produksi, dan menyiapkan routing Apache via `.htaccess` / `index.php`.
4. Buka browser dan akses via Apache XAMPP: **`http://localhost/aplikasi-guru`** atau langsung **`http://localhost:3000`**.

---

### 🔹 Metode C: Mengubah Menjadi File Installer Executable (.EXE) Standalone (Electron)
Jika Anda ingin membungkus seluruh aplikasi ini menjadi satu file installer `.exe` mandiri (seperti software Windows biasa):
1. Buka Command Prompt (cmd) di dalam folder aplikasi.
2. Install pustaka Electron (jika belum ada):
   ```bash
   npm install --save-dev electron electron-builder
   ```
3. Jalankan perintah kompilasi `.exe`:
   ```bash
   npm run build:exe
   ```
4. File installer `.exe` aplikasi akan otomatis tercipta di dalam folder `dist/` atau `dist-electron/` yang dapat dibagikan dan diinstall di PC Windows mana saja tanpa perlu install Node.js secara terpisah.

---

### 🔹 Metode C: Jalankan via Command Line (Terminal / Mac / Linux)
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
