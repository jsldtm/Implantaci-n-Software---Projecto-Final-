# Estructura de Presentación Video Evidencia - FindItAll
## Proyecto Integrador TC3005B.562 - Joaquín Saldarriaga

---

## **SLIDE 1: PORTADA & PRESENTACIÓN DEL EQUIPO**

### Contenido Visual:
- **Título Principal:** "FindItAll - Plataforma E-commerce Empresarial"
- **Subtítulo:** "Proyecto Integrador TC3005B.562"
- **Desarrollador:** Joaquín Saldarriaga
- **Bloque:** [Tu bloque específico]
- **Profesores:** [Nombres de los profesores del curso]
- **Semestre:** Junio 2025
- **Logo/Visual:** Screenshot de la página principal de FindItAll

### Notas del Presentador:
"Buenos días, mi nombre es Joaquín Saldarriaga y les presento FindItAll, una plataforma integral de e-commerce desarrollada como proyecto final del curso TC3005B. Este proyecto demuestra la aplicación práctica de metodologías modernas de ingeniería de software, integrando cinco módulos especializados que abarcan desde gestión de proyectos hasta calidad de software empresarial."

---

## **SLIDE 2: DEFINICIÓN DEL PROBLEMA**

### Contenido Visual:
- **Problema Identificado:**
  • Necesidad de una plataforma e-commerce académica que integre:
    - Metodologías de desarrollo modernas
    - Arquitecturas de software escalables
    - Gestión predictiva de inventario
    - Seguridad empresarial robusta

- **Justificación del Desarrollo:**
  • Demostrar competencias integrales en ingeniería de software
  • Aplicar estándares internacionales (PSP, CMMI-DEV, SPICE)
  • Crear una solución funcional completa de comercio electrónico

### Notas del Presentador:
"El problema que FindItAll aborda es la necesidad de desarrollar una plataforma de e-commerce que no solo sea funcionalmente completa, sino que demuestre la aplicación integral de metodologías de ingeniería de software contemporáneas. La inexistencia de ejemplos académicos que combinen arquitecturas modernas con estándares de calidad empresarial justificó el desarrollo de esta solución comprehensiva que integra Next.js, React, MySQL y Firebase en un ecosistema coherente."

---

## **SLIDE 3: DESCRIPCIÓN DEL PROYECTO**

### Contenido Visual:
- **FindItAll - Solución E-commerce Integral**
  • **Tecnologías:** Next.js 15.2.4, React 19, TypeScript, MySQL
  • **Catálogo:** 190+ productos en 8 categorías especializadas
  • **Arquitectura:** 9 portales frontend con backend RESTful
  • **Características Principales:**
    - Sistema de carrito persistente con Context API
    - Autenticación dual (cliente/administrador)
    - Panel administrativo con análisis predictivo
    - Modelo Monte Carlo para gestión de inventario

### Notas del Presentador:
"FindItAll es una solución integral construida con tecnologías de vanguardia. La plataforma gestiona más de 190 productos reales distribuidos en 8 categorías funcionales, implementa autenticación diferenciada por roles utilizando Firebase, y cuenta con capacidades analíticas avanzadas. El sistema incluye un modelo predictivo Monte Carlo que ejecuta 1000 iteraciones por categoría para optimizar la gestión de inventario, proporcionando predicciones con precisión del 75-95% según la categoría."

---

## **SLIDE 4: INNOVACIÓN DEL PROYECTO**

### Contenido Visual:
- **¿Por qué es Innovador?**
  • **Integración Metodológica:** PSP + CMMI-DEV + SPICE aplicados individualmente
  • **Arquitectura Híbrida:** CSS Modules + Tailwind CSS con 5 temas dinámicos
  • **IA Predictiva:** Modelo Monte Carlo para análisis de inventario
  • **Calidad Empresarial:** 35+ casos de prueba E2E automatizadas
  • **Seguridad Avanzada:** RBAC + Prepared Statements + Firebase Auth

### Notas del Presentador:
"La innovación de FindItAll radica en tres dimensiones clave. Primero, la integración consciente de estándares internacionales de calidad en un proyecto de desarrollo individual, algo inusual en el contexto académico. Segundo, la implementación de un modelo predictivo Monte Carlo para análisis de inventario que va más allá de funcionalidades básicas de e-commerce. Tercero, la arquitectura híbrida que combina metodologías de estilizado y la gestión de estado distribuido mediante cuatro Context Providers especializados."

