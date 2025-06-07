-- Código por - Joaquín Saldarriaga
-- 6_create_table_orders.sql
CREATE TABLE IF NOT EXISTS Orders (
  order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  payment_id BIGINT NOT NULL,
  order_creation_date DATETIME NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  current_state VARCHAR(15) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (payment_id) REFERENCES Payments(payment_id)
);
