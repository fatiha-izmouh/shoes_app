-- Add image4, image5, image6, and image7 columns to produit table
ALTER TABLE produit 
ADD COLUMN image4 VARCHAR(255),
ADD COLUMN image5 VARCHAR(255),
ADD COLUMN image6 VARCHAR(255),
ADD COLUMN image7 VARCHAR(255);

-- Optional: Add comments
COMMENT ON COLUMN produit.image4 IS 'Fourth product image path';
COMMENT ON COLUMN produit.image5 IS 'Fifth product image path';
COMMENT ON COLUMN produit.image6 IS 'Sixth product image path';
COMMENT ON COLUMN produit.image7 IS 'Seventh product image path';
