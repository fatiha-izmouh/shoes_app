-- Add custom measurements storage to the database
-- This allows storing foot measurements for custom-sized orders

-- 1. Create custom_measurements table
CREATE TABLE custom_measurements (
    id_measurement SERIAL PRIMARY KEY,
    id_produit INT REFERENCES produit(id_produit) ON DELETE CASCADE,
    foot_length DECIMAL(5,2),           -- in cm
    foot_width DECIMAL(5,2),            -- in cm
    arch_height DECIMAL(5,2),           -- in cm
    heel_to_ball DECIMAL(5,2),          -- in cm
    instep_circumference DECIMAL(5,2),  -- in cm
    calculated_size DECIMAL(4,1),       -- The size calculated from measurements
    is_custom BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Add measurement reference to ligne_commande table
-- This links order line items to custom measurements
ALTER TABLE ligne_commande 
ADD COLUMN id_measurement INT REFERENCES custom_measurements(id_measurement) ON DELETE SET NULL;

-- 3. Create index for faster lookups
CREATE INDEX idx_measurements_produit ON custom_measurements(id_produit);
CREATE INDEX idx_ligne_commande_measurement ON ligne_commande(id_measurement);

-- 4. Example: Insert custom measurements
-- INSERT INTO custom_measurements (id_produit, foot_length, foot_width, arch_height, heel_to_ball, instep_circumference, calculated_size) VALUES
-- (1, 26.5, 10.2, 3.5, 18.0, 25.0, 9.5);

-- 5. Example: Link measurement to order line
-- UPDATE ligne_commande SET id_measurement = 1 WHERE id_ligne = 1;
