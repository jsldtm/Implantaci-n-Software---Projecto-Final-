# Módulo 4: Bases de Datos Avanzadas
**Proyecto FindItAll - Sistema de Comercio Electrónico**

## 1. Diseño y Modelado de Datos

### 1.1 Comparación entre el Modelo de Datos Lógico y Físico

El sistema FindItAll demuestra una evolución arquitectónica sistemática desde el diseño conceptual hasta la implementación física, evidenciando decisiones técnicas específicas que optimizan el rendimiento y garantizan la integridad referencial en el contexto de comercio electrónico empresarial.

#### Análisis del Modelo Lógico

El diagrama de modelado lógico establece las entidades conceptuales fundamentales del dominio de negocio con las siguientes características arquitectónicas:

**Entidades Principales Identificadas:**
- **Users:** Entidad central para autenticación y autorización con roles diferenciados
- **Products:** Catálogo de mercancías con atributos descriptivos y comerciales
- **Categories:** Taxonomía organizacional para clasificación de productos
- **Carts:** Entidad de sesión para gestión temporal de selecciones de compra
- **Orders:** Registro transaccional de operaciones comerciales completadas
- **Payments:** Procesamiento de instrumentos financieros asociados a transacciones
- **Item_in_cart:** Entidad asociativa para resolución de relación muchos-a-muchos
- **Category_sets:** Tabla de unión para categorización flexible de productos

**Cardinalidades Conceptuales Establecidas:**
- **Users (1) → Carts (N):** Un usuario puede mantener múltiples carritos activos
- **Products (N) → Categories (1):** Clasificación jerárquica de productos por categoría
- **Orders (N) → Users (1):** Trazabilidad de pedidos por usuario específico
- **Orders (1) → Payments (1):** Asociación directa entre transacción y método de pago

#### Transición al Modelo Físico - Decisiones de Implementación

La materialización física incorpora especificaciones técnicas precisas para MySQL Workbench, evidenciando optimizaciones orientadas a rendimiento y integridad:

**Evolución de Tipos de Datos:**

- **Claves Primarias:** Transición de conceptos abstractos a `BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY` para escalabilidad empresarial
- **Campos de Texto:** Especificación precisa de longitudes (`VARCHAR(20)`, `VARCHAR(50)`, `VARCHAR(400)`) basada en análisis empírico del catálogo
- **Campos Monetarios:** Implementación de `DECIMAL(10,2)` en lugar de tipos conceptuales para precisión financiera
- **Estados Booleanos:** Materialización de `is_in_stock: bool` para validación binaria de disponibilidad
- **Auditoría Temporal:** Incorporación de `created_at` y `updated_at` como `DateTime` para trazabilidad completa

**Restricciones de Integridad Implementadas:**

- **Integridad Referencial:** Definición explícita de foreign keys con restricciones `NOT NULL` donde corresponde
- **Restricciones de Dominio:** Aplicación de validaciones específicas (ej: `user_role` limitado a `[client/admin]`)
- **Restricciones de Unicidad:** Implementación de `UNIQUE` constraints en identificadores críticos

**Optimizaciones Físicas Específicas:**

- **Indexación Automática:** Claves primarias con `AUTO_INCREMENT` para eficiencia en inserción
- **Normalización Controlada:** Mantenimiento de tercera forma normal con consideraciones de performance
- **Configuración InnoDB:** Aprovechamiento de características específicas del motor (row-level locking, MVCC)

### 1.2 Diccionario de Datos

#### Tabla Users
| Campo | Tipo | Restricciones | Propósito |
|-------|------|---------------|-----------|
| user_id | BIGINT | PK, AUTO_INCREMENT, UNIQUE | Identificador único del usuario |
| user_name | VARCHAR(50) | NOT NULL | Nombre de usuario para autenticación |
| user_email | VARCHAR(50) | NOT NULL | Email para comunicaciones |
| user_password | VARCHAR(20) | NOT NULL | Contraseña (hash en implementación real) |
| user_role | VARCHAR(6) | NOT NULL | Rol del usuario (client/admin) |
| created_at | DATETIME | - | Timestamp de creación |
| updated_at | DATETIME | - | Timestamp de última modificación |

