#!/bin/bash

# Configuration
HOSTINGER_USER="your_hostinger_username"
HOSTINGER_HOST="your_hostinger_host"
REMOTE_PATH="/domains/lipinier.co.il/public_html/real-estate/backend"

# Create backend directory structure
mkdir -p backend
cd backend

# Create necessary files
cat > config.php << 'EOL'
<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'your_database_username');
define('DB_PASS', 'your_database_password');
define('DB_NAME', 'your_database_name');

define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your_email@lipinier.co.il');
define('SMTP_PASSWORD', 'your_email_password');
define('NOTIFICATION_EMAIL', 'your_email@lipinier.co.il');

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');
?>
EOL

cat > submit_lead.php << 'EOL'
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (empty($data['name']) || empty($data['phone'])) {
        throw new Exception("Name and phone are required");
    }
    
    // Connect to database
    $conn = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
        DB_USER,
        DB_PASS,
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'")
    );
    
    // Store lead
    $stmt = $conn->prepare("
        INSERT INTO leads (name, phone, email, service_type, message, created_at)
        VALUES (:name, :phone, :email, :service_type, :message, NOW())
    ");
    
    $stmt->execute([
        ':name' => $data['name'],
        ':phone' => $data['phone'],
        ':email' => $data['email'] ?? '',
        ':service_type' => $data['service_type'] ?? '',
        ':message' => $data['message'] ?? ''
    ]);
    
    // Send email
    $to = NOTIFICATION_EMAIL;
    $subject = "New Lead: " . $data['name'];
    $message = "
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> {$data['name']}</p>
        <p><strong>Phone:</strong> {$data['phone']}</p>
        <p><strong>Email:</strong> {$data['email']}</p>
        <p><strong>Service Type:</strong> {$data['service_type']}</p>
        <p><strong>Message:</strong></p>
        <p>{$data['message']}</p>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: " . SMTP_USERNAME . "\r\n";
    
    mail($to, $subject, $message, $headers);
    
    echo json_encode(['success' => true, 'message' => 'Lead submitted successfully']);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
EOL

# Make the script executable
chmod +x deploy-backend.sh

echo "Backend files created successfully!"
echo "Please update the configuration in config.php with your actual credentials"
echo "Then upload the backend directory to your Hostinger hosting at: $REMOTE_PATH" 