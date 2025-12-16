-- Add image2 and image3 columns to produit table
ALTER TABLE produit 
ADD COLUMN image2 VARCHAR(255),
ADD COLUMN image3 VARCHAR(255);

-- Optional: Add comments
COMMENT ON COLUMN produit.image2 IS 'Second product image path';
COMMENT ON COLUMN produit.image3 IS 'Third product image path';
