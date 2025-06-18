<?php
// For debugging (turn off display for production)
error_reporting(E_ALL); // Keep reporting all errors...
ini_set('display_errors', 0); // ...but don't display them to the user
// error_log('submit-lead.php (israel-dream) script started.'); // Optional: uncomment for verbose logging

// CORS Headers - Allow requests from the israel-dream subdomain
header('Access-Control-Allow-Origin: https://fuks-law.co.il');
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

// Load database configuration from secure config file
define('SECURE_ACCESS', true);
require_once __DIR__ . '/config.php';

$db_host = DB_HOST;
$db_name = 'u556043506_real_estate'; // Keep your actual database name
$db_user = 'u556043506_denis109';    // Keep your actual database user
$db_pass = DB_PASSWORD;

// Email configuration
  $admin_email = 'win4you2@gmail.com';

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
    $service_type = isset($data['serviceType']) ? $data['serviceType'] : 'Not specified';

    // Set source: Use provided source, otherwise default to 'israel-dream-website'
    $source = isset($data['source']) && !empty($data['source']) ? $data['source'] : 'israel-dream-website';

    if (empty($name) || empty($phone)) {
        throw new Exception('Name and phone are required fields');
    }

    // Prepare email content
    $subject = 'ליד חדש מאתר - Israel Dream'; // Updated Subject
    $email_content = "התקבל ליד חדש מאתר Israel Dream:\n\n";
    $email_content .= "שם: $name\n";
    $email_content .= "טלפון: $phone\n";
    $email_content .= "אימייל: $email\n";
    $email_content .= "סוג שירות: $service_type\n";
    if ($message) {
        $email_content .= "הודעה: $message\n";
    }
    $email_content .= "מקור: $source\n"; // Source will be specific or 'israel-dream-website'

    // Set email headers
    $headers = "From: no-reply@fuks-law.co.il\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    $mail_sent = mail($admin_email, $subject, $email_content, $headers);

    // Try to store in database (same table 'leads')
    $db_stored = false;
    $db_error = null;
    
    try {
        $pdo = new PDO(
            "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4",
            $db_user,
            $db_pass,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );

        // Check if table exists, create it if not (Should already exist from real-estate site)
        $tableExists = $pdo->query("SHOW TABLES LIKE 'leads'")->rowCount() > 0;

        if (!$tableExists) {
            // In case the table doesn't exist for some reason
             error_log("Attempted to create 'leads' table, but it should already exist.");
            $pdo->exec("CREATE TABLE leads (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                phone VARCHAR(50) NOT NULL,
                message TEXT,
                service_type VARCHAR(100),
                source VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )");
        }

        // Check if service_type column exists
        $columns = $pdo->query("SHOW COLUMNS FROM leads LIKE 'service_type'")->rowCount();
        $hasServiceType = $columns > 0;

        // Insert into database with appropriate fields
        if ($hasServiceType) {
            $stmt = $pdo->prepare('INSERT INTO leads (name, email, phone, message, service_type, source) VALUES (?, ?, ?, ?, ?, ?)');
            $stmt->execute([$name, $email, $phone, $message, $service_type, $source]);
        } else {
            // Fallback: insert without service_type column
            $stmt = $pdo->prepare('INSERT INTO leads (name, email, phone, message, source) VALUES (?, ?, ?, ?, ?)');
            $stmt->execute([$name, $email, $phone, $message, $source]);
        }
        $db_stored = true;
        
    } catch (PDOException $db_exception) {
        // Log DB errors but don't necessarily fail the whole request if email was sent
        $db_error = $db_exception->getMessage();
        error_log("Database connection or query failed (israel-dream): " . $db_error);
    } catch (Exception $db_exception) {
        $db_error = $db_exception->getMessage();
        error_log("Database error (israel-dream): " . $db_error);
    }

    // Return success response with detailed status
    echo json_encode([
        'success' => true, 
        'email_sent' => $mail_sent,
        'db_stored' => $db_stored,
        'db_error' => $db_error,
        'message' => 'Form processed successfully'
    ]);

} catch (Exception $e) {
    error_log("General error in submit-lead.php (israel-dream): " . $e->getMessage());
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?> 