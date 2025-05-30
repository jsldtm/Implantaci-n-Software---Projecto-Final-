// 7_node_delete_example.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3310,
  user: 'root',
  password: 'reciprocityismycurrency',
  database: 'finditall'
});

connection.connect();

const sql = "DELETE FROM products WHERE name = ?";
const values = ["Wireless Desk Charging"];

connection.query(sql, values, (err, results) => {
  if (err) throw err;
  console.log("Producto eliminado:", results);
  connection.end();
});
