# SQL Demo para FindItAll

Estos archivos muestran cómo se puede conectar, consultar e insertar datos en una base de datos MySQL desde Node.js, usando la base de datos `finditall`.

**IMPORTANTE:** Estos archivos NO están conectados al resto del sistema ni importados en ningún otro archivo. Son solo para fines demostrativos y para evidenciar el proceso de obtención e ingestión de datos.

## Requisitos
- Tener Node.js instalado
- Instalar el paquete `mysql2` ejecutando:
  ```sh
  npm install mysql2
  ```
- Tener corriendo un servidor MySQL en `127.0.0.1:3310` con usuario `root`, contraseña `reciprocityismycurrency` y base de datos `finditall`.

## Archivos
- `mysql-connection-example.js`: Ejemplo de consulta (SELECT)
- `mysql-ingest-example.js`: Ejemplo de inserción (INSERT)

## Cómo ejecutar
```sh
node sql_demo/mysql-connection-example.js
node sql_demo/mysql-ingest-example.js
```
