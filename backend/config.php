<?php
// Database configuration - Keep this file OUTSIDE your web root!
// Path should be: /home/denis109/client_projects/israel-dream-lipiner/backend/config.php

define('DB_HOST', 'localhost');
define('DB_NAME', 'your_jetserver_database_name');  // Update with actual jetserver DB name
define('DB_USER', 'your_jetserver_database_user');   // Update with actual jetserver DB user
define('DB_PASSWORD', 'your_jetserver_database_password'); // Update with actual jetserver DB password

// Additional security
if (!defined('SECURE_ACCESS')) {
    die('Direct access not allowed');
}

// Email configuration
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'info@fuks-law.co.il');  // Update with your actual email
define('SMTP_PASSWORD', 'your_actual_email_password');  // Update with your actual password
define('NOTIFICATION_EMAIL', 'win4you2@gmail.com');  // Where form submissions are sent

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');
?> 