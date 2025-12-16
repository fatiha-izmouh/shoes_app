-- Example: How to insert products with 3 images
-- 
-- Make sure your image files exist in: public/images/products/your-image.png
-- Then insert the product with all 3 image paths

-- Example 1: Product with 3 images
INSERT INTO produit (nom, prix, description, image, image2, image3)
VALUES (
  'Medieval Fantasy Boot',
  180.00,
  '{"colors": [{"name": "Dark Brown", "hex": "#4a2511", "image": "/images/products/boot-main.png"}], "sizes": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12], "category": "Leather Footwear", "rating": 4.9, "reviewCount": 87}',
  '/images/products/boot-main.png',    -- Main image (shown large)
  '/images/products/boot-side.png',    -- Second image (thumbnail)
  '/images/products/boot-back.png'     -- Third image (thumbnail)
);

-- Example 2: Product with only 2 images (third will be placeholder)
INSERT INTO produit (nom, prix, description, image, image2)
VALUES (
  'Classic Leather Boot',
  220.00,
  '{"colors": [{"name": "Rich Brown", "hex": "#654321"}], "sizes": [6, 7, 8, 9, 10, 11], "category": "Leather Footwear", "rating": 4.8, "reviewCount": 64}',
  '/images/products/classic-main.png',
  '/images/products/classic-side.png'
  -- image3 will be null, so placeholder will be used
);

-- Example 3: Product with all 3 images using existing files
INSERT INTO produit (nom, prix, description, image, image2, image3)
VALUES (
  'Artisan Spiral Boot',
  195.00,
  '{"colors": [{"name": "Brown with Turquoise", "hex": "#6b4423"}], "sizes": [6, 7, 8, 9, 10, 11], "category": "Leather Footwear", "rating": 5.0, "reviewCount": 43}',
  '/images/products/prd2.png',  -- Use existing product images
  '/images/products/prd3.png',
  '/images/products/prd2.png'  -- Can reuse images if needed
);

-- Note:
-- - image: Main product image (displayed large at top)
-- - image2: Second image (first thumbnail)
-- - image3: Third image (second thumbnail)
-- - If any image is NULL, a placeholder will be used
-- - The app ensures exactly 3 images are always displayed

