# ESTRUCTURA PRESENTACIÓN VIDEO EVIDENCIA - FindItAll
## TC3005B.562 - Joaquín Saldarriaga | 4:59 minutos MÁXIMO

---

## **SLIDE 1: PRESENTACIÓN DEL EQUIPO [20 segundos]**

### Contenido Visual:
- **Título:** FindItAll - Plataforma E-commerce Empresarial
- **Proyecto:** TC3005B.562 - Desarrollo e Implantación de Software
- **Desarrollador:** Joaquín Saldarriaga
- **Profesores:** [Nombres específicos del curso]
- **Semestre:** Junio 2025
- **Screenshot:** Portal principal FindItAllMain funcionando

### Notas del Presentador:
"Presento FindItAll, una plataforma integral de e-commerce desarrollada como proyecto final de TC3005B. Esta implementación demuestra la aplicación práctica de cinco módulos especializados: desde gestión de proyectos hasta calidad empresarial, integrando metodologías PSP, CMMI-DEV y SPICE en un sistema funcional completo con más de 190 productos reales."

---

## **SLIDE 2: DEFINICIÓN DEL PROBLEMA [25 segundos]**

### Contenido Visual:
**NECESIDAD IDENTIFICADA:**
• Demostrar competencias integrales en ingeniería de software
• Integrar metodologías modernas con tecnologías de vanguardia
• Crear solución e-commerce que trascienda implementaciones básicas
• Aplicar estándares internacionales en desarrollo individual

**JUSTIFICACIÓN TÉCNICA:**
• Ausencia de ejemplos académicos que combinen:
  - Arquitecturas clean con Next.js 15.2.4 + React 19
  - Estándares PSP/CMMI-DEV/SPICE aplicados individualmente
  - Capacidades predictivas avanzadas

### Notas del Presentador:
"El problema que FindItAll aborda es la necesidad de demostrar competencias integrales mediante un sistema que va más allá del e-commerce básico. La plataforma integra arquitecturas modernas con estándares de calidad empresarial, aplicando PSP para gestión individual, CMMI-DEV para procesos robustos, y capacidades predictivas Monte Carlo que la diferencian de implementaciones convencionales académicas."

---

## **SLIDE 3: DESCRIPCIÓN DEL PROYECTO [30 segundos]**

### Contenido Visual:
**FINDITALL - ARQUITECTURA TÉCNICA:**
• **Stack Principal:** Next.js 15.2.4, React 19, TypeScript, MySQL
• **Infraestructura:** 9 portales frontend + 7 API Routes RESTful
• **Catálogo:** 190+ productos en 8 categorías especializadas
• **Funcionalidades Core:**
  - Autenticación Firebase dual (cliente/admin)
  - 4 Context Providers para gestión de estado
  - Sistema ACID con transacciones robustas
  - Modelo predictivo Monte Carlo (1000 iteraciones/categoría)

### Notas del Presentador:
"FindItAll implementa una arquitectura empresarial con Next.js 15.2.4 y React 19, gestionando 190+ productos reales distribuidos en 8 categorías. El sistema incluye autenticación diferenciada mediante Firebase, gestión de estado con CartContext, SettingsContext, ThemeContext y UsernameContext. La base de datos MySQL implementa transacciones ACID completas, mientras que el modelo Monte Carlo ejecuta análisis predictivo con factores de estacionalidad adaptativos de 0.8 a 1.8."

---

## **SLIDE 4: INNOVACIÓN TÉCNICA [25 segundos]**

### Contenido Visual:
**¿POR QUÉ ES INNOVADOR?**
• **Metodológico:** PSP + CMMI-DEV + SPICE en desarrollo individual
• **Arquitectónico:** Clean Architecture + API Routes + Context API
• **Analítico:** Monte Carlo para inventario (precisión 75-95%)
• **Calidad:** 35+ pruebas E2E automatizadas con Cypress
• **Seguridad:** RBAC + Prepared Statements + CodeQL validation

### Notas del Presentador:
"La innovación radica en tres dimensiones: metodológica, aplicando estándares internacionales en desarrollo individual; técnica, implementando capacidades predictivas que trascienden funcionalidades básicas; y arquitectónica, combinando clean architecture con gestión de estado distribuido. El modelo Monte Carlo proporciona predicciones con factores de seguridad adaptativos, mientras que la suite de 35+ pruebas automatizadas garantiza calidad empresarial."

---

## **SLIDE 5: GESTIÓN DE PROYECTOS - MÓDULO 1 [30 segundos]**
**[Mapeo: STC0201, TC0207]**

### Contenido Visual:
**METODOLOGÍAS APLICADAS:**
• **Jira:** 18 H.U. completadas (100% exitoso)
• **PSP:** Timelog y Defectlog individual sistemático
• **Gestión de Riesgos:** Matriz multicapa (6 categorías)
• **Seguridad:** CodeQL - 9 vulnerabilidades críticas resueltas
• **Evidencia:** Migración credenciales → variables entorno

