-- Código por Joaquín Saldarriaga
-- Fecha - 3 de mayo de 2025
-- Procedimientos de limpieza de datos para MySQL Workbench

USE db_finditall;

-- Eliminar datos duplicados en productos
DELETE p1 FROM Products p1
INNER JOIN Products p2 
WHERE p1.product_id > p2.product_id 
AND p1.product_name = p2.product_name 
AND p1.category_id = p2.category_id;

-- Limpiar precios con formato incorrecto
UPDATE Products 
SET product_price = CAST(
    REPLACE(REPLACE(product_price, '$', ''), ' MXN', '') 
    AS DECIMAL(10,2)
) 
WHERE product_price LIKE '%$%' OR product_price LIKE '%MXN%';

-- Actualizar productos sin precio con precio promedio de su categoría
UPDATE Products p1
SET product_price = (
    SELECT AVG(product_price) 
    FROM Products p2 
    WHERE p2.category_id = p1.category_id 
    AND p2.product_price IS NOT NULL
    AND p2.product_price > 0
) 
WHERE product_price IS NULL OR product_price = 0;

-- Limpiar descripciones vacías o muy cortas
UPDATE Products 
SET product_description = CONCAT('Producto de calidad en categoría ', category_id)
WHERE LENGTH(product_description) < 10 OR product_description IS NULL;

-- Corregir nombres de productos que están en mayúsculas
UPDATE Products 
SET product_name = CONCAT(
    UPPER(LEFT(product_name, 1)),
    LOWER(SUBSTRING(product_name, 2))
)
WHERE product_name = UPPER(product_name);

-- Eliminar usuarios con emails inválidos
DELETE FROM Users 
WHERE user_email NOT LIKE '%@%.%' 
OR LENGTH(user_email) < 5;

-- Corregir roles de usuarios que no sean 'user' o 'admin'
UPDATE Users 
SET user_role = 'user' 
WHERE user_role NOT IN ('user', 'admin');

-- Actualizar productos que están fuera de stock pero no marcados
UPDATE Products 
SET is_in_stock = false 
WHERE product_price <= 0 OR product_name LIKE '%discontinuado%';

-- Limpiar carritos vacíos o huérfanos
DELETE FROM Carts 
WHERE cart_id NOT IN (
    SELECT DISTINCT cart_id 
    FROM Item_in_cart 
    WHERE cart_id IS NOT NULL
);

-- Eliminar items de carrito que referencian productos inexistentes
DELETE FROM Item_in_cart 
WHERE product_id NOT IN (
    SELECT product_id 
    FROM Products
);

-- Verificar integridad de órdenes
DELETE FROM Orders 
WHERE user_id NOT IN (
    SELECT user_id 
    FROM Users
);

-- Consultas de verificación para revisar la limpieza

-- Ver productos duplicados restantes
SELECT product_name, COUNT(*) as duplicates 
FROM Products 
GROUP BY product_name, category_id 
HAVING COUNT(*) > 1;

-- Ver precios que pueden estar incorrectos
SELECT product_id, product_name, product_price 
FROM Products 
WHERE product_price > 10000 OR product_price < 1;

-- Ver usuarios con emails sospechosos
SELECT user_id, user_name, user_email 
FROM Users 
WHERE user_email NOT LIKE '%@%.%';

-- Ver productos sin categoría válida
SELECT p.product_id, p.product_name, p.category_id
FROM Products p
LEFT JOIN Categories c ON p.category_id = c.category_id
WHERE c.category_id IS NULL;

-- Estadísticas de limpieza
SELECT 
    'Productos totales' as descripcion,
    COUNT(*) as cantidad
FROM Products
UNION ALL
SELECT 
    'Usuarios totales',
    COUNT(*)
FROM Users
UNION ALL
SELECT 
    'Órdenes totales',
    COUNT(*)
FROM Orders;