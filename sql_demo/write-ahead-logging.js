// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Sistema de logging simple para operaciones de base de datos

// Importamos las librerías que necesitamos
const mysql = require('mysql2/promise'); // Para conectarnos a MySQL
const fs = require('fs');                // Para escribir archivos
const path = require('path');            // Para manejar rutas de archivos

// Configuración simple de conexión a la base de datos
const dbConfig = {
  host: 'localhost',        // Servidor donde está MySQL
  user: 'root',            // Usuario de la base de datos
  password: '',            // Contraseña (vacía en desarrollo)
  database: 'db_finditall' // Nombre de nuestra base de datos
};

// Crear archivo de log en la misma carpeta donde está este archivo
const logFile = path.join(__dirname, 'database_operations.log');

// Función simple para escribir mensajes en el archivo de log
function writeLog(message) {
  const timestamp = new Date().toISOString(); // Fecha y hora actual
  const logMessage = `[${timestamp}] ${message}\n`;
  
  // Escribir al archivo (se crea automáticamente si no existe)
  fs.appendFileSync(logFile, logMessage);
  
  // También mostrar en la consola para desarrollo
  console.log(logMessage.trim());
}

// Función principal para ejecutar consultas con logging automático
async function executeWithLog(query, params = [], operation = 'QUERY') {
  let connection; // Variable para la conexión
  const startTime = Date.now(); // Momento en que empezamos
  
  try {
    // Conectar a la base de datos
    connection = await mysql.createConnection(dbConfig);
    
    // Escribir en el log que vamos a empezar la operación
    writeLog(`[${operation}] Iniciando: ${query.substring(0, 100)}...`);
    
    // Ejecutar la consulta real
    const [results] = await connection.execute(query, params);
    const duration = Date.now() - startTime; // Calcular cuánto tiempo tomó
    
    // Escribir en el log que todo salió bien
    writeLog(`[${operation}] Exitoso en ${duration}ms - Filas afectadas: ${results.affectedRows || results.length}`);
    
    return results; // Devolver los resultados
    
  } catch (error) {
    // Si algo salió mal, también lo registramos
    const duration = Date.now() - startTime;
    writeLog(`[${operation}] ERROR en ${duration}ms: ${error.message}`);    throw error; // Volvemos a lanzar el error para que se maneje arriba
  } finally {
    // SIEMPRE cerrar la conexión
    if (connection) {
      await connection.end();
    }
  }
}

// Función para hacer backup de los archivos de log cuando se llenan mucho
function backupLogs() {
  const backupFile = path.join(__dirname, `backup_${Date.now()}.log`);
  
  // Si existe el archivo de log actual
  if (fs.existsSync(logFile)) {
    fs.copyFileSync(logFile, backupFile); // Copiarlo al backup
    fs.writeFileSync(logFile, ''); // Limpiar el archivo actual para empezar limpio
    writeLog('LOG: Backup de logs creado y archivo actual limpiado');
  }
}

// === OPERACIONES ESPECÍFICAS CON LOGGING ===

// Insertar un nuevo producto registrando toda la operación
async function insertProduct(name, description, price, categoryId) {
  writeLog(`[PRODUCT] Intentando insertar producto: ${name}`);
  
  return await executeWithLog(
    'INSERT INTO Products (product_name, product_description, product_price, category_id, is_in_stock) VALUES (?, ?, ?, ?, ?)',
    [name, description, price, categoryId, true], // Por defecto está disponible
    'INSERT_PRODUCT'
  );
}

// Buscar productos y registrar la búsqueda
async function searchProducts(searchTerm) {
  writeLog(`[SEARCH] Buscando productos con término: ${searchTerm}`);
  
  return await executeWithLog(
    'SELECT * FROM Products WHERE product_name LIKE ? OR product_description LIKE ?',
    [`%${searchTerm}%`, `%${searchTerm}%`], // Buscar el término en nombre o descripción
    'SEARCH_PRODUCTS'
  );
}

