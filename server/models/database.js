const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_BASE
  });

module.exports = connection;