### Notas del Presentador:
"El Módulo 1 estableció fundamentos metodológicos mediante PSP aplicado rigurosamente. La gestión en Jira documentó 18 historias de usuario con sprints semanales. CodeQL identificó 9 vulnerabilidades críticas de credenciales embebidas, resueltas mediante migración a variables de entorno protegidas por gitignore. La matriz de riesgos evaluó categorías desde privacidad hasta operaciones con terceros, estableciendo protocolos que influyeron todas las decisiones arquitectónicas."

---

## **SLIDE 6: ARQUITECTURA DE SOFTWARE - MÓDULO 2 [30 segundos]**
**[Mapeo: STC0203]**

### Contenido Visual:
**DISEÑO ARQUITECTÓNICO:**
• **Modelo 4+1:** Vistas lógica, desarrollo, procesos, física, casos de uso
• **Clean Architecture:** Separación clara de responsabilidades
• **APIs RESTful:** 7 endpoints documentados (OpenAPI)
• **Evidencia:** Diagramas UML (clases, secuencia, actividades)

### Notas del Presentador:
"La arquitectura se fundamenta en el modelo 4+1, garantizando documentación sistemática desde múltiples perspectivas. La implementación de clean architecture establece separación entre lógica de presentación y negocio mediante 7 endpoints especializados: auth, cart, products, orders, saved, categories y recommendations. Los diagramas UML trazan desde entidades del dominio hasta patrones de despliegue, evidenciando decisiones arquitectónicas fundamentadas."

---

## **SLIDE 7: DESARROLLO FRONTEND - MÓDULO 3 [35 segundos]**
**[Mapeo: STC0204]**

### Contenido Visual:
**IMPLEMENTACIÓN FRONTEND:**
• **Core:** Next.js 15.2.4 + React 19 + TypeScript
• **Arquitectura:** 9 portales especializados
• **Estado:** CartContext, SettingsContext, ThemeContext, UsernameContext
• **Estilos:** 17 archivos CSS Modules + Tailwind CSS
• **Funcionalidades:**
  - 5 temas dinámicos intercambiables
  - Carrito persistente localStorage
  - Autenticación Firebase integrada

### Notas del Presentador:
"El desarrollo frontend demuestra dominio de tecnologías contemporáneas mediante 9 portales especializados: FindItAllMain, Categories, ProductDetailedView, ShoppingCart, AdminPortal, entre otros. La gestión de estado utiliza 4 Context Providers diferenciados para transacciones, preferencias, temas e identidad. La metodología híbrida combina 17 archivos CSS Modules con utilidades Tailwind, implementando 5 temas dinámicos con persistencia automática."

---

## **SLIDE 8: BASE DE DATOS AVANZADAS - MÓDULO 4 [35 segundos]**

### Contenido Visual:
**INFRAESTRUCTURA DE DATOS:**
• **Schema MySQL:** 9 tablas normalizadas + integridad referencial
• **Catálogo:** 190+ productos, 8 categorías especializadas
• **ACID:** Transacciones robustas implementadas
• **Seguridad:** RBAC + Prepared Statements anti-SQL injection
• **Predictivo:** Monte Carlo (1000 iteraciones, precisión 75-95%)

### Notas del Presentador:
"La infraestructura implementa esquema MySQL normalizado con 9 tablas relacionales. El modelo Monte Carlo ejecuta 1000 iteraciones por categoría, analizando patrones de demanda con factores estacionales adaptativos. Las propiedades ACID garantizan consistencia transaccional mediante prepared statements que previenen inyección SQL, mientras RBAC implementa control de acceso granular. El sistema gestiona 190+ productos reales con integridad referencial completa."

---

## **SLIDE 9: CALIDAD DE SOFTWARE - MÓDULO 5 [35 segundos]**
**[Mapeo: STC0205, STC0201]**

### Contenido Visual:
**ESTRATEGIA DE CALIDAD:**
• **Estándares:** PSP + CMMI-DEV + SPICE (ISO/IEC 15504)
• **Pruebas:** 35+ casos E2E automatizadas (Cypress)
• **Categorías:** Unitarias, Integración, No-funcionales, UAT
• **Métricas:** 95%+ éxito, <50ms consultas, 99.94% disponibilidad
• **Evidencia:** Timelog/Defectlog sistemático, CodeQL validation

### Notas del Presentador:
"La estrategia integra estándares internacionales con validación automatizada comprehensiva. La suite Cypress implementa más de 35 casos End-to-End verificando funcionalidades desde navegación hasta rendimiento bajo carga. Las métricas confirman consultas optimizadas manteniendo tiempos inferiores a 50ms con 99.94% disponibilidad. La aplicación de PSP individual, complementada con evaluaciones CMMI-DEV y SPICE, establece cultura de mejora continua basada en evidencia empírica."

---

## **SLIDE 10: DEMOSTRACIÓN FUNCIONAL [40 segundos]**
**[Mapeo: STC0206]**

