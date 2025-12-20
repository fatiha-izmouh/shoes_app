import mysql from "mysql2/promise"

// Create a connection pool for MySQL (Hostinger)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  database: process.env.DB_NAME || "Shoes_app",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  // SSL configuration for Hostinger (required for remote connections)
  ssl: process.env.DB_HOST && process.env.DB_HOST !== "localhost" 
    ? { rejectUnauthorized: false } 
    : undefined,
  // Connection pool settings
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

// Test connection on startup
pool.query("SELECT NOW() as time")
  .then(([rows]: any) => {
    console.log("✅ Database connection test successful")
    console.log("✅ Database connected successfully")
  })
  .catch((err: any) => {
    console.error("❌ Database connection test failed:", err.message)
    console.error("Please check your environment variables:")
    console.error("- DB_HOST:", process.env.DB_HOST || "not set")
    console.error("- DB_PORT:", process.env.DB_PORT || "not set")
    console.error("- DB_NAME:", process.env.DB_NAME || "not set")
    console.error("- DB_USER:", process.env.DB_USER || "not set")
    console.error("- DB_PASSWORD:", process.env.DB_PASSWORD ? "***" : "not set")
  })

export default pool