---

## **SLIDE 5: MÓDULO 1 - GESTIÓN DE PROYECTOS**

### Contenido Visual:
- **Metodología Personal Software Process (PSP)**
  • **Gestión en Jira:** Sprints semanales con seguimiento granular
  • **Historias de Usuario:** 100% completitud (18 H.U. principales)
  • **Gestión de Riesgos:** Matriz multicapa en 6 categorías
  • **Seguridad:** CodeQL - 9 vulnerabilidades críticas corregidas

- **Evidencia de Resultados:**
  • Migración de credenciales embebidas a variables de entorno
  • Implementación de .gitignore para protección de datos sensibles

### Notas del Presentador:
"El Módulo 1 estableció fundamentos metodológicos rigurosos mediante PSP aplicado individualmente. La gestión en Jira con sprints semanales facilitó el seguimiento de 18 historias de usuario principales, logrando 100% de completitud. La implementación de análisis de riesgos multicapa y el uso de CodeQL para seguridad estática resultó en la identificación y corrección de 9 vulnerabilidades críticas relacionadas con credenciales embebidas, estableciendo un protocolo de seguridad que influyó en todas las decisiones arquitectónicas posteriores."

---

## **SLIDE 6: MÓDULO 2 - ARQUITECTURA DE SOFTWARE**

### Contenido Visual:
- **Modelo 4+1 de Vistas Arquitectónicas**
  • **7 Endpoints RESTful:** Documentados con OpenAPI
  • **Clean Architecture:** Separación clara de capas
  • **Diagramas UML:** Clases, Secuencia, Actividades, Objetos
  
- **Arquitectura Implementada:**
  • API Routes de Next.js con middleware especializado
  • Integración Firebase para persistencia de pedidos
  • Arquitectura stateless para escalabilidad horizontal

### Notas del Presentador:
"La arquitectura se fundamenta en el modelo 4+1 garantizando documentación sistemática desde múltiples perspectivas. La implementación de clean architecture con siete endpoints RESTful especializados (/api/cart, /api/products, /api/auth, etc.) establece una separación clara entre la lógica de presentación y la lógica de negocio. Los diagramas UML desarrollados trazan desde las entidades del dominio hasta los patrones de despliegue, mientras que la arquitectura stateless facilita la escalabilidad horizontal futura."

---

## **SLIDE 7: MÓDULO 3 - DESARROLLO FRONTEND AVANZADO**

### Contenido Visual:
- **Stack Tecnológico Moderno**
  • **Frontend:** Next.js 15.2.4 + React 19 + TypeScript
  • **Gestión de Estado:** 4 Context Providers especializados
  • **Estilos:** Metodología híbrida (17 archivos CSS Modules + Tailwind)
  • **Características Avanzadas:**
    - 5 temas dinámicos intercambiables
    - 9 portales especializados con navegación responsive
    - Carrito persistente con localStorage

### Notas del Presentador:
"El desarrollo frontend demuestra dominio de tecnologías contemporáneas mediante la orquestación de 9 portales especializados: desde FindItAllMain hasta AdminPortal, cada uno con responsabilidades específicas. La gestión de estado distribuido utiliza CartContext para transacciones, SettingsContext para preferencias, ThemeContext para personalización visual, y UsernameContext para identidad de usuario. La metodología híbrida de estilizado combina 17 archivos CSS Modules para componentes específicos con utilidades de Tailwind CSS para elementos generales."

---

## **SLIDE 8: MÓDULO 4 - BASE DE DATOS AVANZADAS**

### Contenido Visual:
- **Infraestructura MySQL Empresarial**
  • **Schema Normalizado:** 9 tablas con integridad referencial
  • **Modelo Predictivo:** Monte Carlo (1000 iteraciones/categoría)
  • **Propiedades ACID:** Transacciones robustas implementadas
  • **Seguridad:** RBAC + Prepared Statements
  
- **Métricas del Sistema:**
  • 190+ productos distribuidos en 8 categorías reales
  • Precisión predictiva: 75-95% por categoría
  • Pool de conexiones: 20 conexiones concurrentes máximo

