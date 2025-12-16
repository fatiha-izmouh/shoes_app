# 3 Images Per Product Setup

## Overview

Each product now supports exactly **3 images**:
- **1 main image** (displayed large at the top)
- **2 thumbnail images** (displayed in a grid below)

## Database Schema

The `produit` table now has 3 image columns:
- `image` - Main product image (required/recommended)
- `image2` - Second product image (optional)
- `image3` - Third product image (optional)

## Setup Steps

### Step 1: Run the SQL Migration

```bash
psql -U postgres -d Shoes_app -f add-image-columns.sql
```

This adds the `image2` and `image3` columns to your `produit` table.

### Step 2: Insert Products with 3 Images

```sql
INSERT INTO produit (nom, prix, description, image, image2, image3)
VALUES (
  'Product Name',
  120.00,
  '{"colors": [...], "sizes": [6,7,8], ...}',
  '/images/products/main.png',    -- Main image
  '/images/products/side.png',    -- Second image
  '/images/products/back.png'     -- Third image
);
```

### Step 3: Image File Locations

Make sure your image files exist in:
- `public/images/products/main.png`
- `public/images/products/side.png`
- `public/images/products/back.png`

## How It Works

1. **Database stores paths**: `/images/products/image-name.png`
2. **Next.js serves files**: Automatically from `public/images/products/`
3. **Frontend displays**: 
   - Main image: Large display at top
   - Thumbnails: 2 smaller images in grid below
4. **Fallback**: If less than 3 images provided, placeholders are used

## Examples

### Full Example with 3 Images
```sql
INSERT INTO produit (nom, prix, description, image, image2, image3)
VALUES (
  'Medieval Fantasy Boot',
  180.00,
  '{"colors": [{"name": "Brown", "hex": "#4a2511"}], "sizes": [6,7,8,9,10], "category": "Leather Footwear", "rating": 4.9, "reviewCount": 87}',
  '/images/products/boot-main.png',
  '/images/products/boot-side.png',
  '/images/products/boot-back.png'
);
```

### Example with Only 2 Images
```sql
INSERT INTO produit (nom, prix, description, image, image2)
VALUES (
  'Classic Boot',
  220.00,
  '{"colors": [...], "sizes": [6,7,8], ...}',
  '/images/products/classic-main.png',
  '/images/products/classic-side.png'
  -- image3 will be NULL, placeholder will be used
);
```

### Example with Only 1 Image
```sql
INSERT INTO produit (nom, prix, description, image)
VALUES (
  'Simple Boot',
  145.00,
  '{"colors": [...], "sizes": [6,7,8], ...}',
  '/images/products/simple-main.png'
  -- image2 and image3 will be NULL, placeholders will be used
);
```

## Code Implementation

The API automatically:
- ✅ Collects images from `image`, `image2`, `image3` columns
- ✅ Falls back to JSON description images if columns are empty
- ✅ Ensures exactly 3 images are always returned
- ✅ Pads with placeholders if less than 3 images provided
- ✅ Limits to first 3 images if more than 3 provided

## Frontend Display

The product page shows:
- **Main Image**: Large square image at top (from `product.images[0]`)
- **Thumbnail Grid**: 3-column grid showing all 3 images
- **Click to Change**: Clicking thumbnails changes the main image

## Benefits

✅ **Consistent Display**: Every product shows exactly 3 images
✅ **Flexible Input**: Can provide 1, 2, or 3 images
✅ **Automatic Fallback**: Missing images use placeholders
✅ **Easy Management**: Simple database columns, no complex JSON
✅ **Better UX**: Customers see multiple product views

## Files Created/Updated

- ✅ `add-image-columns.sql` - Database migration
- ✅ `lib/db-types.ts` - Added image2 and image3 to ProduitDB
- ✅ `app/api/products/route.ts` - Updated to use all 3 columns
- ✅ `app/api/products/[id]/route.ts` - Updated to use all 3 columns
- ✅ `example-3-images-insert.sql` - Example SQL inserts
- ✅ `database-setup.sql` - Updated with 3-image examples

## Next Steps

1. Run the migration: `psql -U postgres -d Shoes_app -f add-image-columns.sql`
2. Update existing products to include image2 and image3
3. Add new products with all 3 images
4. Test the product pages to see all 3 images displayed

