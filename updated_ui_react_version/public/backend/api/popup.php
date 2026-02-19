<?php
require_once 'db.php';
header('Content-Type: application/json');

$uploadDir = __DIR__ . '/uploads/popup/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (!$pdo) {
        echo json_encode(['image_url' => '', 'is_active' => 0]);
        exit;
    }
    try {
        $stmt = $pdo->query("SELECT * FROM popup_settings WHERE is_active = 1 ORDER BY id DESC LIMIT 1");
        $popup = $stmt->fetch();
        echo json_encode($popup ? $popup : ['image_url' => '', 'is_active' => 0]);
    } catch (PDOException $e) {
        echo json_encode(['image_url' => '', 'is_active' => 0]);
    }
} elseif ($method === 'POST') {
    // Check if it's a toggle action (JSON body)
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (strpos($contentType, 'application/json') !== false) {
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['action']) && $data['action'] === 'toggle') {
            if (!$pdo) {
                http_response_code(500);
                echo json_encode(['error' => 'DB unavailable']);
                exit;
            }
            try {
                $isActive = $data['is_active'] ? 1 : 0;
                $id = $data['id'];
                $stmt = $pdo->prepare("UPDATE popup_settings SET is_active = ? WHERE id = ?");
                $stmt->execute([$isActive, $id]);
                echo json_encode(['success' => true]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Toggle failed']);
            }
            exit;
        }

        if (isset($data['action']) && $data['action'] === 'list') {
            if (!$pdo) {
                echo json_encode([]);
                exit;
            }
            $stmt = $pdo->query("SELECT * FROM popup_settings ORDER BY id DESC");
            echo json_encode($stmt->fetchAll());
            exit;
        }
    }

    // File upload
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No image file received']);
        exit;
    }

    $file = $_FILES['image'];
    if ($file['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['error' => 'Upload error code: ' . $file['error']]);
        exit;
    }

    $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', basename($file['name']));
    $targetPath = $uploadDir . $fileName;

    $allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    $ext = strtolower(pathinfo($targetPath, PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExts)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type']);
        exit;
    }

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $imageUrl = '/backend/api/uploads/popup/' . $fileName;

        if ($pdo) {
            try {
                // Deactivate all existing popups
                $pdo->exec("UPDATE popup_settings SET is_active = 0");
                // Insert new active popup
                $stmt = $pdo->prepare("INSERT INTO popup_settings (image_url, is_active) VALUES (?, 1)");
                $stmt->execute([$imageUrl]);
                $newId = $pdo->lastInsertId();
            } catch (PDOException $e) {
                echo json_encode(['success' => true, 'image_url' => $imageUrl, 'warning' => 'DB error']);
                exit;
            }
        }
        echo json_encode(['success' => true, 'id' => $newId ?? time(), 'image_url' => $imageUrl]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save file']);
    }
} elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? ($_GET['id'] ?? null);

    if (!$id || !$pdo) {
        http_response_code(400);
        echo json_encode(['error' => 'ID required']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT image_url FROM popup_settings WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if ($row && $row['image_url']) {
            $filePath = $uploadDir . basename($row['image_url']);
            if (file_exists($filePath)) unlink($filePath);
        }
        $stmt = $pdo->prepare("DELETE FROM popup_settings WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Delete failed']);
    }
}
?>
