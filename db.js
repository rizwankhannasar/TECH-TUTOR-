const mysql = require('mysql2');

// Load .env first (server.js also loads it; this ensures config works when required directly)
require('dotenv').config();

const port = parseInt(process.env.DB_PORT, 10) || 3306;

const db = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'webproject',
  port: port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err.message);
    console.error('   Check: host=' + (process.env.DB_HOST || '127.0.0.1') + ', port=' + port + ', database=' + (process.env.DB_NAME || 'webproject'));
  } else {
    console.log('✅ MySQL Connected to', process.env.DB_NAME || 'webproject', 'on port', port);
    connection.release();
  }
});

module.exports = db;
