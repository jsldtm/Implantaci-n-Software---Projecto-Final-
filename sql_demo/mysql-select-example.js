// Ejemplo de consulta de datos en MySQL desde Node.js
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

  // Consultar todas las categorías
  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Error al consultar:', err);
    } else {
      console.log('Categorías:', results);
    }
    connection.end();
  });
});
