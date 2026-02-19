<?php
require_once 'db.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (!$pdo) {
        echo json_encode([]);
        exit;
    }
    try {
        $stmt = $pdo->query("SELECT * FROM ticket_packages ORDER BY display_order ASC");
        echo json_encode($stmt->fetchAll());
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch tickets: ' . $e->getMessage()]);
    }
} elseif ($method === 'POST') {
    if (!$pdo) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection unavailable']);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['action']) && $data['action'] === 'reorder') {
        // Handle reordering
        $newOrder = $data['order']; // Array of IDs in new order
        try {
            foreach ($newOrder as $index => $id) {
                $stmt = $pdo->prepare("UPDATE ticket_packages SET display_order = ? WHERE id = ?");
                $stmt->execute([$index + 1, $id]); // 1-based order
            }
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Reorder failed: ' . $e->getMessage()]);
        }
        exit;
    }

    // Handle Create/Update
    $id = $data['id'] ?? null;
    $name = $data['name'] ?? '';
    $description = $data['description'] ?? '';
    $price = $data['price'] ?? '';
    $originalPrice = $data['original_price'] ?? ($data['originalPrice'] ?? '');
    $discount = $data['discount'] ?? '';
    $color = $data['color'] ?? 'from-blue-500 to-blue-700';
    $link = $data['link'] ?? 'https://happyvalley.royal300.com/client/dashboard';

    if (empty($name) || empty($price)) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and price are required']);
        exit;
    }

    try {
        if ($id && $id !== 'new') {
            $sql = "UPDATE ticket_packages SET name=?, description=?, price=?, original_price=?, discount=?, color=?, link=? WHERE id=?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $description, $price, $originalPrice, $discount, $color, $link, $id]);
            echo json_encode(['success' => true, 'id' => $id]);
        } else {
            // Get next display_order
            $stmt = $pdo->query("SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM ticket_packages");
            $nextOrder = $stmt->fetch()['next_order'];

            $sql = "INSERT INTO ticket_packages (name, description, price, original_price, discount, color, link, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $description, $price, $originalPrice, $discount, $color, $link, $nextOrder]);
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Save failed: ' . $e->getMessage()]);
    }
} elseif ($method === 'DELETE') {
    if (!$pdo) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection unavailable']);
        exit;
    }

    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID required']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM ticket_packages WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Delete failed: ' . $e->getMessage()]);
    }
}
?>
