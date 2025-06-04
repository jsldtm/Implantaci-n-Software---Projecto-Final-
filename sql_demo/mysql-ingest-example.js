// Código por Joaquín Saldarriaga
// Fecha - 3 de mayo de 2025
// Ejemplo básico de inserción (ingestión) de datos en MySQL desde Node.js
// Este archivo NO está conectado al resto del sistema - es solo para aprender

// Importamos las librerías necesarias
const mysql = require('mysql2'); // Cliente MySQL
const dotenv = require('dotenv'); // Para variables de entorno
dotenv.config(); // Cargamos las variables del .env

// Creamos una conexión simple a MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Conectamos a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL!');

  // Definimos los datos de una nueva categoría que queremos insertar
  const nuevaCategoria = { name: 'Ejemplo Nueva Categoría', image: '/images/example.png' };
  
  // Ejecutamos una consulta INSERT para agregar la nueva categoría
  // Los ? son placeholders que se reemplazan por los valores del array
  connection.query('INSERT INTO categories (name, image) VALUES (?, ?)', [nuevaCategoria.name, nuevaCategoria.image], (err, result) => {
    if (err) {
      console.error('Error al insertar:', err);
    } else {
      // result.insertId nos da el ID que MySQL asignó al nuevo registro
      console.log('Categoría insertada con ID:', result.insertId);
    }
    connection.end(); // Cerramos la conexión
  });
});
