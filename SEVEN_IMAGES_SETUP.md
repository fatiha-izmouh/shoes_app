# 7 Images Per Product Setup

## Overview

Each product now supports up to **7 images**:
- **1 main image** (displayed first)
- **6 additional images** (accessible via carousel/thumbnails)

## Database Schema

The `produit` table now has 7 image columns:
- `image` - Main product image
- `image2` - Second product image (optional)
- `image3` - Third product image (optional)
- `image4` - Fourth product image (optional)
- `image5` - Fifth product image (optional)
- `image6` - Sixth product image (optional)
- `image7` - Seventh product image (optional)

## Setup Steps

### Step 1: Run the SQL Migration

If you haven't already, run the migration to add the new columns:

```bash
node run-7images-migration.js
```

Or manually run the SQL in `add-more-image-columns.sql`:

```sql
ALTER TABLE produit 
ADD COLUMN image4 VARCHAR(255),
ADD COLUMN image5 VARCHAR(255),
ADD COLUMN image6 VARCHAR(255),
ADD COLUMN image7 VARCHAR(255);
```

### Step 2: Update Management

The dashboard has been updated to support uploading and editing all 7 images.
- **New Product**: Grid layout for 7 images.
- **Edit Product**: Grid layout for 7 images with previews.

## Code Implementation Details

- **`lib/db-types.ts`**: Updated `ProduitDB` interface.
- **`app/api/products/route.ts`**: Returns up to 7 images (padded with placeholders if needed).
- **`app/api/products/[id]/route.ts`**: Returns up to 7 images (padded with placeholders if needed).
- **`app/dashboard/(protected)/products/actions.ts`**: Handles upload/database update for all 7 image fields.
- **`app/dashboard/(protected)/products/new/page.tsx`**: Updated UI to handle 7 images.
- **`app/dashboard/(protected)/products/[id]/product-edit-form.tsx`**: Updated UI to handle 7 images with previews.

## Frontend Display

The product detail page automatically handles the increased number of images using its existing carousel and dot indicator logic.

## Usage

When adding or editing a product, you will now see 7 image upload slots. The first one is required, while the others are optional.
- If you provide fewer than 7 images, the app will show placeholders for the remaining slots in the API (to maintain consistent array length) but the carousel typically filters them or handles them gracefully. 
- *Note:* The frontend carousel is dynamic and will show as many images as provided.
