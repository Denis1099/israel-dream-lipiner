<?php
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'API endpoint is working!',
    'time' => date('Y-m-d H:i:s')
]); 