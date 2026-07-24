<?php
require_once 'db.php';
header('Content-Type: application/json');

$uploadDir = __DIR__ . '/uploads/offers/';
if (!file_exists($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create upload directory. Check server permissions.']);
        exit;
    }
}
// Ensure directory is writable
if (!is_writable($uploadDir)) {
    chmod($uploadDir, 0777);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM offer_banners ORDER BY id DESC");
        echo json_encode($stmt->fetchAll());
    } else {
        echo json_encode([]);
    }
} elseif ($method === 'POST') {
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
        echo json_encode(['error' => 'Invalid file type. Allowed: jpg, png, webp, gif']);
        exit;
    }

    // Compress helper function — uses copy()+unlink() as fallback (safe inside functions)
    function compressImage($source, $destination, $quality) {
        $info = @getimagesize($source);
        $mime = $info ? $info['mime'] : '';

        $compressed = false;
        if ($mime === 'image/jpeg' && function_exists('imagecreatefromjpeg')) {
            $image = @imagecreatefromjpeg($source);
            if ($image) {
                $compressed = imagejpeg($image, $destination, $quality);
                imagedestroy($image);
            }
        } elseif ($mime === 'image/png' && function_exists('imagecreatefrompng')) {
            $image = @imagecreatefrompng($source);
            if ($image) {
                imagealphablending($image, false);
                imagesavealpha($image, true);
                $pngQuality = max(0, min(9, 9 - round(($quality / 100) * 9)));
                $compressed = imagepng($image, $destination, $pngQuality);
                imagedestroy($image);
            }
        } elseif ($mime === 'image/webp' && function_exists('imagecreatefromwebp')) {
            $image = @imagecreatefromwebp($source);
            if ($image) {
                $compressed = imagewebp($image, $destination, $quality);
                imagedestroy($image);
            }
        }

        // Fallback: plain file copy if GD compression failed or unsupported mime
        if (!$compressed || !file_exists($destination)) {
            $compressed = @copy($source, $destination);
        }

        return $compressed && file_exists($destination);
    }

    $compressed = compressImage($file['tmp_name'], $targetPath, 60);

    // Last-resort fallback: try move_uploaded_file directly
    if (!$compressed) {
        $compressed = move_uploaded_file($file['tmp_name'], $targetPath);
    }

    if ($compressed) {
        $imageUrl = '/backend/api/uploads/offers/' . $fileName;
        $title = $_POST['title'] ?? 'Offer Banner';

        $newId = time();
        if ($pdo) {
            try {
                $sql = "INSERT INTO offer_banners (title, image_url) VALUES (:title, :url)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute(['title' => $title, 'url' => $imageUrl]);
                $newId = $pdo->lastInsertId();
            } catch (PDOException $e) {
                echo json_encode(['success' => true, 'id' => $newId, 'image_url' => $imageUrl, 'title' => $title, 'warning' => 'DB insert failed']);
                exit;
            }
        }

        echo json_encode(['success' => true, 'id' => $newId, 'image_url' => $imageUrl, 'title' => $title]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to move/compress uploaded file']);
    }
} elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? ($_GET['id'] ?? null);

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID required']);
        exit;
    }

    if ($pdo) {
        try {
            // Delete file from disk
            $stmt = $pdo->prepare("SELECT image_url FROM offer_banners WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch();
            if ($row && $row['image_url']) {
                $filePath = __DIR__ . '/uploads/offers/' . basename($row['image_url']);
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }

            $stmt = $pdo->prepare("DELETE FROM offer_banners WHERE id = ?");
            $stmt->execute([$id]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'DB delete failed']);
            exit;
        }
    }
    echo json_encode(['success' => true]);
}
?>
