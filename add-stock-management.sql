-- Add stock management to the database
-- This creates a stock table to track inventory by product and size

-- 1. Add size and color columns to ligne_commande to track what was ordered
ALTER TABLE ligne_commande 
ADD COLUMN taille VARCHAR(10),
ADD COLUMN couleur VARCHAR(50);

-- 2. Create stock table to track inventory by product and size
CREATE TABLE stock (
    id_stock SERIAL PRIMARY KEY,
    id_produit INT REFERENCES produit(id_produit) ON DELETE CASCADE,
    taille DECIMAL(4,1) NOT NULL,  -- Size (e.g., 6, 6.5, 7, 7.5, etc.)
    quantite INT NOT NULL DEFAULT 0,
    UNIQUE(id_produit, taille)  -- One stock entry per product-size combination
);

-- 3. Create index for faster lookups
CREATE INDEX idx_stock_produit_taille ON stock(id_produit, taille);

-- 4. Example: Insert stock for a product
-- INSERT INTO stock (id_produit, taille, quantite) VALUES
-- (1, 6, 5),   -- 5 units of size 6
-- (1, 6.5, 3), -- 3 units of size 6.5
-- (1, 7, 10),  -- 10 units of size 7
-- (1, 7.5, 8), -- 8 units of size 7.5
-- (1, 8, 0);   -- 0 units of size 8 (out of stock)

