// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Ejemplo básico de cómo insertar datos usando Node.js y MySQL

// Importamos las librerías necesarias
const mysql = require('mysql2'); // Cliente MySQL para Node.js
const dotenv = require('dotenv'); // Para cargar variables de entorno
dotenv.config(); // Cargamos las variables del archivo .env

// Creamos una conexión a la base de datos usando variables de entorno
// Esto es más seguro que poner las credenciales directamente en el código
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST, // Dirección del servidor MySQL
  port: process.env.MYSQL_PORT, // Puerto del servidor (típicamente 3306)
  user: process.env.MYSQL_USER, // Usuario de la base de datos
  password: process.env.MYSQL_PASSWORD, // Contraseña del usuario
  database: process.env.MYSQL_DATABASE // Nombre de la base de datos
});

// Establecemos la conexión a la base de datos
connection.connect();

// Definimos la consulta SQL para insertar un nuevo producto
// Los ? son placeholders que se reemplazan por valores seguros
const sql = "INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)";

// Definimos los valores que vamos a insertar
const values = [
  "Smartwatch Samsung Galaxy Fit 3", // Nombre del producto
  "Reloj inteligente con monitor de salud.", // Descripción
  229.99, // Precio
  "/images/smartwatch.png", // Ruta de la imagen
  "Technology" // Categoría
];

// Ejecutamos la consulta SQL con los valores
connection.query(sql, values, (err, results) => {
  if (err) throw err; // Si hay error, lo lanzamos
  console.log("Producto insertado:", results); // Mostramos el resultado
  connection.end(); // Cerramos la conexión
});
