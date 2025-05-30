// 6_node_update_example.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3310,
  user: 'root',
  password: 'reciprocityismycurrency',
  database: 'finditall'
});

connection.connect();

const sql = "UPDATE products SET price = ? WHERE name = ?";
const values = [199.99, "Cable USB-B"];

connection.query(sql, values, (err, results) => {
  if (err) throw err;
  console.log("Producto actualizado:", results);
  connection.end();
});
