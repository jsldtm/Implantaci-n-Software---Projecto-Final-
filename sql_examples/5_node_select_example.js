// 5_node_select_example.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3310,
  user: 'root',
  password: 'reciprocityismycurrency',
  database: 'finditall'
});

connection.connect();

connection.query("SELECT * FROM products", (err, results) => {
  if (err) throw err;
  console.log("Productos:", results);
  connection.end();
});
