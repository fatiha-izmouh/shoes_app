-- Check product images in database
-- Run this to see what images are stored for each product

SELECT 
    id_produit,
    nom,
    image,
    image2,
    image3,
    CASE 
        WHEN image IS NULL OR image = '' THEN 'Missing'
        ELSE 'Has image'
    END as image_status,
    CASE 
        WHEN image2 IS NULL OR image2 = '' THEN 'Missing'
        ELSE 'Has image2'
    END as image2_status,
    CASE 
        WHEN image3 IS NULL OR image3 = '' THEN 'Missing'
        ELSE 'Has image3'
    END as image3_status
FROM produit
ORDER BY id_produit;

-- Example: Update a product with images (replace with your actual paths and product ID)
-- UPDATE produit 
-- SET image = '/images/products/prd1.png',
--     image2 = '/images/products/prd2.png',
--     image3 = '/images/products/prd3.png'
-- WHERE id_produit = 1;

