-- 5_create_table_item_in_cart.sql
CREATE TABLE IF NOT EXISTS Item_in_cart (
  item_in_cart_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  cart_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity_prod INT NOT NULL, -- INT es equivalente a int32 en SQL
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (cart_id) REFERENCES Carts(id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
