// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Sistema de validaciones simples para datos de entrada

// Importamos mysql2 para hacer consultas a la base de datos
const mysql = require('mysql2/promise');

// Configuración para conectarse a la base de datos MySQL
const dbConfig = {
  host: 'localhost', // Servidor donde está la base de datos
  user: 'root', // Usuario de MySQL
  password: '', // Contraseña (vacía en desarrollo local)
  database: 'db_finditall' // Nombre de nuestra base de datos
};

// Función para verificar si un email tiene formato válido
function validateEmail(email) {
  // Expresión regular que verifica: texto@texto.texto
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email); // Devuelve true si coincide con el patrón
}

// Función para verificar que la contraseña sea segura
function validatePassword(password) {
  // La contraseña debe existir y tener al menos 6 caracteres
  return password && password.length >= 6;
}

// Función para verificar que el precio sea válido
function validatePrice(price) {
  const numPrice = parseFloat(price); // Convertimos a número decimal
  return !isNaN(numPrice) && numPrice > 0; // Debe ser un número mayor que 0
}

// Función para verificar que el rol sea permitido
function validateRole(role) {
  // Solo permitimos dos tipos de roles en nuestro sistema
  return role === 'user' || role === 'admin';
}

// Función que verifica si un usuario existe en la base de datos
async function userExists(userId) {
  let connection; // Variable para guardar la conexión
  
  try {
    // Creamos una nueva conexión a la base de datos
    connection = await mysql.createConnection(dbConfig);
    
    // Ejecutamos una consulta para buscar el usuario por ID
    const [users] = await connection.execute(
      'SELECT user_id FROM Users WHERE user_id = ?',
      [userId] // El ? se reemplaza por userId de forma segura
    );
    
    // Si encontramos al menos un usuario, devolvemos true
    return users.length > 0;
    
  } catch (error) {
    console.error('Error verificando usuario:', error);
    return false; // Si hay error, asumimos que no existe
  } finally {
    // IMPORTANTE: Siempre cerramos la conexión
    if (connection) {
      await connection.end();
    }
  }
}

