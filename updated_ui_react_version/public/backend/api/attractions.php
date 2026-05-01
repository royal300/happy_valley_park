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
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No image uploaded']);
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

    $allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'webm', 'ogg', 'avi', 'mov'];
    $ext = strtolower(pathinfo($targetPath, PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExts)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type. Allowed: jpg, png, webp, gif, mp4, webm, ogg, avi, mov']);
        exit;
    }

    // Compress helper function
    function compressImage($source, $destination, $quality) {
        $info = getimagesize($source);
        if ($info['mime'] == 'image/jpeg') {
            $image = @imagecreatefromjpeg($source);
            if ($image) { imagejpeg($image, $destination, $quality); imagedestroy($image); }
            else { move_uploaded_file($source, $destination); }
        } elseif ($info['mime'] == 'image/png') {
            $image = @imagecreatefrompng($source);
            if ($image) { 
                imagealphablending($image, false);
                imagesavealpha($image, true);
                $pngQuality = round(($quality/100) * 9);
                imagepng($image, $destination, 9 - $pngQuality); 
                imagedestroy($image); 
            } else { move_uploaded_file($source, $destination); }
        } elseif ($info['mime'] == 'image/webp') {
            $image = @imagecreatefromwebp($source);
            if ($image) { imagewebp($image, $destination, $quality); imagedestroy($image); }
            else { move_uploaded_file($source, $destination); }
        } else {
            move_uploaded_file($source, $destination);
        }
        return file_exists($destination);
    }

    function compressVideo($source, $destination) {
        $cmd = "ffmpeg -y -i " . escapeshellarg($source) . " -vf scale=-2:720 -c:v libx264 -crf 28 -preset veryfast -c:a aac -b:a 128k " . escapeshellarg($destination) . " 2>&1";
        exec($cmd, $output, $return_var);
        return $return_var === 0;
    }

    $isVideo = in_array($ext, ['mp4', 'webm', 'ogg', 'avi', 'mov']);
    $uploadSuccess = false;
    if ($isVideo) {
        $compressedFileName = 'opt_' . pathinfo($fileName, PATHINFO_FILENAME) . '.mp4';
        $compressedPath = $uploadDir . $compressedFileName;
        if (compressVideo($file['tmp_name'], $compressedPath)) {
            $uploadSuccess = true;
            $fileName = $compressedFileName;
            $targetPath = $compressedPath;
        } else {
            $uploadSuccess = move_uploaded_file($file['tmp_name'], $targetPath);
        }
    } else {
        $uploadSuccess = compressImage($file['tmp_name'], $targetPath, 60);
    }

    if ($uploadSuccess) {
        $imageUrl = '/backend/api/uploads/attractions/' . $fileName;
        $title = $_POST['title'] ?? 'New Attraction';

        $newId = time(); // Mock ID
        if ($pdo) {
            try {
                $sql = "INSERT INTO attractions (title, image_url) VALUES (:title, :url)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute(['title' => $title, 'url' => $imageUrl]);
                $newId = $pdo->lastInsertId();
            } catch (PDOException $e) {
                echo json_encode(['success' => true, 'id' => $newId, 'image_url' => $imageUrl, 'title' => $title, 'warning' => 'DB insert failed']);
                exit;
            }
        }

        echo json_encode(['success' => true, 'id' => $newId, 'image_url' => $imageUrl, 'title' => $title, 'mock_mode' => !$pdo]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'File upload/compression failed']);
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
