// Simple script to test MySQL database connection
// Run with: node test-mysql-connection.js

require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  database: process.env.DB_NAME || "Shoes_app",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  ssl: process.env.DB_HOST && process.env.DB_HOST !== "localhost" 
    ? { rejectUnauthorized: false } 
    : undefined,
});

console.log('Testing MySQL database connection...');
console.log('Host:', process.env.DB_HOST || 'localhost');
console.log('Port:', process.env.DB_PORT || '3306');
console.log('Database:', process.env.DB_NAME || 'Shoes_app');
console.log('User:', process.env.DB_USER || 'root');
console.log('');

pool.query('SELECT NOW() as time, COUNT(*) as product_count FROM produit')
  .then(([rows]) => {
    const result = rows[0];
    console.log('✅ Connection successful!');
    console.log('Current time:', result.time);
    console.log('Products in database:', result.product_count);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection failed!');
    console.error('Error:', err.message);
    console.error('');
    console.error('Please check:');
    console.error('1. Your .env.local file exists and has correct values');
    console.error('2. Your Hostinger MySQL database credentials are correct');
    console.error('3. Your database is accessible from your IP');
    console.error('4. MySQL port is 3306 (not 5432 which is PostgreSQL)');
    process.exit(1);
  })
  .finally(() => {
    pool.end();
  });

