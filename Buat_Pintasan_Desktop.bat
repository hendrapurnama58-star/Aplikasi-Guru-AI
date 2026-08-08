@echo off
TITLE Buat Pintasan Desktop - Aplikasi Guru Digital
cls
echo ====================================================================
echo      MEMBUAT PINTASAN DESKTOP (DESKTOP SHORTCUT) APLIKASI GURU
echo ====================================================================
echo.

set SCRIPT="%TEMP%\CreateShortcut.vbs"

echo Set oWS = CreateObject("WScript.Shell") > %SCRIPT%
echo sLinkFile = oWS.SpecialFolders("Desktop") ^& "\Aplikasi Guru Digital.lnk" >> %SCRIPT%
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%
echo oLink.TargetPath = "%CD%\Jalankan_Aplikasi_Guru.vbs" >> %SCRIPT%
echo oLink.WorkingDirectory = "%CD%" >> %SCRIPT%
echo oLink.Description = "Aplikasi Administrasi Guru Digital" >> %SCRIPT%
echo oLink.Save >> %SCRIPT%

cscript /nologo %SCRIPT%
del %SCRIPT%

echo [SUKSES] Pintasan "Aplikasi Guru Digital" berhasil dibuat di Desktop Anda!
echo.
echo Sekarang Anda bisa membuka aplikasi langsung dari ikon Desktop seperti aplikasi .exe biasa.
echo.
pause
