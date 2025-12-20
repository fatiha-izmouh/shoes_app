# Complete Step-by-Step Hostinger MySQL Setup Guide

This guide will walk you through every single step to connect your Next.js app to your Hostinger MySQL database.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- ✅ A Hostinger account with MySQL database created
- ✅ Access to your Hostinger control panel (hPanel)
- ✅ Your project folder open in your code editor
- ✅ Node.js and npm installed on your computer

---

## STEP 1: Get Your Database Credentials from Hostinger

### 1.1 Log into Hostinger

1. Go to **https://www.hostinger.com** (or your Hostinger login page)
2. Click **"Log In"** in the top right corner
3. Enter your email and password
4. Click **"Log In"** button

### 1.2 Navigate to Databases

1. After logging in, you'll see the **hPanel** (Hostinger Control Panel)
2. Look for a section called **"Databases"** or **"Database Management"**
3. Click on **"MySQL Databases"** or **"MySQL"**
   - *Note: MySQL is usually available on all Hostinger plans*

### 1.3 Find Your Database

1. You'll see a list of your MySQL databases
2. Find the database you want to use (or create a new one if needed)
3. Click on the database name or the **"Manage"** button next to it

### 1.4 Get Your Connection Details

You should now see a page with your database information. Look for these fields and **write them down** or keep this page open:

- **Host / Server:** 
  - Usually looks like: `localhost` or `mysql.hostinger.com` or an IP address
  - **Example:** `localhost` or `mysql.hostinger.com` or `185.xxx.xxx.xxx`
  - ⚠️ **IMPORTANT:** Copy this EXACTLY as shown

- **Port:**
  - Usually `3306` (this is the default MySQL port)
  - **Example:** `3306`
  - ⚠️ **NOTE:** MySQL uses port 3306, NOT 5432 (which is PostgreSQL)

- **Database Name:**
  - The name of your database (you created this when setting up the database)
  - **Example:** `u123456789_shoes` or `shoes_app` or `mydb`
  - ⚠️ **IMPORTANT:** Copy this EXACTLY as shown (case-sensitive)

- **Username:**
  - Your database username
  - **Example:** `u123456789_user` or `root` or `dbuser`
  - ⚠️ **IMPORTANT:** Copy this EXACTLY as shown (case-sensitive)

- **Password:**
  - Your database password
  - **Example:** `MySecurePassword123!`
  - ⚠️ **IMPORTANT:** Copy this EXACTLY as shown (case-sensitive)
  - 💡 **Tip:** If you forgot your password, look for a "Reset Password" or "Change Password" button

### 1.5 Verify You Have All Information

Before moving to the next step, make sure you have:
- ✅ Host address
- ✅ Port number (should be 3306 for MySQL)
- ✅ Database name
- ✅ Username
- ✅ Password

---

## STEP 2: Create the Environment File (.env.local)

### 2.1 Open Your Project Folder

1. Open your code editor (VS Code, Cursor, etc.)
2. Make sure you're in the root folder of your project
   - The root folder should contain:
     - `package.json`
     - `next.config.ts`
     - `app` folder
     - `lib` folder
     - etc.

### 2.2 Create the .env.local File

**Option A: Using Your Code Editor**

1. In your code editor, right-click in the file explorer (left sidebar)
2. Select **"New File"** or **"Create File"**
3. Type exactly: `.env.local` (including the dot at the beginning)
4. Press Enter

**Option B: Using File Explorer (Windows)**

1. Open File Explorer
2. Navigate to your project folder: `C:\developpement\shoes_app`
3. Right-click in an empty area
4. Select **"New"** → **"Text Document"**
5. Rename it to `.env.local` (including the dot)
   - ⚠️ **IMPORTANT:** Windows might warn you about changing the file extension - click **"Yes"**

**Option C: Using Command Line**

1. Open PowerShell or Command Prompt
2. Navigate to your project:
   ```powershell
   cd C:\developpement\shoes_app
   ```
3. Create the file:
   ```powershell
   New-Item -Path .env.local -ItemType File
   ```

### 2.3 Add Your Database Credentials

1. Open the `.env.local` file you just created
2. Copy and paste this template:

```env
DB_HOST=your-hostinger-db-host
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

3. Replace each value with your actual Hostinger credentials:

**Example:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=u123456789_shoes
DB_USER=u123456789_user
DB_PASSWORD=MySecurePassword123!
```

### 2.4 Important Rules for .env.local