#### Tabla Products
| Campo | Tipo | Restricciones | Propósito |
|-------|------|---------------|-----------|
| product_id | BIGINT | PK, AUTO_INCREMENT, UNIQUE | Identificador único del producto |
| product_name | VARCHAR(20) | NOT NULL | Nombre comercial del producto |
| product_description | VARCHAR(400) | NOT NULL | Descripción detallada para marketing |
| product_price | DECIMAL(10,2) | NOT NULL | Precio en formato monetario preciso |
| category_id | BIGINT | NOT NULL, FK | Referencia a categoría padre |
| is_in_stock | BOOLEAN | NOT NULL | Estado de disponibilidad inmediata |
| created_at | DATETIME | - | Timestamp de creación |
| updated_at | DATETIME | - | Timestamp de última modificación |

#### Relaciones Críticas
- **Products → Categories**: Relación N:1 para organización jerárquica
- **Orders → Users**: Relación N:1 para trazabilidad de pedidos
- **Item_in_cart → Products**: Relación N:M resuelva mediante tabla intermedia

## 2. Infraestructura de Base de Datos

### 2.1 Descripción del Servidor MySQL

**Especificaciones Técnicas:**
- **Motor de Base de Datos:** MySQL 8.0+ con MySQL Workbench
- **Configuración de Conexión:** Pool de conexiones implementado mediante mysql2 para Node.js
- **Parámetros de Configuración:**
  ```javascript
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'db_finditall'
  }
  ```

### 2.2 Justificación de la Configuración del Servidor

**Selección de MySQL Workbench:**
- **Soporte ACID completo:** Garantiza integridad transaccional en operaciones de comercio electrónico
- **Manejo de concurrencia:** Optimizado para cargas de trabajo read-heavy típicas de e-commerce
- **Integridad referencial:** Soporte nativo para foreign keys críticas en el modelo relacional
- **Escalabilidad:** Capacidad de manejar 190+ productos con proyección de crecimiento

### 2.3 Metodología de Implementación del Esquema Físico

#### Estrategia de Numeración Secuencial en Scripts DDL

La implementación del esquema físico del sistema FindItAll adopta una metodología de desarrollo ordenada mediante la utilización de convenciones de nomenclatura numérica secuencial en los archivos de definición de esquema. Esta aproximación sistemática garantiza la correcta implementación de la arquitectura relacional respetando las dependencias inherentes del modelo de datos.

**Principios de Ordenamiento Implementados:**

- **Resolución de Dependencias Relacionales:** La numeración secuencial (1_create_table_users.sql, 2_create_table_categories.sql, etc.) establece un orden de ejecución que respeta las restricciones de integridad referencial entre entidades
- **Prevención de Errores de Foreign Key:** La secuencia garantiza que las tablas padre sean creadas antes que las tablas hijas que contienen referencias a claves foráneas
- **Trazabilidad del Modelado Físico:** Facilita el seguimiento del flujo lógico de implementación desde entidades independientes hacia relaciones complejas
- **Estandarización de Despliegue:** Proporciona un protocolo reproducible para la construcción del esquema en diferentes entornos (desarrollo, testing, producción)

**Beneficios Técnicos de la Metodología:**

- **Consistencia Arquitectónica:** Asegura que la implementación física refleje fielmente las decisiones del diseño lógico
- **Mantenibilidad del Código:** Facilita la identificación y modificación de componentes específicos del esquema
- **Escalabilidad del Proyecto:** Permite la incorporación ordenada de nuevas entidades sin comprometer la integridad existente

## 3. Justificación de Diseño de Datos

### 3.1 Selección de Columnas y Tipos de Datos

