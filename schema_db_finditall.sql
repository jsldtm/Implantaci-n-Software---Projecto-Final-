-- 1. Crear el esquema (base de datos)
CREATE SCHEMA IF NOT EXISTS db_finditall;
USE db_finditall;

-- 2. Crear las tablas en orden correcto

-- Tabla Users
CREATE TABLE IF NOT EXISTS Users (
  user_id BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL,
  user_email VARCHAR(50) NOT NULL,
  user_password VARCHAR(20) NOT NULL,
  user_role VARCHAR(6) NOT NULL, -- [client/admin]
  created_at DATETIME,
  updated_at DATETIME
);

-- Tabla Categories
CREATE TABLE IF NOT EXISTS Categories (
  category_id BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(20) UNIQUE NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
);

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

-- Tabla Carts
CREATE TABLE IF NOT EXISTS Carts (
  id BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  total_num_products INT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

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

-- Tabla Orders
CREATE TABLE IF NOT EXISTS Orders (
  order_id BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
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

-- Tabla Item_in_cart
CREATE TABLE IF NOT EXISTS Item_in_cart (
  item_in_cart_id BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
  cart_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity_prod INT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (cart_id) REFERENCES Carts(id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

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
