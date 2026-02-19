<?php
require_once 'db.php';
header('Content-Type: application/json');

// Increase upload limits for video files
ini_set('upload_max_filesize', '50M');
ini_set('post_max_size', '55M');
ini_set('max_execution_time', '120');

$uploadDir = __DIR__ . '/uploads/hero/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($pdo) {
        $stmt = $pdo->query("SELECT video_url FROM hero_section ORDER BY id DESC LIMIT 1");
        $hero = $stmt->fetch();
        echo json_encode($hero ? $hero : ['video_url' => '']);
    } else {
        echo json_encode(['video_url' => '']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['video'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No video file received. Check upload_max_filesize in php.ini.']);
        exit;
    }

    $file = $_FILES['video'];

    // Check for upload errors
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $errorMessages = [
            UPLOAD_ERR_INI_SIZE => 'File exceeds server upload limit',
            UPLOAD_ERR_FORM_SIZE => 'File exceeds form limit',
            UPLOAD_ERR_PARTIAL => 'File was only partially uploaded',
            UPLOAD_ERR_NO_FILE => 'No file was uploaded',
            UPLOAD_ERR_NO_TMP_DIR => 'Missing temp folder on server',
            UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
        ];
        $msg = $errorMessages[$file['error']] ?? 'Unknown upload error (code: ' . $file['error'] . ')';
        http_response_code(400);
        echo json_encode(['error' => $msg]);
        exit;
    }

    $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', basename($file['name']));
    $targetPath = $uploadDir . $fileName;
    $fileType = strtolower(pathinfo($targetPath, PATHINFO_EXTENSION));

    $allowedTypes = ['mp4', 'webm'];
    if (!in_array($fileType, $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type. Only MP4 and WebM allowed.']);
        exit;
    }

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $videoUrl = '/backend/api/uploads/hero/' . $fileName;

        if ($pdo) {
            try {
                $stmt = $pdo->query("SELECT id FROM hero_section LIMIT 1");
                if ($stmt->fetch()) {
                    $sql = "UPDATE hero_section SET video_url = :url";
                } else {
                    $sql = "INSERT INTO hero_section (video_url) VALUES (:url)";
                }
                $stmt = $pdo->prepare($sql);
                $stmt->execute(['url' => $videoUrl]);
            } catch (PDOException $e) {
                // File uploaded but DB failed - still return success with warning
                echo json_encode(['success' => true, 'video_url' => $videoUrl, 'warning' => 'File saved but DB update failed']);
                exit;
            }
        }

        echo json_encode(['success' => true, 'video_url' => $videoUrl]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to move uploaded file. Check folder permissions.']);
    }
}
?>
