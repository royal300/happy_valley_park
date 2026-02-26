<?php
require_once 'db.php';
header('Content-Type: application/json');

if (!$pdo) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed.']);
    exit;
}

try {
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    $results = [];
    foreach ($tables as $table) {
        try {
            $stmt = $pdo->query("SELECT COUNT(*) FROM `$table` ");
            $count = $stmt->fetchColumn();
            $results[$table] = $count;
        } catch (Exception $e) {
            $results[$table] = 'Error: ' . $e->getMessage();
        }
    }
    
    echo json_encode([
        'status' => 'success',
        'host' => $host,
        'database' => $db,
        'tables' => $results
    ], JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
