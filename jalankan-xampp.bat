@echo off
TITLE Aplikasi Administrasi Guru Digital - XAMPP Server Launcher
cls
echo ====================================================================
echo    PELUNCUR APLIKASI ADMINISTRASI GURU DIGITAL (MODE XAMPP / HTDOCS)
echo ====================================================================
echo.

:: 1. Cek ketersediaan Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js belum terinstall di komputer Anda!
    echo Node.js diperlukan untuk menjalankan modul server backend aplikasi ini.
    echo Silakan unduh dan install Node.js (LTS version) dari: https://nodejs.org/
    echo Setelah menginstall Node.js, jalankan kembali file ini.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js terdeteksi.

:: 2. Salin file .env dari .env.example jika belum ada
if not exist .env (
    if exist .env.example (
        echo [INFO] Membuat file konfigurasi .env...
        copy .env.example .env >nul
    )
)

:: 3. Cek folder node_modules
if not exist node_modules (
    echo.
    echo [INFO] Mengunduh dan menginstall modul dependencies (npm install)...
    echo Mohon tunggu sebentar...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Gagal menginstall dependencies. Pastikan koneksi internet aktif.
        pause
        exit /b 1
    )
)

:: 4. Build asset frontend jika belum ada folder dist
if not exist dist (
    echo.
    echo [INFO] Membangun paket aplikasi (npm run build)...
    call npm run build
)

echo.
echo ====================================================================
echo  Server Aplikasi Siap Dijalankan di XAMPP!
echo  
echo  1. Jika XAMPP Apache Aktif:
echo     Akses via Apache XAMPP: http://localhost/aplikasi-guru (atau nama folder Anda)
echo  
echo  2. Akses Langsung Server Localhost:
echo     Akses langsung: http://localhost:3000
echo ====================================================================
echo.

:: Buka browser secara otomatis ke localhost:3000 setelah 3 detik
start "" powershell -Command "Start-Sleep -m 3000; Start-Process 'http://localhost:3000'"

:: Jalankan server Node Express (Fullstack Backend + Frontend)
call npm run dev

pause
