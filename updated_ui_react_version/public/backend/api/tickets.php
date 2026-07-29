<?php
require_once 'db.php';
header('Content-Type: application/json');

function ensureIsAvailableColumn($pdo) {
    if (!$pdo) return;
    try {
        $check = $pdo->query("SHOW COLUMNS FROM ticket_packages LIKE 'is_available'");
        if ($check->rowCount() == 0) {
            $pdo->exec("ALTER TABLE ticket_packages ADD COLUMN is_available TINYINT(1) DEFAULT 1");
        }
    } catch (Exception $e) {
        // Table might not exist yet or ignore error
    }
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (!$pdo) {
        echo json_encode([]);
        exit;
    }
    ensureIsAvailableColumn($pdo);
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

    ensureIsAvailableColumn($pdo);
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['action']) && $data['action'] === 'toggle_availability') {
        $id = $data['id'] ?? null;
        $isAvailable = isset($data['is_available']) ? (int)$data['is_available'] : 1;
        if ($id) {
            try {
                $stmt = $pdo->prepare("UPDATE ticket_packages SET is_available = ? WHERE id = ?");
                $stmt->execute([$isAvailable, $id]);
                echo json_encode(['success' => true]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Toggle failed: ' . $e->getMessage()]);
            }
            exit;
        }
    }

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
    $link = $data['link'] ?? 'https://happyvalley.royal300.com/client/book';
    $isAvailable = isset($data['is_available']) ? (int)$data['is_available'] : 1;

    if (empty($name) || empty($price)) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and price are required']);
        exit;
    }

    try {
        if ($id && $id !== 'new') {
            $sql = "UPDATE ticket_packages SET name=?, description=?, price=?, original_price=?, discount=?, color=?, link=?, is_available=? WHERE id=?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $description, $price, $originalPrice, $discount, $color, $link, $isAvailable, $id]);
            echo json_encode(['success' => true, 'id' => $id]);
        } else {
            // Get next display_order
            $stmt = $pdo->query("SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM ticket_packages");
            $nextOrder = $stmt->fetch()['next_order'];

            $sql = "INSERT INTO ticket_packages (name, description, price, original_price, discount, color, link, display_order, is_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $description, $price, $originalPrice, $discount, $color, $link, $nextOrder, $isAvailable]);
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
