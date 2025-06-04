CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    service_type VARCHAR(100),
    message TEXT,
    created_at DATETIME NOT NULL,
    status ENUM('new', 'contacted', 'converted', 'lost') DEFAULT 'new',
    notes TEXT,
    INDEX idx_created_at (created_at),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 