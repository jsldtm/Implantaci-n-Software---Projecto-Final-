# SQL Demo para FindItAll

Estos archivos implementan las características avanzadas de base de datos documentadas en el Módulo 4. Son archivos standalone diseñados para futura integración con la aplicación web.

**IMPORTANTE:** Estos archivos NO están conectados al resto del sistema ni importados en ningún archivo .tsx. Son implementaciones completas listas para integración futura.

## Requisitos
- Tener Node.js instalado
- Instalar el paquete `mysql2` ejecutando:
  ```sh
  npm install mysql2
  ```
- Tener corriendo un servidor MySQL con la base de datos `db_finditall`.

## Archivos Básicos
- `mysql-connection-example.js`: Ejemplo de consulta (SELECT)
- `mysql-ingest-example.js`: Ejemplo de inserción (INSERT)
- `mysql-update-example.js`: Ejemplo de actualización (UPDATE)
- `mysql-delete-example.js`: Ejemplo de eliminación (DELETE)

## Archivos Avanzados (Nuevos)
- `mysql-connection-pool-advanced.js`: Pool de conexiones empresarial
- `acid-transactions-system.js`: Sistema ACID con transacciones
- `security-rbac-system.js`: Sistema de seguridad con roles user/admin
- `write-ahead-logging.js`: Sistema de logging para operaciones

## Cómo ejecutar
```sh
# Ejemplos básicos
node sql_demo/mysql-connection-example.js

# Características avanzadas
node sql_demo/acid-transactions-system.js
node sql_demo/security-rbac-system.js
node sql_demo/write-ahead-logging.js
node sql_demo/mysql-ingest-example.js
```
