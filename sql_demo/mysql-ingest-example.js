// Ejemplo de inserción (ingestión) de datos en MySQL desde Node.js
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

  // Ejemplo: insertar una nueva categoría
  const nuevaCategoria = { name: 'Ejemplo Nueva Categoría', image: '/images/example.png' };
  connection.query('INSERT INTO categories (name, image) VALUES (?, ?)', [nuevaCategoria.name, nuevaCategoria.image], (err, result) => {
    if (err) {
      console.error('Error al insertar:', err);
    } else {
      console.log('Categoría insertada con ID:', result.insertId);
    }
    connection.end();
  });
});