- ✅ **No spaces** around the `=` sign
- ✅ **No quotes** around values (unless Hostinger gave you quotes)
- ✅ **One variable per line**
- ✅ **Port must be 3306** for MySQL (NOT 5432 which is PostgreSQL)
- ✅ **Save the file** after editing

### 2.5 Verify the File Location

The `.env.local` file should be in the same folder as:
- `package.json`
- `next.config.ts`
- `app` folder

**Correct location:**
```
C:\developpement\shoes_app\
  ├── .env.local          ← HERE
  ├── package.json
  ├── next.config.ts
  ├── app\
  ├── lib\
  └── ...
```

---

## STEP 3: Install MySQL Dependencies

### 3.1 Open Terminal

1. Open PowerShell or Command Prompt
2. Navigate to your project folder:
   ```powershell
   cd C:\developpement\shoes_app
   ```

### 3.2 Install MySQL Package

Run this command:
```powershell
npm install
```

This will install `mysql2` package (which replaces the old `pg` package).

You should see:
```
added XXX packages
```

---

## STEP 4: Set Up the Database Table

### 4.1 Open phpMyAdmin in Hostinger

1. Go back to your Hostinger hPanel
2. Navigate to **Databases** → **MySQL**
3. Find your database in the list
4. Look for a button or link that says:
   - **"phpMyAdmin"**
   - **"Manage"**
   - **"Open phpMyAdmin"**
   - Or an icon that looks like a database
5. Click on it
   - This will open phpMyAdmin in a new tab or window

### 4.2 Log into phpMyAdmin

1. You might need to log in again:
   - **Username:** Your database username (from Step 1.4)
   - **Password:** Your database password (from Step 1.4)
2. Click **"Go"** or **"Login"**

### 4.3 Navigate to Your Database

1. In the left sidebar, you'll see a list of databases
2. Click on your database name
3. You should see the database structure

### 4.4 Open the SQL Query Window

1. Look at the top menu bar in phpMyAdmin
2. Click on the **"SQL"** tab
   - It's usually at the top of the page
3. You should see a large text area where you can type SQL commands

### 4.5 Copy the MySQL Setup Script

1. Open the file `hostinger-mysql-setup.sql` in your project
   - Location: `C:\developpement\shoes_app\hostinger-mysql-setup.sql`
2. Select all the text (Ctrl+A)
3. Copy it (Ctrl+C)

The SQL should look like this:
```sql
-- MySQL database setup for Hostinger
-- Run this in Hostinger phpMyAdmin SQL tab

-- Create the produit table if it doesn't exist
CREATE TABLE IF NOT EXISTS produit (
  id_produit INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  prix DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500),
  image2 VARCHAR(500),
  image3 VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample products
INSERT INTO produit (nom, description, prix, image, image2, image3) VALUES
('Medieval Fantasy Leather Boot', 
 '{"colors": [{"name": "Dark Brown", "hex": "#4a2511"}], "sizes": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12], "category": "Leather Footwear", "rating": 4.9, "reviewCount": 87}',
 180.00,
 '/images/products/prd1.png',
 '/images/products/prd2.png',
 '/images/products/prd3.png'),
('Wrapped Leather Knee Boot',
 '{"colors": [{"name": "Rich Brown", "hex": "#654321"}], "sizes": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11], "category": "Leather Footwear", "rating": 4.8, "reviewCount": 64}',
 220.00,
 '/images/products/prd2.png',
 '/images/products/prd3.png',
 '/images/products/prd4.png'),
('Traditional Leather Moccasin',
 '{"colors": [{"name": "Natural Tan", "hex": "#d2b48c"}], "sizes": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12], "category": "Leather Footwear", "rating": 4.7, "reviewCount": 52}',
 145.00,
 '/images/products/prd3.png',
 '/images/products/prd4.png',
 '/images/products/prd5.png');

-- Verify products were inserted
SELECT COUNT(*) as total_products FROM produit;
```

### 4.6 Paste and Execute the SQL

1. Click inside the SQL text area in phpMyAdmin
2. Paste the SQL (Ctrl+V)
3. Look for a button that says:
   - **"Go"**
   - **"Execute"**
   - **"Run"**
   - **"▶"** (play button)
4. Click that button

### 4.7 Verify the Results

After clicking Go, you should see:

1. **Success messages** like:
   - "Your SQL query has been executed successfully"
   - "3 rows affected" (means 3 products were inserted)

2. **A result table** showing:
   - `total_products: 3` (or the number of products inserted)

3. **If you see errors:**
   - Read the error message carefully
   - Common issues:
     - Table already exists → That's OK, the `IF NOT EXISTS` handles this
     - Syntax error → Make sure you copied the entire SQL correctly
     - Permission error → Contact Hostinger support

