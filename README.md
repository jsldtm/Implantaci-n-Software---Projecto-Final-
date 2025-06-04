# FindItAll - Proyecto Final de Implantación de Software

**Autor:** Joaquín Saldarriaga

---

## Descripción General

FindItAll es una aplicación web desarrollada con [Next.js](https://nextjs.org), diseñada como proyecto final para el curso "Desarrollo e Implantación de Software". Este proyecto destaca por ser una solución **individual**, construida desde cero por Joaquín Saldarriaga, a diferencia de otras implementaciones genéricas. Aquí, cada línea de código, cada componente visual y cada integración han sido cuidadosamente diseñados y desarrollados de manera personal y profesional.

---

## Características Principales

- **Frontend moderno:** Construido con Next.js, React y Tailwind CSS para una experiencia de usuario ágil y responsiva.
- **Gestión de productos y categorías:** Navegación intuitiva por categorías, visualización detallada de productos y funcionalidades de guardado y carrito de compras.
- **Autenticación y seguridad:** Implementación de login y registro de usuarios.
- **Persistencia de datos:** Integración con servicios backend y Firebase para manejo de productos, usuarios y pedidos.
- **Configuraciones personalizables:** Panel de usuario para ajustes de preferencias, tema y visualización.
- **Componentización:** Uso extensivo de componentes reutilizables y contextos para una arquitectura escalable y mantenible.

---

## Estructura del Proyecto

- `src/app/` – Páginas principales y rutas de la aplicación.
- `src/components/` – Componentes visuales reutilizables.
- `src/context/` – Contextos globales para carrito, usuario, tema, etc.
- `src/services/` – Lógica de acceso a datos y servicios externos.
- `public/` – Recursos estáticos e imágenes.
- `functions/` – Funciones backend y lógica serverless.
- `sql_demo/` – Implementaciones avanzadas de base de datos (standalone).
- `sql_demos/` – Scripts SQL ordenados para características avanzadas.
- `sql_examples/` – Ejemplos básicos de operaciones SQL y Node.js.

---

## Módulo 4: Bases de Datos Avanzadas

Este proyecto incluye una implementación completa de características avanzadas de base de datos MySQL documentadas en el **Módulo 4**:

### Características Implementadas:
- ✅ **Sistema ACID completo** con transacciones y rollback
- ✅ **Pool de conexiones avanzado** para alta concurrencia  
- ✅ **Sistema de seguridad RBAC** con roles `user` y `admin`
- ✅ **Auditoría temporal** con triggers automáticos
- ✅ **Procedimientos de limpieza** de datos
- ✅ **Optimizaciones InnoDB** e indexación estratégica
- ✅ **Sistema de logging** Write-Ahead para operaciones
- ✅ **Validaciones** y sanitización de datos
- ✅ **Schema completo** con constraints y foreign keys

### Archivos Clave:
- **Configuración:** `sql_demos/20_complete_schema_with_constraints.sql`
- **Transacciones:** `sql_demo/acid-transactions-system.js`
- **Seguridad:** `sql_demo/security-rbac-system.js`
- **Auditoría:** `sql_demos/18_temporal_audit_triggers.sql`
- **Performance:** `sql_demos/19_performance_optimization.sql`
- **Pruebas:** `sql_demo/integrated-tests.js`

**Nota:** Los archivos de base de datos son **standalone** y no interfieren con la aplicación web React/Next.js, están diseñados para futura integración.

---

## Instalación y Ejecución

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd my-movies-app
   ```
2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en acción.

---

## Recursos y Diseño

- [Prototipo Figma](https://www.figma.com/design/cqIqOJbXadQM5rFtrXEmTl/Reto-Implantaci%C3%B3n-software---Joaqu%C3%ADn?node-id=0-1&t=bUY647aoYYnLAP18-1)
- Documentación y diagramas incluidos en la carpeta `public/images/`.

---

## Notas Finales

Este proyecto es de desarrollo individual, demostrando dedicación, creatividad y dominio técnico. No es una simple plantilla ni un producto de herramientas automáticas: es el resultado de esfuerzo, y un proceso de aprendizaje.

---

**© 2025 Joaquín Saldarriaga**. Todos los derechos reservados.
