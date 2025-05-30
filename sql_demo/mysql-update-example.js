// Ejemplo de actualización de datos en MySQL desde Node.js
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

  // Actualizar el nombre de una categoría por ID
  const categoriaId = 1; // Cambia este valor según tu base de datos
  const nuevoNombre = 'Nombre Actualizado';
  connection.query('UPDATE categories SET name = ? WHERE id = ?', [nuevoNombre, categoriaId], (err, result) => {
    if (err) {
      console.error('Error al actualizar:', err);
    } else {
      console.log('Filas afectadas:', result.affectedRows);
    }
    connection.end();
  });
});