### 4.8 Verify the Table Was Created

1. In phpMyAdmin, look at the left sidebar
2. Click on your database name
3. You should see a table named **"produit"** in the list
4. Click on **"produit"** to see its structure

### 4.9 Verify Products Were Inserted

1. Still in phpMyAdmin, click on the **"SQL"** tab again
2. Type this query:
   ```sql
   SELECT * FROM produit;
   ```
3. Click **"Go"**
4. You should see a table with 3 products showing:
   - `id_produit` (1, 2, 3)
   - `nom` (product names)
   - `prix` (prices)
   - `image`, `image2`, `image3` (image paths)

If you see the products, **great!** The database is set up correctly.

---

## STEP 5: Test the Connection from Your Computer

### 5.1 Open Terminal/Command Prompt

1. Open PowerShell (Windows) or Terminal
2. Navigate to your project folder:
   ```powershell
   cd C:\developpement\shoes_app
   ```

### 5.2 Test the Database Connection (Optional but Recommended)

1. Make sure you have the `dotenv` package (it should be in devDependencies)
2. Run the test script:
   ```powershell
   node test-mysql-connection.js
   ```

**Expected Success Output:**
```
Testing MySQL database connection...
Host: localhost
Port: 3306
Database: u123456789_shoes
User: u123456789_user

✅ Connection successful!
Current time: 2024-01-15 10:30:45
Products in database: 3
```

**If you see errors:**
- Check your `.env.local` file
- Verify your credentials are correct
- Make sure port is 3306 (NOT 5432)
- Make sure there are no extra spaces

### 5.3 Start Your Next.js Development Server

1. In the terminal, make sure you're in the project folder
2. Start the server:
   ```powershell
   npm run dev
   ```

3. Wait for it to start. You should see:
   ```
   ▲ Next.js 16.0.10
   - Local:        http://localhost:3000
   ```

### 5.4 Check the Console for Database Connection Messages

Look at the terminal output. You should see:

**✅ Success Messages:**
```
✅ Database connection test successful
✅ Database connected successfully
```

**❌ Error Messages (if something is wrong):**
```
❌ Database connection test failed: [error message]
Please check your environment variables:
- DB_HOST: localhost
- DB_PORT: 3306
- DB_NAME: u123456789_shoes
- DB_USER: u123456789_user
- DB_PASSWORD: ***
```

### 5.5 If You See Errors

1. **Double-check your `.env.local` file:**
   - Open it in your editor
   - Verify all values are correct
   - **Make sure port is 3306** (NOT 5432)
   - Make sure there are no extra spaces
   - Make sure there are no quotes (unless needed)

2. **Common mistakes:**
   - ❌ `DB_PORT=5432` (PostgreSQL port)
   - ✅ `DB_PORT=3306` (MySQL port)

   - ❌ `DB_HOST = localhost` (spaces around =)
   - ✅ `DB_HOST=localhost` (no spaces)

   - ❌ `DB_PASSWORD="MyPassword"` (quotes not needed)
   - ✅ `DB_PASSWORD=MyPassword` (no quotes)

3. **After fixing, restart the server:**
   - Press `Ctrl+C` to stop the server
   - Run `npm run dev` again

---

## STEP 6: Verify Products Appear on Your Website

### 6.1 Open Your Website

1. Open your web browser
2. Go to: **http://localhost:3000**
3. You should see your website homepage

### 6.2 Navigate to the Shop Page

1. Look for a navigation menu
2. Click on **"Shop"** or **"Products"** link
   - Or go directly to: **http://localhost:3000/shop**

### 6.3 Check if Products Are Displayed

You should see:
- ✅ Product cards/images
- ✅ Product names (e.g., "Medieval Fantasy Leather Boot")
- ✅ Product prices (e.g., "$180.00")
- ✅ Multiple products listed

**If you see products:** 🎉 **SUCCESS!** Your database connection is working!

**If you DON'T see products:**
- Continue to the Troubleshooting section below

### 6.4 Test a Product Detail Page

1. Click on one of the products
2. You should see:
   - Product images
   - Product name
   - Product description
   - Price
   - Size options
   - Color options
   - Add to cart button

---

## 🔧 Troubleshooting Guide

### Problem: "Database connection test failed"

**Possible Causes & Solutions:**

1. **Wrong port number**
   - ❌ Using port 5432 (PostgreSQL)
   - ✅ Use port 3306 (MySQL)
   - Check your `.env.local`: `DB_PORT=3306`

