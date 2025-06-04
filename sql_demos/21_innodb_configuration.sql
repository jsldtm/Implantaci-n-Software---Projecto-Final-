-- Código por Joaquín Saldarriaga
-- Fecha - 3 de mayo de 2025
-- Configuración básica de InnoDB para mejor rendimiento en MySQL Workbench

USE db_finditall;

-- Configuraciones básicas de InnoDB para desarrollo

-- Tamaño del buffer pool (ajustar según RAM disponible)
SET GLOBAL innodb_buffer_pool_size = 134217728; -- 128MB

-- Configuración de logs
SET GLOBAL innodb_log_buffer_size = 16777216; -- 16MB
SET GLOBAL innodb_flush_log_at_trx_commit = 1; -- Máxima seguridad

-- Configuración de archivos
SET GLOBAL innodb_file_per_table = 1; -- Un archivo por tabla

-- Configuración de threads
SET GLOBAL innodb_thread_concurrency = 8; -- Ajustar según CPU

-- Ver configuración actual de InnoDB
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
SHOW VARIABLES LIKE 'innodb_log_buffer_size';
SHOW VARIABLES LIKE 'innodb_flush_log_at_trx_commit';
SHOW VARIABLES LIKE 'innodb_file_per_table';

-- Estadísticas de InnoDB
SELECT 
    VARIABLE_NAME, 
    VARIABLE_VALUE 
FROM INFORMATION_SCHEMA.GLOBAL_STATUS 
WHERE VARIABLE_NAME IN (
    'Innodb_buffer_pool_reads',
    'Innodb_buffer_pool_read_requests',
    'Innodb_buffer_pool_pages_data',
    'Innodb_buffer_pool_pages_free'
);

-- Información del buffer pool
SELECT 
    pool_id,
    pool_size,
    free_buffers,
    database_pages
FROM INFORMATION_SCHEMA.INNODB_BUFFER_POOL_STATS;

-- Ver el uso del tablespace
SELECT 
    TABLESPACE_NAME,
    FILE_NAME,
    FILE_TYPE,
    TOTAL_EXTENTS,
    EXTENT_SIZE,
    INITIAL_SIZE,
    MAXIMUM_SIZE
FROM INFORMATION_SCHEMA.FILES 
WHERE TABLESPACE_NAME = 'innodb_system';

-- Monitorear locks y transacciones
SELECT 
    trx_id,
    trx_state,
    trx_started,
    trx_isolation_level,
    trx_tables_locked,
    trx_rows_locked
FROM INFORMATION_SCHEMA.INNODB_TRX;

-- Ver información de páginas por tabla
SELECT 
    TABLE_SCHEMA,
    TABLE_NAME,
    ENGINE,
    TABLE_ROWS,
    DATA_LENGTH,
    INDEX_LENGTH,
    DATA_FREE
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'db_finditall' 
AND ENGINE = 'InnoDB';

-- Análisis de fragmentación
SELECT 
    TABLE_NAME,
    ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS 'Tamaño MB',
    ROUND((DATA_FREE) / 1024 / 1024, 2) AS 'Fragmentado MB',
    ROUND((DATA_FREE / (DATA_LENGTH + INDEX_LENGTH)) * 100, 2) AS 'Fragmentación %'
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'db_finditall' 
AND ENGINE = 'InnoDB'
AND (DATA_LENGTH + INDEX_LENGTH) > 0;

-- Comando para optimizar tablas fragmentadas
-- (Ejecutar solo si hay mucha fragmentación)
/*
OPTIMIZE TABLE Users;
OPTIMIZE TABLE Products;
OPTIMIZE TABLE Orders;
OPTIMIZE TABLE Item_in_cart;
*/

-- Configuración recomendada para my.cnf (archivo de configuración MySQL)
/*
[mysqld]
# Configuración básica de InnoDB
innodb_buffer_pool_size = 128M
innodb_log_file_size = 64M
innodb_log_buffer_size = 16M
innodb_flush_log_at_trx_commit = 1
innodb_file_per_table = 1
innodb_thread_concurrency = 8

# Configuración de query cache
query_cache_type = 1
query_cache_size = 32M
query_cache_limit = 2M

# Configuración de conexiones
max_connections = 100
max_connect_errors = 10
*/

-- Ver el estatus general del motor InnoDB
SHOW ENGINE INNODB STATUS\G
