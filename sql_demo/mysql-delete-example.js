// Ejemplo de eliminación de datos en MySQL desde Node.js
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

  // Eliminar una categoría por ID
  const categoriaId = 1; // Cambia este valor según tu base de datos
  connection.query('DELETE FROM categories WHERE id = ?', [categoriaId], (err, result) => {
    if (err) {
      console.error('Error al eliminar:', err);
    } else {
      console.log('Filas eliminadas:', result.affectedRows);
    }
    connection.end();
  });
});
