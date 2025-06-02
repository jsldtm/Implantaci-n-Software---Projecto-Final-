// 4_node_insert_example.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
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
