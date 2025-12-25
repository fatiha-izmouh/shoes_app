const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

async function checkSchema() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "3306"),
        database: process.env.DB_NAME || "Shoes_app",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
    });

    try {
        const [rows] = await pool.query("DESCRIBE produit");
        console.log('Produit table columns:');
        rows.forEach(row => {
            console.log(`- ${row.Field}: ${row.Type}`);
        });
    } catch (error) {
        console.error('Failed to check schema:', error);
    } finally {
        await pool.end();
    }
}

checkSchema();
