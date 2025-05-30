# SQL Examples for MySQL Integration (finditall)

Estos archivos muestran cómo se puede conectar, consultar, insertar, actualizar y eliminar datos en una base de datos MySQL llamada `finditall`.

**IMPORTANTE:** Ningún archivo depende de otro ni se importa en el proyecto principal. Son scripts y archivos SQL sueltos, ideales para mostrar el proceso de ingestión y consulta de datos, como pide tu profesor. No están conectados al resto del sistema.

## Requisitos
- Tener Node.js instalado
- Instalar el paquete `mysql2` ejecutando:
  ```sh
  npm install mysql2
  ```

---

## 1. Crear la tabla (en MySQL Workbench)

Ejecuta en MySQL Workbench:

```
1_create_table_products.sql
```

Esto crea la tabla `products` en la base de datos `finditall`.

---

## 2. Insertar productos de ejemplo (en MySQL Workbench)

Ejecuta:

```
2_insert_products.sql
```

Esto añade productos de ejemplo a la tabla.

---

## 3. Consultar productos (en MySQL Workbench)

Ejecuta:

```
3_select_products.sql
```

Esto muestra todos los productos en la tabla.

---

## 4. Insertar producto desde Node.js

Ejecuta en terminal:

```
node sql_examples/4_node_insert_example.js
```

---

## 5. Consultar productos desde Node.js

```
node sql_examples/5_node_select_example.js
```

---

## 6. Actualizar producto desde Node.js

```
node sql_examples/6_node_update_example.js
```

---

## 7. Eliminar producto desde Node.js

```
node sql_examples/7_node_delete_example.js
```

---

## Configuración de conexión

- **host:** 127.0.0.1
- **port:** 3310
- **user:** root
- **password:** reciprocityismycurrency
- **database:** finditall

---

## Notas
- Puedes modificar, programar y añadir datos desde MySQL Workbench o desde los scripts Node.js.
- Los scripts Node.js son independientes y no requieren imports entre sí ni con el resto del proyecto.

---

¡Listo para impresionar a tu profe!
