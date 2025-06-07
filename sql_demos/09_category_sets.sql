-- Código por - Joaquín Saldarriaga
-- Tabla Category_sets
CREATE TABLE IF NOT EXISTS Category_sets (
  category_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  PRIMARY KEY (category_id, product_id),
  FOREIGN KEY (category_id) REFERENCES Categories(category_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
