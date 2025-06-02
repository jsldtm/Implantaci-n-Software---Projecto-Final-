// 7_node_delete_example.js
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

const sql = "DELETE FROM products WHERE name = ?";
const values = ["Wireless Desk Charging"];

connection.query(sql, values, (err, results) => {
  if (err) throw err;
  console.log("Producto eliminado:", results);
  connection.end();
});