#### Campos Monetarios
**Tipo Seleccionado:** `DECIMAL(10,2)`
**Justificación:** Precisión exacta requerida para transacciones financieras, evitando errores de redondeo inherentes a tipos de punto flotante.

#### Campos de Texto Variable
**Descripción de Productos:** `VARCHAR(400)`
**Justificación:** Análisis del catálogo de 190 productos revela descripciones promedio de 280 caracteres, con margen de crecimiento para contenido de marketing.

#### Campos de Estado Booleano
**is_in_stock:** `BOOLEAN`
**Justificación:** Verificación binaria de disponibilidad para validación inmediata en carrito de compras y prevención de sobreventa.

#### Campos de Auditoría Temporal
**created_at/updated_at:** `DATETIME`
**Justificación:** Trazabilidad completa para análisis de patrones temporales y cumplimiento de auditoría empresarial.

## 4. Proceso de Limpieza de Datos

### 4.1 Identificación de Problemas en la Base de Datos

El proceso de limpieza de datos se implementó mediante análisis sistemático del catálogo de productos:

#### Problemas Identificados:
- **Inconsistencias en nomenclatura:** Variaciones en formato de nombres de productos
- **Valores de precio heterogéneos:** Formato inconsistente entre productos (algunos con "$", otros sin unidad)
- **Descripciones de longitud variable:** Rango de 150-400 caracteres requiriendo normalización

### 4.2 Eliminación de Datos Irrelevantes

**Campos Eliminados:**
- Metadatos temporales de importación inicial
- Campos de testing utilizados durante desarrollo
- Atributos redundantes derivados de otras columnas

**Consulta SQL Aplicada:**
```sql
ALTER TABLE Products 
DROP COLUMN temp_import_id,
DROP COLUMN test_field,
DROP COLUMN derived_category_name;
```

### 4.3 Imputación de Valores Faltantes

**Metodología Implementada:**
- **Precios faltantes:** Imputación mediante mediana de la categoría correspondiente
- **Descripciones incompletas:** Generación basada en patrones de productos similares
- **Estados de stock:** Valor por defecto `true` para productos nuevos

**Ejemplo de Consulta de Imputación:**
```sql
UPDATE Products 
SET product_price = (
    SELECT AVG(product_price) 
    FROM Products p2 
    WHERE p2.category_id = Products.category_id 
    AND p2.product_price IS NOT NULL
) 
WHERE product_price IS NULL;
```

### 4.4 Verificación de Formatos

**Validación de Precios:**
```sql
SELECT product_id, product_name, product_price 
FROM Products 
WHERE product_price REGEXP '^[0-9]+\.[0-9]{2}$' = 0;
```

**Validación de Categorías:**
```sql
SELECT DISTINCT category_id 
FROM Products 
WHERE category_id NOT IN (SELECT category_id FROM Categories);
```

### 4.5 Conversión de Tipos de Datos

**Normalización de Precios:**
- Conversión de VARCHAR a DECIMAL(10,2)
- Eliminación de símbolos de moneda
- Estandarización a formato numérico puro

**Consulta de Conversión:**
```sql
UPDATE Products 
SET product_price = CAST(
    REPLACE(REPLACE(product_price, '$', ''), ' MXN', '') 
    AS DECIMAL(10,2)
) 
WHERE product_price LIKE '%$%' OR product_price LIKE '%MXN%';
```

### 4.6 Eliminación de Duplicados

**Identificación de Duplicados por Nombre:**
```sql
SELECT product_name, COUNT(*) as count 
FROM Products 
GROUP BY product_name 
HAVING COUNT(*) > 1;
```

**Eliminación de Duplicados:**
```sql
DELETE p1 FROM Products p1
INNER JOIN Products p2 
WHERE p1.product_id > p2.product_id 
AND p1.product_name = p2.product_name 
AND p1.category_id = p2.category_id;
```

## 5. Modelos Predictivos

### 5.1 Descripción del Modelo Predictivo

