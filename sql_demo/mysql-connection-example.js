// Ejemplo de conexión y consulta a MySQL desde Node.js
// Este archivo NO está conectado al resto del sistema

const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL!');

  // Ejemplo: obtener todas las categorías
  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
    } else {
      console.log('Categorías encontradas:', results);
    }
    connection.end();
  });
});
