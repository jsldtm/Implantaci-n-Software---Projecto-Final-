-- Código por Joaquín Saldarriaga
-- Fecha - 3 de mayo de 2025
-- Optimizaciones de performance e índices para MySQL Workbench

USE db_finditall;

-- Índices para mejorar performance en consultas frecuentes

-- Índice en email de usuarios para login rápido
CREATE INDEX idx_users_email ON Users(user_email);

-- Índice en categoría de productos para filtros
CREATE INDEX idx_products_category ON Products(category_id);

-- Índice en stock de productos para búsquedas rápidas
CREATE INDEX idx_products_stock ON Products(is_in_stock);

-- Índice combinado para búsquedas de productos disponibles por categoría
CREATE INDEX idx_products_category_stock ON Products(category_id, is_in_stock);

-- Índice en precio para ordenamientos y filtros
CREATE INDEX idx_products_price ON Products(product_price);

-- Índice en usuario para órdenes rápidas
CREATE INDEX idx_orders_user ON Orders(user_id);

-- Índice en fecha de órdenes para reportes
CREATE INDEX idx_orders_date ON Orders(created_at);

-- Índice en carrito para búsquedas rápidas
CREATE INDEX idx_carts_user ON Carts(user_id);

-- Configuración de InnoDB para mejor performance
SET GLOBAL innodb_buffer_pool_size = 128M;
SET GLOBAL innodb_log_file_size = 64M;
SET GLOBAL innodb_flush_log_at_trx_commit = 2;

-- Consultas optimizadas para casos de uso frecuentes

-- Buscar productos disponibles por categoría (usa índice combinado)
EXPLAIN SELECT product_id, product_name, product_price 
FROM Products 
WHERE category_id = 1 AND is_in_stock = true
ORDER BY product_price;

-- Buscar órdenes de un usuario (usa índice de usuario)
EXPLAIN SELECT order_id, total_amount, created_at 
FROM Orders 
WHERE user_id = 1 
ORDER BY created_at DESC;

-- Login de usuario (usa índice de email)
EXPLAIN SELECT user_id, user_name, user_role 
FROM Users 
WHERE user_email = 'test@test.com';

-- Productos más vendidos (consulta optimizada)
SELECT 
    p.product_id,
    p.product_name,
    COUNT(ic.product_id) as total_vendido
FROM Products p
JOIN Item_in_cart ic ON p.product_id = ic.product_id
JOIN Orders o ON ic.order_id = o.order_id
WHERE o.order_status = 'completed'
GROUP BY p.product_id, p.product_name
ORDER BY total_vendido DESC
LIMIT 10;

-- Ventas por categoría (reporte optimizado)
SELECT 
    c.category_name,
    COUNT(o.order_id) as total_ordenes,
    SUM(o.total_amount) as total_ventas
FROM Categories c
JOIN Products p ON c.category_id = p.category_id
JOIN Item_in_cart ic ON p.product_id = ic.product_id
JOIN Orders o ON ic.order_id = o.order_id
WHERE o.order_status = 'completed'
GROUP BY c.category_id, c.category_name
ORDER BY total_ventas DESC;

-- Mostrar información de índices creados
SELECT 
    TABLE_NAME,
    INDEX_NAME,
    COLUMN_NAME,
    SEQ_IN_INDEX
FROM INFORMATION_SCHEMA.STATISTICS 
WHERE TABLE_SCHEMA = 'db_finditall'
AND TABLE_NAME IN ('Users', 'Products', 'Orders', 'Carts')
ORDER BY TABLE_NAME, INDEX_NAME, SEQ_IN_INDEX;

-- Análisis de performance de consultas lentas
SELECT 
    SCHEMA_NAME,
    DIGEST_TEXT,
    COUNT_STAR,
    AVG_TIMER_WAIT/1000000000 AS avg_time_seconds,
    MAX_TIMER_WAIT/1000000000 AS max_time_seconds
FROM performance_schema.events_statements_summary_by_digest 
WHERE SCHEMA_NAME = 'db_finditall'
ORDER BY AVG_TIMER_WAIT DESC
LIMIT 10;

-- Configuraciones recomendadas para production
-- (Estas son sugerencias, ajustar según el servidor)
/*
SET GLOBAL innodb_buffer_pool_size = 1G;
SET GLOBAL innodb_log_buffer_size = 32M;
SET GLOBAL innodb_flush_method = O_DIRECT;
SET GLOBAL query_cache_size = 64M;
SET GLOBAL query_cache_type = 1;
*/
