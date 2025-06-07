-- Código por - Joaquín Saldarriaga
-- 7_create_table_payments.sql
CREATE TABLE IF NOT EXISTS Payments (
  payment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(15) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
