// Simple script to test database connection
// Run with: node test-db-connection.js

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "Shoes_app",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  ssl: process.env.DB_HOST && process.env.DB_HOST !== "localhost" 
    ? { rejectUnauthorized: false } 
    : false,
  connectionTimeoutMillis: 10000,
});

console.log('Testing database connection...');
console.log('Host:', process.env.DB_HOST || 'localhost');
console.log('Database:', process.env.DB_NAME || 'Shoes_app');
console.log('User:', process.env.DB_USER || 'postgres');
console.log('');

pool.query('SELECT NOW() as time, COUNT(*) as product_count FROM produit')
  .then((result) => {
    console.log('✅ Connection successful!');
    console.log('Current time:', result.rows[0].time);
    console.log('Products in database:', result.rows[0].product_count);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection failed!');
    console.error('Error:', err.message);
    console.error('');
    console.error('Please check:');
    console.error('1. Your .env.local file exists and has correct values');
    console.error('2. Your Hostinger database credentials are correct');
    console.error('3. Your database is accessible from your IP');
    process.exit(1);
  })
  .finally(() => {
    pool.end();
  });

