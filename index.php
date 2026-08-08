<?php
/**
 * XAMPP PHP Bridge & Entry Point
 * Aplikasi Administrasi Guru Digital
 */

$distIndex = __DIR__ . '/dist/index.html';
$rootIndex = __DIR__ . '/index.html';

// Check if Node server on port 3000 is reachable
$connection = @fsockopen('127.0.0.1', 3000, $errno, $errstr, 1);

if ($connection) {
    fclose($connection);
    // Node Express backend server is actively running!
    // If request is for API, proxy or redirect
    if (strpos($_SERVER['REQUEST_URI'], '/api/') !== false) {
        header("Location: http://localhost:3000" . $_SERVER['REQUEST_URI']);
        exit;
    }
}

// Serve dist/index.html if build exists
if (file_exists($distIndex)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($distIndex);
    exit;
} else if (file_exists($rootIndex)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($rootIndex);
    exit;
} else {
    echo "<h1>Aplikasi Administrasi Guru Digital</h1>";
    echo "<p>Silakan jalankan file <strong>jalankan-xampp.bat</strong> atau <strong>start-localhost.bat</strong> di folder aplikasi ini untuk memulai server.</p>";
}
?>
