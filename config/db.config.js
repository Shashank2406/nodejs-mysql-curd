'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection('mysql://be479c845b62e4:a4da7bcd@us-cdbr-east-03.cleardb.com/heroku_ea1a446f1252599?reconnect=true');

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
  var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(255), email VARCHAR(100), phone VARCHAR(255))";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
module.exports = dbConn;