// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Sistema de seguridad básico con roles user y admin

// Importamos la librería para conectarnos a MySQL
const mysql = require('mysql2/promise');

// Configuración simple de conexión a la base de datos
const dbConfig = {
  host: 'localhost',        // Servidor donde está MySQL
  user: 'root',            // Usuario de la base de datos
  password: '',            // Contraseña (vacía en desarrollo)
  database: 'db_finditall' // Nombre de nuestra base de datos
};

// Función principal para verificar usuario y contraseña (login)
async function authenticateUser(email, password) {
  let connection; // Variable para la conexión a la base de datos
  
  try {
    // Conectamos a la base de datos
    connection = await mysql.createConnection(dbConfig);
    
    // Buscar usuario por email y contraseña usando prepared statements (seguro contra inyección SQL)
    const [users] = await connection.execute(
      'SELECT user_id, user_name, user_email, user_role FROM Users WHERE user_email = ? AND user_password = ?',
      [email, password] // Los ? se reemplazan automáticamente por estos valores de forma segura
    );
    
    // Si no encontramos usuarios, las credenciales son incorrectas
    if (users.length === 0) {
      return null; // Usuario no encontrado o contraseña incorrecta
    }
    
    return users[0]; // Retornar datos del primer usuario encontrado
    
  } catch (error) {
    console.error('Error en autenticación:', error);
    return null; // Si hay error, no autenticar
  } finally {
    // SIEMPRE cerrar la conexión al final
    if (connection) {
      await connection.end();
    }
  }
}

// Función simple para verificar si el usuario es administrador
function isAdmin(user) {
  return user && user.user_role === 'admin'; // Solo devuelve true si existe el usuario Y su rol es 'admin'
}

// Función simple para verificar si el usuario es usuario normal
function isUser(user) {
  return user && user.user_role === 'user'; // Solo devuelve true si existe el usuario Y su rol es 'user'
}

// Función segura para ejecutar consultas con parámetros (evita inyección SQL)
async function safeQuery(query, params = []) {
  let connection; // Variable para la conexión
  
  try {
    // Conectamos a la base de datos
    connection = await mysql.createConnection(dbConfig);
    
    // Usar prepared statements para evitar SQL injection (los ? se reemplazan de forma segura)
    const [results] = await connection.execute(query, params);
    return results; // Devolvemos los resultados
    
  } catch (error) {
    console.error('Error en consulta:', error);
    throw error; // Volvemos a lanzar el error
  } finally {
    // SIEMPRE cerrar la conexión
    if (connection) {
      await connection.end();
    }
  }
}

// Operaciones especiales que solo puede hacer un administrador
async function adminOperations(user) {
  // Primero verificamos que el usuario sea admin, si no, lanzamos error
  if (!isAdmin(user)) {
    throw new Error('Acceso denegado: se requieren permisos de admin');
  }
  
  // Si es admin, devolvemos un objeto con todas las operaciones que puede hacer
  return {
    // Ver todos los usuarios del sistema
    getAllUsers: async () => {
      return await safeQuery('SELECT user_id, user_name, user_email, user_role FROM Users');
    },
    
    // Agregar un nuevo producto al catálogo
    addProduct: async (name, description, price, categoryId) => {
      return await safeQuery(
        'INSERT INTO Products (product_name, product_description, product_price, category_id, is_in_stock) VALUES (?, ?, ?, ?, ?)',
        [name, description, price, categoryId, true] // Por defecto el producto está disponible
      );
    },
      // Actualizar información de un producto existente
    updateProduct: async (productId, name, description, price) => {
      return await safeQuery(
        'UPDATE Products SET product_name = ?, product_description = ?, product_price = ? WHERE product_id = ?',
        [name, description, price, productId]
      );
    },
    
    // Ver todas las órdenes del sistema (solo admin puede ver todo)
    getAllOrders: async () => {
      return await safeQuery('SELECT * FROM Orders');
    }
  };
}

