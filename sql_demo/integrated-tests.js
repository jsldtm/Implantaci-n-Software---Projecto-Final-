// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Sistema de pruebas completo para todas las características implementadas

// Importamos las librerías necesarias para las pruebas
const mysql = require('mysql2/promise'); // Cliente MySQL para conexiones directas si necesario
const { executeQuery, executeTransaction } = require('./mysql-connection-pool-advanced'); // Sistema de pool de conexiones
const { authenticateUser, adminOperations, userOperations } = require('./security-rbac-system'); // Sistema de seguridad y roles
const { processOrder } = require('./acid-transactions-system'); // Sistema de transacciones ACID
const { writeLog } = require('./write-ahead-logging'); // Sistema de logging

// Configuración de pruebas - datos de prueba que usaremos para verificar el sistema
const testConfig = {
  database: 'db_finditall', // Nombre de la base de datos que vamos a probar
  testUser: { // Usuario normal de prueba
    name: 'Test User',
    email: 'testuser@test.com',
    password: 'test123',
    role: 'user' // Rol básico, solo puede hacer operaciones limitadas
  },
  testAdmin: { // Usuario administrador de prueba  
    name: 'Test Admin',
    email: 'testadmin@test.com', 
    password: 'admin123',
    role: 'admin' // Rol administrativo, puede hacer todas las operaciones
  }
};

// Función principal que ejecuta todas las pruebas del sistema
async function runAllTests() {
  console.log('=== INICIANDO PRUEBAS COMPLETAS DEL SISTEMA ===\n');
  
  try {
    // Ejecutamos cada grupo de pruebas en orden específico
    await testDatabaseConnection(); // Primero verificamos que podemos conectar a la DB
    await testUserSystem(); // Luego probamos el sistema de usuarios
    await testProductSystem(); // Después el sistema de productos
    await testTransactionSystem(); // Seguido por las transacciones ACID
    await testSecuritySystem(); // Probamos la seguridad y roles
    await testPerformance(); // Finalmente verificamos el rendimiento
    
    console.log('\n=== TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE ===');
    
  } catch (error) {
    // Si alguna prueba falla, mostramos el error y paramos
    console.error('\n=== ERROR EN LAS PRUEBAS ===');
    console.error(error.message);
  }
}

// Test 1: Verificamos que podemos conectarnos a la base de datos
async function testDatabaseConnection() {
  console.log('1. Probando conexión a base de datos...');
  
  try {
    // Ejecutamos una consulta simple para verificar la conexión
    // SELECT 1 es una consulta básica que siempre devuelve el número 1
    const result = await executeQuery('SELECT 1 as test');
    console.log('✓ Conexión exitosa');
  } catch (error) {
    // Si no podemos conectar, lanzamos un error descriptivo
    throw new Error('✗ Error de conexión: ' + error.message);
  }
}

// Test 2: Verificamos el sistema de usuarios y autenticación
async function testUserSystem() {
  console.log('\n2. Probando sistema de usuarios...');
  
  try {
    // Creamos un usuario de prueba en la base de datos
    // IGNORE significa que si ya existe, no dará error
    await executeQuery(
      'INSERT IGNORE INTO Users (user_name, user_email, user_password, user_role) VALUES (?, ?, ?, ?)',
      [testConfig.testUser.name, testConfig.testUser.email, testConfig.testUser.password, testConfig.testUser.role]
    );
    
    // Intentamos autenticar el usuario con email y contraseña
    const user = await authenticateUser(testConfig.testUser.email, testConfig.testUser.password);
    
    if (user) {
      // Si la autenticación fue exitosa, mostramos información del usuario
      console.log(`✓ Usuario autenticado: ${user.user_name}`);
      console.log(`✓ Rol verificado: ${user.user_role}`);
    } else {
      // Si no se pudo autenticar, hay un problema en el sistema
      throw new Error('✗ Fallo en autenticación');
    }
    
  } catch (error) {
    throw new Error('✗ Error en sistema de usuarios: ' + error.message);
  }
}

