
-- Create leads table
CREATE TABLE `leads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `service_type` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `source` varchar(50) DEFAULT 'website',
  `created_at` datetime NOT NULL,
  `status` varchar(50) DEFAULT 'new',
  `notes` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create index on created_at for faster sorting
CREATE INDEX idx_leads_created_at ON leads(created_at);

-- Create index on status for filtering
CREATE INDEX idx_leads_status ON leads(status);