2. **Wrong credentials in `.env.local`**
   - ✅ Double-check each value
   - ✅ Make sure you copied them exactly from Hostinger
   - ✅ Check for typos

3. **`.env.local` file not in the right location**
   - ✅ Should be in: `C:\developpement\shoes_app\.env.local`
   - ✅ Same folder as `package.json`

4. **Server not restarted after creating `.env.local`**
   - ✅ Stop the server (Ctrl+C)
   - ✅ Start it again (`npm run dev`)

5. **Database not accessible from your IP**
   - ✅ Some Hostinger databases only allow connections from specific IPs
   - ✅ Check Hostinger settings for IP whitelist
   - ✅ Contact Hostinger support if needed

### Problem: "No products showing on the website"

**Possible Causes & Solutions:**

1. **Products not inserted in database**
   - ✅ Go to phpMyAdmin
   - ✅ Run: `SELECT * FROM produit;`
   - ✅ If empty, run the SQL from Step 4 again

2. **Table doesn't exist**
   - ✅ Go to phpMyAdmin
   - ✅ Check if `produit` table exists
   - ✅ If not, run the SQL from Step 4

3. **Connection working but query failing**
   - ✅ Check the browser console (F12)
   - ✅ Look for error messages
   - ✅ Check the terminal where `npm run dev` is running

4. **API route not working**
   - ✅ Visit: http://localhost:3000/api/products
   - ✅ You should see JSON data with products
   - ✅ If you see an error, check the terminal logs

### Problem: "SSL connection error"

**Solution:**
- ✅ SSL is automatically enabled in the code for remote connections
- ✅ If you still get SSL errors, the connection should still work
- ✅ Contact Hostinger support if the problem persists

### Problem: "Connection timeout"

**Possible Causes & Solutions:**

1. **Slow internet connection**
   - ✅ Wait a bit longer
   - ✅ Check your internet connection

2. **Database server is down**
   - ✅ Check Hostinger status page
   - ✅ Contact Hostinger support

3. **Firewall blocking connection**
   - ✅ Check if your firewall is blocking MySQL connections (port 3306)
   - ✅ Temporarily disable firewall to test

### Problem: "Access denied for user"

**Possible Causes & Solutions:**

1. **Wrong username or password**
   - ✅ Double-check credentials in `.env.local`
   - ✅ Try resetting password in Hostinger

2. **User doesn't have permissions**
   - ✅ Check user permissions in Hostinger
   - ✅ Contact Hostinger support

---

## ✅ Final Checklist

Before considering the setup complete, verify:

- [ ] `.env.local` file exists in the project root
- [ ] All database credentials are correct in `.env.local`
- [ ] **Port is 3306** (NOT 5432)
- [ ] `produit` table exists in Hostinger database
- [ ] At least 3 products are in the `produit` table
- [ ] `npm run dev` shows "✅ Database connected successfully"
- [ ] `npm run dev` shows "✅ Database connection test successful"
- [ ] Website at http://localhost:3000/shop shows products
- [ ] Clicking on a product shows the product detail page

---

## 📞 Need More Help?

If you're still having issues:

1. **Check the console logs:**
   - Terminal where `npm run dev` is running
   - Browser console (F12 → Console tab)

2. **Verify each step:**
   - Go back through each step
   - Make sure you didn't skip anything

3. **Contact Hostinger Support:**
   - They can help with database access issues
   - They can verify your database credentials

4. **Check the code:**
   - The database connection code is in: `lib/db.ts`
   - The API route is in: `app/api/products/route.ts`

---

## 🎉 Success!

If you've completed all steps and products are showing on your website, congratulations! Your MySQL database connection is working correctly.

**Next Steps:**
- Add more products through phpMyAdmin
- Customize product images
- Deploy to production (remember to set environment variables on your hosting)

---

## 🔄 Key Differences: MySQL vs PostgreSQL

If you're switching from PostgreSQL, remember:

| Feature | PostgreSQL | MySQL |
|---------|------------|-------|
| Port | 5432 | **3306** |
| Placeholders | `$1, $2` | **`?`** |
| Results | `result.rows` | **`result[0]`** |
| Auto Increment | `SERIAL` | **`AUTO_INCREMENT`** |
| Returning ID | `RETURNING id` | **`LAST_INSERT_ID()`** |
| Admin Tool | phpPgAdmin | **phpMyAdmin** |

---

**Last Updated:** This guide is for MySQL setup. If you need PostgreSQL, see the PostgreSQL guides.

