// 4_node_insert_example.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3310,
  user: 'root',
  password: 'reciprocityismycurrency',
  database: 'finditall'
});

connection.connect();

const sql = "INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)";
const values = [
  "Smartwatch Samsung Galaxy Fit 3",
  "Reloj inteligente con monitor de salud.",
  229.99,
  "/images/smartwatch.png",
  "Technology"
];

connection.query(sql, values, (err, results) => {
  if (err) throw err;
  console.log("Producto insertado:", results);
  connection.end();
});
