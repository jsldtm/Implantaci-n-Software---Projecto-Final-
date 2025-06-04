// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Sistema ACID básico para transacciones de e-commerce

// Importamos la librería para conectarnos a MySQL
const mysql = require('mysql2/promise');

// Configuración simple de conexión a la base de datos
const dbConfig = {
  host: 'localhost',        // Servidor donde está MySQL
  user: 'root',            // Usuario de la base de datos
  password: '',            // Contraseña (vacía en desarrollo)
  database: 'db_finditall' // Nombre de nuestra base de datos
};

// Función principal para hacer transacciones ACID (todo o nada)
async function doTransaction(callback) {
  let connection; // Variable para guardar la conexión
  
  try {
    // Paso 1: Conectar a la base de datos
    connection = await mysql.createConnection(dbConfig);
    
    // Paso 2: Empezar transacción (agrupa varias operaciones)
    await connection.beginTransaction();
    console.log('Transacción iniciada');
    
    // Paso 3: Ejecutar todas las operaciones que nos pasen
    const result = await callback(connection);
    
    // Paso 4: Si todo salió bien, confirmar cambios
    await connection.commit();
    console.log('Transacción exitosa');
    
    return result; // Devolvemos el resultado
    
  } catch (error) {
    // Si hay algún error, deshacer TODOS los cambios
    if (connection) {
      await connection.rollback();
      console.log('Error - Transacción deshecha');
    }
    throw error; // Volvemos a lanzar el error
  } finally {
    // SIEMPRE cerrar la conexión al final
    if (connection) {
      await connection.end();
    }
  }
}

// Ejemplo práctico: Procesar una compra completa (orden de compra)
async function processOrder(userId, cartItems) {
  return await doTransaction(async (connection) => {
    // Paso 1: Crear una nueva orden en la tabla Orders
    const [orderResult] = await connection.execute(
      'INSERT INTO Orders (user_id, total_amount, order_status) VALUES (?, ?, ?)',
      [userId, 0, 'pending'] // Empezamos con total en 0 y estado pendiente
    );
    const orderId = orderResult.insertId; // Obtenemos el ID de la orden recién creada
    
    let total = 0; // Variable para calcular el total de la compra
    
    // Paso 2: Procesar cada producto del carrito
    for (let item of cartItems) {
      // Verificar que el producto esté disponible
      const [stockCheck] = await connection.execute(
        'SELECT is_in_stock, product_price FROM Products WHERE product_id = ?',
        [item.productId]
      );
      
      // Si no hay stock, cancelar toda la transacción
      if (!stockCheck[0] || !stockCheck[0].is_in_stock) {
        throw new Error('Producto no disponible');
      }
      
      // Agregar el item a la orden
      await connection.execute(
        'INSERT INTO Item_in_cart (order_id, product_id, quantity) VALUES (?, ?, ?)',
        [orderId, item.productId, item.quantity]
      );
      
      // Sumar al total de la compra
      total += stockCheck[0].product_price * item.quantity;
    }
    
    // Paso 3: Actualizar el total final de la orden
    await connection.execute(
      'UPDATE Orders SET total_amount = ? WHERE order_id = ?',
      [total, orderId]
    );
    
    // Paso 4: Limpiar el carrito del usuario (ya que procesó la compra)
    await connection.execute(
      'DELETE FROM Item_in_cart WHERE cart_id IN (SELECT cart_id FROM Carts WHERE user_id = ?)',
      [userId]
    );
    
    // Devolver información de la orden creada
    return { orderId, total };
  });
}

// Ejemplo: Actualizar inventario de forma segura
async function updateInventory(productId, newStock) {
  return await doTransaction(async (connection) => {
    // Paso 1: Verificar que el producto existe en la base de datos
    const [product] = await connection.execute(
      'SELECT product_id FROM Products WHERE product_id = ?',
      [productId]
    );
    
    // Si no encontramos el producto, lanzar error
    if (!product[0]) {
      throw new Error('Producto no encontrado');
    }
    
    // Paso 2: Actualizar el stock del producto
    // Si newStock > 0, el producto está disponible (true), si no, no está disponible (false)
    await connection.execute(
      'UPDATE Products SET is_in_stock = ? WHERE product_id = ?',
      [newStock > 0, productId]
    );
    
    // Devolver confirmación del cambio
    return { productId, newStock };
  });
}

// Exportamos las funciones para que otros archivos las puedan usar
module.exports = {
  doTransaction,    // Función base para hacer transacciones
  processOrder,     // Función para procesar órdenes
  updateInventory   // Función para actualizar inventario
};

// Código de prueba - Solo se ejecuta si corremos este archivo directamente
if (require.main === module) {
  // Función para probar que todo funciona
  async function test() {
    try {
      console.log('Probando sistema ACID...');
      
      // Probar actualización de inventario
      await updateInventory(1, 10);
      console.log('Test exitoso');
      
    } catch (error) {
      console.error('Test falló:', error.message);
    }
  }
  
  // Ejecutar el test
  test();
}