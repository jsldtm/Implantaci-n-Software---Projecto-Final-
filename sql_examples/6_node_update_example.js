// 6_node_update_example.js
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

const sql = "UPDATE products SET price = ? WHERE name = ?";
const values = [199.99, "Cable USB-B"];

connection.query(sql, values, (err, results) => {
  if (err) throw err;
  console.log("Producto actualizado:", results);
  connection.end();
});
