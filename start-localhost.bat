@echo off
TITLE Aplikasi Administrasi Guru Digital - Localhost Server
cls
echo ====================================================================
echo        PENGALAMAN INSTALASI & MENJALANKAN APLIKASI LOCALHOST
echo ====================================================================
echo.

:: 1. Cek ketersediaan Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js belum terinstall di komputer / laptop Anda!
    echo Silakan unduh dan install Node.js (LTS version) dari: https://nodejs.org/
    echo Setelah menginstall Node.js, jalankan kembali file ini.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js terdeteksi.

:: 2. Buat file .env dari .env.example jika belum ada
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
    echo Mohon tunggu sebentar (membutuhkan koneksi internet untuk pertama kali)...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Gagal menginstall dependencies. Pastikan koneksi internet stabil.
        pause
        exit /b 1
    )
)

echo.
echo ====================================================================
echo  Server localhost siap dijalankan!
echo  Aplikasi akan terbuka otomatis di browser: http://localhost:3000
echo  Tekan Ctrl+C di jendela ini jika ingin menghentikan server.
echo ====================================================================
echo.

:: Buka browser secara otomatis setelah server siap (delay 3.5 detik)
start "" powershell -Command "Start-Sleep -m 3500; Start-Process 'http://localhost:3000'"

:: Jalankan server development
call npm run dev

pause
