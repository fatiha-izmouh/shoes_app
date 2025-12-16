# Stock Management System

## Overview

The app now includes a complete stock management system that tracks inventory by product and size. This prevents overselling and provides real-time availability information to customers.

## Database Changes

### 1. Stock Table
A new `stock` table tracks inventory:
- `id_stock` - Primary key
- `id_produit` - Product ID (foreign key)
- `taille` - Size (e.g., 6, 6.5, 7, 7.5, etc.)
- `quantite` - Available quantity

### 2. Updated Order Lines
The `ligne_commande` table now includes:
- `taille` - Size ordered
- `couleur` - Color ordered

## Setup Instructions

### Step 1: Run the SQL Migration
```bash
psql -U postgres -d Shoes_app -f add-stock-management.sql
```

### Step 2: Add Stock for Products
```sql
-- Example: Add stock for product ID 1
INSERT INTO stock (id_produit, taille, quantite) VALUES
(1, 6, 5),    -- 5 units of size 6
(1, 6.5, 3),  -- 3 units of size 6.5
(1, 7, 10),   -- 10 units of size 7
(1, 7.5, 8),  -- 8 units of size 7.5
(1, 8, 0);    -- 0 units of size 8 (out of stock)
```

## Features

### 1. Stock Display
- Product page shows available stock for each size
- Sizes with low stock (< 5) show quantity in parentheses
- Out of stock sizes are disabled and grayed out

### 2. Stock Validation
- Users cannot add more items than available
- Quantity selector is limited to available stock
- Clear error messages when stock is insufficient

### 3. Automatic Stock Updates
- When an order is placed, stock is automatically reduced
- Stock is updated in the same transaction as the order
- Prevents race conditions and overselling

### 4. Order Tracking
- Orders now track which size and color was ordered
- Full order history with size/color information

## API Endpoints

### Get Stock for Product
```
GET /api/stock/[productId]
```
Returns all stock entries for a product:
```json
{
  "productId": 1,
  "stock": {
    "6": 5,
    "6.5": 3,
    "7": 10,
    "8": 0
  }
}
```

### Get Stock for Specific Size
```
GET /api/stock/[productId]/[size]
```
Returns stock for a specific product and size:
```json
{
  "productId": 1,
  "size": 8,
  "stock": 0,
  "available": false
}
```

## User Experience

### Product Page
- ✅ Shows stock availability for each size
- ✅ Disables out-of-stock sizes
- ✅ Limits quantity to available stock
- ✅ Shows remaining quantity for selected size
- ✅ Validates before adding to cart

### Checkout
- ✅ Orders include size and color information
- ✅ Stock is automatically updated when order is placed
- ✅ Prevents ordering unavailable items

## Example Workflow

1. **Admin adds stock:**
   ```sql
   INSERT INTO stock (id_produit, taille, quantite) 
   VALUES (1, 8, 10);
   ```

2. **Customer views product:**
   - Sees "10 available" for size 8
   - Can select up to 10 items

3. **Customer adds to cart:**
   - Selects size 8, quantity 3
   - Stock shows "7 available" for next customer

4. **Customer places order:**
   - Order is saved with size and color
   - Stock is reduced: 10 → 7

5. **Next customer:**
   - Sees updated stock: "7 available"

## Benefits

✅ **Prevents Overselling** - Can't order more than available
✅ **Real-time Updates** - Stock updates immediately
✅ **Better UX** - Customers see availability before ordering
✅ **Complete Tracking** - Know exactly what was ordered
✅ **Inventory Management** - Easy to track and manage stock

## Notes

- If a product doesn't have stock entries, it's treated as "unlimited" (for backward compatibility)
- Stock is checked at cart addition and order placement
- Stock updates are transactional (all or nothing)

