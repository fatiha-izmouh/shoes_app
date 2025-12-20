# Quick Start - Hostinger Database Setup

## 🚀 5-Minute Setup

### Step 1: Get Credentials from Hostinger
1. Login to Hostinger hPanel
2. Go to **Databases** → **PostgreSQL**
3. Click on your database
4. Copy these 5 values:
   - Host (e.g., `postgres.hostinger.com`)
   - Port (usually `5432`)
   - Database Name
   - Username
   - Password

### Step 2: Create `.env.local` File
Create file: `C:\developpement\shoes_app\.env.local`

```env
DB_HOST=your-host-here
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-username
DB_PASSWORD=your-password
```

Replace with your actual values (no spaces around `=`)

### Step 3: Set Up Database
1. In Hostinger, click **phpPgAdmin**
2. Select your database
3. Click **SQL** tab
4. Copy entire `hostinger-database-setup.sql` file
5. Paste and click **Execute**

### Step 4: Test Connection
```powershell
npm run dev
```

Look for:
- ✅ Database connected successfully
- ✅ Database connection test successful

### Step 5: Check Website
Visit: http://localhost:3000/shop

Products should appear!

---

## ❌ Troubleshooting

**No connection?**
- Check `.env.local` file exists and has correct values
- Restart server after creating `.env.local`
- Verify credentials in Hostinger

**No products?**
- Run SQL in phpPgAdmin again
- Check `SELECT * FROM produit;` returns products
- Check browser console (F12) for errors

**For detailed instructions:** See `DETAILED_SETUP_GUIDE.md`