### Notas del Presentador:
"La infraestructura de datos implementa un esquema MySQL normalizado con nueve tablas relacionales que incluyen Users, Products, Categories, Orders, y tablas intermedias para relaciones many-to-many. El modelo predictivo Monte Carlo ejecuta 1000 iteraciones por categoría, analizando patrones de demanda con factores de estacionalidad adaptativos que van desde 0.8 hasta 1.8 según la categoría. Las propiedades ACID garantizan consistencia transaccional, mientras que el sistema RBAC con prepared statements previene inyección SQL."

---

## **SLIDE 9: MÓDULO 5 - CALIDAD DE SOFTWARE**

### Contenido Visual:
- **Estrategia Integral de Calidad**
  • **Estándares:** PSP + CMMI-DEV + SPICE (ISO/IEC 15504)
  • **Pruebas Automatizadas:** 35+ casos E2E con Cypress
  • **Categorías de Testing:** Unitarias, Integración, UAT, No-funcionales
  • **Rendimiento Validado:** <50ms en consultas complejas

- **Resultados de Calidad:**
  • Tasa de éxito: 95%+ en pruebas automatizadas
  • Disponibilidad: 99.94% bajo carga concurrente
  • Cobertura: Seguridad, Usabilidad, Fiabilidad, Mantenibilidad

### Notas del Presentador:
"La estrategia de calidad integra estándares internacionales con validación automatizada comprehensiva. La suite de pruebas Cypress implementa más de 35 casos End-to-End que verifican desde funcionalidades básicas hasta rendimiento bajo carga. Las pruebas no-funcionales validan que las consultas complejas mantengan tiempos de respuesta inferiores a 50ms, mientras que las pruebas de disponibilidad confirman 99.94% de uptime bajo 100 usuarios concurrentes. La aplicación rigurosa de PSP, complementada con prácticas CMMI-DEV, resultó en una tasa de éxito superior al 95%."

---

## **SLIDE 10: DEMOSTRACIÓN FUNCIONAL** 

### Contenido Visual:
- **Funcionalidades Usuario Final:**
  • Navegación fluida por 8 categorías de productos reales
  • Carrito persistente con cálculos en tiempo real
  • Sistema de productos guardados con APIs propias
  • 5 temas visuales intercambiables dinámicamente

- **Funcionalidades Administrativas:**
  • Panel de gestión integral con módulos especializados
  • Análisis predictivo Monte Carlo para inventario
  • Gestión de usuarios y productos en tiempo real
  • Reportes automatizados con métricas de precisión

### Notas del Presentador:
"Las funcionalidades implementadas demuestran un e-commerce completamente operativo. Los usuarios navegan intuitivamente por categorías como Technology, Sports, Office & Writing, con productos reales desde 'Cable USB-B' hasta 'Smartwatch Samsung Galaxy Fit 3'. El carrito implementa persistencia mediante localStorage y Context API, manteniendo estado entre sesiones. Los administradores acceden a capacidades analíticas avanzadas: el modelo Monte Carlo proporciona predicciones de demanda con factores de seguridad adaptativos que van desde 1.2 hasta 1.6 según la incertidumbre de cada categoría."

---

## **SLIDE 11: EVIDENCIA TÉCNICA**

### Contenido Visual:
- **Arquitectura de Implementación:**
  • **Código:** 17 archivos CSS Modules + API Routes especializadas
  • **TypeScript:** Interfaces estrictas para Product, CartItem, User, Settings
  • **Base de Datos:** Schema normalizado con constraints y foreign keys
  • **Firebase:** Authentication + Firestore para persistencia de pedidos
  • **Testing:** Vitest + Cypress para automatización de calidad

- **Métricas de Rendimiento Validadas:**
  • Consultas: <50ms promedio en operaciones complejas
  • Concurrencia: 100 usuarios simultáneos soportados
  • Transacciones ACID: 25 operaciones concurrentes exitosas