// Operaciones que puede hacer un usuario normal (user) o admin
async function userOperations(user) {
  // Verificamos que el usuario esté autenticado (sea user o admin)
  if (!isUser(user) && !isAdmin(user)) {
    throw new Error('Acceso denegado: usuario no autenticado');
  }
  
  // Devolvemos las operaciones que puede hacer cualquier usuario autenticado
  return {
    // Ver productos disponibles en la tienda
    getProducts: async () => {
      return await safeQuery('SELECT * FROM Products WHERE is_in_stock = true');
    },
    
    // Ver productos filtrados por categoría
    getProductsByCategory: async (categoryId) => {
      return await safeQuery(
        'SELECT * FROM Products WHERE category_id = ? AND is_in_stock = true',
        [categoryId]
      );
    },
    
    // Ver mis órdenes (solo las propias del usuario logueado)
    getMyOrders: async () => {
      return await safeQuery(
        'SELECT * FROM Orders WHERE user_id = ?',
        [user.user_id] // Solo las órdenes de este usuario específico
      );
    },
    
    // Agregar producto al carrito de compras
    addToCart: async (productId, quantity) => {
      // Primero verificar que el producto existe y está disponible
      const products = await safeQuery(
        'SELECT product_id FROM Products WHERE product_id = ? AND is_in_stock = true',        [productId]
      );
      
      // Si no encontramos el producto, lanzar error
      if (products.length === 0) {
        throw new Error('Producto no disponible');
      }
      
      // Buscar el carrito del usuario o crear uno nuevo si no existe
      let carts = await safeQuery(
        'SELECT cart_id FROM Carts WHERE user_id = ?',
        [user.user_id]
      );
      
      let cartId;
      if (carts.length === 0) {
        // El usuario no tiene carrito, crear uno nuevo
        const result = await safeQuery(
          'INSERT INTO Carts (user_id) VALUES (?)',
          [user.user_id]
        );
        cartId = result.insertId; // Obtenemos el ID del carrito recién creado
      } else {
        // El usuario ya tiene carrito, usar ese
        cartId = carts[0].cart_id;
      }
      
      // Finalmente agregar el producto al carrito
      return await safeQuery(
        'INSERT INTO Item_in_cart (cart_id, product_id, quantity) VALUES (?, ?, ?)',
        [cartId, productId, quantity]
      );
    }
  };
}

// Función para crear un nuevo usuario en el sistema
async function createUser(name, email, password, role = 'user') {
  // Validación: Solo permitir roles válidos (user o admin)
  if (role !== 'user' && role !== 'admin') {
    throw new Error('Rol inválido. Solo se permite: user, admin');
  }
  
  // Insertar el nuevo usuario en la base de datos
  return await safeQuery(
    'INSERT INTO Users (user_name, user_email, user_password, user_role) VALUES (?, ?, ?, ?)',
    [name, email, password, role] // Por defecto será 'user' si no se especifica
  );
}

// Exportamos todas las funciones para que otros archivos las puedan usar
module.exports = {
  authenticateUser,    // Para hacer login
  isAdmin,            // Para verificar si es administrador
  isUser,             // Para verificar si es usuario normal
  safeQuery,          // Para hacer consultas seguras
  adminOperations,    // Operaciones exclusivas de admin
  userOperations,     // Operaciones de usuarios normales
  createUser          // Para registrar nuevos usuarios
};

// Código de prueba - Solo se ejecuta si corremos este archivo directamente
if (require.main === module) {
  // Función para probar que el sistema funciona
  async function test() {
    try {
      console.log('Probando sistema de seguridad...');
      
      // Intentar crear un usuario de prueba
      await createUser('Test User', 'test@test.com', '123456', 'user');
      
      // Intentar autenticar al usuario que acabamos de crear
      const user = await authenticateUser('test@test.com', '123456');
      
      if (user) {
        console.log('Usuario autenticado:', user.user_name);
        console.log('Es admin?', isAdmin(user));
        console.log('Es user?', isUser(user));
      }
      
    } catch (error) {
      console.error('Test falló:', error.message);
    }
  }
  
  // Ejecutar la prueba
  test();
}