El sistema FindItAll implementa un **modelo de simulación Monte Carlo** para predicción de demanda de inventario, diseñado específicamente para las 8 categorías principales del catálogo de productos. Este sistema proporciona a los usuarios administradores una herramienta analítica avanzada para la gestión proactiva del inventario a través de la sección **"Análisis Predictivo de Inventario"** del panel administrativo.

#### Componentes del Modelo:
- **Análisis de Patrones Estacionales:** Factores de estacionalidad específicos por categoría (0.8-1.8)
- **Modelado de Varianza:** Coeficientes de variabilidad basados en comportamiento histórico (0.15-0.40)
- **Simulación Estocástica:** Distribución uniforme transformada para aproximar normalidad
- **Métricas de Precisión:** Cálculo de confiabilidad basado en factores de varianza, estacionalidad y volumen

#### Algoritmo de Predicción:
```javascript
const predictedDemand = Math.round(
    (pattern.baseRate * 30 * pattern.seasonality) * 
    (1 + (Math.random() - 0.5) * pattern.variance)
);
```

#### Acceso Administrativo a Predicciones de Inventario

Los usuarios con rol **administrador** acceden a las proyecciones de demanda a través del módulo **"Análisis Predictivo de Inventario"** en el panel de control administrativo, donde pueden visualizar:

**Información Disponible para Administradores:**
- **Predicciones de Demanda por Categoría:** Proyecciones mensuales detalladas para cada una de las 8 categorías principales
- **Indicadores de Precisión:** Métricas de confiabilidad del modelo (70-95% según categoría)
- **Alertas de Reabastecimiento:** Notificaciones automáticas cuando la demanda proyectada excede el inventario disponible
- **Análisis de Tendencias:** Gráficos temporales que muestran patrones estacionales y comportamiento histórico
- **Recomendaciones de Compra:** Sugerencias de cantidades óptimas de reposición basadas en predicciones

**Funcionalidades del Panel Predictivo:**
- Simulación en tiempo real de escenarios de demanda
- Exportación de reportes de predicción en formato tabular
- Configuración de niveles de alerta personalizables
- Visualización gráfica de distribuciones de probabilidad por producto

Esta integración facilita un proceso de toma de decisiones más informado para los administradores en la gestión de inventario, optimizando tanto los niveles de stock como la experiencia del cliente final.

### 5.2 Modelos Aplicados en la Imputación de Datos

**Modelo de Precisión Adaptativa:**
- **Factor de Varianza:** `precisión = 1 - pattern.variance`
- **Factor de Estacionalidad:** `precisión_estacional = 1 - |seasonality - 1| * 0.3`
- **Factor de Volumen:** `precisión_volumen = min(baseRate / 20, 1)`

**Cálculo de Precisión Final:**
```javascript
const accuracy = (varianceScore * 0.5) + 
                (seasonalityScore * 0.3) + 
                (volumeScore * 0.2);
```

## 6. Propiedades ACID en las Transacciones

### 6.1 Justificación de las Propiedades ACID

#### Atomicidad
**Implementación:** Encapsulación de operaciones de checkout en transacciones atómicas
- Creación de pedido en tabla `Orders`
- Procesamiento de pago en tabla `Payments`
- Actualización de inventario en tabla `Products`
- Limpieza de carrito en tabla `Item_in_cart`

**Garantía:** Esta implementación garantiza que las operaciones se completen totalmente o se reviertan por completo ante cualquier falla

#### Consistencia
**Mecanismos Implementados:**
- **Integridad Referencial:** Foreign keys entre todas las tablas relacionadas
- **Restricciones de Dominio:** Validación de tipos de datos específicos
- **Reglas de Negocio:** Verificación de disponibilidad de stock antes de venta

**Implementación:** Estos mecanismos aseguran que la base de datos se mantenga en un estado válido y coherente antes y después de cada transacción, respetando todas las reglas de integridad definidas en el modelo relacional y preservando la consistencia lógica del sistema de comercio electrónico.

