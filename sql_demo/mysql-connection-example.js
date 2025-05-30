// Ejemplo de conexión y consulta a MySQL desde Node.js
// Este archivo NO está conectado al resto del sistema

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3310,
  user: 'root',
  password: 'reciprocityismycurrency',
  database: 'finditall',
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
