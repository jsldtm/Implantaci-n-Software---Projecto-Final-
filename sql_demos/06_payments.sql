-- Tabla Payments
CREATE TABLE IF NOT EXISTS Payments (
  payment_id BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(15) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