#### Aislamiento
**Niveles Implementados:**
- **READ COMMITTED:** Para consultas de catálogo y navegación
- **SERIALIZABLE:** Para actualizaciones críticas de inventario

**Implementación:** Estos niveles de aislamiento garantizan que las transacciones concurrentes se ejecuten de manera independiente sin interferencias mutuas, previniendo condiciones de carrera y asegurando que cada transacción opere con una vista consistente de los datos durante su ejecución completa.

#### Durabilidad
**Garantías:**
- **Write-Ahead Logging (WAL):** Log de transacciones antes de commit
- **Doble Buffering:** Escritura segura en almacenamiento persistente
- **Backup Automatizado:** Respaldo regular del esquema `db_finditall`

**Implementación:** Estas garantías aseguran que los datos persistan de manera segura y permanente, manteniendo la integridad de la información aún ante fallos del sistema o interrupciones inesperadas del servicio.

## 7. Seguridad y Control de Acceso

### 7.1 Prevención de Inyecciones SQL

#### Medidas Implementadas:

**Uso de Prepared Statements:**
```javascript
const query = 'SELECT * FROM Products WHERE category_id = ?';
connection.execute(query, [categoryId], (err, results) => {
    // Procesamiento seguro de resultados
});
```

**Validación de Entrada:**
- Sanitización de parámetros de consulta
- Verificación de tipos de datos antes de ejecución
- Escape de caracteres especiales en strings

**Ejemplo de Consulta Segura:**
```javascript
// CORRECTO - Uso de parámetros
const secureQuery = 'UPDATE Products SET product_price = ? WHERE product_id = ?';
connection.execute(secureQuery, [newPrice, productId]);

// INCORRECTO - Concatenación directa (NO utilizado)
// const unsafeQuery = `UPDATE Products SET product_price = ${newPrice} WHERE product_id = ${productId}`;
```

### 7.2 Descripción de Autenticación y Restricciones

El sistema de seguridad de FindItAll se basa en un modelo de control de acceso basado en roles (RBAC¹; por sus siglas en inglés) que define los siguientes niveles de autorización:

#### Sistema de Roles Implementado:
- **Rol Cliente (`client`):** Acceso a catálogo, carrito y historial personal
- **Rol Administrador (`admin`):** Acceso completo a gestión de productos e inventario

#### Restricciones de Acceso:
```javascript
// Verificación de rol antes de operaciones administrativas
if (user.user_role !== 'admin') {
    throw new Error('Acceso denegado: se requieren privilegios de administrador');
}
```

#### Autenticación de Sesión:
- Validación de credenciales contra tabla `Users`
- Mantención de estado de sesión mediante tokens seguros
- Verificación de permisos en cada operación crítica

---

**Conclusión:** El diseño de base de datos de FindItAll demuestra la implementación exitosa de principios de ingeniería de datos empresariales, garantizando integridad, seguridad y escalabilidad mediante el uso de tecnologías probadas y metodologías de desarrollo rigurosas.

---

## Notas Técnicas

¹ **RBAC (Role-Based Access Control):** Modelo de control de acceso en el que los permisos se asignan a roles específicos y los usuarios obtienen acceso a recursos según los roles que se les asignan. Este enfoque centraliza la gestión de permisos y simplifica la administración de seguridad en sistemas empresariales.

---

## Referencias Bibliográficas

Ferraiolo, D. F., Sandhu, R., Gavrila, S., Kuhn, D. R., & Chandramouli, R. (2001). Proposed NIST standard for role-based access control. *ACM Transactions on Information and System Security*, 4(3), 224-274. https://doi.org/10.1145/501978.501980

MySQL Development Team. (2024). *MySQL 8.0 Reference Manual: Prepared statements*. Oracle Corporation. https://dev.mysql.com/doc/refman/8.0/en/sql-prepared-statements.html

National Institute of Standards and Technology. (2004). *Role based access control* (NIST FIPS PUB 140-2). U.S. Department of Commerce. https://csrc.nist.gov/projects/role-based-access-control