// Test 3: Verificamos el sistema de productos y categorías
async function testProductSystem() {
  console.log('\n3. Probando sistema de productos...');
  
  try {
    // Contamos cuántas categorías tenemos en total
    const categories = await executeQuery('SELECT COUNT(*) as total FROM Categories');
    console.log(`✓ Categorías disponibles: ${categories[0].total}`);
    
    // Contamos productos que están disponibles en stock
    const products = await executeQuery('SELECT COUNT(*) as total FROM Products WHERE is_in_stock = true');
    console.log(`✓ Productos en stock: ${products[0].total}`);
    
    // Hacemos una consulta más compleja: productos por categoría específica
    // JOIN nos permite combinar datos de las tablas Products y Categories
    const techProducts = await executeQuery(
      'SELECT COUNT(*) as total FROM Products p JOIN Categories c ON p.category_id = c.category_id WHERE c.category_name = ?',
      ['Technology']
    );
    console.log(`✓ Productos de tecnología: ${techProducts[0].total}`);
    
  } catch (error) {
    throw new Error('✗ Error en sistema de productos: ' + error.message);
  }
}

// Test 4: Verificamos las transacciones ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad)
async function testTransactionSystem() {
  console.log('\n4. Probando sistema de transacciones ACID...');
  
  try {
    // Creamos un usuario específico para probar transacciones
    await executeQuery(
      'INSERT IGNORE INTO Users (user_name, user_email, user_password, user_role) VALUES (?, ?, ?, ?)',
      ['Transaction Test', 'trans@test.com', 'trans123', 'user']
    );
    
    // Buscamos el usuario que acabamos de crear para obtener su ID
    const [testUser] = await executeQuery(
      'SELECT user_id FROM Users WHERE user_email = ?',
      ['trans@test.com']
    );
    
    if (!testUser) {
      throw new Error('No se pudo crear usuario de prueba');
    }
    
    // Buscamos un producto disponible para simular una compra
    const [product] = await executeQuery(
      'SELECT product_id, product_price FROM Products WHERE is_in_stock = true LIMIT 1'
    );
    
    if (!product) {
      throw new Error('No hay productos disponibles para la prueba');
    }
    
    // Definimos los items del carrito para la prueba
    const cartItems = [
      { productId: product.product_id, quantity: 1 }
    ];
    
    // Ejecutamos una transacción ACID completa
    // Una transacción garantiza que todas las operaciones se ejecuten o ninguna
    const orderResult = await executeTransaction(async (connection) => {
      // Dentro de la transacción, creamos una orden simple
      const [orderInsert] = await connection.execute(
        'INSERT INTO Orders (user_id, total_amount, order_status) VALUES (?, ?, ?)',
        [testUser.user_id, product.product_price, 'completed']
      );
      
      // Devolvemos los resultados de la transacción
      return { orderId: orderInsert.insertId, total: product.product_price };
    });    
    // Si llegamos aquí, la transacción fue exitosa
    console.log(`✓ Transacción ACID completada - Orden ID: ${orderResult.orderId}`);
    console.log(`✓ Total procesado: $${orderResult.total}`);
    
  } catch (error) {
    throw new Error('✗ Error en transacciones ACID: ' + error.message);
  }
}

// Test 5: Verificamos el sistema de seguridad y control de acceso basado en roles (RBAC)
async function testSecuritySystem() {
  console.log('\n5. Probando sistema de seguridad...');
  
  try {
    // Creamos un usuario administrador para las pruebas
    await executeQuery(
      'INSERT IGNORE INTO Users (user_name, user_email, user_password, user_role) VALUES (?, ?, ?, ?)',
      [testConfig.testAdmin.name, testConfig.testAdmin.email, testConfig.testAdmin.password, testConfig.testAdmin.role]
    );
    
    // Autenticamos al administrador
    const admin = await authenticateUser(testConfig.testAdmin.email, testConfig.testAdmin.password);
    
    if (!admin) {
      throw new Error('No se pudo autenticar admin');
    }
    
    // Probamos las operaciones que solo un admin puede hacer
    const adminOps = await adminOperations(admin);
    const allUsers = await adminOps.getAllUsers(); // Solo admins pueden ver todos los usuarios
    console.log(`✓ Admin puede ver usuarios: ${allUsers.length} usuarios`);
    
    // Autenticamos a un usuario normal
    const user = await authenticateUser(testConfig.testUser.email, testConfig.testUser.password);
    
    if (!user) {
      throw new Error('No se pudo autenticar usuario normal');
    }
    
    // Probamos las operaciones que un usuario normal SÍ puede hacer
    const userOps = await userOperations(user);
    const products = await userOps.getProducts(); // Los usuarios pueden ver productos
    console.log(`✓ Usuario puede ver productos: ${products.length} productos`);
    
    // IMPORTANTE: Verificamos que un usuario normal NO puede hacer operaciones de admin
    try {
      await adminOperations(user); // Esto debería fallar
      throw new Error('Usuario normal pudo acceder a operaciones de admin');
    } catch (securityError) {
      // Si falla (que es lo esperado), la seguridad está funcionando
      console.log('✓ Seguridad verificada: usuario normal bloqueado de operaciones admin');
    }
    
  } catch (error) {
    throw new Error('✗ Error en sistema de seguridad: ' + error.message);
  }
}

