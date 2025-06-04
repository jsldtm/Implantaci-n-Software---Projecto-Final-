# SQL Demos - Schema y Características Avanzadas

Scripts SQL ordenados secuencialmente para implementar el schema completo y características avanzadas de MySQL Workbench.

**IMPORTANTE:** Estos archivos implementan TODAS las características documentadas en el Módulo 4. Ejecutar en orden numérico.

## Requisitos

- MySQL Workbench 8.0+
- Base de datos `db_finditall`
- Permisos de administración para crear triggers y índices

## Archivos de Schema (Ejecutar en orden)

### Schema Básico (01-09)
- `01_schema.sql`: Creación de base de datos
- `02_users.sql`: Tabla Users con roles user/admin
- `03_categories.sql`: Tabla Categories
- `04_products.sql`: Tabla Products
- `05_carts.sql`: Tabla Carts
- `06_payments.sql`: Tabla Payments
- `07_orders.sql`: Tabla Orders
- `08_item_in_cart.sql`: Tabla Item_in_cart
- `09_category_sets.sql`: Tabla Category_sets

### Datos de Prueba (10-16)
- `10_insert_categories.sql`: Categorías reales
- `11_insert_products.sql`: Productos básicos
- `13-16_insert_*`: Datos completos (190 productos)

### Características Avanzadas (17-21)
- `17_data_cleaning_procedures.sql`: Limpieza de datos
- `18_temporal_audit_triggers.sql`: Auditoría temporal
- `19_performance_optimization.sql`: Índices y optimización
- `20_complete_schema_with_constraints.sql`: Schema completo
- `21_innodb_configuration.sql`: Configuración InnoDB

## Cómo ejecutar

```sh
node sql_demos/mysql-connection-example.js
node sql_demos/mysql-ingest-example.js
```