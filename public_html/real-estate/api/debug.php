<?php
// Set headers for CORS and content type
header('Access-Control-Allow-Origin: https://real-estate.lipiner.co.il');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Create a log file
$log_file = 'debug_log.txt';
file_put_contents($log_file, "Request received: " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);
file_put_contents($log_file, "Request method: " . $_SERVER['REQUEST_METHOD'] . "\n", FILE_APPEND);

// Handle OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    file_put_contents($log_file, "OPTIONS request handled\n", FILE_APPEND);
    exit();
}

// Get raw input
$input = file_get_contents('php://input');
file_put_contents($log_file, "Raw input: " . $input . "\n", FILE_APPEND);

// Try to decode JSON
$data = json_decode($input, true);
if ($data) {
    file_put_contents($log_file, "JSON decoded successfully: " . print_r($data, true) . "\n", FILE_APPEND);
} else {
    file_put_contents($log_file, "JSON decode error: " . json_last_error_msg() . "\n", FILE_APPEND);
}

// Test database connection
try {
    $db_host = 'localhost';
    $db_name = 'u556043506_real_estate'; 
    $db_user = 'u556043506_denis109';
    $db_pass = 'R#t5FMwQ1';
    
    $pdo = new PDO(
        "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4",
        $db_user,
        $db_pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    file_put_contents($log_file, "Database connection successful\n", FILE_APPEND);
    
    // Check if table exists
    $stmt = $pdo->query("SHOW TABLES LIKE 'leads'");
    if ($stmt->rowCount() > 0) {
        file_put_contents($log_file, "Table 'leads' exists\n", FILE_APPEND);
        
        // Check table structure
        $stmt = $pdo->query("DESCRIBE leads");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        file_put_contents($log_file, "Table columns: " . implode(", ", $columns) . "\n", FILE_APPEND);
    } else {
        file_put_contents($log_file, "Table 'leads' does not exist!\n", FILE_APPEND);
    }
} catch (Exception $e) {
    file_put_contents($log_file, "Database error: " . $e->getMessage() . "\n", FILE_APPEND);
}

// Return success response
echo json_encode([
    'success' => true, 
    'message' => 'Debug script executed. Check debug_log.txt for details.'
]); 