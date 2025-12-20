# Quick Start - Hostinger MySQL Setup

## 🚀 5-Minute Setup

### Step 1: Get Credentials from Hostinger
1. Login to Hostinger hPanel
2. Go to **Databases** → **MySQL**
3. Click on your database
4. Copy these 5 values:
   - Host (usually `localhost` or `mysql.hostinger.com`)
   - Port (**3306** - NOT 5432!)
   - Database Name
   - Username
   - Password

### Step 2: Create `.env.local` File
Create file: `C:\developpement\shoes_app\.env.local`

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your-database-name
DB_USER=your-username
DB_PASSWORD=your-password
```

**⚠️ IMPORTANT:** Port must be **3306** (MySQL), NOT 5432 (PostgreSQL)

### Step 3: Install MySQL Package
```powershell
npm install
```

This installs `mysql2` (replaces `pg`)

### Step 4: Set Up Database
1. In Hostinger, click **phpMyAdmin**
2. Select your database
3. Click **SQL** tab
4. Copy entire `hostinger-mysql-setup.sql` file
5. Paste and click **Go**

### Step 5: Test Connection
```powershell
npm run dev
```

Look for:
- ✅ Database connected successfully
- ✅ Database connection test successful

### Step 6: Check Website
Visit: http://localhost:3000/shop

Products should appear!

---

## ❌ Troubleshooting

**No connection?**
- Check `.env.local` file exists and has correct values
- **Verify port is 3306** (NOT 5432)
- Restart server after creating `.env.local`
- Verify credentials in Hostinger

**No products?**
- Run SQL in phpMyAdmin again
- Check `SELECT * FROM produit;` returns products
- Check browser console (F12) for errors

**For detailed instructions:** See `MYSQL_SETUP_GUIDE.md`

---

## 🔄 Key Differences from PostgreSQL

| Item | PostgreSQL | MySQL |
|------|------------|-------|
| Port | 5432 | **3306** |
| Admin Tool | phpPgAdmin | **phpMyAdmin** |
| Package | `pg` | **`mysql2`** |

