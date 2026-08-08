#!/bin/bash

echo "===================================================================="
echo "       PENGALAMAN INSTALASI & MENJALANKAN APLIKASI LOCALHOST"
echo "===================================================================="
echo ""

# 1. Cek Node.js
if ! command -v node &> /dev/null
then
    echo "[ERROR] Node.js belum terinstall di komputer / laptop Anda!"
    echo "Silakan unduh dan install Node.js (LTS version) dari: https://nodejs.org/"
    exit 1
fi

echo "[OK] Node.js terdeteksi."

# 2. Buat file .env dari .env.example jika belum ada
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo "[INFO] Membuat file konfigurasi .env..."
        cp .env.example .env
    fi
fi

# 3. Cek node_modules
if [ ! -d "node_modules" ]; then
    echo ""
    echo "[INFO] Mengunduh dan menginstall modul dependencies (npm install)..."
    echo "Mohon tunggu sebentar..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Gagal menginstall dependencies. Pastikan koneksi internet stabil."
        exit 1
    fi
fi

echo ""
echo "===================================================================="
echo " Server localhost siap dijalankan!"
echo " Buka browser di alamat: http://localhost:3000"
echo " Tekan Ctrl+C untuk menghentikan server."
echo "===================================================================="
echo ""

# Buka browser otomatis jika tersedia
if command -v xdg-open &> /dev/null; then
    xdg-open "http://localhost:3000" &
elif command -v open &> /dev/null; then
    open "http://localhost:3000" &
fi

npm run dev
