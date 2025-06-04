<?php
require_once 'config.php';

class Database {
    private $conn;

    public function __construct() {
        try {
            $this->conn = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
                DB_USER,
                DB_PASS,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'")
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            error_log("Connection failed: " . $e->getMessage());
            throw new Exception("Database connection failed");
        }
    }

    public function storeLead($data) {
        try {
            $stmt = $this->conn->prepare("
                INSERT INTO leads (
                    name, phone, email, service_type, message, created_at
                ) VALUES (
                    :name, :phone, :email, :service_type, :message, NOW()
                )
            ");

            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':phone', $data['phone']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':service_type', $data['service_type']);
            $stmt->bindParam(':message', $data['message']);

            $stmt->execute();
            return $this->conn->lastInsertId();
        } catch(PDOException $e) {
            error_log("Lead storage failed: " . $e->getMessage());
            throw new Exception("Failed to store lead");
        }
    }
}
?> 