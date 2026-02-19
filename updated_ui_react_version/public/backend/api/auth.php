<?php
require_once 'db.php';

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    // Hardcoded credentials as requested for the initial setup
    // In a production env with DB users table, we would check against that.
    $validUser = 'gohappyvalley';
    $validPass = 'Royal@1234';

    if ($username === $validUser && $password === $validPass) {
        // Return a simple token or session indicator
        // For simplicity in this non-jwt setup, we'll return equality success
        echo json_encode(['success' => true, 'token' => 'admin_logged_in_token_12345']);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Invalid credentials']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
