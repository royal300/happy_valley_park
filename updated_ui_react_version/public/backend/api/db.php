<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = getenv('DB_HOST') ?: 'localhost';
$port = getenv('DB_PORT') ?: '3306';
$db   = getenv('DB_NAME') ?: 'happyvalley_frontend';
$user = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASS') ?: 'x1lZmHdSaW2DbdTdY/YGUPATwI8K';

$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset;port=$port";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // MOCK MODE: Don't exit on DB failure, allow script to continue if possible
    // This allows local testing of uploads without a DB (files are moved, but not saved to DB)
    $pdo = null;
    error_log("Database connection failed: " . $e->getMessage());
}
?>
