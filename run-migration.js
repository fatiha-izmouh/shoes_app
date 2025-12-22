const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

async function runMigration() {
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

    try {
        const sqlPath = path.join(__dirname, 'add_shipping_column.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Running migration...');
        console.log(sql);

        await pool.query(sql);
        console.log('Migration completed successfully.');
    } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
            console.log('Column already exists. Skipping...');
        } else {
            console.error('Migration failed:', error);
        }
    } finally {
        await pool.end();
    }
}

runMigration();
