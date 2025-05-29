// Ejemplo de inserción (ingestión) de datos en MySQL desde Node.js
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
