<?php
require_once 'db.php';
header('Content-Type: application/json');

if (!$pdo) {
    echo json_encode(['error' => 'No PDO connection']);
    exit;
}

try {
    $hero = $pdo->query("SELECT * FROM hero_section")->fetchAll();
    $attractions = $pdo->query("SELECT * FROM attractions")->fetchAll();
    $tickets = $pdo->query("SELECT * FROM ticket_packages")->fetchAll();

    echo json_encode([
        'hero' => $hero,
        'attractions' => $attractions,
        'tickets' => $tickets
    ], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