// Función que verifica si una categoría existe en la base de datos
async function categoryExists(categoryId) {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    
    // Buscamos la categoría por su ID
    const [categories] = await connection.execute(
      'SELECT category_id FROM Categories WHERE category_id = ?',
      [categoryId]
    );
    
    return categories.length > 0; // True si la categoría existe
    
  } catch (error) {
    console.error('Error verificando categoría:', error);
    return false;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Función que verifica si un producto existe Y está disponible
async function productAvailable(productId) {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    
    // Buscamos el producto y verificamos si está en stock
    const [products] = await connection.execute(
      'SELECT product_id, is_in_stock FROM Products WHERE product_id = ?',
      [productId]
    );
    
    // El producto debe existir Y estar marcado como disponible
    return products.length > 0 && products[0].is_in_stock;
    
  } catch (error) {
    console.error('Error verificando producto:', error);
    return false;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Función completa para validar todos los datos de un usuario
async function validateUserData(userData) {
  const errors = []; // Array para guardar todos los errores encontrados
  
  // Validamos el nombre - debe tener al menos 2 caracteres
  if (!userData.name || userData.name.length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }
  
  // Validamos el email usando nuestra función validateEmail
  if (!validateEmail(userData.email)) {
    errors.push('Email inválido');
  }
  
  // Validamos la contraseña usando nuestra función validatePassword
  if (!validatePassword(userData.password)) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
  }
  
  // Validamos el rol (si se proporciona)
  if (userData.role && !validateRole(userData.role)) {
    errors.push('Rol inválido. Solo se permite: user, admin');
  }
  
  // Devolvemos un objeto con el resultado de la validación
  return {
    isValid: errors.length === 0, // True si no hay errores
    errors: errors // Lista de todos los errores encontrados
  };
}

// Función completa para validar todos los datos de un producto
async function validateProductData(productData) {
  const errors = [];
  
  // Validamos el nombre - debe existir y no estar vacío
  if (!productData.name || productData.name.length === 0) {
    errors.push('El nombre del producto es requerido');
  }
  
  // Validamos la descripción - debe tener al menos 10 caracteres
  if (!productData.description || productData.description.length < 10) {
    errors.push('La descripción debe tener al menos 10 caracteres');
  }
  
  // Validamos el precio usando nuestra función validatePrice
  if (!validatePrice(productData.price)) {
    errors.push('El precio debe ser un número positivo');
  }
  
  // Validamos la categoría - debe existir en la base de datos
  if (!productData.categoryId) {
    errors.push('La categoría es requerida');
  } else {
    // Verificamos que la categoría realmente existe
    const catExists = await categoryExists(productData.categoryId);
    if (!catExists) {
      errors.push('La categoría especificada no existe');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// Función para validar datos de una orden de compra
async function validateOrderData(orderData) {
  const errors = [];
  
  // Validamos que el usuario exista
  if (!orderData.userId) {
    errors.push('El usuario es requerido');
  } else {
    // Verificamos que el usuario realmente existe en la base de datos
    const userEx = await userExists(orderData.userId);
    if (!userEx) {
      errors.push('El usuario especificado no existe');
    }
  }
  
  // Validamos que haya productos en el carrito
  if (!orderData.cartItems || orderData.cartItems.length === 0) {
    errors.push('La orden debe tener al menos un producto');
  } else {
    // Validamos cada producto en el carrito uno por uno
    for (let item of orderData.cartItems) {
      // Cada item debe tener un ID de producto
      if (!item.productId) {
        errors.push('ID de producto requerido');
        continue; // Saltamos al siguiente item
      }
      
      // Cada item debe tener una cantidad válida
      if (!item.quantity || item.quantity <= 0) {
        errors.push(`Cantidad inválida para producto ${item.productId}`);
        continue;
      }
      
      // Verificamos que el producto esté disponible
      const available = await productAvailable(item.productId);
      if (!available) {
        errors.push(`Producto ${item.productId} no disponible`);
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// Función para limpiar datos de entrada y prevenir ataques
function sanitizeInput(input) {
  if (typeof input === 'string') {
    // Removemos caracteres que podrían ser peligrosos para HTML/SQL
    return input.replace(/[<>'"&]/g, '');
  }
  return input; // Si no es string, lo devolvemos sin cambios
}

// Función para limpiar todo un objeto de datos
function sanitizeObject(obj) {
  const sanitized = {}; // Creamos un nuevo objeto limpio
  
  // Procesamos cada propiedad del objeto original
  for (let key in obj) {
    sanitized[key] = sanitizeInput(obj[key]); // Limpiamos cada valor
  }
  
  return sanitized; // Devolvemos el objeto completamente limpio
}

// Exportamos todas las funciones para que otros archivos puedan usarlas
module.exports = {
  validateEmail, // Validar formato de email
  validatePassword, // Validar seguridad de contraseña
  validatePrice, // Validar que el precio sea positivo
  validateRole, // Validar que el rol sea permitido
  userExists, // Verificar si usuario existe en BD
  categoryExists, // Verificar si categoría existe en BD
  productAvailable, // Verificar si producto está disponible
  validateUserData, // Validación completa de datos de usuario
  validateProductData, // Validación completa de datos de producto
  validateOrderData, // Validación completa de datos de orden
  sanitizeInput, // Limpiar un dato individual
  sanitizeObject // Limpiar un objeto completo
};

// Código de prueba que se ejecuta solo cuando llamamos este archivo directamente
if (require.main === module) {
  async function test() {
    try {
      console.log('Probando validaciones...');
      
      // Probamos la validación de email con casos válidos e inválidos
      console.log('Email válido:', validateEmail('test@test.com'));
      console.log('Email inválido:', validateEmail('invalid-email'));
      
      // Probamos la validación completa de un usuario
      const userData = {
        name: 'Test',
        email: 'test@test.com',
        password: '123456',
        role: 'user'
      };
      
      const userValidation = await validateUserData(userData);
      console.log('Validación de usuario:', userValidation);
      
    } catch (error) {
      console.error('Test falló:', error.message);
    }
  }
  
  // Ejecutamos la función de prueba
  test();
}