### Notas del Presentador:
"La evidencia técnica documenta implementación empresarial con métricas verificables. La arquitectura modular incluye 17 componentes con CSS Modules especializados, desde ProductCategoryList hasta AdminDashboard. Las interfaces TypeScript garantizan type-safety, mientras que el esquema MySQL implementa restricciones de integridad referencial y triggers de auditoría temporal. Las pruebas de rendimiento confirman consultas optimizadas mediante indexación estratégica, pool de conexiones que maneja hasta 20 conexiones concurrentes, y capacidad para procesar 25 transacciones ACID simultáneas sin pérdida de integridad."

---

## **SLIDE 12: RESULTADOS Y CONCLUSIONES**

### Contenido Visual:
- **Resultados Alcanzados:**
  • **Técnicos:** Plataforma completamente funcional (100% H.U. implementadas)
  • **Metodológicos:** Integración exitosa PSP + CMMI-DEV + SPICE
  • **Innovación:** Modelo predictivo operativo con análisis Monte Carlo
  • **Calidad:** 95%+ éxito en validación automatizada

- **Impacto y Contribución:**
  • **Académico:** Demostración de competencias integrales de ingeniería
  • **Profesional:** Aplicación de mejores prácticas empresariales
  • **Tecnológico:** Arquitectura escalable lista para producción

### Notas del Presentador:
"FindItAll representa la consolidación exitosa de competencias técnicas y metodológicas en ingeniería de software contemporánea. El proyecto demuestra que la aplicación rigurosa de estándares internacionales, incluso en desarrollos individuales, resulta en sistemas robustos y escalables. La integración de un modelo predictivo Monte Carlo, arquitecturas clean, y metodologías de calidad automatizada establece un paradigma de desarrollo que trasciende lo académico para abordar desafíos empresariales reales con soluciones tecnológicamente viables y metodológicamente sólidas."

---

## **SLIDE 13: CIERRE**

### Contenido Visual:
- **FindItAll - Ingeniería de Software Integral**
- **Joaquín Saldarriaga**
- **TC3005B.562 - Junio 2025**
- **"De metodologías académicas a soluciones empresariales"**
- **Imagen:** Screenshot del dashboard administrativo mostrando el análisis predictivo

### Notas del Presentador:
"Gracias por su atención. FindItAll ejemplifica cómo la integración disciplinada de metodologías contemporáneas y tecnologías de vanguardia puede transformar el aprendizaje académico en soluciones con potencial empresarial tangible. Este proyecto establece fundamentos técnicos y metodológicos sólidos para contribuir eficazmente en entornos profesionales de mayor exigencia, demostrando que la excelencia en ingeniería de software se construye mediante la aplicación consciente de estándares, la innovación técnica responsable, y el compromiso con la calidad integral."

---

## **ESPECIFICACIONES TÉCNICAS PARA GRABACIÓN**

### **Duración por Slide:**
- Slide 1: 20 segundos
- Slide 2: 30 segundos  
- Slide 3: 35 segundos
- Slide 4: 30 segundos
- Slide 5: 35 segundos
- Slide 6: 30 segundos
- Slide 7: 35 segundos
- Slide 8: 35 segundos
- Slide 9: 35 segundos
- Slide 10: 40 segundos
- Slide 11: 35 segundos
- Slide 12: 35 segundos
- Slide 13: 20 segundos

**TOTAL: 4 minutos 55 segundos**

### **Recomendaciones de Presentación:**
- **Ritmo:** Pausas estratégicas después de datos técnicos clave
- **Énfasis:** Destacar métricas específicas (190+ productos, 35+ pruebas, 95%+ éxito)
- **Transiciones:** Conectar cómo cada módulo alimenta los siguientes
- **Demostración:** Screenshots reales de la aplicación funcionando
- **Lenguaje:** Técnico pero accesible, evitar jerga excesiva

### **Subcompetencias Cubiertas:**
- **STC0201 (Metodologías):** Slides 5, 9 - PSP, CMMI-DEV, SPICE
- **STC0203 (Diseño):** Slide 6 - Arquitectura clean, modelo 4+1
- **STC0204 (Desarrollo):** Slide 7 - Frontend Next.js/React avanzado
- **STC0205 (Pruebas):** Slide 9 - 35+ casos automatizados
- **SEG0601 (Lenguaje oral):** Estructura completa de presentación
- **TC0207 (Gestión):** Slide 5 - Jira, sprints, gestión de riesgos
- **STC0206 (Implantación):** Slide 11 - Métricas de rendimiento