// Procesar una orden completa con logging detallado de cada paso
async function processOrderWithLog(userId, cartItems) {
  writeLog(`[ORDER] Iniciando procesamiento de orden para usuario ${userId}`);
  
  let connection; // Variable para la conexión
  
  try {
    // Conectar y empezar transacción
    connection = await mysql.createConnection(dbConfig);
    await connection.beginTransaction();
    
    writeLog('[ORDER] Transacción iniciada');
    
    // Paso 1: Crear la orden nueva
    const [orderResult] = await connection.execute(
      'INSERT INTO Orders (user_id, total_amount, order_status) VALUES (?, ?, ?)',
      [userId, 0, 'pending'] // Empezamos con total 0 y estado pendiente
    );
    const orderId = orderResult.insertId;
    
    writeLog(`[ORDER] Orden creada con ID: ${orderId}`);
    
    let total = 0; // Variable para calcular el total
    
    // Paso 2: Procesar cada producto del carrito
    for (let item of cartItems) {
      // Verificar que el producto esté disponible
      const [product] = await connection.execute(
        'SELECT product_price, is_in_stock FROM Products WHERE product_id = ?',
        [item.productId]
      );
      
      // Si no hay stock, cancelar todo
      if (!product[0] || !product[0].is_in_stock) {
        throw new Error(`Producto ${item.productId} no disponible`);
      }
      
      // Agregar el item a la orden
      await connection.execute(
        'INSERT INTO Item_in_cart (order_id, product_id, quantity) VALUES (?, ?, ?)',
        [orderId, item.productId, item.quantity]
      );
      
      // Calcular el subtotal de este item
      const itemTotal = product[0].product_price * item.quantity;
      total += itemTotal;
      
      writeLog(`[ORDER] Item agregado: Producto ${item.productId}, Cantidad ${item.quantity}, Total ${itemTotal}`);
    }
    
    // Paso 3: Actualizar el total final de la orden
    await connection.execute(
      'UPDATE Orders SET total_amount = ? WHERE order_id = ?',
      [total, orderId]
    );    
    // Paso 4: Confirmar todos los cambios
    await connection.commit();
    writeLog(`[ORDER] Orden ${orderId} completada exitosamente. Total: $${total}`);
    
    return { orderId, total }; // Devolver información de la orden
    
  } catch (error) {
    // Si algo salió mal, deshacer todos los cambios
    if (connection) {
      await connection.rollback();
      writeLog(`[ORDER] ERROR - Rollback ejecutado: ${error.message}`);
    }
    throw error;
  } finally {
    // Siempre cerrar la conexión
    if (connection) {
      await connection.end();
    }
  }
}

// Función para ver estadísticas del archivo de log
function getLogStats() {
  // Verificar si existe el archivo
  if (!fs.existsSync(logFile)) {
    return { message: 'No hay archivo de log' };
  }
  
  // Leer todo el contenido del archivo
  const logContent = fs.readFileSync(logFile, 'utf8');
  const lines = logContent.split('\n').filter(line => line.trim()); // Filtrar líneas vacías
  
  // Calcular estadísticas básicas
  const stats = {
    totalEntries: lines.length,                                        // Total de entradas
    errors: lines.filter(line => line.includes('ERROR')).length,       // Cuántos errores
    queries: lines.filter(line => line.includes('QUERY')).length,      // Cuántas consultas
    orders: lines.filter(line => line.includes('ORDER')).length,       // Cuántas órdenes
    lastEntry: lines[lines.length - 1] || 'Sin entradas'               // Última entrada
  };
  
  writeLog(`[STATS] Log contiene ${stats.totalEntries} entradas, ${stats.errors} errores`);
  
  return stats;
}

module.exports = {
  executeWithLog,
  insertProduct,
  searchProducts,
  processOrderWithLog,
  getLogStats,
  backupLogs,
  writeLog
};

// Test básico
if (require.main === module) {
  async function test() {
    try {
      writeLog('=== INICIANDO TEST DEL SISTEMA DE LOGGING ===');
      
      // Test de búsqueda
      await searchProducts('test');
      
      // Ver estadísticas
      const stats = getLogStats();
      console.log('Estadísticas del log:', stats);
      
      writeLog('=== TEST COMPLETADO ===');
      
    } catch (error) {
      writeLog(`TEST ERROR: ${error.message}`);
    }
  }
  
  test();
}
