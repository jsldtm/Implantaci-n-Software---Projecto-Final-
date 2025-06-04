// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Ejemplo básico de cómo consultar datos usando Node.js y MySQL

// Importamos las librerías necesarias
const mysql = require('mysql2'); // Cliente MySQL para Node.js
const dotenv = require('dotenv'); // Para manejar variables de entorno
dotenv.config(); // Cargamos las variables del archivo .env

// Creamos la conexión usando las credenciales del archivo .env
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Conectamos a la base de datos
connection.connect();

// Ejecutamos una consulta SELECT para obtener todos los productos
// SELECT * significa "seleccionar todas las columnas"
connection.query("SELECT * FROM products", (err, results) => {
  if (err) throw err; // Si hay error, lo lanzamos
  console.log("Productos:", results); // Mostramos todos los productos encontrados
  connection.end(); // Cerramos la conexión cuando terminamos
});
