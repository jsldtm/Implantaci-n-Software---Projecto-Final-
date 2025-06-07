-- Código por - Joaquín Saldarriaga
-- Tabla Categories
CREATE TABLE IF NOT EXISTS Categories (
  category_id BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(20) UNIQUE NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
);
