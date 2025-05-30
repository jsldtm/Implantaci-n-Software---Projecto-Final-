-- 8_create_table_category_sets.sql
CREATE TABLE IF NOT EXISTS Category_sets (
  category_id BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
  product_id BIGINT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (category_id) REFERENCES Categories(category_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
