// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Ejemplo básico de cómo eliminar datos usando Node.js y MySQL

// Importamos las librerías necesarias
const mysql = require('mysql2'); // Cliente MySQL para Node.js
const dotenv = require('dotenv'); // Para manejar variables de entorno de forma segura
dotenv.config(); // Cargamos las variables del archivo .env

// Creamos la conexión usando variables de entorno
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Establecemos la conexión
connection.connect();

// Definimos la consulta DELETE para eliminar un producto específico
// DELETE elimina filas completas, WHERE especifica cuál producto eliminar
// IMPORTANTE: Siempre usar WHERE para evitar eliminar TODOS los productos
const sql = "DELETE FROM products WHERE name = ?";

// El valor que usamos para identificar qué producto eliminar
const values = ["Wireless Desk Charging"];

// Ejecutamos la consulta de eliminación
connection.query(sql, values, (err, results) => {
  if (err) throw err; // Si hay error, lo lanzamos
  console.log("Producto eliminado:", results); // Mostramos cuántas filas se eliminaron
  connection.end(); // Cerramos la conexión cuando terminamos
});
