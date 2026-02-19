<?php
require_once 'db.php';

$uploadDir = __DIR__ . '/uploads/attractions/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM attractions ORDER BY id DESC");
        echo json_encode($stmt->fetchAll());
    } else {
        echo json_encode([]);
    }
} elseif ($method === 'POST') {
    if (isset($_FILES['image'])) {
        $file = $_FILES['image'];
        $fileName = time() . '_' . basename($file['name']);
        $targetPath = $uploadDir . $fileName;
        
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            $imageUrl = '/backend/api/uploads/attractions/' . $fileName;
            $title = $_POST['title'] ?? 'New Attraction';

            $newId = time(); // Mock ID
            if ($pdo) {
                $sql = "INSERT INTO attractions (title, image_url) VALUES (:title, :url)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute(['title' => $title, 'url' => $imageUrl]);
                $newId = $pdo->lastInsertId();
            }

            echo json_encode(['success' => true, 'id' => $newId, 'image_url' => $imageUrl, 'title' => $title, 'mock_mode' => !$pdo]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'File upload failed']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'No image uploaded']);
    }
} elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? $_GET['id'];

    if ($id) {
        if ($pdo) {
            $stmt = $pdo->prepare("SELECT image_url FROM attractions WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch();
            if ($row) {
                $filePath = __DIR__ . '/../../' . $row['image_url']; 
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }

            $stmt = $pdo->prepare("DELETE FROM attractions WHERE id = ?");
            $stmt->execute([$id]);
        }
        echo json_encode(['success' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'ID required']);
    }
}
?>
