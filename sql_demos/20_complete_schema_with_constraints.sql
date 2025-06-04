-- Código por Joaquín Saldarriaga
-- Fecha - 3 de mayo de 2025
-- Schema completo con constraints y validaciones para MySQL Workbench

DROP DATABASE IF EXISTS db_finditall;
CREATE DATABASE db_finditall;
USE db_finditall;

-- Tabla Users con constraints
CREATE TABLE Users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(20) NOT NULL,
    user_role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at DATETIME,
    updated_at DATETIME,
    
    -- Constraints adicionales
    CONSTRAINT chk_email_format CHECK (user_email LIKE '%@%.%'),
    CONSTRAINT chk_password_length CHECK (LENGTH(user_password) >= 6),
    CONSTRAINT chk_name_length CHECK (LENGTH(user_name) >= 2)
);

-- Tabla Categories
CREATE TABLE Categories (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW()
);

-- Tabla Products con constraints
CREATE TABLE Products (
    product_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(20) NOT NULL,
    product_description VARCHAR(400) NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    category_id BIGINT NOT NULL,
    is_in_stock BOOLEAN NOT NULL DEFAULT true,
    created_at DATETIME,
    updated_at DATETIME,
    
    -- Foreign key
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
    
    -- Constraints adicionales
    CONSTRAINT chk_price_positive CHECK (product_price > 0),
    CONSTRAINT chk_name_not_empty CHECK (LENGTH(product_name) > 0),
    CONSTRAINT chk_description_min CHECK (LENGTH(product_description) >= 10)
);

-- Tabla Carts
CREATE TABLE Carts (
    cart_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW(),
    
    -- Foreign key
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Tabla Orders con constraints
CREATE TABLE Orders (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    order_status ENUM('pending', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    created_at DATETIME,
    updated_at DATETIME,
    
    -- Foreign key
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    
    -- Constraints adicionales
    CONSTRAINT chk_total_positive CHECK (total_amount >= 0)
);

-- Tabla Payments con constraints
CREATE TABLE Payments (
    payment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE,
    payment_method ENUM('credit_card', 'debit_card', 'paypal', 'cash') NOT NULL,
    payment_amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
    created_at DATETIME DEFAULT NOW(),
    
    -- Foreign key
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    
    -- Constraints adicionales
    CONSTRAINT chk_payment_positive CHECK (payment_amount > 0)
);

-- Tabla Item_in_cart con constraints
CREATE TABLE Item_in_cart (
    item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cart_id BIGINT,
    order_id BIGINT,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT NOW(),
    
    -- Foreign keys
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    
    -- Constraints adicionales
    CONSTRAINT chk_quantity_positive CHECK (quantity > 0),
    CONSTRAINT chk_cart_or_order CHECK (
        (cart_id IS NOT NULL AND order_id IS NULL) OR 
        (cart_id IS NULL AND order_id IS NOT NULL)
    )
);

-- Insertar categorías reales
INSERT INTO Categories (category_name) VALUES 
('Office & writing'),
('Technology'),
('Accessories'),
('Shirts'),
('Household'),
('Movies & TV'),
('Pet supplies'),
('Sports'),
('Books');

-- Insertar usuario admin por defecto
INSERT INTO Users (user_name, user_email, user_password, user_role) 
VALUES ('Admin', 'admin@finditall.com', 'admin123', 'admin');

-- Insertar usuario normal de prueba
INSERT INTO Users (user_name, user_email, user_password, user_role) 
VALUES ('Test User', 'user@test.com', 'user123', 'user');

-- Ver estructura de todas las tablas
DESCRIBE Users;
DESCRIBE Categories;
DESCRIBE Products;
DESCRIBE Carts;
DESCRIBE Orders;
DESCRIBE Payments;
DESCRIBE Item_in_cart;

-- Ver todos los constraints
SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE,
    COLUMN_NAME
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu 
    ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
WHERE tc.TABLE_SCHEMA = 'db_finditall'
ORDER BY TABLE_NAME, CONSTRAINT_TYPE;
