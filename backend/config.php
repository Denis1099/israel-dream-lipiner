<?php
// Database configuration - Keep this file OUTSIDE your web root!
// Path should be: /home/denis109/client_projects/israel-dream-lipiner/backend/config.php

define('DB_HOST', 'localhost');
define('DB_NAME', 'u556043506_real_estate');
define('DB_USER', 'u556043506_denis109');
define('DB_PASSWORD', 'R#t5FMwQ1');

// Additional security
if (!defined('SECURE_ACCESS')) {
    die('Direct access not allowed');
}

// Email configuration
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'lipiner10@gmail.com');  // Update with your actual email
define('SMTP_PASSWORD', 'your_actual_email_password');  // Update with your actual password
define('NOTIFICATION_EMAIL', 'lipiner10@gmail.com');  // Where form submissions are sent

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');
?> 