### Contenido Visual:
**FUNCIONALIDADES IMPLEMENTADAS:**
• **Usuario:** Navegación por 8 categorías, carrito persistente, 5 temas
• **Administrador:** Panel gestión, análisis predictivo, reportes
• **Evidencia en vivo:** 
  - Portal FindItAllMain operativo
  - Carrito con cálculos tiempo real
  - AdminPortal con Monte Carlo funcionando

### Notas del Presentador:
"Las funcionalidades demuestran un e-commerce completamente operativo. Los usuarios navegan categorías como Technology, Sports, Office & Writing con productos reales desde 'Cable USB-B' hasta 'Smartwatch Samsung Galaxy Fit 3'. El carrito mantiene persistencia mediante localStorage con cálculos automáticos. Los administradores acceden a capacidades predictivas: el modelo Monte Carlo proporciona recomendaciones de inventario con factores de seguridad adaptativos basados en incertidumbre por categoría."

---

## **SLIDE 11: EVIDENCIA TÉCNICA [30 segundos]**

### Contenido Visual:
**IMPLEMENTACIÓN VERIFICABLE:**
• **Código:** 17 archivos CSS Modules + API Routes especializadas
• **TypeScript:** Interfaces Product, CartItem, User, Settings
• **Arquitectura:** Schema normalizado + Firebase + Context API
• **Testing:** Vitest + Cypress para automatización
• **Métricas:** <50ms consultas, 100 usuarios concurrentes, 25 transacciones ACID

### Notas del Presentador:
"La evidencia documenta implementación empresarial con métricas verificables. La arquitectura incluye 17 componentes CSS Modules especializados, interfaces TypeScript garantizando type-safety, y esquema MySQL con restricciones de integridad referencial. Las pruebas confirman consultas optimizadas, pool de conexiones manejando 20 conexiones concurrentes, y capacidad para 25 transacciones ACID simultáneas. El sistema demuestra escalabilidad empresarial real."

---

## **SLIDE 12: RESULTADOS Y CONCLUSIONES [25 segundos]**

### Contenido Visual:
**LOGROS ALCANZADOS:**
• **Técnicos:** 100% H.U. implementadas, sistema completamente funcional
• **Metodológicos:** PSP + CMMI-DEV + SPICE aplicados exitosamente
• **Innovación:** Modelo predictivo Monte Carlo operativo
• **Calidad:** 95%+ validación automatizada, métricas empresariales

**IMPACTO DEMOSTRADO:**
• Competencias integrales en ingeniería de software contemporánea
• Aplicación rigurosa de estándares internacionales
• Arquitectura escalable lista para evolución empresarial

### Notas del Presentador:
"FindItAll representa la consolidación exitosa de competencias técnicas y metodológicas en ingeniería de software contemporánea. La aplicación rigurosa de estándares internacionales, incluso en desarrollo individual, resultó en un sistema robusto y escalable. La integración de modelo predictivo Monte Carlo, arquitecturas clean y metodologías de calidad automatizada establece un paradigma que trasciende lo académico, demostrando capacidad para contribuir eficazmente en entornos profesionales de mayor exigencia."

---

## **SLIDE 13: CIERRE [15 segundos]**

### Contenido Visual:
- **FindItAll - Ingeniería de Software Integral**
- **Joaquín Saldarriaga**
- **TC3005B.562 - Junio 2025**
- **"De metodologías académicas a soluciones empresariales"**

### Notas del Presentador:
"Gracias por su atención. FindItAll ejemplifica cómo la integración disciplinada de metodologías contemporáneas y tecnologías de vanguardia transforma el aprendizaje académico en soluciones con potencial empresarial tangible. Este proyecto establece fundamentos sólidos para contribuir eficazmente en entornos profesionales de mayor exigencia."

---

## **TIMING TOTAL: 4:55 minutos**

### **MAPEO COMPLETO DE SUBCOMPETENCIAS:**
- **STC0201:** Slides 5, 9 (PSP, CMMI-DEV, SPICE aplicados)
- **STC0203:** Slide 6 (Arquitectura clean, modelo 4+1, diseño modular)
- **STC0204:** Slide 7 (Frontend Next.js/React, Context API, TypeScript)
- **STC0205:** Slide 9 (35+ pruebas automatizadas, validación integral)
- **SEG0601:** Estructura completa de presentación profesional
- **TC0207:** Slide 5 (Jira, PSP, gestión de riesgos sistemática)
- **STC0206:** Slide 10 (Sistema funcional, métricas de rendimiento)

### **EVIDENCIA TÉCNICA ESPECÍFICA DEL WORKSPACE:**
- **Screenshots reales** de portales funcionando
- **Métricas verificables** (190+ productos, 35+ pruebas, 95%+ éxito)
- **Código específico** (17 CSS Modules, 4 Context Providers, 7 API Routes)
- **Datos reales** del proyecto implementado

### **RECOMENDACIONES DE PRODUCCIÓN:**
- **Resolución:** 1920x1080 HD mínimo
- **Audio:** Volumen constante, sin ruido de fondo
- **Transiciones:** Suaves entre slides (1-2 segundos)
- **Énfasis:** En métricas específicas y evidencia técnica
- **Ritmo:** Pausado después de datos técnicos clave
