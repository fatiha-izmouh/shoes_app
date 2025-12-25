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
        const sqlPath = path.join(__dirname, 'add-more-image-columns.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Split SQL into separate statements
        // We need to handle comments and multiple statements
        const statements = sql
            .replace(/--.*$/gm, '') // Remove comments
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        console.log('Running migration...');
        for (const statement of statements) {
            console.log(`Executing: ${statement}`);
            try {
                await pool.query(statement);
                console.log('Success.');
            } catch (err) {
                if (err.code === 'ER_DUP_FIELDNAME') {
                    console.log('Column already exists. Skipping...');
                } else {
                    console.error(`Failed executing statement: ${statement}`);
                    console.error(err);
                }
            }
        }
        console.log('Migration process finished.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await pool.end();
    }
}

runMigration();
