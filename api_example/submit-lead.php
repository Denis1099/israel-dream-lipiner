
<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get the JSON data from the request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate required data
if (!isset($data['name']) || !isset($data['phone'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

// Sanitize inputs
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$phone = filter_var($data['phone'], FILTER_SANITIZE_STRING);
$email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';
$serviceType = isset($data['serviceType']) ? filter_var($data['serviceType'], FILTER_SANITIZE_STRING) : '';
$message = isset($data['message']) ? filter_var($data['message'], FILTER_SANITIZE_STRING) : '';
$source = isset($data['source']) ? filter_var($data['source'], FILTER_SANITIZE_STRING) : 'website';
$timestamp = date('Y-m-d H:i:s');

// Database connection details
$host = 'localhost';        // Usually 'localhost'
$dbname = 'your_database';  // Your database name
$username = 'your_username'; // Database username
$password = 'your_password'; // Database password

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Insert lead into database
    $stmt = $pdo->prepare("INSERT INTO leads (name, phone, email, service_type, message, source, created_at) 
                          VALUES (:name, :phone, :email, :serviceType, :message, :source, :timestamp)");
    
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':serviceType', $serviceType);
    $stmt->bindParam(':message', $message);
    $stmt->bindParam(':source', $source);
    $stmt->bindParam(':timestamp', $timestamp);
    
    $stmt->execute();
    $leadId = $pdo->lastInsertId();
    
    // Send email notification
    $to = 'client@example.com'; // Your client's email
    $subject = 'לידים חדשים מאתר עו"ד אבי ליפינר';
    
    // Create email body in HTML format with RTL support
    $emailBody = '
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
        <meta charset="UTF-8">
        <title>ליד חדש מהאתר</title>
        <style>
            body { font-family: Arial, sans-serif; direction: rtl; }
            .container { padding: 20px; max-width: 600px; margin: 0 auto; }
            .header { background: #b08d57; color: white; padding: 15px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; }
            .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>התקבל ליד חדש מאתר עו"ד אבי ליפינר</h2>
            </div>
            <div class="content">
                <div class="field">
                    <span class="label">שם מלא:</span> ' . $name . '
                </div>
                <div class="field">
                    <span class="label">טלפון:</span> ' . $phone . '
                </div>';
    
    if (!empty($email)) {
        $emailBody .= '
                <div class="field">
                    <span class="label">דוא"ל:</span> ' . $email . '
                </div>';
    }
    
    if (!empty($serviceType)) {
        $emailBody .= '
                <div class="field">
                    <span class="label">סוג העסקה:</span> ' . $serviceType . '
                </div>';
    }
    
    if (!empty($message)) {
        $emailBody .= '
                <div class="field">
                    <span class="label">הודעה:</span> ' . nl2br($message) . '
                </div>';
    }
    
    $emailBody .= '
                <div class="field">
                    <span class="label">מקור:</span> ' . $source . '
                </div>
                <div class="field">
                    <span class="label">זמן הגשה:</span> ' . $timestamp . '
                </div>
            </div>
            <div class="footer">
                <p>הודעה זו נשלחה באופן אוטומטי מאתר עו"ד אבי ליפינר</p>
            </div>
        </div>
    </body>
    </html>';
    
    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: no-reply@your-domain.com" . "\r\n";
    
    // Send email
    mail($to, $subject, $emailBody, $headers);
    
    // Send success response
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Lead saved successfully']);
    
} catch (PDOException $e) {
    // Log error (in a production environment, log to file instead of displaying)
    error_log("Database Error: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: Unable to save lead']);
}
?>
