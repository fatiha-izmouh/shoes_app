# Complete Step-by-Step Hostinger Database Setup Guide

This guide will walk you through every single step to connect your Next.js app to your Hostinger PostgreSQL database.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- ✅ A Hostinger account with PostgreSQL database created
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
3. Click on **"PostgreSQL Databases"** or **"PostgreSQL"**
   - *Note: If you don't see PostgreSQL, you might need to create a PostgreSQL database first*

### 1.3 Find Your Database

1. You'll see a list of your PostgreSQL databases
2. Find the database you want to use (or create a new one if needed)
3. Click on the database name or the **"Manage"** button next to it

### 1.4 Get Your Connection Details

You should now see a page with your database information. Look for these fields and **write them down** or keep this page open:

- **Host / Server:** 
  - Usually looks like: `postgres.hostinger.com` or an IP address like `185.xxx.xxx.xxx`
  - **Example:** `postgres.hostinger.com` or `185.123.45.67`
  - ⚠️ **IMPORTANT:** Copy this EXACTLY as shown (including any subdomain)

- **Port:**
  - Usually `5432` (this is the default PostgreSQL port)
  - **Example:** `5432`

- **Database Name:**
  - The name of your database (you created this when setting up the database)
  - **Example:** `u123456789_shoes` or `shoes_app` or `mydb`
  - ⚠️ **IMPORTANT:** Copy this EXACTLY as shown (case-sensitive)

- **Username:**
  - Your database username
  - **Example:** `u123456789_user` or `postgres` or `dbuser`
  - ⚠️ **IMPORTANT:** Copy this EXACTLY as shown (case-sensitive)

- **Password:**
  - Your database password
  - **Example:** `MySecurePassword123!`
  - ⚠️ **IMPORTANT:** Copy this EXACTLY as shown (case-sensitive)
  - 💡 **Tip:** If you forgot your password, look for a "Reset Password" or "Change Password" button

### 1.5 Verify You Have All Information

Before moving to the next step, make sure you have:
- ✅ Host address
- ✅ Port number
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
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

3. Replace each value with your actual Hostinger credentials:

**Example:**
```env
DB_HOST=postgres.hostinger.com
DB_PORT=5432
DB_NAME=u123456789_shoes
DB_USER=u123456789_user
DB_PASSWORD=MySecurePassword123!
```

### 2.4 Important Rules for .env.local

- ✅ **No spaces** around the `=` sign
- ✅ **No quotes** around values (unless Hostinger gave you quotes)
- ✅ **One variable per line**
- ✅ **No empty lines** between variables (optional, but cleaner)
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

## STEP 3: Set Up the Database Table

### 3.1 Open phpPgAdmin in Hostinger

1. Go back to your Hostinger hPanel
2. Navigate to **Databases** → **PostgreSQL**
3. Find your database in the list
4. Look for a button or link that says:
   - **"phpPgAdmin"**
   - **"Manage"**
   - **"Open phpPgAdmin"**
   - Or an icon that looks like a database
5. Click on it
   - This will open phpPgAdmin in a new tab or window

### 3.2 Log into phpPgAdmin

1. You might need to log in again:
   - **Username:** Your database username (from Step 1.4)
   - **Password:** Your database password (from Step 1.4)
2. Click **"Login"** or **"Go"**

### 3.3 Navigate to Your Database

1. In the left sidebar, you'll see a tree structure
2. Expand **"Servers"** → **"PostgreSQL"** (or similar)
3. Expand your database name
4. You should see folders like:
   - **Schemas**
   - **Tables**
   - **Views**
   - etc.

### 3.4 Open the SQL Query Window

1. Look at the top menu bar in phpPgAdmin
2. Find and click on the **"SQL"** tab
   - It might be at the top or in a menu
   - It might say **"Query Tool"** or **"SQL Query"**
3. You should see a large text area where you can type SQL commands

### 3.5 Copy the SQL Setup Script

1. Open the file `hostinger-database-setup.sql` in your project
   - Location: `C:\developpement\shoes_app\hostinger-database-setup.sql`
2. Select all the text (Ctrl+A)
3. Copy it (Ctrl+C)

The SQL should look like this:
```sql
-- Simple database setup for Hostinger PostgreSQL
-- Run this in Hostinger phpPgAdmin SQL tab

-- Create the produit table if it doesn't exist
CREATE TABLE IF NOT EXISTS produit (
  id_produit SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  prix DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500),
  image2 VARCHAR(500),
  image3 VARCHAR(500)
);

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

### 3.6 Paste and Execute the SQL

1. Click inside the SQL text area in phpPgAdmin
2. Paste the SQL (Ctrl+V)
3. Look for a button that says:
   - **"Execute"**
   - **"Go"**
   - **"Run"**
   - **"▶"** (play button)
4. Click that button

### 3.7 Verify the Results

After clicking Execute, you should see:

1. **Success messages** like:
   - "Query executed successfully"
   - "CREATE TABLE"
   - "INSERT 0 3" (means 3 products were inserted)

2. **A result table** showing:
   - `total_products: 3` (or the number of products inserted)

3. **If you see errors:**
   - Read the error message carefully
   - Common issues:
     - Table already exists → That's OK, the `IF NOT EXISTS` handles this
     - Syntax error → Make sure you copied the entire SQL correctly
     - Permission error → Contact Hostinger support

### 3.8 Verify the Table Was Created

1. In phpPgAdmin, look at the left sidebar
2. Expand your database → **"Schemas"** → **"public"** → **"Tables"**
3. You should see a table named **"produit"**
4. Click on **"produit"** to see its structure

### 3.9 Verify Products Were Inserted

1. Still in phpPgAdmin, click on the **"SQL"** tab again
2. Type this query:
   ```sql
   SELECT * FROM produit;
   ```
3. Click **"Execute"** or **"Go"**
4. You should see a table with 3 products showing:
   - `id_produit` (1, 2, 3)
   - `nom` (product names)
   - `prix` (prices)
   - `image`, `image2`, `image3` (image paths)

If you see the products, **great!** The database is set up correctly.

---

## STEP 4: Test the Connection from Your Computer

### 4.1 Open Terminal/Command Prompt

1. Open PowerShell (Windows) or Terminal
2. Navigate to your project folder:
   ```powershell
   cd C:\developpement\shoes_app
   ```

### 4.2 Install Dependencies (if not done already)

Make sure all packages are installed:
```powershell
npm install
```

Wait for it to finish. You should see:
```
added XXX packages
```

### 4.3 Test the Database Connection (Optional but Recommended)

1. Make sure you have the `dotenv` package (it should be in devDependencies)
2. Run the test script:
   ```powershell
   node test-db-connection.js
   ```

**Expected Success Output:**
```
Testing database connection...
Host: postgres.hostinger.com
Database: u123456789_shoes
User: u123456789_user

