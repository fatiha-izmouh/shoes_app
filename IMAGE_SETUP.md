# Image Setup Guide

## How Images Work in This App

### 1️⃣ Database Storage

The `produit` table stores only the **path or URL** to the image in the `image` column.

**Example:**
```sql
-- If using products subfolder:
INSERT INTO produit (nom, prix, description, image)
VALUES ('Nike Air', 120.00, 'Running shoes', '/images/products/nike-air.png');

-- Or if images are directly in images folder:
INSERT INTO produit (nom, prix, description, image)
VALUES ('Nike Air', 120.00, 'Running shoes', '/images/nike-air.png');
```

The database stores the path: `/images/products/nike-air.png` or `/images/nike-air.png`

### 2️⃣ File Storage

Actual image files are stored in your project's `public` folder:

**Option 1: Direct in images folder (current setup)**
```
public/
  images/
    nike-air.png
    medieval-boot.png
    ...
```

**Option 2: In products subfolder (recommended for organization)**
```
public/
  images/
    products/
      nike-air.png
      medieval-boot.png
      ...
```

**Important:** Next.js automatically serves files from the `public` folder at runtime.
- Files in `public/images/` are accessible at `/images/filename.png`
- Files in `public/images/products/` are accessible at `/images/products/filename.png`

### 3️⃣ How It Works in the App

**Database holds:** `/images/products/nike-air.png`

**Frontend uses:**
```tsx
import Image from "next/image"

<Image
  src={product.images[0]}  // This is "/images/products/nike-air.png" from DB
  alt={product.name}
  width={300}
  height={300}
/>
```

Next.js automatically:
- Serves the file from `public/images/products/nike-air.png`
- Optimizes the image
- Handles responsive loading

### 4️⃣ Image Priority

The app uses images in this order:

1. **Primary:** `image` column from database (main product image)
2. **Secondary:** Additional images from JSON in `description` field
3. **Fallback:** Placeholder image if none available

### 5️⃣ Example Database Entry

```sql
-- Product with main image in image column
INSERT INTO produit (nom, prix, description, image)
VALUES (
  'Medieval Fantasy Boot',
  180.00,
  '{"colors": [{"name": "Brown", "hex": "#4a2511"}], "sizes": [6,7,8,9,10]}',
  '/images/products/medieval-boot.png'
);
```

**File location:** `public/images/products/medieval-boot.png`

### 6️⃣ Adding New Products

1. **Add image file** to `public/images/products/your-image.png`
2. **Insert into database:**
   ```sql
   INSERT INTO produit (nom, prix, description, image)
   VALUES ('Product Name', 99.99, 'Product description', '/images/products/your-image.png');
   ```

That's it! The app will automatically serve the image.

