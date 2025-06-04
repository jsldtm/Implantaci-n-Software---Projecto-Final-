// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Ejemplo básico de conexión y consulta a MySQL desde Node.js
// Este archivo NO está conectado al resto del sistema - es solo para aprender

// Importamos las librerías necesarias
const mysql = require('mysql2'); // Cliente MySQL para Node.js
const dotenv = require('dotenv'); // Para manejar variables de entorno
dotenv.config(); // Cargamos las variables del archivo .env

// Creamos una conexión básica a MySQL (sin pool)
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST, // Servidor de base de datos
  port: process.env.MYSQL_PORT, // Puerto (típicamente 3306)
  user: process.env.MYSQL_USER, // Usuario de MySQL
  password: process.env.MYSQL_PASSWORD, // Contraseña
  database: process.env.MYSQL_DATABASE, // Base de datos a usar
});

// Intentamos conectar a la base de datos
connection.connect((err) => {
  if (err) {
    // Si hay error, lo mostramos y terminamos
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL!');

  // Ejemplo: obtener todas las categorías de la base de datos
  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
    } else {
      console.log('Categorías encontradas:', results);
    }    // IMPORTANTE: Siempre cerrar la conexión al terminar
    connection.end();
  });
});
