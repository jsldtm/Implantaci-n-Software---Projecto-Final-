-- Código por Joaquín Saldarriaga
-- Fecha - 3 de mayo de 2025
-- Triggers de auditoría temporal para MySQL Workbench

USE db_finditall;

-- Trigger para actualizar created_at en Users
DELIMITER $$
CREATE TRIGGER users_before_insert
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
    SET NEW.created_at = NOW();
    SET NEW.updated_at = NOW();
END$$
DELIMITER ;

-- Trigger para actualizar updated_at en Users
DELIMITER $$
CREATE TRIGGER users_before_update
BEFORE UPDATE ON Users
FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();
END$$
DELIMITER ;

-- Trigger para actualizar created_at en Products
DELIMITER $$
CREATE TRIGGER products_before_insert
BEFORE INSERT ON Products
FOR EACH ROW
BEGIN
    SET NEW.created_at = NOW();
    SET NEW.updated_at = NOW();
END$$
DELIMITER ;

-- Trigger para actualizar updated_at en Products
DELIMITER $$
CREATE TRIGGER products_before_update
BEFORE UPDATE ON Products
FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();
END$$
DELIMITER ;

-- Trigger para actualizar created_at en Orders
DELIMITER $$
CREATE TRIGGER orders_before_insert
BEFORE INSERT ON Orders
FOR EACH ROW
BEGIN
    SET NEW.created_at = NOW();
    SET NEW.updated_at = NOW();
END$$
DELIMITER ;

-- Trigger para actualizar updated_at en Orders
DELIMITER $$
CREATE TRIGGER orders_before_update
BEFORE UPDATE ON Orders
FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();
END$$
DELIMITER ;

-- Crear tabla de auditoría para cambios importantes
CREATE TABLE IF NOT EXISTS audit_log (
    audit_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    operation_type VARCHAR(10) NOT NULL,
    record_id BIGINT NOT NULL,
    old_values TEXT,
    new_values TEXT,
    user_id BIGINT,
    audit_timestamp DATETIME DEFAULT NOW()
);

-- Trigger de auditoría para cambios en Products
DELIMITER $$
CREATE TRIGGER products_audit_update
AFTER UPDATE ON Products
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (
        table_name, 
        operation_type, 
        record_id, 
        old_values, 
        new_values,
        audit_timestamp
    ) VALUES (
        'Products',
        'UPDATE',
        NEW.product_id,
        CONCAT('price:', OLD.product_price, ',stock:', OLD.is_in_stock),
        CONCAT('price:', NEW.product_price, ',stock:', NEW.is_in_stock),
        NOW()
    );
END$$
DELIMITER ;

-- Trigger de auditoría para eliminaciones en Products
DELIMITER $$
CREATE TRIGGER products_audit_delete
AFTER DELETE ON Products
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (
        table_name, 
        operation_type, 
        record_id, 
        old_values,
        audit_timestamp
    ) VALUES (
        'Products',
        'DELETE',
        OLD.product_id,
        CONCAT('name:', OLD.product_name, ',price:', OLD.product_price),
        NOW()
    );
END$$
DELIMITER ;

-- Trigger de auditoría para nuevas órdenes
DELIMITER $$
CREATE TRIGGER orders_audit_insert
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (
        table_name, 
        operation_type, 
        record_id, 
        new_values,
        user_id,
        audit_timestamp
    ) VALUES (
        'Orders',
        'INSERT',
        NEW.order_id,
        CONCAT('total:', NEW.total_amount, ',status:', NEW.order_status),
        NEW.user_id,
        NOW()
    );
END$$
DELIMITER ;

-- Consultas para ver la auditoría

-- Ver cambios recientes en productos
SELECT 
    audit_id,
    operation_type,
    record_id,
    old_values,
    new_values,
    audit_timestamp
FROM audit_log 
WHERE table_name = 'Products' 
ORDER BY audit_timestamp DESC 
LIMIT 10;

-- Ver todas las órdenes creadas hoy
SELECT 
    audit_id,
    record_id,
    new_values,
    user_id,
    audit_timestamp
FROM audit_log 
WHERE table_name = 'Orders' 
AND operation_type = 'INSERT'
AND DATE(audit_timestamp) = CURDATE();

-- Ver actividad por usuario
SELECT 
    user_id,
    COUNT(*) as total_actions,
    MAX(audit_timestamp) as last_action
FROM audit_log 
WHERE user_id IS NOT NULL
GROUP BY user_id
ORDER BY total_actions DESC;

-- Consulta para ver todos los triggers creados
SHOW TRIGGERS;