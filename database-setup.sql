-- Sample data insertion script for Shoes_app database
-- Run this after creating the tables and running add-image-columns.sql

-- Insert sample products with 3 images each
-- Note: Each product should have 3 images (image, image2, image3)
-- The app will display: 1 main large image + 2 thumbnail images

INSERT INTO produit (nom, description, prix, image, image2, image3) VALUES
('Medieval Fantasy Leather Boot', 
 '{"colors": [{"name": "Dark Brown", "hex": "#4a2511", "image": "/images/image.png"}], "sizes": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12], "category": "Leather Footwear", "rating": 4.9, "reviewCount": 87}',
 180.00,
 '/images/image.png',  -- Main image
 '/images/capture-20d-27-c3-a9cran-202025-12-16-20140125.png',  -- Second image
 '/images/capture-20d-27-c3-a9cran-202025-12-16-20140132.png'),  -- Third image
('Wrapped Leather Knee Boot',
 '{"colors": [{"name": "Rich Brown", "hex": "#654321", "image": "/images/capture-20d-27-c3-a9cran-202025-12-16-20140235.png"}], "sizes": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11], "category": "Leather Footwear", "rating": 4.8, "reviewCount": 64}',
 220.00,
 '/images/capture-20d-27-c3-a9cran-202025-12-16-20140235.png',  -- Main image
 '/images/capture-20d-27-c3-a9cran-202025-12-16-20140157.png',  -- Second image
 '/images/capture-20d-27-c3-a9cran-202025-12-16-20140235.png'), -- Third image (can reuse)
('Traditional Leather Moccasin',
 '{"colors": [{"name": "Natural Tan", "hex": "#d2b48c", "image": "/images/capture-20d-27-c3-a9cran-202025-12-16-20140222.png"}], "sizes": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12], "category": "Leather Footwear", "rating": 4.7, "reviewCount": 52}',
 145.00,
 '/images/capture-20d-27-c3-a9cran-202025-12-16-20140222.png',  -- Main image
 '/images/capture-20d-27-c3-a9cran-202025-12-16-20140222.png',  -- Second image
 '/images/capture-20d-27-c3-a9cran-202025-12-16-20140222.png'); -- Third image

-- Products with fewer than 3 images will use placeholders for missing ones
INSERT INTO produit (nom, description, prix, image, image2) VALUES
('Artisan Spiral Boot', 
 '{"colors": [{"name": "Brown with Turquoise", "hex": "#6b4423"}], "sizes": [6, 7, 8, 9, 10, 11], "category": "Leather Footwear", "rating": 5.0, "reviewCount": 43}',
 195.00,
 '/images/capture-20d-27-c3-a9cran-202025-12-16-20140157.png',  -- Main image
 '/images/products/prd2.png');  -- Second image (third will be placeholder)

-- Note: If you only have 1 or 2 images, that's fine - the app will use placeholders for the rest

