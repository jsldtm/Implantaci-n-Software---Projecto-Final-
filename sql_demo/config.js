// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Configuración centralizada para desarrollo del sistema de base de datos

// Configuración de conexión a MySQL para diferentes entornos
const DATABASE_CONFIG = {
  development: { // Configuración para desarrollo local
    host: process.env.MYSQL_HOST || 'localhost', // Servidor de BD (usa variable de entorno o localhost)
    port: process.env.MYSQL_PORT || 3306, // Puerto MySQL estándar
    user: process.env.MYSQL_USER || 'root', // Usuario de BD
    password: process.env.MYSQL_PASSWORD || '', // Contraseña (vacía en desarrollo)
    database: process.env.MYSQL_DATABASE || 'db_finditall', // Nombre de la BD
    connectionLimit: 10, // Máximo 10 conexiones simultáneas
    acquireTimeout: 60000, // Tiempo máximo para obtener conexión (60 segundos)
    timeout: 60000, // Tiempo máximo para consultas
    reconnect: true // Reconectar automáticamente si se pierde conexión
  },
  
  production: { // Configuración para producción (servidor real)
    host: process.env.MYSQL_HOST, // En producción, SIEMPRE usar variables de entorno
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || 'db_finditall',
    connectionLimit: 15, // Más conexiones para manejar más usuarios
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true,
    ssl: true // En producción, usar SSL para seguridad
  }
};

// Definición de los roles de usuario en nuestro sistema
const ROLES = {
  USER: 'user', // Usuarios normales - pueden comprar, ver productos, gestionar carrito
  ADMIN: 'admin' // Administradores - pueden gestionar productos, usuarios, ver estadísticas
};

// Lista de todas las categorías de productos disponibles en la tienda
const CATEGORIES = [
  'Office & writing', // Artículos de oficina y escritura
  'Technology', // Productos tecnológicos
  'Accessories', // Accesorios diversos
  'Shirts', // Camisetas y ropa
  'Household', // Artículos para el hogar
  'Movies & TV', // Películas y TV
  'Pet supplies', // Suministros para mascotas
  'Sports', // Artículos deportivos
  'Books' // Libros
];

// Configuración del sistema de logging (registro de eventos)
const LOGGING_CONFIG = {
  enabled: process.env.NODE_ENV !== 'production', // Solo log en desarrollo (no en producción)
  logFile: 'database_operations.log', // Archivo donde guardar los logs
  backupAfter: 1000, // Hacer backup del log después de 1000 líneas
  levels: { // Niveles de importancia de los mensajes
    ERROR: 'ERROR', // Errores críticos
    WARN: 'WARN', // Advertencias
    INFO: 'INFO', // Información general
    DEBUG: 'DEBUG' // Información detallada para debugging
  }
};

// Reglas de validación para diferentes tipos de datos
const VALIDATION_RULES = {
  user: { // Reglas para validar datos de usuario
    nameMinLength: 2, // Nombre mínimo 2 caracteres
    passwordMinLength: 6, // Contraseña mínimo 6 caracteres
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Patrón de email válido
  },
  product: { // Reglas para validar datos de producto
    nameMinLength: 1, // Nombre mínimo 1 caracter
    descriptionMinLength: 10, // Descripción mínimo 10 caracteres
    priceMin: 0.01, // Precio mínimo $0.01
    priceMax: 999999.99 // Precio máximo $999,999.99
  },
  order: { // Reglas para validar órdenes de compra
    minItems: 1, // Mínimo 1 producto en el carrito
    maxItems: 50 // Máximo 50 productos por orden
  }
};

// Configuración para optimizar el rendimiento de la base de datos
const PERFORMANCE_CONFIG = {
  queryTimeout: 30000, // Tiempo máximo para una consulta (30 segundos)
  maxRetries: 3, // Máximo 3 intentos si falla una consulta
  retryDelay: 1000, // Esperar 1 segundo entre reintentos
  slowQueryThreshold: 1000, // Considerar "lenta" una consulta que toma más de 1 segundo
  indexHints: { // Sugerencias de qué índices usar para consultas específicas
    userLogin: 'idx_users_email', // Índice para login de usuarios
    productSearch: 'idx_products_category_stock', // Índice para búsqueda de productos
    orderHistory: 'idx_orders_user' // Índice para historial de órdenes
  }
};

// Estados válidos que pueden tener diferentes elementos del sistema
const SYSTEM_STATES = {
  orderStatus: ['pending', 'completed', 'cancelled'], // Estados de órdenes
  paymentStatus: ['pending', 'completed', 'failed'], // Estados de pagos
  paymentMethods: ['credit_card', 'debit_card', 'paypal', 'cash'] // Métodos de pago aceptados
};

// Función principal para obtener toda la configuración según el entorno
function getConfig(environment = 'development') {
  return {
    database: DATABASE_CONFIG[environment] || DATABASE_CONFIG.development, // Config de BD
    roles: ROLES, // Roles del sistema
    categories: CATEGORIES, // Categorías de productos
    logging: LOGGING_CONFIG, // Configuración de logs
    validation: VALIDATION_RULES, // Reglas de validación
    performance: PERFORMANCE_CONFIG, // Configuración de rendimiento
    states: SYSTEM_STATES // Estados válidos del sistema
  };
}

// Función para verificar que la configuración sea válida
function validateConfig(config) {
  // Lista de campos obligatorios en la configuración de BD
  const required = ['host', 'user', 'database'];
  
  // Encontramos qué campos faltan
  const missing = required.filter(key => !config.database[key]);
  
  // Si faltan campos, lanzamos un error
  if (missing.length > 0) {
    throw new Error(`Configuración incompleta. Faltan: ${missing.join(', ')}`);
  }
  
  return true; // Si todo está bien, devolvemos true
}

// Función para mostrar la configuración actual (sin mostrar datos sensibles como contraseñas)
function showConfig() {
  const config = getConfig(); // Obtenemos la configuración actual
  
  console.log('=== CONFIGURACIÓN DEL SISTEMA ===');
  console.log('Base de datos:', config.database.database);
  console.log('Host:', config.database.host);
  console.log('Puerto:', config.database.port);
  console.log('Usuario:', config.database.user);
  console.log('Límite de conexiones:', config.database.connectionLimit);
  console.log('Roles disponibles:', Object.values(config.roles));
  console.log('Categorías:', config.categories.length, 'categorías');
  console.log('Logging habilitado:', config.logging.enabled);
  console.log('=====================================');
}

// Exportamos todas las funciones y constantes para usar en otros archivos
module.exports = {
  getConfig, // Función principal para obtener configuración
  validateConfig, // Función para validar configuración
  showConfig, // Función para mostrar configuración
  DATABASE_CONFIG, // Configuraciones de BD
  ROLES, // Roles del sistema
  CATEGORIES, // Categorías de productos
  LOGGING_CONFIG, // Configuración de logging
  VALIDATION_RULES, // Reglas de validación
  PERFORMANCE_CONFIG, // Configuración de rendimiento
  SYSTEM_STATES // Estados válidos del sistema
};

// Si ejecutamos este archivo directamente, mostramos la configuración
if (require.main === module) {
  showConfig();
}
