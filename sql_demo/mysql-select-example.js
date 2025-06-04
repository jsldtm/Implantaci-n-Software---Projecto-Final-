// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Ejemplo básico de consulta de datos en MySQL desde Node.js

// Importamos las librerías necesarias
const mysql = require('mysql2'); // Cliente MySQL
const dotenv = require('dotenv'); // Para variables de entorno
dotenv.config(); // Cargamos variables del .env

// Configuramos la conexión a MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Intentamos conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL!');

  // Ejecutamos una consulta SELECT para obtener todas las categorías
  // SELECT * FROM categories = "seleccionar todas las columnas de la tabla categories"
  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Error al consultar:', err);
    } else {
      console.log('Categorías:', results); // Mostramos los resultados
    }
    connection.end(); // Cerramos la conexión
  });
});
