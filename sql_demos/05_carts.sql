-- Código por - Joaquín Saldarriaga
-- Tabla Carts
CREATE TABLE IF NOT EXISTS Carts (
  id BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  total_num_products INT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
