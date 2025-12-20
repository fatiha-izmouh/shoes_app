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

