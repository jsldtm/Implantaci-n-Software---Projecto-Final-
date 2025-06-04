// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Ejemplo básico de cómo actualizar datos usando Node.js y MySQL

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

// Definimos la consulta UPDATE para modificar el precio de un producto
// UPDATE cambia datos existentes, SET especifica qué cambiar, WHERE especifica cuáles filas
const sql = "UPDATE products SET price = ? WHERE name = ?";

// Los valores que vamos a usar: nuevo precio y nombre del producto a buscar
const values = [199.99, "Cable USB-B"];

// Ejecutamos la consulta de actualización
connection.query(sql, values, (err, results) => {
  if (err) throw err; // Si hay error, lo lanzamos
  console.log("Producto actualizado:", results); // Mostramos el resultado de la actualización
  connection.end(); // Cerramos la conexión
});
