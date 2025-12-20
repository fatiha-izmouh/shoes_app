# Hostinger Database Setup Guide

> 🗄️ **This app now uses MySQL!**  
> 📖 **For detailed MySQL setup instructions, see [MYSQL_SETUP_GUIDE.md](./MYSQL_SETUP_GUIDE.md)**  
> ⚡ **For a quick MySQL setup, see [MYSQL_QUICK_START.md](./MYSQL_QUICK_START.md)**  
> 
> ⚠️ **Note:** This guide is for PostgreSQL (old). If you're using MySQL (recommended for Hostinger VPS), use the MySQL guides above.

## Quick Setup Steps

### 1. Get Your Database Credentials from Hostinger

1. Log into your Hostinger control panel
2. Go to **Databases** → **PostgreSQL**
3. Find your database and click on it
4. You'll see:
   - **Host** (e.g., `postgres.hostinger.com` or an IP address)
   - **Port** (usually `5432`)
   - **Database Name** (the name you created)
   - **Username** (your database user)
   - **Password** (your database password)

### 2. Create Environment File

Create a file named `.env.local` in the root of your project (same folder as `package.json`):

```env
DB_HOST=your-hostinger-db-host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

**Important:** Replace all the values above with your actual Hostinger database credentials.

### 3. Create the Database Tables and Insert Sample Products

**Easiest way - Use the provided SQL file:**

1. Go to Hostinger control panel → Databases → PostgreSQL
2. Click on **phpPgAdmin**
3. Select your database
4. Go to **SQL** tab
5. Copy and paste the entire contents of `hostinger-database-setup.sql` file
6. Click **Execute** or **Go**

This will:
- Create the `produit` table
- Insert 3 sample products
- Show you how many products are in the database

**Alternative - Manual setup:**

If you prefer to do it manually, you can copy the SQL from `hostinger-database-setup.sql` file and run it step by step.

### 5. Test the Connection

1. Make sure your `.env.local` file is created with correct credentials
2. Restart your Next.js server:
   ```bash
   npm run dev
   ```
3. Check the console - you should see:
   - ✅ Database connected successfully
   - ✅ Database connection test successful

4. Visit your shop page - products should now appear!

## Troubleshooting

### No products showing up?

1. **Check environment variables:**
   - Make sure `.env.local` exists in the root folder
   - Verify all values are correct (no extra spaces)
   - Restart your server after changing `.env.local`

2. **Check database connection:**
   - Look at the console logs when starting the server
   - If you see connection errors, double-check your credentials

3. **Check if products exist:**
   - Go to phpPgAdmin
   - Run: `SELECT * FROM produit;`
   - If no rows, insert some products using the SQL above

4. **Check table exists:**
   - In phpPgAdmin, verify the `produit` table exists
   - If not, create it using the SQL in step 3

### Connection timeout errors?

- The connection timeout is set to 10 seconds
- If still timing out, check your Hostinger database is accessible
- Verify your IP is whitelisted in Hostinger (if required)

### SSL errors?

- SSL is automatically enabled for remote connections (non-localhost)
- If you get SSL errors, contact Hostinger support

## Important Notes

- **Never commit `.env.local` to git** - it contains sensitive credentials
- The `.env.local` file is already in `.gitignore`
- For production on Hostinger, set these same environment variables in your hosting control panel

