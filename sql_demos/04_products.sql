-- Tabla Products
CREATE TABLE IF NOT EXISTS Products (
  product_id BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(20) NOT NULL,
  product_description VARCHAR(400) NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  category_id BIGINT NOT NULL,
  is_in_stock BOOLEAN NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);
