-- Add missing measurement columns to custom_measurements table
-- This migration adds columns for C, E, F, G measurements
-- Compatible with older MySQL versions (without IF NOT EXISTS/IF EXISTS)

-- Add new columns for A-G measurements
ALTER TABLE custom_measurements
ADD COLUMN ball_circumference DECIMAL(5,2) DEFAULT 0 COMMENT 'C - Ball Circumference (cm)',
ADD COLUMN ankle_circumference DECIMAL(5,2) DEFAULT 0 COMMENT 'E - Ankle Circumference (cm)',
ADD COLUMN lower_calf_circumference DECIMAL(5,2) DEFAULT 0 COMMENT 'F - Lower Calf Circumference (cm)',
ADD COLUMN upper_calf_circumference DECIMAL(5,2) DEFAULT 0 COMMENT 'G - Upper Calf Circumference (cm)';

-- Update column comments for clarity
ALTER TABLE custom_measurements
MODIFY COLUMN foot_length DECIMAL(5,2) NOT NULL COMMENT 'A - Foot Length (cm)',
MODIFY COLUMN foot_width DECIMAL(5,2) NOT NULL COMMENT 'B - Foot Width (cm)',
MODIFY COLUMN instep_circumference DECIMAL(5,2) DEFAULT 0 COMMENT 'D - Instep Circumference (cm)';

-- Remove old unused columns (only run if they exist)
-- If you get an error that these columns don't exist, that's fine - just ignore it
ALTER TABLE custom_measurements
DROP COLUMN arch_height,
DROP COLUMN heel_to_ball;
