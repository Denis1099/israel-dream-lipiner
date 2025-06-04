<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'db.php';
require_once 'mail.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $requiredFields = ['name', 'phone'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }
    
    // Sanitize input
    $leadData = [
        'name' => filter_var($data['name'], FILTER_SANITIZE_STRING),
        'phone' => filter_var($data['phone'], FILTER_SANITIZE_STRING),
        'email' => filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL),
        'service_type' => filter_var($data['service_type'] ?? '', FILTER_SANITIZE_STRING),
        'message' => filter_var($data['message'] ?? '', FILTER_SANITIZE_STRING)
    ];
    
    // Store in database
    $db = new Database();
    $leadId = $db->storeLead($leadData);
    
    // Send email notification
    $mailer = new Mailer();
    $mailer->sendLeadNotification($leadData);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Lead submitted successfully',
        'lead_id' => $leadId
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?> 