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

// Email configuration for jetserver/cPanel
define('SMTP_HOST', 'mail.fuks-law.co.il');  // jetserver/cPanel SMTP host
define('SMTP_PORT', 587);  // Or 465 for SSL
define('SMTP_USERNAME', 'yaron@fuks-law.co.il');  // Your actual email
define('SMTP_PASSWORD', 'ef4]~($n~d2d^-XO');  // Your actual password
define('NOTIFICATION_EMAIL', 'yaron@fuks-law.co.il');  // Where form submissions are sent

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');
?> 