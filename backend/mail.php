<?php
require_once 'config.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

class Mailer {
    private $mail;

    public function __construct() {
        $this->mail = new PHPMailer(true);
        
        // Server settings
        $this->mail->isSMTP();
        $this->mail->Host = SMTP_HOST;
        $this->mail->SMTPAuth = true;
        $this->mail->Username = SMTP_USERNAME;
        $this->mail->Password = SMTP_PASSWORD;
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $this->mail->Port = SMTP_PORT;
        $this->mail->CharSet = 'UTF-8';

        // Recipients
        $this->mail->setFrom(SMTP_USERNAME, 'Avi Lipiner Website');
        $this->mail->addAddress(NOTIFICATION_EMAIL);
    }

    public function sendLeadNotification($leadData) {
        try {
            $this->mail->isHTML(true);
            $this->mail->Subject = 'New Lead from Website - ' . $leadData['name'];
            
            $body = "
                <h2>New Lead Received</h2>
                <p><strong>Name:</strong> {$leadData['name']}</p>
                <p><strong>Phone:</strong> {$leadData['phone']}</p>
                <p><strong>Email:</strong> {$leadData['email']}</p>
                <p><strong>Service Type:</strong> {$leadData['service_type']}</p>
                <p><strong>Message:</strong></p>
                <p>{$leadData['message']}</p>
                <p><strong>Received:</strong> " . date('Y-m-d H:i:s') . "</p>
            ";
            
            $this->mail->Body = $body;
            $this->mail->AltBody = strip_tags($body);
            
            $this->mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Email sending failed: " . $e->getMessage());
            throw new Exception("Failed to send email notification");
        }
    }
}
?> 