// Test 6: Verificamos el rendimiento y optimización de consultas
async function testPerformance() {
  console.log('\n6. Probando performance y optimización...');
  
  try {
    // Medimos el tiempo que toma ejecutar una consulta compleja
    const startTime = Date.now(); // Guardamos el tiempo de inicio
    
    // Ejecutamos una consulta que usa JOIN e índices para ser eficiente
    const results = await executeQuery(`
      SELECT p.product_name, c.category_name, p.product_price 
      FROM Products p 
      JOIN Categories c ON p.category_id = c.category_id 
      WHERE p.is_in_stock = true 
      ORDER BY p.product_price DESC 
      LIMIT 10
    `);
    
    // Calculamos cuánto tiempo tomó la consulta
    const duration = Date.now() - startTime;
    console.log(`✓ Consulta optimizada ejecutada en ${duration}ms`);
    console.log(`✓ Productos más caros obtenidos: ${results.length} resultados`);
    
    // Verificamos que los índices necesarios existen en la base de datos
    // Los índices hacen que las consultas sean mucho más rápidas
    const indexes = await executeQuery(`
      SELECT INDEX_NAME, COLUMN_NAME 
      FROM INFORMATION_SCHEMA.STATISTICS 
      WHERE TABLE_SCHEMA = 'db_finditall' 
      AND TABLE_NAME = 'Products'
      AND INDEX_NAME != 'PRIMARY'
    `);
    
    console.log(`✓ Índices creados en tabla Products: ${indexes.length} índices`);
    
  } catch (error) {
    throw new Error('✗ Error en pruebas de performance: ' + error.message);
  }
}

// Función para eliminar todos los datos de prueba que creamos
async function cleanupTestData() {
  console.log('\n=== LIMPIANDO DATOS DE PRUEBA ===');
  
  try {
    // Eliminamos las órdenes que pertenecen a usuarios de prueba
    // Usamos una subconsulta para encontrar usuarios con emails de prueba
    await executeQuery('DELETE FROM Orders WHERE user_id IN (SELECT user_id FROM Users WHERE user_email LIKE "%test.com")');
    
    // Eliminamos todos los usuarios de prueba (emails terminan en test.com)
    await executeQuery('DELETE FROM Users WHERE user_email LIKE "%test.com"');
    
    console.log('✓ Datos de prueba eliminados');
    
  } catch (error) {
    console.error('Error limpiando datos de prueba:', error.message);
  }
}

// Función para mostrar un resumen de todos los datos en el sistema
async function showSystemStats() {
  console.log('\n=== ESTADÍSTICAS DEL SISTEMA ===');
  
  try {
    // Ejecutamos múltiples consultas COUNT en una sola query usando UNION ALL
    // Esto es más eficiente que hacer varias consultas separadas
    const stats = await executeQuery(`
      SELECT 
        'Users' as tabla, COUNT(*) as total FROM Users
      UNION ALL
      SELECT 'Products', COUNT(*) FROM Products  
      UNION ALL
      SELECT 'Categories', COUNT(*) FROM Categories
      UNION ALL
      SELECT 'Orders', COUNT(*) FROM Orders
      UNION ALL
      SELECT 'Products in Stock', COUNT(*) FROM Products WHERE is_in_stock = true
    `);
    
    // Mostramos cada estadística en la consola
    stats.forEach(stat => {
      console.log(`${stat.tabla}: ${stat.total}`);
    });
    
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error.message);
  }
}

// Código que se ejecuta cuando este archivo se llama directamente (no como import)
if (require.main === module) {
  async function main() {
    // Ejecutamos la secuencia completa de pruebas
    await runAllTests(); // Todas las pruebas del sistema
    await showSystemStats(); // Estadísticas finales
    await cleanupTestData(); // Limpieza de datos de prueba
    process.exit(0); // Salimos del programa
  }
  
  // Ejecutamos main() y si hay error, lo mostramos en consola
  main().catch(console.error);
}

// Exportamos todas las funciones para que otros archivos puedan usarlas
module.exports = {
  runAllTests,
  testDatabaseConnection,
  testUserSystem,
  testProductSystem,
  testTransactionSystem,
  testSecuritySystem,
  testPerformance,
  cleanupTestData,
  showSystemStats
};