✅ Connection successful!
Current time: 2024-01-15 10:30:45
Products in database: 3
```

**If you see errors:**
- Check your `.env.local` file
- Verify your credentials are correct
- Make sure there are no extra spaces

### 4.4 Start Your Next.js Development Server

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

### 4.5 Check the Console for Database Connection Messages

Look at the terminal output. You should see:

**✅ Success Messages:**
```
✅ Database connected successfully
✅ Database connection test successful
```

**❌ Error Messages (if something is wrong):**
```
❌ Database connection test failed: [error message]
Please check your environment variables:
- DB_HOST: postgres.hostinger.com
- DB_PORT: 5432
- DB_NAME: u123456789_shoes
- DB_USER: u123456789_user
- DB_PASSWORD: ***
```

### 4.6 If You See Errors

1. **Double-check your `.env.local` file:**
   - Open it in your editor
   - Verify all values are correct
   - Make sure there are no extra spaces
   - Make sure there are no quotes (unless needed)

2. **Common mistakes:**
   - ❌ `DB_HOST = postgres.hostinger.com` (spaces around =)
   - ✅ `DB_HOST=postgres.hostinger.com` (no spaces)

   - ❌ `DB_PASSWORD="MyPassword"` (quotes not needed)
   - ✅ `DB_PASSWORD=MyPassword` (no quotes)

   - ❌ Missing `.env.local` file
   - ✅ File exists in root folder

3. **After fixing, restart the server:**
   - Press `Ctrl+C` to stop the server
   - Run `npm run dev` again

---

## STEP 5: Verify Products Appear on Your Website

### 5.1 Open Your Website

1. Open your web browser
2. Go to: **http://localhost:3000**
3. You should see your website homepage

### 5.2 Navigate to the Shop Page

1. Look for a navigation menu
2. Click on **"Shop"** or **"Products"** link
   - Or go directly to: **http://localhost:3000/shop**

### 5.3 Check if Products Are Displayed

You should see:
- ✅ Product cards/images
- ✅ Product names (e.g., "Medieval Fantasy Leather Boot")
- ✅ Product prices (e.g., "$180.00")
- ✅ Multiple products listed

**If you see products:** 🎉 **SUCCESS!** Your database connection is working!

**If you DON'T see products:**
- Continue to the Troubleshooting section below

### 5.4 Test a Product Detail Page

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

1. **Wrong credentials in `.env.local`**
   - ✅ Double-check each value
   - ✅ Make sure you copied them exactly from Hostinger
   - ✅ Check for typos

2. **`.env.local` file not in the right location**
   - ✅ Should be in: `C:\developpement\shoes_app\.env.local`
   - ✅ Same folder as `package.json`

3. **Server not restarted after creating `.env.local`**
   - ✅ Stop the server (Ctrl+C)
   - ✅ Start it again (`npm run dev`)

4. **Database not accessible from your IP**
   - ✅ Some Hostinger databases only allow connections from specific IPs
   - ✅ Check Hostinger settings for IP whitelist
   - ✅ Contact Hostinger support if needed

### Problem: "No products showing on the website"

**Possible Causes & Solutions:**

1. **Products not inserted in database**
   - ✅ Go to phpPgAdmin
   - ✅ Run: `SELECT * FROM produit;`
   - ✅ If empty, run the SQL from Step 3 again

2. **Table doesn't exist**
   - ✅ Go to phpPgAdmin
   - ✅ Check if `produit` table exists
   - ✅ If not, run the SQL from Step 3

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
- ✅ SSL is automatically enabled in the code
- ✅ If you still get SSL errors, the connection should still work
- ✅ Contact Hostinger support if the problem persists

### Problem: "Connection timeout"

**Possible Causes & Solutions:**

1. **Slow internet connection**
   - ✅ Wait a bit longer (timeout is set to 10 seconds)
   - ✅ Check your internet connection

2. **Database server is down**
   - ✅ Check Hostinger status page
   - ✅ Contact Hostinger support

3. **Firewall blocking connection**
   - ✅ Check if your firewall is blocking PostgreSQL connections
   - ✅ Temporarily disable firewall to test

---

## ✅ Final Checklist

Before considering the setup complete, verify:

- [ ] `.env.local` file exists in the project root
- [ ] All database credentials are correct in `.env.local`
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

If you've completed all steps and products are showing on your website, congratulations! Your database connection is working correctly.

**Next Steps:**
- Add more products through phpPgAdmin
- Customize product images
- Deploy to production (remember to set environment variables on your hosting)

---

**Last Updated:** This guide is for the current setup. If you make changes to the code, update this guide accordingly.

