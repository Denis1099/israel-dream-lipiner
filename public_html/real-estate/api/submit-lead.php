<?php
// For debugging (turn off display for production)
error_reporting(E_ALL); // Keep reporting all errors...
ini_set('display_errors', 0); // ...but don't display them to the user
// error_log('submit-lead.php script started.'); // Optional: uncomment for verbose logging

// CORS Headers
header('Access-Control-Allow-Origin: https://real-estate.lipiner.co.il');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Database configuration
$db_host = 'localhost';
$db_name = 'u556043506_real_estate';
$db_user = 'u556043506_denis109';
$db_pass = getenv('DB_PASSWORD');

if ($db_pass === false) {
    error_log('Database password environment variable (DB_PASSWORD) not set.');
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server configuration error.']);
    exit;
}

// Email configuration
$admin_email = 'lipiner10@gmail.com';

try {
    // Get and validate POST data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Invalid JSON data: ' . json_last_error_msg());
    }
    
    // Extract form data
    $name = isset($data['name']) ? $data['name'] : '';
    $phone = isset($data['phone']) ? $data['phone'] : '';
    $email = isset($data['email']) ? $data['email'] : 'no-email@provided.com';
    $message = isset($data['message']) ? $data['message'] : '';
    $source = isset($data['source']) ? $data['source'] : 'website';
    
    if (empty($name) || empty($phone)) {
        throw new Exception('Name and phone are required fields');
    }
    
    // Prepare email content
    $subject = 'ליד חדש מאתר נדל"ן';
    $email_content = "התקבל ליד חדש מהאתר:\n\n";
    $email_content .= "שם: $name\n";
    $email_content .= "טלפון: $phone\n";
    $email_content .= "אימייל: $email\n";
    if ($message) {
        $email_content .= "הודעה: $message\n";
    }
    $email_content .= "מקור: $source\n";

    // Set email headers
    $headers = "From: no-reply@lipiner.co.il\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    $mail_sent = mail($admin_email, $subject, $email_content, $headers);
    
    // Try to store in database
    try {
        $pdo = new PDO(
            "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4",
            $db_user,
            $db_pass,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        
        // Check if table exists, create it if not
        $tableExists = $pdo->query("SHOW TABLES LIKE 'leads'")->rowCount() > 0;
        
        if (!$tableExists) {
            // Create table if it doesn't exist
            $pdo->exec("CREATE TABLE leads (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                phone VARCHAR(50) NOT NULL,
                message TEXT,
                source VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )");
        }
        
        // Insert into database
        $stmt = $pdo->prepare('INSERT INTO leads (name, email, phone, message, source) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$name, $email, $phone, $message, $source]);
    } catch (PDOException $db_exception) {
        error_log("Database connection or query failed: " . $db_exception->getMessage());
    } catch (Exception $db_exception) {
        error_log("Database error: " . $db_exception->getMessage());
    }

    // Return success response
    echo json_encode(['success' => true, 'email_sent' => $mail_sent]);

} catch (Exception $e) {
    error_log("General error in submit-lead.php: " . $e->getMessage());
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
} 